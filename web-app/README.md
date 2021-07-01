# Safe Queue Mobile Web-App

## Contents

1. [Overview](#overview)
2. [How it works](#how-it-works)
3. [Deployment](#deployment)

## Overview

This is the client side application in Safe Queue.
It is a react-js user-facing application that relies upon back-end cloud services.

## How it works

Users go to the web site where this Safe Queue web-app exists.  The web-app communicates with the Safe Queue server-app (see the server-app directory in this repo), which in turn stores information in a database and distributes notifications.
Communication between the web-app and server-app takes three forms:
1. REST - HTTP/HTTPS requests with responses.  Used for database queries/updates/etc.
2. WebSocket - WS/WSS longer-lived connections. Used for sending and receiving notifications.
3. SMS Messaging - using this Twilio service, sends SMS Text messages to users

Note that communication between the web-app and server-app is configured using the .env file in the web-app.

## Deployment

### Create a `.env` file from `dotenv-template`

There are several variables to be set, as described in the template.

### Running locally

Configure the web-app and run `npm start`  to start up on the local IP on port 3000.  It will connect to the server-app as configured in the .env file (which can be a localhost server-app or a server-app deployed in the IBM Cloud).
The web-app should open in a browser automatically, but if not go to [http://localhost:3000](http://localhost:3000) to view it in a browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Running on the IBM Cloud

Run the script 'build.sh' which builds the app for production to the `build` folder and lists the results (so you can verify it was completed).
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
