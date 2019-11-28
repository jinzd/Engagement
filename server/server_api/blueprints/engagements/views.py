from flask import Flask, Blueprint, jsonify, make_response, request
from models.engagement import Engagement
from models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
import json

engagements_api_blueprint = Blueprint('engagements_api',
                                      __name__,
                                      template_folder='templates')


@engagements_api_blueprint.route('/new', methods=['POST'])
def setNewRecord():
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
