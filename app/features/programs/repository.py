from sqlalchemy.orm import Session
from typing import List, Optional
from app.features.programs.model import Program

class ProgramRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, payload) -> Program:
        obj = Program(**payload.dict())
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)
        return obj

    def list_all(self) -> List[Program]:
        return self.db.query(Program).order_by(Program.id).all()

    def get(self, program_id: int) -> Optional[Program]:
        return self.db.query(Program).filter(Program.id == program_id).first()

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
        program = self.get(program_id)
        if not program:
            return None
        if bac_section is not None:
            program.bac_section = bac_section
        if min_average is not None:
            program.min_average = min_average
        if score_formula is not None:
            program.score_formula = score_formula
        if required_subjects is not None:
            program.required_subjects = required_subjects
        if additional_conditions is not None:
            program.additional_conditions = additional_conditions
        if academic_year is not None:
            program.academic_year = academic_year
        if last_admitted_score is not None:
            program.last_admitted_score = last_admitted_score
        if notes is not None:
            program.notes = notes
        self.db.commit()
        self.db.refresh(program)
        return program