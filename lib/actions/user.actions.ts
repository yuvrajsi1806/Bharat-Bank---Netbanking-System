'use server';

import {
  ID,
  Query,
} from "node-appwrite";
import {
  createAdminClient,
  createSessionClient,
} from "../appwrite";
import { cookies } from "next/headers";
import {
  encryptId,
  extractCustomerIdFromUrl,
  parseStringify,
} from "../utils";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";

import { plaidClient } from "@/lib/plaid";
import { revalidatePath } from "next/cache";
import {
  addFundingSource,
  createDwollaCustomer,
} from "./dwolla.actions";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_TABLE_ID: USER_TABLE_ID,
  APPWRITE_BANK_TABLE_ID: BANK_TABLE_ID,
} = process.env;

// Get the profile row linked to an Appwrite authentication user.
export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { tablesDB } = await createAdminClient();

    const user = await tablesDB.listRows({
      databaseId: DATABASE_ID!,
      tableId: USER_TABLE_ID!,
      queries: [Query.equal("userId", [userId])],
    });

    if (user.total !== 1) return null;

    return parseStringify(user.rows[0]);
  } catch (error) {
    console.error("Error getting user info:", error);
    return null;
  }
};

// Sign in an existing Appwrite authentication user.
export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(
      email,
      password
    );

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    const user = await getUserInfo({ userId: session.userId });

    return parseStringify(user);
  } catch (error) {
    console.error("Error signing in:", error);
    return null;
  }
};

// Create an Appwrite authentication account and its profile row.
export const signUp = async ({
  password,
  ...userData
}: SignUpParams) => {
  const { email, firstName, lastName } = userData;

  try {
    const { account, tablesDB } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    if (!newUserAccount) {
      throw new Error("Error creating Appwrite user");
    }

    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type: "personal",
    });

    if (!dwollaCustomerUrl) {
      throw new Error("Error creating Dwolla customer");
    }

    const dwollaCustomerId =
      extractCustomerIdFromUrl(dwollaCustomerUrl);

    const newUser = await tablesDB.createRow({
      databaseId: DATABASE_ID!,
      tableId: USER_TABLE_ID!,
      rowId: ID.unique(),
      data: {
        userId: newUserAccount.$id,
        email,

        // Match the exact column names in your Appwrite users table.
        firstname: firstName,
        lastname: lastName,

        address1: userData.address1,
        city: userData.city,
        state: userData.state,
        postalCode: userData.postalCode,
        dateOfBirth: userData.dateOfBirth,
        ssn: userData.ssn,

        dwollaCustomerId,
        dwollaCustomerUrl,
      },
    });

    const session = await account.createEmailPasswordSession(
      email,
      password
    );

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return parseStringify(newUser);
  } catch (error) {
    console.error("Error signing up:", error);
    return null;
  }
};

// Get the currently logged-in user and their profile row.
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id });

    return parseStringify(user);
  } catch (error) {
    console.error("Error getting logged-in user:", error);
    return null;
  }
}

// Sign out the current user.
export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    console.error("Error logging out:", error);
    return null;
  }
};

// Create a Plaid Link token for the user.
export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({
      linkToken: response.data.link_token,
    });
  } catch (error) {
    console.error("Error creating Plaid Link token:", error);
    return null;
  }
};

// Save a linked bank account.
export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) => {
  try {
    const { tablesDB } = await createAdminClient();

    const bankAccount = await tablesDB.createRow({
      databaseId: DATABASE_ID!,
      tableId: BANK_TABLE_ID!,
      rowId: ID.unique(),
      data: {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      },
    });

    return parseStringify(bankAccount);
  } catch (error) {
    console.error("Error creating bank account:", error);
    return null;
  }
};

// Exchange the Plaid public token and connect the bank account.
export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse =
      await plaidClient.processorTokenCreate(request);

    const processorToken =
      processorTokenResponse.data.processor_token;

    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    if (!fundingSourceUrl) {
      throw new Error("Error creating funding source");
    }

    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });

    revalidatePath("/");

    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.error(
      "Error exchanging public token:",
      error
    );
    return null;
  }
};

// Get all bank accounts for a user.
export const getBanks = async ({ userId }: getBanksProps) => {
  try {
    const { tablesDB } = await createAdminClient();

    const banks = await tablesDB.listRows({
      databaseId: DATABASE_ID!,
      tableId: BANK_TABLE_ID!,
      queries: [Query.equal("userId", [userId])],
    });

    return parseStringify(banks.rows);
  } catch (error) {
    console.error("Error getting banks:", error);
    return null;
  }
};

// Get a bank row by its row ID.
export const getBank = async ({ documentId }: getBankProps) => {
  try {
    const { tablesDB } = await createAdminClient();

    const bank = await tablesDB.getRow({
      databaseId: DATABASE_ID!,
      tableId: BANK_TABLE_ID!,
      rowId: documentId,
    });

    return parseStringify(bank);
  } catch (error) {
    console.error("Error getting bank:", error);
    return null;
  }
};

// Get a bank row by its account ID.
export const getBankByAccountId = async ({
  accountId,
}: getBankByAccountIdProps) => {
  try {
    const { tablesDB } = await createAdminClient();

    const bank = await tablesDB.listRows({
      databaseId: DATABASE_ID!,
      tableId: BANK_TABLE_ID!,
      queries: [Query.equal("accountId", [accountId])],
    });

    if (bank.total !== 1) return null;

    return parseStringify(bank.rows[0]);
  } catch (error) {
    console.error("Error getting bank by account ID:", error);
    return null;
  }
};