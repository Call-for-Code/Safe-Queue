import { Alert } from 'react';


import { AsyncStorage } from 'AsyncStorage';
import { Buffer } from 'buffer';


/*
export const appVersionInfo = () => {
    const version =  DeviceInfo.getVersion();
    const buildnumber = DeviceInfo.getBuildNumber();
    return version + "." + buildnumber;
}
*/


/* 
 * USERID for this device
 */
export const storeData = async (key, value) => {
  //console.log("Setting: " + key + " with " + value);
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
     // saving error
     console.log("setData error for " + key + "\n\n" + e);
  }
}

export const getData = async (key) => {
  //console.log("Getting data for " + key);
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
        //Alert.alert("getData got " + value);
        return value;
    }
    else
        return null;
  } catch(e) {
      // error reading value
      console.log("getData error:" + e);
      return null;
  }
}

// for debug
export const clearStorage = async () => {
  try {
      await AsyncStorage.clear()
      //alert('Storage successfully cleared!')
  } catch (e) {
      //alert('Failed to clear the async storage.')
  }
}


/*
 * THe contact is of this form:
 * uniqueID][APNtoken
 */
export const getUserIDFromContact = (contact) => {
   var arr = contact.split('][');
   return arr[0];
}
export const getAPNTokenFromContact = (contact) => {
   var arr = contact.split('][');
   return arr[1];
}
export const createContact = (userid, token) => {
   return userid + "][" + token;
}

/*
 * The state for a customer is
 * state:value
 */
export const getStateFromState = (state) => {
    if(state == null)
        return null;
    var arr = state.split(':');
    return arr[0];
}

export const getValueFromState = (state) => {
    if(state == null)
        return null;
    var arr = state.split(':');
    return arr[1];
}

export const setValueForState = (state, value) => {
    return state + ':' + value;
}


export const getQueryVariable = (variable) => {
    if(window.location.search === undefined)
        return undefined;  // no search terms

    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] === variable) {
            try { 
                var decoded = decodeURIComponent(pair[1]);  // url decode
                return decoded;
            } catch (e) {
                return undefined;  // bogus URL
            }
        }
    }
    return undefined;
}

export const returnToManager = () => {
    var domain;
    if(window.location.search === undefined)
        domain = window.location;
     else 
        domain = window.location.href.split('?')[0]
    const destUrl = new URL(domain);
    destUrl.searchParams.append("dest", "manager");
    if(global.bSpanish)
        destUrl.searchParams.append("lang", "es");
    window.location.assign(destUrl);
}

export const returnToCustomer = () => {
    var domain;
    if(window.location.search === undefined)
        domain = window.location;
     else 
        domain = window.location.href.split('?')[0]
    const destUrl = new URL(domain);
    destUrl.searchParams.append("dest", "customer");
    if(global.bSpanish)
        destUrl.searchParams.append("lang", "es");
    window.location.assign(destUrl);
}


export const secondsToReadableString = (count) => {
  var min = Math.floor(count / 60);
  var sec = count % 60;
  var smin = min.toFixed(0).toString();
  var ssec = sec.toFixed(0).toString();
  if(sec < 10) ssec = '0' + ssec;
  return smin + ":" + ssec;
}

let bSpeechFetchInProgress = false;

export const playSpeechFromText = async (text, callback, bFileOnly) => {

    if(bSpeechFetchInProgress) {
        console.log("playSpeechFromText re-entrant block")
        return;
    }
    bSpeechFetchInProgress = true;

    if(bFileOnly === undefined)
        bFileOnly = false;

    var voice;
    if(global.bSpanish) {
        voice = "es-LA_SofiaVoice";
    }
    else {
        voice = "en-US_OliviaV3Voice";  // nice voice, but very slow paced
        voice = "en-US_EmilyV3Voice";  // sounds very workplace
        voice = "en-US_LisaVoice";     // NO TOO SERIOUS medium
        voice = "en-GB_KateVoice";   // fast, like a news anchor would talk

        // BEST GB
        //voice = "en-GB_CharlotteV3Voice";  // okay

        // BEST US
        voice = "en-US_AllisonVoice";  // a little informal, but slow paced

        //voice = "en-US_KevinV3Voice";  MALE
    }

    // if we have Watson Text-to-Speech, use it
    var url    = process.env.REACT_APP_WATSONTTS_URL;
    var apikey = process.env.REACT_APP_WATSONTTS_APIKEY;
    if((url === undefined) || (apikey === undefined))
        return;

    url += "?voice=" + voice;
    url += "&text=" +  encodeURI(text);

    var apikey64 = Buffer.from(apikey, 'binary').toString('base64');
    var auth = 'Basic ' + apikey64;

    console.log("getting speech data from Watson...")
    const response = await fetch(url, {
          method: 'GET',
          cache: 'no-cache',
          withCredentials: true,
          headers: {
            'Accept': 'audio/mp3',
            'Authorization': auth,
          }   
    }).catch(err => {
          console.log("Fetch Error: " + err);
          if(callback !== undefined) callback('networkerror')
    });;

    if(response === undefined) {
        bSpeechFetchInProgress = false;
        return;
    }

    if(!response.ok) {
        console.log("ERROR in fetching speech:")
        console.log("status: " + response.status +  " statusText: " + response.statusText);
        console.log("messsage: " + response.message);
        if(callback !== undefined) callback('networkerror');
        bSpeechFetchInProgress = false;
    }
    else {
        var content = await response.blob();
        console.log("playing speech data from Watson " + content.type + " (" + content.size + ").")
        var blobURL = window.URL.createObjectURL(content);
        if(bFileOnly) {
            if(callback !== undefined) callback('audiofile', blobURL);
            bSpeechFetchInProgress = false;
            return;
        }
        else 
            if(callback !== undefined) callback('finishgen');
        
        var audio0 = new Audio(blobURL);
        audio0.onended = function() { if(callback !== undefined) callback('audioend'); }
        var audioPromise = audio0.play();
        audioPromise.then(function() {
            // success
            bSpeechFetchInProgress = false;
        }).catch(function (err) {
            // failed
            //console.log("catch:" + JSON.stringify(err))
            //console.log("catch message:" + err.message)
            if(callback !== undefined) callback('audioerror', err.message);
            bSpeechFetchInProgress = false;
        });
    }
}


export const playSpeechFromTextEXPERIMENTAL = async (text, callback, bFileOnly) => {

    if(bSpeechFetchInProgress) {
        console.log("playSpeechFromText re-entrant block")
        return;
    }
    bSpeechFetchInProgress = true;

    if(bFileOnly === undefined)
        bFileOnly = false;

    var voice;
    if(global.bSpanish) {
        voice = "es-LA_SofiaVoice";
    }
    else {
        voice = "en-US_OliviaV3Voice";  // nice voice, but very slow paced
        voice = "en-US_EmilyV3Voice";  // sounds very workplace
        voice = "en-US_LisaVoice";     // NO TOO SERIOUS medium
        voice = "en-GB_KateVoice";   // fast, like a news anchor would talk

        // BEST GB
        //voice = "en-GB_CharlotteV3Voice";  // okay

        // BEST US
        voice = "en-US_AllisonVoice";  // a little informal, but slow paced

        //voice = "en-US_KevinV3Voice";  MALE
    }
    
    var url    = process.env.REACT_APP_WATSONTTS_URL;
    var apikey = process.env.REACT_APP_WATSONTTS_APIKEY;
    if((url === undefined) || (apikey === undefined))
        return;

    url += "?voice=" + voice;
    url += "&text=" +  encodeURI(text);

    var apikey64 = Buffer.from(apikey, 'binary').toString('base64');
    var auth = 'Basic ' + apikey64;

    console.log("getting speech data from Watson...")
    const response = await fetch(url, {
          method: 'GET',
          cache: 'no-cache',
          withCredentials: true,
          headers: {
            'Accept': 'audio/mp3',
            'Authorization': auth,
          }   
    }).catch(err => {
          console.log("Fetch Error: " + err);
          if(callback !== undefined) callback('networkerror')
    });;

    if(response === undefined) {
        bSpeechFetchInProgress = false;
        return;
    }

    if(!response.ok) {
        console.log("ERROR in fetching speech:")
        console.log("status: " + response.status +  " statusText: " + response.statusText);
        console.log("messsage: " + response.message);
        if(callback !== undefined) callback('networkerror');
        bSpeechFetchInProgress = false;
    }
    else {
        var content = await response.blob();
        console.log("playing speech data from Watson " + content.type + " (" + content.size + ").")
        var blobURL = window.URL.createObjectURL(content);
        if(bFileOnly) {
            if(callback !== undefined) callback('audiofile', blobURL);
            bSpeechFetchInProgress = false;
            return;
        }
        else 
            if(callback !== undefined) callback('finishgen');
        
        var audio0 = new Audio(blobURL);
        audio0.onended = function() { if(callback !== undefined) callback('audioend'); }
        var audioPromise = audio0.play();
        audioPromise.then(function() {
            // success
            bSpeechFetchInProgress = false;
        }).catch(function (err) {
            // failed
            //console.log("catch:" + JSON.stringify(err))
            //console.log("catch message:" + err.message)
            if(callback !== undefined) callback('audioerror', err.message);
            bSpeechFetchInProgress = false;
        });
    }
}


// Requests Push Notification
export const push = (token, payload, sound) => {
    return fetch(`${global.daveUrl}/api/push/${token}/${sound}/${payload}`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText || response.message || response.status);
        } else {
            return response.json();
        }
    })
      .catch(err => {
          console.log("push Error: " + err);
          console.log("push Error Token: " + token);
          var spayload = Buffer.from(payload, 'base64').toString('binary');
          console.log("push Error payload: " + spayload);

      });
};

// Same as push above, but does one retry and has a callback
// returns null in the callback if all attempts fail
// TODO: could make this tail-recurse and have unlimited retries but don't know how javascript deals with this
export const pushResilient = (token, payload, sound, callback) => {

    if(token === undefined) {
        console.log("pushResilient got undefined token!!   Ignoring it.");

        callback(null);
        return;
    }

    push(token, payload, sound)
        .then((response) => {
            // We must catch exceptions that happen in the callback,
            // or else control goes the catch statement below !!!
            // which will incorrectly re-run the successful search!!
            try {
                callback(response);  // worked first time
            } catch (e) {
                console.log("Exception in push callback after succces:" + e);
            }
        })
        .catch(err => {
             // try again - that's what makes this resilient
             console.log("Push had error:\n" + err + "\ntrying again");
             push(token, payload, sound)
                 .then((response) => {
                      try {
                          callback(response);  // worked second time
                      } catch (e) {
                          console.log("Exception in push callback after retry succces:" + e);
                      }
                 })
                 .catch(err => {
                      // No more, just two tries
                      console.log("Push had second error:\n" + err + "\ngiving up");
                      callback(null);
                 });
        });
};

// send the push
export const sendPush = (item, type, title, body, sound, webSocket, allowSMS) => {
    var userid = getUserIDFromContact(item.contact);
    var token  = getAPNTokenFromContact(item.contact);

    // If there is no token, then this must mean the target declined to get notifications
    // Or, this could be targeting an iOS simulator, which does not support notifications
    if(token == '')
        return;

    if((token.substring(0,4) === 'sms_') && !allowSMS) {
          console.log("Suppressing SMS text, now using: " + userid)
          token = userid;   // if not SMS allowed, just use the websocket method
    }

    var payload = {title: title, body: body, payload: {"aps" : { "content-available" : 1 }, type: type, nickname: '', userid: userid}};
    var spayload = JSON.stringify(payload);
    var spayload64 = Buffer.from(spayload, 'binary').toString('base64');
    
    pushResilient(token, spayload64, sound, function (response) {
        if(response != null) {
            if(response.result === 'SUCCESS') {
                // Alert.alert("NOTIFIED!", 'Person has been notified.');
            }
            else {
                // The notification failed, but the database may still have been updated
                // Nothing the user can do here
                // Alert.alert("Notification Failed", 'Reported error:\n' + response.result);
                console.log("Notification Failed", 'Reported error:\n' + response.result);
            }
        }
        else {
            console.log('Network Error.\n\nNotification failed after two retries (' + title + ' ' + token + ')'); // Please check your network connection and try again.');
        }
    });
}


export const search = (query) => {
    const type = query.type ? `type=${query.type}` : ''
    const name = query.name ? `name=${encodeURIComponent(query.name)}` : ''
    const contact = query.contact ? `contact=${query.contact}` : ''
    const userID = query.userID ? `userID=${query.userID}` : ''
    const location = query.location ? `location=${query.location}` : global.DeviceLocation;
    const monitors = query.monitors ? `monitors=${query.monitors}` : ''
    const surl = query.surl ? `surl=${query.surl}` : ''

    return fetch(`${global.daveUrl}/api/resource?${name}&${type}&${contact}&${userID}&${location}&${monitors}&${surl}`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
    }).then((response) => {

        /* the return of json takes several seconds for some unknown reason at times
         * this is debug for this
         *
        console.log("fetch for search returned");
        var json = response.json();
        console.log("fetch for search created json: " + json.length);
        return json;
        */

        return response.json();
    });
};

// Same as search above, but does one retry and has a callback
// returns null in the callback if all attempts fail
// TODO: could make this tail-recurse and have unlimited retries but don't know how javascript deals with this
export const searchResilient = (payload, arg, callback) => {
    search(payload)
        .then((results) => {
            // We must catch exceptions that happen in the callback,
            // or else control goes the catch statement below !!!
            // which will incorrectly re-run the successful search!!
            try {
                callback(results, arg);  // worked first time
            } catch (e) {
                console.log("Exception in search callback after succces:" + e);
            }
        })
        .catch(err => {
             // try again - that's what makes this resilient
             //Alert.alert("Search had error:\n" + err + "\ntrying again");
             console.log("Search had error:\n" + err + "\ntrying again");
             search(payload)
                 .then((results) => {
                      try {
                          callback(results, arg);  // worked second time
                      } catch (e) {
                          console.log("Exception in search callback after retry succces:" + e);
                      }
                 })
                 .catch(err => {
                      // No more, just two tries
                     console.log("Search had second error:\n" + err + "\ngiving up");
                     callback(null, arg);
                 });
        });
};

export const add = (item) => {
    // Can't stringify item, since it has a reference to itself
    var tempitem = {...item};
    tempitem.theRef = undefined;

    return fetch(`${global.daveUrl}/api/resource`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(tempitem)
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText || response.message || response.status);
        } else {
            return response.json();
        }
    });
};

// Same as add above, but does one retry and has a callback
// returns null in the callback if all attempts fail
// TODO: could make this tail-recurse and have unlimited retries but don't know how javascript deals with this
export const addResilient = (payload, arg, callback) => {
    add(payload)
        .then((results) => {
              // We must catch exceptions that happen in the callback,
              // or else control goes the catch statement below !!!
              // which will incorrectly re-run the successful add!!
              try {
                  callback(results);  // worked first time
              } catch (e) {
                  console.log("Exception in add callback after succces:" + e);
              }
        })
        .catch(err => {
             // try again - that's what makes this resilient
             console.log("Add had error:\n" + err + "\ntrying again");
             add(payload)
                 .then((results) => {
                     try {
                         callback(results);  // worked second time
                     } catch (e) {
                         console.log("Exception in add callback after retry success:" + e);
                     }
                 })
                 .catch(err => {
                      // No more, just two tries
                     console.log("Add had second error:\n" + err + "\ngiving up");
                     callback(null);
                 });
        });
};

export const update = (item) => {
  // Can't stringify item, since it has a reference to itself
  var tempitem = {...item};
  tempitem.theRef = undefined;

  return fetch(`${global.daveUrl}/api/resource/${item.id}`, {
        method: 'PATCH',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(tempitem)
  }).then((response) => {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Item not found');
            } else {
                throw new Error('Please try again. If the problem persists contact an administrator.');
            }
        }
  });
};

// Same as update above, but does one retry and has a callback
// returns null in the callback if all attempts fail
// TODO: could make this tail-recurse and have unlimited retries but don't know how javascript deals with this
export const updateResilient = (payload, arg, callback) => {
    update(payload)
        .then(() => {
              // We must catch exceptions that happen in the callback,
              // or else control goes the catch statement below !!!
              // which will incorrectly re-run the successful update!!
              try {
                  callback(arg);  // worked first time
              } catch (e) {
                  console.log("Exception in update callback after succces:" + e);
              }
        })
        .catch(err => {
             // try again - that's what makes this resilient
             console.log("Update had error:\n" + err + "\ntrying again");
             update(payload)
                 .then(() => {
                     try {
                         callback(arg);  // worked second time
                     } catch (e) {
                         console.log("Exception in update callback after retry success:" + e);
                     }
                 })
                 .catch(err => {
                      // No more, just two tries
                     console.log("Update had second error:\n" + err + "\ngiving up");
                     callback(null);
                 });
        });
};

export const remove = (item) => {
    return fetch(`${global.daveUrl}/api/resource/${item.id}`, {
        method: 'DELETE',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    }).then((response) => {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Item not found');
            } else {
                throw new Error('Please try again. If the problem persists contact an administrator.');
            }
        }
    });
};

// Same as remove above, but does one retry and has a callback
// returns null in the callback if all attempts fail
// TODO: could make this tail-recurse and have unlimited retries but don't know how javascript deals with this
export const removeResilient = (payload, arg, callback) => {
    remove(payload)
        .then(() => {
              // We must catch exceptions that happen in the callback,
              // or else control goes the catch statement below !!!
              // which will incorrectly re-run the successful remove!!
              try {
                  callback(arg);  // worked first time
              } catch (e) {
                  console.log("Exception in remove callback after succces:" + e);
              }
        })
        .catch(err => {
             // try again - that's what makes this resilient
             console.log("Remove had error:\n" + err + "\ntrying again");
             remove(payload)
                 .then(() => {
                     try {
                         callback(arg);  // worked second time
                     } catch (e) {
                         console.log("Exception in remove callback after retry success:" + e);
                     }
                 })
                 .catch(err => {
                      // No more, just two tries
                     console.log("Remove had second error:\n" + err + "\ngiving up");
                     callback(null);
                 });
        });
};

export const session = () => {
  return fetch(`${global.daveUrl}/api/session`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.text();
      }
    });
};

export const message = (payload) => {
  return fetch(`${global.daveUrl}/api/message`, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};

export const addressOfLocation = (loc, callback) => {
  var url    = process.env.REACT_APP_HEREGEOCODER_URL;
  var apikey = process.env.REACT_APP_HERE_APIKEY;
  if((url === undefined) || (apikey === undefined)) {
      callback('','USA');  // no known address, but assume USA for units
      return;
  }

  var hereurl = url + "?apiKey=" + apikey + "&mode=retrieveAddresses&prox=";
  var finalurl = `${hereurl}${loc}`;

  //console.log("HERE REVERSE GEOCODER URL: " + finalurl);

  fetch(finalurl)
  .then(response => response.json())
  .then((jsonData) => {
      // jsonData is parsed json object received from url
      if(jsonData === undefined) {
          callback('');
          return;
      }

      var o = jsonData.Response.View[0].Result[0].Location.Address;
      var number = (o.HouseNumber == null) ? '' : o.HouseNumber;
      var street = (o.Street      == null) ? '' : o.Street;
      var city   = (o.City        == null) ? '' : o.City;
      var state  = (o.State       == null) ? '' : o.State;
      var zip    = (o.PostalCode  == null) ? '' : o.PostalCode;
      var country = (o.Country    == null) ? 'USA' : o.Country;

      // seperate country from address so it can be optionally used
      callback(number + " " + street + "\n" + city + ", " + state + ' ' + zip, country);
  })
  .catch((error) => {
      // handle your errors here
      console.log(finalurl);
      console.error(error)
      callback('','USA');  // no known address, but assume USA for units
  })
}

