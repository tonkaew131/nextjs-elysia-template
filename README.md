# Next.js + Elysia Template

A starter template for building applications with Next.js and Elysia.

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
