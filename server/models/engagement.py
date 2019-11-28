import peewee as pw

from models.base_model import BaseModel
from models.session import Session


class Engagement(BaseModel):
    anger = pw.FloatField(null=False)
    contempt = pw.FloatField(null=False)
    disgust = pw.FloatField(null=False)
    fear = pw.FloatField(null=False)
    happiness = pw.FloatField(null=False)
    neutral = pw.FloatField(null=False)
    sadness = pw.FloatField(null=False)
    surprise = pw.FloatField(null=False)
    face_count = pw.IntegerField(null=False)
    session = pw.ForeignKeyField(Session, backref='engagements')
