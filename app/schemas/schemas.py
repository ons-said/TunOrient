from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UniversityCreate(BaseModel):
    name: str
    region: Optional[str]

class InstitutionCreate(BaseModel):
    name: str
    university_id: int

class ProgramCreate(BaseModel):
    name: str
    degree: Optional[str]
    field: Optional[str]
    capacity: Optional[int]
    min_score: Optional[float]
    institution_id: int

class AdmissionRuleCreate(BaseModel):
    program_id: int
    min_average: float
    bac_type: Optional[str]
    year: Optional[str]

class StudentCreate(BaseModel):
    academic_level: Optional[str]
    specialization: Optional[str]
    region: Optional[str]
    bac_average: Optional[float]

class OrientationResultOut(BaseModel):
    id: int
    student_id: int
    program_id: int
    score: Optional[float]
    decision: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True

class MinisterialCircularCreate(BaseModel):
    title: str
    description: Optional[str]
    deadline: Optional[datetime]
    target_level: Optional[str]