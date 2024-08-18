import requests

def getSongs():
    request = requests.get('http://app:8082/api/v1/songs')

    if not request.status_code == 200:
        return -1

    return request.json()

def getAccounts():
    request = requests.get('http://app:8082/api/v1/users')

    if not request.status_code == 200:
        return -1
    return request.json()