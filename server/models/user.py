import peewee as pw
import re
import jwt
import datetime

from server import app
from models.base_model import BaseModel
from werkzeug.security import generate_password_hash


class User(BaseModel):
    name = pw.CharField()
    username = pw.CharField(unique=True)
    email = pw.CharField(unique=True)
    password = pw.CharField()

    # server side validation for user
    def validate(self):
        duplicate_username = User.get_or_none(User.username == self.username)
        duplicate_email = User.get_or_none(User.email == self.email)

        # check if duplicate username
        if duplicate_username and not duplicate_username.id == self.id:
            self.errors.append('Username already in use')

        # check if dupliacte email
        if duplicate_email and not duplicate_email.id == self.id:
            self.errors.append('Email already in use')

        # check if password meets criteria and return hashed password
        if not re.match(r"^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$])[\w\d@#$]{6,12}$", self.password):
            self.errors.append('Password must be at least 6 characters.\nPassword must contain capital letter.\nPassword must have one special character')
        else: 
            self.password = generate_password_hash(self.password)
        
    def encode_auth_token(self, user_id):
       
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=0),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                app.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        
        try:
            payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 0
        except jwt.InvalidTokenError:
            return 0