from sqlalchemy.orm import Session
from typing import List
import ast
import json

from app.features.students.model import Student
from app.features.programs.model import Program
from app.features.recommendations.model import Recommendation


class RecommendationService:
    """
    RecommendationService:
    - Uses questionnaire grades and program admission rule fields (score_formula, etc.)
    - Persists Recommendation rows (fit_score and likelihood)
    - Filters by preferred fields and regions
    - Ranks recommendations by fit_score descending
    """

    def __init__(self, db: Session):
        self.db = db

    # ------------------------------------------------------------------
    # OPTIONAL: keep this if you want formula-based scoring later
    # ------------------------------------------------------------------
    def calculate_fit_score_from_grades(self, grades: dict, program: Program) -> float | None:
        formula = getattr(program, "score_formula", None)
        if not formula or not grades:
            return None

        expr = formula
        for subject, grade in grades.items():
            expr = expr.replace(subject, str(grade))

        try:
            return ast.literal_eval(expr)
        except Exception:
            return None

    # ------------------------------------------------------------------
    # SCORING HELPERS
    # ------------------------------------------------------------------
    def academic_fit(self, student_score: float, program: Program) -> float:
        if student_score is None:
            return 0

        if program.last_admitted_score is not None:
            diff = student_score - float(program.last_admitted_score)

            if diff >= 3:
                score = 95
            elif diff >= 1:
                score = 80
            elif diff >= -1:
                score = 60
            elif diff >= -3:
                score = 40
            else:
                score = 20
        else:
            score = 60  # neutral fallback

        if program.min_average is not None:
            if student_score < program.min_average + 1:
                score -= 10

        return max(min(score, 100), 0)

    def preference_fit(self, program: Program, questionnaire) -> float:
        score = 0

        if questionnaire.preferred_fields and program.field in questionnaire.preferred_fields:
            score += 50

        if questionnaire.interests and program.field in questionnaire.interests:
            score += 30

        if program.notes and questionnaire.study_style:
            if questionnaire.study_style.lower() in program.notes.lower():
                score += 20

        return min(score, 100)

    def constraint_fit(self, program: Program) -> float:
        score = 100

        if program.required_subjects:
            try:
                required = json.loads(program.required_subjects)
                score -= min(len(required) * 10, 30)
            except Exception:
                pass

        if program.reorientation_allowed is False:
            score -= 15

        return max(score, 0)

    def likelihood_label(self, academic_score: float) -> str:
        if academic_score >= 80:
            return "High"
        elif academic_score >= 55:
            return "Medium"
        else:
            return "Low"

    def decision_label(self, final_score: float, academic_score: float) -> str:
        if academic_score < 40:
            return "Not Recommended"
        elif final_score >= 80:
            return "Strongly Recommended"
        elif final_score >= 60:
            return "Recommended"
        else:
            return "Explore with Caution"

    # ------------------------------------------------------------------
    # MAIN ENTRY POINT
    # ------------------------------------------------------------------
    def generate_for_student(self, student_id: int, questionnaire, limit: int = 20) -> List[Recommendation]:
        student = self.db.query(Student).filter(Student.id == student_id).first()
        if not student:
            raise ValueError("Student not found")

        preferred_fields = questionnaire.preferred_fields
        preferred_regions = questionnaire.preferred_regions

        programs = self.db.query(Program).all()

        # Filter by preferred fields
        if preferred_fields:
            programs = [p for p in programs if p.field in preferred_fields]

        # Filter by preferred regions
        if preferred_regions:
            # We must eagerly load or join institution for this to work
            # For now, relying on lazy loading if it's not joined
            # Ideally filter in DB, but this works for smaller datasets
            programs = [p for p in programs if p.institution.region in preferred_regions]

        recommendations: List[Recommendation] = []

        # Clear existing recommendations for this student to ensure fresh results
        self.db.query(Recommendation).filter(Recommendation.student_id == student_id).delete()

        for program in programs:
            # HARD FILTERS
            if program.bac_section and student.bac_section:
                # Basic normalization
                if program.bac_section.strip().lower() != student.bac_section.strip().lower():
                    continue

            if program.min_average is not None:
                if questionnaire.formule_globale < program.min_average:
                    continue

            # SCORE COMPONENTS
            academic = self.academic_fit(questionnaire.formule_globale, program)
            preference = self.preference_fit(program, questionnaire)
            constraint = self.constraint_fit(program)

            final_fit = round(
                0.50 * academic +
                0.35 * preference +
                0.15 * constraint,
                2
            )

            likelihood = self.likelihood_label(academic)
            decision = self.decision_label(final_fit, academic)

            recommendations.append(
                Recommendation(
                    student_id=student_id,
                    program_id=program.id,
                    fit_score=final_fit,
                    likelihood=likelihood,
                    decision=decision
                )
            )

        # Clear existing recommendations if necessary? 
        # For now, we append. Ideally we might want to delete old ones for this student
        # self.db.query(Recommendation).filter(Recommendation.student_id == student_id).delete()
        
        # Persist recommendations
        self.db.add_all(recommendations)
        self.db.commit()
        for r in recommendations:
            self.db.refresh(r)

        # Rank and limit
        recommendations = sorted(
            recommendations,
            key=lambda r: r.fit_score or 0,
            reverse=True
        )

        return recommendations[:limit]

    # ------------------------------------------------------------------
    # OTHER METHODS (UNCHANGED)
    # ------------------------------------------------------------------
    def list_recommendations_for_student(self, student_id: int) -> List[Recommendation]:
        return self.db.query(Recommendation).filter(
            Recommendation.student_id == student_id
        ).all()

    def update_recommendation(self, recommendation_id: int, payload) -> Recommendation | None:
        rec = self.db.query(Recommendation).filter(
            Recommendation.id == recommendation_id
        ).first()

        if not rec:
            return None

        for field, value in payload.dict(exclude_unset=True).items():
            setattr(rec, field, value)

        self.db.commit()
        self.db.refresh(rec)
        return rec
