# FinTrack Core API

FinTrack Core is a backend API for personal finance management, built with TypeScript, Node.js, Express, and PostgreSQL.

## Features
- **Clean Architecture** structure.
- **Secure Authentication** via JWT.
- **Transaction Management** (Income/Expense).
- **Financial Analytics** (Balance calculation).

## Tech Stack
- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL
- **ORM:** Prisma

## Getting Started

### Prerequisites
- Node.js installed
- PostgreSQL installed and running

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/kangnova/fin-track-core.git
    cd fin-track-core
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    Copy `.env.example` to `.env` (or create `.env`) and update `DATABASE_URL`.

4.  Setup Database:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  Run the server:
    ```bash
    npm run dev
    ```

## Project Structure
- `src/config`: Configuration files (DB, Env).
- `src/controllers`: Request handlers.
- `src/middlewares`: Custom middlewares.
- `src/routes`: API route definitions.
- `src/services`: Business logic.
- `src/utils`: Helper functions.
