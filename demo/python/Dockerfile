# Use the official Python image from the Docker Hub
FROM python:3.12-slim

# Set environment variables to ensure Python output is unbuffered
ENV PYTHONUNBUFFERED=1

# Create and set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project into the working directory
COPY . /app/

# Run the main script
CMD ["uvicorn", "main:app", "--host", "0.0.0.0","--port", "7300"]