import requests

def getSongs():
    request = requests.get('http://127.0.0.1:8082/api/v1/songs')

    if not request.status_code == 200:
        return -1

    return request.json()

def getAccounts():
    request = requests.get('http://127.0.0.1:8082/api/v1/users')

    print(request.status_code)
    print(request.json())
    if not request.status_code == 200:
        return -1
    return request.json()