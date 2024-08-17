import requests
import json

def writeSong(data:json):
    request = requests.post('http://127.0.0.1:8082/api/v1/new_song',data)

    if not request.status_code == 200:
        return -1
    return 1


def writeUser(name:str, hash:str):
    request = requests.post('http://127.0.0.1:8082/api/v1/add_user',json.dumps({"name":name,"password":hash}))

    if not request.status_code == 200:
        return -1
    else:
        return 1