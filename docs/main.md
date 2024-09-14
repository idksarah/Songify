# Docs

[Python docs](readpy.md)

## Running the program

Navigate to the demo directory

Then run

```bash
docker-compose up
```

And if edits are made then

```bash
docker-compose build --no-cache (app that was changed)
```

The apps are

- webapp    -> connection/python
- app-1     -> server/java
- webserver -> webpage host/apache

*assumes you have docker installed*
