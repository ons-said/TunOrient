from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.features.auth.model import User
from app.database import SQLALCHEMY_DATABASE_URL

# Setup DB connection
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
db = SessionLocal()

# List all users
users = db.query(User).all()
print(f"Found {len(users)} users:")
for u in users:
    print(f"ID: {u.id} | Email: {u.email} | Role: {u.role} | Active: {u.is_active}")
    print(f"   Hash: {u.hashed_password[:15]}...")

