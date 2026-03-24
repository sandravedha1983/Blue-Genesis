
from fastapi import APIRouter

router = APIRouter(prefix="/research", tags=["Research"])

@router.get("/status")
def research_status():
    return {"research": "Research module active"}
