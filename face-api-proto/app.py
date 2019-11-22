import requests as req
import json
import os
from dotenv import load_dotenv

load_dotenv()


def face_api(image_url):
    headers = {'Content-Type': 'application/json',
               'Ocp-Apim-Subscription-Key': f'{os.getenv("MICROSOFT_FACE_API_KEY")}'}
    params = {
        'returnFaceAttributes': 'emotion',
        'detectionModel': 'detection_01',
    }
    url = str(os.getenv('MICROSOFT_FACE_API_ENDPOINT'))
    res = req.post(url, params=params, headers=headers,
                   json={"url": image_url}).json()

    return res


print(face_api('https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg'))
