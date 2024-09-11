import json
from fastapi import APIRouter, HTTPException
from core.config import tags
from core.security import cheakSessionID
from db import readbd

router = APIRouter()

#Thanks to PRAJWAL AGARWAL for kindly provinding this implemtaion to steal
def levenshteinDistance(A, B):
    N, M = len(A), len(B)
    # Create an array of size NxM
    dp = [[0 for i in range(M + 1)] for j in range(N + 1)]

    # Base Case: When N = 0
    for j in range(M + 1):
        dp[0][j] = j
    # Base Case: When M = 0
    for i in range(N + 1):
        dp[i][0] = i
    # Transitions
    for i in range(1, N + 1):
        for j in range(1, M + 1):
            if A[i - 1] == B[j - 1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j], # Insertion
                    dp[i][j-1], # Deletion
                    dp[i-1][j-1] # Replacement
                )

    return dp[N][M]

#Look neither of us know what is going on in this program
#How the system should work
# 1.Retain the first letter of the name and drop all other occurrences of a, e, i, o, u, y, h, w.
# 2.Replace consonants with digits as follows (after the first letter):
#      b, f, p, v → 1
#      c, g, j, k, q, s, x, z → 2
#      d, t → 3
#      l → 4
#      m, n → 5
#      r → 6
# 3.If two or more letters with the same number are adjacent in the original name (before step 1), 
# only retain the first letter; also two letters with the same number separated by 'h', 'w' or 'y' are 
# coded as a single number, whereas such letters separated by a vowel are coded twice. This rule also applies to the first letter.
# 4.If there are too few letters in the word to assign three numbers, append zeros until there are three numbers. 
# If there are four or more numbers, retain only the first three.
#Taken from wikipedia or can be found at https://www.archives.gov/research/census/soundex
def ConvertToAmericanSoundex(string:str):

    string = string.lower()
    AmericanSoundexNewStr = ''

    #convert to basic code
    for charIncrement in range(len(string)):
            if charIncrement == 0:
                AmericanSoundexNewStr = AmericanSoundexNewStr + string[charIncrement]
            elif string[charIncrement] in ['b','f','p','v']:
                AmericanSoundexNewStr = AmericanSoundexNewStr + '1'
            elif string[charIncrement] in ['c','g','j','k','q','s','x','z']:
                AmericanSoundexNewStr = AmericanSoundexNewStr + '2'
            elif string[charIncrement] in ['d','t']:
                AmericanSoundexNewStr = AmericanSoundexNewStr + '3'
            elif string[charIncrement] in ['l']:
                AmericanSoundexNewStr = AmericanSoundexNewStr + '4'
            elif string[charIncrement] in ['m','n']:
                AmericanSoundexNewStr = AmericanSoundexNewStr + '5'
            elif string[charIncrement] in ['r']:
                AmericanSoundexNewStr = AmericanSoundexNewStr + '6'
            else:
                AmericanSoundexNewStr = AmericanSoundexNewStr + '0'

    #truncate the sting
    tempstr = ''
    
    for charIncrement in range(len(string)):
        if charIncrement == 0:
            tempstr += AmericanSoundexNewStr[charIncrement]

        #General
        elif string[charIncrement] in ['b','f','p','v'] and string[charIncrement-1] in ['b','f','p','v']:
            pass

        elif string[charIncrement] in ['c','g','j','k','q','s','x','z'] and string[charIncrement-1] in ['c','g','j','k','q','s','x','z']:
            pass
        
        elif string[charIncrement] in ['d','t'] and string[charIncrement-1] in ['d','t']:
            pass

        elif string[charIncrement] in ['l'] and string[charIncrement-1] in ['l']:
            pass

        elif string[charIncrement] in ['m','n'] and string[charIncrement-1] in ['m','n']:
            pass

        #if they are seperated by h, w, or y
        elif string[charIncrement] in ['b','f','p','v'] and string[charIncrement-1] in ['h','w','y'] and string[charIncrement-2] in ['b','f','p','v']:
            pass

        elif string[charIncrement] in ['c','g','j','k','q','s','x','z'] and string[charIncrement-1] in ['h','w','y'] and string[charIncrement-2] in ['c','g','j','k','q','s','x','z']:
            pass
        
        elif string[charIncrement] in ['d','t'] and string[charIncrement-1] in ['h','w','y'] and string[charIncrement-2] in ['d','t']:
            pass

        elif string[charIncrement] in ['l'] and string[charIncrement-1] in ['h','w','y'] and string[charIncrement-2] in ['l']:
            pass

        elif string[charIncrement] in ['m','n'] and string[charIncrement-1] in ['h','w','y'] and string[charIncrement-2] in ['m','n']:
            pass

        elif string[charIncrement] in ['r'] and string[charIncrement-1] in ['h','w','y'] and string[charIncrement-2] in ['r']:
            pass

        #Otherwise add the charecter
        else:
            tempstr += AmericanSoundexNewStr[charIncrement]
    
    AmericanSoundexNewStr = ''.join(char for char in tempstr if char != '0')
    

    #Normalize size
    if len(AmericanSoundexNewStr) < 4:
        #Too skinny
        #Lets fatten
        AmericanSoundexNewStr = AmericanSoundexNewStr + '0' * (4 - len(AmericanSoundexNewStr))
    elif len(AmericanSoundexNewStr) > 4:
        #Too fat
        #Lets thin it down
        #Genuine Mad ass code
        AmericanSoundexNewStr = ''.join((AmericanSoundexNewStr[c] for c in range(len(AmericanSoundexNewStr)) if c <= 3))
    
    return AmericanSoundexNewStr
                

#Makes a likness float from 0 (perfect match) to 1 (no match)
def genLiknesScore(SongName:str,SongArtist:str,tags:str):
    LiknesScore = 0
    SongNameSoundex = ConvertToAmericanSoundex(SongName)
    SongArtistSoundex = ConvertToAmericanSoundex(SongArtist)

    for tag in tags:
        TagLiknesScore = 0

        #american soundex
        #If it matches sound i assume it as incredabley similar so it gets set to 1
        tagSoundex = ConvertToAmericanSoundex(tag)
        if SongNameSoundex == tagSoundex or SongArtistSoundex == tagSoundex:
            TagLiknesScore = 0
        else:
            TagLiknesScore = 1

        #1 / (1 + pow(2.71828,(-0.3 * (n - 7.5))))
        #levenshtein Distance
        levenshteinDistanceAveage = 0

        levenshteinDistanceAveage += levenshteinDistance(SongName,tag)
        levenshteinDistanceAveage += levenshteinDistance(SongArtistSoundex,tag)
        levenshteinDistanceAveage = levenshteinDistanceAveage/2

        #average both
        TagLiknesScore += levenshteinDistanceAveage
        TagLiknesScore = TagLiknesScore/2

        #add to Likness score
        LiknesScore += TagLiknesScore
    
    #Average the likness score to get 0->1
    LiknesScore = LiknesScore/len(tags)

    return LiknesScore


#finding all songs matching tags
#Todo: Does this shit work? Note, It dosn't.
@router.post("/find-songs")
async def findSongs(tag:tags):

    if not cheakSessionID(tag.sessionID):
        raise HTTPException(status_code=500, detail="Invalid Session")
    
    #Find song likness
    songIncrement = 1
    BestFitId = 1
    BestFitLikness = 1
    for counter in range(10000):
        song = readbd.getSong(songIncrement)

        if song == -1:
            raise HTTPException(status_code=500, detail="Database is down")
        if song == 320:
            break
        
        songLikness = genLiknesScore(song["title"], song["artist"], tags.tags)

        if BestFitLikness < songLikness:
            BestFitId = songIncrement

        songIncrement += 1

    song = readbd.getSong(BestFitId)

    if song == -1:
        raise HTTPException(status_code=500, detail="Database is down")
    
    return song