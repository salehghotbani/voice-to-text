#FROM python:3.10-alpine
FROM 192.168.13.252:5050/python:3.10-alpine

WORKDIR /app

COPY ./pip.conf /etc/pip.conf

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY . /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
