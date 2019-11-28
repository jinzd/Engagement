from flask import Flask, Blueprint, jsonify, make_response, request
from models.user import User
from werkzeug.security import check_password_hash


login_api_blueprint = Blueprint('login_api',
                             __name__,
                             template_folder='templates')


# user login session
@login_api_blueprint.route('/', methods=['POST'])
def login():

    post_data = request.get_json()

    # print(post_data)
    
    # check whether user has already signed up
    user = User.get_or_none(username = post_data['username'])
    
    if user and check_password_hash(user.password, post_data['password']):
        auth_token = user.encode_auth_token(user.id)
        response = {
            "auth_token": auth_token.decode(),
            "message": "Successfully signed in",
            "status": "success",
            "user": {
                'id': user.id,
                'name': user.name,
                'username': user.username,
                'email': user.email,
            }
        }
        return make_response(jsonify(response), 201)
    
    if not user:
        response = {
            "status": "fail",
            "message":"User does not exist"
        }

        return make_response(jsonify(response), 401)
    
    if not check_password_hash(user.password, post_data['password']):
        response ={
            "status": "fail",
            "message": "Invalid password"
        }

        return make_response(jsonify(response), 401)
