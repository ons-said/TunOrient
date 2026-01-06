from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CircularCreate(BaseModel):
    title: str
    academic_year: Optional[str]
    publication_date: Optional[datetime]
    deadline_date: Optional[datetime]
    description: Optional[str]

class CircularRead(BaseModel):
    id: int
    title: str
    academic_year: Optional[str]
    publication_date: datetime
    deadline_date: Optional[datetime]
    description: Optional[str]

    model_config = {"from_attributes": True}