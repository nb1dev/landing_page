# 🚀 Local Dev Setup Guide — Payload CMS + PostgreSQL

## Initial setup (once per developer)

### 1. Start Docker Desktop
Open the Docker Desktop application from Applications.

### 2. Start local PostgreSQL
```bash
docker compose up -d postgres
```

### 3. Copy and configure your local `.env`
```bash
cp .env.local.example .env
```
> ⚠️ **DO NOT modify** `.env` to point at STG or PROD!

### 4. Apply migrations to your local database
```bash
npm run migrate
```
This creates all the tables in your local PostgreSQL (from the existing migrations).

### 5. Start the app
```bash
npm run dev
```

---

## Daily workflow — How to make schema changes

### Scenario: You want to add a new field to a collection

**1. You make the change in code** (e.g. add a field in `src/collections/Posts.ts`)

**2. Generate the migration**
```bash
npm run migrate:create -- --name short-description
```
This creates a new file in `src/migrations/` with the necessary SQL.

**3. Apply the migration locally**
```bash
npm run migrate
```

**4. Commit and push**
```bash
git add src/migrations/
git commit -m "feat: add field X to Posts"
git push
```

**5. On STG** — the deploy automatically runs `npm run migrate` (already wired into `deploy-stg.sh`)

**6. Your teammate** — after `git pull`, runs:
```bash
npm run migrate
```

---

## Checking migration status
```bash
npm run migrate:status
```

---

## Important rules

| ✅ DO | ❌ DON'T |
|-------|----------|
| Connect locally to `localhost:5432` | Don't connect locally to STG/PROD |
| Commit the files in `src/migrations/` | Don't delete existing migrations |
| Run `migrate` after `git pull` | Don't run `migrate:fresh` on STG/PROD |
| Test migrations locally before pushing | Don't manually modify the DB schema |

---

## Environment structure

| Environment | DATABASE_URL | Who applies it |
|------------|-------------|---------------|
| **Local** | `localhost:5432/landing_page_local` | Developer, manually: `npm run migrate` |
| **STG** | DigitalOcean STG | Automatically on deploy: `deploy-stg.sh` |
| **PROD** | DigitalOcean PROD | Automatically on deploy: `deploy-prod.sh` |

---

## Useful commands

```bash
# Check which migrations are applied vs. pending
npm run migrate:status

# Create a new migration after modifying the schema
npm run migrate:create -- --name migration-name

# Apply pending migrations
npm run migrate

# Rollback the last migration (LOCAL ONLY!)
npm run migrate:down
```
