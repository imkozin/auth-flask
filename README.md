# Manager Web Assistant
![Logo](./images/logo.jpeg)

## Table of Contents
- [Description](#desciption)
- [Key Features](#key-features)
- [Usage](#usage)
- [Technology Stack](#technology-stack)
- [Possible Improvements](#possible-improvements)
- [Video Review](#video-review)


## Description

The Manager Web Assistant is a versatile and user-friendly web application designed to streamline organizational management tasks. Whether you're an administrator looking to efficiently manage your organization or a team member seeking to collaborate within your designated group, this app offers a suite of features to simplify your work.

### Key Features:

- **User Management:** Manage user accounts, ensuring that only authorized individuals have access to your organization's data.
- **Organization Creation:** Create new organizations with ease, providing a structured environment for your teams.
- **User Assignment:** Assign registered users to specific organizations effortlessly.
- **Organization Deletion:** Remove obsolete organizations when they are no longer needed, keeping your workspace tidy.
- **User Removal:** Remove users from organizations when roles change or team memberships evolve.

## Usage
### Backend and API
   The backend of the Flask-React-App serves as the server-side component responsible for handling HTTP requests, managing the PostgreSQL database, and serving data to the frontend. This section provides details on how to connect to the database, the technologies used, and an overview of the API endpoints.
   - ### PostgreSQL Database
   The backend of this project uses a PostgreSQL relational database to store and manage user and organization data. PostgreSQL is a powerful, open-source relational database system known for its reliability and performance. You can find the database connection information in the app.py file.
   - ### Database Connection
   To connect to the PostgreSQL database, make sure you have PostgreSQL installed and running. The database connection is configured in the app.py file. The application uses the SQLAlchemy library to interact with the database. Here's an example of the database configuration:
    ```
    from flask import Flask
    from flask_sqlalchemy import SQLAlchemy
    import os
    # Load environment variables from .env file
    load_dotenv()

    # create the app
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')

    # this variable, db, will be used for all SQLAlchemy commands
    db = SQLAlchemy(app)
    ```
    Replace DATABASE_URL with your variable name from .env file os.environ.get('*DATABASE_URL*') or you can give a direct link e.g. 
    ```
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost:5432/your-database-name'
    ``` with your PostgreSQL connection details, including the username, password, host, port, and database name.
### Frontend
    The frontend of the Flask-React-App is built using the popular JavaScript library React. React allows for the development of dynamic and responsive user interfaces. This section provides an overview of the frontend architecture, the technologies used, and how to run the frontend application.
   - ### Frontend Architecture
   The frontend of this project follows a component-based architecture, where the user interface is divided into modular components that can be reused and combined to build complex views. Here are some key components used in the frontend:

### Technology Stack:

- **Backend:** Built with Flask, a Python web framework, ensuring robust and secure server-side functionality.
- **Frontend:** Utilizes React for dynamic and responsive user interfaces.
- **Styling:** Tailwind CSS and Material-UI for modern and visually appealing designs.

### Possible improvements: 

1. **Structure existing users into departments within organizations:** This improvement can help organize users even further by creating a hierarchical structure within organizations. It could be particularly useful for larger organizations with multiple departments or teams.
2. **Extend functionality by adding a position in the company's hierarchy:** Adding positions or roles for users within organizations can offer more granularity in managing responsibilities and access levels. It allows for better role-based access control.
3. **Add different roles like admin or head of department:** Introducing different roles, such as administrators or heads of departments, can help delegate authority and streamline decision-making processes. It can also enhance the overall management of the organization.
4. **Improve the registration system:** Enhancements like a "Forgot Password" feature and the use of cookies for session management can improve user experience and security. These additions can simplify account recovery and user authentication.