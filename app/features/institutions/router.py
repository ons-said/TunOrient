from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.features.institutions import schemas
from app.features.institutions.model import Institution
from app.features.institutions.schemas import InstitutionCreate, InstitutionUpdate, InstitutionRead
from app.features.institutions.service import InstitutionService
from app.database import get_db
from app.core.jwt import get_current_user, require_role

router = APIRouter(prefix="/institutions", tags=["institutions"])


@router.get("/", response_model=List[schemas.InstitutionRead])
def list_institutions(db: Session = Depends(get_db)):
    svc = InstitutionService(db)
    return svc.list_institutions()


@router.get("/{id}", response_model=schemas.InstitutionRead)
def get_institution(id: int, db: Session = Depends(get_db)):
    svc = InstitutionService(db)
    try:
        return svc.get_institution(id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Institution not found")


@router.post("/", response_model=schemas.InstitutionRead, status_code=status.HTTP_201_CREATED,
             dependencies=[Depends(require_role("ministry", "admin"))])
def create_institution(payload: schemas.InstitutionCreate, db: Session = Depends(get_db)):
    svc = InstitutionService(db)
    return svc.create_institution(payload)

@router.put("/{institution_id}", response_model=InstitutionRead,
            dependencies=[Depends(require_role("ministry", "admin"))])
def update_institution(
    institution_id: int,
    payload: InstitutionUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    svc = InstitutionService(db)
    try:
        updated = svc.update_institution(institution_id, payload)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Institution not found")
    return updated

@router.post("/bulk")
def create_institutions_bulk(
    payload: list[InstitutionCreate],
    db: Session = Depends(get_db)
):
    db.add_all([Institution(**i.dict()) for i in payload])
    db.commit()
    return {"inserted": len(payload)}
