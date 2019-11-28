import peewee as pw

from models.base_model import BaseModel
from models.user import User

class Session(BaseModel):
    title = pw.CharField(null=False)
    session_type = pw.CharField(null=False)
    description = pw.TextField(null=False)
    user = pw.ForeignKeyField(User, backref='sessions')