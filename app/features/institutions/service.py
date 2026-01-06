from sqlalchemy.orm import Session
from typing import List
from app.features.institutions.repository import InstitutionRepository
from app.features.institutions.schemas import InstitutionCreate
from app.features.institutions.model import Institution

class InstitutionService:
    def __init__(self, db: Session):
        self.repo = InstitutionRepository(db)

    def create_institution(self, payload: InstitutionCreate) -> Institution:
        return self.repo.create(payload.name, payload.university_id)

    def get_institution(self, id: int) -> Institution:
        obj = self.repo.get(id)
        if not obj:
            raise ValueError("Institution not found")
        return obj

    def list_institutions(self) -> List[Institution]:
        return self.repo.list_all()

    def update_institution(self, institution_id: int, payload) -> Institution | None:
        """
        Update an institution by its ID.
        Payload should be a Pydantic schema or dict with updatable fields.
        """
        updated = self.repo.update(institution_id, payload)
        if not updated:
            raise ValueError("Institution not found")
        return updated