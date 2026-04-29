# 🚀 Ghid Setup Local Dev — Payload CMS + PostgreSQL

## Setup inițial (o singură dată per developer)

### 1. Pornește Docker Desktop
Deschide aplicația Docker Desktop din Applications.

### 2. Pornește PostgreSQL local
```bash
docker compose up -d postgres
```

### 3. Copiază și configurează `.env` local
```bash
cp .env.local.example .env
```
> ⚠️ **NU modifica** `.env` să pointeze spre STG sau PROD!

### 4. Aplică migrările pe baza ta locală
```bash
npm run migrate
```
Aceasta creează toate tabelele în PostgreSQL-ul local (din migrările existente).

### 5. Pornește aplicația
```bash
npm run dev
```

---

## Workflow zilnic — Cum faci schimbări de schemă

### Situație: Vrei să adaugi un câmp nou la o colecție

**1. Tu faci schimbarea în cod** (ex: adaugi un câmp în `src/collections/Posts.ts`)

**2. Generezi migrarea**
```bash
npm run migrate:create -- --name descriere-scurta
```
Aceasta creează un fișier nou în `src/migrations/` cu SQL-ul necesar.

**3. Aplici migrarea local**
```bash
npm run migrate
```

**4. Faci commit și push**
```bash
git add src/migrations/
git commit -m "feat: add field X to Posts"
git push
```

**5. Pe STG** — deploy-ul rulează automat `npm run migrate` (deja în `deploy-stg.sh`)

**6. Colegul tău** — după git pull, rulează:
```bash
npm run migrate
```

---

## Verificare status migrări
```bash
npm run migrate:status
```

---

## Reguli importante

| ✅ DO | ❌ DON'T |
|-------|----------|
| Conectează-te local la `localhost:5432` | Nu te conecta local la STG/PROD |
| Commitează fișierele din `src/migrations/` | Nu șterge migrări existente |
| Rulează `migrate` după git pull | Nu rula `migrate:fresh` pe STG/PROD |
| Testează migrările local înainte de push | Nu modifica manual schema în DB |

---

## Structura environments

| Environment | DATABASE_URL | Cine o aplică |
|------------|-------------|---------------|
| **Local** | `localhost:5432/landing_page_local` | Developer manual: `npm run migrate` |
| **STG** | DigitalOcean STG | Automat la deploy: `deploy-stg.sh` |
| **PROD** | DigitalOcean PROD | Automat la deploy: `deploy-prod.sh` |

---

## Comenzi utile

```bash
# Verifică ce migrări sunt aplicate vs. pending
npm run migrate:status

# Creează o migrare nouă după ce ai modificat schema
npm run migrate:create -- --name numele-migrarii

# Aplică migrările pending
npm run migrate

# Rollback ultima migrare (NUMAI LOCAL!)
npm run migrate:down
```
