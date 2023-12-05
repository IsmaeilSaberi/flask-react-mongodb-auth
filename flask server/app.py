from flask import Flask, request, jsonify, session
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['MAIN_URL'] = 'http://localhost:3000/'
# app.config['MAIN_URL'] = 'http://pationonline.ir/'
CORS(app, resources={r"/*": {"origins": app.config['MAIN_URL']}})
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000/"}})
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = True

app.config['MONGO_URI'] = 'mongodb://root:H4QpE7IY4Zqa5CjIksqzqSfS@alfie.iran.liara.ir:30646/my-app?authSource=admin'  # Replace with your MongoDB URI
mongo = PyMongo(app)
bcrypt = Bcrypt(app)

class User:
    def __init__(self, username, displayname, password):
        self.username = username
        self.displayname = displayname
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

# successful connection
@app.route('/success', methods=['GET'])
@cross_origin(origin=app.config['MAIN_URL'], headers=['Content-Type', 'Authorization'])
def check_db_connection():
    try:
        mongo.db.command('ping')
        return jsonify({'message': 'Database connection successful'}), 200
    except Exception as e:
        return jsonify({'message': 'Database connection failed', 'error': str(e)}), 500

# Register endpoint
@app.route('/register', methods=['POST'])
@cross_origin(origin=app.config['MAIN_URL'], headers=['Content-Type', 'Authorization'])
def register():
    data = request.get_json()
    username = data['username']
    displayname = data['displayname']
    password = data['password']

    existing_user = mongo.db.users.find_one({'username': username})
    if existing_user:
        return jsonify({'message': 'User already exists'}), 400

    new_user = User(username, displayname, password)
    mongo.db.users.insert_one({'username': new_user.username, 'displayname': new_user.displayname, 'password': new_user.password})

    return jsonify({'message': 'User registered successfully'}), 201

# Login endpoint
@app.route('/login', methods=['POST'])
@cross_origin(origin=app.config['MAIN_URL'], headers=['Content-Type', 'Authorization'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = mongo.db.users.find_one({'username': username})
    if user and bcrypt.check_password_hash(user['password'], password):
        session['username'] = user['username']
        session['displayname'] = user['displayname']
        return jsonify({'message': 'Login successful','displayName':user['displayname']}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

# Logout endpoint
@app.route('/logout', methods=['POST'])
@cross_origin(origin=app.config['MAIN_URL'], headers=['Content-Type', 'Authorization'])
def logout():
    session.pop('username', None)
    session.pop('displayname', None)
    return jsonify({'message': 'Logout successful'}), 200

# Profile endpoint
@app.route('/profile', methods=['GET'])
@cross_origin(origin=app.config['MAIN_URL'], headers=['Content-Type', 'Authorization'])
def profile():
    if 'username' in session:
        return jsonify({'username': session['username'], 'displayname': session['displayname']}), 200
    else:
        return jsonify({'message': 'User not logged in'}), 401

if __name__ == '__main__':
    app.run(debug=True)
