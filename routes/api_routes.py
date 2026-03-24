from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter(prefix="/api", tags=["API"])

class SimulatorRequest(BaseModel):
    seaweed: int
    biomass: int
    carbon: int
    labs: int

class SupportRequest(BaseModel):
    type: str

class ChatRequest(BaseModel):
    message: str

@router.get("/discoveries")
def get_discovery():
    discoveries = [
        "Marine bacteria near the Andaman trenches can produce biodegradable polymers.",
        "Deep sea algae may enable sustainable textile dyes.",
        "Ocean microbes may lead to next-generation antibiotics.",
        "Bioluminescent enzymes can be used as non-toxic tracers in medical imaging.",
        "Deep-sea sponge structures inspire architectural design for pressure-resistant undersea bases."
    ]
    return {"message": random.choice(discoveries)}

@router.post("/simulator")
def run_simulator(data: SimulatorRequest):
    s = data.seaweed
    b = data.biomass
    c = data.carbon
    l = data.labs

    reduction = round(s * 0.4 + b * 0.1 + c * 0.5, 1)
    food = round(s * 0.8 + b * 0.3, 1)
    economy = round((s * 0.2 + b * 0.3 + l * 0.8) * 1.5, 1)

    return {
        "carbonReduction": reduction,
        "foodProduction": food,
        "economicImpact": economy
    }

@router.get("/research")
def get_research():
    return [
        {"id": 1, "title": "Marine Biotechnology", "desc": "Exploring cellular agriculture and synthetic biology applications in deep-sea environments."},
        {"id": 2, "title": "Seaweed Science", "desc": "Genomic characterization of Kappaphycus and Gracilaria for enhanced carbon sequestration."},
        {"id": 3, "title": "Ocean Climate Solutions", "desc": "Sequestration methodologies for blue carbon projects."},
        {"id": 4, "title": "Biomaterials Research", "desc": "Development of ocean-degradable polymers for medical and industrial use."}
    ]

@router.post("/support")
def support_action(data: SupportRequest):
    return {"status": "success", "message": f"Successfully supported {data.type}"}

@router.post("/chat")
def chat(data: ChatRequest):
    return {"response": f"Nereus received your message: {data.message}. However, my AI node is currently running offline."}
