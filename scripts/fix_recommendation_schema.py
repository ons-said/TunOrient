import sqlite3
import os

# Path to database
DB_PATH = os.path.join(os.path.dirname(__file__), "..", "tunorient.db")

def add_missing_columns():
    columns_to_add = [
        ("program_name", "TEXT"),
        ("institution", "TEXT"),
        ("university", "TEXT"),
        ("field", "TEXT"),
        ("total_points", "REAL"),
        ("total_points_with_bonus", "REAL"),
        ("last_admitted_score", "REAL"),
        ("meets_cutoff", "BOOLEAN"),
        ("geographic_bonus", "REAL"),
        ("requires_selection", "BOOLEAN"),
        ("preference_match", "BOOLEAN"),
        ("category", "TEXT"),
    ]

    if not os.path.exists(DB_PATH):
        print(f"Database not found at {DB_PATH}")
        return

    print(f"Connecting to database at {DB_PATH}...")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    try:
        cursor.execute("PRAGMA table_info(recommendations)")
        existing_columns = [info[1] for info in cursor.fetchall()]

        for col_name, col_type in columns_to_add:
            if col_name not in existing_columns:
                print(f"Adding missing column '{col_name}' ({col_type}) to 'recommendations' table...")
                cursor.execute(f"ALTER TABLE recommendations ADD COLUMN {col_name} {col_type}")
                conn.commit()
                print(f"Successfully added '{col_name}' column.")
            else:
                print(f"Column '{col_name}' already exists.")

    except Exception as e:
        print(f"Error updating database: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    add_missing_columns()