# Security

## Methods used

Nanocats have used both get and post requests as needed.
Api's and their use are located:

## NOTE sessionID and similar security are temporaraly uneeded

- [Find songs](#find-songs)

- [New song](#new-song)

- [Add user](#add-user)

- [Get user id](#get-uuid)

- [General errors](#general-errors)

## Api endpoints

### /find-songs

*get*

Takes a list of tags and returns infromation about the maches made by name or artist

Example request

```Json
{
    "sessionID":str,
    "tags":["tag1","tag2"]
}
```

Example return

```Json
{
    {
        "title":str,
        "artist":str,
    }
}
```

### /get-uuid

*post*

Takes a username, password, and email.

Example request

```Json
{
  "username":str,
  "password":str,
  "email":str
}
```

Example return

If valid

```Json
"str"
```

If invalid

```Json
"Invalid account details"
```

### /new-song

*post*

Example request

```Json
{
    "sessionID":"str",
    "title":"str",
    "artist":"str",
    "lyrics":"str"
}
```

Example return

If successful

```Json
    "Succsesfuly wrote"
```

Or

```Json
    "Succsesfuly wrote"
```

### /add-user

*post*

Example request

```Json
{
  "username":"str",
  "password":"str",
  "email":"str"
}
```

Example return

If successful

```Json
    "User Created"
```

Or

```Json
    "User exits"
```

### General errors

Code: 500
Data: "Cannot write to db"
This is a general error denoting when the Python cannot connect to the java database

Code: 200
Data: "Invalid Session"
This is used when the UUID has expired or is invalid
