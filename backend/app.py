from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
# migrate
from flask_migrate import Migrate
from sqlalchemy import text
from dotenv import load_dotenv
import os
import re

# Load environment variables from .env file
load_dotenv()

# create the app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['JWT_SECRET_KEY'] = os.environ.get('SECRET_KEY')


# this variable, db, will be used for all SQLAlchemy commands
db = SQLAlchemy(app)


@app.route('/test_db_connection')
def test_db_connection():
    try:
        result = db.session.execute(text("SELECT 1"))
        return "Database connection is working."
    except Exception as e:
        return f"Error: {str(e)}"


# class represent a table in database
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(1000), nullable=False)
    organization_id = db.Column(db.Integer, db.ForeignKey('organization.id'), nullable=True)

class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=True, nullable=False)
    employees = db.relationship(User, backref='organization', lazy=True, cascade='save-update') 


migrate = Migrate(app, db)

jwt = JWTManager(app)

regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    user_exists = User.query.filter_by(email=data['email']).first()

    if user_exists:
        return jsonify({"error": "Email is already registered"}), 400

    if not re.fullmatch(regex, data['email']):
        return jsonify({"error": "Invalid Email"}), 400
    
    if len(data['password']) < 6:
        return jsonify({"error": "Invalid Password"}), 400
    
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 200
    

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()  # Modified here
    # tests log
    print("Req data =>", data)
    print("DB query user", user)
    
    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not check_password_hash(user.password, data['password']):
        return jsonify({"error": "Invalid credentials!"}), 401
    access_token = create_access_token(identity=user.email)  # Use email as identity
    email = user.email
    return jsonify({"email": email,"access_token": access_token})

@app.route('/delete-user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)

    if user is not None:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "Organization deleted successfully!"}), 200
    else:
        return jsonify({"message": "Organization not found"}), 404


@app.route('/users', methods=['GET'])
def get_users():
    # Query the database to retrieve user data
    users = User.query.all()

    # Convert the user data to a list of dictionaries
    user_list = []
    for user in users:
        user_data = {
            'id': user.id,
            'email': user.email,
            'organization_id': user.organization_id,
            'organization': user.organization.title if user.organization else None
        }
        user_list.append(user_data)

    # Return the user data in JSON format
    return jsonify({'users': user_list})


@app.route('/create-org', methods=['POST'])
def add_organization():
    data = request.get_json()
    new_organization = Organization(title=data['title'])

    db.session.add(new_organization)
    db.session.commit()
    return jsonify({"message": "Organization created!"}), 201

@app.route('/delete-org/<int:id>', methods=['DELETE'])
def delete_organization(id):
    organization = Organization.query.get(id)

    if organization is not None:
        db.session.delete(organization)
        db.session.commit()
        return jsonify({"message": "Organization deleted successfully!"}), 200
    else:
        return jsonify({"message": "Organization not found"}), 404

@app.route('/orgs', methods=['GET'])
def get_organizations():
    organizations = Organization.query.all()
    org_list = []

    for org in organizations:
        org_list.append({'id': org.id, 'title' : org.title, 'employees' : [user.email for user in org.employees]})
    return jsonify({'organizations': org_list})
  

@app.route('/add-user-to-org', methods=['POST'])
def add_user():
    try:
        data = request.get_json()
        user_email = data.get('email') 
        org_title = data.get('organization')

        # Check if both user_email and org_id are provided
        if not user_email or not org_title:
            return jsonify({"error": "Both user email and organization are required"}), 400

        # Check if the user and organization exist
        user = User.query.filter_by(email=user_email).first() 
        organization = Organization.query.filter_by(title=org_title).first()

        if not user or not organization:
            return jsonify({"error": "User or organization not found"}), 404

        # Assign the user to the organization
        user.organization = organization
        db.session.commit()

        return jsonify({"message": "User assigned to organization successfully!"}), 201
    except Exception as e:
        # Handle other exceptions
        db.session.rollback()  # Rollback the transaction
        return jsonify({"error": "An error occurred: " + str(e)}), 500

@app.route('/remove-user-from-org/<int:id>', methods=['DELETE'])
def remove_user(id):
    user = User.query.get(id)

    if user is not None:
        user.organization = None
        db.session.commit()
        return jsonify({"message": "User removed from organization successfully!"}), 200
    else:
        return jsonify({"message": "User not found"}), 404
    
if __name__ == '__main__':
    app.run(debug=True, port=8000)