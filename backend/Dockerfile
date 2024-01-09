FROM python:3.11.4-slim-buster

LABEL maintainer="ochernyi04@gmail.com"

WORKDIR /app

ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

RUN python manage.py makemigrations
RUN python manage.py migrate

RUN mkdir -p /vol/web/media

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "shopProject.wsgi:application"]