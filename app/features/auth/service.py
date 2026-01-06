from sqlalchemy.orm import Session
from typing import Optional
from app.features.auth.model import User
from app.core.security import hash_password, verify_password, create_access_token

class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, email: str, hashed_pw: str, role: str = "student") -> User:
        existing = self.get_by_email(email)
        if existing:
            raise ValueError("Email already registered")
        
        user = User(email=email, hashed_password=hashed_pw, role=role)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def get_by_email(self, email: str) -> Optional[User]:
        return self.db.query(User).filter(User.email == email).first()
