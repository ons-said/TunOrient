# TunOrient Frontend

This directory contains the frontend application for TunOrient, a Tunisian educational orientation platform.

## Tech Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (To be configured)
- **Icons**: Lucide React (To be installed)

## Project Structure

```
frontend/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images and styles
│   ├── components/  # Reusable UI components
│   ├── pages/       # Application pages/routes
│   ├── context/     # Global state (Auth, etc.)
│   ├── api/         # API integration (Axios)
│   ├── App.tsx      # Main component
│   └── main.tsx     # Entry point
├── index.html       # HTML template
├── package.json     # Dependencies
└── README.md        # This file
```

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## Integration

The frontend assumes the backend is running at `http://localhost:8000` (by default).
Update `.env` or configurations to point to the correct backend URL.
