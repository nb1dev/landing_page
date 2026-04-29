#!/usr/bin/env bash
# =============================================================
# sync-from-stg.sh — Sincronizează datele din STG pe local
# Utilizare: ./scripts/sync-from-stg.sh
# =============================================================
set -euo pipefail

# ---- Culori pentru output ----
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log()    { echo -e "${BLUE}[sync]${NC} $1"; }
success(){ echo -e "${GREEN}[✓]${NC} $1"; }
warn()   { echo -e "${YELLOW}[!]${NC} $1"; }
error()  { echo -e "${RED}[✗]${NC} $1"; exit 1; }

# ---- Configurare ----
DUMP_FILE="/tmp/stg_dump_$(date +%Y%m%d_%H%M%S).sql"
PG_DUMP="/opt/homebrew/opt/libpq/bin/pg_dump"
LOCAL_CONTAINER="landing_page-postgres-1"
LOCAL_DB="landing_page_local"
LOCAL_USER="payload"

# ---- Citim DATABASE_URL din STG ----
# Cautam .env.stg, altfel folosim variabila de mediu STG_DATABASE_URL
if [ -f ".env.stg" ]; then
  STG_DB_URL=$(grep "^DATABASE_URL=" .env.stg | cut -d '=' -f2-)
elif [ -n "${STG_DATABASE_URL:-}" ]; then
  STG_DB_URL="$STG_DATABASE_URL"
else
  # Fallback: citim din .env dacă există un comentariu cu STG URL
  STG_DB_URL=$(grep "^#.*DATABASE_URL=postgresql.*stg\|^#.*DATABASE_URL=postgresql.*STG" .env 2>/dev/null | head -1 | sed 's/^# *//' | cut -d'=' -f2- || true)
  
  if [ -z "$STG_DB_URL" ]; then
    error "Nu am găsit STG_DATABASE_URL.\nCreează .env.stg cu DATABASE_URL=... sau exportă STG_DATABASE_URL înainte de a rula scriptul."
  fi
fi

# Adăugăm sslmode dacă nu există
if [[ "$STG_DB_URL" != *"sslmode"* ]]; then
  STG_DB_URL="${STG_DB_URL}?sslmode=require"
fi

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║        SYNC STG → LOCAL PostgreSQL           ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════╝${NC}"
echo ""
warn "Aceasta va ȘTERGE toate datele locale și le va înlocui cu datele din STG!"
echo ""
read -p "Ești sigur? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
  echo "Anulat."
  exit 0
fi
echo ""

# ---- Verificări preliminare ----
log "Verific pg_dump..."
if [ ! -f "$PG_DUMP" ]; then
  error "pg_dump nu a fost găsit la $PG_DUMP\nRulează: brew install libpq"
fi
PG_DUMP_VERSION=$("$PG_DUMP" --version | grep -oE '[0-9]+\.[0-9]+' | head -1)
success "pg_dump versiunea $PG_DUMP_VERSION găsit"

log "Verific containerul Docker local..."
if ! docker ps --format '{{.Names}}' | grep -q "$LOCAL_CONTAINER"; then
  warn "Containerul $LOCAL_CONTAINER nu rulează. Îl pornesc..."
  docker compose up -d postgres
  sleep 3
fi
success "Container PostgreSQL local activ"

# ---- Dump din STG ----
log "Fac dump din STG (poate dura 1-2 minute)..."
"$PG_DUMP" "$STG_DB_URL" \
  --no-owner \
  --no-privileges \
  -f "$DUMP_FILE" 2>&1

LINES=$(wc -l < "$DUMP_FILE")
success "Dump complet: $LINES linii → $DUMP_FILE"

# ---- Reset baza locală ----
log "Curăț baza de date locală..."
docker exec "$LOCAL_CONTAINER" psql -U "$LOCAL_USER" -d "$LOCAL_DB" -c \
  "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO $LOCAL_USER; GRANT ALL ON SCHEMA public TO public;" \
  > /dev/null 2>&1
success "Baza locală curățată"

# ---- Import ----
log "Importez datele din STG pe local..."
docker exec -i "$LOCAL_CONTAINER" psql -U "$LOCAL_USER" -d "$LOCAL_DB" < "$DUMP_FILE" 2>&1 \
  | grep "^ERROR" | grep -v "already exists" || true
success "Import complet"

# ---- Verificare ----
log "Verific datele importate..."
docker exec "$LOCAL_CONTAINER" psql -U "$LOCAL_USER" -d "$LOCAL_DB" -t -c "
SELECT '  users:    ' || COUNT(*) FROM users
UNION ALL SELECT '  pages:    ' || COUNT(*) FROM pages
UNION ALL SELECT '  media:    ' || COUNT(*) FROM media
UNION ALL SELECT '  migrations:' || COUNT(*) FROM payload_migrations;"

# ---- Curăță dump temporar ----
rm -f "$DUMP_FILE"
log "Fișier dump temporar șters"

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║         SYNC FINALIZAT CU SUCCES! ✓          ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Pornește aplicația cu: ${BLUE}npm run dev${NC}"
echo ""
