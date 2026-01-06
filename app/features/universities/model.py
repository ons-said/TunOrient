from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base

class University(Base):
    __tablename__ = "universities"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    region = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)