from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False, index=True)
    program_id = Column(Integer, ForeignKey("programs.id", ondelete="CASCADE"), nullable=False, index=True)
    program_name = Column(String, nullable=False)
    institution = Column(String, nullable=False)
    university = Column(String, nullable=False)
    field = Column(String, nullable=True)
    total_points = Column(Float, nullable=True)
    total_points_with_bonus = Column(Float, nullable=True)
    last_admitted_score = Column(Float, nullable=True)
    meets_cutoff = Column(Boolean, default=False)
    geographic_bonus = Column(Float, nullable=True)
    requires_selection = Column(Boolean, default=False)
    preference_match = Column(Boolean, default=False)
    category = Column(String, nullable=True)
    fit_score = Column(Float, nullable=True)
    likelihood = Column(String, nullable=True)
    decision = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("Student", backref="recommendations", lazy="joined")
    program = relationship("Program", backref="recommendations", lazy="joined")