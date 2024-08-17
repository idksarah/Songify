# Python backend 

Look at [requremnts.txt](requirements.txt) for required packages

## Running the program 

To run the program you should navigate to this folder and fun the command
```Bash
python -m uvicorn main:app --reload
```

## Api endpoints 

### /api/find-songs

Takes a list of tags and returns infromation about the maches made by name or artist

Example request
```Json
{
    "tag",
    "tag",
    "tag",
    ...
}
```

Example return
```Json
{
    {
        "id":int,
        "title":str,
        "artist":str,
        "lyrics": CLOB
    },
    {
        "id":int,
        "title":str,
        "artist":str,
        "lyrics": CLOB
    },
    ...
}
```