# Python backend

Part of the 2024 PeddieHacks hackathon by team Nanocats see licence in NanoCat-peddie directory

Section Links

[Networks](connect.md)

[Security](secure.md)

## Running the program

You need to install the dependencies using this command
*assuming you are in the Neocats directory*

```Bash
pip install -r src/Backend/python/requirements.txt
```

To run the program you should navigate to this folder and fun the command

```Bash
python -m uvicorn main:app --host (your ip/ the host ip of the api) --port 7300
```

For example for the computer's ip being 162.0.1.73 the command would be

```Bash
python -m uvicorn main:app --host 162.0.1.73  --port 7300
```

And to connect you would use the ip

```Bash
162.0.1.73:7300/api/some-request
```
