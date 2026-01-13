# How to Run TunOrient

Follow these steps to run the full application (Backend + Frontend).

## Prerequisites
- Node.js installed.
- Python installed.

## 1. Start the Backend (FastAPI)

Open a **new terminal** in the root directory `TunOrient/` and run:

1.  **Activate Virtual Environment**:
    ```powershell
    .\.venv\Scripts\activate
    ```

2.  **Install Dependencies** (only needed once):
    ```powershell
    pip install -r requirements.txt
    ```

3.  **Run Database Migrations**:
    ```powershell
    alembic upgrade head
    ```

4.  **Start the Server**:
    ```powershell
    uvicorn app.main:app --reload
    ```
    The backend will run at `http://127.0.0.1:8000`.

## 2. Start the Frontend (React)

Open a **second terminal** and run:

1.  **Navigate to frontend**:
    ```powershell
    cd frontend
    ```

2.  **Install Dependencies** (only needed once):
    ```powershell
    npm install
    ```

3.  **Start the Dev Server**:
    ```powershell
    npm run dev
    ```
    The frontend will run at `http://localhost:5173`.

## 3. Usage

Open your browser and go to `http://localhost:5173`.
You can now interact with the application.
