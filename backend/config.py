"""
AITRMS Central Configuration
All environment-specific settings are loaded here.
Production deployments should override these via environment variables.
"""
import os

# ─── LLM / Ollama ────────────────────────────────────────────────────────────
OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL: str    = os.getenv("OLLAMA_MODEL", "llama3")

# ─── PostgreSQL ──────────────────────────────────────────────────────────────
# Example DSN: "postgresql+asyncpg://user:password@localhost:5432/aitrms"
DATABASE_URL: str = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://aitrms_user:changeme@localhost:5432/aitrms"
)

# ─── Keycloak ────────────────────────────────────────────────────────────────
KEYCLOAK_BASE_URL: str = os.getenv("KEYCLOAK_BASE_URL", "http://localhost:8080")
KEYCLOAK_REALM: str    = os.getenv("KEYCLOAK_REALM", "aitrms")
KEYCLOAK_CLIENT_ID: str = os.getenv("KEYCLOAK_CLIENT_ID", "aitrms-api")
KEYCLOAK_ALGORITHM: str = "RS256"

# ─── Elasticsearch / ELK ─────────────────────────────────────────────────────
ELASTICSEARCH_HOST: str = os.getenv("ELASTICSEARCH_HOST", "http://localhost:9200")
ELASTICSEARCH_INDEX: str = os.getenv("ELASTICSEARCH_INDEX", "winlogbeat-*")
ELASTICSEARCH_POLL_INTERVAL_SECONDS: int = int(os.getenv("ES_POLL_INTERVAL", "30"))
ELASTICSEARCH_WINDOW_MINUTES: int = int(os.getenv("ES_WINDOW_MINUTES", "30"))

# ─── Architecture ────────────────────────────────────────────────────────────
TELEMETRY_INGEST_URL: str = os.getenv(
    "TELEMETRY_INGEST_URL",
    "http://localhost:8000/api/v1/telemetry/ingest"
)
