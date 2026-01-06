from sqlalchemy.orm import Session
from typing import List, Optional
from app.features.auth.model import User
from app.features.admin import schemas
from app.core.security import hash_password

class AdminService:
    def __init__(self, db: Session):
        self.db = db

    def list_users(self) -> List[User]:
        return self.db.query(User).all()

    def get_user(self, user_id: int) -> Optional[User]:
        return self.db.query(User).filter(User.id == user_id).first()

    def create_user(self, payload: schemas.AdminUserCreate) -> User:
        hashed = hash_password(payload.password)
        user = User(
            email=payload.email,
            hashed_password=hashed,
            role=payload.role,
            is_active=True
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def update_user(self, user_id: int, payload: schemas.AdminUserUpdate) -> Optional[User]:
        user = self.get_user(user_id)
        if not user:
            return None
        
        if payload.email is not None:
            user.email = payload.email
        if payload.role is not None:
            user.role = payload.role
        if payload.is_active is not None:
            user.is_active = payload.is_active
        if payload.password is not None:
            user.hashed_password = hash_password(payload.password)
            
        self.db.commit()
        self.db.refresh(user)
        return user

    def delete_user(self, user_id: int) -> bool:
        user = self.get_user(user_id)
        if not user:
            return False
        self.db.delete(user)
        self.db.commit()
        return True
