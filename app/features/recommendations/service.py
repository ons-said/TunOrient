from sqlalchemy.orm import Session
from typing import Dict, List, Optional
import math

class RecommendationService:
    
    @staticmethod
    def calculate_fg(bac_type: str, grades: Dict[str, float]) -> float:
        """Calculate FG (الصيغة الإجمالية) based on bac type"""
        if bac_type == "Lettres":
            return 4*grades.get("MG", 0) + 1.5*grades.get("A", 0) + 1.5*grades.get("PH", 0) + grades.get("HG", 0) + grades.get("F", 0) + grades.get("Ang", 0)
        elif bac_type == "Mathématiques":
            return 4*grades.get("MG", 0) + 2*grades.get("M", 0) + 1.5*grades.get("SP", 0) + 0.5*grades.get("SVT", 0) + grades.get("F", 0) + grades.get("Ang", 0)
        elif bac_type == "Sciences Expérimentales":
            return 4*grades.get("MG", 0) + grades.get("M", 0) + 1.5*grades.get("SP", 0) + 1.5*grades.get("SVT", 0) + grades.get("F", 0) + grades.get("Ang", 0)
        elif bac_type == "Économiques et Gestion":
            return 4*grades.get("MG", 0) + 1.5*grades.get("Ec", 0) + 1.5*grades.get("Ge", 0) + 0.5*grades.get("M", 0) + 0.5*grades.get("HG", 0) + grades.get("F", 0) + grades.get("Ang", 0)
        else:
            # Default formula for other sections
            return 4*grades.get("MG", 0) + grades.get("F", 0) + grades.get("Ang", 0)
    
    @staticmethod
    def calculate_total_points(formula: str, fg: float, grades: Dict[str, float]) -> float:
        """Calculate total points for a program"""
        # Replace FG with value
        formula = formula.replace("FG", str(fg))
        
        # Replace subject codes with grades
        subject_map = {
            "A": grades.get("A", 0), "Ang": grades.get("Ang", 0), "F": grades.get("F", 0),
            "M": grades.get("M", 0), "SP": grades.get("SP", 0), "SVT": grades.get("SVT", 0),
            "PH": grades.get("PH", 0), "HG": grades.get("HG", 0), "Ec": grades.get("Ec", 0),
            "Ge": grades.get("Ge", 0), "Algo": grades.get("Algo", 0), "STI": grades.get("STI", 0),
            "EP": grades.get("EP", 0), "ESP": grades.get("ESP", 0)
        }
        
        for subject, value in subject_map.items():
            formula = formula.replace(subject, str(value))
        
        # Handle Max function
        formula = formula.replace("Max", "max")
        
        try:
            # Safe evaluation
            result = eval(formula, {"__builtins__": {}}, {"max": max, "min": min})
            return float(result)
        except:
            return fg
    
    @staticmethod
    def generate_recommendations(
        db: Session,
        student_id: int,
        bac_type: str,
        grades: Dict[str, float],
        governorate: str,
        preferences: List[str] = None,
        min_choices: int = 6
    ):
        """Generate recommendations for a student"""
        from app.features.programs.model import Program
        from app.features.institutions.model import Institution
        from app.features.universities.model import University
        from app.features.students.model import Student
        
        # Get student
        student = db.query(Student).filter(Student.id == student_id).first()
        if not student:
            return None
        
        # Calculate FG
        fg = RecommendationService.calculate_fg(bac_type, grades)
        
        # Get all programs matching bac_type
        programs = db.query(Program).join(Institution).join(University).all()
        
        results = []
        for program in programs:
            # Check if program accepts this bac_type
            if program.bac_section and bac_type not in program.bac_section:
                continue
            
            # Check minimum average
            if program.min_average and grades.get("MG", 0) < program.min_average:
                continue
            
            # Calculate total points
            total_points = RecommendationService.calculate_total_points(
                program.score_formula, fg, grades
            )
            
            # Apply geographic bonus (7%)
            geographic_bonus = 0.07 if (
                governorate == program.institution.university.region
            ) else 0.0
            
            total_with_bonus = total_points * (1 + geographic_bonus)
            
            # Check if meets last year's cutoff
            meets_cutoff = True
            if program.last_admitted_score:
                meets_cutoff = total_with_bonus >= float(program.last_admitted_score)
            
            # Check preferences
            preference_match = False
            if preferences:
                for pref in preferences:
                    if pref.lower() in program.field.lower() or pref.lower() in program.name.lower():
                        preference_match = True
                        break
            
            results.append({
                "program_id": program.id,
                "program_name": program.name,
                "institution": program.institution.name,
                "university": program.institution.university.name,
                "field": program.field,
                "total_points": round(total_points, 2),
                "total_points_with_bonus": round(total_with_bonus, 2),
                "last_admitted_score": float(program.last_admitted_score) if program.last_admitted_score else None,
                "meets_cutoff": meets_cutoff,
                "geographic_bonus": geographic_bonus * 100,  # Percentage
                "requires_selection": program.reorientation_mode == "exam",
                "preference_match": preference_match
            })
        
        # Sort by total points with bonus
        results.sort(key=lambda x: x["total_points_with_bonus"], reverse=True)
        
        # Categorize recommendations
        categorized = {
            "safe_choices": [],
            "realistic_choices": [],
            "reach_choices": []
        }
        
        for i, result in enumerate(results[:30]):  # Top 30
            if result["meets_cutoff"] and result["total_points_with_bonus"] > (result["last_admitted_score"] or 0) * 1.05:
                result["category"] = "safe"
                categorized["safe_choices"].append(result)
            elif result["meets_cutoff"]:
                result["category"] = "realistic"
                categorized["realistic_choices"].append(result)
            else:
                result["category"] = "reach"
                categorized["reach_choices"].append(result)
        
        return {
            "student_fg": round(fg, 2),
            "categorized_recommendations": categorized,
            "top_choices": results[:min_choices],
            "total_programs_evaluated": len(results)
        }