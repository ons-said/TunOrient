from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum

class AcademicLevel(str, Enum):
    FIRST_YEAR = "1ère année secondaire"
    SECOND_YEAR = "2ème année secondaire"
    THIRD_YEAR = "3ème année secondaire"
    FOURTH_YEAR = "4ème année secondaire"
    STUDENT_REORIENTATION = "étudiant (réorientation)"


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: Optional[str] = "student"
    
    # Student Profile Fields (Accepted to prevent 400 errors, but not yet persisted)
    academic_level: Optional[str] = None
    bac_section: Optional[str] = None
    bac_average: Optional[float] = None
    bac_year: Optional[int] = None
    governorate: Optional[str] = None

class UserRead(BaseModel):
    id: int
    email: EmailStr
    role: str
    is_active: bool

    model_config = {"from_attributes": True}

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenPayload(BaseModel):
    sub: str
    exp: int

class UserLogin(BaseModel):
    email: EmailStr
    password: str
