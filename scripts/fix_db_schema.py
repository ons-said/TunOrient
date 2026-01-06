
import sqlite3
import os

# Path to database
DB_PATH = os.path.join(os.path.dirname(__file__), "..", "tunorient.db")

def fix_database():
    if not os.path.exists(DB_PATH):
        print(f"Database not found at {DB_PATH}")
        return

    print(f"Connecting to database at {DB_PATH}...")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    try:
        # Check if bac_grades column exists
        cursor.execute("PRAGMA table_info(students)")
        columns = [info[1] for info in cursor.fetchall()]
        
        if "bac_grades" not in columns:
            print("Adding missing column 'bac_grades' to 'students' table...")
            # SQLite does not have a native JSON type, it stores it as TEXT/JSON affinity
            # accessing it via SQLAlchemy JSON type works fine.
            cursor.execute("ALTER TABLE students ADD COLUMN bac_grades JSON")
            conn.commit()
            print("Successfully added 'bac_grades' column.")
        else:
            print("Column 'bac_grades' already exists.")

    except Exception as e:
        print(f"Error updating database: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    fix_database()
