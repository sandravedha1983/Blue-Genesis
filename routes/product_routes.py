
from fastapi import APIRouter

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/status")
def product_status():
    return {"products": "Product module active"}
