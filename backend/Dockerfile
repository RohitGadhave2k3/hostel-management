
# # Use an official Python runtime as a parent image
# FROM python:3.9-slim

# # Set environment variables
# ENV PYTHONDONTWRITEBYTECODE=1 \
#     PYTHONUNBUFFERED=1

# # Install system dependencies (MariaDB/MySQL client libs)
# RUN apt-get update && apt-get install -y \
#     default-libmysqlclient-dev gcc \
#     && rm -rf /var/lib/apt/lists/*

# # Set work directory
# WORKDIR /app

# # Copy requirements first (for caching)
# COPY requirements.txt .

# # Install Python dependencies
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy project files
# COPY . .

# # Expose Flask port
# EXPOSE 5000

# # Set environment variables for Flask
# ENV FLASK_APP=app.py \
#     FLASK_RUN_HOST=0.0.0.0 \
#     FLASK_RUN_PORT=5000

# # Run the Flask app
# CMD ["python", "app.py"]

FROM python:3.10-slim

# Prevent Python from writing .pyc files
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# System dependencies (kept minimal)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
  && rm -rf /var/lib/apt/lists/*

# Install Python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy code
COPY . .

# Flask app = app.py → app:app
# Gunicorn for production
CMD ["sh", "-c", "python init_db.py && gunicorn --workers 3 --bind 0.0.0.0:5000 app:app"]



