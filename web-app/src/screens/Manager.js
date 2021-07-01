import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

 
import '../App.css';

import QueueManagement  from './QueueManagement';
import QueueAdd         from './QueueAdd';


import { updateResilient, searchResilient, pushResilient } from '../lib/utils'
import { getUserIDFromContact } from '../lib/utils'
import { createContact } from '../lib/utils'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import Spinner from 'react-spinkit';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import * as Ons from 'react-onsenui'; // Import everything and use it as 'Ons.Page', 'Ons.Button'


import logo_safequeue from '../images/safequeue_splash.png';
import logo_safequeue_es from '../images/safequeue_splash_es.png';

import img_receive    from '../images/icon_receive.png';
import img_share      from '../images/icon_share.png'; 
import img_mirror     from '../images/btnmirror.png'

import img_qrsample   from '../images/qrsample.png';
import img_sound      from '../images/sound.png';

import img_signopen   from '../images/signopen.png';

import PlainList from 'flatlist-react';

//import QrReader from 'react-qr-reader'  // fails on S20 (and S10?)
//import QrReader from 'react-qr-scanner' // doesn't fis S20 bug
//import QrReader from 'eth-qr-scanner'   // fixes S20 bug, but only works for Ethereum 
import QrReader from 'dave-qr-reader'     // fixes S20 bug in react-qr-reader (started from github issue "fixed samsung multiple cameras #154")


import QRCode from 'qrcode.react';

import q3 from '../images/q3.png';

import icon_about from '../images/abouticon_black.png';

import {
  // isBrowser,
  isMobile,
  //isChrome,
  isIOS,
  isSafari,
  isAndroid
} from "react-device-detect";


global.materialclasses = null;

/*
 * Simple translation to spanish
 */
var MSG_SAFE_QUEUES
var MSG_FINDING_YOUR_QUEUES
var MSG_WELCOME
var MSG_CREATE_A_SAFE_QUEUE
var MSG_ONCE_CREATED
var MSG_HOW_DOES_IT_WORK
var MSG_CREATE_QUEUE
var BTN_ADD
var BTN_CLOSE
var MSG_CLOSED
var MSG_OPEN
var BTN_IMPORT_A_SAFE_QUEUE
var MSG_CREATE_YOUR_SAFE_QUEUE_BY_TAPPING
var MSG_OPEN_YOUR_QUEUE
var MSG_YOUR_QUEUE_STARTS_CLOSED
var MSG_WHEN_READY_NOTIFY
var MSG_AS_CUSTOMERS_ARRIVE
var MSG_YOUR_SAFE_QUEUES_ARE_MANAGED
var MSG_YOU_CAN_IMPORT_AND_EXPORT
var TTL_QUEUE_MANAGEMENT
var BTN_BACK
var BTN_EXPORT
var BTN_CANCEL
var BTN_ENTER
var BTN_SCAN_A_QUEUE_CODE
var BTN_ENTER_A_QUEUE_CODE
var MSG_EXPORT_SAFE_QUEUE
var MSG_THIS_IS_USED_TO_TRANSFER
var MSG_THE_NEW_MANAGER_TAPS_ON

var MSG_SAFE_QUEUE_NEEDS_YOUR_GPS_LOCATION
var MSG_CHANGE_YOUR_BROWSER_SETTINGS
var MSG_YOUR_BROWSER_REPORTED

var BTN_YES
var BTN_NO


const setLanguage = (lang) => {

  var bSpanish = (lang === 'es') ? true : false;

  // Button titles
  MSG_SAFE_QUEUES = !bSpanish ? "Safe Queues" : "Colas Seguras";
  MSG_FINDING_YOUR_QUEUES = !bSpanish ? "Finding your queues..." : "Encontrando sus colas...";
  MSG_WELCOME = !bSpanish ? "WELCOME!" : "¡BIENVENIDO!";
  MSG_CREATE_A_SAFE_QUEUE = !bSpanish ? "Create a Safe Queue for your business." : "Crea una Cola Segura para su negocio.";
  MSG_ONCE_CREATED = !bSpanish ? 
      "Once created, your Safe Queue will be visible to customers!" : 
      "¡Una vez creada su Cola Segura será visible para sus clientes!";
  MSG_HOW_DOES_IT_WORK  = !bSpanish ? "How does it work?" : "¿Cómo funciona?";

  MSG_CREATE_QUEUE = !bSpanish ? "Create Queue" : "Crea una Cola";

  BTN_ADD = !bSpanish ? "Add" : "Añadir";
  MSG_CLOSED = !bSpanish ? "CLOSED" : "CERRADA";
  MSG_OPEN = !bSpanish ? "OPEN" : "ABIERTA";

  BTN_CLOSE = !bSpanish ? "CLOSE" : "CERRAR";

  BTN_IMPORT_A_SAFE_QUEUE = !bSpanish ? "Import a Safe Queue:" : "Importar una Cola Segura:";

  MSG_CREATE_YOUR_SAFE_QUEUE_BY_TAPPING = !bSpanish ? "Create your Safe Queue by tapping on Add" : "Cree su Cola Segura pulsando en Añadir";
  MSG_OPEN_YOUR_QUEUE = !bSpanish ? "Open your queue." : "Abra su cola.";
  MSG_YOUR_QUEUE_STARTS_CLOSED = !bSpanish ? "Your queue starts closed" : "Su cola se inicia cerrada.";
  MSG_WHEN_READY_NOTIFY = !bSpanish ? 
    "When ready, notify one or more customers to come in. They hear 'Come in Now!'" : 
    "Cuando esté listo, notifique a uno o más clientes para que ingresen. Recibirán el mensaje ¡Ingrese ahora!"
  MSG_AS_CUSTOMERS_ARRIVE = !bSpanish ?
  "As customers arrive, scan their codes to validate entry." :
  "Cuando lleguen los clientes, escanee sus códigos para validar la entrada.";

  MSG_YOUR_SAFE_QUEUES_ARE_MANAGED = !bSpanish ? 
  "Your Safe Queues are managed from this device." : "Sus Colas seguras se administran desde este dispositivo";

  MSG_YOU_CAN_IMPORT_AND_EXPORT = !bSpanish ?
  "You can Import and export them to other devices." : "Puedes importarlos y exportarlos a otros dispositivos";

  TTL_QUEUE_MANAGEMENT = !bSpanish ? "Queue Management" : "Gestión de Colas";

  BTN_BACK = !bSpanish ? "Back" : "Atrás";

  BTN_EXPORT = !bSpanish ? "Export" : "Exportar";
  BTN_CANCEL = !bSpanish ? "Cancel" : "Cancelar";
  BTN_ENTER  = !bSpanish ? "Enter"  : "Introduzca";

  BTN_SCAN_A_QUEUE_CODE = !bSpanish ? "Scan a Queue Code:" : "Escanee el código de una cola";
  BTN_ENTER_A_QUEUE_CODE = !bSpanish ? "Or Enter a Queue Code:" : "O Introduzca el código de una cola";

  MSG_EXPORT_SAFE_QUEUE = !bSpanish ? "Export Safe Queue" : "Exportar Cola Segura";


  MSG_THIS_IS_USED_TO_TRANSFER = !bSpanish ? 
    "This is used to transfer this Safe Queue to another manager's device." :
    "Se utiliza para transferir esta cola segura al dispositivo de otro administrador.";
  MSG_THE_NEW_MANAGER_TAPS_ON = !bSpanish ?
    "The new manager taps on his Import button and scans this code." :
    "El nuevo administrador toca su botón Importar y escanea este código.";

  MSG_SAFE_QUEUE_NEEDS_YOUR_GPS_LOCATION = !bSpanish ?
        "Safe Queue needs your GPS location to operate." : "Cola Segura necesita tu ubicación GPS para funcionar.";
  MSG_CHANGE_YOUR_BROWSER_SETTINGS = !bSpanish ?
        "Change your browser settings for this site to Allow or to Ask for use of your location." :
        "Cambie la configuración de su navegador para este sitio para permitir o para solicitar el uso de su ubicación.";
  MSG_YOUR_BROWSER_REPORTED = !bSpanish ?
        "Your browser reported: " : "Su navegador informó: ";

  BTN_YES = !bSpanish ? "Yes" : "Sí";
  BTN_NO  = !bSpanish ? "No"  : "No";
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));


const styles = makeStyles((theme) => ({
  flatListView: {
     backgroundColor: '#F0F0F0',
     paddingTop: 8
  },
    outerView: {
       flex: 1,
       padding: 1,
     },
  itemTouchable: {
      flexDirection: 'column',
      padding: 10,
      justifyContent: 'flex-start',
      alignItems: 'stretch'
  },


itemOuter: {
   flexDirection: 'column',
   padding: 10,
   justifyContent: 'flex-start',
   alignItems: 'stretch',
   borderRadius: 10,
   borderWidth: 1.0,
   marginTop: 2,
   marginLeft: 2,
   marginRight: 2
},

  splitView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  splitViewColumn: {
       flexDirection: 'column',
       justifyContent: 'center',
  },

  heading: {
      fontFamily: 'IBMPlexSans-Medium',
      color: '#000',
      fontSize: 14,
      paddingTop: 5
  },
    loaderView: {
        flex: 1,
        flexDirection: 'row',
        fontFamily: 'IBMPlexSans-Medium',
        color: '#000',
        fontSize: 14,
        justifyContent: 'center',
        paddingBottom: 8
    },

    headingIndented: {
        fontFamily: 'IBMPlexSans-Medium',
        color: '#000',
        fontSize: 14,
        paddingLeft: 22,
        paddingRight: 22,
        paddingTop: 5
    },

    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 2
    },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemName: {
    fontSize: 24,
    fontFamily: 'IBMPlexSans-Medium',
  },
  itemState: {
    fontSize: 12,
    fontFamily: 'IBMPlexSans-Medium',
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray'
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray'
  },
  emptyListView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyListText: {
    fontFamily: 'IBMPlexSans-Bold',
    color: '#999999',
    fontSize: 16
  },
  button: {
    backgroundColor: '#1062FE',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop: 15
  },
  costcoLogo: {
     width: 180,
     height: undefined,
     aspectRatio: 2016 / 720
   },
  traderjoesLogo: {
       width: 120,
       height: undefined,
       aspectRatio: 3199 / 1352
     },
  walmartLogo: {
     width: 180,
     height: undefined,
     aspectRatio: 1600 / 442
   },
  ralphsLogo: {
        width: 180,
        height: undefined,
        aspectRatio: 880 / 363
      },
  pigglywigglyLogo: {
       width: 140,
       height: undefined,
       aspectRatio: 551 / 267
     },
  starbucksLogo: {
             width: 200,
             height: undefined,
             aspectRatio: 640 / 169
           },
  foodbankLogo: {
             width: 180,
             height: undefined,
             aspectRatio: 800 / 293
          },
    pollLogo: {
              width: 140,
              height: undefined,
              aspectRatio: 299 / 168
            },
  defaultLogo: {
     width: 250,
     height: undefined,
     aspectRatio: 300 / 100,
     borderRadius: 10,
   },
    sign: {
       width: 70,
       height: undefined,
       aspectRatio: 858 / 620
     },
     signTop: {
         flex: 1,
         flexDirection: 'column',
         justifyContent: 'flex-start',
         alignItems: 'stretch',
         marginTop: 8
      },

      share: {
         width: 60,
         height: undefined,
         aspectRatio: 960 / 960,
         marginTop: 6,
         marginLeft: 6
       },

      shareText: {
          fontSize: 14,
          fontFamily: 'IBMPlexSans-Medium',
          marginTop: 0,
          marginLeft: 6
       },
        receive: {
         width: 60,
         height: undefined,
         aspectRatio: 960 / 960,
         marginTop: 2,
         marginRight: 20
       },

      receiveText: {
        fontSize: 16,
        fontFamily: 'IBMPlexSans-Medium',
        marginLeft: 10
      },


      openingTextHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'IBMPlexSans-Medium',
        color: '#7030A0',
        textAlign:'center',
      },
      openingText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'IBMPlexSans-Medium',
        textAlign:'center',
      },
      openingTextLight: {
        fontSize: 14,
        fontFamily: 'IBMPlexSans-Medium',
        textAlign:'center',
      },


      textInput: {
        fontFamily: 'IBMPlexSans-Medium',
        flex: 1,
        borderColor: '#D0E2FF',
        borderWidth: 2,
        padding: 14,
        elevation: 2,
        marginBottom: 25
      },
      outerViewText: {
        flex: 1,
        padding: 22,
        backgroundColor: '#FFF',
        height: 80
      },

     modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#rgba(0, 0, 0, 0.2)',
        zIndex: 1000
      },
      activityIndicatorWrapper: {
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        width: '60%',
        height: '15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      modalText: {
        fontSize: 14,
        fontFamily: 'IBMPlexSans-Medium',
        color: '#000000',
        marginBottom: 8
      },

    receiveButton: {
      backgroundColor: '#1062FE',
      color: '#FFFFFF',
      fontFamily: 'IBMPlexSans-Medium',
      fontSize: 16,
      overflow: 'hidden',
      padding: 4,
      textAlign:'center',
      marginTop: 0,
      borderRadius: 5
    },


  updateButton: {
    backgroundColor: '#7030a0',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop: 15,
    borderRadius: 10
  },

    updateButtonOLD: {
      backgroundColor: '#1062FE',
      color: '#FFFFFF',
      fontFamily: 'IBMPlexSans-Medium',
      fontSize: 16,
      overflow: 'hidden',
      padding: 4,
      textAlign:'center',
      marginTop: 0,
      borderRadius: 5
    },
    qrCodeDisplay: {
        alignItems: 'center',
        marginTop: 10,
    },

    
    scannerDisplay: {
        alignItems: 'center',
        marginTop: 10,
    },
    scannerCamera: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 40
    },

    deleteButton: {
      backgroundColor: '#da1e28',
      color: '#FFFFFF',
      fontFamily: 'IBMPlexSans-Medium',
      fontSize: 16,
      overflow: 'hidden',
      padding: 6,
      textAlign:'center',
      marginTop: 0,
      borderRadius: 10
    },
     centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },

    eulaBold: {
        fontFamily: 'IBMPlexSans-Medium',
        fontWeight: 'bold',
        color: '#000',
        fontSize: 12,
        paddingTop: 5
    },
    eulaRegular: {
        fontFamily: 'IBMPlexSans-Medium',
        color: '#000',
        fontSize: 12,
        paddingTop: 1
    },

    eulaHeading: {
        fontFamily: 'IBMPlexSans-Medium',
        fontWeight: 'bold',
        color: '#000',
        fontSize: 18,
        paddingTop: 1,
        textAlign: 'center'
    },

    eulaSubHeading: {
        fontFamily: 'IBMPlexSans-Medium',
        fontWeight: 'bold',
        color: '#000',
        fontSize: 14,
        paddingTop: 1,
        paddingBottom: 8,
        textAlign: 'center'
    },


    outerViewHelp: {
       flex: 1,
       flexDirection: 'row',
       //justifyContent: 'space-evenly',
       padding: 0,
       justifyContent: 'center', 
       alignItems: 'center' 
     },
}));


let bShowDebug = false;  // for 

let isScanning = '0';
let lastScannedValue = 'xxxxx';
let enteredQueueCode = '';


class Manager extends Component {

  	constructor(props) {
    	super(props);

	    this.state = {  
	    	bShowManager:'1',
	    	bShowQueueManagement:'0',
	    	bShowQueueAdd:'0',
            query: { type: 'Store', name: '' }, 
            items: [],
            sortedfilteredItems: [], 
            loader: "Loading...",
            bShowLoader: '0',
            bShowHelp: '0',
            bShowHelpButton:'1',
            state: 'unkownn',
            transferStoreItem:{},
            modalActivity: '0',
            bShowQRCode: '0',
            QRCodeValue: '',
            QRCodeName: '',
            bShowScanner: '0',
            bShowBtnReceive: '0',  // hide the button til we get GPS position
            bShowBtnMirror: '0',   // hide the button til we get GPS position
            bShowStoreList: '1',
            bStoreListInitialized: '0',
            bShowMonitor: '0',

            bShowConfirmDialog:'0',
            confirmDialogTitle:'',
            confirmDialogSubtitle:'',

            bShowNav: '0',
            appBarTitle: MSG_SAFE_QUEUES,

            bShowBackdrop: '0',
            backdropSubtitle: '',

            bShowErrorMessage:'0',
            bShowErrorMessageSubtitle:'',
            bShowErrorMessageError:'',

            bShowQRReaderItself:'0',

            bShowHelpMessage:'0',
            helpMessageLine1:'',
            helpMessageLine2:'',
            helpMessageLine3:'',
            helpMessageLine4:'',

            bShowMirror: '0',

            position: '0,0'
	    };

      setLanguage(global.bSpanish ? 'es' : 'en');

  	}


    errorHandler(err) {
	    if(err.code == 1) {
	        alert("Error: Could not get current location!");
	    } else if( err.code == 2) {
	        alert("Error: Position is unavailable!");
	    }
 	}	

  	componentWillMount() {
	    // Handle the Startup..
	    if("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((pos) => {
              //console.log("got a position:" + pos)
              var posstr = pos.coords.latitude + "," + pos.coords.longitude;

              // Need to wait for a user id, which could come from the legacy mybluemix.net storage
              if(global.userID === null) {
                  let timerUserID = setInterval(() => {
                      if(global.userID !== null) {
                          //console.log("Manager.js global.userID: " + global.userID);
                          clearInterval(timerUserID); 

                          this.setState({position: posstr, bShowBtnReceive:'1', bShowBtnMirror:'1'});
                          this.updateStoreList();
                      }
                      else {
                          console.log("Manager.js waiting for global.userID...");
                      }
                  }, 500);
              }
              else {
                  //console.log("Manager.js already has global.userID: " + global.userID);
                  this.setState({position: posstr, bShowBtnReceive:'1', bShowBtnMirror:'1'});
                  this.updateStoreList();
              }
          },
          (error) => {
              if(global.bAllowFakeGPSLocation) {
                  console.log("FAKE GPS");
                  var pos = "33.74850178638623,-118.39797829951722";
                  var pos = "33.759934,-118.394685";  // The Grocery

                  // Need to wait for a user id, which could come from the legacy mybluemix.net storage
                  if(global.userID === null) {
                      let timerUserID = setInterval(() => {
                          if(global.userID !== null) {
                              //console.log("Manager.js global.userID: " + global.userID);
                              clearInterval(timerUserID); 

                              this.setState({position: pos, bShowBtnReceive:'1', bShowBtnMirror:'1'});
                              this.updateStoreList();
                          }
                          else {
                              // if we didn't get a value in the first try, put up dialog
                              //console.log("Manager.js waiting for global.userID...");
                          }
                      }, 500);
                  }
                  else {
                      //console.log("Manager.js already has global.userID: " + global.userID);
                      this.setState({position: pos, bShowBtnReceive:'1', bShowBtnMirror:'1'});
                      this.updateStoreList();
                  }
              }
              else {
                  this.displayErrorMessage(
                      MSG_SAFE_QUEUE_NEEDS_YOUR_GPS_LOCATION,
                      MSG_CHANGE_YOUR_BROWSER_SETTINGS,
                      MSG_YOUR_BROWSER_REPORTED + "'" + error.message + "'"); 
              }
          },
          {enableHighAccuracy: true});
      } 
	    else {
          if(!global.bSpanish)
	           alert("I'm Sorry. You don't have GPS capability or it is turned off." +
	              "Safe Queue needs your location to operate.");
          else 
             alert("Lo seinto, Cola Segura necesita tu ubicación GPS para funcionar.")
	        console.log("GPS Not Available");
	     }
  	}

  	drawBackdrop = () => {
	  	if(this.state.bShowBackdrop === '0')
	      	return;

	    var namestyle = {fontSize:"100%"};

	    return (
	      	<div>
		        <Dialog open={true}  aria-labelledby="form-dialog-title">
		          <DialogTitle id="form-dialog-title" style={{fontSize:"100%"}}>{this.state.bShowBackdrop}</DialogTitle>
		          <DialogContent>
		              <div style={{display:'flex:1',  direction:'column', justifyContent:'space-evenly', alignItems:'center',paddingBottom:16}}>
		              		<div style={{marginBottom:16}}>{this.state.backdropSubtitle}</div>
                      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',paddingBottom:16}}>
                  	     <CircularProgress variant="indeterminate" size={24} color="primary" thickness={4} />
                      </div>
		              </div>
		          </DialogContent>
		        </Dialog>
	      	</div>
    	);
	}

  /*
   * Get all stores for my user id
   *
   */
  	updateStoreList = () => {
      	const payload = {
        	...this.state.query,
          	contact: 'none@none.com',  // this means a store, really
          	userID: global.userID 
      	};

      	searchResilient(payload, payload, (results, payload) => {
          	if(results != null) {
          		this.sortandfilter(results);

          		// mark the ones we are monitoring only
          		for(var i=0; i<results.length; i++) {
          			var st = results[i];

                if((st.monitors === global.userID) && (st.userID !== global.userID))
                    st.bMonitorOnly = '1';
                else
                    st.bMonitorOnly = '0';

                // Mirror is a contact, so has userID and apnsToken
                // NOTE that this may have the value 'none' which happens when a mirror is removed
                var mycontact = global.userID + "][" + global.userID;
                if(st.mirrors === mycontact)
                    st.bMirror = '1';
                else
                    st.bMirror = '0';

                if((st.mirrors !== undefined) && (st.mirrors !== 'none') && (st.mirrors !== ''))
                    st.bHasMirrors = '1';
                else
                    st.bHasMirrors = '0';
          		}

	            var help =  (this.state.sortedfilteredItems.length === 0) ? '1' : '0';
	            this.setState({bShowBackdrop:'0',
	              			      bStoreListInitialized:'1',
	              			      bShowHelp:help,
	              			      bShowHelpButton: (help === '1') ? '0' : '1',
	              	          bShowNav:'1'});
          }
          else {
              alert('Network Error\n\nDatabase search failed.\n[business]');
              this.setState({bShowBackdrop:'0'});
          }
       });
    }

    sortandfilter = (items) => {
      	// Get only stores (that is, no customers in line)
      	var storeItems = new Array();
      	for(var i=0; i<items.length; i++) {
         	var item = items[i];

         	var state = item.state;
         	if(state == null)
            	state = 'dontknow';

	        // a store has contact userID of none@none.com
	        // This is filtered by cloudant, so this check isn't really necessary
	        var userID = getUserIDFromContact(item.contact);
	        if(userID == "none@none.com") {
	              // This is a store
	              // A store has contact of "none@none.com" and not state of 'flagged'
	              if(item.state == 'flagged') {
	                  // This is a user-generated entry of objectionable content
	                  // if this is one of our stores, we should let the manager know...
	                  // TODO: do that
	              }
	              else {
	                  storeItems.push(item);
	              }
	        }
	        else {
	             var theId = item.id || item['_id'];
	             alert('Database Inconsistency\n\nQuery for stores returned a non-Store. ID:\n' + theId);
	        }
    	}
   
      	// Sort these by whenCreated
      	const sorteditems = storeItems.sort((a, b) => {
          var aq = parseInt(a.whenCreated);
          var bq = parseInt(b.whenCreated);
          return aq - bq;
        });
        this.setState({sortedfilteredItems:sorteditems, 
        			   bShowQRCode:'0',
    	               QRCodeName:'',
                       QRCodeValue:''});
	}


	/*
	 * THIS IS EACH ITEM IN THE LIST
	 */
	renderItem = (item, idx) => {
		var classes;

		if(global.materialclasses == null) {
		 	classes = useStyles();
		 	global.materialclasses = classes;
		}
		else
			classes = global.materialclasses;

	    var address = item.description.split('\n');
	    var address0 = address[0];
	    var address1 = "";
	    if(address.length > 1)
	        address1 = address[1];
	    var address2 = "";
    	if(address.length > 2)
    		address2 = address[2];
	  
	    var imageUrl = "";
	    if((item.logo !== undefined) && (item.logo !== "") && (item.logo !== '---')) {
	          const byteCharacters = atob(item.logo);
	          const byteNumbers = new Array(byteCharacters.length);
	          for (let i = 0; i < byteCharacters.length; i++) {
	              byteNumbers[i] = byteCharacters.charCodeAt(i);
	          }
	          const byteArray = new Uint8Array(byteNumbers);
	          let image = new Blob([byteArray], { type: 'image/jpeg' });
	          imageUrl = URL.createObjectURL(image);
	    }

      // contact info
      var contactInfo = '';
      if((item.custom !== undefined) && (item.custom.contactinfo !== undefined))
          contactInfo = item.custom.contactinfo;

	    // Store code is frist 8 characters of the database id
   		var fullid = item.id || item['_id'];
    	var storecode = fullid.substring(0,8);
    	if((item.bMonitorOnly !== undefined) && (item.bMonitorOnly === '1'))
    		  storecode = storecode + " (monitor only)";
      if((item.bMirror !== undefined) && (item.bMirror === '1'))
          storecode = storecode + " (MIRROR)";

	    var isClosed = (item.state ==='closed');

	    var style={width:"98%",marginBottom:2,borderRadius:10,borderColor:'#000000', backgroundColor:'#F1F0EE'}; // gray
	    var textNameStyle      = {textAlign:"left", color:"#000000", textTransform:"none", fontSize:"110%", marginTop:8};
	    var textAddressStyle   = {textAlign:"left", color:"gray",    textTransform:"none", fontSize:"110%", marginTop:-8};
	    var textNameLargeStyle = {textAlign:"left", color:"#000000", textTransform:"none", fontSize:"150%", marginTop:0};
	   	var textStoreCodeStyle = {textAlign:"left", color:"#000000", textTransform:"none", fontSize:"110%", marginTop:0};
      var contactStyle   = {textAlign:"left", color:"gray", textTransform:"none", fontSize:"110%", marginTop:0};

	  	return (
	      	<Button key={idx} variant='outlined' style={style} 
	          	onClick={() => 
	          	{ 
	          		// open up the management screen 
	          		global.itemQueueManagement = item;
	          		this.navigateToQueueManagement()
	          	}}>
	          	<div className={classes.root}>
	                <Grid container spacing={0}>
	                    { imageUrl !== "" &&
	                        <Grid container
	                              direction="column"
	                              justify="flex-start"
	                              alignItems="flex-start"  
	                              xs={9}>
	                                  <img src={imageUrl} width="250" style={{marginTop:8,borderRadius:10}}/>
	                        </Grid>
	                    }
	                    { imageUrl === "" &&
	                        <Grid container
	                            direction="column"
	                            justify="flex-start"
	                            alignItems="flex-start"  
	                            xm={9} xs={9}>
	                                <div style={textNameLargeStyle}><b>{item.name}</b></div>
	                        </Grid>
	                    }
	                    <Grid container 
	                          direction="column"
	                          justify="center"
	                          alignItems="center"  xs={3}>
	                          <Grid item>
                        			<div>{isClosed ? MSG_CLOSED : MSG_OPEN}</div>
	                          </Grid>
	                    </Grid>
	                    <Grid container
	                          direction="column"
	                          justify="flex-start"
	                          alignItems="flex-start"
	                          xs={9}>
	                              { imageUrl != "" &&
	                                  <div style={textNameStyle}><b>{item.name}</b></div>
	                              }
	                              <div style={textAddressStyle}>{address0}</div>
	                              <div style={textAddressStyle}>{address1}</div>
 								                { address2 != "" &&
                              	  	<div style={textAddressStyle}>{address2}</div>
                          	  	}	  
                                { contactInfo !== '' &&
                                  <div style={contactStyle}><b>Contact: </b>{contactInfo}</div>
                                }                            
                          	  	<div style={textStoreCodeStyle}>{storecode}</div>
                              
	                              { bShowDebug === true && <div style={textAddressStyle}>{this.state.debugString}</div> }
	                    </Grid>
	                    <Grid container
	                          direction="row"
	                          justify="center"
	                          alignItems="center" 
	                          xs={3} xm={3}>
	                          	<div>
	                          	<div style={{marginTop:6,marginBottom:-10,textTransform:'none'}}>{BTN_EXPORT}</div>
	                          	<Button onClick={(e) => { this.showTransferCode(item); e.stopPropagation();}}>
	                          		<img src={img_share} width="50" style={{marginTop:0}}/>
                        		</Button>
                        		</div>
	                    </Grid>
	                </Grid>
	          </div>
	      </Button>
	    );
	}


drawBtnCreate = () => {	
	if(this.state.bShowStoreList === '0')
		return;

	var style={width:"98%",marginTop:16,borderRadius:10,borderColor:'#000000', backgroundColor:'#7030a0'};

	return (
		<div>
	  	<div style={{marginTop:16,marginBotton:8,fontSize:"130%"}}><b>{MSG_WELCOME}</b></div>
        <div style={styles.openingText}>{MSG_CREATE_A_SAFE_QUEUE}</div>
        <div style={styles.openingTextLight}>{MSG_ONCE_CREATED}</div>
 
 		{ false && 
	        <Button style={style} onClick={() => this.navigateToQueueAdd() }>
	            <div style={{color:'#FFFFFF'}}>Create your first Safe Queue</div>
	        </Button>
    	}
        </div>
    );
}

drawBtnReceive = () => {
  	if(this.state.bShowBtnReceive === '0')
  		return;

  	return (
      	<div>
            <Grid container 
                direction="row"
                justify="center"
                alignItems="space-between">
                <Grid item xs={6}>
                    <div style={{marginTop:8}}>{BTN_IMPORT_A_SAFE_QUEUE}</div>
                    <Button style={{marginTop:-8}} onClick={(e) => { this.scanQueueCode(); e.stopPropagation();}}>
                        <img src={img_receive} width="60" style={{marginTop:6,marginTop:6}}/>
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <div style={{marginTop:8}}>Mirror a Safe Queue:</div>
                    <Button style={{marginTop:-8}} onClick={(e) => { this.mirrorQueueCode(); e.stopPropagation();}}>
                        <img src={img_mirror} width="90" style={{marginTop:6,marginTop:6}}/>
                    </Button>
                </Grid>
            </Grid>
  		</div>
    );
}



/*
 * Enter a queue code to monitor
 *
 * NOT IMPLMENTED YET.  
 *
 * AT THIS TIME, THE DEVICE THAT CREATES A SAFE QUEUE IS AUTOMATICALLY A MONITOR OF THE QUEUE.
 * Perhaps in the future, we'll allow multiple monitor and so will need this code below.
 *
 */
drawMonitor = () => {
    if(this.state.bShowMonitor === '0')
        return;

    const handleChange = (event) => {
    	enteredQueueCode = event.target.value;
    }

    const handleCodeInput = () => {
    	if(enteredQueueCode === '')
    		return;
        this.onMonitorSuccess(enteredQueueCode);   // simulate a scan event with the typed-in data
    }

    var style={width:"98%",marginBottom:8,borderRadius:10,borderColor:'#000000', backgroundColor:'#7030a0'};
    var stylesmall={width:"30%",height:'40', marginLeft:8,marginTop:10,borderRadius:10,borderColor:'#000000', backgroundColor:'#7030a0'};
    var delstyle={width:"98%",marginBottom:8,marginTop:8,borderRadius:10,borderColor:'#000000', backgroundColor:'#da1e28'};

    return (
        <div>           
            <div style={{marginTop:8}}><b>Enter a Queue Code:</b></div>
               <TextField style={{width:'65%'}}
		            margin="dense"
		            variant="outlined"
		            placeholder="e.g. b1678909"
		            id="storecode"
		            onChange={handleChange}
		            fullWidth
	            />

            <Button style={stylesmall} onClick={handleCodeInput} > 
                <div style={{color:'#FFFFFF',fontSize:'100%',padding:0}}>Enter</div>
            </Button>
        	
            <Button style={delstyle} onClick={this.monitorQueueCodeCancel} > 
                <div style={{color:'#FFFFFF',fontSize:'100%',padding:6}}>Cancel</div>
            </Button>
        </div>
    ); 
}


// enter a queue code for Monitor
onMonitorSuccess = (data) => {
	if(data != null) {
        console.log("monitor got " + data);

    	this.monitorQueueCodeCancel(); // closes everything
    	this.handleMonitor(data);
    }

}

monitorQueueCode = () => {
	this.setState({bShowMonitor:'1',
    	           bShowBtnReceive:'0',
    	           bShowHelp:'0',
    	           bShowHelpButton:'0',
    	           bShowStoreList:'0'});
};

monitorQueueCodeCancel = () => {
	isScanning = '0'
	this.setState({bShowMonitor:'0',
    	           bShowBtnReceive:'1',
    	           bShowHelp:'0',
    	           bShowHelpButton:'1',
    	           bShowStoreList:'1'});
};



/*
 * Starts the transfer by looking up the store by queue code and validates it.
 * transferQueueToMe() is called if all check outs.
 */
handleMonitor = (queueCode) => {
   // first find the store
  const payload = {
        ...this.state.query,
          contact: 'none@none.com',  // this means a store, really
          userID:  queueCode         // will be treated as partial id lookup
      };

  this.setState({bShowBackdrop:'Queue Monitor', backdropSubtitle:'Looking...'});
  searchResilient(payload, payload, (results, payload) => {
      if(results != null) {
          if(results.length == 0) {
          	   this.setState({bShowBackdrop:'0'});
          	   this.displayErrorMessage(
                        "Safe Queue Not Found",
                        "The entered code '" + enteredQueueCode + "' does not correspond to a known Safe Queue",
                        "Check the code and try again.");
          }
          else {
              // Found the store, return it
              var name = results[0].name;
              this.monitorQueueCodeCancel();
              this.setState({bShowBackdrop:'0',
              		         transferStoreItem:results[0],
              	             bShowConfirmDialog:'1',
              	             confirmDialogTitle:'Monitor Safe Queue:',
              	             confirmDialogSubtitle:name,
                     		 confirmCallback:this.monitorQueueToMe});
          }
      }
      else {
      	  this.setState({bShowBackdrop:'0'});
          alert('Network Error. Queue lookup failed.\n[business]');
      }
  });
}

/*
 * We support one person monitoring another's Safe Queue
 */   
monitorQueueToMe = () => {
    // Okay, let's do this thing
    var store = this.state.transferStoreItem;
    if(store === '')
    	return;   // this shouldn't happen though

    // Add another monitor person to the queue in database
    this.setState({bShowBackdrop:'Queue Monitor', backdropSubtitle:'Committing...'});

    // comma-seperated list of userIDs
    var monitors = store.monitors;
    if(monitors === undefined) {
    	// no current monitors, so add the first
    	monitors = '';  // empty
    }
    else {
    	monitors = monitors + ',' + global.userID;
    }
    const update = {
      ...store,
         monitors: monitors,
         userID:  global.userID   // my ID
    };

    console.log("UPDATE: " + update);


    return;

    /*

    updateResilient(update, update, (item) => {
        if(item != null) {
            // Great, now get everyone in the queue           

                                if(count === lresults.length) { 
            						this.displayErrorMessage("Import Complete",
						                    		 "You are now managing the Safe Queue for " + storeName, 
						                    		 "There are " + count + " customers in line."); 
            						this.updateStoreList();
                                }
                              
        }
        else {
            alert('Database Error. Failed to transfer the Safe Queue to you.\n[business]\n\n' +
            'This may be due to a network error. Check your connection and try again.'); // , [{text: 'OK'}]);
            this.setState({bShowBackdrop:'0'});
        }
    });  
    */    
}

/*
 * Mirroring a Safe Queue means multiple managers can manage the same Queue.
 * This is primarily to allow one manager to be at a POS machine and another manager to scan customers.
 *
 * It operates this way:
 *    1. Both managers can scan customer QR Codes
 *    2. Both managers receive push notifications (the same one goes to both)
 *    3. A new push notifiation is created to "sync" the manager's devices.  A "sync", when received by
 *       a manager, causes it to refresh the queue state from the server.  The sync is sent in these cases:
 *       - a successful scan on one device will notify the other device(s)
 *       - notifying a customer on one device will notify the other device(s)
 *       - removing a customer from line will notify the other device(s)
 *       - a committed edit or customization change to the queue will notify the other device(s) to sync
 *    4. When customers join a Safe Queue, both managers get a sync. 
 *
 * TODO: "sync" is an asynchronous event, so might be disruptful to the receiving manager as the screen
 *       will change unexpectedly. So far though it looks pretty fast and smooth !
 *       So perhaps it should just put up a Snackbar that allows the receiving manager to do the refresh himself.
 *       Of course, this is really disruptful in the common use case where one device scans a cusotmer, and
 *       the other device(s) sync up. The receiving manager shouldn't have to tap on a button in this case. 
 *
 * TODO: Add the REMOVE a manager's MIRROR capability
 *
 * And there's more:
 *     There's inherently race conditions (like managers changing the same customizations) that have unknown
 *     results.  I think there is the rational assumption that managers are coordinating so we won't have
 *     to deal with odd things like one manager deleting the Queue...
 *
 */

drawMirrorQueue = () => {
    if(this.state.bShowMirror === '0')
        return;

    const handleChange = (event) => {
        enteredQueueCode = event.target.value;
    }

    const handleCodeInput = () => {
        if(enteredQueueCode === '')
            return;
        this.onMirrorSuccess(enteredQueueCode);   // simulate a scan event with the typed-in data
    }

    var style={width:"98%",marginBottom:8,borderRadius:10,borderColor:'#000000', backgroundColor:'#7030a0'};
    var stylesmall={width:"30%",height:'40', marginLeft:8,marginTop:10,borderRadius:10,borderColor:'#000000', backgroundColor:'#7030a0'};
    var delstyle={width:"98%",marginBottom:8,marginTop:8,borderRadius:10,borderColor:'#000000', backgroundColor:'#da1e28'};

    return (
         <div>
            <div style={{width:"98%", marginBottom:8}}><b>{BTN_SCAN_A_QUEUE_CODE}</b></div>
              <QrReader
                  delay={300}
                  facingMode={"environment"}
                  style={{width:"98%",marginLeft:4}}
                  onError={this.onMirrorScanError}
                  onScan={this.onMirrorScanSuccess}
                  showViewFinder={true}
              />
           

            <div style={{marginTop:8}}><b>{BTN_ENTER_A_QUEUE_CODE}</b></div>
               <TextField style={{width:'65%'}}
                margin="dense"
                variant="outlined"
                placeholder="e.g. b1678909"
                id="storecode"
                onChange={handleChange}
                fullWidth
              />

            <Button style={stylesmall} onClick={handleCodeInput} > 
                <div style={{color:'#FFFFFF',fontSize:'100%',padding:0}}>{BTN_ENTER}</div>
            </Button>
          
            <Button style={delstyle} onClick={this.mirrorQueueCodeCancel} > 
                <div style={{color:'#FFFFFF',fontSize:'130%',padding:6}}>{BTN_CANCEL}</div>
            </Button>
        </div>
    ); 
}

// Callback from the scanner for mirroring
onMirrorScanSuccess = (data) => {
    if(data != null) {
        console.log("Mirror Scan got " + data);

        if(data === lastScannedValue)
            return;
        lastScannedValue = data;

        // retire the scanned code after 5 seconds
        setTimeout(function() { lastScannedValue='xxxxxxxx'; }, 5000);

        this.mirrorQueueCodeCancel(); // closes everything
        this.handleMirror(data);
    }
}

onMirrorScanError = (err) => {
    alert("Sorry, unable to use the camera\n\nYou will have to type in the Queue Code.\n\n" + err);
    //this.mirrorQueueCodeCancel();
}


// enter a queue code for Mirroring a Safe Queue
onMirrorSuccess = (data) => {
  if(data != null) {
        console.log("mirror got " + data);

      this.mirrorQueueCodeCancel(); // closes everything
      this.handleMirror(data);
    }

}

mirrorQueueCode = () => {
  this.setState({bShowMirror:'1',
                 bShowBtnReceive:'0',
                 bShowHelp:'0',
                 bShowHelpButton:'0',
                 bShowStoreList:'0'});
};

mirrorQueueCodeCancel = () => {
  isScanning = '0'
  var help =  (this.state.sortedfilteredItems.length === 0) ? '1' : '0';
  this.setState({bShowMirror:'0',
                 bShowBtnReceive:'1',
                 bShowHelp:help,
                 bShowHelpButton:(help === '0') ? '1' : '0',
                 bShowStoreList:'1'});
};



/*
 * Starts the transfer by looking up the store by queue code and validates it.
 * transferQueueToMe() is called if all check outs.
 */
handleMirror = (queueCode) => {
   // first find the store
  const payload = {
        ...this.state.query,
          contact: 'none@none.com',  // this means a store, really
          userID:  queueCode         // will be treated as partial id lookup
      };

  this.setState({bShowBackdrop:'Looking for the queue...', backdropSubtitle:''});
  searchResilient(payload, payload, (results, payload) => {
      if(results != null) {
          if(results.length == 0) {
               this.setState({bShowBackdrop:'0'});
               this.displayErrorMessage(
                        "Safe Queue Not Found",
                        "The entered code '" + enteredQueueCode + "' does not correspond to a known Safe Queue",
                        "Check the code and try again.");
          }
          else {
              // Found the store, return it
              var name = results[0].name;
              this.mirrorQueueCodeCancel();
              this.setState({bShowBackdrop:'0',
                             transferStoreItem:results[0],
                             bShowConfirmDialog:'1',
                             confirmDialogTitle:'Found!  Mirror Safe Queue:',
                             confirmDialogSubtitle:name,
                             confirmCallback:this.mirrorQueueToMe});
          }
      }
      else {
          this.setState({bShowBackdrop:'0'});
          alert('Network Error. Queue lookup failed.\n[business]');
      }
  });
}

/*
 * Set up the mirroring in the database
 *
 * The field "mirrors" holds an array of contacta, 
 * each of which is a combination of userID and apnsToken
 *
 * We'll only allow a manager to mirror a queue if they are close enough to join the queue
 * at the time they create the mirror.
 */   
mirrorQueueToMe = () => {
    // Okay, let's do this thing
    var store = this.state.transferStoreItem;
    if(store === undefined) {
        console.log("undefined STORE !!!!")
    }

    if(store === '') {
        console.log("mirrorQueueTome error null store");
        return;   // this shouldn't happen though
    }

    // Make sure we're close enough
    if(!this.closeEnoughToStore(store)) { 
        return;
    }

    // Add another mirror manager to the queue in database
    this.setState({bShowBackdrop:'Saving...', backdropSubtitle:''});

    // my contact is userID and apnsToken=userID
    var myContact = createContact(global.userID, global.userID);  // TODO: Update for FCM notifications

    // add this to current list of mirrors  (TODO: test more than 1 mirror!)
    // JUST ONE FOR NOW
    // I haven't figured out how to do a search thru an array in cloudant!!!
    /*
    var newMirrors = new Array();
    if(store.mirrors !== undefined)
        newMirrors = store.mirrors;
    newMirrors.push(myContact);
    */
    var newMirrors = myContact;

    const update = {
        ...store,
        logo:'', // don't update the logo
        mirrors: newMirrors
    };

    //console.log("UPDATE: " + JSON.stringify(update));

    updateResilient(update, update, (item) => {
        if(item != null) {
            this.updateStoreList();

            // let the owner of the queue know
            this.syncStore(store.userID);  // userID is the owner
        }
        else {
            alert('Database Error. Failed to sync after mirror creation.\n[business]\n\n' +
            'This may be due to a network error. Check your connection and try again.'); // , [{text: 'OK'}]);
        }

        this.setState({bShowBackdrop:'0'})
    });   
}


// returns false if not close enough
closeEnoughToStore = (store) => {
    // Make sure we're close enough
    var radius  = 1000;  // in feet
    if((store.custom !== undefined) && (store.custom.radius !== undefined))
        radius = store.custom.radius; 
    var radiusM = (radius * 304.8)/1000;
    var distM = this.distanceBetweenInMeters(store.location, this.state.position);
    if(distM > radiusM) {
        var distance = radius + " feet.";
        if((store.units !== undefined) && (store.units === 'm')) 
            distance = radiusM + " m.";

        this.displayErrorMessage("Sorry...",
            "You are too far away from " + store.name + " to manage this queue.",
            "You must be within " + distance); 
        return false;
    }
    return true;
}

/*
 * send the push to the store passed in, this is for SYNC ONLY
 *
 * This assumes store's apnsToken is the userID
 */
syncStore = (storeID) => {
    var token  = storeID; 
    var payload = {title: "sync", body: "", payload: {type: global.notificationSync, nickname: '', userid: ''}};
    var spayload = JSON.stringify(payload);
    var spayload64 = Buffer.from(spayload, 'binary').toString('base64');

    //console.log("SYNC to: " + token + "  PAYLOAD: " + spayload);

    pushResilient(token, spayload64, "silent.wav", (response) => {
        if(response != null) {
            if(response.result == 'SUCCESS') {
                console.log('Sync has been sent.');
            }
            else {
                 // The notification failed, but the database may still have been updated
                 // TODO: take out this alert as it is only useful in debugging
                 //Alert.alert("Notification Failed", 'Reported error:\n' + response.result);
            }
        }
        else {
            // Well, there's really nothing to be done here
            // Network errors are almost always caught before we get here. It is a small window
            // so just let it go silently
            //Alert.alert('Network Error', "Notification failed after two retries. Please check your network connection and try again.", [{text: 'OK'}]);
        }
    });
}


distanceBetweenInMeters = (a, b) => {
    var arr = a.split(',');
    var lat1 = arr[0];
    var lon1 = arr[1];

    var arrme = b.split(',');
    var lat1me = arrme[0];
    var lon1me = arrme[1];

    var distance = this.getDistanceFromLatLonInKm(lat1,lon1,lat1me,lon1me);
    return distance * 1000;
}

getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

deg2rad(deg) {
  return deg * (Math.PI/180)
}


// Scan a queue to import
drawScanner = () => {
    if(this.state.bShowScanner === '0')
        return;

    const handleChange = (event) => {
    	enteredQueueCode = event.target.value;
    }

    const handleCodeInput = () => {
    	  if(enteredQueueCode === '')
    		    return;
        this.onScanSuccess(enteredQueueCode);   // simulate a scan event with the typed-in data
    }

    var style={width:"98%",marginBottom:8,borderRadius:10,borderColor:'#000000', backgroundColor:'#7030a0'};
    var stylesmall={width:"30%",height:'40', marginLeft:8,marginTop:10,borderRadius:10,borderColor:'#000000', backgroundColor:'#7030a0'};
    var delstyle={width:"98%",marginBottom:8,marginTop:8,borderRadius:10,borderColor:'#000000', backgroundColor:'#da1e28'};

    return (
        <div>
            <div style={{width:"98%", marginBottom:8}}><b>{BTN_SCAN_A_QUEUE_CODE}</b></div>
            {this.state.bShowQRReaderItself !== '0' &&
	            <QrReader
	                delay={300}
                  facingMode={"environment"}
	                style={{width:"98%",marginLeft:4}}
	                onError={this.onScanError}
	                onScan={this.onScanSuccess}
	                showViewFinder={true}
	            />
       		 }

            <div style={{marginTop:8}}><b>{BTN_ENTER_A_QUEUE_CODE}</b></div>
               <TextField style={{width:'65%'}}
		            margin="dense"
		            variant="outlined"
		            placeholder="e.g. b1678909"
		            id="storecode"
		            onChange={handleChange}
		            fullWidth
	            />

            <Button style={stylesmall} onClick={handleCodeInput} > 
                <div style={{color:'#FFFFFF',fontSize:'100%',padding:0}}>{BTN_ENTER}</div>
            </Button>
        	
            <Button style={delstyle} onClick={this.scanQueueCodeCancel} > 
                <div style={{color:'#FFFFFF',fontSize:'130%',padding:6}}>{BTN_CANCEL}</div>
            </Button>
        </div>
    ); 
}



drawTransferDialog = () => {
    if(this.state.bShowQRCode === '0')
      return;

    const handleCancel = () => {
        this.setState({bShowQRCode:'0'});
        this.updateStoreList();
    };

    return (
      <div>
        <Dialog open={true} onClose={handleCancel} aria-labelledby="form-dialog-title">
          	<DialogTitle id="form-dialog-title">{MSG_EXPORT_SAFE_QUEUE}</DialogTitle>
          	<DialogContent>
            	<DialogContentText>
               		{this.state.QRCodeName} 
            	</DialogContentText>

            	<div style={{display: 'flex:1',  direction:'column', justifyContent:'space-evenly', alignItems:'center'}}>
	             	<QRCode
		               value={this.state.QRCodeValue}
		               size={180}
		               color="black"
		            />
		            <div style={{fontSize:'90%'}}><b>{this.state.QRCodeValue}</b></div>
					<div style={{fontSize:'90%'}}>{MSG_THIS_IS_USED_TO_TRANSFER}</div>
	                <div style={{fontSize:'90%'}}>{MSG_THE_NEW_MANAGER_TAPS_ON}</div>
                </div>
            </DialogContent>
          	<DialogActions>
	            <Button onClick={handleCancel} color="primary">
	              {BTN_CLOSE}
	            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}


/*
 * We support one employee taking over management of a line,
 * essentially by transferring the queue (and those in line) over
 * to another employee.
 *
 * This is done by "queue code" visible to the user. The employee
 * give the queue code to another employee and once he starts
 * managing the queue (by getting here!) we must move the following:
 *
 * 1. Push Token, so the new employee gets the notifications after transfer
 * 2. userID of store, must move to the new employee
 * 3. the userID of every person in line, must move to the new employee
 *
 * TODO: 3 is a bit of a kluge, as it essentially is a store ID, used
 *       to find who is in line.
 *
 * TODO: this is missing transactional integrity, should an error occur 
 *       during the multiple database operations.
 *       This is a good candidate to move to server side, in the case where
 *       the mobile device is disconnected and the server could still
 *       complete the transaction.
 */   
transferQueueToMe = () => {
    // Okay, let's do this thing
    var store = this.state.transferStoreItem;
    if(store === '')
    	return;   // this shouldn't happen though

    // Make sure we're close enough
    if(!this.closeEnoughToStore(store))
        return;

    // First, update the APN Token and usedID to me
    this.setState({bShowBackdrop:'Importing...', backdropSubtitle:''});
    var oldUserId = store.userID;
    var storeName = store.name;   // TODO: don't use name for equality
    var newcontact = createContact('none@none.com', global.userID);  // my userID is my apnToken
    const update = {
      ...store,
        contact: newcontact,       // my APNS
        monitors: store.monitors,  // retain monitors
        userID:  global.userID     // my ID
    };

    updateResilient(update, update, (item) => {
        if(item != null) {
            /*
             * Great, now get everyone in the queue to move to the new manager
             */
            const payload = {
              ...this.state.query,
                name: storeName,     // just this store
                userID: oldUserId    // this is the userid used for customers in line
            };
            searchResilient(payload, payload, (iresults, payload) => {
            	// we will also get anyone also monitoring the queue, so remove them
            	var lresults = new Array();
            	for(var j=0; j<iresults.length; j++) {
            		  var mitem = iresults[j];
            		  var theID = getUserIDFromContact(mitem.contact);
	        		    if(theID !== "none@none.com")  // this would be a store being monitoring
	        			      lresults.push(mitem);
            	}

                if(lresults != null) {
                    // Update every item to have our userID (so it is found in a search)
                    if(lresults.length == 0) { 
                    	this.displayErrorMessage("Import Complete",
                    		 "You are now managing the Safe Queue for " + storeName,
                    		 "There are no customers in line."); 
                    	this.updateStoreList();
                    }
                    else {

                    	//console.log("RESULTS: " + JSON.stringify(lresults));

                    	this.setState({backdropSubtitle:'Customer (1)'});
                        var count = 0;         // total number
                        var countInline = 0;   // number in line
                        var countWaiting = 0;  // number waiting to auto-join
                        for(var i=0; i<lresults.length; i++) {
                            var titem = lresults[i];

                            // this is someone in the target line
                            // update it with my user ID
                            const payload = {
                              ...this.state.query,
                                id: titem.id || titem['_id'],   // just this store
                                userID: global.userID,                // this IS the new userID
                            };

                            updateResilient(payload, payload, (item) => {
                                count++;
                                if(item == null) {
                                    alert('Database Error. Failed to transfer the Safe Queue to you.\n[business]\n\n' +
                                    'This may be due to a network error. Check your connection and try again.'); 
                                    return;                                 
                                }

                                /* ARG... for some reason, the state field is always undefined.
                                 *        so the test below doesn't work
                                 *
                                 *  We'll just list the total without qualification
                                 */
                                if((titem.state === 'register') || (titem.state === 'registerjoin'))
                                    countWaiting++;
                                else 
                                    countInline++;

                                if(count === lresults.length) { 
            						            this.displayErrorMessage("Import Complete",
						                    		 "You are now managing the Safe Queue for " + storeName, 
						                    		 "There are " + count + " customers in line or waiting to auto-join."); 
            						             this.updateStoreList();
                                }
                                else {
                                	 var num = count + 1;
                                	 this.setState({backdropSubtitle:"Customer (" + num + ")"});
                                }
                            });
                        }
                    }
                }
                else {
                    alert('Database Error. An error ocurred while transferring the queue.'); //, [{text: 'OK'}]); 
            		this.setState({bShowBackdrop:'0'});
                }
            });
        }
        else {
            alert('Database Error. Failed to transfer the Safe Queue to you.\n[business]\n\n' +
            'This may be due to a network error. Check your connection and try again.'); // , [{text: 'OK'}]);
            this.setState({bShowBackdrop:'0'});
        }
    });      
}


showTransferCode = (props) => {
    var fullid = props.id || props['_id'];
    var newcode = fullid.substring(0,8);
    this.setState({bShowQRCode:'1',
    	           QRCodeName:props.name,
                   QRCodeValue:newcode});
}

hideTransferCode = () => {
	this.updateStoreList();
}

scanQueueCode = () => {
 	isScanning = '1'
	this.setState({bShowScanner:'1',
				         bShowQRReaderItself:'1',
    	           bShowBtnReceive:'0',
    	           bShowHelp:'0',
    	           bShowHelpButton:'0',
    	           bShowStoreList:'0'});
};

scanQueueCodeCancel = () => {
	isScanning = '0'
  var help =  (this.state.sortedfilteredItems.length === 0) ? '1' : '0';
	this.setState({bShowScanner:'0',
				   bShowQRReaderItself:'0',
    	           bShowBtnReceive:'1',
    	           bShowHelp:help,
    	           bShowHelpButton:(help === '0') ? '1' :'0',
    	           bShowStoreList:'1'});
};

/*
 * Callback from the scanner
 */
onScanSuccess = (data) => {
	if(data != null) {
        console.log("Scan got " + data);

        if(data === lastScannedValue)
            return;
        lastScannedValue = data;

        // retire the scanned code after 5 seconds
        setTimeout(function() { lastScannedValue='xxxxxxxx'; }, 5000);

    	this.scanQueueCodeCancel();
    	this.handleTransfer(data);
    }
}

onScanError = (err) => {
    alert("Sorry, unable to use the camera\n\nYou will have to type in the Queue Code.\n\n" + err);
    //this.scanCustomerCancel();
}


/*
 * Starts the transfer by looking up the store by queue code and validates it.
 * transferQueueToMe() is called if all check outs.
 */
handleTransfer = (queueCode) => {
   // first find the store
  const payload = {
        ...this.state.query,
          contact: 'none@none.com',  // this means a store, really
          userID:  queueCode         // will be treated as partial id lookup
      };

  this.setState({bShowBackdrop:'Looking for the queue...', backdropSubtitle:''});
  searchResilient(payload, payload, (results, payload) => {
      if(results != null) {
          if(results.length == 0) {
          	   this.setState({bShowBackdrop:'0'});
          	   this.displayErrorMessage(
                        "Safe Queue Not Found",
                        "The entered code '" + enteredQueueCode + "' does not correspond to a known Safe Queue",
                        "Check the code and try again.");
          }
          else {
              // Found the store, return it
              var name = results[0].name;
              this.scanQueueCodeCancel();
              this.setState({bShowBackdrop:'0',
              		         transferStoreItem:results[0],
              	             bShowConfirmDialog:'1',
              	             confirmDialogTitle:'Found!  Import Safe Queue:',
              	             confirmDialogSubtitle:name,
                     		 confirmCallback:this.transferQueueToMe});
          }
      }
      else {
      	  this.setState({bShowBackdrop:'0'});
          alert('Network Error. Queue lookup failed.\n[business]');
      }
  });
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
          <DialogContent>
              <div style={{fontSize:"120%", marginBottom:16}}>{this.state.confirmDialogTitle}</div>
              <div style={{fontSize:"150%"}}><b>{this.state.confirmDialogSubtitle}</b></div>
          </DialogContent>
          <DialogActions>
             <Button onClick={handleCancel} color="primary">
              {BTN_NO}
            </Button>
            <Button onClick={handleAction} color="primary">
              {BTN_YES}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

drawErrorMessage = () => {
  if(this.state.bShowErrorMessage === '0')
      return;

    var namestyle = {fontSize:"80%"};

    const handleOkay = () => {
        this.setState({bShowErrorMessage:'0'});
    };

     return (
        <div>
          <Dialog open={true}  aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{fontSize:"75%"}}>{this.state.bShowErrorMessage}</DialogTitle>
            <DialogContent>
                 <div>{this.state.bShowErrorMessageSubtitle}</div>
                 <div style={{fontSize:'90%',marginTop:16,marginBottom:16}}>{this.state.bShowErrorMessageError}</div>
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
displayErrorMessage = (title, subtitle, error) => {
   this.setState({bShowErrorMessage:title, bShowErrorMessageSubtitle:subtitle, bShowErrorMessageError:error,
                  });  // doing this separately causes a screen flash
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
            <DialogTitle id="form-dialog-title" style={{fontSize:"75%",color:'#7030a0'}}>{this.state.bShowHelpMessage}</DialogTitle>
            <DialogContent>
                 <div style={textstyle1}>{this.state.helpMessageLine1}</div>
                 <div style={textstyle}>{this.state.helpMessageLine2}</div>
                 <div style={textstyle}>{this.state.helpMessageLine3}</div>
                 <div style={textstyle}>{this.state.helpMessageLine4}</div>

                 <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',paddingBottom:16}}>
	                <Button onClick={handleOkay} color="primary">
	                    {BTN_CLOSE}
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



drawHelpButton = () => {	
	if(this.state.bShowHelpButton === '0')
		return;

	var style={width:"98%",marginTop:16,borderRadius:10,borderColor:'#000000', backgroundColor:'#7030a0'};

	return (
		<div> 
        <Button style={style} onClick={() => this.setState({bShowHelp:'1',bShowHelpButton:'0'}) }>
            <div style={{color:'#FFFFFF'}}>{MSG_HOW_DOES_IT_WORK}</div>
        </Button>
        </div>
    );
}

drawHelp = () => {
	if(this.state.bShowHelp === '0') 
		return;

	const showInfoCreate = () => {
    if(!global.bSpanish) {
    		this.displayHelpMessage("Create a Safe Queue",
        	"Enter a business name, an address and an optional graphic as a business logo. ",

        	"Your Safe Queue exists at a specific GPS location, which is the location you are at right now. " + 
        	"You must be at your business to create a Safe Queue there, which provides greater security for you.",

        	"An address is automatically filled in for you based upon your GPS location. You can edit the address " +
        	"but it will not change your location. Your GPS location is used regardless of the address " +
        	"you enter.",
    		
    		"");
    }
    else {
        this.displayHelpMessage("Crear una cola segura",
          "Introduzca un nombre comercial, una dirección y un gráfico opcional como logotipo comercial.",

          "Su cola segura existe en una ubicación GPS específica, que es la ubicación en la que se encuentra en este momento. " + 
          "Debe estar en su empresa para crear una cola segura allí, que le brinda mayor seguridad.",

          "Una dirección se completa automáticamente según su ubicación GPS. Puede editar la dirección " +
          "pero no cambiará su ubicación. Su ubicación GPS se utiliza independientemente de la dirección " +
          "tu entras.",
        
        "");
    }
  }

	const showInfoOpen = () => {
    if(!global.bSpanish) {
    		this.displayHelpMessage("Safe Queue Open/Close",
        	"Customers can join your Safe Queue only when it is 'open'. A button displays 'QUEUE OPEN' " +
        	"or 'QUEUE CLOSED'. Tap on that button to change it. Your queue starts as closed when it was created.",

        	"Typically, you'll open your queue before your business opens and close it near closing time. " +
        	"Any customers in line when you close are still in line and expect to go in!",

        	"",

        	"");
    }
    else {
        this.displayHelpMessage("Cola Segura Abrir/Cerrar",
          "Los clientes pueden unirse a su cola segura solo cuando está 'abierta'. Un botón muestra 'COLA ABIERTA' " +
          "o 'COLA CERRADA'. Toque ese botón para cambiarlo. Su cola comienza como cerrada cuando se creó.",

          "Normalmente, abrirá la cola antes de que abra su empresa y la cerrará cerca de la hora de cierre." +
          "¡Todos los clientes que estén en la fila cuando cierre todavía estarán en la fila y esperan entrar!",

          "",

          "");
    }
  }

  const showInfoNotify = () => {
      if(!global.bSpanish) {
        	this.displayHelpMessage("Notify a Customer",
        		"Your customers are waiting nearby. When you are ready for one (or more) to come in, " +
        		"you can notify them in one of two ways:",

        		"Tap on the 'NOTIFY NEXT CUSTOMER' button. This will automatically notify whoever is " +
        		"next in line, skipping over customers who have already been notified.",

        		"Tap on any customer entry in the list. This shows actions you can take on that " +
        		"customer regardless of where he is in line. The actions are NOTIFY and REMOVE.",

        		"A customer can optionally enter a 'nickname' which is visible to you in each customer entry. " +
        		"This is for convenience only. The automatically-generated QR Code for each customer is used " +
        		"for identification.");
      }
      else {
          this.displayHelpMessage("Notificar al Cliente",
            "Sus clientes están esperando cerca. Cuando esté listo para que entre uno (o más), " +
            "puede notificarles de dos formas:",

            "Toque el botón 'NOTIFICAR AL PRÓXIMO CLIENTE'. Esto notificará automáticamente a quien sea " +
            "siguiente en la fila, omitiendo los clientes que ya han sido notificados.",

            "Toque cualquier entrada de cliente en la lista. Esto muestra las acciones que puede realizar en ese " +
            " cliente independientemente de dónde se encuentre en la fila. Las acciones son NOTIFICAR y ELIMINAR.",

            "Un cliente puede opcionalmente ingresar un 'apodo' que es visible para usted en cada entrada de cliente. " +
            "Esto es solo por conveniencia. Se utiliza el código QR generado automáticamente para cada cliente " +
            "para identificación.");
      }
  }

  const showInfoQR = () => {
      if(!global.bSpanish) {
        	this.displayHelpMessage("Scan Customer's QR Code",
        		"After you've notified a customer to come in, they will show you their " +
        		"device which has a large QR Code on it.",

        		"You tap on 'SCAN CUSTOMER(S)', which opens up a scanner to scan their code. " + 
        		"It validates that you have notified that customer.", 

        		"Typically you will notify multiple customers. In this case, the scanner will stay " +
        		"open so you can quickly scan them all at entry. You can scan them in any order.",

        		"");
      }
      else {
          this.displayHelpMessage("Escanear el Código QR del Cliente",
            "Una vez que haya notificado a un cliente que ingrese, este le mostrará su " +
            "dispositivo que tiene un código QR grande.",

            "Tocas en 'ESCANEAR CLIENTE (S)', que abre un escáner para escanear su código. " + 
            "Valida que ha notificado a ese cliente", 

            "Normalmente, notificará a varios clientes. En este caso, el escáner permanecerá " +
            "abre para que puedas escanearlos todos rápidamente al entrar. Puede escanearlos en cualquier orden.",

            "");
      }
  }

  const showInfoImport = () => {
      if(!global.bSpanish) {
        	this.displayHelpMessage("Import and Export Safe Queues",
        		"Safe Queues are managed by the device they were created on. However, there are times " +
        		"when management must transfer between employees or devices.",

        		"To easily support this, you can Export your queue to another device in two ways:",

        		"Scan a QR Code. One person taps on 'Export' and it will display a QR Code for the Safe Queue. " +
        		"The other person taps on 'Import' which opens up a scanner to scan the code. Once scanned, the " +
        		"queue is moved between the devices.",

        		"Enter a Queue Code. Every Safe Queue has a unique code that is displayed in the management screens." +
        		" A person can enter that code manually to import the Safe Queue. This is important if you have lost " +
        		"your device or simply don't have it.");
      }
      else {
        this.displayHelpMessage("IImportar y Exportar Colas Seguras",
            "Las Colas Seguras son administradas por el dispositivo en el que se crearon. Sin embargo, hay ocasiones " +
            "cuando la administración debe transferir entre empleados o dispositivos.",

            "Para admitir esto fácilmente, puede exportar su cola a otro dispositivo de dos maneras:",

            "Escanee un código QR. Una persona toca Exportar y se mostrará un código QR para la Cola Segura. " +
            "La otra persona toca 'Importar', lo que abre un escáner para escanear el código. Una vez escaneado, la " +
            "cola se mueve entre los dispositivos.",

            "Introduzca un código de cola. Cada Safe Queue tiene un código único que se muestra en las pantallas de administración. " +
            "Una persona puede ingresar ese código manualmente para importar la Cola Segura. Esto es importante si ha perdido " +
            "su dispositivo o simplemente no lo tiene.");
      }
  }

   const showInfoMirror = () => {
      if(true) { // !global.bSpanish) {
          this.displayHelpMessage("Mirror a Safe Queues",
            "There are times when you may want to have multiple devices managing the same Safe Queue. " +
            "For example, one device could be used for all scan operations, while the other does notifications.",

            "To easily support this, you create a \"mirror\" of a Safe Queue.  This is done by scanning the " +
            " QR Code exported by another device or simply entering in the Queue Code for the Safe Queue you " +
            "want to mirror.",

            "When two devices are mirrored, they both can perform any managmenet function and they both receive " +
            "all notifications from customer activity. The Queue Management display on both devices will be " +
            "automatically synchronized so both managers see the same thing at nearly the same time.",

            "You can divide up the management responsiblities any way you want, since either device can perform " +
            "all functions.  Changes to the Queue customizations and features are also synchronized.");
      }
      else {
       
      }
  }

	var style = {width:"98%",marginTop:20,borderRadius:10,borderColor:'#000000', backgroundColor:'#F1F0EE'}; // gray
	var text   = {textTransform:'none',fontSize:'75%',lineHeight:'100%',textAlign:'left',marginBottom:'8'}; 
 	var number = {marginLeft:0,marginRight:0,fontSize:'130%'};
 	var grid = {marginLeft:8,marginRight:4,fontSize:'130%'};

	return (
      	<Button variant='outlined' style={style} 
          	onClick={() => 
          	{ 
              	this.setState({bShowHelp:'0', bShowHelpButton:'1'});
          	}}>
          	<div>
          		<Grid container style={grid}>
                	<Grid container 
                	 		direction="row"
                             justify="center"
                             alignItems="space-between">
                        <Grid item xs={9}>
                        	<div style={{textTransform:'none',color:'#7030a0',fontSize:'140%'}}>
                          <b>{MSG_HOW_DOES_IT_WORK}</b></div>
                        </Grid>
                        <Grid item xs={3}>
							             <img src={q3} width="60" style={{marginTop:8,borderRadius:10}}/>   
                       	</Grid>
                    </Grid>

                     <Grid container  
                	 		direction="row"
                             justify="flex-start"
                             alignItems="center">

	                    <Grid item xs={1}>
	                          <div style={number}>1.</div>
	                    </Grid>
	                    <Grid item xs={2}>
	                          <div style={{textTransform:'none'}}>{BTN_ADD}</div>
	                    </Grid>
	                    <Grid item xs={7}>
	                          <div style={text}>{MSG_CREATE_YOUR_SAFE_QUEUE_BY_TAPPING}</div>
	                    </Grid>
	                     <Grid item xs={2}>
	                          <Button onClick={(e) => {showInfoCreate(); e.stopPropagation();}}><img src={icon_about} height="25"/></Button>
	                    </Grid>
	                </Grid>

	                <Grid container 
                	 		direction="row"
                             justify="center"
                             alignItems="center">

	                    <Grid item xs={1}>
	                          <div style={number}>2.</div>
	                    </Grid>
	                    <Grid item xs={2}>
	                          <img style={{height:40,marginTop:10}} src={img_signopen} />
	                    </Grid>
	                    <Grid item xs={7}>
	                          <div style={text}>{MSG_OPEN_YOUR_QUEUE}<br />{MSG_YOUR_QUEUE_STARTS_CLOSED}</div>
	                    </Grid>
	                     <Grid item xs={2}>
	                          <Button onClick={(e) => {showInfoOpen(); e.stopPropagation();}}><img src={icon_about} height="25"/></Button>
	                    </Grid>
	                </Grid>

	                <Grid container  
                	 		direction="row"
                             justify="flex-start"
                             alignItems="center">

	                    <Grid item xs={1}>
	                          <div style={number}>3.</div>
	                    </Grid>
	                    <Grid item xs={2}>
	                          <img style={{height:40,marginTop:10}} src={img_sound}/>
	                    </Grid>
	                    <Grid item xs={7}>
	                          <div style={text}>{MSG_WHEN_READY_NOTIFY}</div>
	                    </Grid>
	                     <Grid item xs={2}>
	                          <Button onClick={(e) => {showInfoNotify(); e.stopPropagation();}}><img src={icon_about} height="25"/></Button>
	                    </Grid>
	                </Grid>

	                <Grid container 
                	 		direction="row"
                             justify="flex-start"
                             alignItems="center">

	                    <Grid item xs={1}>
	                          <div style={number}>4.</div>
	                    </Grid>
	                    <Grid item xs={2}>
	                          <img style={{height:40,marginTop:10}} src={img_qrsample}/>
	                    </Grid>
	                    <Grid item xs={7}>
	                          <div style={text}>{MSG_AS_CUSTOMERS_ARRIVE}</div>
	                    </Grid>
	                    <Grid item xs={2}>
	                          <Button onClick={(e) => {showInfoQR(); e.stopPropagation();}}><img src={icon_about} height="25"/></Button>
	                    </Grid>
	                </Grid>
                </Grid>


				        <Grid container  style={{marginTop:20}}
            	 		  direction="column"
                    justify="flex-start"
                    alignItems="flex-start">
	                <Grid item xs={12}>
	                	<div style={{textTransform:'none',color:'#7030a0',fontSize:'110%'}}>
	                	<b>{MSG_YOUR_SAFE_QUEUES_ARE_MANAGED}</b></div>
	                </Grid>
	                <Grid container  
            	 		    direction="row"
                      justify="flex-start"
                      alignItems="center">
                      <Grid item xs={2}>
							             <img src={img_share} width="35" style={{marginTop:2,marginLeft:-20,borderRadius:10}}/>   
                   		</Grid>
                   		<Grid item xs={1}>
							             <img src={img_receive} width="35" style={{marginTop:2,marginLeft:-40,borderRadius:10}}/>   
                   		</Grid>
                      <Grid item xs={7}>
	                		     <div style={{textTransform:'none',fontSize:'100%',lineHeight:'100%',textAlign:'left',marginBottom:'8'}}>
	                		         {MSG_YOU_CAN_IMPORT_AND_EXPORT}</div>
	                	  </Grid>
	                	  <Grid item xs={2}>
                         	 <Button style={{marginLeft:8}} onClick={(e) => {showInfoImport(); e.stopPropagation();}}><img src={icon_about} height="25"/></Button>
                    	</Grid>
                    </Grid>
                </Grid>


                <Grid container  style={{marginTop:20}}
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start">
                  <Grid item xs={12}>
                    <div style={{textTransform:'none',color:'#7030a0',fontSize:'110%'}}>
                    <b>You can also manage the same Safe Queue from multiple devices</b></div>
                  </Grid>
                  <Grid container  
                      direction="row"
                      justify="flex-start"
                      alignItems="center">
                      <Grid item xs={3}>
                           <img src={img_mirror} width="60" style={{marginTop:2,marginLeft:-20,borderRadius:10}}/>   
                      </Grid>
                    
                      <Grid item xs={7}>
                           <div style={{textTransform:'none',fontSize:'100%',lineHeight:'100%',textAlign:'left',marginBottom:'8'}}>
                               You can set up another device to "mirror" a Safe Queue.</div>
                      </Grid>
                      <Grid item xs={2}>
                           <Button style={{marginLeft:8}} onClick={(e) => {showInfoMirror(); e.stopPropagation();}}><img src={icon_about} height="25"/></Button>
                      </Grid>
                    </Grid>
                </Grid>
            </div>
      	</Button>
    );
}



navigateToQueueAdd = () => {
	this.setState({bShowManager:'0',
                   bShowQueueManagement:'0',
                   bShowQueueAdd:'1',
                   appBarTitle: MSG_CREATE_QUEUE});
}


navigateToManager = () => {
	this.setState({bShowManager:'1',
                   bShowQueueManagement:'0',
                   bShowQueueAdd:'0',
                   appBarTitle:MSG_SAFE_QUEUES});

	// Need to reload if the user edited a queue
	if(global.itemQueueManagementChanged) {
		this.setState({bShowBackdrop:'Updating...'});
		this.updateStoreList();
		global.itemQueueManagementChanged = false;
	}
}

navigateToQueueManagement = () => {
	this.setState({bShowManager:'0',
                   bShowQueueManagement:'1',
                   bShowQueueAdd:'0',
                   appBarTitle:TTL_QUEUE_MANAGEMENT});
}


drawNavigation = () => {
	if(this.state.bShowNav === '0')
		return 

	return (
		<ons-toolbar style={{display: 'flex:1', justifyContent:'flex-start', alignItems:'center', backgroundColor:'#7030a0'}}>
			<div class="left">
				{ ((this.state.bShowQueueAdd === '1') || (this.state.bShowQueueManagement === '1')) &&
					<div>
					<Button style={{textTransform:'none',fontSize:'110%',color:'#FFFFFF',paddingRight:40}}
		   	    		onClick={() => { this.navigateToManager(); }}>
		   				{BTN_BACK}
		   			</Button>
		   				
		   			</div>					
		   		}
		   		
			</div>
			<div class="center">
				{ this.state.bShowQueueManagement === '1' &&
					<Typography variant="title" style={{fontSize:'120%',color:'#FFFFFF'}}>
          					{this.state.appBarTitle}
        			</Typography>		
    			}
    			{ this.state.bShowQueueManagement !== '1' &&
					<Typography variant="title" style={{fontSize:'120%',color:'#FFFFFF'}}>
          					{this.state.appBarTitle}
        			</Typography>		
    			}				 
    		 </div>
			 <div class="right">
			 	{ this.state.bShowManager === '1' &&
					<Button style={{textTransform:'none',fontSize:'110%',color:'#FFFFFF'}}
			   	    		onClick={() => { this.navigateToQueueAdd(); }}>
			   			{BTN_ADD}
			   		</Button>
		   		}					  
		   	</div>
        </ons-toolbar>
    )
}


/*
 *  This is the entire screen
 */
render () {

  var splash = logo_safequeue;
  if(global.bSpanish)
      splash = logo_safequeue_es;

  var offsetAtTop = 54;
  if(isAndroid && isMobile)
      offsetAtTop = 60;

	return (
    <div>
        { this.drawNavigation() }
        { this.drawConfimDialog() }
        { this.drawErrorMessage()}
        { this.drawHelpMessage() }

			  <Ons.Page contentStyle={{padding: 0, maxWidth:414, display: 'block', marginLeft:'auto', marginRight:'auto'}}>
				{ this.state.bShowManager === '1' && 
		        <div className="App">

						{ this.state.bStoreListInitialized !== '0' &&
			          <div style={{height:offsetAtTop,backgroundColor:'#F1F0EE'}}></div>
			      }

						{ this.state.bStoreListInitialized === '0' &&
						    // This is here because the screen gets drawn before we know what to draw
						    // So just show something that isn't wrong, til we find out and redraw	
						    <div>
						    	  { this.drawBackdrop() }

						    	  <div>
			                  <img src={splash} style={{maxWidth:414,width:"100%", height:"100%",position:'absolute', marginLeft:"-50%"}}/>
			              </div>
					          <Ons.Button modifier="large--quiet" 
				                style={{color:"#FFFFFF"}} onClick={() => {  }}>

                        { global.userID !== null && 
				                    <div>{MSG_FINDING_YOUR_QUEUES}</div>
                        }
                        { global.userID === null && 
                            <div>Validating User ID ...</div>
                        }

				                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
				                    <Spinner name="circle" color="white" />
				                </div>
					          </Ons.Button>
				        </div>
						}
						{ this.state.bStoreListInitialized !== '0' && this.state.sortedfilteredItems.length > 0 &&
							  <div>
				            { this.drawBackdrop() }
				       
				            { this.state.bShowStoreList !== '0' &&
				            	<PlainList
				                    list={this.state.sortedfilteredItems}
				                    renderItem={this.renderItem}
				                    wrapperHtmlTag="div"
				                    // any html props for div tag
				                    id="my-container-manager"
				                    style={{background: '#F1F0EE' /*"#7030A0"*/}}
				                    onMouseOver={this.mouseOverHandler} // will attach events
				                    ref={this.containerRef} // will forward ref
				                />
				            }
				            			
				            { this.drawScanner() }
				            { this.drawMonitor() }
					          { this.drawHelp() }
					          { this.drawHelpButton() }	            
				            { this.drawBtnReceive() }
                    { this.drawMirrorQueue() }
				            { this.drawTransferDialog() }
				        </div>
						}
						{ this.state.bStoreListInitialized !== '0' && this.state.sortedfilteredItems.length == 0 &&
				  			// no queues found
				  			<div>
				            { this.drawBackdrop() }
				            { this.drawBtnCreate() }
				            { this.drawHelp() }
				            { this.drawHelpButton() }
				            { this.drawScanner() }
				            { this.drawMonitor() }
				            { this.drawBtnReceive() }
                    { this.drawMirrorQueue() }
				            { this.drawTransferDialog() }
					       </div>
					  }
					  </div>
				}

			  { this.state.bShowQueueManagement === '1' && 
			    	<QueueManagement />
	      }

	      { this.state.bShowQueueAdd === '1' && 
			    	<QueueAdd />
	      }

			  </Ons.Page>
    </div>
	);
}
}
 
export default Manager;