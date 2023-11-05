# Makefile for Flask Server

# Set the Python interpreter. You can change this if needed.
PYTHON = python3

# Name of your Flask application
APP_NAME = your_app_name

# Host and port for the development server
HOST = 127.0.0.1
PORT = 5000

# Command to activate the virtual environment (if using one)
# VENV_ACTIVATE = source venv/bin/activate

# Use the venv if available, otherwise use the system Python
# This checks if the venv directory exists and activates it if found
# If you're not using a venv, you can comment out these lines
VENV_EXISTS := $(wildcard venv)
ifeq ($(VENV_EXISTS),)
	VENV_ACTIVATE =
else
	VENV_ACTIVATE = . venv/bin/activate
endif

# Run the Flask development server
run:
	$(VENV_ACTIVATE) && $(PYTHON) -m flask run --host $(HOST) --port $(PORT)

# Install project dependencies (you can add more dependencies)
install:
	$(VENV_ACTIVATE) && $(PYTHON) -m pip install -r requirements.txt

# Initialize the database (if applicable)
init-db:
	$(VENV_ACTIVATE) && $(PYTHON) -c "from $(APP_NAME) import init_db; init_db()"

# Create a migration (if using a database ORM like Flask-Migrate)
# create-migration:
# 	$(VENV_ACTIVATE) && $(PYTHON) manage.py db migrate

# Apply a migration (if using a database ORM like Flask-Migrate)
# apply-migration:
# 	$(VENV_ACTIVATE) && $(PYTHON) manage.py db upgrade

# Clean up compiled Python files and other generated files
clean:
	find . -type f -name "*.pyc" -delete
	rm -rf __pycache__

# Run unit tests (if you have tests)
test:
	$(VENV_ACTIVATE) && $(PYTHON) -m unittest discover -s tests

.PHONY: run install init-db create-migration apply-migration clean test
