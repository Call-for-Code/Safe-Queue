import React, { Component, StyleSheet } from 'react';
 
import '../App.css';

import Manager  from '../screens/Manager';

import { updateResilient, pushResilient, removeResilient, searchResilient, addResilient, sendPush } from '../lib/utils'
import { getUserIDFromContact, getAPNTokenFromContact, getData, storeData } from '../lib/utils'
import { getStateFromState, getValueFromState, setValueForState, createContact } from '../lib/utils'
import { returnToManager, returnToCustomer, playSpeechFromText } from '../lib/utils'

import MuiPhoneNumber from 'material-ui-phone-number';

import {DisplayMapClass} from './HereMap';


//import Moment from 'react-moment';
//import 'moment-timezone';
import moment from 'moment';

import QRCode from 'qrcode.react';
import {
  // isBrowser,
  isMobile,
  //isChrome,
  isIOS,
  isSafari,
  isAndroid
} from "react-device-detect";

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import icon_about from '../images/abouticon.png';
import icon_about_black from '../images/abouticon_black.png';
import btn_play from '../images/playbutton.png';
import btn_edit from '../images/btnedit.png';
import btn_chevronDown from '../images/chevrondown.png';
import btn_chevronRight from '../images/chevronright.png';

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import Spinner from 'react-spinkit';

//import QrReader from 'react-qr-reader'  // fails on S20 (and S10?)
//import QrReader from 'react-qr-scanner' // doesn't fis S20 bug
//import QrReader from 'eth-qr-scanner'   // fixes S20 bug, but only detects Ethereum QR Codes !!!!
import QrReader from 'dave-qr-reader'     // fixes S20 bug in react-qr-reader (started from github issue "fixed samsung multiple cameras #154")


import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import * as Ons from 'react-onsenui'; // Import everything and use it as 'Ons.Page', 'Ons.Button'


import logo_safequeue from '../images/safequeue_splash.png';
import mappin from '../images/mappin.png';

import img_receive    from '../images/icon_receive.png';
import img_share      from '../images/icon_share.png'; 
import img_signclosed from '../images/signclosed.png';
import img_signclosed_es from '../images/signclosed_es.png';
import img_signopen   from '../images/signopen.png';
import img_signopen_es from '../images/signopen_es.png';

import icon_warning from '../images/warning.png';
import icon_good    from '../images/good.png';

import sound_beep1   from '../raw/beep1.wav';
import sound_beep2   from '../raw/beep2.wav';

import sound_shortbeep   from '../raw/shortbeep.wav';


import PlainList from 'flatlist-react';


/*
 * Simple translation to spanish
 */
var MSG_THE_LINE_HAS_MOVED
var MSG_YOU_ARE_NOW_FOURTH
var MSG_YOU_ARE_NOW_THIRD
var MSG_YOU_ARE_NOW_SECOND
var MSG_YOU_ARE_NOW_NEXT
var TTL_QUEUE_MANAGEMENT
var BTN_PRINTABLE_QR_CODE
var MSG_THERE_IS_NO_ONE_INLINE
var MSG_THERE_IS_ONE_INLINE
var MSG_CUSTOMERS_INLINE
var BTN_EDIT_THIS_QUEUE
var BTN_DELETE_THIS_QUEUE
var BTN_ADD_STANDEE
var BTN_ADD_PICKUP

var MSG_ADDING_STANDEE
var TTL_STANDEES
var TTL_STANDEE
var HELP_STANDEE1
var HELP_STANDEE2
var HELP_STANDEE3
var HELP_STANDEE4
var MSG_STANDEE_IS_NEXT

var TTL_BUSINESS_NAME
var TTL_BUSINESS_ADDRESS
var TTL_CONTACT_INFO

var TTL_NOTIFICATIONS

var MSG_PERSONS_IN_QUEUE_CANT_BE_DELETED
var MSG_PERSONE_IN_QUEUE_CANT_BE_EDITED

var MSG_SORRY
var MSG_PERSONS_IN_QUEUE_CANT_BE_EDITED
var MSG_QUEUE_IS_OPEN_CANT_BE_EDITED
var MSG_YOUR_QUEUE_MUST_BE_EMPTY

var BTN_SAVE_CHANGES
var BTN_SAVE
var BTN_CANCEL
var BTN_CLOSE
var BTN_NOTIFY
var BTN_REMOVE
var BTN_YES
var BTN_NO

var BTN_NOTIFY_NEXT_CUSTOMER
var BTN_SCAN_CUSTOMER

var MSG_DELETING

var MSG_NOTYET
var MSG_CUSTOMER_IS_STILL_NUMBER
var MSG_IN_LINE
var MSG_YOW

var MSG_SCAN_ENTRANCE_CODE
var MSG_THANK_YOU_FOR_USING_SAFE_QUEUE
var MSG_HAVE_A_SAFE_DAY

var BTN_REFRESH
var MSG_CUSTOMER_NOT_AT_THIS_STORE

var MSG_ACTIONS_FOR

var MSG_REMOVING
var MSG_NOTIFYING
var MSG_NOTIFIED
var MSG_NOTIFIED_AT
var MSG_IT_IS_YOUR_TURN

var MSG_OPEN_THE_QUEUE
var MSG_ARE_YOU_SURE_YOU_WANT_TO_OPEN
var MSG_CLOSE_THE_QUEUE
var MSG_ARE_YOU_SURE_YOU_WANT_TO_CLOSE
var MSG_OPENING_THE_QUEUE
var MSG_CLOSING_THE_QUEUE

var MSG_ARE_YOU_SURE_YOU_WANT_TO_DELETE

var MSG_GO_TO_THE_ENTRACE
var MSG_REGISTERED_TO_AUTOMATICALLY_JOIN

var MSG_A_DIRECT_LINK
var MSG_CUSTOMERS_SCAN_THIS_CODE

var BTN_ADD_BUSINESS_LOGO

var MSG_SAFE_QUEUE_NEEDS_YOUR_GPS_LOCATION
var MSG_CHANGE_YOUR_BROWSER_SETTINGS
var MSG_YOUR_BROWSER_REPORTED

var MSG_YOU_CAN_ALSO_RECEIVE_TEXT_MESSAGES
var TTL_PHONE_NUMBER
var MSG_SOMEONE_HAS_JOINED

var BTN_QUEUE_LINKS
var TTL_QUEUE_LINKS 

var LBL_ORDER_PICKUP
var LBL_STANDEE

var BTN_SHOW_QUEUE_CUSTOMIZATION
var BTN_HIDE_QUEUE_CUSTOMIZATION

const setLanguage = (lang) => {

    var bSpanish = (lang === 'es') ? true : false;

    TTL_QUEUE_MANAGEMENT = !bSpanish ? "Queue Management" : "Gestión de Colas";

    MSG_THE_LINE_HAS_MOVED = !bSpanish ? "The line has changed."       : "La cola se ha movido";
    MSG_YOU_ARE_NOW_FOURTH = !bSpanish ? "You are now fourth in line!" : "¡Usted es ahora el cuarto en la cola!";
    MSG_YOU_ARE_NOW_THIRD  = !bSpanish ? "You are now third in line!"  : "¡Usted es ahora el tercero en la cola!";
    MSG_YOU_ARE_NOW_SECOND = !bSpanish ? "You are now second in line!" : "¡Usted es ahora el segundo en la cola!";
    MSG_YOU_ARE_NOW_NEXT   = !bSpanish ? "You are next in line!"       : "¡Usted es ahora el siguiente en la cola!";

    BTN_PRINTABLE_QR_CODE = !bSpanish ? "Printable QR Code" : "Código QR para imprimir";

    BTN_QUEUE_LINKS = !bSpanish ? "QUEUE LINKS" : "LINKS DE COLA";
    TTL_QUEUE_LINKS = !bSpanish ? "Safe Queue Links" : "Links de Cola Segura";

    MSG_THERE_IS_NO_ONE_INLINE = !bSpanish ? "There is no one in line." : "No hay nadie en la cola.";
    MSG_THERE_IS_ONE_INLINE = !bSpanish ? "1 customer in line:" : "Un cliente en la cola:"
    MSG_CUSTOMERS_INLINE = !bSpanish ? "customers in line:" : "clientes en la cola:";

    BTN_EDIT_THIS_QUEUE = !bSpanish ? "Edit this Queue" : "Editar esta cola";
    BTN_DELETE_THIS_QUEUE = !bSpanish ? "Delete this Queue" : "Eliminar esta cola";

    BTN_ADD_STANDEE = !bSpanish ? "Add Standee Here" : "Añada persona en la cola física.";
    BTN_ADD_PICKUP  = !bSpanish ? "Add New Pick-Up"  : "Agregar nueva recogida"
    BTN_NOTIFY = !bSpanish ? "Notify" : "Notificar";
    BTN_REMOVE = !bSpanish ? "Remove" : "Eliminar";

    LBL_ORDER_PICKUP = !bSpanish ? "Order Pick-up" : "Recogida de Pedidos";
    LBL_STANDEE = !bSpanish ? "Standees" : "Esperes";


    BTN_SHOW_QUEUE_CUSTOMIZATION = !bSpanish ? "Show Queue Customization" : "Mostrar personalización de Cola";
    BTN_HIDE_QUEUE_CUSTOMIZATION = !bSpanish ? "Hide Queue Customization" : "Esconder personalización de Cola";


    MSG_ACTIONS_FOR = !bSpanish ? "Actions for" : "Acciónes para";

    TTL_STANDEES = !bSpanish ? "Standees" : "Esperes";
    TTL_STANDEE = !bSpanish ? "Standee" : "Espere";
    MSG_STANDEE_IS_NEXT = !bSpanish ? "A standee is next." : "Una persona en la cola física es el siguiente."
    HELP_STANDEE1 = !bSpanish ? 
        "'Standees' are customers who are unable to join the Safe Queue and so must wait in a physical line." : 
        "Son clientes que no pueden unirse a Safe Queue y, por lo tanto, deben esperar en una línea física";
    HELP_STANDEE2 = !bSpanish ?
        "As manager, you can enter these standees into the Safe Queue list when they arrive " +
        "so they appear in a combined list of all customers in the Safe Queue." :
        "Como administrador, puede ingresar a estos participantes en la lista de Safe Queue cuando" +
        "lleguen para que aparezcan en una lista combinada de todos los clientes de la cola segura.";
    HELP_STANDEE3 = !bSpanish ?
        "Each standee is assigned a number, though they should be in order in the physical line." :
        "A cada persona de pie se le asigna un número, aunque debe estar en orden en la línea física.";
    HELP_STANDEE4 = !bSpanish ?
        "Since standees have no device, you simply remove them from the list when they go into the business." :
        "Dado que las personas de pie no tienen dispositivo, simplemente elimínelas de la lista cuando ingresen al negocio.";

    TTL_NOTIFICATIONS = !bSpanish ? "notifications" : "notificaciones";

    MSG_PERSONS_IN_QUEUE_CANT_BE_DELETED = !bSpanish ?
    "Sorry...\n\nThere are persons in the queue, so it can't be deleted." :
    "Hay personas en la cola, por lo que no se puede [deleted]."

    MSG_SORRY = !bSpanish ? "Sorry..." : "";
    MSG_PERSONS_IN_QUEUE_CANT_BE_EDITED = !bSpanish ?
      "There are persons in the queue, so it can't be edited." :
      "Hay personas en la cola, por lo que no se puede editar.";
    MSG_QUEUE_IS_OPEN_CANT_BE_EDITED = !bSpanish ?
      "The queue is open, so it can't be edited." :
      "La cola está abierta, por lo que no se puede editar.";
    MSG_YOUR_QUEUE_MUST_BE_EMPTY = !bSpanish ?
      "Your queue must be empty and closed to edit." : 
      "Su cola debe estar vacía y cerrada para editar.";

    BTN_SAVE_CHANGES = !bSpanish ? "Save Changes" : "Guardar cambios";
    BTN_SAVE   = !bSpanish ? "Save" : "Guardar";  // NEEDS TRANSLATION
    BTN_CANCEL = !bSpanish ? "Cancel" : "Cancelar";
    BTN_CLOSE  = !bSpanish ? "Close" : "Cerrar";

    BTN_YES = !bSpanish ? "Yes" : "Sí";
    BTN_NO  = !bSpanish ? "No"  : "No";

    BTN_NOTIFY_NEXT_CUSTOMER = !bSpanish ? "Notify Next Customer" : "NOTIFICAR AL PRÓXIMO CLIENTE";
    BTN_SCAN_CUSTOMER = !bSpanish ? "Scan Customer(s)" : "ESCANEAR CLIENTE (S)";

    MSG_NOTYET = !bSpanish ? "NOT YET!" : "¡AÚN NO!";
    MSG_CUSTOMER_IS_STILL_NUMBER = !bSpanish ? "This customer is still number" :  "Este cliente sigue siendo el número";
    MSG_IN_LINE = !bSpanish ? "in line." : "en la cola."

    MSG_YOW = !bSpanish ? "YOW!" : "¡VAYA!";
    MSG_CUSTOMER_NOT_AT_THIS_STORE = !bSpanish ?
      "\n\nThis customer is not in line at this store.\n\nCheck the store name and address on the customer's phone." :
      "Este cliente no está en la cola de esta tienda. Verifique el nombre y la dirección de la tienda en el teléfono del cliente";

    MSG_SCAN_ENTRANCE_CODE = !bSpanish ? "scan entrance code" : "escanear el código para entrar";


    MSG_THANK_YOU_FOR_USING_SAFE_QUEUE = !bSpanish ? "Thank you for using Safe Queue!" : "¡Gracias para usar Cola Segura!"
    MSG_HAVE_A_SAFE_DAY = !bSpanish ? "Have a Safe Day!" : "¡Tenga un día seguro!"

    BTN_REFRESH = !bSpanish ? "REFRESH" : "REFRESCAR";

    MSG_ADDING_STANDEE = !bSpanish ? "Adding Standee..." : "Añadendo una persona en la cola física..."
    MSG_REMOVING = !bSpanish ? "Removing..." : "Eliminando..."
    MSG_NOTIFYING = !bSpanish ? "Notifying..." : "Notificando..."
    MSG_NOTIFIED = !bSpanish ? "Notified" : "Notificado";
    MSG_NOTIFIED_AT = !bSpanish ? "Notified at " : "Notificado a las "
    MSG_IT_IS_YOUR_TURN = !bSpanish ? "It is your turn to go in!" : "¡Es su turno para entrar!";
    MSG_GO_TO_THE_ENTRACE = !bSpanish ? "Go to the entrance with your QR Code ready." : "Vaya a la entrada con su código QR."

    MSG_OPEN_THE_QUEUE = !bSpanish ? "Open the Queue?" : "¿Abrir la cola?";
    MSG_CLOSE_THE_QUEUE = !bSpanish ? "Close the Queue?" : "¿Cerrar la cola?";
    MSG_ARE_YOU_SURE_YOU_WANT_TO_CLOSE = !bSpanish ? 
        "Are you sure you want to close the queue?" : "¿Está seguro de que desea cerrar la cola?";
    MSG_ARE_YOU_SURE_YOU_WANT_TO_OPEN  = !bSpanish ? 
        "Are you sure you want to open the queue?" : "¿Está seguro de que desea abrir la cola?";
    MSG_OPENING_THE_QUEUE = !bSpanish ? "Opening the queue..." : "Abriendo la cola...";
    MSG_CLOSING_THE_QUEUE = !bSpanish ? "Closing the queue..." : "Cerrando la cola...";

    MSG_ARE_YOU_SURE_YOU_WANT_TO_DELETE = !bSpanish ? 
        "Are you sure you want to delete this Safe Queue?" : "¿Está seguro de que desea eliminar la Cola Segura?";

    MSG_REGISTERED_TO_AUTOMATICALLY_JOIN = !bSpanish ?
        "Registered to automically join:" : "Registrado para unirse automáticamente:";

    MSG_A_DIRECT_LINK = !bSpanish ? "A direct link to this Safe Queue." : "Un enlace directo a esta Cola Segura.";
    MSG_CUSTOMERS_SCAN_THIS_CODE = !bSpanish ? 
        "Customers scan this code go to:" : "Las clientes escanean este código para entrar:"

    MSG_DELETING = !bSpanish ? "Deleting the Queue..." : "Eliminando la Cola..."

    TTL_BUSINESS_NAME = !bSpanish ? "Business Name" : "Nombre de Empresa"
    TTL_BUSINESS_ADDRESS = !bSpanish ? "Business Address" : "Dirección de Empresa"
    TTL_CONTACT_INFO       = !bSpanish ? "Business Contact (optional)" : "Contacto de empresa (opcional)";  // NEEDS TRANSLATION

    BTN_ADD_BUSINESS_LOGO = !bSpanish ? "Add business logo" : "Importar el logo";


    MSG_SAFE_QUEUE_NEEDS_YOUR_GPS_LOCATION = !bSpanish ?
        "Safe Queue needs your GPS location to operate." : "Cola Segura necesita tu ubicación GPS para funcionar.";
    MSG_CHANGE_YOUR_BROWSER_SETTINGS = !bSpanish ?
        "Change your browser settings for this site to Allow or to Ask for use of your location." :
        "Cambie la configuración de su navegador para este sitio para permitir o para solicitar el uso de su ubicación.";
    MSG_YOUR_BROWSER_REPORTED = !bSpanish ?
        "Your browser reported: " : "Su navegador informó: ";

    MSG_YOU_CAN_ALSO_RECEIVE_TEXT_MESSAGES = !bSpanish ? 
        "You can also receive notifications by text:" : "También puede recibir notificaciones por mensaje de texto:";

    TTL_PHONE_NUMBER = !bSpanish ? "Phone Number (optional)" : "número de teléfono (opcional)";
    MSG_SOMEONE_HAS_JOINED = !bSpanish ? "Someone has joined your Safe Queue" : "Alguien acaba de unirse a su Cola Segura";


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
  outerView: {
    flex: 1,
    padding: 22,
    backgroundColor: '#FFF'
  },
  splitView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  splitViewColumn: {
       flexDirection: 'column',
       justifyContent: 'center',
  },
  typeArea: {
    width: '40%'
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#000',
    fontSize: 14,
    paddingBottom: 5
  },

  itemStateOpen: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: '#008000',
    alignItems: 'flex-end',
    textAlign:'center',
  },
  itemStateClosed: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: '#FF0000',
    alignItems: 'flex-end',
    textAlign:'center',
  },

    heading: {
      fontFamily: 'IBMPlexSans-Medium',
      color: '#000',
      fontSize: 14,
      paddingTop: 5
    },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 16,
    marginBottom: 25
  },
  quantityArea: {
    width: '40%'
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  checkboxLabel: {
    fontFamily: 'IBMPlexSans-Light',
    fontSize: 13
  },
  flatListView: {
    backgroundColor: '#FFF',
    width: '100%'
  },
    businessView: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    businessName: {
      fontSize: 18,
      flexWrap: "wrap",
      maxWidth: "80%",
      fontFamily: 'IBMPlexSans-Medium',
    },
    businessDescription: {
      fontSize: 14,
      fontFamily: 'IBMPlexSans-Medium',
      color: 'gray'
    },
  textInputDisabled: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#f4f4f4',
    color: '#999',
    flex: 1,
    padding: 16,
    elevation: 2,
    marginBottom: 25
  },
    itemTouchable: {
      flexDirection: 'column',
      padding: 15,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      //borderBottomColor: '#dddddd',
      //borderBottomWidth: 0.25
    },
  updateButton: {
    backgroundColor: themeMainColor,
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop: 15,
    borderRadius: 10
  },
  deleteButton: {
    backgroundColor: '#da1e28',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 6,
    textAlign:'center',
    marginTop: 15,
    borderRadius: 10
  },

  closeScanButton: {
    backgroundColor: themeMainColor,
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop: 15,
    borderRadius: 10
  },

  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
  opencloseButtonOPEN: {
    backgroundColor: '#FF0000',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop: 15,
    borderRadius: 10
  },
    opencloseButtonCLOSED: {
      backgroundColor: '#008000',
      color: '#FFFFFF',
      fontFamily: 'IBMPlexSans-Medium',
      fontSize: 16,
      overflow: 'hidden',
      padding: 8,
      textAlign:'center',
      marginTop: 15,
      borderRadius: 10
    },
  scannerDisplay: {
      alignItems: 'center',
      marginTop: 10
  },
    itemLineNumber: {
      fontSize: 14,
      fontFamily: 'IBMPlexSans-Medium',
      color: '#000'
    },
    itemView: {
        flexDirection: 'column',
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        borderRadius: 10,
        borderWidth: 1.0,
        backgroundColor: '#FFF'
    },
     sign: {
        width: 70, 
        height: undefined,
        aspectRatio: 858 / 620,
        marginBottom: 40
      },

      signTop: {
          flex: 1,
          flexDirection: 'column',
          //alignItems: 'center',
          justifyContent: 'space-between'

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
            width: 110,
            height: undefined,
            aspectRatio: 299 / 168
          },
      defaultLogo: {
          width: 250,
          height: undefined,
          aspectRatio: 300 / 100,
          borderRadius: 10,
       },
      defaultLogoText: {
          fontSize: 12,
          fontFamily: 'IBMPlexSans-Medium',
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
        height: '10%',
        width: '50%',
        borderRadius: 10,
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


      loaderSplitView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10
      },
      loaderText: {
        marginLeft: 8,
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

    itemViewBusinessName: {
        flexDirection: 'column',
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#FFF'
    },
}));



let bShowDebug = false;  // for 

let isScanning = '0';
let lastScannedValue = 'xxxxx';
let currentItem = {};
var currentLineItems = {};
var priorToLeaveItems = {};

let urlPickup = '';
let smsPickupID = '';
let smsEntered = '';

/*
 * Safari refuses to play sounds unless the user taps on something...
 * so, a notification sound won't automatically play, but we can play it
 * if the user taps on the notification.
 */
let soundToPlayOnNotificationTap = null;  // this is an audio object

let webSocket = null;
let webSocketRetries = 0;

let importedImage64 = undefined;
let importedImageAspectRatio;  

// our local version of the main color
let themeMainColor;

// undo items
let storenameCommitted = '';
let featuresCommitted = '';

// pongs, keep alive watchdog
let timerKeepAlive = undefined;
let arrPong = new Array();
let arrPongState = new Array();


class QueueManagement extends Component {

  	constructor(props) {
    	super(props);

      global.itemQueueManagementChanged = false;  // until we do some editing!

      themeMainColor = global.themeMainColor;

      setLanguage(global.bSpanish ? 'es' : 'en');

      // custom wait time per customer
      var time = this.customTimePerCustomer(global.itemQueueManagement.custom);
      var timeError = (time === 'not set') ? "Wait time will not be shown" : '';

      // custom notify message
      var notify = this.customNotifyMessage(global.itemQueueManagement.custom);

      // custom pickup message
      var pickup = this.customPickupMessage(global.itemQueueManagement.custom);

      // radius
      var radius = this.customRadius(global.itemQueueManagement.custom);

      var contactinfo = this.customContactInfo(global.itemQueueManagement.custom);

      // previous state, for undo-ing edits
      storenameCommitted = global.itemQueueManagement.name;
      if(global.itemQueueManagement.features === undefined)
          featuresCommitted = '|W';  // default to walk-ins
      else
          featuresCommitted = global.itemQueueManagement.features; 

	    this.state = {  
            clearItem: { userID: global.userID, type: 'Store', name: '', description: '', location: '', contact: '', quantity: '1' },
            item: {},
            items:[],
            sortedfilteredItems: [], 
            loader: "Getting customers in line...",
            bShowLoader: '0',
            linelength:'',
            position:{},

            bShowManager: '0',

            bShowScanner: '0',
            scanMessage: MSG_SCAN_ENTRANCE_CODE,

            bShowBtnScan: '0',
            bShowBtnNextCustomer: '0',
            bShowBtnDelete: '0',
            deleteBtnLabel: BTN_DELETE_THIS_QUEUE,

            bShowBtnState: '1',
            bShowLineList: '1',

            bShowOpenCloseDialog: '0',
            titleOpenCloseDialog: '',
            messageOpenCloseDialog: '',

            bShowUserTappedDialog:'0',
            customerItemTapped:{},

            bShowErrorMessage:'0',
            bShowErrorMessageSubtitle:'',
            bShowErrorMessageError:'',
            errorMessageCallback: undefined,

            bShowConfirmDialog:'0',
            showConfirmDialogSubtitle:'',
            confirmCallback: null,

            bShowNotification: '0',
            webSocketState: '!!!',

            bShowBackdrop: '0',
            bShowBtnStandee: '0',
            bShowStandeeTappedDialog: '0',
            showStandeeTappedDialogMessage: '',

            bShowLostWebSocketHandler: '0',

            bShowPrintableQRCode: '0', 

            // number of customers registered to join or pickup
            numRegisterPickup: 0, 
            numRegisterJoin: 0,

            bShowHelpMessage:'0',
            helpMessageLine1:'',
            helpMessageLine2:'',
            helpMessageLine3:'',
            helpMessageLine4:'',

            bShowEditing: '0',
            editBtnLabel:BTN_EDIT_THIS_QUEUE,
            bShowPhotoCropper: '0',
            src: null,
            crop: {
              unit: '%',            
              width:  90,
              height: 30,
              x: 5,
              y: 30,
              //aspect: 3 / 1
            },
            croppedImageUrl: undefined,
            newLogoSize: '',  // in width x height format

            bShowPickUpList: this.bPickupSupport() ? '1' : '0',
            bShowBtnPickUpList: '0',
            pickupItems: [], 
            bShowBtnAddPickup: '0', // this.bPickupSupport() ? '1' : '0',

            bShowQRCodePickup: '0',
            bShowPickupTappedDialog: '0',

            // used only for editing
            bShowStandeeSupport: this.bStandeeSupport(),
            bShowPickupSupport: this.bPickupSupport(),
            bShowSelfManagedSupport: this.bSelfManagedSupport(),
            bShowWalkinSupport: this.bWalkinSupport(),
            bShowAutoNotifySupport: this.bAutoNotifySupport(),

            bAutoNotifyEnabled: false,  // default to on with warning dialog
            bShowAutoNotifyWarningDialog: '0',
            bAutoNotifyWarningShown: true,  // DISABLED THIS so we show the warning only once

            bShowFeaturesSaveCancel: false,

            printableJoinOption: 'storeonly',
            printableJoinUrl: '',
            printableJoinUrlShort:'',


            // Customizations
            bShowCustomizations: false,  // shows all customizations to edit
            showCustomizationTitle: BTN_SHOW_QUEUE_CUSTOMIZATION, //  "Show Queue Customizations",
            showCustimizationIcon: btn_chevronRight,

            timePerCustomer: time,
            bShowTimePerCustomerButtons: false,
            bShowTimePerCustomerError: timeError,

            customNotifyMessage: notify,
            customNotifyMessageURL: '',
            bShowNotifyMessageButtons: false,
            bCustomNotifyMessagePlaying: '0',

            customPickupMessage: pickup,
            customPickupMessageURL: '',
            bShowPickupMessageButtons: false,
            bCustomPickupMessagePlaying: '0',

            chosenRadiusInFeet: radius, 
            bShowRadiusButtons:false,

            newContactInfo: contactinfo,

            displayStoreCode: '',
            bShowEditMap:false,
            bShowEditMapButtonLabel:"CHANGE",

            bShowWatchdogUpdate: '0'
	    };  
  	}



componentDidMount() {
    // Background timer will check for customers that we haven't gotten pongs from in too long
    var period = 2*global.timerKeepAliveInterval;

    timerKeepAlive = setInterval(() => {
        this.updateWatchdogState(period);
    }, period);
}

componentWillUnmount() {
    clearInterval(timerKeepAlive);
}

updateWatchdogState = (period) => {
    var now = Date.now();

    var bUpdateGUI = false;  // will be flipped to true if any item has changed state

    for(var i=0; i<this.state.sortedfilteredItems.length; i++) {
        var item = this.state.sortedfilteredItems[i];

        // skip over customers being notified by text
        var apns = getAPNTokenFromContact(item.contact);
        var uid = getUserIDFromContact(item.contact);
        if((apns.substring(0,4) !== 'sms_') && (uid.substring(0,4) !== 'std_')) {
            var update = this.updateWatchdogStateForItem(uid, now, period);
            if(update)
                bUpdateGUI = true;   // always set true iF any item in this loop is true
        }
    }

    for(var i=0; i<this.state.pickupItems.length; i++) {
        var pitem = this.state.pickupItems[i];
      
        var apns = getAPNTokenFromContact(pitem.contact);
        var uid = getUserIDFromContact(pitem.contact);
        if((apns.substring(0,4) !== 'sms_') && (uid.substring(0,4) !== 'std_')) {
            var update = this.updateWatchdogStateForItem(uid, now, period);
            if(update)
                bUpdateGUI = true;   // always set true iF any item in this loop is true
        }
    }

    // Also, if there's any customer in the 4X state, we'll always update
    // so the time since last pong can be displayed
    for(var key in arrPongState) {
        var state = arrPongState[key];
        if(state === '4X') {
            bUpdateGUI = true;
            break;
        }
    }

    if(bUpdateGUI) {
        this.setState({bShowWatchdogUpdate:"!!!"});
    }
}

updateWatchdogStateForItem = (uid, now, period) => {
    var bUpdateGUI = false;  // will be flipped to true if any item has changed state

    var lastTime = arrPong[uid];
    var lastState = arrPongState[uid];
    var newState = 'good';

    if(lastTime !== undefined) {
        var deltaMsec = now - lastTime;  
        if     (deltaMsec > (4 * period)) newState = '4X'
        else if(deltaMsec > (3 * period)) newState = '3X';
        else if(deltaMsec > (2 * period)) newState = '2X';
        else if(deltaMsec > period)       newState = '1X';
        else                              newState = 'good';
    }
    else {
        console.log("No pongTime for customer in line: " + uid);
    }

    //console.log("Update for item: " + uid + "   was " + lastState + "   is now " + newState);

    // If any customer in line has changed state, update the GUI
    if(lastState !== newState) {
        arrPongState[uid] = newState;
        bUpdateGUI = true;
    }

    return bUpdateGUI;
}

watchDogColor = (item) => {
    var defaultColor = '#F1F0EE';   // grayish that blends in

    var now = Date.now();
    var period = 2*global.timerKeepAliveInterval;

    // don't change color of text Message notifications
    var apns = getAPNTokenFromContact(item.contact);
    if(apns.substring(0,4) === 'sms_')
        return defaultColor;

    var uid = getUserIDFromContact(item.contact);
    var state = arrPongState[uid];
    if(state === "4X") return '#FF4142';
    if(state === "3X") return '#FF7E7F';
    if(state === "2X") return '#FFC000';
    if(state === "1X") return '#EAEA00';
  
    return defaultColor; 
}


/*
  * We use a websocket for notifications
  *
  */
createWebSocket = (item) => {
    /*
     * If we get disconnected, need to re-connect again
     *
     * Seems dis-connections are a regular occurance (likely from the server side)
     * So, we try to reconnnect immediately twice, and then assume we are truly disconnected
     *     and in that case, we'll put the dialog that request a browser refresh (which reconnects)
     */
    //console.log("Creating Web Socket for Queue Management at " + global.wsurl);

    // not for monitor-only management
    if((item.bMonitorOnly !== undefined) && (item.bMonitorOnly === '1'))
        return;

    // close any previous websocket, if possible
    if(webSocket !== null) {
        //console.log("Closing previous Web Socket")
        webSocket.close();
    }

    webSocket = new WebSocket(global.wsurl);  
    webSocket.onopen = () => {
        //console.log("Web Socket Opened at " + global.wsurl);
        if (webSocket.readyState === 0) {
            console.log("Waiting for webSocket - queuemanagement");
        }

        if(global.userID !== '') {
            //console.log("Sending userID to web socket: " + global.userID);
            webSocket.send("register::" + global.userID);
        }
        else 
            ; // well, I don't know what else - we need to try again later

        // close the warning 
        webSocketRetries = 0;  // reset 
        this.setState({webSocketState:'***',
                       bShowLostWebSocketHandler:'0'});
    };  
    webSocket.onmessage = (evt) => {
        //var json = JSON.stringify(evt);
        //const message = JSON.parse(evt.data)
        //alert("Event:\n" + evt.data);
        this.handleNotification(evt.data);
    };
   
    webSocket.onerror = function(error) {
        // this is likely a connection error, so we'll retry soon...
        var errstr = JSON.stringify(error);
        errstr = JSON.stringify(error, ["data", "arguments", "type", "name"])
        //console.log("Web Socket Error:" + errstr + "  " + error.code);
    };
    webSocket.onclose = (event) => {
        this.setState({webSocketState:'!!!'});
        if((event.code === 1000) || (event.code === 1005)){
            console.log("Web Socket Closed normally");
        }
        else if(event.code === 1006) {
            console.log("Web Socket disconnected. Re-connecting...");
            /*
             * We'll first try to re-connect silently and if it fails,
             * then put up the notification and try every 10 seconds
             */
            if(webSocketRetries < 2) {  // seems we get a few fails before it works
                //console.log("Web Socket first re-connect");
                webSocketRetries++;
                this.createWebSocket(item);   // oddly recursive?
            }
            else {
                // try again every 10 seconds
                this.setState({"bShowLostWebSocketHandler": "Browser disconnected from Safe Queue!"});
                setTimeout(() => {
                    console.log("Web Socket retry " + webSocketRetries);
                    webSocketRetries++;
                    this.createWebSocket(item);
                }, 10000);
            }
        }
        else {
            alert("Web Socket Closed with error:" + event.code);
        }
    };   
};


playSound = (a) => {
    a.play().then(response => {
        soundToPlayOnNotificationTap = null;
    }).catch(e => {
        /*
         * We get here for Safari generally
         */
        //alert("PLAY EXCEPTION: " + e);
        console.log(e);
        soundToPlayOnNotificationTap = a;
    });
}


playSoundByName = (name) => {
    //console.log("Playing " + name);
    if(name === 'beep1.wav')      { var audio = new Audio(sound_beep1); this.playSound(audio); }
    else if(name === 'beep2.wav') {     audio = new Audio(sound_beep2); this.playSound(audio); }
}

handleNotification = (data) => {
    let pushdata = JSON.parse(data);
    let note = pushdata.pushdata;  // it is all under the pushdata tag

    /*
    console.log("NOTE: " + data);
    console.log("ANDROID:" + JSON.stringify(note.android));
    console.log("ANDROID:NOTIFICATION" + JSON.stringify(note.android.notification));
    console.log("SOUND" + note.android.notification.sound);
    */

    // play the sound
    setTimeout(() => {
        if (note.android) {
            this.playSoundByName(note.android.notification.sound);
        } else if (note.data.websound) {
            this.playSoundByName(note.data.websound)
        }
    }, 2000);

    if (true) { // why? note.foreground) {
        
        let data  = JSON.parse(note.data.payload);
        let type  = data.type;
        let title = note.notification.title;
        let body  = note.notification.body;

        if(type === global.notificationNewJoin) {
            this.setState({bShowNotification:title + " " + body});
            this.updateLineList(this.state.location, "Updating from NewJoin notify...", this.notifyAfterNewJoin);
        }
        else if(type === global.notificationNewLeave) {
            this.setState({bShowNotification:title + " " + body});
            priorToLeaveItems = currentLineItems;  // so we can figure out who left
            this.updateLineList(this.state.location, "Updating from NewLeave notify...", this.notifyEveryoneAfterLeave);
        }
        else if(type === global.notificationSync) {
            // sync up the line
            this.updateLineList(this.state.location, "Updating from Sync...", undefined);  // no callback
        }
        else if(type === global.notificationPong) {
            var pongTime = title;
            var pongUserID = body;
            arrPong[pongUserID] = pongTime;

            //console.log("GOT A PONG for " + pongUserID + " with time: " + pongTime);

            // need to search through the users to find the APNS for this userID
            for(var i=0; i<this.state.sortedfilteredItems.length; i++) {
                var titem = this.state.sortedfilteredItems[i];

                var tid = getUserIDFromContact(titem.contact);
                if(tid === pongUserID) {
                    // update the state if this isn't text message notification
                    var apns = getAPNTokenFromContact(titem.contact);
                    if(apns.substring(0,4) !== 'sms_') {
                        // update the state
                        var now = Date.now();
                        var period = 2*global.timerKeepAliveInterval;
                        if(this.updateWatchdogStateForItem(pongUserID, now, period)) {
                            // have to find the apns for this user, by userid
                            //console.log("Notification Update from receipt of pong for " + pongUserID);
                            this.setState({bShowWatchdogUpdate:"!!!"});
                        }
                    }
                    break;
                } 
            }

            // this could also be a pickup item
            for(var i=0; i<this.state.pickupItems.length; i++) {
                var pitem = this.state.pickupItems[i];

                var tid = getUserIDFromContact(pitem.contact);
                if(tid === pongUserID) {
                    // update the state if this isn't text message notification
                    var apns = getAPNTokenFromContact(pitem.contact);
                    if(apns.substring(0,4) !== 'sms_') {
                        // update the state
                        var now = Date.now();
                        var period = 2*global.timerKeepAliveInterval;
                        if(this.updateWatchdogStateForItem(pongUserID, now, period)) {
                            // have to find the apns for this user, by userid
                            //console.log("Notification Update from receipt of pong for " + pongUserID);
                            this.setState({bShowWatchdogUpdate:"!!!"});
                        }
                    }
                    break;
                } 
            }
        }
    }
}

// called when someone leaves the line without being notified to come in
// happens if he drives away or just voluntarily leaves.
// This will send notifications to everyone who is effected
notifyEveryoneAfterLeave = (thoseinline) => {   
      //console.log("notify everyone thoseinline: " + thoseinline.length);        
      //console.log("notify everyone prior: " + priorToLeaveItems.length);    

      // figure out who left by comparing before and after
      var deletedItemId = '0';
      var offset = 10000000;
      for(var i=0; i<priorToLeaveItems.length; i++) {
          var pitem = priorToLeaveItems[i];
          var pitemId = pitem['_id'];

          var bFound = false;
          for(var j=0; j<thoseinline.length; j++) {
              var aitem = thoseinline[j];
              if(pitemId === aitem['_id']) {
                  bFound = true;
                  break;
              }
          }

          if(!bFound) {
              // That's it - the one we don't have anymore
              //console.log("Found deleted item: " + this.nicknameInLine(pitem));
              deletedItemId = pitemId;
              offset = i;  // same offset in new list
              break;
          }
      }    

      if(deletedItemId === '0') {
          // Well, we didn't find any difference, which should not happen...
          console.log("Didn't find the deleted item");
          return; // we'll ignore it
      }

      var tonotify = new Array(); 
      for(var i=0; i<thoseinline.length; i++) {
          if(i >= offset) {
              var titem = thoseinline[i];
              tonotify.push(titem);
          }
      }

      //console.log("tonotify: " + tonotify.length + "   offset: " + offset);

      var type = global.notificationMoveUp;
      var title = ''; //Your Safe Queue has been updated.';
      var body;
      var sound;
      var numberInLine = offset;  // first person to notify
      for(var i=0; i<tonotify.length; i++) {
          var nitem = tonotify[i];

          var allowSMS = true;

          var itemstate = getStateFromState(nitem.state);
          if(itemstate !== 'notified') { // means notified to come in! So dont' send anything
              if(numberInLine == 0) {
                  sound = 'next.wav';
                  body = MSG_YOU_ARE_NOW_NEXT; // 'You are now next in line!';
              }
              else if(numberInLine == 1) {
                  sound = 'second.wav';
                  body = MSG_YOU_ARE_NOW_SECOND; //'You are now second in line!';
              }
              else if(numberInLine == 2) {
                  sound = 'third.wav';
                  body = MSG_YOU_ARE_NOW_THIRD; //'You are now third in line!';
                  allowSMS = false;
              }
              else if(numberInLine == 3) {
                  sound = 'fourth.wav';
                  body = MSG_YOU_ARE_NOW_FOURTH; // 'You are now fourth in line!';
                  allowSMS = false;
              }
              else {
                  sound = 'beep1.wav';
                  body  = MSG_THE_LINE_HAS_MOVED; // 'The line has changed.';
                  allowSMS = false;
              }

              var nickname = this.nicknameInLine(nitem);
              //console.log("Sending push to " + nickname + "  now " + numberInLine + " " + sound);
              sendPush(nitem, type, title, body, sound, webSocket, allowSMS);
          }

          numberInLine++;
      }
  }

// Called after the list has been updated
notifyAfterNewJoin = () => { 
    // We're going to check to see if a scanned pickup QR Code just came back to us as a notification
    if(this.state.bShowQRCodePickup !== '0') {
        // The pickup QR Code is visible, let's see if it is for someone in line
        // and if so, we'll just close the dialog
        for(var i=0; i<this.state.pickupItems.length; i++) {
            var item = this.state.pickupItems[i];

            var desc = Buffer.from(item.description, 'base64').toString('binary');
            if(desc === this.state.bShowQRCodePickup) {
                // Yep, that's it!
                this.setState({bShowQRCodePickup: '0',
                               bShowPickUpList:'1'}); 
            }
        }
    }  
}


drawNotification() {
   if(this.state.bShowNotification === '0')
      return;

  const handleClose = (event, reason) => {
      this.setState({bShowNotification:'0'});
  };

  const handleClick = (event, reason) => {
      if(soundToPlayOnNotificationTap != null) {
          this.playSound(soundToPlayOnNotificationTap);
      }
      this.setState({bShowNotification:'0'});
  };

  return (
    <div>
      <Snackbar 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={true}
        autoHideDuration={6000}
        TransitionComponent={this.state.Transition}
        onClose={handleClose}
      >
      <SnackbarContent 
          style={{
            backgroundColor:themeMainColor,
             /*
             * we need to set a maxWidth to be consistent with the maxWidth in the ons.Page tag,
             * which limits the width of Safe Queue to be more pleasing on wide devices.
             * Unfortunately, Snackbar doesn't obey this width on all browsers,
             * So...
             * we'll set the snackbar to be only a wide as ons.Page (414) less the margins it has (24 x 2)
             */
            maxWidth:(414-48)  
          }} 
          message={this.state.bShowNotification}
          action={
            <React.Fragment>
                <Ons.Button modifier="large--quiet" 
                    style={{color:"#FFFFFF"}} onClick={() => { handleClick() }}>
                    OKAY
                </Ons.Button>
            </React.Fragment>
          }
      />
      </Snackbar>
    </div>
  );
}

drawWatchdogUpdate() {
   if(this.state.bShowWatchdogUpdate === '0')
      return;

  return (
    <div>
      <Snackbar 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={true}
        autoHideDuration={2000}
        TransitionComponent={this.state.Transition}
      >
      <SnackbarContent 
          style={{
            backgroundColor:themeMainColor,
             /*
             * we need to set a maxWidth to be consistent with the maxWidth in the ons.Page tag,
             * which limits the width of Safe Queue to be more pleasing on wide devices.
             * Unfortunately, Snackbar doesn't obey this width on all browsers,
             * So...
             * we'll set the snackbar to be only a wide as ons.Page (414) less the margins it has (24 x 2)
             */
            maxWidth:(48)  
          }} 
          message={this.state.bShowWatchdogUpdate}
          action={
            <React.Fragment>
                <Ons.Button modifier="large--quiet" 
                    style={{color:"#FFFFFF"}} onClick={() => {  }}>
                    !!!
                </Ons.Button>
            </React.Fragment>
          }
      />
      </Snackbar>
    </div>
  );
}

drawErrorMessage = () => {
  if(this.state.bShowErrorMessage === '0')
      return;

    var namestyle = {fontSize:"80%"};

    const handleOkay = () => {
        this.setState({bShowErrorMessage:'0'});
        if(this.state.errorMessageCallback !== undefined) {
            this.state.errorMessageCallback();
            this.setState({errorMessageCallback: undefined});
        }
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
displayErrorMessage = (title, subtitle, error, callback) => {
   this.setState({bShowErrorMessage:title, 
                  bShowErrorMessageSubtitle:subtitle, 
                  bShowErrorMessageError:error,
                  errorMessageCallback: callback});
}



  	componentWillMount() {
        // Handle the Startup..
        const item = global.itemQueueManagement;
        this.setState({item: {...item, quantity: item.quantity.toString()}});
        currentItem = item;


        //console.log("MONITOR: " + item.bMonitorOnly);

  	    if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.setState({position: pos});
                var loc =`${pos.coords.latitude},${pos.coords.longitude}`;
                this.updateLineList(loc, "Loading...");

                this.createWebSocket(item);   // defaul websocket
            },
            (error) => {
                if(global.bAllowFakeGPSLocation) {
                    var loc = global.fakeGPSLocation;
                    this.setState({position: loc});
                    this.updateLineList(loc, "Loading...");

                    this.createWebSocket(item);   // defaul websocket        
                }
                else {
                    this.displayErrorMessage(
                        MSG_SAFE_QUEUE_NEEDS_YOUR_GPS_LOCATION,
                        MSG_CHANGE_YOUR_BROWSER_SETTINGS,
                        MSG_YOUR_BROWSER_REPORTED + "'" + error.message + "'",
                        returnToManager); // callback
                      var loc = "0,0";
                }
            },
            {enableHighAccuracy: true});
        }
  	    else {
            if(!global.bSpanish)
  	             alert("I'm Sorry. You don't have GPS capability or it is turned off." +
  	              "Safe Queue needs your location to operate.");
            else 
                alert("Lo siento, " + MSG_SAFE_QUEUE_NEEDS_YOUR_GPS_LOCATION);
  	        console.log("GPS Not Available");
  	    }
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

    drawLoader = () => {
        if(this.state.bShowLoader === '0')
          return;
        
        return (
            <div style={{marginBottom:8}}>{this.state.bShowLoader}</div>
        );
    }


syncQueueWithMirror = (items) => {

    if(items.length == 0) {
        // Nothing here means the name of the queue must have changed
        global.itemQueueManagementChanged = true;
        returnToManager();
    }
    
    var myname = global.itemQueueManagement.name;
    for(var i=0; i<items.length; i++) {
        var titem = items[i];

        if((titem.name === myname) && this.isStoreItself(titem)) { 
            // update parts of the Queue itself, not the line

            // Check for a mirror that was just created
            // Put up a notification if things have changed!
            if(global.itemQueueManagement.mirrors !== titem.mirrors) {
                // let's notify the manager of the change
                if((titem.mirrors === undefined) || (titem.mirrors === 'none'))
                {
                    // no mirror anymore, see if we used to have one
                    if(global.itemQueueManagement.bHasMirrors === '1')
                        this.setState({bShowNotification:"A mirror manager has been removed."});
                }
                else {
                    // no have a mirror, see if we used to not have one
                    if(global.itemQueueManagement.bHasMirrors === '0')
                        this.setState({bShowNotification:"A mirror manager has been added."});
                }

            }
            global.itemQueueManagement.mirrors = titem.mirrors;
            if((titem.mirrors !== undefined) && (titem.mirrors !== 'none') && (titem.mirrors !== ''))
                global.itemQueueManagement.bHasMirrors = '1';
            else
                global.itemQueueManagement.bHasMirrors = '0';


            // see if there's any new features
            if(global.itemQueueManagement.features !== titem.features) {
                global.itemQueueManagement.features = titem.features;
                featuresCommitted = titem.features;
                this.setState({bShowNotification:"Queue features have changed.",
                               bShowPickupSupport:this.bPickupSupport(),
                               bShowStandeeSupport:this.bStandeeSupport(),
                               bShowSelfManagedSupport:this.bSelfManagedSupport()});
            }

            // see if the location changed
            //console.log("location " + titem.location + "  was " + global.itemQueueManagement.location)
            if(global.itemQueueManagement.location !== titem.location) {
                console.log("location has changed to " + titem.location + "  was " + global.itemQueueManagement.location)
                global.itemQueueManagement.location = titem.location;
                this.setState({bShowNotification:"Queue GPS Location has changed.",
                               bShowCustomizations:false,
                               showCustimizationIcon: btn_chevronRight,
                               showCustomizationTitle: BTN_SHOW_QUEUE_CUSTOMIZATION, //"Show Queue Customizations",                               
                               item:{...this.state.item, location:titem.location}});
            }

            // see if the queue opened or closed
            if(global.itemQueueManagement.state !== titem.state) {
                global.itemQueueManagement.state = titem.state;
                if(titem.state === 'open')
                    this.setState({bShowNotification:"The Queue was opened.", 
                                  item:{...this.state.item, state:titem.state}});
                else 
                    this.setState({bShowNotification:"The Queue was closed.",
                                  item:{...this.state.item, state:titem.state}});
            }

            // Change of address
            if(global.itemQueueManagement.description !== titem.description) {
                global.itemQueueManagement.description = titem.description;
                this.setState({bShowNotification:"Queue address has changed.", 
                               item:{...this.state.item, description:titem.description}});
            }

            // Change of customizations
            var newcustom = JSON.stringify(titem.custom);
            var oldcustom = JSON.stringify(global.itemQueueManagement.custom);
            if(oldcustom !== newcustom) {
                global.itemQueueManagement.custom = titem.custom;
                this.setState({bShowNotification:"Queue customizations have changed.",
                               chosenRadiusInFeet:titem.custom.radius, 
                               timePerCustomer:titem.custom.timepercustomer,
                               customNotifyMessage:titem.custom.notifymessage,
                               customPickupMessage:titem.custom.pickupmessage,
                               newContactInfo:titem.custom.contactinfo,
                               item:{...this.state.item, custom:titem.custom}});
            }

            break;
        }
    }
}

/*
 * Primary update function for the list of customers in line 
 *
 */
    updateLineList = (loc, userMessage, callback) => {
      /*  
       * We might be monitoring a line, versus managing it
       * In that case, we have to search for customers in line from the manager userID of the store
       */
      var item = global.itemQueueManagement;
      var bMonitorOnly = ((item.bMonitorOnly !== undefined) && (item.bMonitorOnly === '1')) ? true : false;
      var targetID = bMonitorOnly ? item.userID : global.userID;

      const payload = {
         ...this.clearItem,
            type: 'Store',
            name: item.name,
            userID: targetID // global.userID
      };

      //console.log("Payload: " + JSON.stringify(payload))

      if(userMessage === 'Loading...')
          this.setState({bShowLoader:userMessage});

       searchResilient(payload, loc, (results, loc) => {
           if(results != null) {
              // success
              if(results.length === 0) {
                  alert("ERROR: The Queue was not found. Refresh your browser and try again.");
                  return;
              }
              this.syncQueueWithMirror(results);  // KLUGE - updates the queue itself, not the line!

              var num = this.sortandfilter(results, loc)
              var linelength;
              if(num == 0)
                  linelength = MSG_THERE_IS_NO_ONE_INLINE;
              else if(num == 1)
                  linelength = MSG_THERE_IS_ONE_INLINE;
              else
                  linelength = num + " " + MSG_CUSTOMERS_INLINE;

              // don't forget pickup
              if(this.state.pickupItems !== undefined) {
                  for(var i=0; i<this.state.pickupItems.length; i++) {
                      var titem = this.state.pickupItems[i];
                    
                      //var itemstate = getStateFromState(titem.state);
                      //if(itemstate == 'notified') { 
                          num++;
                      //}
                  }
              }

              // Update the buttons, unless the scanner is open
              // this happens if a background update happens while the scanner is open
              if(isScanning == '0') {
                  var showBtnDelete;
                  var showBtnNextCustomer;
                  var showBtnScan;
                  var showBtnStandee;
                  var showLoader;
                  var showBtnAddPickup;

                  showBtnDelete = (num == 0) ? '1' : '0';  // show delete if 0 users in line
                  showLoader = '0';
                  if((num > 0) && !bMonitorOnly) {  // hide these buttons if monitoring
                      showBtnNextCustomer = '1';
                      showBtnScan = '1';
                      showBtnStandee = '1';
                  } else {
                      showBtnNextCustomer = '0';
                      showBtnScan = '0';
                      showBtnStandee = '1';
                  }
                  showBtnAddPickup = this.bPickupSupport() ? '1' : '0';
                
                  this.setState({linelength: linelength, 
                               bShowBtnDelete: showBtnDelete,
                               bShowBtnNextCustomer: showBtnNextCustomer,
                               bShowBtnScan: showBtnScan,
                               bShowBtnStandee: showBtnStandee,
                               bShowBtnAddPickup: showBtnAddPickup,
                               bShowLoader: showLoader});
                }
                else {
                   this.setState({linelength:linelength});
                }

                // optional callback, needed for operations that require the search result
                if(callback !== undefined)
                    callback(currentLineItems);  // the result of sortandfilter
            }
            else {
                console.log("ERROR in updatelinelis");
                //Alert.alert('Network Error', "Updating failed after two retries. Please check your network connection and try again.", [{text: 'OK'}]);
            }
        });
    };

    sortandfilter = (items, loc) => {
        // only show the persons in line for this store
        // so, userID = me  and its not the store entry itself
        // and name is our name
        // OR
        // if I am monitoring this queue
        //
        var numRegPickup = 0;
        var numRegJoin = 0;
        var numPickUp = 0;

        var lineitems = new Array();
        var pickupitems = new Array();
        var myname = global.itemQueueManagement.name;
        for(var i=0; i<items.length; i++) {
            var titem = items[i];

            var contactID = getUserIDFromContact(titem.contact);

            if((titem.name === myname) && !this.isStoreItself(titem)) {
                
                //console.log("ITEM: " + titem.contact + " d:" + titem.description + " s: " + titem.state)

                if(titem.state === 'registerpickup') { 
                    numRegPickup++;
                }
                else if(titem.state === 'registerjoin') {
                    numRegJoin++;
                }
                else if(this.isPickup(titem)) {
                    pickupitems.push(titem);
                    numPickUp++;

                    // Also, give a pong Time if there isn't one
                    var pongTime = arrPong[contactID];
                    if(pongTime === undefined) {
                        arrPong[contactID] = Date.now();
                        arrPongState[contactID] = 'good';
                    }
                }
                else {
                    // actual person in line
                    lineitems.push(titem);
                }
            }
        }

        // we will sort on whenCreated, which is acutally position in line
        const sorteditems = lineitems.sort((a, b) => {
            var aq = parseInt(a.whenCreated);
            var bq = parseInt(b.whenCreated);
            return aq - bq;
        });

        // WALK-IN LINE
        // remove duplicate items that could occur with multiple browser instances!
        // Two items are duplicates if their userids are identical
        // Since this is sorted, it will remove the first one it sees
        var finalsorteditems = new Array();
        for(var i=0; i<sorteditems.length; i++) {
            var titem = sorteditems[i];
            var tuserid = getUserIDFromContact(titem.contact);
            if(tuserid === "none@none.com") {
                finalsorteditems.push(titem);
                continue;  // always add stores themselves
            }

            var bDup = false;
            if((i+1) < sorteditems.length) {
                for(var j=i+1; j<sorteditems.length; j++) {
                    var ditem = sorteditems[j];
                    var duserid = getUserIDFromContact(ditem.contact);
                    if(duserid === tuserid) {
                        // FOUND A DUPLICATE
                        // remove it from the database silently
                        const payload = {
                            ...titem,
                            id: titem.id || titem['_id']
                        };

                        removeResilient(payload, payload, (ritem) => {
                            if(ritem != null) 
                                console.log("Deleted Walk-in duplicate: " + titem.contact)
                            else 
                                console.log("Deleted Walk-in duplicate: " + titem.contact + "  had error!")
                        });
                        
                        bDup = true;
                        break;
                    }
                }
            }

            if(!bDup) {
                finalsorteditems.push(titem);
                // Also, give a pong Time if there isn't one
                var uid = getUserIDFromContact(titem.contact);
                var pongTime = arrPong[uid];
                if(pongTime === undefined) {
                    arrPong[uid] = Date.now();
                    arrPongState[uid] = 'good';
                }
            }
        }

        // sort the pickup items as well
        const sortedPickupitems = pickupitems.sort((a, b) => {
            var aq = parseInt(a.whenCreated);
            var bq = parseInt(b.whenCreated);
            return aq - bq;
        });

        // PICKUP LIST
        // remove duplicate items that could occur with multiple browser instances!
        // Two items are duplicates if their userids are identical
        // Since this is sorted, it will remove the first one it sees
        var finalsortedPickupitems = new Array();
        for(var i=0; i<sortedPickupitems.length; i++) {
            var titem = sortedPickupitems[i];
            var tuserid = getUserIDFromContact(titem.contact);
            if(tuserid === "none@none.com") {
                continue;  // shouldn't happen, but if it does
            }

            var bDup = false;
            if((i+1) < sortedPickupitems.length) {
                for(var j=i+1; j<sortedPickupitems.length; j++) {
                    var ditem = sortedPickupitems[j];
                    var duserid = getUserIDFromContact(ditem.contact);
                    if(duserid === tuserid) {
                        // FOUND A DUPLICATE
                        // remove it from the database silently
                        const payload = {
                            ...titem,
                            id: titem.id || titem['_id']
                        };

                        console.log("PICKUP found duplicate: " + payload.contact)

                        removeResilient(payload, payload, (ritem) => {
                            if(ritem != null) 
                                console.log("Deleted Pick-up duplicate: " + titem.contact)
                            else 
                                console.log("Deleted Pick-up duplicate: " + titem.contact + "  had error!")
                        });
                                              
                        bDup = true;
                        break;
                    }
                }
            }

            if(!bDup) {
                finalsortedPickupitems.push(titem);
                // Also, give a pong Time if there isn't one
                var uid = getUserIDFromContact(titem.contact);
                var pongTime = arrPong[uid];
                if(pongTime === undefined) {
                    arrPong[uid] = Date.now();
                    arrPongState[uid] = 'good';
                }
            }
        }


        /*  WHAT THE HECK IS THIS - probalby old when we counted down the notified timer
         * the server doesn't track count up timers, so we need to update here
        for(var i=0; i<finalsorteditems.length; i++) {
            var newitem = finalsorteditems[i];
            var newid = newitem.id || newitem['_id'];
            var newval = getValueFromState(newitem.state);

            for(var j=0; j<currentLineItems.length; j++) {
                var olditem = currentLineItems[j];
                var oldid = olditem.id || olditem['_id'];
                if(oldid == newid) {
                   // same object, update the state with possible count up
                    var oldval = getValueFromState(olditem.state);
                    if((newval == null) && (oldval != null)) {
                        newitem.state = olditem.state;
                        break;
                    }
                }
            }
        }
        */

        this.setState({sortedfilteredItems: finalsorteditems,
                       pickupItems: finalsortedPickupitems,
                       bShowBtnPickUpList: this.bPickupSupport() ? '1' : '0',
                       numRegisterPickup: numRegPickup,
                       numRegisterJoin: numRegJoin})
        currentLineItems = finalsorteditems;
        return finalsorteditems.length;
    }

  numberInLine = (props) => {
      // Since we don't have a line number property, look in the list for me
      if(this.isPickup(props)) { 

          // Show the SMS text number
          var apntoken = getAPNTokenFromContact(props.contact);
          if(apntoken.substring(0,4) === 'sms_') {
              // display the text number
              var number = apntoken.substring(4);  // remove the 'sms_' prefix
              if(number.substring(0,2) === '+1')  // shortened form for US
                  return number.substring(2);
              else
                  return number;
          }

          return "";


          // this could be a text-only user
          var ordernumber = getUserIDFromContact(props.contact);
          if(ordernumber.substring(0,2) === '#_')
              return ordernumber;

          var tempitem = {...props};
          tempitem.theRef = undefined;
          console.log("NUMBER: " + JSON.stringify(tempitem))

          if(props.description !== '') {
              var desc = Buffer.from(props.description, 'base64').toString('binary');
              return desc;
          }
          return "pickup";

          /*
          // or not, where the order number is in the description
         if(props.description !== '') {
              var desc = Buffer.from(props.description, 'base64').toString('binary');
              var pre = desc.substring(0,2);
              if(pre === '#_') 
                  return desc;
              else {
                  return desc;

                  //return 'pickup';  // shoudn't happen, but if it did
              }
          }
          return "pickup"; // shoudn't happen, but if it did
          */
      }
      else {
          for(var i=0; i<this.state.sortedfilteredItems.length; i++) {
              var item = this.state.sortedfilteredItems[i];
              if(item.contact == props.contact) {
                  var n = i + 1;
                  return n.toString();
              }
          }
      }
      return props.whenCreated;
  }


isStoreItself = (theItem) => {
    // The contact field for for a store has userId of none@none.com
    var userid = getUserIDFromContact(theItem.contact);
    if(userid === 'none@none.com')
        return true;
    else 
        return false;
}

  userIsStandee = (user) => {
      var userid = getUserIDFromContact(user.contact);
      if(userid.substring(0,4) === 'std_')
          return true;
      else
          return false;
  }

nicknameInLine = (props) => {
    if(this.isPickup(props)) {
        // this could be a text-only user
        var ordernumber = getUserIDFromContact(props.contact);
        if(ordernumber.substring(0,2) === '#_') {
             // add in something the user has entered
            if(props.description !== '') {
                var desc = Buffer.from(props.description, 'base64').toString('binary');
                console.log("USING: " + desc)
                return ordernumber + desc;
            }
            else 
              return ordernumber;
        }

        // or something the user has entered
        if(props.description !== '') {
            var desc = Buffer.from(props.description, 'base64').toString('binary');
            return desc;
        }
        return "pickup";


          var apntoken = getAPNTokenFromContact(props.contact);
          if(apntoken.substring(0,4) === 'sms_') {
              // display the text number
              var number = apntoken.substring(4);  // remove the 'sms_' prefix
              if(number.substring(0,2) === '+1')  // shortened form for US
                  return number.substring(2);
              else
                  return number;
          }
          return "---"
          // return Buffer.from(props.description, 'base64').toString('binary');

          //return apntoken.substring(0,8);
    }
    else if(props.description === '') {
        // Nothing entered by the user, so use the first 8 digits his userID
        var userId = getUserIDFromContact(props.contact); 
        return userId.substring(0,9);   
    }
    else
    {
        // entered by the user, was base64 for the database
        if(this.userIsStandee(props)) {
            var userid = getUserIDFromContact(props.contact);
            return TTL_STANDEE + " " + userid.substring(4,8);
        }
        else
            return Buffer.from(props.description, 'base64').toString('binary');
    }
}

  notifiedTextDate = (props) => {
      var textdate;

      var state = props.state;
      if((state == 'notified') || (state === 'notifiedpickup')) {
          if (props.whenNotified != null) {
            let date = new Date(props.whenNotified);
            let time = moment(date).format('hh:mm A');
            if (time == undefined) return 'NOTIFIED'
            textdate = MSG_NOTIFIED_AT  + time;
          } 
          else {
            textdate = MSG_NOTIFIED;
          }
      }
      else {
          // show the time the user joined the line
          let date = new Date(props.whenCreated);
          let time = moment(date).format('hh:mm A');
          textdate = time;
      }

      var uid = getUserIDFromContact(props.contact);
      var pongTime = arrPong[uid];
      if(pongTime !== undefined) {
          var pongState = arrPongState[uid];
          if(pongState === '4X') {
              // last color, so show the time we haven't heard
              var now = Date.now();
              var deltaSec = (now - pongTime)/1000;
              var secs = Math.round( deltaSec );
              var text;

              if(secs < 60) {
                  // seconds
                  text = secs + " secs";
              }
              else if(secs < 3600) {
                  // minutes
                  var mins = Math.floor(secs/60);
                  var more = secs % 60;
                  if(more === 0)
                      more = "00";
                  else if(more < 10)
                      more = "0" + more;
                  text = mins + ":" + more;
              }
              else {
                  // hours
                  var hours = Math.floor(secs/3600);
                  secs = secs - (hours * 3600);
                  var mins = Math.floor(secs/60);
                  if(mins === 0)
                      mins = "00";
                  else if(mins < 10)
                      mins = "0" + mins;

                  var more = secs % 60;
                  if(more === 0)
                      more = "00";
                  else if(more < 10)
                      more = "0" + more;

                  text = hours + ":" + mins + ":" + more;
              }
              textdate = textdate + " [" + text + "]";
          }
      }

      return textdate;
  }


  // determines who should be notified next
  nextCustomerToNotify = () => {
      // find the first person who hasn't already been NOTIFIED
      for(var i=0; i<this.state.sortedfilteredItems.length; i++) {
          var titem = this.state.sortedfilteredItems[i];
          var state = getStateFromState(titem.state);
          if(state != 'notified') {
              return titem;
              break;
          }
      }
      return undefined;
  }

  notifyNextCustomerCallback = () => {
      var nitem = this.nextCustomerToNotify();
      if(nitem === undefined)
         return;

      // set local state to notified in case someone clicks
      // many times on the button. This prevents notifying
      // the same person multiple times
      if(this.userIsStandee(nitem)) {
          var nickname = this.nicknameInLine(nitem);
          this.setState({bShowStandeeTappedDialog:MSG_STANDEE_IS_NEXT, 
                         showStandeeTappedDialogMessage:BTN_REMOVE + " " + nickname + ' ?',
                         customerItemTapped: nitem});
      }
      else {
          nitem.state = 'notified'; // no need to track down counter
          this.notifyPersonInLine(nitem);
      }
  }

  notifyNextCustomer = () => {
      var nitem = this.nextCustomerToNotify();
      if(nitem == undefined)
          return;

      var nickname = this.nicknameInLine(nitem);
      if(this.userIsStandee(nitem)) {
          this.setState({bShowStandeeTappedDialog:MSG_STANDEE_IS_NEXT, 
                         showStandeeTappedDialogMessage:BTN_REMOVE + " " + nickname + ' ?',
                         customerItemTapped: nitem})
      }
      else {
          var msg = BTN_NOTIFY + " " + this.nicknameInLine(nitem) + " ?";
          this.setState({bShowUserTappedDialog:'0',
                         bShowConfirmDialog:msg,
                         confirmCallback:this.notifyNextCustomerCallback});
      }
  }


  notifyPersonInLine = (item) => {
      // Send the notification
      var title = MSG_IT_IS_YOUR_TURN;
      var body  = '';  // don't like the look of this: MSG_GO_TO_THE_ENTRACE;
      var bPickup = this.isPickup(item);

      if(bPickup) {
          var title = title = "Your order at " + item.name + " is ready!";

          if(item.description !== '') {
              var desc = Buffer.from(item.description, 'base64').toString('binary');
              body = desc;
          }
          else {
              body = '';
          }
      }

      // If this is SMS, add a clickable URL to the message, so the user can open the browser easily
      var token  = getAPNTokenFromContact(item.contact);
      if(token.substring(0,4) === 'sms_') {
          if(global.itemQueueManagement.surl !== undefined) 
               body = body + " Tap here: " + global.safeQueueURL + '/' + global.itemQueueManagement.surl;
      }

      sendPush(item, global.notificationYouAreNext, title, body, "ready.wav", webSocket, true);

      // Register the time of notifcation
      let date = Date.now()
      const user = {
        ...item,
          state: bPickup ? 'notifiedpickup' : 'notified',
          whenNotified: date,
          userID: global.itemQueueManagement.userID,  // always use userID of queue owner
          id: item.id || item['_id']
      };

      this.setState({bShowBackdrop:MSG_NOTIFYING});

      /* test
      var tempitem = {...user};
      tempitem.theRef = undefined;
      console.log("USER: " + JSON.stringify(tempitem))
      return;
      */

      updateResilient(user, user, (fromserveritem) => {
          if(fromserveritem !== null) {
              // refresh
              //console.log("UPdated database for " + fromserveritem.name);
              this.updateLineList(global.deviceLocation, "Loading new data...");

              // handle any mirrors
              this.syncWithMirrors();

              this.setState({bShowBackdrop:'0'});
          }
          else {
              alert('Network Error\n\nDatabase update for next person failed.\nRefresh your browser.'); //, [{text: 'OK'}]);
              this.setState({bShowBackdrop:'0'});
          }
      });
  }


  scanCustomer = () => {
      isScanning = '1';
      this.setState({bShowScanner:'1',
                     bShowAutoNotifyWarningDialog: this.state.bAutoNotifyWarningShown ? '0' : '1',
                     bShowBtnScan:'0',
                     bShowBtnNextCustomer:'0',
                     bShowBtnStandee:'0',
                     bShowBtnPickUpList:'0',
                     bShowPickUpList:'0'})
  };

  scanCustomerCancel = () => {
      isScanning = '0';
      this.setState({bShowScanner:'0',
                     bShowBtnScan:'1',
                     bShowBtnNextCustomer:'1',
                     bShowBtnStandee:'1',
                     bShowBtnPickUpList: this.bPickupSupport() ? '1' : '0'
                   })
  };


  drawOpenCloseDialog = (item) => {
    if(this.state.bShowOpenCloseDialog === '0')
      return;

    const handleCancel = () => {
        this.setState({bShowOpenCloseDialog:'0'});
    };

    const handleDoit = () => {
        this.setState({bShowOpenCloseDialog:'0'});
        this.updateOpenCloseState(currentItem, (currentItem.state === 'closed') ? 'open' : 'closed');
    }

    return (
      <div>
        <Dialog open={true} onClose={handleCancel} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.state.titleOpenCloseDialog}</DialogTitle>
          <DialogContent>
            <DialogContentText>
               {this.state.messageOpenCloseDialog}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDoit} color="secondary">
              <b>{BTN_YES}</b>
            </Button>
            <Button onClick={handleCancel} color="primary">
              {BTN_NO}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}


toggleStoreOpen = (item) => {
    // can't change the store state while editing it
    if(this.state.bShowEditing === '1')
        return; 

    var title;
    var message;
    if(item.state === 'closed') {
        title = MSG_OPEN_THE_QUEUE; 
        message = MSG_ARE_YOU_SURE_YOU_WANT_TO_OPEN;
    }
    else {
        title = MSG_CLOSE_THE_QUEUE;
        message = MSG_ARE_YOU_SURE_YOU_WANT_TO_CLOSE;
    }

    this.setState({bShowOpenCloseDialog: '1', 
                   titleOpenCloseDialog: title,
                   messageOpenCloseDialog: message});
}

/*
 *  Called to open or close a queue
 */
updateOpenCloseState = (item, newstate) => {
    const payload = {
      ...global.itemQueueManagement,
        quantity: isNaN(item.quantity) ? 1 : parseInt(item.quantity),
        state: newstate,
        logo: item.logo,
        id: item.id || item['_id']
    };
 
    this.setState({bShowBackdrop:(newstate === 'open') ? MSG_OPENING_THE_QUEUE : MSG_CLOSING_THE_QUEUE});
    updateResilient(payload, item, (item) => {
        if(item !== null) {
            // success
            //item.state = newstate;
            currentItem.state = newstate;
            global.itemQueueManagement = item;

            // do a sync if necessary
            this.syncWithMirrors(); 

            this.setState({bShowBackdrop:'0',item:{...item, state: newstate}});
            this.updateLineList(global.deviceLocation, "Updating after state change...");
        }
        else {
            this.setState({bShowBackdrop:'0'});
            alert('Network Error\n\nFailed after two retries. Please check your network connection and try again.');
        }
    });
}

customerPressed = (customer) => {
    var item = global.itemQueueManagement;
    if((item.bMonitorOnly !== undefined) && (item.bMonitorOnly === '1'))
        return;

    if(this.userIsStandee(customer)) {
        var nickname = this.nicknameInLine(customer);
        this.setState({bShowStandeeTappedDialog: MSG_ACTIONS_FOR + '\n' + nickname, 
                       showStandeeTappedDialogMessage:'',
                       customerItemTapped: customer})
    }
    else if(this.isPickup(customer)) {
        var nickname = this.nicknameInLine(customer);
        this.setState({bShowPickupTappedDialog:MSG_ACTIONS_FOR + '\n' + nickname,
                       customerItemTapped: customer});
    }
    else {
        var nickname = this.nicknameInLine(customer);
        this.setState({bShowUserTappedDialog:MSG_ACTIONS_FOR + '\n' + nickname, customerItemTapped: customer});
    }
}


// does the actual notification
notifyCallback = () => {
    this.notifyPersonInLine(this.state.customerItemTapped);
}

// does the actual remove
removeCallback = () => {
    // figure out who to notify
    // This notifies everyone after the person being removed
    // Even customer notified to come in are consider "in line" for the number you are in line
    var tonotify = new Array(); 
    var offset = 10000000000;
    for(var i=0; i<this.state.sortedfilteredItems.length; i++) {
        var titem = this.state.sortedfilteredItems[i];
      
        if(titem['_id'] === this.state.customerItemTapped['_id']) {
            // this is the person to remove (and could have already been notified)
            offset = i;  
        }

        if(i > offset) {
            tonotify.push(titem);
        }
    }

    // tonotify inludes customers already notified to come in,
    // though these are filtered out so won't get a notification again
    //console.log("remove, will possibly notify " + tonotify.length + " persons, offset: " + offset);
    var bForcedRemoval = this.userIsStandee(this.state.customerItemTapped) ? false : true;
    this.removeFromLine(this.state.customerItemTapped['_id'], true, tonotify, offset, bForcedRemoval);
}


drawUserTappedDialog = () => {
    if(this.state.bShowUserTappedDialog === '0')
      return;

    const handleCancel = () => {
        this.setState({bShowUserTappedDialog:'0'});
    };

    const handleNotify = () => {
        var nickname = this.nicknameInLine(this.state.customerItemTapped);
        var msg = BTN_NOTIFY + " " + nickname + " ?";
                     
        // dont confirm, just do it
        this.setState({bShowUserTappedDialog:'0'});
        this.notifyCallback();

        /*
        this.setState({bShowUserTappedDialog:'0',
                       bShowConfirmDialog:msg,
                       confirmCallback:this.notifyCallback}); */
    }

    const handleRemove = () => {
        var nickname = this.nicknameInLine(this.state.customerItemTapped);
        var msg = BTN_REMOVE + " " + nickname + " ?";
                        
        this.setState({bShowUserTappedDialog:'0',
                       bShowConfirmDialog:msg,
                       confirmCallback:this.removeCallback});
    }

    const handleSimulatedScan = () => {
        var userid = getUserIDFromContact(this.state.customerItemTapped.contact);
        console.log("simulated scan for " + userid)

        this.onScanSuccess(userid);
        this.setState({bShowUserTappedDialog:'0'});
    }

    // Only allow simulated scan if there's been a notification
    var bCanScan = (this.state.customerItemTapped.state === 'notified') ? true : false;

    var delstyle={width:"75%",marginBottom:8,marginTop:8,marginLeft:16,marginRight:16,borderRadius:10,borderColor:'#000000', backgroundColor:'#da1e28'};
    var btnstyle={width:"75%",marginBottom:8,marginTop:8,marginLeft:16,marginRight:16,borderRadius:10,borderColor:'#000000', backgroundColor:themeMainColor};

    return (
      <div>
        <Dialog open={true} onClose={handleCancel} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.state.bShowUserTappedDialog}</DialogTitle>
        
            <Button style={btnstyle} onClick={handleNotify} color="primary">
              <div style={{fontSize:"120%",color:"#FFFFFF"}}>{BTN_NOTIFY}</div>
            </Button>

            { bCanScan && 
                <Button style={btnstyle} onClick={handleSimulatedScan} color="primary">
                  <div style={{fontSize:"120%",color:"#FFFFFF"}}>SIMULATE SCANNED</div>
                </Button>
            }
        
            <Button style={delstyle} onClick={handleRemove} color="secondary">
              <div style={{fontSize:"120%",color:"#FFFFFF"}}>{BTN_REMOVE}</div>
            </Button>

            <DialogActions>
             <Button onClick={handleCancel} color="primary">
              {BTN_CANCEL}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}


drawStandeeTappedDialog = () => {
    if(this.state.bShowStandeeTappedDialog === '0')
      return;

    const handleCancel = () => {
        this.setState({bShowStandeeTappedDialog:'0'});
    };

    const handleRemove = () => {
        this.removeCallback();
        this.setState({bShowStandeeTappedDialog:'0'});
    }

    const handlePickup = () => {
        var nickname = this.nicknameInLine(this.state.customerItemTapped);
        var msg = "Move " + nickname + " to pick-up?";
                      
        this.moveStandeeToPickUp(this.state.customerItemTapped);  
        this.setState({bShowStandeeTappedDialog:'0'});
    }

    var bCanMoveToPickup = true;
    if(this.state.customerItemTapped.state === 'pickup')
        bCanMoveToPickup = false;

    var delstyle={width:"75%",marginBottom:8,marginTop:8,marginLeft:16,marginRight:16,borderRadius:10,borderColor:'#000000', backgroundColor:'#da1e28'};
    var btnstyle={width:"75%",marginBottom:8,marginTop:8,marginLeft:16,marginRight:16,borderRadius:10,borderColor:'#000000', backgroundColor:themeMainColor};

    return (
      <div>
        <Dialog open={true} onClose={handleCancel} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.state.bShowStandeeTappedDialog}</DialogTitle>
          <DialogContent>
          {this.state.showStandeeTappedDialogMessage}
          </DialogContent>
            { this.bPickupSupport() && bCanMoveToPickup &&
              <Button style={btnstyle} onClick={handlePickup} color="secondary">
                <div style={{fontSize:"120%", color:'#FFFFFF'}}>Move To Pickup</div>
              </Button>
            }
            <Button style={delstyle} onClick={handleRemove} color="secondary">
              <div style={{fontSize:"120%", color:'#FFFFFF'}}>{BTN_REMOVE}</div>
            </Button>

          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              {BTN_CANCEL}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}



drawPickupTappedDialog = () => {
    if(this.state.bShowPickupTappedDialog === '0')
      return;

    const handleCancel = () => {
        this.setState({bShowPickupTappedDialog:'0'});
    };

    const handleNotify = () => {
        var nickname = this.nicknameInLine(this.state.customerItemTapped);
        var msg = BTN_NOTIFY + " " + nickname + " ?";

        // dont confirm, just do it
        this.setState({bShowPickupTappedDialog:'0'});
        this.notifyCallback();
    }

    const handleRemove = () => {
        var nickname = this.nicknameInLine(this.state.customerItemTapped);
        var msg = BTN_REMOVE + " " + nickname + " ?";
                        
        this.setState({bShowPickupTappedDialog:'0',
                       bShowConfirmDialog:msg,
                       confirmCallback:this.removeCallback});
    }

     const handleSimulatedScan = () => {
        var userid = getUserIDFromContact(this.state.customerItemTapped.contact);
        console.log("simulated scan for " + userid)

        this.onScanSuccess(userid);
        this.setState({bShowPickupTappedDialog:'0'});
    }

    // Only allow simulated scan if there's been a notification
    var bCanScan = (this.state.customerItemTapped.state === 'notifiedpickup') ? true : false;

    var delstyle={width:"75%",marginBottom:8,marginTop:8,marginLeft:16,marginRight:16,borderRadius:10,borderColor:'#000000', backgroundColor:'#da1e28'};
    var btnstyle={width:"75%",marginBottom:8,marginTop:8,marginLeft:16,marginRight:16,borderRadius:10,borderColor:'#000000', backgroundColor:themeMainColor};

    return (
      <div>
        <Dialog open={true} onClose={handleCancel} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.state.bShowPickupTappedDialog}</DialogTitle>
         
          <Button style={btnstyle} onClick={handleNotify} color="primary">
              <div style={{fontSize:"120%", color:'#FFFFFF'}}>{BTN_NOTIFY}</div>
          </Button>

          { bCanScan &&
              <Button style={btnstyle} onClick={handleSimulatedScan} color="secondary">
                  <div style={{fontSize:"120%",color:"#FFFFFF"}}>SIMULATE SCANNED</div>
              </Button>
          }

          <Button style={delstyle} onClick={handleRemove} color="secondary">
              <div style={{fontSize:"120%", color:'#FFFFFF'}}>{BTN_REMOVE}</div>
          </Button>
          
          <DialogActions>
             <Button onClick={handleCancel} color="primary">
              {BTN_CANCEL}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

  
/*
 * Remove a person from line
 *
 * Notifies everyone in tonotify. offset is the number in line of the first person in tonotify
 * This is because we only need to notify those behind that person in line
 */
removeFromLine = (theId, bShowActivity, tonotify, offset, bForcedRemoval) => {
    if(offset === undefined)
        offset = 0;  // default to the start of the line

    //console.log("tonotify has " + tonotify.length + " items");

    const payload = {
      ...this.state.customerItemTapped,
         id: theId
    };

    // remove the line db entry
    if(bShowActivity) this.setState({bShowBackdrop:MSG_REMOVING});
    removeResilient(payload, payload, (item) => {
        if(item != null) {
            // success
            this.updateLineList('', "Updating after remove...");
            if(bShowActivity) this.setState({bShowBackdrop:'0'});

            // do a sync if necessary
            this.syncWithMirrors(); 

            if(tonotify !== undefined) {
                var type = global.notificationMoveUp;
                var title = ''; // Your Safe Queue has been updated.';
                var body;
                var sound;
                var numberInLine = offset;  // first person to notify
                for(var i=0; i<tonotify.length; i++) {
                    var titem = tonotify[i];

                    var allowSMS = true;

                    var itemstate = getStateFromState(titem.state);
                    if(itemstate !== 'notified') { // means notified to come in! So dont' send anything
                        if(numberInLine == 0) {
                            sound = 'next.wav';
                            body = 'You are now next in line!';

                            // If the auto-notify is set, notify the next person instead of this push
                            if(!this.userIsStandee(titem)) {
                                if(this.bAutoNotifySupport()) {
                                    console.log("AUTO NOTIFY for " + titem.contact)
                                    titem.state = 'notified'; // no need to track down counter
                                    this.notifyPersonInLine(titem);
                                    numberInLine++;
                                    continue;  // don't do the push
                                }
                            }
                        }
                        else if(numberInLine == 1) {
                            sound = 'second.wav';
                            body = 'You are now second in line!';
                        }
                        else if(numberInLine == 2) {
                            sound = 'third.wav';
                            body = 'You are now third in line!';
                            allowSMS = false;
                        }
                        else if(numberInLine == 3) {
                            sound = 'fourth.wav';
                            body = 'You are now fourth in line!';
                            allowSMS = false;
                        }
                        else {
                            sound = 'beep1.wav';
                            body  = 'The line has moved up.';
                            allowSMS = false;
                        }

                        if(this.userIsStandee(titem)) {
                            //console.log("Skipping push to " + getUserIDFromContact(titem.contact) + " " + numberInLine + " " + sound);
                        }
                        else {
                            //console.log("Sending push to " + getUserIDFromContact(titem.contact) + " " + numberInLine + " " + sound);
                            sendPush(titem, type, title, body, sound, webSocket, allowSMS);
                        }
                    }

                    numberInLine++;
                }
            }

            // try to let a customer know he was removed from line by the manager
            if(bForcedRemoval) {
                // we won't allow texting here, as this is just a convienence - the app will update of course regardless
                sendPush(this.state.customerItemTapped, global.notificationRemoved, '', 'You have been removed from the line.', 'silent.wav', webSocket, false);
            }
        }
        else {
            if(bShowActivity) this.setState({bShowBackdrop:'0'});
            alert('Network Error\n\nRemove failed after two retries. Please check your network connection and try again.');
        }
    });
}

syncWithMirrors = () => { 
    var store = global.itemQueueManagement;
    if((store.mirrors !== undefined) && (store.mirrors !== 'none') && (store.mirrors !== '')) {  // rememeber the cloudant update issue
        // there is a mirror and it may be me
        if(store.userID === global.userID) {
            // I'm the owner, so send it to the mirror
            var mirrorID = getAPNTokenFromContact(store.mirrors);
            this.syncStore(mirrorID);
        }
        else {
            // I'm the mirror, so send to the owner
            this.syncStore(store.userID)
        }
    }
}

isMirror = () => {
      var store = global.itemQueueManagement;
      var myContact = global.userID + "][" + global.userID;  // contact is form: userID][apnsToken
      if((store.mirrors !== undefined) && (store.mirrors === myContact))
          return true;

      return false;
}

/*
 * send the push to the store passed in, this is for SYNC ONLY
 *
 * This assumes store's apnsToken is the userID.
 */
syncStore = (storeID, callback) => {
    var token  = storeID; 
    var payload = {title: "sync", body: "", payload: {type: global.notificationSync, nickname: '', userid: ''}};
    var spayload = JSON.stringify(payload);
    var spayload64 = Buffer.from(spayload, 'binary').toString('base64');

    //console.log("SYNC to: " + token + "  PAYLOAD: " + spayload);

    pushResilient(token, spayload64, "silent.wav", (response) => {
        if(response != null) {
            if(response.result == 'SUCCESS') {
                console.log('Sync has been sent.');
                if(callback !== undefined) callback();
            }
            else {
                 // The notification failed, but the database may still have been updated
                 // TODO: take out this alert as it is only useful in debugging
                 alert("Notification Failed", 'Reported error:\n' + response.result);
            }
        }
        else {
            // Well, there's really nothing to be done here
            // Network errors are almost always caught before we get here. It is a small window
            // so just let it go silently
            alert('Network Error', "Notification failed after two retries. Please check your network connection and try again.", [{text: 'OK'}]);
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
          <DialogTitle id="form-dialog-title">{this.state.bShowConfirmDialog}</DialogTitle>
          { this.state.showConfirmDialogSubtitle !== '' && 
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',paddingBottom:16}}>
                  <div style={{fontSize:'100%'}}>{this.state.showConfirmDialogSubtitle}</div>
              </div>
          }
          <DialogActions>
            <Button onClick={handleAction} color="secondary">
              <b>{BTN_YES}</b>
            </Button>
             <Button onClick={handleCancel} color="primary">
              {BTN_NO}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
  

/*
 *  This is each entry in customer list
 */
renderItem = (item, idx) => {
    const classes = global.materialclasses;  // useStyles();

    var userid = getUserIDFromContact(item.contact);
    var prefix = userid.substring(0,4);

    var highlight = this.watchDogColor(item);


    var style={width:"98%",marginLeft:4, marginBottom:2,borderRadius:8,padding:10,borderWidth:1,
              borderColor:'#000000', backgroundColor:highlight,
              display: 'flex', justify:'flex-start', outline:'none'}; 
    if(prefix === 'std_')
        style={width:"98%",marginLeft:4, marginBottom:2,borderRadius:8,padding:10,borderWidth:1,
              borderColor:'#000000', backgroundColor:'#CCCCCC',
              display: 'flex', justify:'flex-start', outline:'none'}; 

    return (  
      <div key={idx} style={{backgroundColor:'#F1F0EE'}}>  
          <button style={style} onClick={() => 
            { 
                this.customerPressed(item);
            }}>
            <Grid container spacing={16}
                direction="row"
                justify="space-between"
                alignItems="center">  
                  <Grid item xs={1}>
                      <div style={{fontSize:'130%',textAlign:'left'}}>{this.numberInLine(item)}</div>
                  </Grid>
                   <Grid item xs={7}>
                      <div style={{fontSize:'130%'}}>{this.notifiedTextDate(item)}</div>
                  </Grid>
                   <Grid item xs={4}>
                      <div style={{fontSize:'130%',textAlign:'right'}}>{this.nicknameInLine(item)}</div>
                  </Grid>
            </Grid>
          </button>
      </div>
    );
  };

  getWebSocketIcon = () => {
      if(this.state.webSocketState === '***')
          return icon_good;
       else
          return icon_warning;
  }

	/*
	 * THIS IS EACH ITEM IN THE LIST
	 */
	drawItem = () => {
		  const classes = global.materialclasses;  // useStyles();

      var item = global.itemQueueManagement;
	    var address = item.description.split('\n');
	    var address0 = address[0];
	    var address1 = "";
	    if(address.length > 1)
	        address1 = address[1];
      var address2 = "";
      if(address.length > 2)
          address2 = address[2];
	  
	    var imageUrl = "";
      // kluge here: a deleted logo from editing forces the logo to '---' because '' means don't change
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

      if(this.state.croppedImageUrl !== undefined) {
          imageUrl = this.state.croppedImageUrl;
      }

      // contact info
      var contactInfo = '';
      if((item.custom !== undefined) && (item.custom.contactinfo !== undefined))
          contactInfo = item.custom.contactinfo;

      if(this.state.newContactInfo !== '')
          contactInfo = this.state.newContactInfo;

	    // Store code is frist 8 characters of the database id
   		var fullid = item.id || item['_id'];
    	var storecode = fullid.substring(0,8);
      if((item.bMonitorOnly !== undefined) && (item.bMonitorOnly === '1'))
          storecode = storecode + " (monitor only)";

      if((item.bMirror !== undefined) && (item.bMirror === '1'))
          storecode = storecode + " (MIRROR)";
      else if(item.bHasMirrors === '1')
          storecode = storecode + " (+1 MIRROR)";

      this.state.displayStoreCode = storecode;

	    var isClosed = (item.state ==='closed');

      var isEditing = (this.state.bShowEditing === '1') ? true : false;
      var delstyle={marginBottom:0,marginTop:8,borderRadius:10,borderColor:'#000000', backgroundColor:'#da1e28'};

	    var style={width:"98%",marginBottom:2,borderRadius:10,borderColor:'#000000', backgroundColor:'#F1F0EE'}; // gray
	    var textNameStyle      = {textAlign:"left", color:"#000000", textTransform:"none", fontSize:"110%", marginTop:8};
	    var textAddressStyle   = {textAlign:"left", color:"gray",    textTransform:"none", fontSize:"110%", marginTop:-8};
	    var textNameLargeStyle = {textAlign:"left", color:"#000000", textTransform:"none", fontSize:"150%", marginTop:0};
	   	var textStoreCodeStyle = {textAlign:"left", color:"#000000", textTransform:"none", fontSize:"110%", marginTop:0};
      var printstyle={width:"85%", height:"40%", marginTop:8,borderRadius:5,borderColor:'#000000', backgroundColor:themeMainColor};
      var contactStyle   = {textAlign:"left", color:"gray", textTransform:"none", fontSize:"110%", marginTop:0};

      // Safari seems to render the button wrong... or at least different from Chome
      var marginKluge = 0;
      if(isSafari) 
          marginKluge = global.bSpanish ? -2 : -6;

      var btnFontSize = "100%";
      if(global.bSpanish)
          btnFontSize = "80%";

	  	return (
	      	<Button variant='outlined' style={style} 

	          	onClick = { isEditing ? undefined : () => 
	          	{ 
	          		  // this will refresh
                  this.setState({bShowBackdrop:'Refreshing...'});
                  this.updateLineList(this.state.location, "Updating from user tap...");
                  this.createWebSocket(item);  // just to be sure
                  this.setState({bShowBackdrop:'0'});  // not exactly right... but close                    
	          	}}>
              
	          	<div className={classes.root}>

                  { !isEditing && this.drawBtnEdit() }

	                <Grid container spacing={0}>
	                    { imageUrl !== "" &&
	                        <Grid container
	                              direction="column"
	                              justify="flex-start"
	                              alignItems="flex-start"  
	                              xs={9}>
                                    { !isEditing && 
	                                      <img src={imageUrl} width="250" style={{marginTop:8,borderRadius:10}}/>
                                    }

                                    { false && 
                                        <div>
                                        // TODO: currently don't allow deletion of a logo. Must delete the entire queue.
                                        // deleting an existing logo is hard to do, since the 'PATCH' REST 
                                        //       treats a blank field as "don't change" and we need to set it to ''
                                        //       Tried setting the logo to '---' instead of '' but that will crash
                                        //       all current clients until they are updated to include the code that
                                        //       includes test for '---' beyond test for ''
                                        </div>
                                    }
                                    { isEditing && false && 
                                        <Button style={delstyle} onClick={this.removephoto}>
                                        <div style={{color:'#FFFFFF',fontSize:'80%'}}>DELETE LOGO</div>
                                        </Button>
                                    }
                                    { isEditing && 
                                        <div>
                                        { this.drawBtnEdit() }
                                        <div style={{fontSize:'80%',textTransform:'none',textAlign:'left',paddingLeft:10}}>
                                            Tap to change:
                                        </div>
                                        <Button  style={{padding:0}}>
                                            <label for="file-upload" >
                                                <img src={imageUrl} width="250" style={{marginTop:0,borderRadius:10}}/>
                                            </label>
                                            <input id="file-upload" type="file" accept="image/*" onChange={this.onSelectFile} />
                                        </Button>
                                        </div>
                                    }
	                        </Grid>
	                    }
	                    { imageUrl === "" &&
	                        <Grid container
	                            direction="column"
	                            justify="flex-start"
	                            alignItems="flex-start"  
	                            xm={9} xs={9}>
                                  { this.drawBtnEdit() }
                                  { this.state.bShowEditing === '0' && 
                                      <div>
                                      <div style={{height:32}}></div>
                                      <div style={textNameLargeStyle}><b>{item.name}</b></div>
                                      </div>
                                  }
                                  { this.state.bShowEditing !== '0' && 
                                       <Button variant="outlined" style={{padding:4}}>
                                            <label for="file-upload" >
                                                {BTN_ADD_BUSINESS_LOGO}
                                            </label>
                                            <input id="file-upload" type="file" accept="image/*" onChange={this.onSelectFile} />
                                        </Button>
                                  }
                                  { this.state.bShowEditing !== '0' && 
                                      <TextField style={{width:250,marginTop:8,fontSize:'80%',textTransform:'none'}}
                                            id="outlined-basic-name"
                                            value={this.state.item.name}
                                            label={TTL_BUSINESS_NAME} 
                                            variant="outlined"
                                            onChange={(e) => this.setState({ item:{...item, name: e.target.value}})}
                                       />
                                  }
	                        </Grid>
	                    }
	                    <Grid container 
	                          direction="column"
	                          justify="center"
	                          alignItems="center"  xs={3}>
                            <Button onClick={(e) => { this.toggleStoreOpen(item); e.stopPropagation();}}>
	                             <img src={isClosed ? 
                                  global.bSpanish ? img_signclosed_es : img_signclosed : 
                                  global.bSpanish ? img_signopen_es : img_signopen} width="70"/>
                            </Button>
	                    </Grid>
	                    <Grid container
	                          direction="column"
	                          justify="flex-start"
	                          alignItems="flex-start"
	                          xs={9} xs={9}>
                                { (imageUrl !== "") && !isEditing && 
                                    <div style={textNameStyle}><b>{item.name}</b></div>
                                }
                                { (imageUrl !== "") && isEditing && 
                                    <TextField style={{width:250,marginTop:8,fontSize:'80%',textTransform:'none'}}
                                        id="outlined-basic-name"
                                        value={this.state.item.name}
                                        label={'Business Name'}
                                        variant="outlined"
                                        onChange={(e) => this.setState({ item:{...item, name: e.target.value}})}
                                    />
                                }
	                              
                                { !isEditing && 
                                    <div>
        	                              <div style={textAddressStyle}>{address0}</div>
        	                              <div style={textAddressStyle}>{address1}</div>
                                        { address2 != "" &&
                                           <div style={textAddressStyle}>{address2}</div>
                                        }
                                        { contactInfo !== '' &&
                                            <div style={contactStyle}><b>Contact: </b>{contactInfo}</div>
                                        }
                                    </div>
                                }
                                { isEditing && 
                                    <div style={{marginLeft:-28}}>
                                        <TextField style={{width:250,marginTop:8,fontSize:'80%', textTransform:'none'}}
                                           id="outlined-multiline-static"
                                           label={this.state.estimatedAddressLabel}
                                           multiline
                                           label={TTL_BUSINESS_ADDRESS}
                                           rows={3}
                                           value={this.state.item.description}
                                           variant="outlined"
                                           onChange={(e) => this.setState({ item:{...this.state.item, description: e.target.value}})}
                                        />
                                        <TextField style={{width:250,marginTop:8,fontSize:'80%', textTransform:'none'}}
                                            id="outlined-basic-name"
                                            label={TTL_CONTACT_INFO}
                                            hintText="e.g. 310-555-4555"
                                            value={this.state.newContactInfo}
                                            variant="outlined"
                                            onChange={(e) => this.setState({newContactInfo:e.target.value})}
                                        />
                                    </div>
                                }
        	                      <div style={textStoreCodeStyle}>{this.state.displayStoreCode}</div>
	                              { bShowDebug === true && <div style={textAddressStyle}>{this.state.debugString}</div> }
	                    </Grid>
	                    <Grid container
	                          direction="row"
	                          justify="center"
	                          alignItems="space-around" 
	                          xs={3} xm={3}>
                            <Grid item>
                                { item.bMonitorOnly !== '1' && 
                                  <div>
                                  <div style={{textTransform:'none',paddingTop:8}}>{TTL_NOTIFICATIONS}</div>
                                  <img style={{height:20,marginTop:-12}} src={this.getWebSocketIcon()}/>
                                  </div>
                                }
                                <Button style={printstyle} onClick={this.showPrintableQRCode} > 
                                    <div style={{textTransform:'none',color:'#FFFFFF',fontSize:btnFontSize,marginTop:marginKluge}}>{BTN_QUEUE_LINKS}</div>
                                </Button>

                                { isEditing &&
                                    <div style={{marginTop:8}}>
                                        <Button onClick={(e) => { this.showMapForNewLocation(); e.stopPropagation(); }}>
                                            <img src={mappin} height="28"/><div style={{marginLeft:4}}>{this.state.bShowEditMapButtonLabel}</div>
                                        </Button>
                                        <div style={{height:32}}></div>
                                    </div>
                                }
                            </Grid>
	                    </Grid>
	                </Grid>
                
                  { isEditing && this.state.bShowEditMap &&
                      <div style={{marginLeft:4,marginTop:4}} ref={(ref) => this.theMapDiv = ref}>
                          <div style={{textTransform:'none'}}><b>Move to the new location of your business!</b></div>
                          <div style={{textTransform:'none',marginTop:-6}}>If saved, your new business location will be:</div>
                          <div style={{fontSize:"80%",marginTop:-4}}>{this.state.position}</div>
                          <DisplayMapClass ref={(ref) => this.theMap = ref} height='320px' width='98%' 
                              radius={0}
                              storeLocation={this.state.position}/>
                      </div> 
                  }
	          </div>
	      </Button>
	    );
	}

showMapForNewLocation = () => {
    if(this.state.bShowEditMap)
    {
        this.displayErrorMessage(
                    "Business location won't be changed.",
                    "If you did want to change the location, leave the map open when you tap on SAVE.","",);
        this.setState({bShowEditMap:false, bShowEditMapButtonLabel:"CHANGE"})
    }
    else {      
        console.log("Start")
        this.setState({position:global.itemQueueManagement.location,
                       bShowEditMap:true, bShowEditMapButtonLabel:"CANCEL"});

        // get our most current location and keep updating it
        navigator.geolocation.watchPosition((pos) => {
            //console.log("got watch")
            var loc =`${pos.coords.latitude},${pos.coords.longitude}`;
            this.setState({position: loc});
        },
        (error) => {
            if(global.bAllowFakeGPSLocation) {
                // TESTING - make it move a little...
                var loc = "33.74850178638623,-118.39797829951722";
                setTimeout(() => { this.setState({position: "33.759934,-118.394685"}); }, 10000);
                this.setState({position: loc});
            }
            else {
                this.displayErrorMessage(
                    MSG_SAFE_QUEUE_NEEDS_YOUR_GPS_LOCATION,
                    MSG_CHANGE_YOUR_BROWSER_SETTINGS,
                    MSG_YOUR_BROWSER_REPORTED + "'" + error.message + "'",
                    returnToManager); // callback
                  var loc = "0,0";
            }
        },
        {enableHighAccuracy: true});
    }
}


drawBtnNextCustomer = () => {

    return;  // decided to get rid of this button

    if(this.state.bShowBtnNextCustomer === '0')
        return;

    var style={width:"98%",marginBottom:8,borderRadius:10,borderColor:'#000000', backgroundColor:themeMainColor};
    return (
        <Button style={style} onClick={this.notifyNextCustomer} > 
            <div style={{color:'#FFFFFF',fontSize:'130%',padding:6}}>{BTN_NOTIFY_NEXT_CUSTOMER}</div>
        </Button>
    );
}



drawBtnPickUpList = () => {
    if(this.state.bShowBtnPickUpList === '0')
        return;

    if(!this.bPickupSupport())
        return;

    var style={width:"98%",marginBottom:8,borderRadius:10,borderColor:'#000000', backgroundColor:themeMainColor};

    var number = this.state.pickupItems.length;
    var title;
    if(this.state.bShowPickUpList === '0') 
        title = "SHOW PICK-UP LIST (" + number + ")";
    else 
        var title = "CLOSE PICK-UP LIST";
  
    return (
        <Button style={style} 
            onClick={(e) => {
                e.stopPropagation();
                var newone = (this.state.bShowPickUpList === '0') ? '1' : '0';
                this.setState({bShowPickUpList:newone});
            }}> 
            <div style={{color:'#FFFFFF',fontSize:'130%',padding:6}}>{title} </div>
        </Button>
    );
}


isPickup = (theItem) => {
    if((theItem.state === 'pickup') || (theItem.state === 'notifiedpickup'))
        return true;

    // OR... KLUGE - a pickup and so has a description beginning with '#_'
    if(theItem.description !== '') {
        var desc = Buffer.from(theItem.description, 'base64').toString('binary');
        var pre = desc.substring(0,2);
        if(pre === '#_') 
            return true;
        else
            return false;
    }

    return false;
}

drawBtnAddPickUp = () => {
    //if(this.state.bShowBtnAddPickup === '0')
    //    return;

    //if(this.state.bShowEditing !== '0')
    //    return;

    if(!this.bPickupSupport())
        return;

    var style={width:"98%",marginBottom:8,borderRadius:8,borderColor:'#000000',borderWidth:1, backgroundColor:themeMainColor};

    var title  = BTN_ADD_PICKUP;
  
    return (
        <Button style={style} onClick={(e) => {
                e.stopPropagation();

                // don't allow if the queue is closed
                if(global.itemQueueManagement.state === 'closed') {
                    this.displayErrorMessage("Sorry...", "You must open your Safe Queue to add a pick up!");
                    return;
                }

                console.log("Creating Pick up id number: " + global.standeeCount);
                global.standeeCount++;
                var newcount = global.standeeCount % 1000;  // no more than 3 digits
                storeData("@SafeQueueStandeeCount", global.standeeCount);  // we keep this forever
                var newid = '#_' + newcount.toString().padStart(3,'0');

                var max = 1000000;
                var nick = newid; // '#' + Math.floor(Math.random() * Math.floor(max));
                var nickname = nick.substring(0,6);  
                var nickname64 = Buffer.from(nickname, 'binary').toString('base64');

                this.setState({bShowQRCodePickup:newid})
            }} > 
             <Grid container  
                direction="row"
                       justify="flex-start"
                       alignItems="center">

                <Grid item xs={10}>
                      <div style={{color:'#FFFFFF',fontSize:'100%',padding:6}}>{title}</div>
                </Grid>
                 <Grid item xs={2}>
                      <Button onClick={(e) => {this.showInfoPickup(); e.stopPropagation();}}><img src={icon_about} height="20"/></Button>
                </Grid>
            </Grid>
        </Button>
    );
}


showInfoPickup = () => {
  if(!global.bSpanish) {
      this.displayHelpMessage("Order Pick-Up",

      "This button will add a customer to your Pick-Up list, which is a virtual list of your customers waiting at a " +
      "safe place nearby to be notified when their order is ready to be picked up.",

      "You can notify the customer in one of two ways: by SMS Text Message or through the Safe Queue App. " +
      " When through the app, the customer scans a QR Code shown, which is be a link to open the app on his device " +
      " and enter him into the pickup line. He can monitor progress and be notified in the app.",

      "When the order is ready, tap on the entry in the Pick-Up line and the customer will be notified with the " +
      "option chosen.");
  }
  else {
      // NEEDS TRANSLATION
      this.displayHelpMessage("Recogida de Pedidos",

      "Este botón agregará un cliente a su lista de recogida, que es una lista virtual de sus clientes esperando en un " +
      "lugar seguro cercano para ser notificado cuando su pedido esté listo para ser recogido.",

      "Puede notificar al cliente de una de dos maneras: mediante un mensaje de texto SMS o mediante la aplicación Cola Segura. " +
      " Cuando a través de la aplicación, el cliente escanea un código QR que se muestra, que es un enlace para abrir la aplicación en su dispositivo." +
      " e introdúzcalo en la línea de recogida. Puede monitorear el progreso y recibir notificaciones en la aplicación.", 

      "Cuando el pedido esté listo, toque la entrada en la línea de recogida y el cliente será notificado con el opción elegida.");
  }
}

drawQRCodePickUp = () => {
    if(this.state.bShowQRCodePickup === '0')
        return;

    var stylecenter = {display: 'flex', justifyContent:'center', alignItems:'center',marginTop:8};
    var stylelabel = {display: 'flex', marginTop:8, marginBottom:8,justifyContent:'center', alignItems:'center',fontSize:"100%"};
    var stylebig = {display: 'flex', marginTop:8, justifyContent:'center', alignItems:'center',fontSize:"150%"};
    var stylehead = {display: 'flex', marginTop:24, marginBottom:8,justifyContent:'flex-start', alignItems:'center',fontSize:"100%"};
    var btnstyle={width:"98%",marginBottom:8,marginTop:8,borderRadius:10,borderColor:'#000000', backgroundColor:themeMainColor};

    /*
     * The SMS number is optional, but if entered is shown here
     */
    const handleSmsPickupChange = (value) => {
        // the value passed in is in pretty format
        // we need to remove all the spaces and parens for use with Twilio
        var tight = value.replace(/\s/g,'');
        tight = tight.replace("(", "");
        tight = tight.replace(")", "");
        tight = tight.replace("-", "");
        smsEntered = tight;
    }

    /* 
     * The QR Code is a url that if scanned by a camera app does the following:
     *
     * 1. goes the customer destination of this store
     * 2. joins automatically as a pick-up
     * 3. passes the nickname as base64
     *
     */

    smsPickupID =  this.state.bShowQRCodePickup.substring(0,6);  
    var pickupID64 = Buffer.from(smsPickupID, 'binary').toString('base64');
    var storename = global.itemQueueManagement.name;
    var prefix;
    if(window.location.port === '')
        prefix = window.location.protocol + "//" + window.location.hostname;
    else 
        prefix = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;;
    urlPickup = prefix + "/?dest=customer&bus=" + encodeURI(storename) + "&pickup=" + pickupID64;

    console.log("PICKUP URL: " + urlPickup);
    return (
        <div>
          <Dialog open={true}  aria-labelledby="form-dialog-title">
            <DialogContent>
                <div style={{fontSize:"120%"}}>PICKUP OPTIONS</div>

                <div style={stylehead}>Option 1: Send SMS Text Message:</div>

                <MuiPhoneNumber defaultCountry={!global.bSpanish ? 'us' : 'es'} 
                                regions={['north-america',  'south-america', 'central-america', 'carribean','europe']}
                                margin="dense"
                                variant="outlined"
                                id="sms"
                                label={TTL_PHONE_NUMBER}
                                fullWidth
                                onChange={handleSmsPickupChange}/>
                <Button style={btnstyle} onClick={(e) => {
                          e.stopPropagation();
                          this.addSMSPickup();                      
                    }} > 
                    <div style={{color:'#FFFFFF'}}>Register Text Message</div>
                </Button> 
                

                <div style={stylehead}>Option 2: Have customer scan this code:</div>
                <div style={stylebig}><b>{this.state.bShowQRCodePickup}</b></div>
                <div style={stylecenter}>
                    <QRCode
                        value={urlPickup}
                        size={150}
                        color="black"
                    />
                </div>

                <div style={stylelabel}>When the customer follows the link in this QR Code, 
                he will be added to the pick-up list.</div>

                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:16,fontSize:"80%"}}>      
                    <Spinner style={{height:16}} name="circle" color="black" />
                    <div style={{transform:'none',marginLeft:8}}><b>Waiting for confirmation...</b></div>
                </div>

                <div style={{display: 'flex',  justifyContent:'flex-end', alignItems:'',
                                paddingBottom:8,paddingTop:16}}>
                  <Button onClick={(e) => {
                          e.stopPropagation();
                          this.setState({bShowQRCodePickup:'0'})
                      }}
                      color="primary">
                          <div style={{fontSize:"100%"}}>{BTN_CANCEL}</div>
                  </Button>    
                </div>
            </DialogContent>
          </Dialog>
        </div>
    );
}

/*
 *  Join the pickup list with SMS text as notification, 
 *  but not from already waiting in line 
 */
addSMSPickup = () => {
    if(smsEntered === '') {
        alert("You must enter a phone number!");
        return;
    }
      
    // base64 encode nickname field in the database
    var nickname = smsPickupID;
    var nickname64 = Buffer.from(nickname, 'binary').toString('base64');
    
    const payload = {
      ...global.itemQueueManagement,
        contact: smsPickupID + '][' + 'sms_' + smsEntered,  // order #A is user, SMS text as new "APN"
        description: nickname64,
        logo:'',
        state: 'pickup',
    };

    this.setState({joinNickanme:nickname,
                   bShowBackdrop: "Registering Pickup...",
                   bShowJoinDialog:'0',
                   bShowMap: '0',    
                   showMapIdx: -1}); 

    console.log("PAYLOAD: " + JSON.stringify(payload));

    addResilient(payload, payload, (item) => {
        if(item != null) {
            global.targetBusinessEnter = '0';  // so we don't join again (must refresh the browser)

            // notify ourself
            var title = "New pick up " + smsPickupID + " for " + smsEntered;
            var body = ''
            this.setState({bShowNotification:title + " " + body});
            var audio = new Audio(sound_shortbeep); 
            this.playSound(audio);
            this.updateLineList(this.state.location, "Updating from SMS PICKUP addition...", this.notifyAfterNewJoinSMSPickup);
        
            // handle mirrors
            this.syncWithMirrors(); 
        }
        else {
          alert("Could not join. There was an error at the server.")
        }
    });
}

// Called after the list has been updated
notifyAfterNewJoinSMSPickup = () => { 
    // We're going to check to see if a scanned pickup QR Code just came back to us as a notification
    if(this.state.bShowQRCodePickup !== '0') {
          // The pickup QR Code is visible
          this.setState({bShowBackdrop: '0', 
                         bShowQRCodePickup: '0',
                         bShowPickUpList:'1'}); 
    }  
}

/*
 * Change a standee to a pick-up 
 * Changes the state of the entry to 'pickup'
 */
moveStandeeToPickUp = (customerItem) => { 
    // update the line db entry
    this.setState({bShowBackdrop:'Moving to Pickup...'});

    // if standee, already have id number, so create
    var nickname;
    if(!this.userIsStandee(customerItem)) {
        // DEFUNCT
        //console.log("Creating Pick up id number for moveToPickup: " + global.standeeCount);
        global.standeeCount++;
        var newcount = global.standeeCount % 1000;  // no more than 3 digits
        storeData("@SafeQueueStandeeCount", global.standeeCount);  // we keep this forever
        var newid = '#_' + newcount.toString().padStart(3,'0');

        var max = 1000000;
        var nick = newid; // '#' + Math.floor(Math.random() * Math.floor(max));
        nickname = nick.substring(0,6);  
    }
    else {
        //console.log("Standdee moving to pickup list - same id")
        var sid = getUserIDFromContact(customerItem.contact); 
        var snum =  sid.substring(4);
        nickname = TTL_STANDEE + " " + snum;
    }
    var nickname64 = Buffer.from(nickname, 'binary').toString('base64');

    const update = {
      ...customerItem,
         description: nickname64,  // changes to an order number while in pickup
         state: 'pickup',  // change to pickup
    };

    updateResilient(update, update, (item) => {
        if(item !== null) {
            this.updateLineList(global.deviceLocation, "moving standee to pickup...", this.moveStandeeToPickupCallback);

            // handle mirrors
            this.syncWithMirrors(); 
        }
        else {
            alert('Database Error. Failed to move the user to pickup.\n[business]\n\n' +
            'This may be due to a network error. Check your connection and try again.'); // , [{text: 'OK'}]);
            this.setState({bShowBackdrop:'0'});
        }
    }); 
}

// Called after the list has been updated
moveStandeeToPickupCallback = () => { 
    this.setState({bShowBackdrop:'0'});
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

showInfoStandeeHelp = () => {
  this.displayHelpMessage(TTL_STANDEES,

      HELP_STANDEE1, 
      HELP_STANDEE2,
      HELP_STANDEE3,
      HELP_STANDEE4);
}

drawBtnStandee = () => {
    if(!this.bStandeeSupport())
        return;

    //if(this.state.bShowBtnStandee === '0')
    //    return;

    var style={width:"98%",marginBottom:8,borderRadius:8,borderColor:'#000000',borderWidth:1, backgroundColor:themeMainColor};

    return (
        <Button style={style} onClick={this.insertStandee} > 
             <Grid container  
                direction="row"
                       justify="flex-start"
                       alignItems="center">

                <Grid item xs={10}>
                      <div style={{color:'#FFFFFF',fontSize:'100%',padding:6}}>{BTN_ADD_STANDEE}</div>
                </Grid>
                 <Grid item xs={2}>
                      <Button onClick={(e) => {this.showInfoStandeeHelp(); e.stopPropagation();}}><img src={icon_about} height="20"/></Button>
                </Grid>
            </Grid>
        </Button>
    );
}

insertStandee = () => {
    // get the running standee count mod 10,000  (assumes no more than 10,000 standees at a time)
    console.log("standee count: " + global.standeeCount);

    global.standeeCount++;
    var newcount = global.standeeCount % 10000;  // no more than 4 digits
    storeData("@SafeQueueStandeeCount", global.standeeCount);  // we keep this forever
    var newid = 'std_' + newcount.toString().padStart(4,'0');

    var max = 1000000;
    var nick = newid; // '#' + Math.floor(Math.random() * Math.floor(max));
    var nickname = nick.substring(0,8);  
    var nickname64 = Buffer.from(nickname, 'binary').toString('base64');

    console.log("Adding Standee: " + newid + "   " + nickname);

    const payload = {
      ...global.itemQueueManagement,
        contact: newid + '][' + '',  // no push token
        description: nickname64,
        logo:''
    };

    this.setState({bShowBackdrop: MSG_ADDING_STANDEE});
    addResilient(payload, payload, (item) => {
        if(item != null) {
            this.updateLineList(this.state.location, "Updating from Standee Join...");

            // handle mirrors
            this.syncWithMirrors();

            this.setState({bShowBackdrop: '0'});
        }
        else {
          alert("Could not join. There was an error at the server.")
        }
    });
    
}

drawBtnScan = () => {
    if(this.state.bShowBtnScan === '0')
        return;

    var style ={width:"98%",marginBottom:8,borderRadius:10,borderColor:'#000000', backgroundColor:themeMainColor};

    return (
        <Button style={style} onClick={this.scanCustomer} > 
            <div style={{color:'#FFFFFF',fontSize:'130%',padding:6}}>{BTN_SCAN_CUSTOMER}</div>
        </Button>
    );
}

drawBtnDelete = () => {
    if(this.state.bShowBtnDelete === '0')
        return;

    if(this.state.bShowEditing === '1')
        return;


    var delstyle={width:"98%",marginBottom:8,marginTop:8,borderRadius:10,borderColor:'#000000', backgroundColor:'#da1e28'};
    var btnstyle={width:"98%",marginBottom:8,marginTop:8,borderRadius:10,borderColor:'#000000', backgroundColor:themeMainColor};

    var btnname = this.isMirror() ? "Remove This Mirror" : BTN_DELETE_THIS_QUEUE;
    return (
        <div>
            { false &&
              <Button style={btnstyle} onClick={this.confirmEdit} > 
                  <div style={{color:'#FFFFFF'}}>{this.state.editBtnLabel}</div>
              </Button>
            }
            <Button style={delstyle} onClick={this.confirmDelete}>
                <div style={{color:'#FFFFFF'}}>{btnname}</div>
            </Button> 
        </div>
    );
}


drawBtnEdit = () => {
    
    var btnstyle={width:"98%",marginBottom:8,marginTop:8,borderRadius:10,borderColor:'#000000', backgroundColor:themeMainColor};

    const handleCancel = () => {
        importedImage64 = undefined;  // clear out anything from last edit
        this.setState({bShowEditing:'0',
                       bShowEditMap:false, bShowEditMapButtonLabel:"CHANGE",
                       bShowPickupSupport:this.bPickupSupport(),
                       bShowStandeeSupport:this.bStandeeSupport(),
                       bShowSelfManagedSupport:this.bSelfManagedSupport(),
                       editBtnLabel:BTN_SAVE_CHANGES,
                       deleteBtnLabel:BTN_CANCEL});
    };

    const handleSave = () => {
        this.updateItemWithWarning();
    }

    // Toggle between edit and save
    if(this.state.bShowEditing === '0') {
        // Start Editing
        return (
             <Button 
                  style={{width:24, height:32, position:'absolute', left:-10, top:4, zIndex:9, marginTop:0}}
                  onClick={(e) => {
                      e.stopPropagation();
                      this.confirmEdit();
                  }}>
                <img src={btn_edit} height="24" width="24"/>
            </Button>
        );
    }
    else {
        // in the middle of editing
         return (
              <div>
              <Grid container spacing={16}
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  justify="center"> 
                 
                  <Grid item xs={4}>
                      <Button onClick={handleSave} color="primary">
                          {BTN_SAVE}
                      </Button>  
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={4}>
                      <Button onClick={handleCancel} color="secondary">
                          {BTN_CANCEL}
                      </Button>  
                  </Grid>
                  <Grid item xs={2}></Grid>
              </Grid>
              </div>
        );
    }
}


confirmEdit = () => {
    if(this.state.bShowEditing === '0') {
        // Dont allow edit if people are in line and queue is open
        if(this.state.sortedfilteredItems.length > 0) {
            this.displayErrorMessage(MSG_SORRY,
              MSG_PERSONS_IN_QUEUE_CANT_BE_EDITED, 
              MSG_YOUR_QUEUE_MUST_BE_EMPTY,
              undefined);  // no callback
        }
        else if(currentItem.state !== 'closed') {
            this.displayErrorMessage("Sorry...",
              MSG_QUEUE_IS_OPEN_CANT_BE_EDITED, 
              MSG_YOUR_QUEUE_MUST_BE_EMPTY,
              undefined);  // no callback
        }
        else {
            importedImage64 = undefined;  // clear out anything from last edit
            this.setState({bShowEditing:'1',
                           bShowCustomizations:false,
                           showCustimizationIcon: btn_chevronRight,
                           showCustomizationTitle: BTN_SHOW_QUEUE_CUSTOMIZATION,  //"Show Queue Customizations",
                           bShowPickupSupport:this.bPickupSupport(),
                           bShowStandeeSupport:this.bStandeeSupport(),
                           bShowSelfManagedSupport:this.bSelfManagedSupport(),
                           });
        }
    }
    else {
        // We're done editing
        this.updateItemWithWarning();
    }
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

updateItemWithWarning = () => {
    if(this.state.bShowEditMap) {
        this.setState({bShowConfirmDialog:"Are you sure you want to change the GPS Position for this business?",
                      showConfirmDialogSubtitle:"(If not, click NO and then cancel editing)",
                         confirmCallback:this.updateItem});
    }
    else {
        this.updateItem();
    }
}

updateItem = () => {
    this.setState({bShowBackdrop:'Saving...'});

    /*
     * Verify the new name doesn't already exist
     */
    // we don't allow multiple spaces in a business name
    var fixedname = this.removeDuplicateSpaces(this.state.item.name.trim());

    const storeItem = {
        type:'Store',
        contact: "none@none.com"
    };

    searchResilient(storeItem, storeItem, (results, payload) => {
        if(results != null) {
            var bDup = false;

            // check for duplicate name, only if name has change
            if(storenameCommitted !== this.state.item.name) {
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
            }

            if(bDup) {
                this.displayErrorMessage("Already Exists", 
                  "Sorry, there is already a business with a name too similar, " + 
                  "so you must chose a different name.","");
                this.setState({bShowBackdrop: '0'});
            }
            else {
                // This is not a duplicate so let's actually create the store - it will close the dialog
                this.doUpdateStore(fixedname);
            }

        }
        else {
            alert('Network Error\\nDatabase lookup for the store failed.\n[customer]'); // [{text: 'OK'}]);
        }
    });
}


doUpdateStore = (fixedname) => {
    // update the undo
    featuresCommitted = global.itemQueueManagement.features; // assumes the update is successful
    storenameCommitted = fixedname;

    // update the custom fields, including contactinfo
    var newcustom = this.generateCustomField();
    global.itemQueueManagement.custom = newcustom;

    // update the elements
    global.itemQueueManagement.name = fixedname;
    global.itemQueueManagement.description = this.state.item.description;
    global.itemQueueManagement.logo = (importedImage64 === undefined) ? this.state.item.logo : importedImage64;

    if(importedImage64 !== undefined) {
        var newWidth = 300;
        var newHeight = newWidth/importedImageAspectRatio;
        global.itemQueueManagement.logosize = "300x" + newHeight.toFixed(0)
    }

    // if we've changed location, the edit map will be open
    console.log("checking location update")
    if(this.state.bShowEditMap) {
        console.log("updating store location to " + this.state.position + "  was: " + global.itemQueueManagement.location)
        global.itemQueueManagement.location = this.state.position;
    }
  
    // if we are a mirror, we must not use our
    var targetID = global.userID;
    if(this.isMirror())
        targetID = global.itemQueueManagement.userID;

    // kluge here... if all else fails, make sure we always have walkin support if there's nothing else
    if(global.itemQueueManagement.features === '|') {
        global.itemQueueManagement.features = '|W';
        featuresCommitted = '|W';
    }

    const update = {
        ...global.itemQueueManagement,
        // NOT YET logo: (global.itemQueueManagement.logo === '') ? '---' : global.itemQueueManagement.logo,
        userID:  targetID
    };

    updateResilient(update, update, (item) => {
        if(item != null) {
            // handle any mirrors
            this.syncWithMirrors();
        }
        else {
            alert('Database Error. Failed to save your edits.\n[business]\n\n' +
            'This may be due to a network error. Check your connection and try again.'); // , [{text: 'OK'}]);
            this.setState({bShowBackdrop:'0'});
        }

        global.itemQueueManagementChanged = true;  // forces update of the management display on Back
        this.setState({bShowBackdrop:'0',
                       item: {...item, name:fixedname, location:global.itemQueueManagement.location},
                       location:global.itemQueueManagement.location,
                       bShowEditMap:false, bShowEditMapButtonLabel:"CHANGE",
                       bShowEditing:'0',
                       bShowCustomizations:false,   // close the customizations - I think I like this
                       showCustimizationIcon: btn_chevronRight,
                       showCustomizationTitle: BTN_SHOW_QUEUE_CUSTOMIZATION, 
                       bShowPhotoCropper:'0',
                       bShowBtnAddPickup: this.bPickupSupport() ? '1' : '0',
                       bShowBtnStandee: this.bStandeeSupport() ? '1' : '0',
                       editBtnLabel:BTN_EDIT_THIS_QUEUE,
                       deleteBtnLabel:BTN_DELETE_THIS_QUEUE});
        importedImage64 = undefined;
    });   
}


showPrintableQRCode = () => {
    var storename = global.itemQueueManagement.name;

    var longurl = 'https://safe-queue-web.mybluemix.net/?dest=customer&bus=' + encodeURI(storename);
    if(global.isAWS)
        longurl = 'https://aws.safequeueweb.com/?dest=customer&bus=' + encodeURI(storename);
    var shorturl = '';
    if(global.itemQueueManagement.surl !== undefined) 
        shorturl = global.safeQueueURL + '/' + global.itemQueueManagement.surl;
    else
        shorturl = longurl;  // no difference

    this.setState({bShowPrintableQRCode: '1',
                   printableJoinOption:'storeonly',
                   printableJoinUrlShort: shorturl,
                   printableJoinUrl: longurl});
}


drawPrintableQRCode = () => {
    if(this.state.bShowPrintableQRCode === '0')
        return;

    const handleOkay = () => {
        this.setState({bShowPrintableQRCode:'0'});
    };

    var stylecenter = {display: 'flex', justifyContent:'center', alignItems:'center'};
    var styleurl = {display: 'flex', justifyContent:'center', alignItems:'center', fontSize:'80%',marginTop:0,marginLeft:20,marginRight:20};
    var styleurlshort = {display: 'flex', justifyContent:'center', alignItems:'center', fontSize:'100%',marginTop:8};

    const handleChange = (event) => {
        var storename = global.itemQueueManagement.name;

        var longurl = 'https://safe-queue-web.mybluemix.net/?dest=customer&bus=' + encodeURI(storename);
        if(global.isAWS)
            longurl = 'https://aws.safequeueweb.com/?dest=customer&bus=' + encodeURI(storename);
        if(event.target.value === 'joindialog')
            longurl = longurl + "&enter=1";
        else if(event.target.value === 'join')
            longurl = longurl + "&enter=auto";
        else if(event.target.value === 'checkin')
            longurl = longurl + "&enter=checkin";

        var shorturl = '';
        if(global.itemQueueManagement.surl !== undefined) {
            shorturl = global.safeQueueURL + '/' + global.itemQueueManagement.surl;
            if(event.target.value === 'joindialog')
                shorturl = shorturl + "-1";
            else if(event.target.value === 'join')
                shorturl = shorturl + "-a";
            else if(event.target.value === 'checkin')
                shorturl = shorturl + "-c";
        }
        else {
            shorturl = longurl;  // there's no difference 
        }

        this.setState({printableJoinOption:event.target.value,
                       printableJoinUrlShort:shorturl,
                       printableJoinUrl:longurl})
    };

    return (
        <div>
          <Dialog open={true}  aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{fontSize:'100%'}}><b>{TTL_QUEUE_LINKS}</b></DialogTitle>
            <div style={{fontSize:'90%',marginTop:-16,marginLeft:20,marginRight:20}}>Customers can interact with this Safe Queue by scanning a
                            QR code or by following a link. QR Codes and links are generated below.</div>
            <div style={{fontSize:'90%',marginTop:8,marginLeft:20,marginRight:20}}>
                  When scanned (or clicked-on) Safe Queue takes the action you specify:</div>

            <DialogContent>
                
                <FormControl component="fieldset">
                    <RadioGroup aria-label="options" name="options1" value={this.state.printableJoinOption} onChange={handleChange}>
                      <FormControlLabel value="storeonly" control={<Radio />} label="Just show this Safe Queue. " />

                      { this.bWalkinSupport() &&
                          <FormControlLabel value="joindialog" control={<Radio />} label="Show the walk-in dialog" />
                      }
                      { this.bWalkinSupport() &&
                          <FormControlLabel style={{marginTop:-10}} value="join" control={<Radio />} label="Join the walk-in line immediately" />
                      }
                      { this.bPickupSupport() &&
                          <FormControlLabel style={{marginTop:-10}} value="checkin" control={<Radio />} label="Show the check-in dialog" />
                      }
                    </RadioGroup>
                </FormControl>

                { false && <div style={stylecenter}>{MSG_CUSTOMERS_SCAN_THIS_CODE}</div> }
                
                <div style={{marginBottom:8}}></div>  
                
                <div style={stylecenter}>
                    <QRCode
                        value={this.state.printableJoinUrlShort}
                        size={210}
                        color="black"
                    />
                </div>
                { global.itemQueueManagement.surl !== undefined &&
                    <div style={{marginTop:16}}>
                        { false && <div style={{fontSize:'90%'}}><b>FOR EMAIL, TEXT and SOCIAL MEDIA:</b> Copy and send this link:</div> }
                        <div style={styleurlshort}><b>{this.state.printableJoinUrlShort}</b></div>
                    </div>
                }
                <div style={{marginTop:16}}></div>
                <div style={stylecenter}>
                    <Button onClick={handleOkay} color="primary">{BTN_CLOSE}</Button>               
                </div>
                <div style={styleurl}>The long-form URL is:<br />{this.state.printableJoinUrl}</div>
            </DialogContent>
          </Dialog>
        </div>
    );
}


bNoFeaturesSelected = () => {
    var features = global.itemQueueManagement.features;
    if(features === undefined)
        return true;

    if(!this.bPickupSupport() && !this.bStandeeSupport() && !this.bSelfManagedSupport())
        return true;

    return false;
}

// assumes the global variable
bSupportsFeature = (shorthand) => {
   var features = global.itemQueueManagement.features;
    if(features === undefined)
        return false;

    if(features.indexOf(shorthand) === -1)
        return false;
    else 
        return true;
}

addFeatureSupport = (shorthand) => {
    var features = global.itemQueueManagement.features;
    if(features === undefined)  
        global.itemQueueManagement.features = shorthand;
    else if(!this.bSupportsFeature(shorthand)) {
        // need to add this feature
        if(features === '|') 
            global.itemQueueManagement.features = shorthand;  // just one feature
        else
            global.itemQueueManagement.features += shorthand; // add it in 
    }
}

removeFeatureSupport = (shorthand) => {
    var features = global.itemQueueManagement.features;
    if(features === undefined) {
        // nothing to do, but clean it up anyway
        global.itemQueueManagement.features = '|W';  // means none with defualt to walki
        return;
    }

    // need to remove this feature
    global.itemQueueManagement.features = features.replace(shorthand, '');

    // don't leave the features field blank, because cloudant views this as "don't change"
    if(this.bNoFeaturesSelected()) {
        global.itemQueueManagement.features = '|'; // means none
    }
}

bStandeeSupport = () => {
    return this.bSupportsFeature('|S');
}
addStandeeSupport = () => {
    this.addFeatureSupport('|S')
}
removeStandeeSupport = () => {
    this.removeFeatureSupport('|S');
}


bPickupSupport = () => {
    if(!global.bAllowPickup)
        return false;

    return this.bSupportsFeature('|P');
}
addPickupSupport = () => {
    this.addFeatureSupport('|P')
}
removePickupSupport = () => {
    this.removeFeatureSupport('|P');
}


bWalkinSupport = () => {
    return this.bSupportsFeature('|W');
}
addWalkinSupport = () => {
    this.addFeatureSupport('|W')
}
removeWalkinSupport = () => {
    this.removeFeatureSupport('|W');
}


bAutoNotifySupport = () => {
    return this.bSupportsFeature('|A');
}
addAutoNotifySupport = () => {
    this.addFeatureSupport('|A')
}
removeAutoNotifySupport = () => {
    this.removeFeatureSupport('|A');
}


bSelfManagedSupport = () => {
    return this.bSupportsFeature('|M');
}
addSelfManagedSupport = () => {
    this.addFeatureSupport('|M')
}
removeSelfManagedSupport = () => {
    this.removeFeatureSupport('|M');
}


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



drawFeatures = () => {
    if(!global.bAllowPickup && !global.bAllowStandees)
        return;

    if(!this.state.bShowCustomizations)
        return;
    //if(this.state.bShowEditing === '0')
    //    return;

    // console.log("FEATURES: " + global.itemQueueManagement.features)

    const featuresChanged = () => {
        if(featuresCommitted === global.itemQueueManagement.features)
            return false;
        else 
            return true;
    }

    const handleStandeeChange = (event) => {
        // Don't allow changes unless walk-in support 
        if(!this.bWalkinSupport())
            return;

        if(event.target.checked)  {
            this.addStandeeSupport();
            this.removeSelfManagedSupport();
            var changed = featuresChanged();
            this.setState({bShowFeaturesSaveCancel:changed, bShowStandeeSupport:true, bShowSelfManagedSupport:false});
        }
        else {
            // don't allow removal of this feature til all standees have been remove
            for(var i=0; i<this.state.sortedfilteredItems.length; i++) {
                var titem = this.state.sortedfilteredItems[i];
                if(this.userIsStandee(titem)) {
                    this.displayErrorMessage("Sorry...", "You must remove all standees before turning off the Standee Feature.")
                    return;
                }
            }
            
            this.removeStandeeSupport();
            var changed = featuresChanged();
            this.setState({bShowFeaturesSaveCancel:changed, bShowStandeeSupport:false});
        }
        //console.log("NEW FEATURES: " + global.itemQueueManagement.features)
    };

    const handlePickupChange = (event) => {
        if(event.target.checked) {
            this.addPickupSupport();
            this.removeSelfManagedSupport();
            var changed = featuresChanged();
            this.setState({bShowFeaturesSaveCancel:changed, bShowPickupSupport:true, bShowSelfManagedSupport:false});
        }
        else {
            // don't turn off pickup support if there a pickups waiting
            if(this.state.pickupItems.length > 0) {
                this.displayErrorMessage("Sorry...", "You must remove all pick-ups before turning off the Pick-Up Feature.")
                return;
            }
            // must have either walk-in or pick-up selected
            if(!this.bWalkinSupport()) {
                this.removePickupSupport();
                this.addWalkinSupport();
                var changed = featuresChanged();
                this.setState({bShowFeaturesSaveCancel:changed, bShowWalkinSupport:true, bShowPickupSupport:false});
            }
            else {
                this.removePickupSupport();
                var changed = featuresChanged();
                this.setState({bShowFeaturesSaveCancel:changed, bShowPickupSupport:false});
            }
        }
        //console.log("NEW FEATURES: " + global.itemQueueManagement.features)
    };

    const handleWalkinChange = (event) => {
        if(event.target.checked) {
            this.addWalkinSupport();
            this.removeSelfManagedSupport();
            var changed = featuresChanged();
            this.setState({bShowFeaturesSaveCancel:changed, bShowWalkinSupport:true, bShowSelfManagedSupport:false});
        }
        else {
            // don't turn off walkin support if there a walkins waiting
            if(this.state.sortedfilteredItems.length > 0) {
                this.displayErrorMessage("Sorry...", "You must remove all walk-ins before turning off the Walk-In Feature.")
                return;
            }
            // must have either walk-in or pick-up selected
            // Also, auto-notify is only for walk-ins, so diaable auto-notify if there's no walk-in support
            if(!this.bPickupSupport()) {
                this.removeWalkinSupport();
                this.removeAutoNotifySupport();
                this.removeStandeeSupport();
                this.addPickupSupport();
                var changed = featuresChanged();
                this.setState({bShowFeaturesSaveCancel:changed, bShowWalkinSupport:false, bShowAutoNotifySupport:false, bShowStandeeSupport:false, bShowPickupSupport:true});
            }
            else {
                this.removeWalkinSupport();
                this.removeAutoNotifySupport();
                this.removeStandeeSupport();
                var changed = featuresChanged();
                this.setState({bShowFeaturesSaveCancel:changed, bShowWalkinSupport:false, bShowAutoNotifySupport:false, bShowStandeeSupport:false});
            }
        }
        //console.log("NEW FEATURES: " + global.itemQueueManagement.features)
    };

    const handleSelfManagedChange = (event) => {
        if(event.target.checked) {
            // don't turn on self-managed if there's anyone in line or waiting for pickup 
            if((this.state.sortedfilteredItems.length > 0) || (this.state.pickupItems.length > 0)) {
                this.displayErrorMessage("Sorry...", "You must remove all customers in line or wariting for pick-up" +
                                                     " before turning on the Self-Managed Feature.")
                return;
            }
            this.addSelfManagedSupport();
            this.addWalkinSupport();
            this.removeStandeeSupport();
            this.removePickupSupport();
            this.removeAutoNotifySupport();
            var changed = featuresChanged();
            this.setState({bShowFeaturesSaveCancel:changed, bShowSelfManagedSupport:true, bShowWalkinSupport:true, bShowAutoNotifySupport:false, bShowStandeeSupport:false, bShowPickupSupport:false});
        }
        else {
            this.removeSelfManagedSupport();
            var changed = featuresChanged();
            this.setState({bShowFeaturesSaveCancel:changed, bShowSelfManagedSupport:false});
        }
        //console.log("NEW FEATURES: " + global.itemQueueManagement.features)
    };


    const handleAutoNotifyChange = (event) => {
        // Don't allow changes unless walk-in support 
        if(!this.bWalkinSupport() || this.bSelfManagedSupport())
            return;

        if(event.target.checked)
            this.addAutoNotifySupport();
        else
            this.removeAutoNotifySupport();

        var changed = featuresChanged();
        this.setState({bShowFeaturesSaveCancel:changed, bShowAutoNotifySupport:event.target.checked});
    }

    const handleCancel = () => {
        // we are editing and cancelled - so restore the item
        global.itemQueueManagement.features = featuresCommitted;
        this.setState({bShowFeaturesSaveCancel:false, item: global.itemQueueManagement,
                       bShowWalkinSupport:this.bWalkinSupport(),
                       bShowPickupSupport:this.bPickupSupport(),
                       bShowStandeeSupport:this.bStandeeSupport(),
                       bShowSelfManagedSupport:this.bSelfManagedSupport(),
                       bShowAutoNotifySupport:this.bAutoNotifySupport()
                     });  
    }

    const handleSave = () => {
        this.setState({bShowFeaturesSaveCancel:false});
        this.updateItemWithWarning();
    }

    return (
        <div>
            <div style={{marginTop:-8}}></div>

            <Grid container  
                direction="row"
                       justify="center"
                       alignItems="center">
                
                <Grid item xs={1}>
                   <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.bShowWalkinSupport}
                          onChange={handleWalkinChange}
                          name="walkinfeature"
                          color="primary"
                        />
                      }
                    />
                </Grid>
                <Grid item xs={5}>
                    <div style={{textAlign:'left',marginLeft:8}}>Walk-in</div>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={(e) => {this.showInfoWalkinFeature(); e.stopPropagation();}}><img src={icon_about_black} height="20"/></Button>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>  
            
            { global.bAllowPickup && 
                <Grid container  
                    direction="row"
                           justify="center"
                           alignItems="center">
                    
                    <Grid item xs={1}>
                       <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.bShowPickupSupport}
                              onChange={handlePickupChange}
                              name="pickupfeature"
                              color="primary"
                            />
                          }
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <div style={{textAlign:'left',marginLeft:8}}>Order Pick-up</div>
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={(e) => {this.showInfoPickupFeature(); e.stopPropagation();}}><img src={icon_about_black} height="20"/></Button>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>  
            }
            { global.bAllowStandees /*&& !global.bSpanish*/ &&
                <Grid container  
                    direction="row"
                           justify="center"
                           alignItems="center">
          
                    <Grid item xs={1}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.bShowStandeeSupport}
                              onChange={handleStandeeChange}
                              name="standeefeature"
                              color="primary"
                            />
                          }
                        />    
                    </Grid>
                    <Grid item xs={5}>
                        <div style={{textAlign:'left',marginLeft:8}}>Standees</div>
                    </Grid>
                    <Grid item xs={2}>
                          <Button onClick={(e) => {this.showInfoStandee(); e.stopPropagation();}}><img src={icon_about_black} height="20"/></Button>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            }
            { /*!global.bSpanish && */ true &&
              <Grid container  
                  direction="row"
                         justify="center"
                         alignItems="center">
        
                  <Grid item xs={1}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.bShowSelfManagedSupport}
                            onChange={handleSelfManagedChange}
                            name="selfmanagedfeature"
                            color="primary"
                          />
                        }
                      />      
                  </Grid>
                  <Grid item xs={5}>
                      <div style={{textAlign:'left',marginLeft:8}}>Self-Managed</div>
                  </Grid>
                  <Grid item xs={2}>
                        <Button onClick={(e) => {this.showInfoSelfManaged(); e.stopPropagation();}}><img src={icon_about_black} height="20"/></Button>
                  </Grid>
                  <Grid item xs={2}></Grid>
              </Grid>
            }

            <Grid container  
                direction="row"
                       justify="center"
                       alignItems="center">
      
                <Grid item xs={1}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.bShowAutoNotifySupport}
                          onChange={handleAutoNotifyChange}
                          name="autonotifyfeature"
                          color="primary"
                        />
                      }
                    />      
                </Grid>
                <Grid item xs={5}>
                    <div style={{textAlign:'left',marginLeft:8}}>Auto-notify on Scan</div>
                </Grid>
                <Grid item xs={2}>
                      <Button onClick={(e) => {this.showInfoAutoNotify(); e.stopPropagation();}}><img src={icon_about_black} height="20"/></Button>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>


            { this.state.bShowFeaturesSaveCancel &&
               <Grid container spacing={16}
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  justify="center"> 
                 
                  <Grid item xs={2}>
                      <Button onClick={handleSave} color="primary">
                          {BTN_SAVE}
                      </Button>  
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}>
                      <Button onClick={handleCancel} color="secondary">
                          {BTN_CANCEL}
                      </Button>  
                  </Grid>
                  <Grid item xs={6}></Grid>
              </Grid>
            }
        </div>
    );
}


showInfoWalkinFeature = () => {
  this.displayHelpMessage("Walk-in",

      "Enable this feature if you want to track and notify customers who visit your business just by showing up. ",

      "You can notify customers using the built-in Safe Queue anonymous notification or optionally by SMS text message. " +

      "",
      "",
      "");
}

showInfoPickupFeature = () => {
  this.displayHelpMessage("Order Pick-Up",

      "Enable this feature if you want to track and notify customers who have made orders and will pick them up later. " +

      "This will create a Pickup List for your Safe Queue, where you can add customers to that list, they can add " +
      "themselves, or they can check in as they come near your business. ",

      "You can notify customers using the built-in Safe Queue anonymous notification or by SMS text message. " +
      "The app generates a unique order code for every pickup you can see in your management screen.",

      "When an order is ready, you tap on any customer in the Pick-Up list and they will be notified " +
      "to come in and get their order. You can scan their QR Code generated by the App to validate the order.",

      "Further usage details are available in the Queue Management screen.");
}

showInfoSelfManaged = () => {
  this.displayHelpMessage("Self Managed",

      "Enable this feature if you want your line to move automatically as customers identify that they've " +
      "left your business.",

      "In this case there is no manager of the queue. When a customer goes in a business, he taps in the app when he leaves " +
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




/*
 * Logo support
 */
photoupdate = (files) => {
    this.setState({logoFile:files});
}

removephoto = () => {
    console.log("remove photo")
    importedImage64 = undefined;
    global.itemQueueManagement.logo = '';
    this.setState({
                   croppedImageUrl: undefined});
}


drawAddPhoto = () => {
    if(this.state.bShowPhotoCropper === '0')
        return;

    return (
      <div style={{marginTop:8}}>
          {this.state.src && (
              <ReactCrop
                src={this.state.src}
                crop={this.state.crop}
                ruleOfThirds
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
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
      console.log('onImageLoaded');
      this.imageRef = image;
};

onCropComplete = crop => {
      console.log('onCropComplete');
      this.makeClientCrop(crop);
};

onCropChange = (crop, percentCrop) => {
      // You could also use percentCrop:
      // this.setState({ crop: percentCrop });
      console.log('onCropChange');
      this.setState({ crop });
};

async makeClientCrop(crop) {
    console.log('makeClientCrop');

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
                     bShowAddress:'0',
                     bShowBetaTestCode:'0'});
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
    importedImageAspectRatio = crop.width/crop.height;
    var newHeight = 300/importedImageAspectRatio;
    this.state.newlogosize = "300x" + newHeight.toFixed(0);
    
    // need to remove the prefix to get just the base64 data...
    // "data:image/jpeg;base64," is the prefix to be removed
    importedImage64 = importedImage64.slice(23);

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
                   bShowAddress:'1',
                   bShowBetaTestCode:'1'});
}

onLogoCancelled = () => {
    this.setState({bShowBtnAddPhoto:'1',
                   bShowBtnAcceptCrop:'0',
                   bShowPhotoCropper:'0',
                   bShowLogo:'0',
                   bShowAddress:'1',
                   bShowBetaTestCode:'1',
                   bShowBtnSave:'1',
                   src: null,
                   croppedImageUrl:undefined});
}



/*
 * Delete
 *
 * Note, you can't delete a queue with customers in line
 *       however, you can always remove a mirror, as this doesn't actually delete the queue
 */
confirmDelete = () => {

    if(this.isMirror()) {
        // we can't always do this
         this.setState({bShowConfirmDialog:"Are you sure you want to remove this mirror?",
                        showConfirmDialogSubtitle:"(This will not delete the Safe Queue itself)",
                         confirmCallback:this.removeMirror});
    }
    else if(this.state.bShowEditing === '0') {
        // Dont allow delete if people are in line.
        // The manager must individually remove people from line, after which it will be empty and can be deleted
        if(this.state.sortedfilteredItems.length > 0) {
            alert(MSG_PERSONS_IN_QUEUE_CANT_BE_DELETED);
        }
        else {
           this.setState({bShowConfirmDialog:MSG_ARE_YOU_SURE_YOU_WANT_TO_DELETE,
                         confirmCallback:this.deleteItem});
        }
    }
    else {
        // we are editing and cancelled - so restore the item
        global.itemQueueManagement.logo = this.state.item.logo;  // restore it
        this.setState({item: global.itemQueueManagement,
                       bShowEditing:'0',
                       bShowCustomizations: false,
                       showCustimizationIcon: btn_chevronRight,
                       showCustomizationTitle: BTN_SHOW_QUEUE_CUSTOMIZATION, // "Show Queue Customizations",
                       croppedImageUrl: undefined,
                       src: null,
                       bShowPhotoCropper:'0',
                       editBtnLabel:BTN_EDIT_THIS_QUEUE,
                       deleteBtnLabel:BTN_DELETE_THIS_QUEUE});  
    }
}

removeMirror = () => {
   const update = {
        ...this.state.item,
        logo:'', // don't update the logo
        mirrors: 'none'   // can't set this to '' or it will not do the update !!!!
    };

    //console.log("Renove Mirror: " + JSON.stringify(update));
    this.setState({bShowBackdrop: "Removing..."});
  
    updateResilient(update, update, (item) => {
        if(item != null) {
            // notify the owner
            var ownerID = global.itemQueueManagement.userID;  // the owner of the queue
            console.log('mirror has beeen removed. Notifying: ' + ownerID)
            this.syncStore(ownerID, this.removeMirrorCallback);  // callback after sync was sent
        }
        else {
            alert('Database Error. Failed to remoe the mirror.\n[business]\n\n' +
            'This may be due to a network error. Check your connection and try again.'); // , [{text: 'OK'}]);
            this.setState({bShowBackdrop:'0'});
        }
    });  
}

// We need a callback here because returnToManager() unmount this component, 
// which causes the sync push to fail with a network error.
// So, we know we can call returnToManager() in the callback
removeMirrorCallback = () => {
    this.setState({bShowBackdrop:'0'});
    returnToManager();
}

deleteItem = () => {
    const payload = {
      ...this.state.item,
      id: this.state.item.id || this.state.item['_id']
    };

    // remove the line db entry
    this.setState({bShowBackdrop: MSG_DELETING});
    removeResilient(payload, payload, (ritem) => {
        if(ritem != null) {
            // success
            //this.setState({bShowBackdrop: '0'});
            //alert('Done\n\nYour Queue has been deleted.'); // [{text: 'OK'}]);
            this.setState({bShowBackdrop: '0'});
            returnToManager();
        }
        else {
            this.setState({bShowBackdrop: '0'});
            alert('Network Error\n\nRemove failed after two retries. Please check your network connection and try again.'); // [{text: 'OK'}]);
        }
   });
};



onScanSuccess = (data) => {
    if(data != null) {
        console.log("Scan got " + data);

        if(data === lastScannedValue)
            return;
        lastScannedValue = data;

        console.log('going forward')

        // See if this matches any customer that has been notified
        // As a convienence, if a user is first in line, but not notified yet, accept the scan anyway
          var scannedItem = null;
          for(var i=0; i<this.state.sortedfilteredItems.length; i++) {
              var nitem = this.state.sortedfilteredItems[i];

              var nitemid = getUserIDFromContact(nitem.contact);
              if((i === 0) && (nitemid === data)) {
                  scannedItem = nitem;       // first in line is always okay to scan
                  nitem.state = 'notified';  // to help downstream logic
                  break;
              }

              var state = getStateFromState(nitem.state);
              if(state === 'notified') {
                  if(nitemid == data) {
                      scannedItem = nitem;
                      break;
                  }
              }
          }

          // if not found, check the pickup list
          var bScannedPickup = false;
          if(scannedItem === null) {
              for(var i=0; i<this.state.pickupItems.length; i++) {
                  var nitem = this.state.pickupItems[i];

                  var nuserid = getUserIDFromContact(nitem.contact);
                  if((nitem.description === data) || (nuserid === data)) {
                      scannedItem = nitem;
                      bScannedPickup = true;  // prevents sending notifications
                      break;
                  }
              }
          }

          if(scannedItem != null) {
              // Yep, that him! let him in the store and the following actions:
              // remove him from the line (which moves everyone up) and notify everyone else

              // let the person who scanned know it worked (the app did this automatically)
              var audio = new Audio(sound_shortbeep); 
              this.playSound(audio);

              // Don't put up the alert - just update the GUI
              // This supports the use case of notifying multiple customers, then scanning them
              // all in without a bunch of alerts.
              //Alert.alert("CONFIRMED", "We're now informing everyone the line has moved.");
              //this.setState({scanMessage:"SCAN CONFIRMED for " + this.nicknameInLine(scannedItem)});

              // Notify selected person he was scanned (so his display can clear)
              // and notify everyone else that they've moved up.
              // THERE MAY BE MULITPLE PERSONS WHO WERE NOTIFIED TO COME IN
              // SO THE SCANNED ID MAY NOT BE FIRST IN LINE !!!
              // Here's how it works:
              // suppose the line looks like this (0-based)
              // 0 A notified                no notification
              // 1 B notified  scanned       will get "thank you" notification
              // 2 C notified                no notification
              // 3 D                         will get "NEXT" notification
              // 4 E                         will get "2nd" notification
              // 5 F                         will get "3rd" notification
              // 6 G                         will get "4th" notification
              // 7 H                         will get "beep" notification
              // 8 I                         will get "beep" notification
              //
              // The tonotify array will look like this (0-based):
              // passed offset will be 0
              // 0 D
              // 1 E
              // 2 F
              // 3 G    
              // 4 H
              // 5 I       
              //
              //
              // But we can also notify someone in the middle of the line
              // But suppose the line looks like this (0-based)
              // 0 A notified                no notification
              // 1 B notified                no notification
              // 2 C notified                no notification
              // 3 D                         no notification  (remains as next)
              // 4 E                         no notification  (remains second)
              // 5 F notified  scanned       will get "thank you" notification
              // 6 G                         will get "3rd" notification, as moved to third
              // 7 H                         will get "4th" notification 
              // 8 I                         will get "beep" notification
              // 9 J                         will get "beep" notification
              //
              // The tonotify array will look like this (0-based):
              // passed offset will be 2
              // 0 G
              // 1 H
              // 2 I
              // 3 J

              var tonotify = new Array(); 
              var offset = 10000000000;
              var notifiedCount = 0;

              if(!bScannedPickup) {
                  for(var i=0; i<this.state.sortedfilteredItems.length; i++) {
                      var titem = this.state.sortedfilteredItems[i];
                    
                      var titemid = getUserIDFromContact(titem.contact);
                      if(titemid === data) {                      
                          offset = i;  
                      }

                      var itemstate = getStateFromState(titem.state);
                      if(itemstate === 'notified') { 
                          notifiedCount++;
                      }

                      if(i > offset) {
                          tonotify.push(titem);
                      }
                  }
              }
              else {
                 for(var i=0; i<this.state.pickupItems.length; i++) {
                      var titem = this.state.pickupItems[i];
                    
                      var itemstate = getStateFromState(titem.state);
                      if(itemstate === 'notifiedpickup') { 
                          notifiedCount++;
                      }
                  }
              }

              // if there are no more outstanding customers to be notified, close the scanner
              if(notifiedCount <= 1)   { // 1 includes the scanned item
                  this.scanCustomerCancel();
                  this.setState({scanMessage: MSG_SCAN_ENTRANCE_CODE});  // back to the default
              }
              else {
                  this.setState({scanMessage:"SCAN CONFIRMED for " + this.nicknameInLine(scannedItem)});
              }

              // Remove the scanned user and notify the persons behind him
              this.removeFromLine(scannedItem['_id'], false, tonotify, offset, false);  // also refreshes the display

              // Now notify the scanned person
              sendPush(scannedItem, global.notificationScanned,
                            MSG_THANK_YOU_FOR_USING_SAFE_QUEUE,
                            MSG_HAVE_A_SAFE_DAY,
                            "silent.wav", webSocket, false); // don't text, since customer should be standing right there

              // retire the scanned code after 5 seconds
              setTimeout(function() { lastScannedValue='xxxxxxxx'; }, 5000);
          }
          else {
              // Not the right customer, so find him for error  message
              var position = this.positionInLine(data) + 1;  // to 1-based
              if(position > 0) {
                  var pos = position.toString();
                  alert("This customer has not been notified yet.");
                  //alert(MSG_NOTYET + "\n\n" + data + "\n\n" + MSG_CUSTOMER_IS_STILL_NUMBER + "\n" + pos + " " + MSG_IN_LINE);
              }
              else {
                  alert(MSG_YOW + MSG_CUSTOMER_NOT_AT_THIS_STORE);
              }

              lastScannedValue = 'xxxxxxxxx';  // so we can scan him again
              this.scanCustomerCancel();
              this.setState({scanMessage: MSG_SCAN_ENTRANCE_CODE});  // back to the default
          }
    };
}


// returns 0-based number in line
positionInLine = (targetid) => {
    var bFound = false;
    var position;
    for(var i=0; i<this.state.sortedfilteredItems.length; i++) {
        var titem = this.state.sortedfilteredItems[i];
        var tid = getUserIDFromContact(titem.contact);
        if(tid == targetid)
            return i;
    }

    // if we're here, we didn't find the person in our line
    return -1;
}

onScanError = (err) => {
    alert("Sorry, unable to use the camera\n\n" + err);
    this.scanCustomerCancel();
}

drawScanner = () => {
    if(this.state.bShowScanner === '0')
        return;

    const handleAutoChange = (event) => {
        this.setState({bAutoNotifyEnabled:event.target.checked})
    }

    var style={width:"98%",marginBottom:8,borderRadius:10,borderColor:'#000000', backgroundColor:themeMainColor};
    return (
        <div>
            { false  &&
            <Grid container  
                direction="row"
                justify="center"
                alignItems="center">
                    <Grid item><b>AUTO-NOTIFY NEXT IN LINE</b></Grid>
                    <Grid item>
                        <FormControlLabel style={{marginLeft:8}}
                            control={
                              <Switch
                                checked={this.state.bAutoNotifyEnabled}
                                onChange={handleAutoChange}
                                name="autonotify"
                                color="primary"
                              />
                            }
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button onClick={(e) => {this.showInfoAutoNotify(); e.stopPropagation();}}><img src={icon_about_black} height="20"/></Button>
                    </Grid>
            </Grid>
          }

            <QrReader
                delay={300}
                facingMode={"environment"}
                style={{width:"98%",marginLeft:4}}
                onError={this.onScanError}
                onScan={this.onScanSuccess}
                showViewFinder={true}
              />

            <div style={{marginTop:8}}>
                <Button style={style} onClick={this.scanCustomerCancel} > 
                    <div style={{color:'#FFFFFF',fontSize:'130%'}}>{BTN_CLOSE}</div>
                </Button>
            </div>
        </div>
    ); 
}


drawAutoNotifyWarningDialog = () => {
  if(this.state.bShowAutoNotifyWarningDialog === '0')
      return;

    var namestyle = {fontSize:"80%"};

    const handleOkay = () => {
        // show the dialog only once
        this.setState({bShowAutoNotifyWarningDialog:'0',
                       bAutoNotifyWarningShown:true});
    };

     return (
        <div>
          <Dialog open={true}  aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{fontSize:"75%"}}>NEW!</DialogTitle>
            <DialogContent>
                  <div><b>Automatic notify is enabled by default.</b></div>
                  <div style={{fontSize:'90%',marginTop:16}}>The app will automatically
                  notify the next person in line after a successful scan.</div>
                  <div style={{fontSize:'90%',marginTop:16}}>This is intended to make it simpler to
                  manage the line, so you don't have to manually notify the next person.</div>
                  <div style={{fontSize:'90%',marginTop:16}}>You can change this behavior at any time.</div>
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

showInfoAutoNotify = () => {
    this.displayHelpMessage("Automatic Notify on Scan",

      "Enable this feature to automatically notify the next person in the walk-in line after a successful scan " +
      "(or if you remove a person from the line).", 

      "This is a convienence for you, so you don't have to manually notify the next person after you've scanned someone.",

      "",
      "");
}

drawLostWebSocketHandler() {
   if(this.state.bShowLostWebSocketHandler === '0')
      return;

  const handleClose = (event, reason) => {
      this.setState({bShowLostWebSocketHandler:'0'});
  };

  const handleClick = (event, reason) => {
        this.setState({bShowLostWebSocketHandler:'0'});
        returnToManager();
  };

  return (
    <div>
      <Snackbar 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={true}
        autoHideDuration={120*1000}  // keep it open for a long time...
        TransitionComponent={this.state.Transition}
        onClose={handleClose}
      >
      <SnackbarContent 
          style={{
            backgroundColor:themeMainColor,
          }} 
          message={this.state.bShowLostWebSocketHandler}
          action={
            <React.Fragment>
                <Grid container
                    direction="row"
                    justify="flex-start"
                    alignItems="center">  
                        <Grid item>
                          <CircularProgress style={{marginTop:4}} variant="indeterminate" size={16} color="#FFFFFF" thickness={4} />
                        </Grid>
                        <Grid item>
                            <div style={{marginRight:30,marginLeft:8}}>
                                         Re-connecting ({webSocketRetries})...</div>
                        </Grid>
                        <Grid item>
                            <Ons.Button modifier="large--quiet" 
                                style={{color:"#FFFFFF"}} onClick={() => { handleClick() }}>
                                {BTN_REFRESH}
                            </Ons.Button>                   
                      </Grid>
                </Grid>
            </React.Fragment>
          }
      />
      </Snackbar>
    </div>
  );
}


drawRegisteredUsers = () => {
    if((this.state.bShowLoader !== '0') || (this.state.bShowEditing !== '0'))
        return;

    /* get the features supported
    var item = global.itemQueueManagement;
    var bStoreHasWalkin = true;
    if(item.features !== undefined) {
        if(item.features.indexOf('|W') === -1)
            bStoreHasWalkin = false;
    }

    // add a pickup button, if the store allws pickup
    var bStoreHasPickup = false;
    if(item.features !== undefined) {
        if(item.features.indexOf('|P') !== -1)
            bStoreHasPickup = true;
    }
    */

    var regFontSize = '100%';
    if(global.bSpanish)
        regFontSize = '80%'
    
    return (
        <div style={{marginBottom:16, marginTop:8}}>
            { this.bWalkinSupport() && 
              <Grid container spacing={16}
                  direction="row"
                  justify="space-between"
                  alignItems="center"> 
                   
                    <Grid item xs={9}>
                        <div style={{fontSize:regFontSize,textAlign:'right'}}><b>{MSG_REGISTERED_TO_AUTOMATICALLY_JOIN}</b></div>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{fontSize:regFontSize,textAlign:'center'}}>{this.state.numRegisterJoin}</div>
                    </Grid>
                     <Grid item xs={1}>
                        <div style={{fontSize:'100%',textAlign:'right'}}></div>
                    </Grid>
              </Grid>
            }
            { this.bPickupSupport() &&
              <Grid container spacing={16}
                  direction="row"
                  justify="space-between"
                  alignItems="center"> 
                   
                    <Grid item xs={9}>
                        <div style={{fontSize:regFontSize,textAlign:'right'}}><b>Registered to automatically check in:</b></div>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{fontSize:regFontSize,textAlign:'center'}}>{this.state.numRegisterPickup}</div>
                    </Grid>
                     <Grid item xs={1}>
                        <div style={{fontSize:'100%',textAlign:'right'}}></div>
                    </Grid>
              </Grid>
            }
        </div>
    ); 
}

drawSelfManaged = () => {
    if(!this.bSelfManagedSupport() || (this.state.bShowEditing !== '0'))
        return;

    return (
        <div style={{marginBottom:16,marginTop:16,fontSize:"120%"}}>
        This Queue is Self-Managed
        </div>
    );
}


drawContactInfo = () => {
    return (
        <TextField style={{width:"80%",marginTop:8}}
            id="outlined-basic-name"
            label={TTL_CONTACT_INFO}
            hintText="e.g. 310-555-4555"
            variant="outlined"
            onChange={(e) => this.setState({ item:{...this.state.contactinfo, name: e.target.value.trim()}})}
          />
    )
}



/* 
 * CUSTOMIZATION
 */
drawCustomization = () => {
   if((this.state.bShowLoader !== '0')) // || (this.state.bShowEditing !== '0'))
        return;

    const handleToggle = () => {
        //e.stopPropagation();
        if(this.state.bShowCustomizations) {

            // if there are unsaved changes, warn the user
            if(this.state.bShowFeaturesSaveCancel ||
               this.state.bShowNotifyMessageButtons ||
               this.state.bShowPickupMessageButtons ||
               this.state.bShowTimePerCustomerButtons ||
               this.state.bShowRadiusButtons) {

                this.displayErrorMessage("Un-Saved Changes!",
                        "Please cancel or save the changes you've made before closing.");
                return;
            }

            this.setState({bShowCustomizations: false,
                           showCustimizationIcon: btn_chevronRight,
                           showCustomizationTitle: BTN_SHOW_QUEUE_CUSTOMIZATION}); // "Show Queue Customizations"});
        }
        else {
            this.setState({bShowCustomizations: true,
                           showCustimizationIcon: btn_chevronDown,
                           showCustomizationTitle: BTN_HIDE_QUEUE_CUSTOMIZATION}); //"Hide Queue Customizations"});

            /*
            setTimeout(() => {
                var theref = this.theCustomizations;
                if((theref !== null) || (theref === undefined))
                    theref.scrollIntoView({ behavior:"smooth"});
            }, 500);
            */
        }   
    }

    var btnstyle={width:"98%",marginBottom:8,marginTop:0,borderRadius:10,borderColor:'#000000'};

    return (
        <Button style={btnstyle} disableRipple={true} onClick={handleToggle} >
            <Grid container  
                direction="row"
                justify="flex-start"
                alignItems="center">

                <Grid item xs={1}>
                    <div style={{marginTop:6,textAlign:'left'}}>
                      <img src={this.state.showCustimizationIcon} height="20"/>
                    </div>
                </Grid>
                <Grid item xs={11}>
                    <div style={{textAlign:'left',marginLeft:-8}}>{this.state.showCustomizationTitle}</div>
                </Grid>
            </Grid>
        </Button>
    );
}

// custom field breakouts
generateCustomField = () => {
    var newcustom = {
          timepercustomer: this.state.timePerCustomer,
          notifymessage:   this.state.customNotifyMessage,
          pickupmessage:   this.state.customPickupMessage,
          radius:          this.state.chosenRadiusInFeet,
          contactinfo:     this.state.newContactInfo,
    };
    return newcustom;
}

customTimePerCustomer = (custom) => {
    var time = ''
    if(custom !== undefined) {
        if(custom.timepercustomer !== undefined)
           time = custom.timepercustomer;
    }
    return time;
}


customNotifyMessage = (custom) => {
    var notify = ''
    if(custom !== undefined) {
        if(custom.notifymessage !== undefined)
           notify = custom.notifymessage;
    }
    return notify;
}


customPickupMessage = (custom) => {
    var pickup = ''
    if(custom !== undefined) {
        if(custom.pickupmessage !== undefined)
           pickup = custom.pickupmessage;
    }
    return pickup;
}

customRadius = (custom) => {
    var radius = 1000;
    if(custom !== undefined) {
        if(custom.radius !== undefined)
           radius = custom.radius;
    }
    return radius;
}


customContactInfo = (custom) => {
    var info = '';
    if(custom !== undefined) {
        if(custom.contactinfo !== undefined)
           info = custom.contactinfo;
    }
    return info;
}



drawEstimatedTime = () => {
    if(/*(this.state.bShowEditing !== '0') ||*/ (this.state.bShowLoader !== '0'))
        return;

    if(!this.state.bShowCustomizations)
        return;

    const handleTimeChange = (event) => {
        var newvalue = event.target.value;

        if(newvalue.indexOf('n') !== -1) {
            // must be 'not set' so remove everything except the new character
            var temp = '';
            for (let i = 0; i < newvalue.length; i++) {
                var c = newvalue[i];

                if((c !== '0') && (c !== '1') && (c !== '2') && (c !== '3') && (c !== '4') &&
                   (c !== '5') && (c !== '6') && (c !== '7') && (c !== '8') && (c !== '9')) 
                    ;
                else
                  temp += c;
            }
            newvalue = temp;
        }

         if((newvalue === '') || (newvalue === '0')) {
            this.setState({timePerCustomer:'',
                           bShowTimePerCustomerError:"Wait time will not be shown",
                           bShowTimePerCustomerButtons:true});

            return;
        }

        // remove all non-numbers - this prevents them from being displayed at all
        for (let i = 0; i < newvalue.length; i++) {
            var c = newvalue[i];

            if((c !== '0') && (c !== '1') && (c !== '2') && (c !== '3') && (c !== '4') &&
               (c !== '5') && (c !== '6') && (c !== '7') && (c !== '8') && (c !== '9')) 
                return;
        }

        this.setState({timePerCustomer:newvalue,
                       bShowTimePerCustomerError:'',
                       bShowTimePerCustomerButtons:true});
    }

    const handleCancel = () => {
        var time = this.customTimePerCustomer(global.itemQueueManagement.custom);
        var error = (time === 'not set') ? "Wait time will not be shown" : "";
        this.setState({timePerCustomer:time,
                       bShowTimePerCustomerError:error,
                       bShowTimePerCustomerButtons:false})
    };

    const handleSave = () => {
        this.setState({bShowBackdrop:'Saving...'});

        //var newcustom = {timepercustomer:this.state.timePerCustomer};
        var newcustom = this.generateCustomField();
        global.itemQueueManagement.custom = newcustom;
        const update = {
            ...global.itemQueueManagement,
            logo:'', // don't update the logo
            custom: newcustom
        };

        //console.log("UPDATE: " + JSON.stringify(update))

        updateResilient(update, update, (item) => {
            if(item != null) {
                // handle any mirrors
                this.syncWithMirrors();
            }
            else {
                alert('Database Error. Failed to save your edits.\n[business]\n\n' +
                'This may be due to a network error. Check your connection and try again.'); // , [{text: 'OK'}]);
                this.setState({bShowBackdrop:'0'});
            }

            var error = (this.state.timePerCustomer === '') ? "Wait time will not be shown" : "";
            this.setState({bShowBackdrop:'0',
                           bShowTimePerCustomerError:error,
                           bShowTimePerCustomerButtons:false})
        });   
    };

    var placeholder = '';
    var value = this.state.timePerCustomer;

    return (
         <Grid container spacing={16}
            direction="row"
            justify="space-between"
            alignItems="center"
            justify="center"> 
            <Grid item xs={this.state.bShowTimePerCustomerButtons ? 6 : 10}>              
                <TextField style={{width:"98%",marginTop:8,fontSize:'80%',textTransform:'none'}}
                    InputProps={{ 
                        endAdornment: <InputAdornment position="end">seconds</InputAdornment>,
                    }}
                    
                    id="outlined-basic-name"
                    value={value}
                    label={"Wait Time Per Customer"}
                    variant="outlined"
                    size="small"
                    placeholder={placeholder}
                    //helperText={this.state.bShowTimePerCustomerError}
                    onChange={handleTimeChange}
                />
            </Grid>
            { this.state.bShowTimePerCustomerButtons &&
              <Grid item xs={2}>
                  <Button onClick={handleSave} color="primary">
                      {BTN_SAVE}
                  </Button>  
              </Grid>
            }
            { this.state.bShowTimePerCustomerButtons &&
              <Grid item xs={2}>
                  <Button onClick={handleCancel} color="secondary">
                      {BTN_CANCEL}
                  </Button>  
              </Grid>
            }
            <Grid item xs={2}>
                <Button onClick={(e) => {this.showInfoCustom_TimePerCustomer(); e.stopPropagation();}}><img src={icon_about_black} height="20"/></Button>
            </Grid>
        </Grid>
    );
}

showInfoCustom_TimePerCustomer = () => {
  this.displayHelpMessage("Estimated Wait Time",
     
      "You can optionally show the customer an estimated wait time. Safe Queue has a simple calculation to do so. " +
      "It is this:",

      "You specify an average wait time per customer here, which is multiplied by the customer's position in line. So, " +
      "if you specify the average wait is 120 seconds, the first person will be told 'about 2 minutes', the second " + 
      "will be told 'about 4 minutes', the third 'about 6 minutes' and so on.",

      "As customers move up in line, their wait time is updated.  It does not count down.",

      "To remove the wait time, set it to 0. In that case, no wait time is displayed at all.");
}


drawCustomNotifyMessage = () => {
    if(/*(this.state.bShowEditing !== '0') ||*/ (this.state.bShowLoader !== '0'))
        return;

    if(!this.state.bShowCustomizations)
        return;

    const handleMessageChange = (event) => {
        var newvalue = event.target.value;

        if(newvalue === '') {
            this.setState({customNotifyMessage:'',
                           bShowNotifyMessageError:"Standard notify message used",
                           bShowNotifyMessageButtons:true});

            return;
        }

        this.setState({customNotifyMessage:newvalue,
                       bShowNotifyMessageError:'',
                       bShowNotifyMessageButtons:true});
    }

    const handleCancel = () => {
        var notify = this.customNotifyMessage(global.itemQueueManagement.custom);
        var error = (notify === '') ? "Standard notify message used" : "";
        this.setState({customNotifyMessage:notify,
                       bShowNotifyMessageError:error,
                       bShowNotifyMessageButtons:false})
    };

    const handleSave = () => {
        this.setState({bShowBackdrop:'Saving...'});

        var newcustom = this.generateCustomField();
        global.itemQueueManagement.custom = newcustom;
        const update = {
            ...global.itemQueueManagement,
            logo:'', // don't update the logo
            custom: newcustom
        };

        updateResilient(update, update, (item) => {
            if(item != null) {
                // handle any mirrors
                this.syncWithMirrors();
            }
            else {
                alert('Database Error. Failed to save your edits.\n[business]\n\n' +
                'This may be due to a network error. Check your connection and try again.'); // , [{text: 'OK'}]);
                this.setState({bShowBackdrop:'0'});
            }

            var error = (this.state.customNotifyMessage === 'not set') ? "Standard notify message used" : "";
            this.setState({bShowBackdrop:'0',
                           bShowNotifyMessageError:error,
                           bShowNotifyMessageButtons:false})
        });   
    };

    const audioCallback = (type, error) => {
         if(type === 'finishgen')
            this.setState({bCustomNotifyMessagePlaying:'generated.'});
        else if(type === 'audioend') {
            //console.log("ended callback")
            this.setState({bCustomNotifyMessagePlaying:'0'});
        }
        else if(type === 'networkerror') {
            alert("Sorry, there was a network error. Try Again");
            this.setState({bCustomNotifyMessagePlaying:'0'});
        }
        else if(type === 'audioerror') {
            var title = "Audio Playback Not Allowed";
            var subtitle = "Check the audio playback and auto-play settings for this site in your browser.";
            error = "\"" + error + "\"";
            this.setState({bCustomNotifyMessagePlaying:'0'});
            this.displayErrorMessage(title, subtitle, error);
        }
        else if(type === 'audiostart') {
            this.setState({bCustomNotifyMessagePlaying:'playing...'});
        }
        else if(type === 'audiofile') {
            var url = error;
            this.setState({bCustomNotifyMessagePlaying:'ready...', customNotifyMessageURL:url})
            var player = document.getElementById("notifyplayer"); 
            player.onended = function() { audioCallback('audioend'); }
            player.onplay = function() { audioCallback('audiostart'); }
            player.play();
        }
    }

    const handleTest = () => {
          this.setState({bCustomNotifyMessagePlaying:'rendering...'});
          playSpeechFromText(this.state.customNotifyMessage, audioCallback, true);  // get the file
    };

    return (
      <div>     
         <audio id="notifyplayer" src={this.state.customNotifyMessageURL}>No Audio Support</audio>
         <Grid container spacing={16}
            direction="row"
            justify="space-between"
            alignItems="center"
            justify="center"> 
            <Grid item xs={(this.state.customNotifyMessage !== '') ? 8 : 10}>              
                <TextField style={{width:"98%",marginTop:8,fontSize:'80%',textTransform:'none'}}
                    InputProps={{ 
                        
                    }}
                    multiline
                    id="outlined-basic-name"
                    value={this.state.customNotifyMessage}
                    label={"Custom Notify Message"}
                    variant="outlined"
                    size="small"
                    onChange={handleMessageChange}
                />
            </Grid>
            { this.state.customNotifyMessage !== '' &&
                <Grid item xs={2}>
                   
                    { this.state.bCustomNotifyMessagePlaying === '0' &&
                      <Button onClick={handleTest} color="primary"><img src={btn_play} height="30"/></Button> 
                    } 
                    { this.state.bCustomNotifyMessagePlaying !== '0' &&
                      <div style={{fontSize:"100%",marginLeft:8}}>{this.state.bCustomNotifyMessagePlaying}</div>
                    } 
                </Grid>
            }
            <Grid item xs={2}>
                  <Button onClick={(e) => {this.showInfoCustom_NotifyMessage(); e.stopPropagation();}}><img src={icon_about_black} height="20"/></Button>
            </Grid>

          </Grid>
          { this.state.bShowNotifyMessageButtons &&
              <Grid container spacing={16}
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  justify="center"> 
                 
                  <Grid item xs={2}>
                      <Button onClick={handleSave} color="primary">
                          {BTN_SAVE}
                      </Button>  
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}>
                      <Button onClick={handleCancel} color="secondary">
                          {BTN_CANCEL}
                      </Button>  
                  </Grid>
                  <Grid item xs={6}></Grid>
              </Grid>
          }
      </div>
    );
}

showInfoCustom_NotifyMessage = () => {
  this.displayHelpMessage("Custom Notify Message",
     
      "The standard Safe Queue message for notification is \"You can go in now\".",

      "You can change this to any short phrase you'd like, which will be shown to the user and spoken by a " +
      "text-to-speech algorithm. Tap on the play button to hear the spoken message.",

      "To remove the custom message, delete all text. The standard message will be used.");
}



drawCustomPickupMessage = () => {
    if(/*(this.state.bShowEditing !== '0') || */ (this.state.bShowLoader !== '0'))
        return;

    if(!this.bPickupSupport())
        return;

    if(!this.state.bShowCustomizations)
        return;

    const handleMessageChange = (event) => {
        var newvalue = event.target.value;

        if(newvalue === '') {
            this.setState({customPickupMessage:'', ShowPickupMessageButtons:true});
            return;
        }

        this.setState({customPickupMessage:newvalue, bShowPickupMessageButtons:true});
    }

    const handleCancel = () => {
        var pickup = this.customPickupMessage(global.itemQueueManagement.custom);
        this.setState({customPickupMessage:pickup, bShowPickupMessageButtons:false})
    };

    const handleSave = () => {
        this.setState({bShowBackdrop:'Saving...'});

        var newcustom = this.generateCustomField();
        global.itemQueueManagement.custom = newcustom;
        const update = {
            ...global.itemQueueManagement,
            logo:'', // don't update the logo
            custom: newcustom
        };

        updateResilient(update, update, (item) => {
            if(item != null) {
                // handle any mirrors
                this.syncWithMirrors();
            }
            else {
                alert('Database Error. Failed to save your edits.\n[business]\n\n' +
                'This may be due to a network error. Check your connection and try again.'); // , [{text: 'OK'}]);
                this.setState({bShowBackdrop:'0'});
            }

            this.setState({bShowBackdrop:'0', bShowPickupMessageButtons:false})
        });   
    };

    const audioCallback = (type, error) => {
        if(type === 'finishgen')
            this.setState({bCustomPickupMessagePlaying:'generated.'});
        else if(type === 'audioend') {
            console.log("ended callback")
            this.setState({bCustomPickupMessagePlaying:'0'});
        }
        else if(type === 'networkerror') {
            alert("Network Error. Try Again");
            this.setState({bCustomPickupMessagePlaying:'0'});
        }
        else if(type === 'audioerror') {
            var title = "Audio Playback Not Allowed";
            var subtitle = "Check the audio playback and auto-play settings for this site in your browser.";
            error = "\"" + error + "\"";
            this.setState({bCustomPickupMessagePlaying:'0'});
            this.displayErrorMessage(title, subtitle, error);
        }
        else if(type === 'audiostart') {
            this.setState({bCustomPickupMessagePlaying:'playing...'});
        }
        else if(type === 'audiofile') {
            var url = error;
            this.setState({bCustomPickupMessagePlaying:'ready...', customPickupMessageURL:url})
            var player = document.getElementById("pickupplayer"); 
            player.onended = function() { audioCallback('audioend'); }
            player.onplay = function() { audioCallback('audiostart'); }
            player.play();
        }
    }

    const handleTest = () => {
          this.setState({bCustomPickupMessagePlaying:'rendering...'});
          playSpeechFromText(this.state.customPickupMessage, audioCallback, true);
    };

    return (
      <div>
         <audio id="pickupplayer" src={this.state.customPickupMessageURL}>No Audio Support</audio>
         <Grid container spacing={16}
            direction="row"
            justify="space-between"
            alignItems="center"
            justify="center"> 
            <Grid item xs={(this.state.customPickupMessage !== '') ? 8 : 10}>              
                <TextField style={{width:"98%",marginTop:8,fontSize:'80%',textTransform:'none'}}
                    InputProps={{ 
                        
                    }}
                    multiline
                    id="outlined-basic-name"
                    value={this.state.customPickupMessage}
                    label={"Custom Pickup Message"}
                    variant="outlined"
                    size="small"
                    onChange={handleMessageChange}
                />
            </Grid>
            { this.state.customPickupMessage !== '' &&
                <Grid item xs={2}>
                    { this.state.bCustomPickupMessagePlaying === '0' &&
                      <Button onClick={handleTest} color="primary"><img src={btn_play} height="30"/></Button> 
                    } 
                    { this.state.bCustomPickupMessagePlaying !== '0' &&
                      <div style={{fontSize:"100%",marginLeft:8}}>{this.state.bCustomPickupMessagePlaying}</div>
                    }                 
                </Grid>
            }
            <Grid item xs={2}>
                  <Button onClick={(e) => {this.showInfoCustom_PickupMessage(); e.stopPropagation();}}><img src={icon_about_black} height="20"/></Button>
            </Grid>

          </Grid>
          { this.state.bShowPickupMessageButtons &&
              <Grid container spacing={16}
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  justify="center"> 
                 
                  <Grid item xs={2}>
                      <Button onClick={handleSave} color="primary">
                          {BTN_SAVE}
                      </Button>  
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}>
                      <Button onClick={handleCancel} color="secondary">
                          {BTN_CANCEL}
                      </Button>  
                  </Grid>
                  <Grid item xs={6}></Grid>
              </Grid>
          }
      </div>
    );
}

showInfoCustom_PickupMessage = () => {
  this.displayHelpMessage("Custom Pickup Message",
     
      "The standard Safe Queue message for pickup notification is \"You can go in now\".",

      "You can change this to any short phrase you'd like, which will be shown to the user and spoken by a " +
      "text-to-speech algorithm. Tap on the play button to hear the spoken message.",

      "To remove the custom message, delete all text. The standard message will be used.");
}



drawRadius = () => {
    if(this.state.bShowLoader !== '0')
        return;

    if(!this.state.bShowCustomizations)
        return;

    //console.log("location: " + this.state.item.location)

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
        if(global.itemQueueManagement.units === 'm')
            newRadiusInFeet = (newvalue * 1000)/304.8;  // user thinks he entered meters

        this.setState({chosenRadiusInFeet:newRadiusInFeet, bShowRadiusButtons:true})
        //this.theMapDiv.scrollIntoView({ behavior:"smooth"});
    }

    const radiusDisplay = () => {
        if(global.itemQueueManagement.units === 'm') {
            var valueInMeters = (this.state.chosenRadiusInFeet * 304.8)/1000; 
            return valueInMeters.toFixed(0);
        }
        return this.state.chosenRadiusInFeet;
    }

    const handleCancel = () => {
        var oldradius = (global.itemQueueManagement.radius === undefined) ? 1000 : this.state.item.radius;
        this.setState({chosenRadiusInFeet:oldradius, bShowRadiusButtons:false})
        this.theMap.setState({radius:oldradius});
    };

    const handleSave = () => {
        this.setState({bShowBackdrop:'Saving...'});
        
        var newcustom = this.generateCustomField();
        global.itemQueueManagement.custom = newcustom;
        const update = {
            ...global.itemQueueManagement,
            logo:'', // don't update the logo
            custom: newcustom
        };

        //console.log("UPDATE: " + JSON.stringify(update))

        updateResilient(update, update, (item) => {
            if(item != null) {
                // handle any mirrors
                this.syncWithMirrors();
            }
            else {
                alert('Database Error. Failed to save your edits.\n[business]\n\n' +
                'This may be due to a network error. Check your connection and try again.'); // , [{text: 'OK'}]);
                this.setState({bShowBackdrop:'0'});
            }
            this.setState({bShowBackdrop:'0', bShowRadiusButtons:false})
        });   
        
    };

    var units = 'feet';
    if(this.state.item.units === 'm')
        units = 'meters';

    return (
        <div>
         <Grid container spacing={16} 
            direction="row"
            justify="space-between"
            alignItems="center"
            justify="center"> 
            <Grid item xs={this.state.bShowRadiusButtons ? 6 : 10}>              
                <TextField style={{width:"98%",marginTop:8,fontSize:'80%',textTransform:'none'}}
                    InputProps={{ 
                        endAdornment: <InputAdornment position="end">{units}</InputAdornment>,
                    }}
                    
                    id="outlined-basic-name"
                    value={radiusDisplay()}
                    label={"Join Distance"}
                    variant="outlined"
                    size="small"
                    onChange={handleRadiusChange}
                />
            </Grid>
            { this.state.bShowRadiusButtons &&
              <Grid item xs={2}>
                  <Button onClick={handleSave} color="primary">
                      {BTN_SAVE}
                  </Button>  
              </Grid>
            }
            { this.state.bShowRadiusButtons &&
              <Grid item xs={2}>
                  <Button onClick={handleCancel} color="secondary">
                      {BTN_CANCEL}
                  </Button>  
              </Grid>
            }
            <Grid item xs={2}>
               <Button onClick={(e) => { e.stopPropagation();this.showInfoCustom_Radius()}}><img src={icon_about_black} height="20"/></Button>
            </Grid>
        </Grid>
            
        <div style={{marginLeft:4,marginTop:4}} ref={(ref) => this.theMapDiv = ref}>
            <DisplayMapClass ref={(ref) => this.theMap = ref} height='320px' width='98%' 
                radius={this.state.chosenRadiusInFeet}
                storeLocation={this.state.item.location}/>
        </div> 
    </div>
    )
}



showInfoCustom_Radius = () => {

  this.displayHelpMessage("Custom Join Distance",
     
      "By default, Safe Queue requires customers to be within 1000 feet (300 meters) of a business " +
      "to join it's line.",

      "You can change this distance to be shorter or longer to suit your business needs.",

      "As you change this value, the map will show a purple circle highlighting that region " +
      "so you'll know what you've selected.");
}



/*
 *  This is the entire screen
 */
render () {
  if(this.state.bShowManager === '1') {
    return ( <Manager />);
  }

  // Pickup 
  var number = this.state.pickupItems.length;
  var plural = (number == 1) ? '' : 's';
  var title = this.state.pickupItems.length + " customer" + plural + " waiting for pickup";

  var offsetAtTop = 54;
  if(isAndroid && isMobile)
      offsetAtTop = 60;
  
	return (
		<div>
      	<ons-toolbar class="toolbar static" style={{backgroundColor:"#7030A0"}}>
        	{/* <img style={{marginTop:12,marginLeft:4,height:20}} src={this.getWebSocketIcon()}/> */}
        	<div className="center" style={{color:'#FFFFFF',fontSize:'150%', fontFamily:'./IBMPlex/IBMPlexSans-Bold.ttf'}}>
          <b>{TTL_QUEUE_MANAGEMENT}</b></div>
      	</ons-toolbar>
             
		    <Ons.Page contentStyle={{padding: 0,maxWidth:414, display: 'block', marginLeft:'auto', marginRight:'auto'}}>
            <div className="App">
            		<div style={{height:offsetAtTop,backgroundColor:'#F1F0EE'}}></div>

  	            { this.drawBackdrop() }
                { this.drawNotification()}
                { this.drawOpenCloseDialog() }
                { this.drawUserTappedDialog() }
                { this.drawConfimDialog() }
                { this.drawLostWebSocketHandler() }
                { this.drawErrorMessage()}
                { this.drawStandeeTappedDialog() }
                { this.drawPickupTappedDialog() }
                { this.drawHelpMessage() }
                { this.drawQRCodePickUp() }
                { this.drawAutoNotifyWarningDialog() }


                { this.drawItem()}
                { this.drawSelfManaged() }
                { /* this.drawFeatures() */ }
                { this.drawScanner() }
                <div style={{height:4,background:'#F1F0EE'}}></div>

                { this.drawPrintableQRCode() }

                { this.drawAddPhoto() }

                { this.drawLoader() }

                { this.drawBtnNextCustomer() }
                { this.drawBtnScan() }

                { this.state.pickupItems.length > 0 && this.state.bShowEditing === '0' &&
                  <div>
                  <div style={{fontSize:"130%",marginTop:16}}>CHECKED IN FOR PICK-UP</div>
                  <div><b>{title}</b></div>
                  <PlainList
                        list={this.state.pickupItems}
                        renderItem={this.renderItem}
                        renderWhenEmpty={() => <div></div>}
                        wrapperHtmlTag="div"
                        // any html props for div tag
                        id="my-container-line"
                        style={{background: '#F1F0EE'}}
                        onMouseOver={this.mouseOverHandler} // will attach events
                        ref={this.containerRef} // will forward ref
                    />
                  </div>
                }
                { this.drawBtnAddPickUp() }


  	            { this.state.bShowLineList !== '0' && this.state.bShowEditing === '0' &&
                  <div>
                  { /*(this.state.pickupItems.length > 0) && */ (this.state.sortedfilteredItems.length > 0) && this.bWalkinSupport() && 
                      <div style={{fontSize:"130%",marginTop:16}}>IN LINE WAITING</div>
                  }
                
                  { this.bWalkinSupport() && 
                      <div><b>{this.state.linelength}</b></div>
                  }
  	            	<PlainList 
  	                    list={this.state.sortedfilteredItems}
  	                    renderItem={this.renderItem}
                        renderWhenEmpty={() => <div></div>}
  	                    wrapperHtmlTag="div"
  	                    // any html props for div tag
  	                    id="my-container-line"
  	                    style={{background: '#F1F0EE'}}
  	                    onMouseOver={this.mouseOverHandler} // will attach events
  	                    ref={this.containerRef} // will forward ref
  	                />
                    </div>
  	            }
                { this.drawBtnStandee() }
                { this.drawRegisteredUsers() }

                { this.drawCustomization() }
                <div style={{marginBottom:24}} ref={(ref) => this.theCustomizations = ref}>
                    { this.drawFeatures() }
                    { this.drawCustomNotifyMessage() }
                    { this.drawCustomPickupMessage() }
                    { this.drawEstimatedTime() }
                    { this.drawRadius() }
                </div>
                { this.drawBtnDelete() }

  	        </div>
		    </Ons.Page>
      }
		</div>
	);
}
}
 
export default QueueManagement;