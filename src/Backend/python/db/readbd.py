import requests

def getSongs():
    request = requests.get('http://localhost:8082/api/v1/songs')

    if not request.status_code == 200:
        return -1
    
    return request.json()