# Use the official Python image from the Docker Hub
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container
COPY backend_fastapi/pyproject.toml backend_fastapi/poetry.lock /app/

# Install Poetry
RUN pip install poetry

# Install the dependencies
RUN poetry config virtualenvs.create false \
    && poetry install --only main --no-interaction --no-ansi

# Copy the rest of the application code into the container
COPY backend_fastapi /app

# Expose port 8000 for the FastAPI application
EXPOSE 8000

# Run the FastAPI application with Uvicorn
CMD ["poetry", "run", "uvicorn", "backend_fastapi.main:app", "--host", "0.0.0.0", "--port", "8000"]

