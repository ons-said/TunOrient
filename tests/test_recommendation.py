import requests
import json

BASE_URL = "http://localhost:8000/api/v1/recommendations/4"  # Update with your URL

# Test student data
test_data = {
    "bac_type": "Mathématiques",
    "bac_grades": {
        "MG": 15.5,  # Moyenne Générale
        "M": 18,     # Mathématiques
        "SP": 16,    # Sciences Physiques
        "SVT": 14,   # SVT
        "F": 15,     # Français
        "Ang": 16    # Anglais
    },
    "governorate": "Tunis",
    "preferences": ["Informatique", "Génie"],
    "min_choices": 6
}

# First, create a student or get existing student ID
# For testing, use an existing student ID
student_id = 1  # Change to your student ID

response = requests.post(
    f"{BASE_URL}/api/v1/recommendations/{student_id}",
    json=test_data
)

if response.status_code == 200:
    result = response.json()
    print("✅ Recommendations generated successfully!")
    print(f"📊 FG calculated: {result['data']['student_fg']}")
    print(f"🎯 Top recommendations:")
    
    for i, rec in enumerate(result['data']['top_choices'], 1):
        print(f"{i}. {rec['program_name']}")
        print(f"   Points: {rec['total_points_with_bonus']}")
        print(f"   Dernier admis: {rec['last_admitted_score']}")
        print()
else:
    print(f"❌ Error: {response.status_code}")
    print(response.text)