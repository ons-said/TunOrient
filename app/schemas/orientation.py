from pydantic import BaseModel
from typing import Optional


class OrientationBase(BaseModel):
    name: str
    description: Optional[str] = None


class OrientationCreate(OrientationBase):
    pass


class OrientationUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None


class OrientationRead(OrientationBase):
    id: int

    # Pydantic v2 compatibility
    model_config = {"from_attributes": True}
