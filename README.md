# Expenses tracker web application

Track your spendings by category and gain insights by looking at Bar and Pie charts

## Setup:

- Run in a docker container in development mode (run `docker-compose up`)
- Or, set up everything manually:
  - Frontend: `cd frontend/` -> `npm install` -> `npm run dev`
  - Backend: `cd backend/` -> `pip install -r requirements.txt` -> `python manage.py makemigrations` -> `python manage.py migrate` -> `python manage.py runserver`

## Tech stack:

- React.js (with Typescript) for the frontend
- Django Rest Framework for the backend
- TailwindCSS for styling and responsive design
- React router for routing
- Chart.js for charts
- Axios.js for making HTTP requests
- SQLite database for development purposes
- Docker for running in an isolated enviorment

# Feature list:

- Fully responsive design
- Token based Authentication & protected routes
- CRUD for Transactions, Categories
- Preferred currency picker (currently supported only USD, EUR, GBP)
- Filtering transactions by date range
- Dashboard with charts, top-N category list, last-N transactions
