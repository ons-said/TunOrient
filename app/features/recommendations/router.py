from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.features.recommendations.schemas import RecommendationInput
from app.features.recommendations.service import RecommendationService
from app.database import get_db

router = APIRouter(
    prefix="/recommendations",
    tags=["recommendations"]
)

@router.post("/{student_id}")
async def generate_recommendations(
    student_id: int,
    recommendation_input: RecommendationInput,
    db: Session = Depends(get_db)
):
    """
    Generate university program recommendations for a student based on Tunisian orientation system
    """
    try:
        recommendations = RecommendationService.generate_recommendations(
            db=db,
            student_id=student_id,
            bac_type=recommendation_input.bac_type,
            grades=recommendation_input.bac_grades,
            governorate=recommendation_input.governorate,
            preferences=recommendation_input.preferences,
            min_choices=recommendation_input.min_choices
        )
        
        if not recommendations:
            raise HTTPException(status_code=404, detail="Student not found")
        
        return {
            "success": True,
            "data": recommendations,
            "message": f"Generated {len(recommendations['top_choices'])} recommendations"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/student/{student_id}")
async def list_recommendations_for_student(
    student_id: int,
    db: Session = Depends(get_db)
):
    """
    Get all recommendations for a student (from database)
    """
    # You can implement storing recommendations in DB later
    # For now, return empty or placeholder
    return {
        "success": True,
        "data": [],
        "message": "No stored recommendations found"
    }