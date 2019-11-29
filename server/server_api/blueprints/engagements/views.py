from flask import Flask, Blueprint, jsonify, make_response, request
from models.engagement import Engagement
from models.user import User
from models.session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from playhouse.shortcuts import model_to_dict
import json
from .face_api import calculate_engagement


engagements_api_blueprint = Blueprint('engagements_api',
                                      __name__,
                                      template_folder='templates')


@engagements_api_blueprint.route('/', methods=['POST'])
def get_session():
    user = validate_auth(request.headers.get('Authorization'))
    payload = request.get_json()
    session_id = payload['session_id']

    main_graph = []
    face_count_graph = []
    response = {}
    # moving_average_graph = []
    if user:
        raw = get_raw(user, session_id)
        session = Session.get_by_id(session_id)
        for record in raw:
            main_graph.append(
                {'id': record['id'], 'eng': calculate_engagement(record)})
            face_count_graph.append(
                {'id': record['id'], 'face_count': record['face_count']})
        response['main'] = main_graph
        response['face_count'] = face_count_graph
        response['session'] = {
            'title': session.title, 'session_type': session.session_type, 'description': session.description}
        return jsonify(response), 200

    return response, 204


@engagements_api_blueprint.route('/raw', methods=['POST'])
def get_session_raw():

    user = validate_auth(request.headers.get('Authorization'))
    payload = request.get_json()
    session_id = payload['session_id']

    response_data = []
    if user:
        records_dict = get_raw(user, session_id)

        response_data.append({
            'data': records_dict,
            'status': 'success',
            'message': 'Engagement records retrieved.'
        })

        return make_response(jsonify(response_data)), 200

    response_data.append({
        'status': 'failed',
        'message': 'try again later'
    })

    return make_response(jsonify(response_data)), 400


@engagements_api_blueprint.route('/new', methods=['POST'])
def set_new_record():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header.split(" ")[1]
        user_id = User.decode_auth_token(auth_token)

        user = User.get(User.id == user_id)

        if user:
            session = request.get_json()['session_id']
            faces = request.get_json()['data']
            combined_emotions = {'anger': 0, 'contempt': 0, 'disgust': 0,
                                 'fear': 0, 'happiness': 0, 'sadness': 0, 'neutral': 0, 'surprise': 0}
            # breakpoint()
            for face in faces:
                all_emotions = face['faceAttributes']['emotion']
                combined_emotions = {
                    key: combined_emotions[key] + all_emotions[key] for key in set(all_emotions)}

            # breakpoint()
            combined_emotions['session'] = session
            combined_emotions['face_count'] = len(faces)
            engagement = Engagement(**combined_emotions)

            if engagement.save():
                response = {
                    'status': 'success',
                    'message': 'Session successfully saved.'
                }
                print(response)
                return make_response(jsonify(response), 201)
            else:
                response = {
                    'status': 'failed',
                    'message': 'Session did not save. Try again later.'
                }
                print(response)
                return make_response(jsonify(response), 400)

    return make_response({'error': 'failed'}, 400)


def validate_auth(auth_header):
    if auth_header:
        auth_token = auth_header.split(" ")[1]
        user_id = User.decode_auth_token(auth_token)

        user = User.get(User.id == user_id)

        if user:
            return user

    return None


def get_raw(user, session_id):
    sessions = user.sessions.select().where(Session.id == session_id)
    records_dict = []
    if len(sessions) > 0:
        for record in sessions[0].engagements:
            records_dict.append(model_to_dict(record, recurse=False))

    return records_dict
