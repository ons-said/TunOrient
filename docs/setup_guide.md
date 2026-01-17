# Setup Guide

## Project Overview
TunOrient is a FastAPI-based application for managing educational programs, institutions, and student recommendations. It features a modern backend API and a React frontend for administration and student interaction.

> **Note:** TunOrient is an informational and advisory platform. It does not manage official orientation workflows or enforce ministry rules.

---

## Prerequisites

- **Python 3.9+**
- **Node.js & npm** (for the frontend)
- **Git** (for version control)
- **SQLite** (default, or configure another DB)
- **Recommended VS Code Extensions:**
  - Python
  - Pylance
  - SQLTools
  - Prettier
  - GitHub Copilot

---

## Backend Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd TunOrient
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   - Copy `.env.example` to `.env` and update values as needed (e.g., `DATABASE_URL`, `SECRET_KEY`).

5. **Run database migrations:**
   ```bash
   alembic upgrade head
   ```

6. **Bulk import programs (optional):**
   - Use the `/programs/bulk` endpoint to import programs from the official Tunisian guide (JSON format, in French).

7. **Start the FastAPI backend:**
   ```bash
   uvicorn app.main:app --reload
   ```
   - Access API docs at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   - Access the frontend at [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

- **Backend:**  
  - `.env` file in the root directory (see `.env.example`)
  - Common variables:
    - `DATABASE_URL`
    - `SECRET_KEY`
    - `ACCESS_TOKEN_EXPIRE_MINUTES`
    - `ALGORITHM`

- **Frontend:**  
  - If needed, create a `.env` file in the `frontend` directory for API URLs, etc.

---

## API Endpoints

- `/auth` — Authentication
- `/students` — Student profiles and interests
- `/universities` — University data
- `/programs` — Programs and admission rules
- `/circulars` — Official circulars and documents

---

## Recommendation Engine

- Recommendations are generated using the official Tunisian scoring formulas and program admission rules.
- The engine uses student grades, bac section, governorate, and interests to suggest suitable programs.
- Recommendations are advisory only and do not submit official choices.

---

## Role-Based Access Control (RBAC)

- **Students:** Manage profile, view recommendations.
- **Ministry/Admin:** Manage universities, programs, circulars.
- **Universities:** Data entities only (no user accounts).

---

## Frontend Features

- Homepage: Search, featured programs/universities, latest circulars.
- Universities Page: Search/filter, university details.
- Programs Page: Search/filter, program details with admission rules.
- Circulars Page: Tabbed view, downloadable PDFs.
- Authentication: Login, register, forgot password.
- Student Dashboard: Questionnaire, generate recommendations, view results.

---

## Testing

- Test the recommendation endpoint by creating a student profile with grades, bac section, and governorate.
- Use the `/api/v1/recommendations/{student_id}` endpoint to view personalized program suggestions.

---

## Using GitHub Copilot

- **GitHub Copilot** is integrated with VS Code and can assist you by:
  - Suggesting code completions and boilerplate
  - Generating functions, classes, and tests
  - Providing documentation and code explanations
- **Workflow Tips:**
  - Use Copilot to speed up repetitive coding tasks.
  - Review Copilot’s suggestions for correctness and security.
  - Combine Copilot with your own logic and project requirements.

---

**TunOrient is now ready for use as an informational and advisory platform!**