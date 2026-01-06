from sqlalchemy.orm import Session
from typing import List
from app.features.universities.repository import UniversityRepository
from app.features.universities.model import University
from app.features.universities.schemas import UniversityCreate

class UniversityService:
    def __init__(self, db: Session):
        self.repo = UniversityRepository(db)

    def create_university(self, payload: UniversityCreate) -> University:
        return self.repo.create(payload.name, payload.region)

    def get_university(self, id: int) -> University:
        obj = self.repo.get(id)
        if not obj:
            raise ValueError("University not found")
        return obj

    def list_universities(self) -> List[University]:
        return self.repo.list_all()