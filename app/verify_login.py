from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.features.auth.model import User
from app.core.security import verify_password, hash_password

def test_login(email, password):
    db: Session = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        if not user:
            print(f"User not found: {email}")
            return

        print(f"User found: {user.email}")
        print(f"Stored Hash: {user.hashed_password}")
        
        is_valid = verify_password(password, user.hashed_password)
        print(f"Password '{password}' valid? {is_valid}")
        
        # Double check generation
        new_hash = hash_password(password)
        print(f"New Hash of '{password}': {new_hash}")
        print(f"Verify against new hash? {verify_password(password, new_hash)}")

    finally:
        db.close()

if __name__ == "__main__":
    print("Testing Admin Login...")
    test_login("admin@tunorient.tn", "admin123")
    
    print("\nTesting Ministry Login...")
    test_login("ministry@tunorient.tn", "ministry123")
