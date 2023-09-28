from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
# config data from config.py
from config import Config
# migrate
from flask_migrate import Migrate

# create the app
app = Flask(__name__)



if __name__ == '__main__':
    app.run(debug=True)