from app.database import SessionLocal
from app.features.auth.model import User

db = SessionLocal()
db.query(User).delete()
db.commit()
db.close()
print("All users deleted.")