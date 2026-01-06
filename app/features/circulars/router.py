from fastapi import APIRouter, Depends, HTTPException, status
from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import Column, Text


from app.features.auth.schemas import AcademicLevel
from app.features.circulars import schemas
from app.features.circulars.service import CircularService
from app.database import Base, get_db
from app.core.jwt import require_role, get_current_user

router = APIRouter(prefix="/circulars", tags=["circulars"])


@router.get("/", response_model=List[schemas.CircularRead])
def list_circulars(db: Session = Depends(get_db)):
    svc = CircularService(db)
    return svc.list_circulars()


@router.get("/{id}", response_model=schemas.CircularRead)
def get_circular(id: int, db: Session = Depends(get_db)):
    svc = CircularService(db)
    try:
        return svc.get_circular(id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Circular not found")


@router.post("/", response_model=schemas.CircularRead, status_code=status.HTTP_201_CREATED,
             dependencies=[Depends(require_role("ministry", "admin"))])
def create_circular(payload: schemas.CircularCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    svc = CircularService(db)
    return svc.create_circular(payload)


@router.put("/{id}", response_model=schemas.CircularRead,
            dependencies=[Depends(require_role("ministry", "admin"))])
def update_circular(
    id: int,
    payload: schemas.CircularCreate,  # or a dedicated CircularUpdate schema
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    svc = CircularService(db)
    updated = svc.update_circular(id, payload)
    if not updated:
        raise HTTPException(status_code=404, detail="Circular not found")
    return updated

@router.delete("/{circular_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_circular(
    circular_id: int,
    db: Session = Depends(get_db),
    # Add your admin/ministry authentication dependency here
):
    svc = CircularService(db)
    success = svc.delete_circular(circular_id)
    if not success:
        raise HTTPException(status_code=404, detail="Circular not found")

