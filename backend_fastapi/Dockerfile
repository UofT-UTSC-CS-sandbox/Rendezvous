# Use the official Python image from the Docker Hub
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY pyproject.toml poetry.lock /app/

# Install Poetry
RUN pip install poetry

# Install the dependencies
RUN poetry install --no-dev

# Copy the rest of the application code into the container
COPY . /app

# Expose port 8000 for the FastAPI application
EXPOSE 8000

# Run the FastAPI application with Uvicorn
CMD ["poetry", "run", "uvicorn", "backend_fastapi.main:app", "--host", "0.0.0.0", "--port", "8000"]
