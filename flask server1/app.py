from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = 'mongodb://root:H4QpE7IY4Zqa5CjIksqzqSfS@alfie.iran.liara.ir:30646/my-app?authSource=admin'  # Replace with your MongoDB URI
mongo = PyMongo(app)
bcrypt = Bcrypt(app)

class User:
    def __init__(self, username, password):
        self.username = username
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

# successful connection
@app.route('/success', methods=['GET'])
# def success():
#     return jsonify({'message': 'Success! You have reached the /success endpoint.'}), 200
def check_db_connection():
    try:
        mongo.db.command('ping')
        return jsonify({'message': 'Database connection successful'}), 200
    except Exception as e:
        return jsonify({'message': 'Database connection failed', 'error': str(e)}), 500


# Register endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']

    existing_user = mongo.db.users.find_one({'username': username})
    if existing_user:
        return jsonify({'message': 'User already exists'}), 400

    new_user = User(username, password)
    mongo.db.users.insert_one({'username': new_user.username, 'password': new_user.password})

    return jsonify({'message': 'User registered successfully'}), 201


# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = mongo.db.users.find_one({'username': username})
    if user and bcrypt.check_password_hash(user['password'], password):
        # Implement your login logic here
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

# Logout endpoint
@app.route('/logout', methods=['POST'])
def logout():
    # Implement your logout logic here
    return jsonify({'message': 'Logout successful'}), 200


if __name__ == '__main__':
    app.run(debug=True)
