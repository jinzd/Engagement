from flask import Flask, Blueprint, jsonify, make_response, request
from models.user import User
from werkzeug.security import generate_password_hash, check_password_hash


users_api_blueprint = Blueprint('users_api',
							 __name__,
							 template_folder='templates')


# get all users 
@users_api_blueprint.route('/', methods=['GET'])
def index():
	users = User.select()

	user_data = []
	for user in users:
		user_data.append({
		   'id': user.id,
		   'name': user.name,
		   'username' : user.username,
		   'email': user.email
		})
	response = {"user":user_data}
	return make_response(jsonify(response),200)

# create a new user
@users_api_blueprint.route('/new', methods = ['POST'])
def create():
	post_data = request.get_json()
	try:
		new_user = User(
			name=post_data['name'],
			username=post_data['username'].lower(),
			email=post_data['email'].lower(),
			password=post_data['password'])
	except:
		response = {
			'status' : 'failed',
			'message': 'All fields required'
		}
		return make_response(jsonify(response), 400)

	else:
		if not new_user.save():
			response = {
				'status': 'failed',
				'message': new_user.errors
			}
			return make_response(jsonify(response), 400)
		
		else:
			auth_token = new_user.encode_auth_token(new_user.id)
			response = {
				'status': 'success',
				'message': 'New user created successfully',
				'auth_token': auth_token.decode(),
				'user': {
					'id': new_user.id,
					'name': new_user.name,
					'username': new_user.username,
					'email': new_user.email

				}

			}
			return make_response(jsonify(response), 201)

# get current user
@users_api_blueprint.route('/me', methods=['GET'])
def currentuser():
	auth_header = request.headers.get('Authorization')
	if auth_header:
		auth_token = auth_header.split(" ")[1]
		# print(auth_token)
	  
		user_id = User.decode_auth_token(auth_token)
		# print(user_id)
	  
		user = User.select().where(User.id == user_id)

		# print(user)
		
		response = {
			'id': user[0].id,
			'name': user[0].name,
			'username': user[0].username,
			'email': user[0].email
		}
		return make_response(jsonify(response), 201)
	else:
		response = {
			'status': 'failed',
			'message': 'Authorization header not found'
		}
		return make_response(jsonify(response), 401)

# edit user information
@users_api_blueprint.route('/edit', methods = ['POST'])
def edit():
	pass





