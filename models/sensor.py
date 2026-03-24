
from sqlalchemy import Column, Integer, Float
from database import Base

class OceanSensor(Base):
    __tablename__ = "sensors"

    id = Column(Integer, primary_key=True)
    latitude = Column(Float)
    longitude = Column(Float)
    status = Column(Integer)
