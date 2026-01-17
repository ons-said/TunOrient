# TunOrient - University Orientation Platform

TunOrient is a modern web application designed to guide Tunisian students through their university orientation process. It leverages a powerful algorithm to calculate the "Score Global" (FG) and provide personalized program recommendations based on academic performance and geographic preferences.

## Application Architecture

The project consists of two main parts:
- **Backend**: A FastAPI application (Python) handling data management, authentication, and the recommendation algorithm.
- **Frontend**: A React application (TypeScript/Vite) providing an interactive user interface for students, administrators, and ministry officials.

## Application Flow

### 1. User Journey (Student)
1.  **Registration**: New users sign up with their email and role (Student).
2.  **Authentication**: Users login to receive a secure access token.
3.  **Profile Creation**: Students create their profile by entering their Baccalaureate Section (e.g., Mathematics, Sciences), Average Grade, and Governorate.
4.  **Recommendation**:
    *   Students navigate to the "Get Advice" section.
    *   They input detailed Baccalaureate grades (subjects vary by section).
    *   They confirm their preferences (fields of study, regions).
    *   The system calculates the specific Score (FG) for each eligible program.
    *   The system applies the "Tanfil" (geographic bonus) where applicable.
    *   Results are displayed, categorized as "Safe", "Target", or "Dream" choices based on previous years' cutoff scores.

### 2. Administrative Journey
-   **Admins**: Have full access to manage users, circulars, and system configurations.
-   **Ministry**: Can manage institutions, programs, and view aggregate student data.

## API Documentation

Below is a detailed list of all available API endpoints organized by feature.

### Authentication (`/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user | No |
| `POST` | `/auth/login` | Login and retrieve access token | No |

### Students (`/students`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/students/` | Create a student profile | User (Student) |
| `GET` | `/students/{student_id}` | Get student profile details | User |
| `PUT` | `/students/{student_id}` | Update student profile | User (Self) or Admin |
| `DELETE` | `/students/{student_id}` | Delete student profile | User (Self) or Admin |
| `GET` | `/students/` | List all students | Admin or Ministry |
| `GET` | `/students/user-list` | List all student user accounts | Ministry |

### Recommendations (`/recommendations`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/recommendations/{student_id}` | Generate diverse recommendations based on grades and preferences | User |
| `GET` | `/recommendations/student/{student_id}` | Retrieve recommendation history for a student | User |

### Programs (`/programs`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/programs/` | List/Filter university programs | No |
| `GET` | `/programs/{id}` | Get specific program details | No |
| `POST` | `/programs/` | Create a new program | Admin or Ministry |
| `PUT` | `/programs/{id}` | Update an existing program | Admin or Ministry |
| `POST` | `/programs/bulk` | Bulk create programs | Admin or Ministry |

### Institutions (`/institutions`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/institutions/` | List all institutions | No |
| `GET` | `/institutions/{id}` | Get institution details | No |
| `POST` | `/institutions/` | Create a new institution | Admin or Ministry |
| `PUT` | `/institutions/{id}` | Update an institution | Admin or Ministry |
| `POST` | `/institutions/bulk` | Bulk create institutions | Admin or Ministry |

### Universities (`/universities`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/universities/` | List all universities | No |
| `POST` | `/universities/` | Create a new university | Admin or Ministry |

### Circulars (`/circulars`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/circulars/` | List all orientation circulars | User |
| `POST` | `/circulars/` | Publish a new circular | Admin |
| `GET` | `/circulars/{id}` | Download/View specific circular content | User |

### Administration (`/admin`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/admin/stats` | Get system statistics (users, programs, etc.) | Admin |
| `GET` | `/admin/users` | List all system users | Admin |
| `PUT` | `/admin/users/{user_id}/role` | Update a user's role | Admin |

## Setup & Running

1.  **Backend**:
    ```bash
    # Install dependencies
    pip install -r requirements.txt
    
    # Run the server
    uvicorn app.main:app --reload
    ```
    The API will be available at `http://localhost:8000`.

2.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Key Features

### 🎓 For Students
-   **Personalized Guidance**: Receive tailored program recommendations that match your academic profile and career aspirations.
-   **Accurate Score Simulation**: Instantly calculate your admission scores for any program using up-to-date official formulas.
-   **Opportunity Exploration**: Browse the complete catalog of university programs, including those offering reorientation.
-   **Stay Informed**: Access the latest official circulars and updates directly from the ministry.

### 🏛️ For Ministry & Administration
-   **Centralized Management**: Efficiently oversee university programs, institutions, and admission capacities.
-   **Data-Driven Insights**: Access comprehensive data on student performance and orientation trends.
-   **Secure & Scalable**: Built on a modern, secure architecture with role-based access control (RBAC) to protect sensitive data.
-   **Streamlined Processes**: Simplify the management of orientation cycles and circular publications.