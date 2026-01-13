# Setup Guide

## Project Overview
TunOrient is a FastAPI-based application for managing educational programs, institutions, and student recommendations. It features a modern backend API and a React frontend for administration and student interaction.

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

6. **Start the FastAPI backend:**
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

**You are now ready to develop and run TunOrient!**