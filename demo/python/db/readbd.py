import requests

def getSong(id:int):
    request = requests.get('http://app:8082/api/v1/song?id='+id)

    if not request.status_code == 404:
        return 320
    
    if not request.status_code == 200:
        return -1

    return request.json()

def getAccounts():
    request = requests.get('http://app:8082/api/v1/users')

    if not request.status_code == 200:
        return -1
    return request.json()