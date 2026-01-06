from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.features.recommendations.schemas import RecommendationQuestionnaire
from app.database import get_db
from app.features.recommendations.model import Recommendation
from app.features.recommendations.service import RecommendationService
from app.features.recommendations.schemas import RecommendationRead, RecommendationUpdate
from app.core.jwt import get_current_user

router = APIRouter(prefix="/recommendations", tags=["recommendations"])

@router.post("/{student_id}", response_model=List[RecommendationRead])
def generate_recommendations(
    student_id: int,
    questionnaire: RecommendationQuestionnaire,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    svc = RecommendationService(db)
    try:
        results = svc.generate_for_student(student_id, questionnaire=questionnaire)
    except ValueError:
        raise HTTPException(status_code=404, detail="Student not found")
    return results

@router.get("/student/{student_id}", response_model=List[RecommendationRead])
def list_recommendations_for_student(
    student_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    """
    List all recommendations for a student.
    """
    svc = RecommendationService(db)
    return svc.list_recommendations_for_student(student_id)

@router.put("/{recommendation_id}", response_model=RecommendationRead)
def update_recommendation(
    recommendation_id: int,
    payload: RecommendationUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    svc = RecommendationService(db)
    updated_rec = svc.update_recommendation(recommendation_id, payload)
    if not updated_rec:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    return updated_rec