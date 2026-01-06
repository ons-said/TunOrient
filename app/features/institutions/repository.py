from sqlalchemy.orm import Session
from typing import List, Optional
from app.features.institutions.model import Institution

class InstitutionRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, name: str, university_id: int) -> Institution:
        obj = Institution(name=name, university_id=university_id)
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)
        return obj

    def get(self, id: int) -> Optional[Institution]:
        return self.db.query(Institution).filter(Institution.id == id).first()

    def list_all(self) -> List[Institution]:
        return self.db.query(Institution).order_by(Institution.id).all()
    
    def update(self, institution_id: int, payload) -> Institution | None:
        institution = self.db.query(Institution).filter(Institution.id == institution_id).first()
        if not institution:
            return None
        for field, value in payload.dict(exclude_unset=True).items():
            setattr(institution, field, value)
        self.db.commit()
        self.db.refresh(institution)
        return institution