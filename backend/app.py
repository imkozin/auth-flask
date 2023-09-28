from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
# config data from config.py
# from config import Config
# migrate
from flask_migrate import Migrate
import os
from sqlalchemy import text



# create the app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ivankozin:2158310@localhost/authflask'

# this variable, db, will be used for all SQLAlchemy commands
db = SQLAlchemy(app)


# migrate = Migrate(app, db)

@app.route('/test_db_connection')
def test_db_connection():
    try:
        result = db.session.execute(text("SELECT 1"))
        return "Database connection is working."
    except Exception as e:
        return f"Error: {str(e)}"


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(1000), nullable=False)
    organization_id = db.Column(db.Integer, db.ForeignKey('organization.id'), nullable=True)

class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    employees = db.relationship(User, backref='organization', lazy=True)

migrate = Migrate(app, db)

# jwt = JWTManager(app)

# @app.route("/token", methods=["POST"])
# def create_token():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     if email != "test" or password != "test":
#         return jsonify({"msg": "Bad email or password"}), 401

#     access_token = create_access_token(identity=email)
#     return jsonify(access_token=access_token)



if __name__ == '__main__':
    app.run(debug=True)