from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from app.features.universities.schemas import UniversityRead

class InstitutionCreate(BaseModel):
    name: str
    university_id: int

class InstitutionRead(BaseModel):
    id: int
    name: str
    university_id: int
    created_at: datetime
    university: Optional[UniversityRead] = None
    # We need to forward reference or import UniversityRead if possible, 
    # but to avoid circular deps, we might just rely on lazy loading or separate schema.
    # For now, let's keep it simple and just rely on the Program -> Institution link.

class InstitutionUpdate(BaseModel):
    name: Optional[str] = None
    university_id: Optional[int] = None

    model_config = {"from_attributes": True}