import React, { Component, StyleSheet } from 'react';
 
import '../App.css';

import {DisplayMapClass} from './HereMap';


import Manager          from '../screens/Manager';
import QueueManagement  from '../screens/QueueManagement';


import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import MuiPhoneNumber from 'material-ui-phone-number';

import {
  // isBrowser,
  // isMobile,
  //isChrome,
  isAndroid
} from "react-device-detect";


import { updateResilient, pushResilient, removeResilient, searchResilient, addResilient } from '../lib/utils'
import { getUserIDFromContact, getAPNTokenFromContact, getData, storeData } from '../lib/utils'
import { getStateFromState, getValueFromState, setValueForState, createContact } from '../lib/utils'
import { addressFromLocation, addressOfLocation, returnToManager, returnToCustomer } from '../lib/utils'

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';


import Spinner from 'react-spinkit';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import * as Ons from 'react-onsenui'; // Import everything and use it as 'Ons.Page', 'Ons.Button'


import logo_safequeue from '../images/safequeue_splash.png';
import icon_about from '../images/icon_info.png';
import icon_question from '../images/icon_info.png';

import mappin from '../images/mappin.png';

/*
 * Simple translation to spanish
 */
var MSG_WAITING_FOR_GPS_INFORMATION;
var MSG_LOADING_DATA;
var BTN_CREATE_SAFE_QUEUE
var MSG_SAFE_QUEUE_CREATED
var MSG_YOUR_QUEUE_CODE
var MSG_SAVE_THIS_CODE
var MSG_THE_CODE_IS_VISIBLE_IN_MANAGEMENT
var MSG_NOTE
var MSG_FOR_SECURITY_REASONS
var MSG_OKAY_GOT_IT
var MSG_ENTER_A_DESCRIPION
var MSG_AS_IT_WILL_BE_SEEN
var TTL_YOUR_BUSINESS_NAME
var TTL_CONTACT_INFO
var BTN_IMPORT_BUSINESS_LOGO
var MSG_YOUR_BUSINESS_LOCATION_WILL_BE
var MSG_YOU_MUST_PHYSICALLY_BE_AT
var BTN_ACCEPT
var BTN_CANCEL

var TTL_BUSINESS_ADDRESS

var MSG_SAFE_QUEUE_NEEDS_YOUR_GPS_LOCATION
var MSG_CHANGE_YOUR_BROWSER_SETTINGS
var MSG_YOUR_BROWSER_REPORTED
var MSG_ONCE_CREATED
var MSG_WE_CAN_ALSO_TEXT_YOU

var MSG_CREATING_YOUR_SAFE_QUEUE

var TTL_PHONE_NUMBER;



const setLanguage = (lang) => {

  var bSpanish = (lang === 'es') ? true : false;

  MSG_WAITING_FOR_GPS_INFORMATION = !bSpanish ? "Waiting for GPS information..." : "Esperando información de GPS ...";
  MSG_LOADING_DATA = !bSpanish ? "Loading data..." : "Cargando datos...";

  // Button title
  BTN_CREATE_SAFE_QUEUE = !bSpanish ? "CREATE SAFE QUEUE" : "Crea Cola Segura";
  MSG_SAFE_QUEUE_CREATED = !bSpanish ? "Safe Queue Created!" : "¡Cola Segura creada!";
  MSG_YOUR_QUEUE_CODE = !bSpanish ? "Your Queue Code:" : "El código de su cola:";
  MSG_SAVE_THIS_CODE = !bSpanish ? 
  "Save this code! You will need it should you change browsers or use a different device or if multiple people manage the same queue." : 
  "¡Guarde este código! Lo necesitará si cambia de navegador o usa un dispositivo diferente o si varias personas administran la misma cola."

  MSG_THE_CODE_IS_VISIBLE_IN_MANAGEMENT = !bSpanish ? 
  "The code is visible in management views." : 
  "El código es visible en las vistas de administración."

  MSG_NOTE = !bSpanish ? "NOTE:" : "NOTA:";
  MSG_FOR_SECURITY_REASONS = !bSpanish ?
  "Your Safe Queue will be created at your current GPS location." :
  "Su cola Segura se creará en su ubicación GPS actual.";

  MSG_YOU_MUST_PHYSICALLY_BE_AT = !bSpanish ?
  "If this isn't your business location, you or someone you trust must go there and update the GPS location from the Queue Management screen." :
  "Si esta no es la ubicación de su empresa, usted o alguien de su confianza debe ir allí y actualizar la ubicación del GPS desde la pantalla Gestión de Colas."; // NEEDS TRANSLATION

  MSG_OKAY_GOT_IT = !bSpanish ? "Okay, Got it!" : "¡Ok, lo tengo!";

  MSG_ENTER_A_DESCRIPION = !bSpanish ? "Enter a description of your business" : "Introduzca una descripción de su empresa"
  MSG_AS_IT_WILL_BE_SEEN = !bSpanish ? "as it will be seen by customers:" : "tal como la verán los clientes."

  TTL_YOUR_BUSINESS_NAME = !bSpanish ? "Your Business Name" : "Nombre de su empresa"
  TTL_CONTACT_INFO       = !bSpanish ? "Contact Information (optional)" : "Información de Contacto (opcional)";  // NEEDS TRANSLATION
  BTN_IMPORT_BUSINESS_LOGO = !bSpanish ? "IMPORT BUSINESS LOGO" : "IMPORTAR EL LOGO"

  MSG_YOUR_BUSINESS_LOCATION_WILL_BE = !bSpanish ? "Your business GPS location will be used as:" : "La ubicación GPS de su empresa se utilizará como:"

  BTN_ACCEPT = !bSpanish ? "Accept" : "Aceptar";
  BTN_CANCEL = !bSpanish ? "Cancel" : "Cancelar";

  TTL_BUSINESS_ADDRESS = !bSpanish ? "Business Address" : "Dirección de Empresa";

  MSG_SAFE_QUEUE_NEEDS_YOUR_GPS_LOCATION = !bSpanish ?
        "Safe Queue needs your GPS location to operate." : "Cola Segura necesita tu ubicación GPS para funcionar.";
  MSG_CHANGE_YOUR_BROWSER_SETTINGS = !bSpanish ?
        "Change your browser settings for this site to Allow or to Ask for use of your location." :
        "Cambie la configuración de su navegador para este sitio para permitir o para solicitar el uso de su ubicación.";
  MSG_YOUR_BROWSER_REPORTED = !bSpanish ?
        "Your browser reported: " : "Su navegador informó: ";

  MSG_ONCE_CREATED = !bSpanish ? "Once created, there are many other customizations possible in the Queue Management screen." :
                                 "Una vez creada, hay muchas otras personalizaciones posibles en la pantalla Gestión de Colas."

  MSG_CREATING_YOUR_SAFE_QUEUE = !bSpanish ? "Creating your Safe Queue..." : "Creando tu Cola Segura..."

  TTL_PHONE_NUMBER = !bSpanish ? "Phone Number (optional)" : "número de teléfono (opcional)";

  MSG_WE_CAN_ALSO_TEXT_YOU = !bSpanish ? "We can also text this queue information to you:" : "También podemos enviarle un mensaje de texto con esta información de la cola:";
}



let bShowDebug = false;  // for 

/* 
 * Handling of common business names is protected, so that not just anyone can create 
 *
 * We keep a list of reserved names at the database, and request that we be contacted
 * to do some validation that the person is legitimate and give them an unlock code 
 */ 
let arrReservedNames = new Array();  // list of reserved names
let arrReservedCodes = new Array();  // list of corresponding codes to unlock the name
let emailReserved = '';  // contact to request validation code

let importedImage64;
let importedImageAspectRatio;  

// our local version of the main color
let themeMainColor;

let bUserModifiedAddress = false;  // prevents the GPS from overwriting a user-entered address

let smsEntered = '';


class QueueAdd extends Component {
  	constructor(props) {
    	super(props);

      themeMainColor = global.themeMainColor;

      bUserModifiedAddress = false;

	    // get userid
	    if(global.userID == null) {
		    getData("@SafeQueueUserID")
		      .then((retdata) => {
		          if(retdata == null) {
		              // Create a new user id and save it
		              var userid = 'web_' + Math.random().toString(36).substr(2, 9);
		              console.log("creating new userid " + userid);
		              storeData("@SafeQueueUserID", userid); 
		              this.setState({userID: retdata});   
		               // debug  
		              //alert("Created a temporary ID for your session\n"+ userid); 
		              global.userID = userid; 
		          }
		          else {
		              console.log("Using existing userID: " + retdata);
		              global.userID = retdata;
		              this.setState({userID: retdata});
		          }  
		      })
		      .catch(err => {
		          alert("Error, couldn't get Unique ID: " + err);
		      })
		  }

      this.pond = React.createRef();

      setLanguage(global.bSpanish ? 'es' : 'en');

	    this.state = {  
            clearItem: { userID: global.userID, type: 'Store', name: '', description: '', location: '', contact: 'none@none.com', quantity:'1' },
            item: { userID: global.userID, type: 'Store', name: '', description: '', location: '', contact: 'none@none.com', quantity:'1' },
            position: '',
            placeHolder: 'e.g., 3458 S. Main Street\nChicago IL 60462',
            bShowLogo: '0',
            bShowReservedDialog: '0',
            bShowReservedInput: '1',
            bShowConfirmDialog: '0',
            enteredReservedCode: {value: ''},
            bShowLocationWarning: '0',

            bShowManager: '0',
            bShowQueueManagement:'0',

            bShowBtnSave: '1',  // but has further conditions for display

            estimatedAddress: '...',
            estimatedAddressLabel: TTL_BUSINESS_ADDRESS,

            bShowAddedDialog: '0',
            addedStoreCode:'',

            bShowPhotoCropper: '0',
            bShowBtnAddPhoto:'1',
            bShowBtnAcceptCrop:'0',
            logoFile:[],

            bShowBackdrop: '0',
            bShowAddress: '1',


            bShowErrorMessage:'0',
            bShowErrorMessageSubtitle:'',
            bShowErrorMessageError:'',
            bShowErrorMessageExit:false,

            src: null,
            crop: {
              unit: '%',
              width:  90,
              height: 30,
              x: 5,
              y: 30,
              //aspect: 3 / 1
            },
            croppedImageUrl:'',

            bShowMap: '0',

            units: 'ft',

            bStandeeSupport: false,
            bPickupSupport: false,
            bSelfManagedSupport: false,

            bShowHelpMessage:'0',

            chosenRadiusInFeet: 1000,  // new queues always start with 1000 feet
            bShowRadiusButtons:false
	    };
  	}

  	componentWillMount() {
  	    // Handle the Startup..
        //console.log("will mount")
  	    if ("geolocation" in navigator) {
  	        navigator.geolocation.getCurrentPosition((pos) => {
                  var loc = `${pos.coords.latitude},${pos.coords.longitude}`;
                  this.setState({position:loc});

                  addressOfLocation(loc, this.updateEstimatedAddress);
                  this.setState({item: {...this.state.item, location:loc}});
                  this.showMapAtItem(this.state.item);
            },  
  	        (error) => {
                  if(global.bAllowFakeGPSLocation) {
                      var pos = global.fakeGPSLocation;
                      this.setState({position: pos});
                                            
                      addressOfLocation(pos, this.updateEstimatedAddress);
                      this.setState({item: {...this.state.item, location:pos}});
                      this.showMapAtItem(this.state.item);
                  }
                  else {
                      this.displayErrorMessage( 
                        MSG_SAFE_QUEUE_NEEDS_YOUR_GPS_LOCATION,
                        MSG_CHANGE_YOUR_BROWSER_SETTINGS,
                        MSG_YOUR_BROWSER_REPORTED + "'" + error.message + "'",
                        true);  // true means exit on hitting OKAY

                      //returnToManager();
                  }
            },
            {enableHighAccuracy: true});

              // Keep getting position updates
            navigator.geolocation.watchPosition((pos) => {
                  var loc = `${pos.coords.latitude},${pos.coords.longitude}`;
                  this.setState({position:loc});

                  addressOfLocation(loc, this.updateEstimatedAddress);
                  this.setState({item: {...this.state.item, location:loc}});
                  this.showMapAtItem(this.state.item);
                }, 
                (error) => {
                    // Nothing we can do ... I think
                },
                {enableHighAccuracy: true}  
            );
        } 
  	    else {
  	          if(!global.bSpanish)
                   alert("I'm Sorry. You don't have GPS capability or it is turned off." +
                    "Safe Queue needs your location to operate.");
              else 
                  alert("Lo siento, " + MSG_SAFE_QUEUE_NEEDS_YOUR_GPS_LOCATION);
  	        console.log("GPS Not Available");
  	    }

        // Make sure the user knows his current location is used as the business location
        this.setState({bShowLocationWarning:MSG_NOTE});

        // Get Reserved name list
        if(arrReservedNames.length === 0)
            this.getReservedNames();
    }

  componentWillUnmount() {
      //console.log("unmount");
  }


  updateEstimatedAddress = (address, country) => {
      //console.log("GOT ADDRESS: " + address);
      //console.log("GOT COUNTRY: " + country);

      if(bUserModifiedAddress) {
          //console.log("hit user modified safeguard")
          return;
      }

      var newunits = 'ft';
      if((country !== undefined) && (country !== '') && (country !== 'USA'))
          newunits = 'm';  

      this.state.item.units = newunits;

      if(address !== '') {
          this.setState({item:{...this.state.item, description: address}, 
                         units: newunits,
                         estimatedAddressLabel:TTL_BUSINESS_ADDRESS + ' (estimated by location)'});
      }
  }

  getUnitDisplay = (props) => {
      if(this.state.units === 'ft')
          return "unit: feet";
      else 
          return "unit: meters";
  }


   getReservedNames = () => {
      const payload = {
          ...this.state.clearItem,
              userID: 'dave07234567',
              location: this.state.location
          };

          searchResilient(payload, payload, (results, payload) => {
              if(results != null) {
                  var jlist = results[0];  // there should only be one
                  if(jlist !== undefined) {
                      var list = jlist.description;
                      arrReservedNames = list.split(',');  // comma separated list of reserved names

                      var codes = getAPNTokenFromContact(jlist.contact);  // token is really codes here..
                      arrReservedCodes = codes.split(','); // comma separarted list of codes
                      if(arrReservedCodes.length != arrReservedNames.length) {
                          alert('Reserved Mismatch\n\nFound ' + arrReservedNames.length + ' names, but got ' +
                                       arrReservedCodes.length + ' codes.');
                      }

                      emailReserved = jlist.state;  // kluge - overloaded field

                      console.log("Got reserved names: " + arrReservedNames.length + " and " + emailReserved);

                      /* DEBUG
                      for(var i=0; i<arrReservedNames.length; i++) {
                          console.log ("Name: " + arrReservedNames[i] + " Code: " + arrReservedCodes[i]);
                      }
                      */
                  }
                  else {
                      // We'll read this to mean there are no reserved names 
                      arrReservedNames = new Array();  // empty
                      // Alert.alert('Reserved Names', 'No reserved names found');
                  }
              }
              else {
                  alert('Network Error\n\nDatabase lookup for Reserved names failed.\n[customer]'); //, [{text: 'OK'}]);
              }
      });
    }

  	drawBackdrop = () => {
  	  	if(this.state.bShowBackdrop === '0')
  	      	return;

  	    return (
  	      <div>
  	        <Dialog open={true}  aria-labelledby="form-dialog-title">
  	          <DialogTitle id="form-dialog-title" style={{fontSize:"75%"}}>{this.state.bShowBackdrop}</DialogTitle>
  	          <DialogContent>
  	              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',paddingBottom:16}}>
  	                 <CircularProgress variant="indeterminate" size={30} color="primary" thickness={4} />
  	             </div>
  	          </DialogContent>
  	        </Dialog>
  	      </div>
  	    );
	 }


drawErrorMessage = () => {
  if(this.state.bShowErrorMessage === '0')
      return;

    var namestyle = {fontSize:"80%"};

    const handleOkay = () => {
        if(this.state.bShowErrorMessageExit)
            returnToManager();
        else 
            this.setState({bShowErrorMessage:'0'})
    };

     return (
        <div>
          <Dialog open={true}  aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{fontSize:"75%"}}>{this.state.bShowErrorMessage}</DialogTitle>
            <DialogContent>
                  <div>{this.state.bShowErrorMessageSubtitle}</div>
                  <div style={{fontSize:'90%',marginTop:16}}>{this.state.bShowErrorMessageError}</div>
                  <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',paddingBottom:16}}>
                  <Button onClick={handleOkay} color="primary">
                    Okay
                </Button>               
                </div>
            </DialogContent>
          </Dialog>
        </div>
    );
}

// better looking call...
displayErrorMessage = (title, subtitle, error, bExit) => {
   this.setState({bShowErrorMessage:title, bShowErrorMessageSubtitle:subtitle, bShowErrorMessageError:error,
                  bShowErrorMessageExit:bExit});
}

// we're not going to allow multiple spaces in a store name, 
// it's too easy to create similar-looking store names and the value of multiple spaces is very low
removeDuplicateSpaces = (instr) => {
    var outstr = '';
    var lastchar = '';
    for(var j=0; j<instr.length; j++) {
        var c = instr.charAt(j);
        if((c === ' ') && (lastchar === ' '))
            continue;
        lastchar = c;
        outstr += c;
    }
    return outstr;
}

addStore = () => {
   if(this.state.item.name == "") {
        alert("Error\n\nYou must supply a name for the business.");
        return;
   }

  if(this.state.position == "") {
      alert("Error\n\nCan't add the business since we don't have a GPS location yet.\n\nTry again in a moment");
      return;
  }

  if(this.state.item.description == "")
      this.state.item.description = this.state.placeholder;

  /*
   * Check for reserved name
   */
  var code;
  var lname = this.state.item.name.toLowerCase();
  for(var i=0; i<arrReservedNames.length; i++) {
      var resname = arrReservedNames[i].toLowerCase();

      if(lname.includes(resname)) {
          code = this.state.enteredReservedCode.value;
          if(code == '') {
              // no code entered, show the dialog
              this.setState({showReservedInput:'1',
                             bShowReservedDialog:'Protected Name'});
              return;
          }
          else {
              // code was entered, validate it
              var truecode = arrReservedCodes[i];
              if(truecode == code) {
                  // Code is good, 
                  // Just fall through to the next thing...
                  this.setState({ShowReservedDialog:'0'});                  
                  break;
              }
              else {
                  alert("Sorry...\n\nThe validation code you entered is not valid.");
                  this.setState({enteredReservedCode:{value:''}});
                  return;
              }
          }
      }
  }

  this.setState({bShowBackdrop:MSG_CREATING_YOUR_SAFE_QUEUE});
    /*
     * Don't allow duplicate store names
     *
     * Search for any stores with this name, 
     * well we can't do that right now with the server/cloudant code AND still be case-insensitive
     * and remove spaces and such...
     *
     * So, instead, we'll get a list of all businesses and iterate over them in forced lower case
     * TODO: if the number of safe queues grows large, may want to optimize this.
     *       however this only called at queue-creation time which is relatively infrequent
     *
     */
      const storeItem = {
          type:'Store',
          contact: "none@none.com"
      };

      searchResilient(storeItem, storeItem, (results, payload) => {
          if(results != null) {
              var bDup = false;

              // we'll remove all multiple spaces so this isn't used to thwart the unique name
              var entered = this.state.item.name.toLowerCase().trim();
              var targetname = this.removeDuplicateSpaces(entered);
          
              //console.log("Entered:'" + entered + "' Target: '" + targetname + "'");
              //console.log("Checking " + results.length + " items for duplicate.");

              for(var i=0; i<results.length; i++) {
                  var ritem = results[i];
                  if(ritem.name.toLowerCase() === targetname) {
                      // Duplicate name, not allowed
                      bDup = true;
                      break;
                  }
              }

              if(bDup) {
                  this.displayErrorMessage("Already Exists", 
                    "Sorry, there is already a business with a name too similar, " + 
                    "so you must chose a different name.","", false);
                  this.setState({bShowBackdrop: '0'});
              }
              else {
                  // This is not a duplicate so let's actually create the store - it will close the dialog
                  this.doAddStore();
              }

          }
          else {
              alert('Network Error\\nDatabase lookup for the store failed.\n[customer]'); // [{text: 'OK'}]);
          }
    });
}

doAddStore = () => {
   var logosize = '';  //
    if(importedImage64 !== undefined) {
        var logoheight = 300/importedImageAspectRatio;
        logosize = "300x" + logoheight.toFixed(0)
    }

    // How do we want to be notified?
    var theToken = global.userID;  // default is websocket, which use userID as token
    if(global.FCMWebToken != null)
        theToken = global.FCMWebToken;

    // Create the features field for the store itself
    var features = ''; // no optional features

    if(!this.state.bStandeeSupport && !this.state.bPickupSupport && !this.state.bSelfManagedSupport)
        features = '|';  // need something here, since empty string is used in update as "don't update"

    if(this.state.bStandeeSupport)
        features += '|S';
    if(this.state.bPickupSupport)
        features += '|P';
    if(this.state.bSelfManagedSupport)
        features += '|M';

    // always enable walk-ins by default
    if(features === '|')
        features += 'W';
    else
        features += '|W'; 

    var custom = {"contactinfo":this.state.contactinfo };

    console.log("NEW STORE: " + features  + " custom:" + JSON.stringify(custom));

    // we don't allow multiple spaces in a business name
    var fixedname = this.removeDuplicateSpaces(this.state.item.name.trim());

    console.log("New name:'" + fixedname + "'")

    const payload = {
      ...this.state.item,
        name: fixedname,
        userID: global.userID,
        location: this.state.position,
        logo: importedImage64,
        state: "closed",   // inittially closed - user must open
        logosize: logosize,
        units: this.state.units,
        features: features,
        monitors: global.userID,  // always allow the creator of the queue to monitor it
        contact: createContact("none@none.com", theToken),
        custom: custom
    };

    console.log("payload:" + JSON.stringify(payload))

    addResilient(payload, payload, (item) => {
        if(item != null) {
            // get the recovery Queue Code from the created record ID
            var createdId = item.createdId;
            var storecode = createdId.substring(0,8);

            this.setState({bShowBackdrop: '0', bShowAddedDialog:'1',
                           addedStoreCode: storecode});
        }
        else {
            alert('Network Error\n\nAdd failed after two retries. Please check your network connection and try again.'); //, [{text: 'OK'}]);
        }
    });
};



/*
 * Logo support
 */
photoupdate = (files) => {
    this.setState({logoFile:files});
}


drawAddPhoto = () => {
    if(this.state.bShowPhotoCropper === '0')
        return;

    return (
      <div style={{marginTop:8}}>
          {this.state.src && (
              <div>
              <div style={{marginBottom:8}}>select a region for your logo</div>
              <ReactCrop
                src={this.state.src}
                crop={this.state.crop}
                ruleOfThirds
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
              </div>
          )}
          
      </div>
    );
}

onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
          this.setState({ src: reader.result,
                          bShowPhotoCropper:'1'})
      );
      reader.readAsDataURL(e.target.files[0]);
    }
};

  // If you setState the crop in here you should return false.
onImageLoaded = image => {
      this.imageRef = image;
};

onCropComplete = crop => {
      this.makeClientCrop(crop);
};

onCropChange = (crop, percentCrop) => {
      // You could also use percentCrop:
      // this.setState({ crop: percentCrop });
      this.setState({ crop });
};

async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });

      //console.log("FILE:" + croppedImageUrl);

      this.setState({bShowLogo:'1',
                     bShowBtnAddPhoto:'0',
                     bShowBtnAcceptCrop:'1',
                     bShowBtnSave:'0',
                     bShowAddress:'0'});
    }
}

getCroppedImg(image, crop, fileName) {
    console.log('getCroppedImg');

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    importedImage64 = canvas.toDataURL('image/jpeg');

    // need to remove the prefix to get just the base64 data...
    // "data:image/jpeg;base64," is the prefix to be removed
    importedImage64 = importedImage64.slice(23);
    importedImageAspectRatio = crop.width/crop.height;

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/png'); // 'image/jpeg');
    });
}

onLogoAccepted = () => {
    this.setState({bShowBtnAddPhoto:'1',
                   bShowBtnAcceptCrop:'0',
                   bShowPhotoCropper:'0',
                   bShowBtnSave:'1',
                   bShowAddress:'1'});
}

onLogoCancelled = () => {
    importedImage64 = undefined;
    this.setState({bShowBtnAddPhoto:'1',
                   bShowBtnAcceptCrop:'0',
                   bShowPhotoCropper:'0',
                   bShowLogo:'0',
                   bShowAddress:'1',
                   bShowBtnSave:'1',
                   src: null,
                   croppedImageUrl:''});
}


drawReservedDialog = () => {
    if(this.state.bShowReservedDialog === '0')
      return;

    const handleCancel = () => {
        this.setState({bShowReservedDialog:'0'});
    };

    const handleValidate = () => {     
        this.addStore(); // just try again
        this.setState({bShowReservedDialog:'0'});
    }

    return (
        <div>
            <Dialog open={true} onClose={handleCancel} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Protected Name</DialogTitle>
              <DialogContent>
                <DialogContentText>
                   You've entered a name that is protected to prevent fraud. You must supply a validation code:      
                </DialogContentText>
                    <TextField
                      margin="dense"
                      variant="outlined"
                      placeholder="code"
                      id="nickname"
                      onChange={(e) => this.setState({ enteredReservedCode:{value: e.target.value}})}
                      fullWidth
                    />
                    To obtain a validation code, send email to { emailReserved }
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleValidate} color="primary">
                  Okay
                </Button>
              </DialogActions>
            </Dialog>
        </div>
    );
}

drawConfimDialog = () => {
    if(this.state.bShowConfirmDialog === '0')
      return;

    const handleCancel = () => {
        this.setState({bShowConfirmDialog:'0'});
    };

    const handleAction = () => {                     
        this.setState({bShowConfirmDialog:'0'});
        if(this.state.confirmCallback !== undefined)
            this.state.confirmCallback(); 
    }

    return (
      <div>
        <Dialog open={true} onClose={handleCancel} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
               {this.state.bShowConfirmDialog}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
             <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAction} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

drawLocationWarning = () => {
  if(this.state.bShowLocationWarning === '0')
      return;

    const handleCancel = () => {
        this.setState({bShowLocationWarning:'0'});
    };

    return (
        <div>
            <Dialog open={true} onClose={handleCancel} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">{this.state.bShowLocationWarning}</DialogTitle>
              <DialogContent>
                  <div>{MSG_FOR_SECURITY_REASONS}</div>
                  <div><br /></div>
                  <div>{MSG_YOU_MUST_PHYSICALLY_BE_AT}</div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancel} color="primary">
                  {MSG_OKAY_GOT_IT}
                </Button>
              </DialogActions>
            </Dialog>
        </div>
    );
}

drawAddedDialog = () => {
    if(this.state.bShowAddedDialog === '0')
        return;

    const handleOkay = () => {
        // go back to the Manager, which should reload this new queue
        this.setState({bShowAddedDialog:'0'});

        // Text the queue info
        if(smsEntered !== '') {
            var body  = "Created Safe Queue:\n'" + this.state.item.name + "'\nQueue Code: " + this.state.addedStoreCode; 
            var title = '';
            var sound = 'silent.wav';
            var type  = global.notificationSMSOnly;
            var token = "sms_" + smsEntered;

            var payload = {title: title, body: body, payload: {"aps" : { "content-available" : 1 }, type: type, nickname: '', userid: global.userID}};
            var spayload = JSON.stringify(payload);
            var spayload64 = Buffer.from(spayload, 'binary').toString('base64');

            //alert(body + "\n\n" + spayload);

            pushResilient(token, spayload64, sound, (response) => {
                if(response != null) {
                    if(response.result == 'SUCCESS') {
                    }
                    else {
                         // The notification failed, but there's nothing really to do at this point 
                         // Though maybe we should let the user know???
                    }
                }
                else {
                    // Well, there's really nothing to be done here
                    // Network errors are almost always caught before we get here. It is a small window
                    // so just let it go silently
                }

                returnToManager();
            });
        }
        else {
            returnToManager();
        }

    };

    function handleSmsChange(value) {
        // the value passed in is in pretty format
        // we need to remove all the spaces and parens for use with Twilio
        var tight = value.replace(/\s/g,'');
        tight = tight.replace("(", "");
        tight = tight.replace(")", "");
        tight = tight.replace("-", "");
        smsEntered = tight;
        //console.log("PIN: " + value + "  POUT:" + tight);
    }

    smsEntered = '';

    return (
        <div>
            <Dialog open={true} onClose={handleOkay} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">{MSG_SAFE_QUEUE_CREATED}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                    <div>{MSG_YOUR_QUEUE_CODE}</div>
                    <div><b>{this.state.addedStoreCode}</b></div>
                    <div></div>
                    <div>{MSG_SAVE_THIS_CODE}</div>
                    <div></div>
                    <div>{MSG_THE_CODE_IS_VISIBLE_IN_MANAGEMENT}</div>
                </DialogContentText>

                <div style={{marginTop:16}}>{MSG_WE_CAN_ALSO_TEXT_YOU}</div>  
                <MuiPhoneNumber defaultCountry={!global.bSpanish ? 'us' : 'es'} 
                            regions={['north-america',  'south-america', 'central-america', 'carribean','europe']}
                            margin="dense"
                            variant="outlined"
                            id="sms"
                            label={TTL_PHONE_NUMBER}
                            fullWidth
                            onChange={handleSmsChange}/>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleOkay} color="primary">
                  Okay
                </Button>
              </DialogActions>
            </Dialog>
      </div>
    );
}


drawBtnAddPhoto = () => {
    if(this.state.bShowBtnAddPhoto === '0')
        return;

    return (
        <div style={{marginTop:16}}>
            <label for="file-upload" class="custom-file-upload">
                <div style={{color:'#FFFFFF'}}>{BTN_IMPORT_BUSINESS_LOGO}</div>
            </label>
            <input id="file-upload" type="file" accept="image/*" onChange={this.onSelectFile} />
        </div>
    );
}


drawBtnAcceptCrop = () => {
    if(this.state.bShowBtnAcceptCrop === '0')
        return;

    var style={marginBottom:8,borderRadius:10,borderColor:'#000000',marginLeft:24,marginRight:24,backgroundColor:'#7030a0'};
    return (
        <div style={{marginTop:6}}>
            <Button style={style} onClick={this.onLogoAccepted} > 
                <div style={{color:'#FFFFFF'}}>{BTN_ACCEPT}</div>
            </Button>
            <Button style={style} onClick={this.onLogoCancelled} > 
                <div style={{color:'#FFFFFF'}}>{BTN_CANCEL}</div>
            </Button>
        </div>
    );
}

showMapAtItem = (theItem) => {
    // We'll always allow mapping here, because we're dependent upon HERE already.
    // if(!global.bAllowMaps)
    //    return;

    global.itemMap = theItem;
    this.setState({bShowMap:'1'});
}

drawMap() {
  if(this.state.bShowMap === '0') {
      return (
          <div style={{marginTop:24}}>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <Spinner name="circle" color="black" />
                    <div style={{marginLeft:8}}><b>{MSG_WAITING_FOR_GPS_INFORMATION}</b></div>
              </div>
          </div>
      );
  }

  return (
    <div style={{marginLeft:'10%'}}>
     <DisplayMapClass ref={(ref) => this.theMap = ref} height='320px' width='90%' 
          nocircle='yes'
          radius={this.state.chosenRadiusInFeet}
          storeLocation={this.state.item.location}/>
    </div> 
  ); 
}

/*
 * THIS CAUSES THE APP TO CRASH - an element is undefined (but dont know which one)
PurpleSwitch = withStyles({
  switchBase: {
    color:  '#AAAAAA', //purple[300],
    '&$checked': {
      color:  purple[800],
    },
    '&$checked + $track': {
      backgroundColor: purple[800],
    },
  },
  checked: {},
  track: {},
})(Switch);
*/


drawFeatures = () => {

    return (
        <div style={{width:'80%', marginLeft:'10%',marginTop:8, marginBottom:8}}>
        <b>{MSG_ONCE_CREATED}</b>
        </div>
    )

    if(!global.bAllowPickup && !global.bAllowStandees)
        return;

    const handleStandeeChange = (event) => {
        if(event.target.checked) {
            this.setState({ bStandeeSupport:true,
                            bSelfManagedSupport:false });
        }
        else {
            this.setState({ bStandeeSupport:false });
        }
    };

    const handlePickupChange = (event) => {
        if(event.target.checked) {
            this.setState({ bPickupSupport:true,
                            bSelfManagedSupport:false });
        }
        else {
            this.setState({ bPickupSupport:false });
        }
    };

    const handleSelfManagedChange = (event) => {
        if(event.target.checked) {
            // if self-managed, turn off the other features
            this.setState({ bSelfManagedSupport:true,
                            bPickupSupport:false,
                            bStandeeSupport:false});
        }
        else {
            this.setState({ bSelfManagedSupport:false});
        }
    };

    return (
        <div>
            <div style={{marginTop:16}}></div>
            { /* !global.bSpanish && */ true &&
                <div><b>Select features for this Safe Queue:</b></div>
            }
            { /* !global.bSpanish && */ true &&
                <div><b>(these can be changed later)</b></div>
            }
            { global.bAllowPickup && 
                <Grid container  
                    direction="row"
                           justify="center"
                           alignItems="center">
                    
                    <Grid item xs={2}></Grid>
                    <Grid item xs={1}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.bPickupSupport}
                              onChange={handlePickupChange}
                              name="pickupfeature"
                              color="primary"
                            />
                          }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{textAlign:'left',marginLeft:8}}>Order Pickup</div>
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={(e) => {this.showInfoPickup(); e.stopPropagation();}}><img src={icon_about} height="20"/></Button>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>  
            }
            { global.bAllowStandees  &&
              <Grid container  
                  direction="row"
                         justify="center"
                         alignItems="center">
        
                  <Grid item xs={2}></Grid>
                  <Grid item xs={1}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.bStandeeSupport}
                            onChange={handleStandeeChange}
                            name="standeefeature"
                            color="primary"
                          />
                        }
                      />      
                  </Grid>
                  <Grid item xs={4}>
                      <div style={{textAlign:'left',marginLeft:8}}>Standees</div>
                  </Grid>
                  <Grid item xs={2}>
                        <Button onClick={(e) => {this.showInfoStandee(); e.stopPropagation();}}><img src={icon_about} height="20"/></Button>
                  </Grid>
                  <Grid item xs={2}></Grid>
              </Grid>
            }
            { global.bAllowSelfManaged &&
              <Grid container  
                  direction="row"
                         justify="center"
                         alignItems="center">
        
                  <Grid item xs={2}></Grid>
                  <Grid item xs={1}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.bSelfManagedSupport}
                            onChange={handleSelfManagedChange}
                            name="standeefeature"
                            color="primary"
                          />
                        }
                      />      
                  </Grid>
                  <Grid item xs={4}>
                      <div style={{textAlign:'left',marginLeft:8}}>Self-Managed</div>
                  </Grid>
                  <Grid item xs={2}>
                        <Button onClick={(e) => {this.showInfoSelfManaged(); e.stopPropagation();}}><img src={icon_about} height="20"/></Button>
                  </Grid>
                  <Grid item xs={2}></Grid>
              </Grid>
            }
        </div>);
}

showInfoPickup = () => {
  this.displayHelpMessage("Order Pick-Up",

      "Enable this feature if you want to track and notify customers who have made orders and will pick them up later. " +

      "This will create a Pickup List for your Safe Queue, where you can add customers to that list or they can add " +
      "themselves to the list with one tap. ",

      "You can notify customers by SMS text message or by anonymous notification within the Safe Queue app. " +
      "The app generates a unique order code for every pickup you can see in your management screen.",

      "When an order is ready, you tap on any customer in the Pick-Up list and they will be notified " +
      "to come in and get their order. You can scan their QR Code generated by the App to validate the order.",

      "Further usage details are available in the Queue Management screen.");
}

showInfoSelfManaged = () => {
  this.displayHelpMessage("Self Managed",

      "Enable this feature if you want your line to move automatically as customers identify that they've " +
      "left your business.",

      "In this case, there is no manager of the queue. When a customer goes in a business, he taps in the app when he leaves " +
      "and this will automatically notify the next customer in line.",

      "",

      "");
}

showInfoStandee = () => {
  this.displayHelpMessage("Standees",

      "Enable this feature if you want to track customers who don't have mobile devices, so must stand nearby and " +
      "cannot be notified through the App.",

      "This feature is intended to provide a fair line, where Standees appear in your line with the other customers " +
      "who joined the line using the app.  You can serve the line in order, regardless of how they joined.",

      "Every Standee is assigned a number. When you serve a Standee, you simply tap on him/her and remove them from " +
      "the line.",

      "");
}



drawRadius = () => {

    return;

    const handleRadiusChange = (event) => {
        var newvalue = event.target.value;

        // remove all non-numbers - this prevents them from being displayed at all
        for (let i = 0; i < newvalue.length; i++) {
            var c = newvalue[i];

            if((c !== '0') && (c !== '1') && (c !== '2') && (c !== '3') && (c !== '4') &&
               (c !== '5') && (c !== '6') && (c !== '7') && (c !== '8') && (c !== '9')) 
                return;
        }

        var newRadiusInFeet = newvalue; 
        if(this.state.item.units === 'm')
            newRadiusInFeet = (newvalue * 1000)/304.8;  // user thinks he entered meters

        this.setState({chosenRadiusInFeet:newRadiusInFeet, bShowRadiusButtons:true})
    }

    const radiusDisplay = () => {
        if(this.state.item.units === 'm') {
            var valueInMeters = (this.state.chosenRadiusInFeet * 304.8)/1000; 
            return valueInMeters.toFixed(0);
        }
        return this.state.chosenRadiusInFeet;
    }

    const handleMap = () => {
       // we can get here before the map has been drawn, so make sure
        let timerIdMap = setInterval(() => {
            if((this.theMap !== undefined) && (this.theMap !== null)) {
                clearInterval(timerIdMap); 
                console.log("setting radius to " + this.state.chosenRadiusInFeet)
                this.theMap.setState({radius:this.state.chosenRadiusInFeet});
            }  
            else 
                console.log("No map yet...");
        }, 1000);
    }

    const handleCancel = () => {
        var oldradius = (this.state.item.radius === undefined) ? 1000 : this.state.item.radius;
        this.setState({chosenRadiusInFeet:oldradius, bShowRadiusButtons:false})
        this.theMap.setState({radius:oldradius});
    };

    const handleSave = () => {
        this.setState({bShowBackdrop:'Saving...'});
    };

    var units = 'feet';
    if(this.state.item.units === 'm')
        units = 'meters';

    return (
         <Grid container spacing={2} style={{width:"90%",marginTop:8,marginBottom:8,marginLeft:16}}
            direction="row"
            justify="space-between"
            alignItems="center"
            justify="center"> 
            <Grid item xs={this.state.bShowRadiusButtons ? 5 : 10}>              
                <TextField style={{fontSize:'80%',textTransform:'none'}}
                    InputProps={{ 
                        endAdornment: <InputAdornment position="end">{units}</InputAdornment>,
                    }}
                    
                    id="outlined-basic-name"
                    value={radiusDisplay()}
                    label={"Radius"}
                    variant="outlined"
                    size="small"
                    onChange={handleRadiusChange}
                />
            </Grid>
            { this.state.bShowRadiusButtons &&
              <Grid item xs={2}>
                  <Button onClick={handleSave} color="primary">
                      Save
                  </Button>  
              </Grid>
            }
            { this.state.bShowRadiusButtons &&
              <Grid item xs={2}>
                  <Button onClick={handleCancel} color="secondary">
                      Cancel
                  </Button>  
              </Grid>
            }
            <Grid item xs={2}>
               <Button onClick={(e) => { e.stopPropagation();}}><img src={icon_question} height="20"/></Button>
            </Grid>
        </Grid>
    )
}


drawHelpMessage = () => {
  if(this.state.bShowHelpMessage === '0')
      return;

    var namestyle = {fontSize:"80%"};

    const handleOkay = () => {
        this.setState({bShowHelpMessage:'0'});
    };

    var textstyle = {fontSize:'90%',marginTop:16,marginBottom:16};
    var textstyle1 = {fontSize:'90%',marginTop:0,marginBottom:16};

     return (
        <div>
          <Dialog open={true}  aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{fontSize:"75%",color:themeMainColor}}>{this.state.bShowHelpMessage}</DialogTitle>
            <DialogContent>
                 <div style={textstyle1}>{this.state.helpMessageLine1}</div>
                 <div style={textstyle}>{this.state.helpMessageLine2}</div>
                 <div style={textstyle}>{this.state.helpMessageLine3}</div>
                 <div style={textstyle}>{this.state.helpMessageLine4}</div>

                 <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',paddingBottom:16}}>
                  <Button onClick={handleOkay} color="primary">
                      Okay
                  </Button>               
                </div>
            </DialogContent>
          </Dialog>
        </div>
    );
}

// better looking call...
displayHelpMessage = (title, line1, line2, line3, line4) => {
   this.setState({bShowHelpMessage:title, helpMessageLine1:line1, 
                        helpMessageLine2:line2,
                        helpMessageLine3:line3,
                        helpMessageLine4:line4});
}


drawContactInfo = () => {
    return (
        <TextField style={{width:"80%",marginTop:8}}
            id="outlined-basic-name"
            label={TTL_CONTACT_INFO}
            hintText="e.g. 310-555-4555"
            variant="outlined"
            onChange={(e) => this.setState({contactinfo:e.target.value.trim()})}
          />
    )
}


/*
 *  This is the entire screen
 */
render () {
    if(this.state.bShowManager === '1') {
        return ( <Manager />);
    }
    else if(this.state.bShowQueueManagement === '1') {
        return ( <QueueManagement />);
    }

    // appBar height is bigger on Android, than iOS (so it seems) so adjust here
    var offsetStyle;
    if(isAndroid)
        offsetStyle = {height:64,backgroundColor:'#F1F0EE'};
    else
        offsetStyle = {height:52,backgroundColor:'#F1F0EE'};


    var btnstyle={width:"80%",marginTop:8,borderRadius:10,borderColor:'#000000', backgroundColor:'#7030a0'};

    const { crop, croppedImageUrl, src } = this.state;

    const handleAdd= () => {     
        this.addStore(); // just try again
    }

    return (      
        <div>
            { false && 
              <ons-toolbar class="toolbar static" style={{backgroundColor:"#7030A0"}}>
                  <div className="center" style={{color:'#FFFFFF',fontSize:'150%', fontFamily:'./IBMPlex/IBMPlexSans-Bold.ttf'}}><b>Add Queue</b></div>
              </ons-toolbar>
            } 
            
            <Ons.Page contentStyle={{padding: 0}}>

                <div className="App">

                    <div style={offsetStyle}></div>

                    <div><b>{MSG_ENTER_A_DESCRIPION}</b></div>
                    <div><b>{MSG_AS_IT_WILL_BE_SEEN}</b></div>

                    { this.drawBackdrop() }
                    { this.drawReservedDialog() }
                    { this.drawAddedDialog() }
                    { this.drawLocationWarning() }
                    { this.drawErrorMessage() }
                    { this.drawHelpMessage() }

                    { this.state.bShowLogo !== '0' &&
                        <div>
                            {this.state.croppedImageUrl && (
                              <img alt="Crop" style={{ width:'250', maxWidth:'80%', borderRadius:10}} src={this.state.croppedImageUrl} />
                            )}
                        </div>
                    }

                    <TextField style={{width:"80%",marginTop:8}}
                        id="outlined-basic-name"
                        label={TTL_YOUR_BUSINESS_NAME}
                        hintText="e.g. Sam's Hardware Store"
                        variant="outlined"
                        onChange={(e) => this.setState({ item:{...this.state.item, name: e.target.value.trim()}})}
                      />

                    { this.state.bShowAddress !== '0' &&
                        <div>
                        <TextField style={{width:"80%",marginTop:16}}
                            id="outlined-multiline-static"
                            label={this.state.estimatedAddressLabel}
                            multiline
                            rows={3}
                            value={this.state.item.description}
                            defaultValue={'...'}
                            variant="outlined"
                            onChange={(e) => {
                              bUserModifiedAddress = true; // prevents GPS from overwriting it
                              //console.log("Set user modified: " + bUserModifiedAddress ? "true" : "false")
                              this.setState({ item:{...this.state.item, description: e.target.value}});
                            }}
                          />
                        { this.drawContactInfo() }
                        </div>
                     }
                   
                    {
                        this.state.bShowBtnSave !== '0' &&
                        this.state.bShowMap !== '0' &&
                        this.state.item.type !== '' &&
                        this.state.item.name.trim() !== '' &&
                        ((this.state.item.description !== '') || (this.state.estimatedAddress !== '')) &&

                        <Button style={btnstyle} onClick={handleAdd}>
                          <div style={{color:'#FFFFFF',fontSize:'110%'}}>{BTN_CREATE_SAFE_QUEUE}</div>
                        </Button>
                    }

                    { this.drawAddPhoto() }
                    { this.drawBtnAddPhoto() }
                    { this.drawBtnAcceptCrop() }

                    { this.drawFeatures() }
              
                    <div style={{marginTop:8}}>{MSG_YOUR_BUSINESS_LOCATION_WILL_BE}</div>
                    <div style={{fontSize:'90%'}}>{this.state.position}</div>
                    <div style={{fontSize:'70%'}}>{this.getUnitDisplay(this.state.item)}</div>

                    { this.drawRadius() }
                    { this.drawMap() }

                </div>
            </Ons.Page>    
        </div>
    );
}
}
 
export default QueueAdd;