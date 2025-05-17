FROM python:3.12-alpine

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt

COPY . /app

ENV DJANGO_SETTINGS_MODULE=core.settings.prod