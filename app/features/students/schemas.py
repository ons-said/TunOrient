from pydantic import BaseModel, ValidationError, model_validator
from typing import Optional
from datetime import datetime

class StudentCreate(BaseModel):
    academic_level: str
    bac_section: Optional[str]
    bac_average: Optional[float]
    bac_year: Optional[int]
    governorate: Optional[str]

    @model_validator(mode="after")
    def check_fields_by_academic_level(self):
        level = self.academic_level
        if level in ["1ère année secondaire", "2ème année secondaire"]:
            if self.bac_section is not None or self.bac_average is not None:
                raise ValueError("bac_section and bac_average should not be provided for 1ère or 2ème année secondaire")
        elif level == "3ème année secondaire":
            if self.bac_average is not None:
                raise ValueError("bac_average should not be provided for 3ème année secondaire")
        # For 4ème année secondaire or étudiant (réorientation), all fields are allowed
        return self

class StudentUpdate(BaseModel):
    academic_level: Optional[str]
    bac_section: Optional[str]
    bac_average: Optional[float]
    bac_year: Optional[int]
    governorate: Optional[str]

class UserNested(BaseModel):
    id: int
    email: str
    role: str
    class Config:
        orm_mode = True

class StudentRead(BaseModel):
    id: int
    user_id: int
    academic_level: Optional[str]
    bac_section: Optional[str]
    bac_average: Optional[float]
    bac_year: Optional[int]
    governorate: Optional[str]
    created_at: datetime
    user: Optional[UserNested]

    class Config:
        orm_mode = True

