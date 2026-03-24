
from sqlalchemy import Column, Integer, Float
from database import Base

class OceanData(Base):
    __tablename__ = "ocean_data"

    id = Column(Integer, primary_key=True)
    temperature = Column(Float)
    ph = Column(Float)
    salinity = Column(Float)
