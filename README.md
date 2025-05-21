# Expenses Tracker Web Application

Track your expenses by category and gain insights by looking at bar and pie charts.

## Live Demo

- TODO: obtain a domain
- Hosted on a VPS using Docker and a PostgreSQL database

## Development Setup

- Frontend environment variables (frontend/.env):

  - `VITE_BACKEND_URL` - Base URL for REST API calls (e.g. `http://localhost:8000/api`)

- Backend environment variables (backend/.env):

  - `DJANGO_SECRET_KEY` - Used for password hashing (You can use this tool to obtain one: `https://djecrety.ir/`)
  - `DJANGO_ALLOWED_HOSTS` - Comma-separated list of allowed hosts (e.g. `localhost`)
  - `DJANGO_CORS_ALLOWED_ORIGINS` - Origins allowed for CORS (e.g. `http://localhost:5173`)

- Run the backend:
  - `docker-compose -f docker-compose.dev.yaml -p et_dev up -d`
- Run the frontend:
  - `cd frontend/`
  - `npm install`
  - `npm run dev`

## Tech Stack:

- React.js (with TypeScript) for the frontend
- Django REST Framework for the backend
- TailwindCSS for styling and responsive design
- React Router v6 for routing
- Chart.js for charts
- Axios for making HTTP requests

## Features:

- Fully responsive design
- Token-based authentication & protected routes
- CRUD operations for transactions and categories
- Preferred currency picker (currently supports USD, EUR, and GBP)
- Filtering transactions by date range
- Dashboard with charts, top categories list, most recent transactions.
