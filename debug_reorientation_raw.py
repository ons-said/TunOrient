import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "tunorient.db")

with open("debug_raw_results.txt", "w", encoding="utf-8") as f:
    f.write(f"Connecting to {DB_PATH}\n")
    if not os.path.exists(DB_PATH):
        f.write("DB file does not exist!\n")
        exit()
        
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    f.write("Checking programs table columns...\n")
    cursor.execute("PRAGMA table_info(programs)")
    columns = cursor.fetchall()
    for col in columns:
        f.write(str(col) + "\n")

    f.write("\nChecking programs count with reorientation_allowed...\n")
    # Try checking for true/1
    try:
        cursor.execute("SELECT count(*) FROM programs WHERE reorientation_allowed = 1 OR reorientation_allowed = 'true' OR reorientation_allowed = 't'")
        count = cursor.fetchone()[0]
        f.write(f"Found {count} programs matching filter.\n")
        
        if count > 0:
            cursor.execute("SELECT p.id, p.name, p.institution_id, i.name FROM programs p LEFT JOIN institutions i ON p.institution_id = i.id WHERE p.reorientation_allowed = 1 LIMIT 10")
            rows = cursor.fetchall()
            for row in rows:
                f.write(f"ProgID: {row[0]}, Name: {row[1]}, InstID: {row[2]}, InstName: {row[3]}\n")
    except Exception as e:
        f.write(f"Query failed: {e}\n")

    f.write("\nChecking a sample program to see the value:\n")
    cursor.execute("SELECT id, name, reorientation_allowed FROM programs LIMIT 10")
    rows = cursor.fetchall()
    for row in rows:
        f.write(str(row) + "\n")

    conn.close()
