# TunOrient

TunOrient is a FastAPI application that provides a simple and efficient way to manage orientations with basic JWT authentication and a SQLite database. This project is structured to facilitate easy development and maintenance.

## Features

- FastAPI framework for building APIs
- SQLAlchemy for database interactions
- SQLite as the database backend
- JWT authentication for secure access
- Swagger documentation for easy API exploration

## Project Structure

```
TunOrient
├── app
│   ├── main.py                # Entry point of the FastAPI application
│   ├── core
│   │   ├── config.py          # Configuration settings
│   │   └── security.py        # Security-related functions
│   ├── db
│   │   ├── base.py            # Base class for SQLAlchemy models
│   │   └── session.py         # Database session management
│   ├── models
│   │   └── orientation.py      # SQLAlchemy model for Orientation
│   ├── schemas
│   │   └── orientation.py      # Pydantic schemas for Orientation
│   ├── repositories
│   │   └── orientation_repository.py  # CRUD operations for Orientation
│   ├── api
│   │   ├── deps.py            # Dependency functions for routes
│   │   └── v1
│   │       ├── api.py         # API router setup
│   │       └── endpoints
│   │           ├── orientations.py  # Orientation-related API endpoints
│   │           └── auth.py     # Authentication API endpoints
│   ├── services
│   │   └── auth_service.py     # Authentication logic
│   └── utils
│       └── jwt.py              # JWT utility functions
├── alembic
│   └── env.py                  # Alembic environment configuration
├── tests
│   └── test_orientation.py      # Unit tests for Orientation
├── requirements.txt             # Project dependencies
├── alembic.ini                 # Alembic configuration file
├── .env                        # Environment variables
├── Dockerfile                  # Docker image instructions
└── README.md                   # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd TunOrient
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up the database:
   - Configure your database settings in the `.env` file.
   - Run migrations using Alembic:
     ```
     alembic upgrade head
     ```

## Running the Application

To start the FastAPI application, run:
```
uvicorn app.main:app --reload
```

You can access the API documentation at `http://127.0.0.1:8000/docs`.

## Usage

- Use the `/api/v1/orientations` endpoints to manage orientations.
- Use the `/api/v1/auth` endpoints for authentication.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.