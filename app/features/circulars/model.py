from datetime import datetime
from typing import Optional
from sqlalchemy import Column, Integer, String, DateTime, Text
from app.database import Base

class MinisterialCircular(Base):
    __tablename__ = "ministerial_circulars"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    academic_year = Column(String, nullable=True)
    publication_date = Column(DateTime, default=datetime.utcnow)
    deadline_date = Column(DateTime, nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)