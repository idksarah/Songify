import threading
import time
import uuid
import bcrypt
from db.readbd import getAccounts
from db.writedb import writeUser

class SessionID():
    def __init__(self) -> None:
        self.SessionIDs = []
        self.Kill = False
        self._lock = threading.Lock()
        self.updateSessionIDs()
    
    def updateSessionIDs(self):
        while not self.Kill:
            with self._lock:

                #get rid of old values
                self.SessionIDs = [ID for ID in self.SessionIDs if ID[1] >= 1]

                #update current values
                for ID in self.SessionIDs:
                    ID[1] -= 3
            time.sleep(3)
                    


currentSession = threading.Thread(target = SessionID)
currentSession.start()

#confirm user exists
def affirmUser(username:str,password:str):
    accounts = getAccounts()

    #does user exist?
    for user in accounts:
        if user['username'] == username and bcrypt.checkpw(password.encode('utf-8'),user['password']):

            #write "safely" to the currentSession thread
            with currentSession._lock:
                while True:
                    new_uuid = str(uuid.uuid4())
                    
                    if all(new_uuid != item[0] for item in currentSession.SessionIDs):
                        currentSession.SessionIDs.append((new_uuid,3600))
                        break
    
    #sadly no
    return -1

def cheakSessionID(SessionID:int):
    with currentSession._lock:
        return any(SessionID == item[0] for item in currentSession.SessionIDs)
    
#gens a hash and salt using lib
def genHash(string:str):
    return bcrypt.hashpw(string.encode('utf-8'),bcrypt.gensalt())

def addUser(userName:str,password:str):
    hashnew = genHash(password)
    returncode = writeUser(userName,hashnew)
    return returncode