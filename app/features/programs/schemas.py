from pydantic import BaseModel, field_validator
from typing import Optional, List
from datetime import datetime
import json
# Import external schemas for composition
from app.features.institutions.schemas import InstitutionRead
# We might need to extend InstitutionRead to include University if we want nested data


class ProgramCreate(BaseModel):
    name: str
    degree: Optional[str]
    field: Optional[str]
    capacity: Optional[int]
    institution_id: int
    reorientation_allowed: Optional[bool]
    reorientation_mode: Optional[str]
    bac_section: Optional[str]
    min_average: Optional[float]
    score_formula: Optional[str]
    required_subjects: Optional[List[str]]
    additional_conditions: Optional[str]
    academic_year: Optional[str]
    last_admitted_score: Optional[float]
    notes: Optional[str]

class ProgramRead(BaseModel):
    id: int
    name: str
    degree: Optional[str]
    field: Optional[str]
    capacity: Optional[int]
    institution_id: int
    reorientation_allowed: Optional[bool]
    reorientation_mode: Optional[str]
    bac_section: Optional[str]
    min_average: Optional[float]
    score_formula: Optional[str]
    required_subjects: Optional[List[str]]
    additional_conditions: Optional[str]
    academic_year: Optional[str]
    last_admitted_score: Optional[float]
    notes: Optional[str]
    created_at: Optional[datetime]
    institution: Optional[InstitutionRead] = None

    model_config = {"from_attributes": True}

    @field_validator("required_subjects", mode="before")
    def parse_required_subjects(cls, v):
        if isinstance(v, str):
            try:
                return json.loads(v)
            except Exception:
                return []
        return v