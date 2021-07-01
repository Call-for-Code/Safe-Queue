require('dotenv').config({silent: true})

// Twilio support for text messaging
const accountSid = process.env.TWILIO_ACCOUNTSID;
const authToken  = process.env.TWILIO_AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);
const twilioPhoneNumber = process.env.TWILIO_PHONENUMBER;

const express = require('express');
const http = require('http')
const WebSocket = require('ws')

const bodyParser = require('body-parser');

const port = process.env.PORT || 3000

const cloudant = require('./lib/cloudant.js');

const app = express();

const redis = require('redis');

// redis connection
const CHANNEL = "websocket-notification"
let redisOptions = {
  url: process.env.REDIS_URL,
  tls: {
    ca: [new Buffer.from(process.env.REDIS_BASE64_CA, "base64")]
}
}
const publisher = redis.createClient(redisOptions)
const subscriber = publisher.duplicate()

/*
 * needed for CORS
 */
app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods","OPTIONS, GET, UPGRADE, POST, PUT, PATCH, DELETE" ); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
  next(); 
}); 

app.use(bodyParser.json({limit: '10mb', extended: true})) 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))


/*
 * Services start here...
 */

const handleError = (res, err) => {
  const status = err.code !== undefined && err.code > 0 ? err.code : 500;
  return res.status(status).json(err);
};

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods","OPTIONS, UPGRADE, GET, POST, PUT, PATCH, DELETE" ); 
  return res.json({
    status: 'ok'
  });
});

/**
 * Get a session ID
 *
 * Returns a session ID that can be used in subsequent message API calls.
 */
app.get('/api/session', (req, res) => {
  assistant
    .session()
    .then(sessionid => res.send(sessionid))
    .catch(err => handleError(res, err));
});


/**
 * Get a list of resources
 *
 * The query string may contain the following qualifiers:
 *
 * - type
 * - name
 * - location  (undefined or null when no filtering by location is desired)
 * - userID
 * - monitors
 *
 * TODO: Use Cloudant-Geo (or so I think...)
 *       Currently, this function returns all resources (stores and customers) known globally
 *       and the app then sorts and filters them by its location.
 *       If the database gets large (1000's ?) then we should sort and filter the
 *       results by location here on the server, before sending them to the App.
 *       This requires a non-grep kind of filtering, a distance function.
 *
 *       This kind of support is built into Cloudant-Geo, so start using it.
 *       NOTE: the app passes its location here, so it should not need to be updated
 *       when CLoudant-Geo support is added.
 *
 * A list of resource objects will be returned (which can be an empty list)
 */

var bFilterByLocation = false;  // turns on filtering
var filterRadiusInKm = 100;    // fixed now for 100 KM

app.get('/api/resource', (req, res) => {
  const type = req.query.type;
  const name = req.query.name;
  const surl = req.query.surl;
  const contact = req.query.contact;
  const userID = req.query.userID;
  const location = req.query.location;   // not used yet

  // console.log("app.get: " + JSON.stringify(req.query));

  // Currently, customers send their location but managers do not
  // We'll only filter results for customers
  var doFilter = (location === undefined) ? false : true;
  var userLocation = location;

  cloudant
    .find(type, name, contact, userID, surl)
    .then(data => {
      if (data.statusCode != 200) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Methods","OPTIONS, GET, UPGRADE, POST, PUT, PATCH, DELETE" );
        res.sendStatus(data.statusCode)
      } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Methods","OPTIONS, GET, UPGRADE, POST, PUT, PATCH, DELETE" ); 

        if(bFilterByLocation && doFilter) {
          /*
           * filter the results by distance
           *
           * This is a two-step process
           * 1. Add stores that are close enough
           * 2. Add cusotmers in line at those stores only!
           */
          var results = JSON.parse(data.data);
          console.log("app.get results: " + results.length);

          // 1. Add stores that are close enough
          var stores = new Array();
          for(var i=0; i<results.length; i++) {
              var item = results[i];  

              var contact = item.contact;
              var arr = contact.split('][');
              var userID = arr[0];

              if(userID === "none@none.com") {
                  // this is a store
                  var storeLocation = item.location;
                  var arr1 = storeLocation.split(',')
                  var lat1 = arr1[0];
                  var lon1 = arr1[1];

                  var arr2 = userLocation.split(',')
                  var lat2 = arr2[0];
                  var lon2 = arr2[1];

                  var distance = getDistanceFromLatLonInKm(lat1,lon1, lat2,lon2);
                  if(distance < filterRadiusInKm) {
                      //console.log(item.name + "  " + distance + " Km")
                      item.id = undefined;
                      item._id = undefined;
                      stores.push(item);
                  }
              }
          }  

          // 2. Add customers that are in these stores only
          var customers = new Array();
          for(var i=0; i<results.length; i++) {
              var item = results[i];  

              var contact = item.contact;
              var arr = contact.split('][');
              var userID = arr[0];

              if(userID !== "none@none.com") {
                  // this is a customer
                  // see if he's in line at a store we've kept
                  for(var j=0; j<stores.length; j++) {
                      var store = stores[j];

                      if(item.name === store.name) {
                          customers.push(item);
                          break;
                      }
                  }
              }
          }  

          // Combine them all !!
          var filteredResults = new Array();
          console.log("STORES: " + stores.length + "  CUSTOMERS: " + customers.length)
          for(var i=0; i<stores.length; i++)
              filteredResults.push(stores[i]);
          for(var i=0; i<customers.length; i++)
              filteredResults.push(customers[i])

          // If there's no results, then we'll add some random results
          if(filteredResults.length == 0) {
              var max = results.length;
              for(var i=0; i<8; i++) {
                  var random = Math.random() % results.length;
                  filteredResults.push(results[i])
              }
          }
          res.send(JSON.stringify(filteredResults))
        }
        else {
          // send unfiltered results
          res.send(data.data)
        }
      }
    })
    .catch(err => handleError(res, err));
});


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


/**
 * Create a new resource
 *
 * The body must contain:
 *
 * - type
 * - name
 * - contact
 * - userID
 *
 * The body may also contain:
 *
 * - description
 * - quantity (which will default to 1 if not included)
 *
 * The ID and rev of the resource will be returned if successful
 */
let types = ["Food", "Other", "Store", "Help"]
app.post('/api/resource', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
  res.setHeader("Access-Control-Allow-Methods","OPTIONS, GET, POST, UPGRADE, PUT, PATCH, DELETE" ); 

  if (!req.body.type) {
      console.log("No type");
    return res.status(422).json({ errors: "Type of item must be provided"});
  }
  if (!types.includes(req.body.type)) {
      console.log("BAD type");
    return res.status(422).json({ errors: "Type of item must be one of " + types.toString()});
  }
  if (!req.body.name) {
      console.log("BAD name");
    return res.status(422).json({ errors: "Name of item must be provided"});
  }
  if (!req.body.contact) {
      console.log("BAD contact");
      return res.status(422).json({ errors: "A method of conact must be provided"});
  }

  const type = req.body.type;
  const name = req.body.name;
  const description = req.body.description || '';
  const userID = req.body.userID || '';
  const quantity = req.body.quantity || 1;
  const location = req.body.location || '';
  const contact = req.body.contact;
  const state = req.body.state;
  const logo = req.body.logo || '';
  const units = req.body.units || '';
  const monitors = req.body.monitors || '';
  const logosize = req.body.logosize || '';
  const features = req.body.features || '';
  const custom = req.body.custom || '';
  const mirrors = req.body.mirrors || '';

  //console.log("CREATE logosize:" + logosize);

  cloudant
    .create(type, name, description, quantity, location, contact, userID, state, logo, units, monitors, logosize, features, custom, mirrors)
    .then(data => {
        if (data.statusCode != 201) {
          res.sendStatus(data.statusCode)
        } else {
          res.send(data.data)
        }
    })
    .catch(err => handleError(res, err));
});

/**
 * Update new resource
 *
 * The body may contain any of the valid attributes, with their new values. Attributes
 * not included will be left unmodified.
 *
 * The new rev of the resource will be returned if successful
 */

app.patch('/api/resource/:id', (req, res) => {
  const type = req.body.type || '';
  const name = req.body.name || '';
  const description = req.body.description || '';
  const userID = req.body.userID || '';
  const quantity = req.body.quantity || '';
  const location = req.body.location || '';
  const contact = req.body.contact || '';
  const state = req.body.state || '';
  const whenCreated = req.body.whenCreated || '';
  const logo = req.body.logo || '';
  const whenNotified = req.body.whenNotified || '';
  const monitors = req.body.monitors || '';
  const logosize = req.body.logosize || '';
  const units = req.body.units || '';
  const features = req.body.features || '';
  const custom = req.body.custom || '';
  const mirrors = req.body.mirrors || '';
  const surl = req.body.surl || '';

  //console.log("PATCH surl: " + req.body.surl);

  cloudant
    .update(req.params.id, type, name, description, quantity, location, 
            contact, userID, state, whenCreated, logo, whenNotified, units, monitors, logosize, features, custom, mirrors, surl)
    .then(data => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader("Access-Control-Allow-Methods","OPTIONS, GET, UPGRADE, POST, PUT, PATCH, DELETE" ); 
      if (data.statusCode != 200) {
        res.sendStatus(data.statusCode)
      } else {
        res.send(data.data)
      }
    })
    .catch(err => handleError(res, err));
});

/**
 * Delete a resource by its id
 */
app.delete('/api/resource/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods","OPTIONS, GET, UPGRADE, POST, PUT, PATCH, DELETE" );
  cloudant
    .deleteById(req.params.id)
    .then(statusCode => res.sendStatus(statusCode))
    .catch(err => handleError(res, err));
});


//start our server
const server = http.createServer(app);
server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});


/* 
 * Web Socket notification for web-apps
 *
 * 
 * Our message protocol is:
 *
 * command::value
 * where value depends upon the command
 *
 * Commands:
 * "register"  value is the push token to register (the apps must make this globally unique)
 * "push"      value is the json for the push data (and the socket is closed afterward)
 * "pushopen"  value is the json for the push data (and the socket is left open afterward)
 *
 *
 * When a client creates a WebSocket, it sends it's user ID
 * which becomes it's "push token"
 *
 * We keep a map of tokens. If the server crashes, we lose all the tokens,
 * however they become useless anyway, since all socket connections would be dropped.
 * In that case, the client will see the disconnect and will retry (periodically).
 * If the server (this code!) doesn't come up, well then the whole system won't work.
 *
 * Make sure this doesn't happen - rigorous testing my friend is needed.
 *
 */
let tokenMap = new Map();
 
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
    //console.log("WebSocket onConnect");

    ws.on('message', function (msg) {
        // find the command
        var n = msg.indexOf("::");
        if(n < 0) { console.log("WebSocket got garbage: " + msg); return; }// ignore this

        var command = msg.substr(0,n);
        var value   = msg.substring(n+2);

        console.log("WebSocket command: " + command + " = " + value);

        if(command === 'register') {
            /*
             * This is the web-app registering with us, so he can receive notifications.
             * the message is simply a unique token (uniqueness is enforced by the web-app)
             *
             * We try to avoid duplicates (as closing the connection removes the token from the map)
             * Still, a browser seems to be able to close the socket without us getting a disconect callback.
             * So, we'll update the entry in the with what we receive here
             *
             * Because there were many websockets with the same token, but only one of them was used for the push.
             * This caused missing notifications at the client, since a stale websocket could be chosen.
             *
             * The problem can be avoided (though not clear completely fixed) with the client doing an
             * explicity close() on a websocket, before creating another one.  
             * 
             */

            /* 
             * Mark all the stale sockets so they are used.
             * THIS DOESN'T SEEM TO WORK
             *
            console.log("Looking for stale sockets for " + value +  " (" + wss.clients.size + " total) ");
            wss.clients.forEach(client => {
                var existingToken = client.usertoken;
                if(existingToken === value) {
                    client.usertoken = 'stale-' + value;
                    console.log("Checking " + existingToken + "  marking it stale");
                }
                else 
                    console.log("Checking " + existingToken + "  no match");
            })
            */

            ws.usertoken = value
            dumpTokenMap();
        }
        else if((command === 'push') || (command === 'pushopen')) {
            /*
             * We'll pass it on through the targeted web-app, if registered
             * pushopen means don't close the socket after
             */
            // THIS ISN'T USED ANYMORE (I THINK)
            console.log("GOT COMMAND PUSH????");

            var json = JSON.parse(value);
            var token = json.pushdata.token;
            var payload = json.pushdata;

            if(tokenMap.has(token)) {
                var targetws = tokenMap.get(token);
                console.log("Web Push sending from push command:" + JSON.stringify(payload));
                targetws.send(JSON.stringify(payload));
            }
            else {
                // can't send anything, since don't have a connection.  We'll note it in the log
                console.log("Web Push Failed: " + token + " is not in our map!");
            }

            if(command === 'push')
                ws.close();  // these are short lived
        }
    });

    ws.on('disconnect', function() {
        /*
         * The web-app has disconnected.  Find the token for this connection and remove it
         */
        console.log("Websocket disconnect called");

        var bFound = false;
        for(const [key, value] of tokenMap.entries()) {
            var conn = tokenMap.get(key);
            if(conn == ws) {
                // found it
                bFound = true;
                tokenMap.delete(key);
                console.log("Web Push UN-Registration " + key + "  Now have " + tokenMap.size + " connections.");
                dumpTokenMap();
                break;
            }
        }
    });

    ws.on('error', function() {
        /*
         * The web-app has disconnected.  Find the token for this connection and remove it
         */
        console.log("Websocket error called");
        return;
        var bFound = false;
        for(const [key, value] of tokenMap.entries()) {
            var conn = tokenMap.get(key);
            if(conn == ws) {
                // found it
                bFound = true;
                tokenMap.delete(key);
                console.log("Web Push UN-Registration " + key + "  Now have " + tokenMap.size + " connections.");
                dumpTokenMap();
                break;
            }
        }
    });
});

// this subscriber allows us to receive published messages into the channel from other instances
subscriber.on('message', (channel, message) => {
  if (channel == CHANNEL) {
    let clients = wss.clients
    let parsed = JSON.parse(message)
    let pushdata = parsed.pushdata
    let token = parsed.token
    let foundclient = false;
    let number = 0;
    for (let client of clients) {
        if (client.usertoken == token) {
            foundclient = true
            number++;
            const pushjson = {pushdata}
            const pushstr = JSON.stringify(pushjson)
            if(number === 1) {
                console.log(`Web Push found target ws client with usertoken ${token} on this instance!`)
                console.log("Web Push sending to: " + token + " PAYLOAD:" + pushstr);
            }
            console.log("Web Push send to client " + number)
            client.send(pushstr)

            /* 
             * Becuase the client re-connects regularly with the 'register' command, 
             * we seem to have a number of sockets with the same token. 
             * This caused a loss in notifications, since a stale websocket could be chosen here.
             *
             * It seems the problem was that the client side did not do an explicity close() when
             * it re-connected, though not clear this will work in every case (e.g. when the server
             * does the disconnect)
             * 
             * Removing the duplicates didn't seem to work (not sure why) see 'register' code above
             *
             * So, instead we will send to every websocket that matches. One of them must be good.
             * In general, we'll likly see just one, but in case we don't, we're covered.
             *
             * So we'll remove the previous break statement here!
             */
            //break;
        }
    }
    if (!foundclient) {
        console.log(`Client token ${token} was not found on this instance`)
    }
  }
})

subscriber.subscribe(CHANNEL)

const dumpTokenMap = () => {
    console.log("WebSocket tokenMap:  (" + wss.clients.size + " total) in this instance");
    var cnt = 1;
    wss.clients.forEach(client => {
        console.log("    " + cnt + ": " + client.usertoken);
        cnt++;
    })
}

const TYPE_WEB = 402;
const TYPE_SMS = 403;

app.get('/api/push/:token/:sound/:payload', (req, res) => {
    var token = req.params.token;
    if(token === "undefined") {
        console.log("\n\nPUSH GOT TOKEN = undefined");
        var spayload64 = req.params.payload;
        var spayload = Buffer.from(spayload64, 'base64').toString('binary');
        console.log("With Payload:" + spayload + "\n\n");
        return;
    }

    var spayload64 = req.params.payload;
    var sound = req.params.sound;
    var spayload = Buffer.from(spayload64, 'base64').toString('binary');

    //console.log("PUSH token:" + token + "<BR>sound:" + sound + "<BR>payload:" + spayload64);
    //console.log("Payload:" + spayload);

    var obj = JSON.parse(spayload);
    const userid = obj.payload.userid;
    const title = obj.title;  // never blank
    const body = obj.body;    // may be blank
    const payload = JSON.stringify(obj.payload);  // was made an object by parse above

    var type = tokenType(token);
    if(type == TYPE_SMS) {
        // remove the sms_ prefix to get the number
        var phonenumber = token.substr(4);

        // create the whole text:
        var wholeBody;
        if(title !== '')
            wholeBody = 'This is Safe Queue!\n' + title + '\n' + body;
        else
            wholeBody = 'This is Safe Queue!\n' + body;

        // There's been too much use of texting, so we'll only text for the final go in now message
        // THIS IS THE DEFINITION FROM App.js:  global.notificationYouAreNext = "youarnext";  
        var notifytype = obj.payload.type;
        var bAllowTexting = (notifytype === "youarnext") ? true : false;

        // make sure we have Twilio information
        if((accountSid === undefined) || (authToken === undefined))
            bAllowTexting = false;

        if(bAllowTexting) {
            console.log("Text notification to " + phonenumber)
            client.messages
              .create({
                  body: wholeBody,
                  from: twilioPhoneNumber, 
                  to:   phonenumber
              })
              .then(message => {
                  console.log('TWILIO SMS:' + JSON.stringify(message));
                  // we'll report good result if the SMS was good. WebSocket result is optional
                  var obj = { result: 'SUCCESS', token, payload };
                  var myJSON = JSON.stringify(obj);
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.setHeader("Access-Control-Allow-Methods","OPTIONS, GET, UPGRADE, POST, PUT, PATCH, DELETE" );
                  res.send(myJSON);
              })
              .catch((error) => {
                  console.log('TWILIO SMS ERROR at ' + phonenumber + " with: " + error);
                  res.status('404').send({ result: 'FAILED', error})
              });
        }
        else {
            console.log("Suppressed SMS for " + body)
        }

        // This is a bit tricky (or fancy, not sure which)
        // Even though the push was SMS, we'll still try to do the websocket notification
        // so that the App will update if it is able to do so.
        var prefix = userid.substring(0,4); 
        if(prefix === "web_") {
            console.log("Also doing webSocket notification to " + userid)
            token = userid; // well-known practice

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader("Access-Control-Allow-Methods","OPTIONS, GET, UPGRADE, POST, PUT, PATCH, DELETE" );

            let message = {
                token,
                data: {payload},
                notification: {
                    title, body
                },
                android: {
                    notification: {
                      sound,
                    }
                }
            } 

            // Publish to redis channel, let subscriber handle the push
            const pushjson = {pushdata:message, token}
            const pushstr = JSON.stringify(pushjson)
            console.log("Publishing to channel: " + token + " PAYLOAD:" + pushstr);
            publisher.publish(CHANNEL, pushstr)
        }
    }
    else if(type == TYPE_WEB) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Methods","OPTIONS, GET, UPGRADE, POST, PUT, PATCH, DELETE" );

        let message = {
            token,
            data: {payload},
            notification: {
                title, body
            },
            android: {
                notification: {
                  sound,
                }
            }
        } 

        // Publish to redis channel, let subscriber handle the push
        const pushjson = {pushdata:message, token}
        const pushstr = JSON.stringify(pushjson)
        console.log("Publishing to channel: " + token + " PAYLOAD:" + pushstr);
        publisher.publish(CHANNEL, pushstr)

        //console.log('WEB PUSH sent message:', token);
        var obj = { result: 'SUCCESS', token, payload };
        var myJSON = JSON.stringify(obj);
        res.send(myJSON);
    }    
});


// Simple determination of the type of token
function tokenType(token) {
    var prefix = token.substring(0,4); 

    if(prefix === 'sms_')
        return TYPE_SMS;
    if(prefix === 'web_')
        return TYPE_WEB;


    // Google or Apple push
    if(token.length > 64) 
        return TYPE_FCM;
    else
        return TYPE_APN;
}
