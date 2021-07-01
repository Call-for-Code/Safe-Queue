import React, { Component } from 'react';

import Customer from './screens/Customer';
import Manager  from './screens/Manager';
import MetaManager from './screens/MetaManager';

import { searchResilient } from './lib/utils'
import Spinner from 'react-spinkit';


import { getData, storeData, getQueryVariable } from './lib/utils'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import * as Ons from 'react-onsenui'; // Import everything and use it as 'Ons.Page', 'Ons.Button'

import logo_safequeue from './images/safequeue_splash.png';
import logo_safequeue_es from './images/safequeue_splash_es.png';

import logo_ibmcloud from './images/Built_on_IBM_Cloud_Stacked_Badge_Pos_RGB.svg';

import icon_about from './images/abouticon.png';


import {
    isChrome,
    isAndroid,
    isIOS
} from "react-device-detect";


function CustomerIcon(props) {
  const height = props.height || 28;
  const width = props.width || 24;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <SvgIcon height={height} width={width} viewBox="0 0 16 16" {...props}>
      <path d="M12 9H4a4 4 0 00-4 4v3h16v-3a4 4 0 00-4-4z" />
      <path d="M12 5V4a4 4 0 00-8 0v1a4 4 0 008 0z" />
    </SvgIcon>
  );
}


/*
 * Get the back-end server environment
 */
global.daveDomain = process.env.REACT_APP_SERVERDOMAIN;
if(process.env.REACT_APP_SERVERSECURE === '1') {
    global.daveUrl    = "https://" + global.daveDomain;
    global.wsurl      = "wss://"   + global.daveDomain;
}
else {
    global.daveUrl    = "http://" + global.daveDomain;
    global.wsurl      = "ws://"   + global.daveDomain;
}

global.wsState = '!!!';  // not connected


// Notification Type
global.notificationYouAreNext = "youarnext";  
global.notificationMoveUp     = "moveup";
global.notificationScanned    = "scanned";
global.notificationRemoved    = "removed";
global.notificationNewJoin    = "newjoin";  // sent to store when someone joins the line
global.notificationNewLeave   = "newleave"; // sent to store when someone leaves the line (e.g. by driving away)
global.notificationSync       = "sync";     // sent betwee mirror managers
global.notificationPing       = "ping";     // sent by manager to a customer to check connection
global.notificationPing       = "pong";     // sent by custoemr to manager to verify connection
global.notificationSMSOnly    = "sms";      // sent when a queue is created with the information

global.notificationUnknown    = "unknown";  // we got this when the app started, but can't tell what it is

// make it simpler for debugging in http: environment. Browsers only allow GPS for https: generally
global.fakeGPSLocation = process.env.REACT_APP_FAKEGPSLOCATION;
global.bAllowFakeGPSLocation = (global.fakeGPSLocation === undefined) ? false : true;
if(global.bAllowFakeGPSLocation)
    console.log("FAKE GPS IN USE:" + global.fakeGPSLocation);

// disable text messasging
global.bAllowSMSNotifications = (process.env.REACT_APP_ENABLE_SMS === '1') ? true : false;

// legacy, for AWS production
global.isAWS = false;

// safe queue URL, the URL to be used in generated QR Codes
global.safeQueueURL = process.env.REACT_APP_SAFEQUEUE_URL;

// for future skinning
global.themeMainColor = '#7030a0';  // default to purple


// Indicates Spanish should be used
global.bSpanish = false;

// support for standees
global.bAllowStandees = true;

// support for pick up
global.bAllowPickup = true;  

// support for self-management
global.bAllowSelfManaged = true; 

// inter-component communication
global.itemQueueManagement = null;  // tells QueuemManagement.js what store to manage
global.itemQueueManagementChanged = false;  // tells Manager.js that the queue was edited

// allow HERE maps to be seen
global.bAllowMaps = false;
global.itemMap = null;
global.itemMapUserLocation = undefined;

global.userID = null;

global.standeeCount = 1;


// API for going directly to a store
let startDestination = undefined;
global.targetBusinessName = '';
global.targetBusinessEnter = '0';
global.targetBusinessWildcard = '0';
global.targetPickupID = '';

// Keep Alive 
global.timerKeepAliveInterval = 60000;  // 60 seconds



let columns = 1;  // default for meta manager

let GetIDResult = undefined; 
let bGetID = false;

/*
 * Simple translation to spanish
 */
var BTN_CUSTOMER; 
var BTN_MANAGER;

const setLanguage = (lang) => {

    var bSpanish = (lang === 'es') ? true : false;

    BTN_CUSTOMER = !bSpanish ? "CUSTOMER" : "CLIENTE";
    BTN_MANAGER  = !bSpanish ? "MANAGER" : "RESPONSABLE";
}


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {  
          bShowSplash: '1',
          bShowCustomer: '0',
          bShowManager: '0',
          bShowMetaManager: '0',
          bLoadingShortenedURL: false
      };

      // ons.page callback
      document.addEventListener('show', function(event) {

      });

     
      /*
       * if this is a getid URL, then we're just putting up an iframe to postMessage the id
       */
      //console.log("hostname: " + window.location.hostname)
      var pathname = window.location.pathname;
      if(pathname.length > 1)  {
          var path = pathname.substring(1)
          if(path === 'getid') {
              bGetID = true;
              return;  // nothing else to do
          }
      }

      /* THIS IS NOW ASYNCHONOUS - USER IS COMES FROM LEGACY mybluemix.net domain storage
      // get userid, unless we're in the iframe which should just report 
      getData("@SafeQueueUserID")
        .then((retdata) => {
            if(retdata == null) {
                // Create a new user id and save it
                var userid = 'web_' + Math.random().toString(36).substr(2, 9);
                //console.log("Creating new userID " + userid);
                storeData("@SafeQueueUserID", userid); 
                global.userID = userid; 
                this.setState({userID: userid});
            }
            else {
                //console.log("Using existing userID: " + retdata);
                global.userID = retdata;
                this.setState({userID: retdata});
            }  
        })
        .catch(err => {
            alert("Sorry, Safe Queue can't start because a random ID couldn't be created because of this error:\n\n" + err);
        });
      */

      // get last language used
      // must be synchronous so we set the splash screen and language switch correctly
      var foundLanguage = 'en';  // default is English
      var retdata = window.localStorage.getItem('@SafeQueueLanguage');
      if(retdata === null) {
          // Never set, but this is optional, so go with the default already set
          console.log("No previous language found.");
      }
      else {
          console.log("Using previous language choice: " + retdata);
          foundLanguage = retdata;
      }  

      // get standee count
      getData("@SafeQueueStandeeCount")
        .then((retdata) => {
            if(retdata == null) {
                // Start the count at 1
                //console.log("Setting Standee Count to 1");
                storeData("@SafeQueueStandeeCount", '1'); 
                global.standeeCount = 1; 
            }
            else {
                //console.log("Using existing standeeCount: " + retdata);
                global.standeeCount = retdata;
                this.setState({bShowSplash:'1', bShowCustomer:'0', bShowManager:'0',bShowMetaManager:'0'});
            }  
        })
        .catch(err => {
            alert("Internal Error: can't find the standee running count:\n\n" + err);
        });


      // Look for shortened-url
      // This will be of the form  https://hostname:port/surl   where surl is what we are looking for
      var pathname = window.location.pathname;
      if(pathname.length > 1)  {
          // More than a / so we'll assume this is a shortened url
          // This is always a customer going to a particular Safe Queue
          var full_surl = pathname.substring(1)

          // KLUGE
          if(full_surl === 'getid') {
              bGetID = true;
              /*
              var userid = window.localStorage.getItem('@AsyncStorage:@SafeQueueUserID');
              alert("Found userid: " + userid);
              GetIDResult = userid;
              */
              return;
          }

          // look for enter options
          // Customer.js uses full name values, so we'll have to expand here
          var arr = full_surl.split('-')
          var surl = arr[0];
          var enter = arr[1];

          if(enter === undefined)
              global.targetBusinessEnter = '0';
          else if(enter === '1')
              global.targetBusinessEnter = '1';
          else if(enter === 'a')
              global.targetBusinessEnter = 'auto'
          else if(enter === 'c')
              global.targetBusinessEnter = 'checkin'

          // find the name of the business
          this.state.bLoadingShortenedURL = true;

          const payload = {
              surl: surl
          };

          searchResilient(payload, payload,  (results, payload) => {
              if(results != null) {
                  if(results.length > 0) {
                      startDestination = 'customer';
                      console.log("surl lookup of " + surl + " got " + results[0].name)
                      global.targetBusinessName = results[0].name;   // should have exactly 1 result
                      this.setState({bShowCustomer:'1', bLoadingShortenedURL:false});
                  }
                  else {
                      // this is a bogus shortened URL, so just ignore it
                      this.setState({bLoadingShortenedURL:false});
                  }
              }
              else {
                  // some kind of error, just ignore shortened URL
                  this.setState({bLoadingShortenedURL:false});
              }
          });
      }
      else {
          // Not a shortened URL, so parse it all
          startDestination = getQueryVariable('dest');

          if(startDestination === 'customer') {
              var store = getQueryVariable('bus');
              if(store === undefined)
                  global.targetBusinessName = '';
              else {
                  global.targetBusinessName = store;

                  // this may be a pickup entered
                  var pickup = getQueryVariable('pickup');
                  if(pickup === undefined) {
                      global.targetPickupID = '';

                      // look for enter and wildcard parameters
                      var wildcard = getQueryVariable('wildcard');
                      if(wildcard !== undefined) {
                          // multiple buinesses are allowed, so can't enter
                          global.targetBusinessEnter = '0';
                          global.targetBusinessWildcard = '1';
                      }
                      else {
                          // single business only, so we can have enter parma
                          var enter = getQueryVariable('enter');
                          if(enter === undefined)
                              global.targetBusinessEnter = '0';
                          else 
                              global.targetBusinessEnter = enter;
                      }
                  }
                  else {
                      // We have to prevent a browser refersh from joining the pickup list again
                      var scannedID = window.localStorage.getItem('@SafeQueuePickupComplete');
                      if(scannedID === pickup) {
                          console.log("Attempt to join a pickup order that was completed. Ignoring.")
                          global.targetBusinessName = '';
                          global.targetPickupID = '';
                      }
                      else {
                          global.targetPickupID = pickup;  // base64 encoded
                          global.targetBusinessEnter = 'auto';  // always join
                      }
                  }
              }
          }
      }

      // EXPERIMENTAL FEATURES
      if(startDestination === 'meta') {
          columns = getQueryVariable('columns');
      }

      var pu = getQueryVariable('pu');
      if((pu !== undefined) && (pu === '1'))
          global.bAllowPickup = true;

      var sm = getQueryVariable('sm');
      if((sm !== undefined) && (sm === '1'))
          global.bAllowSelfManaged = true;

      // This will override all other selections on language made
      var lang = getQueryVariable('lang');
      global.bSpanish = false;
      if((lang !== undefined) && (lang === 'es'))
          global.bSpanish = true;
      else if(foundLanguage === 'es')  // previous selection of language
          global.bSpanish = true;
      setLanguage(global.bSpanish ? 'es' : 'en');

      // We'll now default to maps on, so you can only turn it off
      global.bAllowMaps = true;
      var map = getQueryVariable('map');
      if((map !== undefined) && (map === '0')) 
          global.bAllowMaps = false;

      console.log("S:" + startDestination + 
                  " B:" + global.targetBusinessName + 
                  " W:" + global.targetBusinessWildcard +
                  " E:" + global.targetBusinessEnter +
                  " PU:" + global.targetPickupID +
                  " SM:" + global.bAllowSelfManaged +
                  " Maps:" + global.bAllowMaps,
                  " lang:" + global.bSpanish);
      if(startDestination === 'meta')
          console.log("META: " + columns);
  }


  drawAbout = () => {
      var abouturl = process.env.REACT_APP_ABOUTURL;
      if(abouturl === undefined)
          return;

      return (
          <Button 
              style={{position:'absolute', right:'1%', top:'1%'}}  
              onClick={() => {
                  window.open(abouturl, "_blank");
              }}>
            <img src={icon_about} style={{width:36, height:36}}/>
          </Button>
      );
  }

  drawIBMCloudLogo = () => {
     return (
          <div style={{position:'absolute', width:'25%', left:0, top:0}}>
            <img src={logo_ibmcloud} />
          </div>
      );
  }


  // dont draw the switch if the URL has lang=
  drawSpanishSwitch = () => {
    var lang = getQueryVariable('lang');
    if(lang !== undefined)
        return;

      var language = global.bSpanish ? "English" : "Español";

      return (
          <Button 
              style={{position:'absolute', right:'1%', top:'15%'}}  
              onClick={() => {
                  global.bSpanish = global.bSpanish ? false : true;
                  setLanguage(global.bSpanish ? 'es' : 'en');
                  // remember the choice synchronously
                  window.localStorage.setItem('@SafeQueueLanguage', global.bSpanish ? 'es' : 'en');
                  this.setState({bShowSplash:'1', bShowCustomer:'0', bShowManager:'0',bShowMetaManager:'0'});
              }}>
              <div style={{color:'#FFFFFF',textTransform:'none'}}>{language}</div>
          </Button>
      );
  }


  /*
   * Okay - we're migrating from https://safe-queue-web.mybluemix.net to www.safequeueweb.com
   *
   * Great, but this will lose all existing userIDs because browser storage is by domain.
   *
   * So, we will put an iframe into the page, where the iframe comes from mybluemix.net.
   *     The iframe is at https://safe-queue-web.mybluemix.net/getid  the getid part tells the 
   *     app to simply read its userid from localStorage and postMessage the userid to the parent frame. 
   *
   *     The parent frame came from www.safequeueweb.com, which then sets its localStorage  userid to
   *     the value it got from the iframe.
   *  
   * This makes it possible for users to migrate to www.safequeueweb.com without losing the userid
   * that was created from mybluemix.net.
   *
   * We'll eventually retire mybluemix.net
   */

  // This is only called in the iframe !!!
  drawUserIDandPostIt = () => {
      var userid = window.localStorage.getItem('@AsyncStorage:@SafeQueueUserID');
      if(userid === null)
          userid = 'none';

      //console.log("postMessage: USERID: " + userid)

      // for testing, delay this
      setTimeout(() => { 
          window.parent.postMessage({message: 'USERID:' + userid}, '*');
      }, 0);
    
      return (<div><div>mybluemix.net USERID: { userid } </div></div>);   // in case we ever show this
  }

  // this is added to the page of the parent frame, so gets values from the iframe
  drawUserIDiframe = () => {
      // no need if we already have an id
      if(global.userID !== null) {
          //console.log('already have a global user id')
          return;
      }

      var newuserid = window.localStorage.getItem('@AsyncStorage:@SafeQueueUserID');
      if(newuserid === null) {
          newuserid = 'web_' + Math.random().toString(36).substr(2, 9);
          console.log("Creating new userID " + newuserid);
          window.localStorage.setItem('@AsyncStorage:@SafeQueueUserID', newuserid);
      }
      else
          console.log("Keeping existing userID " + newuserid);

      global.userID = newuserid; 
      this.setState({userID: newuserid});

      /* HMMMM... this is from the original Safe Queue, but doesn't seem to be useful, so we'll leave it out

      // no need to do anything if this is mybluemix.net. Just use the existing userid
      if((window.location.hostname === 'safe-queue-web.mybluemix.net') || 
         (window.location.hostname === '192.168.1.4')) {
          console.log("No need for legacy user id check: " + window.location.hostname)
          global.userID = window.localStorage.getItem('@AsyncStorage:@SafeQueueUserID');
          if(global.userID === null) {
              // create a new user i
              var newuserid = 'web_' + Math.random().toString(36).substr(2, 9);
              console.log("Creating new userID " + newuserid);
              window.localStorage.setItem('@AsyncStorage:@SafeQueueUserID', newuserid);
              global.userID = newuserid; 
              this.setState({userID: newuserid});
          }
          //else
          //    console.log("Using existing ID: " + global.userID)
          return;
      }

      // This recieves a message from an ifraem that checks for an old userid in mybluemix.net
      window.onmessage = (event) => {
          var message = event.data.message;
          if(message !== undefined) {
              var m = message.split(':');
              if(m[0] === 'USERID') {
                  var bluemixid = m[1];

                  var currentid = window.localStorage.getItem('@AsyncStorage:@SafeQueueUserID');
                  //console.log("GOT USERID: " + bluemixid + " from " + event.origin + " [" + currentid + "]");

                  if((event.origin === "https://safe-queue-web.mybluemix.net") ||  // IBM production
                     (event.origin === "https://safe-queue-test.mybluemix.net") || // IBM Test
                     (event.origin === "https://aws.safequeueweb.com") ||          // AWS testing
                     (event.origin === "http://192.168.1.4:3000")) {               // localhost testing
                      // cases:
                      // 1. currentid is  null, bluemixid not 'none'   THIS IS FIRST TIME MIGRATION FROM bluemix.net (use bluemixid)
                      // 2. currentid not null, bluemixid not 'none'   THIS IS ODD, but will be treated the same as 1 
                      // 3. currentid is  null, bluemixid is  'none'   THIS IS FIRST TIME use of www.safequeueweb.com (create new id, save as currentid)
                      // 4. currentid not null, bluemixid is  'none'   THIS IS SUBSEQUENT use of www.safequeueweb.com (keep currentid)

                      if(((currentid === null) && (bluemixid !== 'none')) ||  // case 1
                         ((currentid !== null) && (bluemixid !== 'none'))) {  // case 2
                          // this user was a bluemix.net user, so keep using that id in www.safequeueweb.com
                          if(currentid !== bluemixid) {
                              console.log("MIGRATION from mybluemix.net: new " + bluemixid + " old " + currentid );
                              window.localStorage.setItem('@AsyncStorage:@SafeQueueUserID', bluemixid);
                          }
                          //else
                          //    console.log("USER ID unchanged from bluemixid: " + bluemixid)
                          global.userID = bluemixid; 
                          this.setState({userID: bluemixid});
                      }
                      else if((currentid === null) && (bluemixid === 'none')) { //case 3
                          // Create a new user id and save it
                          // first time use ever (no bluemix.net and no safequeueweb.com)
                          var newuserid = 'web_' + Math.random().toString(36).substr(2, 9);
                          console.log("Creating new userID " + newuserid);
                          window.localStorage.setItem('@AsyncStorage:@SafeQueueUserID', newuserid);
                          global.userID = newuserid; 
                          this.setState({userID: newuserid});
                      }
                      else {  // must be case 4
                          // keep using the currentid (which may have previouly come from mybluemix.net)
                          //console.log("Using existing userID: " + currentid);
                          global.userID = currentid;
                          this.setState({userID: currentid});
                      }
                  }
              }
          }
      }

      // draw the iframe that will get the userid and postMessage it to us above
      // this preserves the UID across various environments (development, production, etc.)
      global.daveUIDUrl = "https://safe-queue-web.mybluemix.net/getid";
      console.log("Checking for UID migration from: " + global.daveUIDUrl);
      return (
          <iframe id="userid" src={global.daveUIDUrl} style={{display:"none"}} frameborder="none"></iframe>
      )
      */
  }


  /*
   * Show the main screen
   */
  render() {
    var pageStyle = {padding: 0, maxWidth:414, display: 'block', marginLeft:'auto', marginRight:'auto'};
    if(startDestination === 'meta')
        pageStyle = {padding: 0, display: 'block', marginLeft:'auto', marginRight:'auto'};

    var splash = logo_safequeue;
    if(global.bSpanish)
        splash = logo_safequeue_es;

    // if this is the getid path in the URL, don't draw anything. This can only happen in an iframe
    if(bGetID) {
        return (this.drawUserIDandPostIt());  // this will do a postMessage to the parent frame with the userid
    }

    return (
        <Ons.Page contentStyle={pageStyle}>
            <div>  

            { this.drawUserIDiframe() }

            { this.state.bShowSplash === '1' && startDestination === undefined &&
                <div>
                    <img src={splash} style={{width:"100%", height:"100%",position:'absolute'}}/>

                    { this.state.bLoadingShortenedURL && 
                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            <Spinner style={{marginTop:'50%'}} name="circle" color="white" />
                        </div>
                    }

                    { !this.state.bLoadingShortenedURL && 
                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                          <Button variant="outlined" 
                              style={{width:120, padding:10,marginRight:20,position:'absolute',left:'15%', bottom:'5%'}} 
                              onClick={() => {
                                  this.setState({bShowSplash:'0', bShowCustomer:'1', bShowManager:'0',bShowMetaManager:'0'});
                              }}>
                            {BTN_CUSTOMER}
                          </Button>
                          <Button variant="outlined" 
                              style={{width:120,padding:10,marginLeft:20,position:'absolute', right:'15%', bottom:'5%'}}  
                              onClick={() => {
                                  this.setState({bShowSplash:'0', bShowCustomer:'0', bShowManager:'1',bShowMetaManager:'0'});
                              }}>
                            {BTN_MANAGER}
                          </Button>
                          { false && 
                              <Button variant="outlined" 
                                style={{width:120,padding:10,position:'absolute',  bottom:'5%'}}  
                                onClick={() => {
                                    this.setState({bShowSplash:'0', bShowCustomer:'0', bShowManager:'0',bShowMetaManager:'1'});
                                }}>
                              META-MANAGER
                              </Button>
                          }
                      </div>
                  }
                </div>
            }

            { this.drawAbout() }
            { !this.state.bLoadingShortenedURL && this.drawSpanishSwitch() }
            { this.drawIBMCloudLogo() }

            { ((this.state.bShowCustomer === '1') || (startDestination === 'customer')) && 
                <Customer />
            }
            { ((this.state.bShowManager === '1') || (startDestination === 'manager')) && 
                <Manager />
            }
            { ((this.state.bShowMetaManager === '1') || (startDestination === 'meta')) && 
                <MetaManager columns={columns}/>
            }
           </div>
      </Ons.Page>
    );
  }
}
 
export default App;