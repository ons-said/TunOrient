from sqlalchemy.orm import Session
from typing import List
from app.features.circulars.model import MinisterialCircular

class CircularRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, **data) -> MinisterialCircular:
        obj = MinisterialCircular(**data)
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)
        return obj

    def list_all(self) -> List[MinisterialCircular]:
        return self.db.query(MinisterialCircular).order_by(MinisterialCircular.id).all()

    def get(self, id: int):
        return self.db.query(MinisterialCircular).filter(MinisterialCircular.id == id).first()

    def update(self, circular_id: int, payload) -> MinisterialCircular | None:
        circular = self.db.query(MinisterialCircular).filter(MinisterialCircular.id == circular_id).first()
        if not circular:
            return None
        for field, value in payload.dict(exclude_unset=True).items():
            setattr(circular, field, value)
        self.db.commit()
        self.db.refresh(circular)
        return circular