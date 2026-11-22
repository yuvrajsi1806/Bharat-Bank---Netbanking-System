# 🏦 Bharat Bank – Net Banking System

A modern, responsive net banking web application built with **Next.js, React, TypeScript, and Appwrite**.

Bharat Bank is a full-stack banking demo application designed to provide an interactive banking experience. Users can explore connected bank accounts, view account balances, track transaction history, and use the fund transfer interface through a clean and responsive dashboard.

The project demonstrates practical implementation of frontend development, backend integration, authentication, bank connectivity, and payment-related workflows.

---

## 📸 Application Screenshots

### 1. My Bank Accounts

View connected bank accounts with account balances and masked card details.

![My Bank Accounts](screenshots/my-bank-accounts.png)

### 2. Transaction History

View transaction records with transaction amounts, status, dates, channels, and categories.

![Transaction History](screenshots/transaction-history.png)

> More application screenshots can be added here as additional pages are documented.

---

## ✨ Key Features

### 🔐 User Authentication
- User registration and sign-in.
- Authentication and session management.
- User-specific banking dashboard.

### 🏦 Bank Account Management
- View connected bank accounts.
- Display bank names and account balances.
- Interactive bank card interface.
- Support for multiple linked bank accounts.

### 💳 Transaction History
- View transaction records.
- Display transaction amounts and dates.
- Track transaction status.
- View transaction channels and categories.

### 💸 Fund Transfers
- Dedicated fund transfer interface.
- Transfer-related form handling.
- Payment workflow integration.

### 📊 Dashboard and Visualizations
- Interactive banking dashboard.
- Account balance overview.
- Transaction information and visualizations.
- Responsive user interface.

### 🔗 Third-Party Integrations
- Appwrite for backend services and authentication.
- Plaid for bank connectivity functionality.
- Dwolla for payment-related integration.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | Full-stack React framework |
| React 18 | User interface development |
| TypeScript | Type-safe development |
| Appwrite | Backend services and authentication |
| Plaid | Bank connectivity |
| Dwolla | Payment integration |
| Tailwind CSS | Styling and responsive design |
| Chart.js | Data visualization |
| React Hook Form | Form handling |
| Zod | Form validation |
| Sentry | Error monitoring |

---

## 📁 Project Structure

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
│
├── lib/
│   ├── actions/
│   ├── appwrite.ts
│   ├── plaid.ts
│   └── utils.ts
│
├── public/
├── types/
│
├── package.json
├── package-lock.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

- Node.js
- npm
- Appwrite account
- Plaid developer account for bank connectivity configuration
- Dwolla developer account for payment integration configuration

### 1. Clone the Repository

```bash
git clone https://github.com/yuvrajsi1806/Bharat-Bank---Netbanking-System.git
```

### 2. Navigate to the Project Directory

```bash
cd Bharat-Bank---Netbanking-System
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory.

Add the required configuration values:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
NEXT_APPWRITE_KEY=

PLAID_CLIENT_ID=
PLAID_SECRET=
```

Configure the additional Dwolla environment variables required by the application.

**Important:** Use your own developer credentials. Never upload `.env.local`, secret keys, access tokens, or private credentials to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 🎯 Project Objectives

The main objective of Bharat Bank is to develop a responsive and interactive net banking demo application while gaining practical experience with modern full-stack web technologies.

The project focuses on:

- Building a modern banking user interface.
- Implementing user authentication.
- Managing connected bank account information.
- Displaying transaction history.
- Developing fund transfer workflows.
- Integrating third-party backend and financial service APIs.
- Creating reusable and responsive React components.

---

## 📚 Learning Outcomes

Working on this project helped me gain practical experience in:

- Full-stack web development using Next.js and React.
- TypeScript and component-based development.
- Backend integration using Appwrite.
- Authentication and session management.
- Working with Plaid and Dwolla integrations.
- Form handling and validation.
- Responsive UI development using Tailwind CSS.
- Organizing a full-stack application.
- Building interactive dashboards and transaction interfaces.

---

## 🔮 Future Improvements

- Improve transaction workflow reliability and validation.
- Add more detailed transaction filters.
- Improve account and transaction analytics.
- Enhance security and access control.
- Add additional dashboard visualizations.
- Improve error handling and user feedback.
- Expand automated testing.

---

## ⚠️ Disclaimer

**Bharat Bank is an educational and demonstration project.**

It is not an actual banking institution and is not intended for real financial transactions. Do not use real banking credentials, personal financial information, or production payment data with this project.

---

## 👨‍💻 Author

**Yuvraj Singh Rajpurohit**

Computer Science & Engineering | Artificial Intelligence & Machine Learning

GitHub: [@yuvrajsi1806](https://github.com/yuvrajsi1806)

Project Repository: [Bharat Bank – Net Banking System](https://github.com/yuvrajsi1806/Bharat-Bank---Netbanking-System)

---

⭐ If you find this project interesting, consider giving the repository a star!
