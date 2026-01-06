from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class AdminUserCreate(BaseModel):
    email: EmailStr
    password: str
    role: str = "student" # student, ministry, admin

class AdminUserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None
    password: Optional[str] = None # Optional password reset

class AdminUserRead(BaseModel):
    id: int
    email: EmailStr
    role: str
    is_active: bool
    created_at: datetime
    
    class Config:
        orm_mode = True
