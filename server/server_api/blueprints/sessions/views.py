from flask import Flask, Blueprint, jsonify, make_response, request
from models.user import User


sessions_api_blueprint = Blueprint('sessions_api', __name__, template_folder='templates')

@sessions_api_blueprint.route('/', methods=['POST'])
def new():
    pass
