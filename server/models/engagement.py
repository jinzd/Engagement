import peewee as pw

from models.base_model import BaseModel
from models.session import Session

class Engagement(BaseModel):
    anger = pw.IntegerField(null=False)
    contempt = pw.IntegerField(null=False)
    disgust = pw.IntegerField(null=False)
    fear = pw.IntegerField(null=False)
    happiness = pw.IntegerField(null=False)
    neutral = pw.IntegerField(null=False)
    sadness = pw.IntegerField(null=False)
    surprise = pw.IntegerField(null=False)
    session = pw.ForeignKeyField(Session, backref='engagements')