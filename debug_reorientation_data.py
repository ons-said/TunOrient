import sys
import os

# Ensure app can be imported
sys.path.append(os.getcwd())

from app.database import SessionLocal
from app.features.programs.model import Program
from sqlalchemy import text

session = SessionLocal()

with open("debug_results.txt", "w", encoding="utf-8") as f:
    f.write("Checking programs with reorientation_allowed = True...\n")
    try:
        programs = session.query(Program).filter(Program.reorientation_allowed == True).all()
        f.write(f"Found {len(programs)} programs.\n")
        for p in programs[:5]:
            f.write(f"ID: {p.id}, Name: {p.name}, Reorientation Allowed: {p.reorientation_allowed}\n")
    except Exception as e:
        f.write(f"Query failed: {e}\n")

    # Check total programs
    total = session.query(Program).count()
    f.write(f"Total programs in DB: {total}\n")

    # Check raw count to verify boolean handling
    raw_query = text("SELECT count(*) FROM programs WHERE reorientation_allowed = 1 OR reorientation_allowed = true")
    try:
        result = session.execute(raw_query).scalar()
        f.write(f"Raw SQL count check: {result}\n")
    except Exception as e:
        f.write(f"Raw SQL check failed: {e}\n")
