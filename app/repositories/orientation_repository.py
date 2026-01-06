from sqlalchemy.orm import Session
from app.models.orientation import Orientation
from app.schemas.orientation import OrientationCreate, OrientationUpdate

class OrientationRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_orientation(self, orientation: OrientationCreate) -> Orientation:
        db_orientation = Orientation(**orientation.dict())
        self.db.add(db_orientation)
        self.db.commit()
        self.db.refresh(db_orientation)
        return db_orientation

    def get_orientation_by_id(self, orientation_id: int) -> Orientation:
        return self.db.query(Orientation).filter(Orientation.id == orientation_id).first()

    def update_orientation(self, orientation_id: int, orientation: OrientationUpdate) -> Orientation:
        db_orientation = self.get_orientation_by_id(orientation_id)
        if db_orientation:
            for key, value in orientation.dict(exclude_unset=True).items():
                setattr(db_orientation, key, value)
            self.db.commit()
            self.db.refresh(db_orientation)
        return db_orientation

    def delete_orientation(self, orientation_id: int) -> None:
        db_orientation = self.get_orientation_by_id(orientation_id)
        if db_orientation:
            self.db.delete(db_orientation)
            self.db.commit()

    def get_all_orientations(self) -> list[Orientation]:
        return self.db.query(Orientation).all()