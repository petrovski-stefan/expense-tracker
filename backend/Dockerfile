FROM python:3.12-alpine

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt

COPY . /app

RUN python manage.py makemigrations && python manage.py migrate


CMD ["python","manage.py","runserver","0.0.0.0:8000" ]