import peewee as pw

from models.base_model import BaseModel
from models.user import User

class Session(BaseModel):
    name = pw.CharField()
    session_type = pw.CharField()
    description = pw.TextField()
    session = pw.ForeignKeyField(User, backref='sessions')