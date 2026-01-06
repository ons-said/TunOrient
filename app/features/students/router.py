from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.features.students import schemas
from app.features.students.service import StudentService
from app.database import get_db
from app.core.jwt import get_current_user, require_role
from app.features.auth.model import User  # Adjust import path as needed
from app.features.auth.schemas import UserRead  # Adjust import path as needed

router = APIRouter(prefix="/students", tags=["students"])


@router.post("/", response_model=schemas.StudentRead, status_code=status.HTTP_201_CREATED,
             dependencies=[Depends(require_role("student"))])
def create(payload: schemas.StudentCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    svc = StudentService(db)
    return svc.create_student(payload, user_id=current_user.id)


@router.get("/{student_id}", response_model=schemas.StudentRead)
def read(student_id: int, db: Session = Depends(get_db)):
    svc = StudentService(db)
    obj = svc.get_student(student_id)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    return obj


@router.put("/{student_id}", response_model=schemas.StudentRead,
            dependencies=[Depends(require_role("student", "admin"))])
def update(student_id: int, payload: schemas.StudentUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    svc = StudentService(db)
    obj = svc.get_student(student_id)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    if getattr(current_user, "role", None) != "admin" and obj.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cannot modify another user's profile")
    return svc.update_student(student_id, payload)


@router.delete("/{student_id}", status_code=status.HTTP_204_NO_CONTENT,
               dependencies=[Depends(require_role("student", "admin"))])
def delete(student_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    svc = StudentService(db)
    obj = svc.get_student(student_id)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    if getattr(current_user, "role", None) != "admin" and obj.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cannot delete another user's profile")
    svc.delete_student(student_id)
    return None


@router.get("/", response_model=List[schemas.StudentRead],
            dependencies=[Depends(require_role("admin", "ministry"))])
def list_all(db: Session = Depends(get_db)):
    svc = StudentService(db)
    return svc.list_students()


@router.get("/user-list", response_model=List[UserRead], dependencies=[Depends(require_role("ministry"))])
def list_student_users(db: Session = Depends(get_db)):
    return db.query(User).filter(User.role == "student").all()