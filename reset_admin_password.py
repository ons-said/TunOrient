from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.features.auth.model import User
from app.database import SQLALCHEMY_DATABASE_URL
from app.core.security import hash_password

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
db = SessionLocal()

email = "admin@tunorient.tn"
new_password = "admin123"
hashed = hash_password(new_password)

user = db.query(User).filter(User.email == email).first()

if user:
    print(f"Resetting password for {email}...")
    user.hashed_password = hashed
    # Ensure role is admin too, just in case
    if user.role != "admin":
        user.role = "admin"
        print("Also promoted to admin.")
    
    db.commit()
    print(f"Success! Password is now '{new_password}'")
else:
    print(f"User {email} not found.")
