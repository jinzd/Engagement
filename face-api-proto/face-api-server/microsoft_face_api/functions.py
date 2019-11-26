import requests as req
import json
import os
from dotenv import load_dotenv
import base64
load_dotenv()


config = {
    'headers': {'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': f'{os.getenv("MICROSOFT_FACE_API_KEY")}'},
    'params': {
        'returnFaceAttributes': 'emotion',
        'detectionModel': 'detection_01',
    },
    'url': str(os.getenv('MICROSOFT_FACE_API_ENDPOINT'))
}


def get_face_api_stream(image_base_64):
    breakpoint()
    return req.post(config['url'], params=config['params'], headers=config['headers'], data={"body": image_base_64}).json()


def get_face_api_url(image_url):
    return req.post(config['url'], params=config['params'], headers=config['headers'], json={"url": image_url}).json()


def calculate_engagement(faces):
    # breakpoint()
    emotions = []
    count_positives = 0

    for face in faces:
        emotions.append(face['faceAttributes']['emotion'])

    for emotion in emotions:
        happiness = emotion['happiness']
        surprise = emotion['surprise']
        contempt = emotion['contempt']
        neutral = emotion['neutral']
        mean_positive = (happiness + surprise + contempt + neutral) / 4

        anger = emotion['anger']
        disgust = emotion['disgust']
        fear = emotion['fear']
        sadness = emotion['sadness']
        mean_negative = (anger + disgust + fear + sadness) / 4

        if mean_positive > mean_negative:
            count_positives += 1

    return count_positives/len(emotions)

# 'https://resources.stuff.co.nz/content/dam/images/1/l/i/w/s/d/image.related.StuffLandscapeSixteenByNine.710x400.1liwe1.png/1505158257164.jpg')

# res = face_api('https://us.123rf.com/450wm/rido/rido1804/rido180400025/103854704-tired-school-boy-with-hand-on-face-sitting-at-desk-in-classroom-bored-schoolchild-sitting-at-desk-wi.jpg')
# res = face_api(
#     'http://vision.cs.utexas.edu/378h-fall2015/assignments/a5/2.png')
# res = face_api(
#     'https://engagethepews.files.wordpress.com/2013/03/children.jpg')
# res = face_api(
#     'https://us.123rf.com/450wm/antonioguillem/antonioguillem1611/antonioguillem161100017/65125300-bored-couple-online-with-their-smart-phones-sitting-on-a-couch-in-the-living-room-at-home.jpg')
# res = face_api(
#     'https://eduadvisor.my/articles/wp-content/uploads/2017/10/How-to-Survive-A-Boring-Class-And-Still-Pass-It-Feature.png')
