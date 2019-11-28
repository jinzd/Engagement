import peewee as pw

from models.base_model import BaseModel
from models.session import Session

class Engagement(BaseModel):
    anger = pw.IntegerField()
    contempt = pw.IntegerField()
    disgust = pw.IntegerField()
    fear = pw.IntegerField()
    happiness = pw.IntegerField()
    neutral = pw.IntegerField()
    sadness = pw.IntegerField()
    surprise = pw.IntegerField()
    session = pw.ForeignKeyField(Session, backref='engagements')