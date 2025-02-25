FROM python:3.12-alpine

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt

COPY . /app

RUN python manage.py migrate && python manage.py superuser_seed


CMD ["python","manage.py","runserver","0.0.0.0:8000"]