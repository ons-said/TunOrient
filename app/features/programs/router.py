from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.orm import Session

from app.features.programs import schemas
from app.features.programs.model import Program
from app.features.programs.service import ProgramService
from app.database import get_db
from app.core.jwt import get_current_user, require_role

router = APIRouter(prefix="/programs", tags=["programs"])


@router.get("/", response_model=List[schemas.ProgramRead])
def list_programs(
    institution_id: int = None,
    field: str = None,
    region: str = None,
    db: Session = Depends(get_db)
):
    svc = ProgramService(db)
    return svc.list_programs(institution_id=institution_id, field=field, region=region)


@router.get("/{id}", response_model=schemas.ProgramRead)
def get_program(id: int, db: Session = Depends(get_db)):
    svc = ProgramService(db)
    try:
        return svc.get_program(id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Program not found")


@router.post("/", response_model=schemas.ProgramRead, status_code=status.HTTP_201_CREATED,
             dependencies=[Depends(require_role("ministry", "admin"))])
def create_program(payload: schemas.ProgramCreate, db: Session = Depends(get_db)):
    svc = ProgramService(db)
    return svc.create_program(payload)


@router.put("/{id}", response_model=schemas.ProgramRead,
            dependencies=[Depends(require_role("ministry", "admin"))])
def update_program(
    id: int,
    payload: schemas.ProgramCreate,  # or a dedicated ProgramUpdate schema
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    svc = ProgramService(db)
    updated = svc.update_program(id, payload)
    if not updated:
        raise HTTPException(status_code=404, detail="Program not found")
    return updated

@router.post("/bulk")
def create_programs_bulk(
    payload: list[schemas.ProgramCreate],
    db: Session = Depends(get_db)
):
    db.add_all([Program(**p.dict()) for p in payload])
    db.commit()
    return {"inserted": len(payload)}
