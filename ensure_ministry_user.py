from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.features.auth.model import User
from app.database import SQLALCHEMY_DATABASE_URL
from app.core.security import hash_password     

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
db = SessionLocal()

email = "ministry@education.tn"
password = "ministry123"
hashed = hash_password(password)

user = db.query(User).filter(User.email == email).first()

if user:
    print(f"User {email} found. Updating credentials...")
    user.hashed_password = hashed
    user.role = "ministry"
    user.is_active = True
    db.commit()
    print(f"Updated! Role: {user.role}")
else:
    print(f"User {email} not found. Creating...")
    user = User(
        email=email,
        hashed_password=hashed,
        role="ministry",
        is_active=True
    )
    db.add(user)
    db.commit()
    print("Created new ministry user!")

print(f"Credentials:\nEmail: {email}\nPassword: {password}")
