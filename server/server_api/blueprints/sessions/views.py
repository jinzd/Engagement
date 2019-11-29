from flask import Flask, Blueprint, jsonify, make_response, request
from models.user import User
from models.session import Session


sessions_api_blueprint = Blueprint(
    'sessions_api', __name__, template_folder='templates')

# get the current users sessions
@sessions_api_blueprint.route('/', methods=['GET'])
def index():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header.split(" ")[1]
        user_id = User.decode_auth_token(auth_token)

        user = User.get(User.id == user_id)
        # print(user)

        sessions = Session.select().where(
            Session.user == user.id).order_by(Session.id.asc())
        # print(sessions)
        session_data = []
        for session in sessions:
            session_data.append({
                'date': session.created_at.strftime('%d-%m-%Y'),
                'title': session.title,
                'session_type': session.session_type,
                'description': session.description
            })
        response = {'sessions': session_data}
        return make_response(jsonify(response), 200)
    else:
        response = {
            'status': 'failed',
            'message': 'No authorization header found.'
        }
        return make_response(jsonify(response), 401)

# post new session
@sessions_api_blueprint.route('/new', methods=['POST'])
def create():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header.split(" ")[1]
    else:
        response = {
            'status': 'failed',
            'message': 'No authorization header found.'
        }
        return make_response(jsonify(response), 401)

    user_id = User.decode_auth_token(auth_token)
    user = User.get(User.id == user_id)

    if user:
        post_data = request.get_json()
        session = Session(
            title=post_data['title'],
            session_type=post_data['session_type'],
            description=post_data['description'],
            user=user.id
        )
        if session.save():
            response = {
                'status': 'success',
                'message': 'Session successfully saved.'
            }
            return make_response(jsonify(response), 201)
        else:
            response = {
                'status': 'failed',
                'message': 'Session did not save. Try again later.'
            }
            return make_response(jsonify(response), 400)
    else:
        response = {
            'status': 'failed'
        }
        return make_response(jsonify(response), 400)
