import os
import microsoft_face_api
from flask import Flask
from flask_assets import Environment, Bundle
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
