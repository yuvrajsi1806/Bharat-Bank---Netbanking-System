# Bharat Bank – Net Banking System

A modern, responsive net banking web application built using **Next.js, React, TypeScript, and Appwrite**. Bharat Bank provides an interactive banking dashboard where users can manage bank accounts, view balances, track transactions, and perform demo fund transfers.

The project demonstrates the development of a full-stack banking interface with authentication, account management, and financial transaction workflows.

## Features

- **User Authentication:** User registration, sign-in, and session management.
- **Bank Dashboard:** View account information and an overview of banking activity.
- **Account Management:** View and manage linked bank accounts.
- **Balance Overview:** Display account balances through an interactive dashboard.
- **Fund Transfers:** Transfer funds using the payment transfer interface.
- **Transaction History:** View recent transactions and transaction details.
- **Bank Integration:** Plaid integration for bank-linking functionality.
- **Payment Processing:** Dwolla integration in the application backend.
- **Responsive Interface:** Clean banking dashboard with reusable UI components.
- **Interactive Visualizations:** Charts and animated balance counters.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | Full-stack React framework |
| React 18 | User interface |
| TypeScript | Type-safe development |
| Appwrite | Authentication and backend services |
| Plaid | Bank account connectivity |
| Dwolla | Payment transfer integration |
| Tailwind CSS | Styling and responsive layouts |
| Chart.js | Data visualization |
| React Hook Form | Form management |
| Zod | Form validation |
| Sentry | Error monitoring |

## Project Structure

```text
Bharat-Bank---Netbanking-System/
│
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   │
│   ├── (root)/
│   │   ├── my-banks/
│   │   ├── payment-transfer/
│   │   └── transaction-history/
│   │
│   ├── api/
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── AuthForm.tsx
│   ├── BankCard.tsx
│   ├── BankInfo.tsx
│   ├── PaymentTransferForm.tsx
│   ├── RecentTransactions.tsx
│   ├── TransactionsTable.tsx
│   ├── TotalBalanceBox.tsx
│   └── ui/
│
├── constants/
├── lib/
│   ├── actions/
│   ├── appwrite.ts
│   ├── plaid.ts
│   └── utils.ts
│
├── public/
├── types/
├── package.json
├── package-lock.json
├── tailwind.config.ts
└── tsconfig.json
```

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/yuvrajsi1806/Bharat-Bank---Netbanking-System.git
```

### 2. Navigate to the project directory

```bash
cd Bharat-Bank---Netbanking-System
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory and configure the required credentials.

The application uses environment variables for Appwrite and Plaid configuration. Add the required values from your respective service dashboards:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
NEXT_APPWRITE_KEY=

PLAID_CLIENT_ID=
PLAID_SECRET=
```

Configure any additional variables required by the Dwolla integration according to the application configuration.

**Important:** Never upload `.env.local` or expose API keys, secret keys, or private credentials on GitHub.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Application Status

- Application execution has been tested successfully.
- The application runs as expected in the configured development environment.
- Banking workflows are intended for demonstration and learning purposes.

## Learning Outcomes

Through this project, I gained practical experience in:

- Developing full-stack applications using Next.js and React.
- Implementing authentication and session handling.
- Integrating backend services using Appwrite.
- Working with bank connectivity and payment integration libraries.
- Building reusable and responsive UI components.
- Managing forms, validations, and transaction workflows.
- Structuring a scalable TypeScript application.

## Disclaimer

**Bharat Bank is an educational/demo project.** It is not an actual banking institution and must not be used for real financial transactions or storing real banking credentials.

## Author

**Yuvraj Singh Rajpurohit**

GitHub: [yuvrajsi1806](https://github.com/yuvrajsi1806)

---

If you find this project useful, feel free to explore the repository and learn from its implementation.

⭐ Star this repository if you like the project!
