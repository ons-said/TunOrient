from app.database import SessionLocal
from app.features.recommendations.service import RecommendationService
from app.features.recommendations.schemas import RecommendationQuestionnaire
from app.features.students.model import Student

def test_recommendation():
    db = SessionLocal()
    try:
        # Get the first student
        student = db.query(Student).first()
        if not student:
            print("No students found in DB.")
            return

        print(f"Testing for Student ID: {student.id}, Section: {student.bac_section}")

        # Mock Questionnaire
        q = RecommendationQuestionnaire(
            formule_globale=140.0, # Good score
            interests=["Technology", "Engineering"],
            preferred_fields=[], # No preference filter
            preferred_regions=[], # No region filter
            study_style="practical"
        )
        
        svc = RecommendationService(db)
        
        # Call generate
        results = svc.generate_for_student(student.id, q)
        
        print(f"Generated {len(results)} recommendations.")
        for r in results:
            print(f" - Program ID {r.program_id}: Score {r.fit_score}, Likelihood {r.likelihood}")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    test_recommendation()
