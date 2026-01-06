from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.core.jwt import require_role
from app.features.admin import schemas
from app.features.admin.service import AdminService

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/users", response_model=List[schemas.AdminUserRead], dependencies=[Depends(require_role("admin"))])
def list_users(db: Session = Depends(get_db)):
    svc = AdminService(db)
    return svc.list_users()

@router.post("/users", response_model=schemas.AdminUserRead, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_role("admin"))])
def create_user(payload: schemas.AdminUserCreate, db: Session = Depends(get_db)):
    svc = AdminService(db)
    # Check if exists (simple check, service could handle it too)
    # svc.create_user will handle hashing
    try:
        return svc.create_user(payload)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/users/{user_id}", response_model=schemas.AdminUserRead, dependencies=[Depends(require_role("admin"))])
def update_user(user_id: int, payload: schemas.AdminUserUpdate, db: Session = Depends(get_db)):
    svc = AdminService(db)
    updated = svc.update_user(user_id, payload)
    if not updated:
        raise HTTPException(status_code=404, detail="User not found")
    return updated

@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_role("admin"))])
def delete_user(user_id: int, db: Session = Depends(get_db)):
    svc = AdminService(db)
    success = svc.delete_user(user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
