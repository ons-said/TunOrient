from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from contextlib import contextmanager
import os

from app.core.config import settings

DB_FILE = os.path.join(os.path.dirname(__file__), "..", "tunorient.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_FILE}"

# sqlite dev engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def recreate_database():
    """
    DEV helper: delete DB file and recreate tables from models.
    Use only in development.
    """
    try:
        if os.path.exists(DB_FILE):
            os.remove(DB_FILE)
    except Exception:
        pass
    # import models so metadata is populated
    import app.features.auth.model  # noqa: F401
    import app.features.students.model  # noqa: F401
    import app.features.universities.model  # noqa: F401
    import app.features.institutions.model  # noqa: F401
    import app.features.programs.model  # noqa: F401
    import app.features.circulars.model  # noqa: F401

    Base.metadata.create_all(bind=engine)