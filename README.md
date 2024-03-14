# CareFULL
Your personal health-care assistant in organizing your information, understanding trends, and being able to ask questions in a secure environment.

## Prerequistes
In order to successfully launch the application the following applications/dependencies are required:
* [Python3](https://www.python.org/)
* [PostgreSQL](https://www.postgresql.org/download/)
* [Node.js](https://nodejs.org/en/download)

## Set Up
To run our application, run the following commands in a Linux terminal: 
* `git clone https://github.com/FardinHaque60/CareFULL.git` to clone the repository in your current directory.
* `cd CareFULL/` to enter the repository 
* `python3 -m venv venv` to create a virtual environment.  
* `source venv/bin/activate` to activate virtual environment.  
* `pip3 install -r requirements.txt` to install all the dependencies needed to run the backend.
* `cd frontend && npm install` to install needed packages from frontend.
* open a new terminal and locate to the CareFULL directory and run `cd backend && python manage.py runserver` to run the backend
* `cd ../frontend && npm start` to run the frontend, this should open a new tab in your browser with the application. If not type [localhost:3000](localhost:3000) in your browser

## TODO: add db migration, set-up information