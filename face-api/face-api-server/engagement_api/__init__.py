from app import app
import microsoft_face_api
from engagement_api.blueprints.engagement.view import engagement_api_blueprint

app.register_blueprint(engagement_api_blueprint,
                       url_prefix='/api/v1/engagement')
