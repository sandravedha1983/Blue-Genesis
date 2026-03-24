
from fastapi import APIRouter

router = APIRouter(prefix="/farms", tags=["Farms"])

@router.get("/status")
def farm_status():
    return {"farms": "Farm module active"}
