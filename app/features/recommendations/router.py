from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.features.recommendations.schemas import RecommendationInput
from app.features.recommendations.service import RecommendationService
from app.database import get_db
from app.features.recommendations.model import Recommendation

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
        
        # --- Save recommendations to DB ---
        for rec in recommendations["top_choices"]:
            db_rec = Recommendation(
                student_id=student_id,
                program_id=rec["program_id"],
                program_name=rec["program_name"],
                institution=rec["institution"],
                university=rec["university"],
                field=rec["field"],
                total_points=rec["total_points"],
                total_points_with_bonus=rec["total_points_with_bonus"],
                last_admitted_score=rec["last_admitted_score"],
                meets_cutoff=rec["meets_cutoff"],
                geographic_bonus=rec["geographic_bonus"],
                requires_selection=rec["requires_selection"],
                preference_match=rec["preference_match"],
                category=rec["category"],
            )
            db.add(db_rec)
        db.commit()
        # --- End save ---

        return {
            "success": True,
            "data": recommendations,
            "message": f"Generated and saved {len(recommendations['top_choices'])} recommendations"
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
    recommendations = db.query(Recommendation).filter(Recommendation.student_id == student_id).all()
    data = [
        {
            "program_id": rec.program_id,
            "program_name": rec.program_name,
            "institution": rec.institution,
            "university": rec.university,
            "field": rec.field,
            "total_points": rec.total_points,
            "total_points_with_bonus": rec.total_points_with_bonus,
            "last_admitted_score": rec.last_admitted_score,
            "meets_cutoff": rec.meets_cutoff,
            "geographic_bonus": rec.geographic_bonus,
            "requires_selection": rec.requires_selection,
            "preference_match": rec.preference_match,
            "category": rec.category,
        }
        for rec in recommendations
    ]
    return {
        "success": True,
        "data": data,
        "message": f"Found {len(data)} recommendations for student {student_id}"
    }

@router.get("/{student_id}/{rec_id}")
async def get_recommendation_by_student_and_id(
    student_id: int,
    rec_id: int,
    db: Session = Depends(get_db)
):
    """
    Get a single recommendation by student ID and recommendation ID
    """
    rec = db.query(Recommendation).filter(
        Recommendation.student_id == student_id,
        Recommendation.id == rec_id
    ).first()
    if not rec:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    return {
        "success": True,
        "data": {
            "program_id": rec.program_id,
            "program_name": rec.program_name,
            "institution": rec.institution,
            "university": rec.university,
            "field": rec.field,
            "total_points": rec.total_points,
            "total_points_with_bonus": rec.total_points_with_bonus,
            "last_admitted_score": rec.last_admitted_score,
            "meets_cutoff": rec.meets_cutoff,
            "geographic_bonus": rec.geographic_bonus,
            "requires_selection": rec.requires_selection,
            "preference_match": rec.preference_match,
            "category": rec.category,
        },
        "message": f"Recommendation {rec_id} for student {student_id} found"
    }

