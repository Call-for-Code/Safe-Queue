# Safe Queue Server App

## Contents

1. [Overview](#overview)
2. [How it works](#how-it-works)
3. [Deployment](#deployment)

## Overview

This is the server-side application in Safe Queue. 
It is an IBM Cloud Foundry application that uses a Cloudant databse for persistent state of the system, a Redis instance for distribution of push notifications, and an (optional) ability to send SMS text messages using the Twilio service for notifications.

## How it works

Users go to the web site where the Safe Queue web-app exists (see the web-app directory in this repo).  The web-app communicates with the Safe Queue server-app, which in turn stores information in a Cloudant database and distributes notifications.
Communication between the web-app and server-app takes three forms:
1. REST - HTTP/HTTPS requests with responses.  Used for database queries/updates/etc.
2. WebSocket - WS/WSS longer-lived connections. Used for sending and receiving notifications.
3. SMS Messaging - using this Twilio service, sends SMS Text messages to users

Note that communication between the web-app and server-app is configured using the .env file in the web-app.

## Deployment

### Create a Cloudant database

The easiest way to do this is to log into the IBM Cloud and [provision an instance of Cloudant](https://cloud.ibm.com/catalog/services/Cloudant). 
You can create a Lite instance, or pay for a Standard instance.
You'll then need to enable it for IAM and copy the key.

### Create a Redis instance

See IBM documentation.

### Create a `.env` file from `dotenv-template`

There are several variables to be set, as described in the template. These include CLoudant, Redis and Twilio.

### Running locally

Configure the server-app and run `npm start`  to start up on the local IP on port 8080.  It will connect to the Cloudant database, Redis instance and start websocket listeners.

### Running on the IBM Cloud

#### Install the IBM Cloud CLI

Follow [the tutorial here](https://cloud.ibm.com/docs/cli?topic=cli-getting-started).

##### Log in

Log into the IBM Cloud and pick the location where you want to deploy the Node.js app.

```
ibmcloud login
ibmcloud target --cf
```

#### Push the application

The code is in this directory, along with a `manifest.yml` file with the "safequeue" hostname. If you're pushing to a different host, change the name in this file first. 

```
ibmcloud cf install
ibmcloud cf push
```
