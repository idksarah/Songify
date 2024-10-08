import threading
import time
import uuid
import bcrypt
from db.readbd import getAccounts
from db.writedb import writeUser

keyholder = threading.Lock()

class SessionID(threading.Thread):
    def __init__(self) -> None:
        super().__init__()
        self.SessionIDs = []
        self.Kill = False
        self.start()

    def run(self):
        self.updateSessionIDs()
    
    def updateSessionIDs(self):
        while not self.Kill:
            with keyholder:
                #get rid of old values
                self.SessionIDs = [ID for ID in self.SessionIDs if ID[1] >= 1]
                #update current values
                for ID in self.SessionIDs:
                    ID[1] -= 3
            time.sleep(3)
                    

currentSession = SessionID()

#confirm user exists
def affirmUser(username:str,password:str):
    accounts = getAccounts()

    if accounts == -1:
        return -1
    
    #does user exist?
    for user in accounts:
        if user['username'] == username and bcrypt.checkpw(password.encode('utf-8'),user['password'].encode('utf-8')):

            #write "safely" to the currentSession thread
            with keyholder:
                while True:
                    new_uuid = str(uuid.uuid4())
                    
                    if all(new_uuid != item[0] for item in currentSession.SessionIDs):
                        currentSession.SessionIDs.append([new_uuid,3600])
                        return new_uuid
    
    #sadly no
    return 1

def cheakSessionID(SessionID:int):
    with keyholder:
        found = False
        for item in currentSession.SessionIDs:
            if SessionID == item[0]:
                item[1] = 3600
                found = True
        return found
    
#gens a hash and salt using lib
def genHash(string:str):
    newhash = bcrypt.hashpw(string.encode('utf-8'),bcrypt.gensalt())
    return newhash.decode('utf-8')

def addUser(userName:str,password:str, email:str):
    hashnew = genHash(password)
    print(hashnew)
    returncode = writeUser(userName,hashnew,email)
    return returncode