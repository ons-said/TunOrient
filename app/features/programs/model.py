from datetime import datetime
from sqlalchemy import JSON, Column, Integer, String, DateTime, ForeignKey, Boolean, Float, Text, DECIMAL
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from app.database import Base

class Program(Base):
    __tablename__ = "programs"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    degree = Column(String, nullable=True)
    field = Column(String, nullable=True)
    capacity = Column(Integer, nullable=True)
    institution_id = Column(Integer, ForeignKey("institutions.id", ondelete="RESTRICT"), nullable=False, index=True)
    reorientation_allowed = Column(Boolean, default=False, nullable=False)
    reorientation_mode = Column(String, nullable=True)      # "exam", "dossier", "both", "none"
    created_at = Column(DateTime, default=datetime.utcnow)

    # Admission rule fields
    bac_section = Column(String, nullable=True)
    min_average = Column(Float, nullable=True)
    score_formula = Column(Text, nullable=True)
    required_subjects = Column(JSON, nullable=True)  # Store as JSON string
    additional_conditions = Column(Text, nullable=True)
    academic_year = Column(String, nullable=True)
    last_admitted_score = Column(DECIMAL(4,2), nullable=True)
    notes = Column(Text, nullable=True)

    institution = relationship("Institution", backref="programs", lazy="joined")