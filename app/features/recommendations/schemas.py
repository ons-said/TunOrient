from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from typing import Dict, List

class RecommendationCreate(BaseModel):
    student_id: int
    program_id: int
    fit_score: Optional[float]
    likelihood: Optional[str]
    decision: Optional[str]

class RecommendationRead(BaseModel):
    id: int
    student_id: int
    program_id: int
    fit_score: Optional[float]
    likelihood: Optional[str]
    decision: Optional[str]
    created_at: Optional[datetime]
    program: Optional['ProgramRead'] = None

from app.features.programs.schemas import ProgramRead
RecommendationRead.model_rebuild()
    
class RecommendationUpdate(BaseModel):
    fit_score: Optional[float]
    likelihood: Optional[str]
    decision: Optional[str]

class RecommendationQuestionnaire(BaseModel):
    formule_globale: float
    interests: List[str]
    preferred_fields: List[str]
    preferred_regions: List[str]
    study_style: str  # "practical", "theoretical", etc.

model_config = {"from_attributes": True}