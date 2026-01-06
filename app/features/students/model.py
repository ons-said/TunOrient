from datetime import datetime
from sqlalchemy import JSON, Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    academic_level = Column(String, nullable=True)          # e.g. "bac"
    bac_section = Column(String, nullable=True)             # Math, Sciences, Économie, Informatique, Technique, Lettres, Sport
    bac_average = Column(Float, nullable=True)
    bac_year = Column(Integer, nullable=True)
    governorate = Column(String, nullable=True)             # Tunisian governorate
    created_at = Column(DateTime, default=datetime.utcnow)
    bac_grades = Column(JSON, nullable=True)  # Store grades as JSON: {"MG": 14.5, "M": 16, "F": 15, ...}

    user = relationship("User", backref="student_profile", lazy="joined")