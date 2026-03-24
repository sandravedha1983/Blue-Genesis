
from sqlalchemy import Column, Integer, String
from database import Base

class SeaweedFarm(Base):
    __tablename__ = "farms"

    id = Column(Integer, primary_key=True)
    location = Column(String)
    seaweed_type = Column(String)
    area = Column(Integer)
