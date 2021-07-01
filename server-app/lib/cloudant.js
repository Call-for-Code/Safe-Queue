const Cloudant = require('@cloudant/cloudant');

const cloudant_id = process.env.CLOUDANT_ID || '<cloudant_id>'
const cloudant_apikey = process.env.CLOUDANT_IAM_APIKEY || '<cloudant_apikey>';

// UUID creation
const uuidv4 = require('uuid/v4');

var CronJob = require('cron').CronJob;


var cloudant = new Cloudant({
    account: cloudant_id,
    plugins: {
      iamauth: {
        iamApiKey: cloudant_apikey
      }
    }
  })

// Cloudant DB reference
let db;
let db_name = "community_db";

/**
 * Connects to the Cloudant DB, creating it if does not already exist
 * @return {Promise} - when resolved, contains the db, ready to go
 */
const dbCloudantConnect = () => {
    return new Promise((resolve, reject) => {
        Cloudant({  // eslint-disable-line
            account: cloudant_id,
                plugins: {
                    iamauth: {
                        iamApiKey: cloudant_apikey
                    }
                }
        }, ((err, cloudant) => {
            if (err) {
                console.log('Connect failure: ' + err.message + ' for Cloudant ID: ' +
                    cloudant_id);
                reject(err);
            } else {
                cloudant.db.list().then((body) => {
                    if (!body.includes(db_name)) {
                        console.log('DB Does not exist..creating: ' + db_name);
                        cloudant.db.create(db_name).then(() => {
                            if (err) {
                                console.log('DB Create failure: ' + err.message + ' for Cloudant ID: ' +
                                cloudant_id);
                                reject(err);
                            }
                        })
                    }
                    let db = cloudant.use(db_name);
                    console.log('Connect success! Connected to DB: ' + db_name);
                    resolve(db);
                }).catch((err) => { console.log(err); reject(err); });
            }
        }));
    });
}

// Initialize the DB when this module is loaded
(function getDbConnection() {
    console.log('Initializing Cloudant connection for Safe Queue...', 'getDbConnection()');
    dbCloudantConnect().then((database) => {
        console.log('Cloudant connection initialized.', 'getDbConnection()');
        db = database;
    }).catch((err) => {
        console.log('Error while initializing DB: ' + err.message, 'getDbConnection()');
        throw err;
    });

    /*  
     * May be used later for automatic opening of businesses
     */
    // console.log('Starting cronjob, wakes up every 10 minutes');
    // var job = new CronJob('0 */1 * * * *', function() {
    //    cronJobFunction();
    // }, null, true, 'America/Los_Angeles');
    // job.start();

})();


const cronJobFunction = () => {
    const d = new Date();
    console.log('CronJob running at: ', d);

    let selector = {};
    selector['type'] = 'Store';

    let contact = 'none@none.com';
    let csearch = `(?i).*${contact}.*`;
    selector['contact'] = {'$regex': csearch};

    //selector['userID'] = '894244fd917a952d';

    selector['open'] = { "$exists": true } 

    //selector['state'] = 'flagged';

    var sortarr = new Array();
    sortarr.push({'by':'name'});
    //selector['sort'] = sortarr;

    console.log('cron selector: ' + JSON.stringify(selector));

    db.find({
        'selector': selector
    }, (err, documents) => {
        if (err) {
            console.log("CRONJOB DATABASE FAILURE");
        } else {
            console.log("cronjob found " + documents.docs.length + " documents");
            var cnt = 0;
            for(var i=0; i<documents.docs.length; i++) {
                var doc = documents.docs[i];
                if((doc.state !== 'flagged') &&
                   (doc.userID !== 'dave4522269') &&
                   (doc.userID !== 'dave07234567')) {

                    let pre = '';
                    if(doc.userID.length > 16)
                        pre = 'IOS';
                    else if(doc.userID.length === 13)
                        pre = 'WEB';
                    else 
                        pre = 'AND';

                    console.log(cnt + ": " + pre + " " + doc.name + "  userID: " + doc.userID + " AUTO: " + doc.open);
                    cnt++;
                }
            }
            //resolve({ data: JSON.stringify(documents.docs), statusCode: 200});
        }
    });
}

/**
 * Find all resources that match the specified name.
 *
 * @param {String} type
 * @param {String} partialName
 * @param {String} userID
 * @param {String} surl
 *
 * Safe Queue allows partial userID as recovery code for a store
 * Safe Queue allows none@none.com in "name" to indicate store, not customer
 *
 * @return {Promise} Promise -
 *  resolve(): all resource objects that contain the partial
 *          name, type or userID provided, or an empty array if nothing
 *          could be located that matches.
 *  reject(): the err object from the underlying data store
 */
function find(type, partialName, contact, userID, surl) {

  //console.log('find: ' + type + ' ' + contact + ' ' + partialName + ' ' + userID);

    return new Promise((resolve, reject) => {
        let selector = {}
        if (type) {
            selector['type'] = type;
        }
        if (partialName) {
            let search = `(?i).*${partialName}.*`;
            selector['name'] = {'$regex': search};

            // NO, no longer partial since some names interfere with the regex syntax
            // It wasn't needed anyway
            selector['name'] = partialName;
        }
        if(contact) {
            let csearch = `(?i).*${contact}.*`;
            selector['contact'] = {'$regex': csearch};
            // selector['contact'] = contact;  // pre safe-queue
        }

        if (userID) {
            // Okay, here's the kluge...
            // if userID is only 8 chars long (it should be 36 chars long)
            //    then this is a search for store by its recovery code
            // We use the first 8 digit of _id as that recovery code,
            // so we transform userID search into _id search
            // TODO:  give recovery code lookup its own query !!!
            if(userID.length > 8) {
                // look for the OR of userID and monitors with the passed userID
                let matches = new Array();

                let jsonu = {'userID': userID};
                let jsonm = {'monitors': userID};
                let jsonmirror = {'mirrors' : userID + "][" + userID}
                matches.push(jsonu);
                matches.push(jsonm);
                matches.push(jsonmirror);
                selector['$or'] = matches;   
            }
            else {
                // This is a recovery code lookup
                let isearch = `(?i).*${userID}.*`;
                selector['_id'] = {'$regex': isearch};
            }
        }
        if(surl) {
            selector['surl'] = surl;
        }

        //console.log("app.get selector: " + JSON.stringify(selector));

        db.find({
            'selector': selector
        }, (err, documents) => {
            if (err) {
                console.log("db.find error");
                reject(err);
            } else {
                resolve({ data: JSON.stringify(documents.docs), statusCode: 200});
            }
        });
    });
}

/**
 * Delete a resource that matches a ID.
 *
 * @param {String} id
 *
 * @return {Promise} Promise -
 *  resolve(): Status code as to whether to the object was deleted
 *  reject(): the err object from the underlying data store
 */
function deleteById(id, rev) {

    //console.log('DeleteById: ' + id);

    return new Promise((resolve, reject) => {
        db.get(id, (err, document) => {
            if (err) {
                resolve(err.statusCode);
            } else {
                db.destroy(id, document._rev, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(200);
                    }
                })
            }
        })
    });
}



//  A formatted version of a popular md5 implementation.
//  Original copyright (c) Paul Johnston & Greg Holt.
//  The function itself is now 42 lines long.

function md5(inputString) {
    var hc="0123456789abcdef";
    function rh(n) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
    function ad(x,y) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
    function rl(n,c)            {return (n<<c)|(n>>>(32-c));}
    function cm(q,a,b,x,s,t)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
    function ff(a,b,c,d,x,s,t)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
    function gg(a,b,c,d,x,s,t)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
    function hh(a,b,c,d,x,s,t)  {return cm(b^c^d,a,b,x,s,t);}
    function ii(a,b,c,d,x,s,t)  {return cm(c^(b|(~d)),a,b,x,s,t);}
    function sb(x) {
        var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
        for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
        blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
    }
    var i,x=sb(inputString),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
    for(i=0;i<x.length;i+=16) {olda=a;oldb=b;oldc=c;oldd=d;
        a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
        b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
        c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
        d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
        a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
        b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
        c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
        d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
        a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
        b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
        c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
        d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
        a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
        b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
        c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
        d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
        a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
        b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
        c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
        d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
        a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
        b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
    }
    return rh(a)+rh(b)+rh(c)+rh(d);
}

/**
 * Create a resource with the specified attributes
 *
 * @param {String} type - the type of the item
 * @param {String} name - the name of the item
 * @param {String} description - the description of the item
 * @param {String} quantity - the quantity available
 * @param {String} location - the GPS location of the item
 * @param {String} contact - the contact info
 * @param {String} userID - the ID of the user
 * @param {String} logo - base64-encoded image
 * @param {String} units - either feet ('ft') or meters ('m')
 * @param {String} monitors - a userID of someone who monitors this item
 * @param {String} logosize - dimensions of the logo in form widthxheight
 * @param {String} features - shorthand for enabled features
 * @param {String} custom - JSON document with customizations
 * @param {String} mirrors - contact for mirror manager
 *
 * This also adds a 'surl" field to the database record, which is
 * a short unique number expected to be used as a shortened URL
 *
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function create(type, name, description, quantity, location, contact, userID, state, logo, units, monitors, logosize, features, custom, mirrors) {

    // console.log('Create: ' + state + ': ' + type + ' ' + description + ' ' + userID + " UNITS:" + units + " MONITORS: " + monitors);

    return new Promise((resolve, reject) => {
        let itemId = uuidv4();
        let whenCreated = Date.now();

        // No longer - use an MD5 hash of the name (so a deleted queue recreated with the same name has the same shortened url)
        // Given names are globally unique (they are enforced as such by the app), the hash will also be unique
        //let surl = Math.random().toString(36).substr(2, 5);  // 5 digit random number
        let surl = md5(name).substring(0,5);  // five digits only
        console.log("Creating queue: " + name + " with MD5 SURL: " + surl)

        let item = {
            _id: itemId,
            id: itemId,
            type: type,
            name: name,
            description: description,
            quantity: quantity,
            location: location,
            contact: contact,
            userID: userID,
            state: state,
            logo: logo,
            logosize: logosize,
            units: units,
            features:features,
            custom:custom,
            monitors: monitors,
            mirrors: mirrors,
            whenCreated: whenCreated,
            surl: surl
        };
        db.insert(item, (err, result) => {
            if (err) {
                console.log('Error occurred: ' + err.message, 'create()');
                reject(err);
            } else {
                resolve({ data: { createdId: result.id, createdRevId: result.rev }, statusCode: 201 });
            }
        });
    });
}

/**
 * Update a resource with the requested new attribute values
 *
 * @param {String} id - the ID of the item (required)
 *
 * The following parameters can be null
 *
 * @param {String} type - the type of the item
 * @param {String} name - the name of the item
 * @param {String} description - the description of the item
 * @param {String} quantity - the quantity available
 * @param {String} location - the GPS location of the item
 * @param {String} contact - the contact info
 * @param {String} userID - the ID of the user
 * @param {String} state - the state of the store/user
 * @param {String} units - either feet ('ft') or meters ('m')
 * @param {String} features - shorthand for enabled features
 * @param {String} custom - json representation of custom fields for a queue
 * @param {String} mirrors - array of contacts (userID/apnsToken)
 * @param {String} surl - shortened URL for this queue

 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function update(id, type, name, description, quantity, location, 
        contact, userID, state, whenCreated, logo, whenNotified, units, monitors, logosize, features, custom, mirrors, surl) {

    // console.log('Update: ' + type + ' ' + contact + ' ' + userID + " MONITORS: " + monitors);

    return new Promise((resolve, reject) => {
        db.get(id, (err, document) => {
            if (err) {
                resolve({statusCode: err.statusCode});
            } else {
                let item = {
                    _id: document._id,
                     id: document._id,
                    _rev: document._rev,  // Specifiying the _rev turns this into an update
                }
                if (type) {item["type"] = type} else {item["type"] = document.type};
                if (name) {item["name"] = name} else {item["name"] = document.name};
                if (description) {item["description"] = description} else {item["description"] = document.description};
                if (quantity) {item["quantity"] = quantity} else {item["quantity"] = document.quantity};
                if (location) {item["location"] = location} else {item["location"] = document.location};
                if (contact) {item["contact"] = contact} else {item["contact"] = document.contact};
                if (userID) {item["userID"] = userID} else {item["userID"] = document.userID};
                if (state) {item["state"] = state} else {item["state"] = document.state};
                if (whenCreated) {item["whenCreated"] = whenCreated} else {item["whenCreated"] = document.whenCreated};
                if (logo) {item["logo"] = logo} else {item["logo"] = document.logo};
                if (monitors) {item["monitors"] = monitors} else {item["monitors"] = document.monitors};
                if (logosize) {item["logosize"] = logosize} else {item["logosize"] = document.logosize};
                if (whenNotified) {item["whenNotified"] = whenNotified} else {item["whenNotified"] = document.whenNotified};
                if (units) {item["units"] = units} else {item["units"] = document.units};
                if (features) {item["features"] = features} else {item["features"] = document.features};
                if (custom) {item["custom"] = custom} else {item["custom"] = document.custom};
                if (mirrors) {item["mirrors"] = mirrors} else {item["mirrors"] = document.mirrors};
                if (surl) {item["surl"] = surl} else {item["surl"] = document.surl};

                //console.log('updating state to ' + item["state"]);

                db.insert(item, (err, result) => {
                    if (err) {
                        console.log('Error occurred: ' + err.message, 'create()');
                        reject(err);
                    } else {
                        resolve({ data: { updatedRevId: result.rev }, statusCode: 200 });
                    }
                });
            }
        })
    });
}

module.exports = {
    deleteById: deleteById,
    create: create,
    update: update,
    find: find
  };
