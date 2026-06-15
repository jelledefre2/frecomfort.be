from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="FRE BV Electrical API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
ServiceType = Literal[
    "rolluiken",
    "zonwering",
    "airco",
    "automatisering",
    "other",
]

LeadStatus = Literal["new", "contacted", "scheduled", "won", "lost"]


class LeadCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=5, max_length=40)
    service_type: ServiceType
    address: Optional[str] = Field(default=None, max_length=240)
    message: str = Field(min_length=5, max_length=2000)


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    service_type: ServiceType
    address: Optional[str] = None
    message: str
    status: LeadStatus = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LeadStatusUpdate(BaseModel):
    status: LeadStatus


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "FRE BV Electrical API", "status": "online"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/leads", response_model=Lead, status_code=status.HTTP_201_CREATED)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.leads.insert_one(doc)
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(status_filter: Optional[LeadStatus] = None):
    query = {}
    if status_filter:
        query["status"] = status_filter
    cursor = db.leads.find(query, {"_id": 0}).sort("created_at", -1)
    leads = await cursor.to_list(1000)
    for lead in leads:
        if isinstance(lead.get('created_at'), str):
            lead['created_at'] = datetime.fromisoformat(lead['created_at'])
    return leads


@api_router.get("/leads/{lead_id}", response_model=Lead)
async def get_lead(lead_id: str):
    doc = await db.leads.find_one({"id": lead_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Lead not found")
    if isinstance(doc.get('created_at'), str):
        doc['created_at'] = datetime.fromisoformat(doc['created_at'])
    return doc


@api_router.patch("/leads/{lead_id}", response_model=Lead)
async def update_lead_status(lead_id: str, payload: LeadStatusUpdate):
    result = await db.leads.update_one(
        {"id": lead_id}, {"$set": {"status": payload.status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    doc = await db.leads.find_one({"id": lead_id}, {"_id": 0})
    if isinstance(doc.get('created_at'), str):
        doc['created_at'] = datetime.fromisoformat(doc['created_at'])
    return doc


@api_router.delete("/leads/{lead_id}")
async def delete_lead(lead_id: str):
    result = await db.leads.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"deleted": True, "id": lead_id}


@api_router.get("/stats")
async def stats():
    total = await db.leads.count_documents({})
    new = await db.leads.count_documents({"status": "new"})
    contacted = await db.leads.count_documents({"status": "contacted"})
    won = await db.leads.count_documents({"status": "won"})
    return {"total": total, "new": new, "contacted": contacted, "won": won}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
