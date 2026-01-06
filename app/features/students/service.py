from sqlalchemy.orm import Session
from typing import Optional, List
from app.features.students.model import Student
from app.features.students.schemas import StudentCreate, StudentUpdate
from app.features.recommendations.model import Recommendation
from app.features.programs.model import Program
import ast

class StudentService:
    def __init__(self, db: Session):
        self.db = db

    def create_student(self, payload: StudentCreate, user_id: int) -> Student:
        obj = Student(
            user_id=user_id,
            academic_level=payload.academic_level,
            bac_section=payload.bac_section,
            bac_average=payload.bac_average,
            bac_year=payload.bac_year,
            governorate=payload.governorate,
        )
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)
        return obj

    def get_student(self, student_id: int) -> Optional[Student]:
        return self.db.query(Student).filter(Student.id == student_id).first()

    def update_student(self, student_id: int, payload: StudentUpdate) -> Student:
        obj = self.get_student(student_id)
        if payload.academic_level is not None:
            obj.academic_level = payload.academic_level
        if payload.bac_section is not None:
            obj.bac_section = payload.bac_section
        if payload.bac_average is not None:
            obj.bac_average = payload.bac_average
        if payload.bac_year is not None:
            obj.bac_year = payload.bac_year
        if payload.governorate is not None:
            obj.governorate = payload.governorate
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)
        return obj

    def delete_student(self, student_id: int):
        obj = self.get_student(student_id)
        self.db.delete(obj)
        self.db.commit()

    def list_students(self) -> List[Student]:
        return self.db.query(Student).all()

   