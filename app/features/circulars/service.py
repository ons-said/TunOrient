from sqlalchemy.orm import Session
from typing import List
from app.features.circulars.repository import CircularRepository
from app.features.circulars.schemas import CircularCreate
from app.features.circulars.model import MinisterialCircular

class CircularService:
    def __init__(self, db: Session):
        self.repo = CircularRepository(db)
        self.db = db

    def create_circular(self, payload: CircularCreate) -> MinisterialCircular:
        data = payload.model_dump()
        return self.repo.create(**data)

    def list_circulars(self) -> List[MinisterialCircular]:
        return self.repo.list_all()

    def get_circular(self, id: int) -> MinisterialCircular:
        obj = self.repo.get(id)
        if not obj:
            raise ValueError("Circular not found")
        return obj

    def update_circular(self, circular_id: int, payload):
        return self.repo.update(circular_id, payload)

    def delete_circular(self, circular_id: int) -> bool:
        circular = self.db.query(MinisterialCircular).filter(MinisterialCircular.id == circular_id).first()
        if not circular:
            return False
        self.db.delete(circular)
        self.db.commit()
        return True