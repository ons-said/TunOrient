from sqlalchemy.orm import Session
from typing import List, Optional
from app.features.universities.model import University

class UniversityRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, name: str, region: Optional[str] = None) -> University:
        obj = University(name=name, region=region)
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)
        return obj

    def get(self, id: int) -> Optional[University]:
        return self.db.query(University).filter(University.id == id).first()

    def list_all(self) -> List[University]:
        return self.db.query(University).order_by(University.id).all()