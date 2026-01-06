from sqlalchemy.orm import Session
from typing import List, Optional
from app.features.recommendations.model import Recommendation

class RecommendationRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, **kwargs) -> Recommendation:
        rec = Recommendation(**kwargs)
        self.db.add(rec)
        self.db.commit()
        self.db.refresh(rec)
        return rec

    def list_by_student(self, student_id: int) -> List[Recommendation]:
        return self.db.query(Recommendation).filter(Recommendation.student_id == student_id).all()

    def get(self, rec_id: int) -> Optional[Recommendation]:
        return self.db.query(Recommendation).filter(Recommendation.id == rec_id).first()