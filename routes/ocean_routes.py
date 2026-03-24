
from fastapi import APIRouter
from ai.seaweed_prediction import predict_seaweed_growth

router = APIRouter(prefix="/ocean", tags=["Ocean"])

@router.post("/predict-zone")
def predict_zone(temp: float, ph: float, salinity: float):
    prediction = predict_seaweed_growth(temp, ph, salinity)
    return {"prediction": prediction}
