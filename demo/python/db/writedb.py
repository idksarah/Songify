import requests

def writeSong(data):
    request = requests.post('http://app:8082/api/v1/new_song',json={"title":data.title,"artist":data.artist,"lyrics":data.lyrics})

    if request.status_code == 400:
        return 1
    elif not request.status_code == 200:
        return -1
    return 0


def writeUser(name:str, hash:bytes, email:str):
    request = requests.post('http://app:8082/api/v1/new_user',json={"username":name,"password":hash,"email":email})

    if request.status_code == 400:
        return 1
    elif not request.status_code == 200:
        return -1
    else:
        return 0