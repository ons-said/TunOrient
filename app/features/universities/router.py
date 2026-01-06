from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.features.universities import schemas
from app.features.universities.service import UniversityService
from app.database import get_db
from app.core.jwt import require_role

router = APIRouter(prefix="/universities", tags=["universities"])


@router.get("/", response_model=List[schemas.UniversityRead])
def list_universities(db: Session = Depends(get_db)):
    svc = UniversityService(db)
    return svc.list_universities()


@router.get("/{id}", response_model=schemas.UniversityRead)
def get_university(id: int, db: Session = Depends(get_db)):
    svc = UniversityService(db)
    try:
        return svc.get_university(id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="University not found")


@router.post("/", response_model=schemas.UniversityRead, status_code=status.HTTP_201_CREATED,
             dependencies=[Depends(require_role("ministry", "admin"))])
def create_university(payload: schemas.UniversityCreate, db: Session = Depends(get_db)):
    svc = UniversityService(db)
    return svc.create_university(payload)