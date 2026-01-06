from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.database import engine, Base

# import routers
from app.features.admin.router import router as admin_router
from app.features.auth.router import router as auth_router
from app.features.students.router import router as students_router
from app.features.universities.router import router as universities_router
from app.features.institutions.router import router as institutions_router
from app.features.programs.router import router as programs_router
from app.features.circulars.router import router as circulars_router
from app.features.recommendations.router import router as recommendations_router

app = FastAPI(title="TunOrient", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include routers under API prefix
prefix = "/api/v1"
app.include_router(admin_router, prefix=prefix) # New Admin Router
app.include_router(auth_router, prefix=prefix)
app.include_router(students_router, prefix=prefix)
app.include_router(universities_router, prefix=prefix)
app.include_router(institutions_router, prefix=prefix)
app.include_router(programs_router, prefix=prefix)
app.include_router(circulars_router, prefix=prefix)
app.include_router(recommendations_router, prefix=prefix)

# create tables at startup
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Welcome to the TunOrient API!"}