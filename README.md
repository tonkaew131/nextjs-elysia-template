# Next.js + Elysia Template

A starter template for building applications with Next.js and Elysia.

## Features

- **Next.js** 15 with app router
  - **ShadCN UI**
  - Automatic type infer from api & database schema
  - Automatic useQuery & useMutation hooks generation
- **Elysia.js** for the backend
  - **Drizzle ORM**
  - **Lucia Auth**
- Monorepo structure with **bun** as the package manager
  - Fully dockerized deployment

## Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/tonkaew131/nextjs-elysia-template.git
cd nextjs-elysia-template

# Install dependencies
bun i
```

Copy `.env.template` to `.env` and update the environment variables as needed:

```bash
cp .env.template .env
```

## Development

Start development database:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

Start the development server:

```bash
bun dev
```

Generate react query hooks:

```bash
bun api:gen
```

## Other Commands

### Generate Migration

Create a new database migration:

```bash
bun db:gen --name "migration_name"
```

### Run Migrations

Apply all pending migrations:

```bash
bun db:migrate
```
