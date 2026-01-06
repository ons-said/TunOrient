from sqlalchemy.orm import Session
from typing import List, Optional
from app.features.programs.model import Program
from app.features.programs.repository import ProgramRepository
from app.features.programs.schemas import ProgramCreate
import json

class ProgramService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = ProgramRepository(db)

    def create_program(self, payload: ProgramCreate) -> Program:
        required_subjects = (
            json.dumps(payload.required_subjects)
            if payload.required_subjects is not None else None
        )
        obj = Program(
            name=payload.name,
            degree=payload.degree,
            field=payload.field,
            capacity=payload.capacity,
            institution_id=payload.institution_id,
            reorientation_allowed=payload.reorientation_allowed,
            reorientation_mode=payload.reorientation_mode,
            bac_section=payload.bac_section,
            min_average=payload.min_average,
            score_formula=payload.score_formula,
            required_subjects=required_subjects,
            additional_conditions=payload.additional_conditions,
            academic_year=payload.academic_year,
            last_admitted_score=payload.last_admitted_score,
            notes=payload.notes,
        )
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)
        return obj

    def get_program(self, id: int) -> Program:
        obj = self.repo.get(id)
        if not obj:
            raise ValueError("Program not found")
        return obj

    def list_programs(
        self,
        institution_id: int = None,
        field: str = None,
        region: str = None
    ) -> List[Program]:
        query = self.db.query(Program)
        if institution_id is not None:
            query = query.filter(Program.institution_id == institution_id)
        if field is not None:
            query = query.filter(Program.field == field)
        if region is not None:
            query = query.filter(Program.region == region)  # Make sure Program has a 'region' attribute
        return query.all()

    def update_program(self, program_id: int, payload: ProgramCreate) -> Optional[Program]:
        program = self.repo.get(program_id)
        if not program:
            return None
        data = payload.dict(exclude_unset=True)
        # Serialize required_subjects if present
        if "required_subjects" in data and data["required_subjects"] is not None:
            data["required_subjects"] = json.dumps(data["required_subjects"])
        for field, value in data.items():
            setattr(program, field, value)
        self.db.commit()
        self.db.refresh(program)
        return program

    def update_admission_rules(
        self,
        program_id: int,
        bac_section: Optional[str] = None,
        min_average: Optional[float] = None,
        score_formula: Optional[str] = None,
        required_subjects: Optional[list] = None,
        additional_conditions: Optional[str] = None,
        academic_year: Optional[str] = None,
        last_admitted_score: Optional[float] = None,
        notes: Optional[str] = None
    ) -> Optional[Program]:
        return self.repo.update_admission_rules(
            program_id,
            bac_section,
            min_average,
            score_formula,
            required_subjects,
            additional_conditions,
            academic_year,
            last_admitted_score,
            notes
        )