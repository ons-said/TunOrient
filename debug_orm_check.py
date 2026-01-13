import sys
import os

# Ensure app can be imported
sys.path.append(os.getcwd())

from app.database import SessionLocal
# Import ALL models involved to avoid relationship errors
from app.features.institutions.model import Institution
from app.features.programs.model import Program

session = SessionLocal()

print("Checking programs via ORM...")
try:
    # Mimic the service logic
    query = session.query(Program).filter(Program.reorientation_allowed == True)
    programs = query.all()
    
    print(f"Service logic found {len(programs)} programs.")
    for p in programs[:5]:
        print(f"ID: {p.id}, Name: {p.name}, Reorientation Allowed: {p.reorientation_allowed}")
        
    if len(programs) == 0:
        # Try checking simply all
        all_progs = session.query(Program).count()
        print(f"Total programs visible to ORM: {all_progs}")
        
except Exception as e:
    print(f"Query failed: {e}")
