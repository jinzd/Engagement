from flask_cors import cross_origin
from flask import Flask, request, jsonify, Blueprint
from microsoft_face_api import calculate_engagement, get_face_api_stream, get_face_api_url
import json

engagement_api_blueprint = Blueprint('engagenment_api', __name__)


@engagement_api_blueprint.route('/stream', methods=['POST'])
@cross_origin()
def get_engagement_stream():
    image_base_64 = json.loads(request.data.decode('utf-8'))['data']

    if image_base_64:
        faces = get_face_api_stream(image_base_64)
        engagement = {
            'engagement': calculate_engagement(faces)
        }

        return jsonify(engagement), 200
    return jsonify({'error': 'streaming failed'})


@engagement_api_blueprint.route('/', methods=['GET'])
def get_engagement_url():
    url = request.args["url"]
    image_url = url

    if image_url:
        faces = get_face_api_url(image_url)
        engagement = {
            'engagement': calculate_engagement(faces)
        }
        return jsonify(engagement), 200

    return jsonify({'error': 'streaming failed'})


@engagement_api_blueprint.route('/live', methods=['POST'])
@cross_origin()
def engagement_live():
    payload = json.loads(request.data, encoding='utf-8')
    if payload:
        timestamp = payload['timestamp']
        session_id = payload['session_id']
        data = payload['data']
        response = {
            'engagement': calculate_engagement(data),
            'timestamp': timestamp,
            'session_id': session_id,
            'face_count': len(data)
        }
        return response, 200

    return {'error': 'invalid request'}
