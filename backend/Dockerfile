FROM python:3.12-alpine

WORKDIR /app

COPY requirements/prod.txt /app

RUN pip install -r prod.txt

COPY . /app

ENV DJANGO_SETTINGS_MODULE=core.settings.prod