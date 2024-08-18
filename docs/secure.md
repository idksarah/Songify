# Security

## Methods used

Nanocats elected to use session based authentication for users.

Go to [Networks](connect.md) to find out how.

Once account name and passwords have been passed you will get a UUID.
This UUID will be needed to use any of the song read write api's.
These UUID's will expire in a hour as an hour was judged to be sufficent.

All passwords are salt hashed to ensure the highest level of security no matter the password.
The only unsecure part is transfer of passwords bettween client and server that use only the post method but
the justification is that the time allocated is not sufficient to get into more complicated tasks like
Public and private keys.
