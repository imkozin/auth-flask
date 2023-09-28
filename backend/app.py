from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
# migrate
from flask_migrate import Migrate
from sqlalchemy import text



# create the app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ivankozin:2158310@localhost/authflask'

# this variable, db, will be used for all SQLAlchemy commands
db = SQLAlchemy(app)


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

jwt = JWTManager(app)

# @app.route("/token", methods=["POST"])
# def create_token():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     if email != "test" or password != "test":
#         return jsonify({"msg": "Bad email or password"}), 401

#     access_token = create_access_token(identity=email)
#     return jsonify(access_token=access_token)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(email=data['email'], password=hashed_password)  # Modified here
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created!"}), 201

# @app.route('/signin', methods=['POST'])
# def signin():
#     data = request.get_json()
#     user = User.query.filter_by(email=data['email']).first()  # Modified here
#     # tests log
#     print("Req data =>", data)
#     print("DB query user", user)
    
#     if not user or not check_password_hash(user.password, data['password']):
#         return jsonify({"message": "Invalid credentials!"}), 401
#     access_token = create_access_token(identity=user.email)  # Use email as identity
#     return jsonify({"access_token": access_token})

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
            'organization_id': user.organization_id
        }
        user_list.append(user_data)

    # Return the user data in JSON format
    return jsonify({'users': user_list})

    
if __name__ == '__main__':
    app.run(debug=True, port=8000)