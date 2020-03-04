# Deploy Guide

Before creating a build, the following require to be changed/set. The version inside `package.json` needs to be updated

#### /api/api_config.php

The correct username, password and database name need to be set

#### src/consts.js

Need to change `BASE_API_PATH` variable (Potentially just remove port number)

# Deploying to a Location

Place all files inside the build to the target path (specified in `package.json`'s `homepage` variable). The `/api` is required to sit on the root of the server. 