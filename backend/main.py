from fastapi import FastAPI, BackgroundTasks, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import logging
import time

from core.anomaly_detection import AnomalyDetector
from core.agentic_ai import agentic_router, analyst_agent, AnomalyContext
from core.risk_engine import risk_engine, ComponentRiskData, EnvironmentState
from auth.keycloak import get_current_user_roles
from connectors.elk_ingestor import poll_elasticsearch
import asyncio

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("AITRMS-Main")

app = FastAPI(title="AITRMS Core Intelligence Hub", version="1.0")

@app.on_event("startup")
async def startup_event():
    logger.info("Starting ELK telemetry ingestion background task...")
    asyncio.create_task(poll_elasticsearch())

# Aligning backend with the Vite frontend (port 5173) we saw in the UI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(agentic_router)

# Setup Templates and Static Files
templates = Jinja2Templates(directory="templates")
# app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_dashboard(request: Request):
    return templates.TemplateResponse("dashboard.html", {"request": request})

# Initialize Layer 3
anomaly_detector = AnomalyDetector(input_dim=32, seq_len=60)
anomaly_detector.set_cluster_threshold("cluster_admin", 0.05)
anomaly_detector.set_cluster_threshold("cluster_student", 0.15)
anomaly_detector.set_cluster_threshold("default", 0.10)
# Normally you'd train the IsolationForest with historical data:
# anomaly_detector.train_isolation_forest(historical_normal_data)

# Registering some dummy baseline risk components for demonstration
risk_engine.register_component(ComponentRiskData(
    component_id="auth-server-abc",
    cves=[{"CVE-2024-XXXX": 9.8}],
    exposure=0.5,
    criticality=1.5
))

# --- Endpoints for Layer 3 (Anomaly) -> Layer 4 (Agent logic) Pipeline ---

class TelemetryWindow(BaseModel):
    user_id: str
    cluster_id: str
    rbac_permissions: list[str]
    window_data: list[list[float]] # 60x32 matrix

@app.post("/api/v1/telemetry/ingest")
async def ingest_telemetry_window(
    payload: TelemetryWindow, 
    rbac_roles: list[str] = Depends(get_current_user_roles)
):
    """
    Ingests a 60-event (32-dim) window, runs it through Layer 3 IsolationForest & LSTM-Autoencoder.
    If an anomaly is detected, it is forwarded immediately to Layer 4 (Agentic AI) for intelligence reporting.
    """
    import numpy as np
    
    try:
        sequence = np.array(payload.window_data)
        if sequence.shape != (60, 32):
             raise ValueError(f"Invalid sequence shape. Expected (60, 32), got {sequence.shape}")
             
        # Phase 1: Layer 3 Detection
        detection_result = anomaly_detector.analyze_sequence(sequence, cluster_id=payload.cluster_id)
        
        # If normal, return immediately
        if not detection_result["is_anomaly"]:
            return {"status": "normal", "details": detection_result}
            
        # Phase 2: Layer 4 Analysis (If Anomalous)
        logger.warning(f"Anomaly detected for user {payload.user_id}. Engaging Agentic AI Analyst.")
        
        # Build context for the agent
        context = AnomalyContext(
            user_id=payload.user_id,
            cluster_id=payload.cluster_id,
            rbac_permissions=rbac_roles, # Now auto-extracted from valid JWT
            mse_score=detection_result["mse"],
            threshold=detection_result["threshold"],
            # Extracted heuristically or from actual event logs backing the sequence
            events_summary="Spike in network discovery followed by admin panel access attempts.", 
            suspicious_ip="192.168.45.99" # Mocked extraction for demonstration
        )
        
        intelligence_report = await analyst_agent.analyze(context)

        
        return {
            "status": "anomaly_detected",
            "layer_3_metrics": detection_result,
            "layer_4_intelligence": intelligence_report
        }
        
    except Exception as e:
        logger.error(f"Error processing telemetry window: {e}")
        raise HTTPException(status_code=400, detail=str(e))

# --- Endpoints for Phase 3: Dynamic Risk Assessment Engine ---

class NewCVEReq(BaseModel):
    component_id: str
    cve_id: str
    cvss_score: float

class IncidentRegistrationReq(BaseModel):
    incident_level: str # e.g. "P1", "P2", "P3"

@app.post("/api/v1/risk/register_cve")
async def register_new_cve(payload: NewCVEReq, background_tasks: BackgroundTasks):
    """
    Registers a new CVE against a component and triggers global risk recalculation.
    """
    if payload.component_id not in risk_engine.components:
         # Register dummy representation if component doesn't exist
         risk_engine.register_component(ComponentRiskData(
             component_id=payload.component_id,
             cves=[],
             exposure=0.8, # Assume high exposure for demo
             criticality=2.0 
         ))
         
    # Append the CVE
    risk_engine.components[payload.component_id].cves.append({payload.cve_id: payload.cvss_score})
    
    # Trigger Recalculation (Constraint: within 30 seconds)
    background_tasks.add_task(risk_engine.trigger_recalculation, reason=f"New CVE {payload.cve_id} on {payload.component_id}")
    
    return {"status": "CVE registered. Risk recalculation triggered."}

@app.post("/api/v1/risk/register_incident")
async def register_incident(payload: IncidentRegistrationReq, background_tasks: BackgroundTasks):
    """
    Registers an incident affecting the global incident multiplier.
    """
    if payload.incident_level in ["P1", "P2"]:
        risk_engine.state.open_p1_p2_incidents += 1
        background_tasks.add_task(risk_engine.trigger_recalculation, reason=f"New High-Severity Incident ({payload.incident_level})")
        return {"status": "Incident acknowledged. Global risk multiplier increased & recalculation triggered."}
    return {"status": "Incident logged. (Did not meet P1/P2 threshold for risk multiplier modification)."}

@app.get("/api/v1/risk/global_score")
def get_global_risk_score():
    return {
        "score": risk_engine.calculate_global_risk_score(),
        "open_incidents": risk_engine.state.open_p1_p2_incidents,
        "last_recalculated": risk_engine.last_recalculated
    }

# --- UI Alignment Endpoints (Mapping backend models to Frontend React Views) ---

@app.get("/api/v1/ui/admin/overview")
def get_admin_overview():
    """Provides high-level infrastructure metrics for the IT Administrator 'RISK OVERVIEW' tab."""
    score = risk_engine.calculate_global_risk_score()
    return {
        "overall_risk_score": score,
        "critical_vulns": sum(len(c.cves) for c in risk_engine.components.values()),
        "active_incidents": risk_engine.state.open_p1_p2_incidents,
        "monitored_endpoints": len(risk_engine.components),
        "risk_trend_data": [25, 30, 45, 60, 65, 55, 40, 20, score] # 9-month mock trend matching UI
    }

@app.get("/api/v1/ui/analyst/intelligence")
def get_analyst_intelligence():
    """Provides tactical threat intel for the Security Analyst 'THREAT INTELLIGENCE' tab."""
    # This aligns the Agentic AI capabilities directly with the Analyst view's requirements
    return {
        "active_iocs": 4, # Mappable from Agent outputs
        "new_cves_7d": 1, # Derived from query_cve_database() matches
        "threat_feeds": 2, # E.g., MITRE TAXII feed active indicator
        "blocked_ips": 12, # Accumulated count from propose_firewall_rule() executions
        "live_alerts": [
            {
                "level": "critical",
                "label": "Brute Force Detected (T1110)",
                "source_ip": "192.168.45.99"
            }
        ]
    }


if __name__ == "__main__":
    import uvicorn
    logger.info("Starting AITRMS Engine...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
