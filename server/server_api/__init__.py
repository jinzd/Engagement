from server_api.blueprints.engagements.views import engagements_api_blueprint
from server_api.blueprints.sessions.views import sessions_api_blueprint
from server_api.blueprints.login.views import login_api_blueprint
from server_api.blueprints.users.views import users_api_blueprint
from server import app
from flask_cors import CORS

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

## API Routes ##

app.register_blueprint((users_api_blueprint), url_prefix='/api/v1/users')
app.register_blueprint((login_api_blueprint), url_prefix='/api/v1/login')
app.register_blueprint((sessions_api_blueprint), url_prefix='/api/v1/sessions')
app.register_blueprint((engagements_api_blueprint),
                       url_prefix='/api/v1/engagements')
