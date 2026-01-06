from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UniversityCreate(BaseModel):
    name: str
    region: Optional[str] = None

class UniversityRead(BaseModel):
    id: int
    name: str
    region: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}