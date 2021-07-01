import React, { Component } from 'react';
import PageVisibility from 'react-page-visibility';
import MuiPhoneNumber from 'material-ui-phone-number';
 
import '../App.css';

import {DisplayMapClass} from './HereMap';
import {WorldMapClass} from './WorldMap';


import { updateResilient, pushResilient, removeResilient, searchResilient, addResilient } from '../lib/utils'
import { getUserIDFromContact, getAPNTokenFromContact, getData, storeData } from '../lib/utils'
import { getStateFromState, getValueFromState, setValueForState, createContact } from '../lib/utils'
import { returnToManager, returnToCustomer, sendPush, playSpeechFromText } from '../lib/utils'

import logo_safequeue from '../images/safequeue_splash.png';
import logo_safequeue_es from '../images/safequeue_splash_es.png';

import icon_safequeue from '../images/logo192.png';

import Spinner from 'react-spinkit';
import QRCode from 'qrcode.react';

import moment from 'moment';

import mappin from '../images/mappin.png';

import q0 from '../images/q0.png';
import q1 from '../images/q1.png';
import q2 from '../images/q2.png';
import q3 from '../images/q3.png';

import icon_walkin from '../images/walkin.png';
import icon_pickup from '../images/pickup.png';
import icon_leftarrow from '../images/leftarrow.png';
import icon_rightarrow from '../images/rightarrow.png';


import icon_warning from '../images/warning.png';
import icon_good    from '../images/good.png';
import icon_audio_on  from '../images/audio_on.png';
import icon_audio_off from '../images/audio_off.png';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import {
  // isBrowser,
  // isMobile,
  //isChrome,
  isIOS,
  isSafari,
  isChrome,
  isAndroid
} from "react-device-detect";

import FlatList, {PlainList} from 'flatlist-react';
//import PlainList from 'flatlist-react';

import { Buffer } from 'buffer';


import * as Ons from 'react-onsenui'; // Import everything and use it as 'Ons.Page', 'Ons.Button'


import { makeStyles } from '@material-ui/core/styles';
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

import btn_play_white from '../images/playbutton_white.png';


/*
 * Simple translation to spanish
 *
 * Language string symbols, set at run time for language.
 */
var APP_NAME;
var BTN_YES
var BTN_NO
var BTN_START;
var BTN_CANCEL;
var BTN_CLOSE;
var BTN_JOIN;
var BTN_CHECKIN;
var BTN_CHECKIN_FOR_PICKUP;
var BTN_JOIN_AUTOMATICALLY;
var BTN_CHECK_IN_AUTOMATICALLY;
var BTN_JOIN_SAFE_QUEUE;
var BTN_LEAVE_SAFE_QUEUE;
var BTN_STOP_WAITING;
var TTL_SAFE_QUEUES;

var TTL_SAFE_QUEUES_NEAR_YOU;
var MSG_CLOSED;
var MSG_OPEN;
var MSG_JOINING;
var MSG_STARTING;
var MSG_REMOVING;
var MSG_LEAVING;
var MSG_WAITING_TO_JOIN;
var MSG_WAITING_TO_CHECKIN;
var MSG_WAITING_TO_JOIN_SHORT;
var MSG_WAITING_TO_CHECKIN_SHORT;
var MSG_FINDING_SAFE_QUEUES;
var MSG_YOU_CAN_ALSO_RECEIVE_TEXT_MESSAGES;
var MSG_WAITING_TO_GET_CLOSE_ENOUGH;
var MSG_THEN_WELL_ADD_YOU_TO_THE_LINE;
var MSG_THEN_WELL_CHECK_YOU_IN;
var MSG_KEEP_THIS_PAGE_VISIBLE;
var MSG_IF_YOU_LEAVE_THIS_PAGE;
var MSG_IF_YOU_WILL_NOT_BE_NOTIFIED;
var MSG_IF_YOU_WILL_NOT_BE_NOTIFIED_TO_PICKUP;
var MSG_IF_YOU_WILL_NOT_BE_ABLE_TO_JOIN;
var MSG_IF_YOU_WILL_NOT_BE_ABLE_TO_CHECKIN;
var MSG_IF_YOU_MUST_COME_BACK_FOR_UPDATES;
var MSG_IF_COME_BACK_WHEN_YOU_GET_A_TEXT;
var MSG_IF_YOU_WILL_NOT_BE_ABLE_TO_JOIN_OR_GET_TEXT;
var MSG_IF_YOU_WILL_NOT_BE_ABLE_TO_JOIN_OR_GET_TEXT_CHECKIN;
var MSG_ARE_YOU_SURE_YOU_WANT_TO_LEAVE;
var MSG_YES_LEAVE;
var MSG_ARE_YOU_SURE_YOU_WANT_TO_STOP_WAITING;
var MSG_YES_STOP;
var MSG_YOU_ARENT_CLOSE_ENOUGH;
var MSG_TO_JOIN_THE_LINE;
var MSG_MUST_BE_WITHIN_1000FT;
var MSG_MUST_BE_WITHIN;
var MSG_THE_APP_CAN_JOIN_FOR_YOU;
var MSG_THE_APP_CAN_CHECKIN_FOR_YOU;

var MSG_READY;
var MSG_WAITING_FOR_PICKUP;
var MSG_CREATING_YOUR_PICKUP;

var MSG_THE_APP_WILL_TRACK_YOUR_LOCATION;
var MSG_THE_APP_WILL_TRACK_YOUR_LOCATION_CHECKIN;
var MSG_THANK_YOU;
var MSG_THANK_YOU_FOR_USING_SAFE_QUEUE;
var MSG_YOU_HAVE_BEEN_REMOVED;
var TTL_PHONE_NUMBER;
var MSG_YOU_ARE_IN_LINE;
var MSG_YOU_ARE_IN_LINE_AT;
var MSG_YOU_ARE_CHECKEDIN_AT;
var MSG_YOU_MUST_ADD_A_NOTE;
var MSG_YOUR_POSITION;
var MSG_OF;
var MSG_IN_LINE;
var MSG_GO_IN_NOW;

var MSG_CHECKING_IN_FOR_PICKUP;
var MSG_REGISTERING_FOR_CHECKIN;

var MSG_TO_CHECK_IN_FOR_A_PICKUP

var MSG_YOU_WILL_RECEIVE_NOTIFICATIONS

var MSG_WOULD_YOU_LIKE_TO_RECEIVE_VOICE;

var NOTE_THIS_IS_SAFE_QUEUE;
var NOTE_YOU_ARE_FOURTH;
var NOTE_YOU_ARE_THIRD;
var NOTE_YOU_ARE_SECOND;
var NOTE_YOU_ARE_NEXT;
var NOTE_GO_IN_NOW;
var NOTE_LINE_HAS_MOVED;
var NOTE_WARNING;
var NOTE_ADDED;
var NOTE_ADDED_AT;
var NOTE_CLOSE_ENOUGH;
var NOTE_THANK_YOU_FOR_USING_SAFE_QUEUE;
var NOTE_YOUR_ORDER_IS_READY;
var NOTE_YOUR_ORDER_IS_READY_AT;

var MSG_SOMEONE_HAS_JOINED;
var MSG_SOMEONE_HAS_AUTOJOINED;
var MSG_SOMEONE_HAS_AUTOCHECKEDIN;
var MSG_A_PERSON_HAS_REGISTERED;
var MSG_A_PERSON_HAS_REGISTERED_CHECKIN;
var MSG_ANOTHER_PERSON_HAS_JOINED;
var MSG_ANOTHER_PERSON_HAS_CHECKEDIN;
var MSG_YOU_WERE_NOTIFIED_AT;
var MSG_ADD_A_NICKNAME_OPTIONAL;
var MSG_ADD_A_NICKNAME;

var MSG_THIS_IS_YOUR_ENTRANCE_CODE
var MSG_YOU_ARE_NO_LONGER_CLOSE_ENOUGH
var MSG_YOU_WERE_REMOVED_FROM_THE_LINE
var MSG_WARNING_YOU_WILL_BE_TAKEN_OUT
var MSG_SORRY

var MSG_YOU_CANT_JOIN_THE_LINE
var MSG_BECAUE_THE_QUEUE_IS_CLOSED

var MSG_SAFE_QUEUE_NEEDS_YOUR_GPS_LOCATION
var MSG_CHANGE_YOUR_BROWSER_SETTINGS
var MSG_YOUR_BROWSER_REPORTED

var MSG_WAITING_FOR_GPS_INFORMATION;
var MSG_LOADING_DATA;

const setLanguage = (lang) => {

    var bSpanish = (lang === 'es') ? true : false;

    // App name
    APP_NAME     = !bSpanish ? "Safe Queue" : "Cola Segura";

    BTN_YES = !bSpanish ? "Yes" : "Sí";
    BTN_NO  = !bSpanish ? "No"  : "No";

    MSG_WAITING_FOR_GPS_INFORMATION = !bSpanish ? "Waiting for GPS information..." : "Esperando información de GPS ...";
    MSG_LOADING_DATA = !bSpanish ? "Loading data..." : "Cargando datos...";

    // Buttons
    BTN_START    = !bSpanish ? "Start" : "Inicio"
    BTN_CANCEL   = !bSpanish ? "Cancel" : "Cancelar";
    BTN_CLOSE    = !bSpanish ? "Close" : "Cerrar";
    BTN_JOIN     = !bSpanish ? "Join" : "Unirse";
    BTN_CHECKIN  = !bSpanish ? "CHECK IN" : "REGISTRARSE";
    BTN_CHECKIN_FOR_PICKUP = !bSpanish ? "CHECK IN FOR PICKUP" : "REGISTRARSE PARA RECOGER";
    BTN_JOIN_AUTOMATICALLY = !bSpanish ? "Join Automatically" : "Unirse automáticamente";
    BTN_CHECK_IN_AUTOMATICALLY = !bSpanish ? "Check in Automatically" : "Registrarse Automáticamente";

    BTN_JOIN_SAFE_QUEUE = !bSpanish ? "Join Safe Queue" : "Unirse a Cola Segura";
    BTN_LEAVE_SAFE_QUEUE = !bSpanish ? "Leave Safe Queue" : "Abandonar la Cola Segura";

    BTN_STOP_WAITING = !bSpanish ? "STOP WAITING" : "Dejar de esperar";

    // Titles
    TTL_SAFE_QUEUES          = !bSpanish ? "Safe Queues" : "Colas Seguras";
    TTL_SAFE_QUEUES_NEAR_YOU = !bSpanish ? "Safe Queues Near You" : "Colas Seguras cerca de usted";

    // notifications
    NOTE_THIS_IS_SAFE_QUEUE = !bSpanish ? "This is SafeQueue!" : "Esto es ColaSegura!";
    NOTE_YOU_ARE_FOURTH = !bSpanish ? "You are now fourth in line." : "Usted es ahora el cuarto en la cola";
    NOTE_YOU_ARE_THIRD  = !bSpanish ? "You are now third in line."  : "Usted es ahora el tercero en la cola";
    NOTE_YOU_ARE_SECOND = !bSpanish ? "You are now second in line." : "Usted es ahora el segundo en la cola";
    NOTE_YOU_ARE_NEXT   = !bSpanish ? "You are next in line."       : "Usted es ahora el siguiente en la cola";
    NOTE_GO_IN_NOW      = !bSpanish ? "You can go in now!"          : "¡Usted puede entrar ahora!";
    NOTE_LINE_HAS_MOVED = !bSpanish ? "The line has moved."         : "La cola se ha movido";
    NOTE_THANK_YOU_FOR_USING_SAFE_QUEUE = !bSpanish ? "Thank you for using SafeQueue!" : "¡Gracias para usar ColaSegura!";
    NOTE_WARNING = !bSpanish ? "Warning. Going too far away will drop you from the line" :
                               "¡Aviso! Ir demasiado lejos te dejará fuera de la cola"; // NEEDS TRANSLATION
    NOTE_ADDED    = !bSpanish ? "You've been added to the line!" : "¡Te han agregado a la cola!";  // NEEDS TRANSLATION
    NOTE_ADDED_AT = !bSpanish ? "You've been added to the line at" : "Te han agregado a la cola en";  // NEEDS TRANSLATION

    NOTE_CLOSE_ENOUGH = !bSpanish ? "You're now close enough to join the line!" :
                                    "¡Ahora estás lo suficientemente cerca para unirte a la cola!"  // NEEDS TRANSLATION
    NOTE_YOUR_ORDER_IS_READY = !bSpanish ? "Your order is ready!" : "¡Tu pedido esta listo!"; // NEES TRANSLATION
    NOTE_YOUR_ORDER_IS_READY_AT = !bSpanish ? "Your order is ready at" : "¡Tu pedido esta listo en"; // NEES TRANSLATION
    MSG_READY = !bSpanish ? "Ready!" : "¡Listo!";

    // Other
    MSG_CLOSED = !bSpanish ? "CLOSED" : "CERRADA";
    MSG_OPEN   = !bSpanish ? "OPEN" : "ABIERTA";
    MSG_JOINING = !bSpanish ? "Joining the line..." : "Uniéndose...";
    MSG_WAITING_FOR_PICKUP = !bSpanish ? "Waiting for pickup..." : "Esperando para recojarse...";
    MSG_CREATING_YOUR_PICKUP = !bSpanish ? "Checking in..." : "Registrándose...";
    MSG_STARTING = !bSpanish ? "Starting..." : "Iniciando...";
    MSG_REMOVING = !bSpanish ? "Removing..." : "Eliminando...";
    MSG_LEAVING = !bSpanish ? "Leaving..." : "Abandonando...";
    MSG_WAITING_TO_JOIN = !bSpanish ? "Waiting to join..." : "Esperarndo para unirse...";
    MSG_WAITING_TO_CHECKIN = !bSpanish ? "Waiting to check in..." : "Esperando para registrarse...";
    MSG_WAITING_TO_JOIN_SHORT = !bSpanish ? "Waiting to join at" : "Esperarndo para unirse en";
    MSG_WAITING_TO_CHECKIN_SHORT = !bSpanish ? "Waiting to check in at" : "Esperando para registrarse en";

    MSG_FINDING_SAFE_QUEUES = !bSpanish ? "Finding Safe Queues..." : "Buscando Colas Seguras...";
    MSG_YOU_CAN_ALSO_RECEIVE_TEXT_MESSAGES = !bSpanish ? 
        "In addition, you can also receive notifications by text:" : "También puede recibir notificaciones por mensaje de texto:";

    MSG_WAITING_TO_GET_CLOSE_ENOUGH = !bSpanish ? "Waiting to get close enough..." : "Esperando a que usted esté más cerca";
    MSG_THEN_WELL_ADD_YOU_TO_THE_LINE = !bSpanish ? "Then we'll add you to the line!" : "¡Entonces le agregaremos a la cola!";
    MSG_THEN_WELL_CHECK_YOU_IN = !bSpanish ? "Then we'll check you in!" : "¡Entonces te registraremos!";

    MSG_KEEP_THIS_PAGE_VISIBLE = !bSpanish ? "KEEP THIS PAGE VISIBLE!" : "¡MANTENGA ESTA PÁGINA VISIBLE!";
    MSG_IF_YOU_LEAVE_THIS_PAGE = !bSpanish ? "If you leave this page" : "Si abandona esta página";
    MSG_IF_YOU_WILL_NOT_BE_NOTIFIED  = !bSpanish ? "you will not be notified to come in" : "no se le notificará para entrar";
    MSG_IF_YOU_WILL_NOT_BE_NOTIFIED_TO_PICKUP = !bSpanish ? "You will not be notified to pickup" : "no se le notificará para recoger";

    MSG_IF_YOU_WILL_NOT_BE_ABLE_TO_JOIN = !bSpanish ? "you will not be able to join the line" : "no podrá unirse a la cola";
    MSG_IF_YOU_WILL_NOT_BE_ABLE_TO_CHECKIN = !bSpanish ? "You will not be able to check in" : "No podrá registrarse";
    MSG_IF_YOU_MUST_COME_BACK_FOR_UPDATES = !bSpanish ? "you must come back for updates" : "debe volver atrás para ver las actualizaciones";
    MSG_IF_COME_BACK_WHEN_YOU_GET_A_TEXT = !bSpanish ? "come back when you get a text" : "vuelva cuando reciba el mensaje de texto";
    MSG_IF_YOU_WILL_NOT_BE_ABLE_TO_JOIN_OR_GET_TEXT = !bSpanish ? 
        "you will not be able to join the line or get a text" : "no podrá unirse a la cola o recibir un mensaje de texto.";
    MSG_IF_YOU_WILL_NOT_BE_ABLE_TO_JOIN_OR_GET_TEXT_CHECKIN = !bSpanish ? 
        "you will not be able to check in or get a text" : "no podrá registrarse ni recibir un mensaje de texto";

    MSG_ARE_YOU_SURE_YOU_WANT_TO_LEAVE = !bSpanish ? "Are you sure you want to leave" : "¿Seguro que quiere abandonar";
    MSG_YES_LEAVE = !bSpanish ? "Yes, leave" : "Sí, dejarle";
    MSG_ARE_YOU_SURE_YOU_WANT_TO_STOP_WAITING = !bSpanish ? "Are you sure you want to stop waiting?" : "¿Seguro que quiere unirse?"
    MSG_YES_STOP = !bSpanish ? "Yes, stop" : "Sí, deja";

    MSG_YOU_ARENT_CLOSE_ENOUGH = !bSpanish ? "You aren't close enough to" : "No estás lo suficientemente cerca de";
    MSG_TO_JOIN_THE_LINE       = !bSpanish ? "to join the line." : "para unirse a la cola.";
    MSG_MUST_BE_WITHIN_1000FT = !bSpanish ? "You must be within 1000 feet" : "Debe estar a 300 metros.";
    MSG_MUST_BE_WITHIN        = !bSpanish ? "You must be within" : "Debe estar a";
    MSG_YOU_ARE_NO_LONGER_CLOSE_ENOUGH = !bSpanish ? "You are no longer close enough to" : "Ya no se encuentra cerca de"
    MSG_YOU_WERE_REMOVED_FROM_THE_LINE = !bSpanish ? "You were removed from line." : "Usted va a ser eliminado de la cola."
    MSG_WARNING_YOU_WILL_BE_TAKEN_OUT = !bSpanish ? "Warning! You will be taken out of line at " : "¡Aviso! Le vamos a eliminar de la cola "

    MSG_THE_APP_CAN_JOIN_FOR_YOU = !bSpanish ? 
        "The app can automatically join for you when it detects you are close enough" : "La aplicación puede unirse a la cola por ti cuando detecte que estás lo suficientemente cerca";
    MSG_THE_APP_CAN_CHECKIN_FOR_YOU = !bSpanish ? "The app can automatically check in for you when it detects you are close enough" : 
                                                  "La aplicación puede registrarse automáticamente cuando detecta que está lo suficientemente cerca";

    MSG_YOU_WILL_RECEIVE_NOTIFICATIONS = !bSpanish ? "You will receive notifications in the app." : "Recibirás notificaciones en la aplicación.";

    MSG_THE_APP_WILL_TRACK_YOUR_LOCATION = !bSpanish ? 
    "The app will track your location and join the line when you are close enough, and then notify you when it does!" :
    "La aplicación rastreará su ubicación, se unirá a la cola cuando esté lo suficientemente cerca y luego le notificará cuando lo haga.";

    MSG_THE_APP_WILL_TRACK_YOUR_LOCATION_CHECKIN = !bSpanish ? "the app will track your location and check in when you are close enough, and then notify you when it does!" :
                                "la aplicación rastreará su ubicación y se registrará cuando esté lo suficientemente cerca, ¡y luego le notificará cuando lo haga!";

    MSG_THANK_YOU = !bSpanish ? "Thank You!" : "¡Gracias!";
    MSG_THANK_YOU_FOR_USING_SAFE_QUEUE = !bSpanish ? "Thank you for using Safe Queue!" : "¡Gracias para usar Cola Segura!";
    MSG_YOU_HAVE_BEEN_REMOVED = !bSpanish ? "You have been removed by the Manager." : "Ha sido eliminado por el gerente.";

    MSG_TO_CHECK_IN_FOR_A_PICKUP = !bSpanish ? "to check in for a pick-up." : "para registrarse para una recogida.";

    TTL_PHONE_NUMBER = !bSpanish ? "Phone Number (optional)" : "número de teléfono (opcional)";

    MSG_WOULD_YOU_LIKE_TO_RECEIVE_VOICE = !bSpanish ? 
                  "Would you like to hear spoken notifications from Safe Queue?" : 
                  "¿Le gustaría escuchar notificaciones habladas de Cola Segura?";  // NEEDS TRANSLATION

    // Messages
    MSG_YOU_ARE_IN_LINE    = !bSpanish ? "You are in line." : "Usted est\xE1 en la cola";
    MSG_YOU_ARE_IN_LINE_AT = !bSpanish ? "You are in line at" : "Usted est\xE1 en la cola de";
    MSG_YOU_ARE_CHECKEDIN_AT = !bSpanish ? "You are checked in at" : "Usted está registrado en";
    MSG_YOU_MUST_ADD_A_NOTE = !bSpanish ? "You must add a note to identify your order. This could be a name or order number or something else." :
                                          "Debe agregar una nota para identificar su pedido. Puede ser un nombre, un número de pedido o algo más."

    MSG_YOUR_POSITION = !bSpanish ? "YOUR POSITION:" : "Su posición:"
    MSG_OF      = !bSpanish ? "of" : "de";
    MSG_IN_LINE = !bSpanish ? "in line" : "en la cola";


    MSG_CHECKING_IN_FOR_PICKUP = !bSpanish ? "Checking in for pickup..." : "Registrarse para recoger...";
    MSG_REGISTERING_FOR_CHECKIN = !bSpanish ? "Registering for check-in..." : "Registrarse para registrarse...";

    // notifications
    MSG_GO_IN_NOW = !bSpanish ? "Go in now!" : "¡Entre ahora!";

    MSG_SOMEONE_HAS_JOINED = !bSpanish ? "Someone has joined your Safe Queue" : "Alguien acaba de unirse a su Cola Segura";
    MSG_SOMEONE_HAS_AUTOJOINED = !bSpanish ? "Someone has auto-joined your Safe Queue" : "Alguien acaba de unirse automáticamente a su Cola Segura";
    MSG_SOMEONE_HAS_AUTOCHECKEDIN = !bSpanish ? "Someone has auto checked-in" : "Alguien se ha registrado automáticamente";
    MSG_A_PERSON_HAS_REGISTERED = !bSpanish ? "An automatic join was registered." : "Una persona se ha registrado.";
    MSG_A_PERSON_HAS_REGISTERED_CHECKIN = !bSpanish ? "An automatic checkin was registered." : "Una persona se has registrado.";
    MSG_ANOTHER_PERSON_HAS_JOINED = !bSpanish ? "Another person has joined your Safe Queue" : "Otra persona se ha registrado a su Cola Segura";
    MSG_ANOTHER_PERSON_HAS_CHECKEDIN = !bSpanish ? "Another person has checked in" : "Otra persona se ha registrado";
    MSG_YOU_WERE_NOTIFIED_AT = !bSpanish ? "You were notified at " : "Usted va a ser notificado a ";

    MSG_ADD_A_NICKNAME_OPTIONAL = !bSpanish ? "Add a note (optional)" : "Añadir una nota (opcional)";
    MSG_ADD_A_NICKNAME          = !bSpanish ? "Add a note (required)" : "Añadir una nota";

    MSG_THIS_IS_YOUR_ENTRANCE_CODE = !bSpanish ? "This is your entrance code" : "Este su código para entrar";

    MSG_SORRY = !bSpanish ? "Sorry..." : "Lo Siento..."


    MSG_YOU_CANT_JOIN_THE_LINE = !bSpanish ? "You can't join the line at" : "No puede registrarse en la cola de";
    MSG_BECAUE_THE_QUEUE_IS_CLOSED = !bSpanish ? "because the queue is closed." : "porque la cola esta cerrada.";


    MSG_SAFE_QUEUE_NEEDS_YOUR_GPS_LOCATION = !bSpanish ?
        "Safe Queue needs your GPS location to operate." : "Cola Segura necesita tu ubicación GPS para funcionar.";
    MSG_CHANGE_YOUR_BROWSER_SETTINGS = !bSpanish ?
        "Change your browser settings for this site to Allow or to Ask for use of your location." :
        "Cambie la configuración de su navegador para este sitio para permitir o para solicitar el uso de su ubicación.";
    MSG_YOUR_BROWSER_REPORTED = !bSpanish ?
        "Your browser reported: " : "Su navegador informó: ";
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


let bShowDebug = false;  // for 

let bJoinInProgress = false;
let bScannedInProgress = false;  // prevents GPS updates after we've been scanned and before the screen in cleared
let myUserID = '';
let nicknameEntered = '';
let smsEntered = '';
let item_me = {};
let positionAtLastUpdate = '0,0';
let timeAtLastUpdate = null;
let positionUpdateCount = 0;  // number of times we hit the server
let positionWatchCount = 0;   // number of times the GPS watch callback was made


let windowIsVisible = true;
let webSocket = null;
let webSocketRetries = 0;

let userWasWarned = false;  // when true, we let the user know about notification issues; prevents multiple warnings


// Used to determine if we are going away or toward a store, while we are in line
// This allows us to warn the user if he approaches the "edge" while moving away from the store
let bMovingAwayFromStore = false;
let didEdgeWarning = false;   // 
let distanceHistory = [0,0,0,0,0];  // distances to a store while in line

let gpsHistory = ["0,0","0,0","0,0","0,0","0,0"]; // raw positions from watchPostion()

// ways to register for future notification when you get close enough to a busines
const NotifyTypeNone              = 0
const NotifyTypeRegisterAndJoin   = 900;
const NotifyTypeRegisterAndPickup = 1000;

let bPlayedAutoJoinSound = false;  // prevents playing the sound multiple times
let bMapShownOnRegister = false;


// our local version of the main color
let themeMainColor;

// prevents multiple preloads - this should only be done once!
let bSafariStartupPreloaded = false;
let textStartup = '';

/*
 * Safari refuses to play sounds unless the user taps on something...
 * so, a notification sound won't automatically play, but we can play it
 * if the user taps on the notification.
 */
let soundToPlayOnNotificationTap = null;  // this is an audio object

// if we're in line, this is a customized notify message
let customNotifyMessage = '';
let customPickupMessage = '';

// keep alive timer
let timerKeepAlive = undefined;
let bSendKeepAlives = false;


class Customer extends Component {

  constructor(props) {
    super(props);

    themeMainColor = global.themeMainColor;

    // get userid
    /* NOT ANYMORE - this is now asynchronous
    getData("@SafeQueueUserID")
      .then((retdata) => {
          if(retdata == null) {
              // Create a new user id and save it
              var userid = 'web_' + Math.random().toString(36).substr(2, 9);
              //console.log("creating new userid " + userid);
              storeData("@SafeQueueUserID", userid); 
              this.setState({userID: retdata});   
               // debug  
              //alert("Created a temporary ID for your session\n"+ userid);  
              myUserID = userid;
          }
          else {
              //console.log("Using existing userID: " + retdata);
              myUserID = retdata;
              this.setState({userID: retdata});
          }  
      })
      .catch(err => {
          alert("Error, couldn't get Unique ID: " + err);
      })
    */


    this.state = {  
          sortedfilteredItems: [], 
          singleItem: [],
          index: 0, 
          deviceLocation: "0,0",
          deviceHeading:180,  // default to due North
          pullHookState: "initial",
          showQRCode: '0',
          QRCodeValue: 'davethewave',
          isSelected: '0',
          inlineWithMeItems: [],
          inlinePositionMe: 0,
          inlineMe: '',  // my item id
          bShowJoinDialog: '0',
          bShowPickupDialog: '0',
          bShowClosedDialog: '0',
          bShowCantJoinDialog: '0',
          bShowLeftDialog: '0',
          joinProps: {},
          joinNickanme: '',
          bShowLeaveDialog: '0',

          bShowEdgeWarning: '0',

          bShowJoinFutureDialog: '0',
          bShowPickupFutureDialog: '0',

          bShowCloseEnoughDialog: '0',

          bInGracePeriod: '0',

          countdown:'0',
          whenNotified:'',

          bShowNotification:'0',
          webSocketState: '!!!',
          bShowLostWebSocketHandler:'0',

          bShowErrorMessage:'0',
          bShowErrorMessageSubtitle:'',
          bShowErrorMessageError:'',

          bShowInformationMessage:'0',
          bShowInformationMessageSubtitle:'',

          bShowJoinedInformation:'0',

          bShowNav:'0',
          appBarTitle:TTL_SAFE_QUEUES,

          bShowBackdrop: '0',

          userID: '',

          debugString: '',

          bShowMap: '0',
          showMapIdx: 0,

          bWereDoneHere: '0',

          bShowBtnSelfManagedLeave: '0',
          bShowSelfManagedLeaveDialog: '0',

          bShowPossiblePickupQRCode: '1',
          itemPossiblePickup: {},
          storePossiblePickup: {},

          notifcationSoundURL: '',
          textThatDidntGetPlayed: '',

          // allow voice notifications,
          // which cleverly also plays a sound in Safari so it doesn't suppress playback in the future
          textSafariStartup: '',   // used to get the user to allow sound notifications
          bVoiceNotificationsEnabled: undefined,  // til we find otherwise

          bShowWorldMap:false,

      };

      setLanguage(global.bSpanish ? 'es' : 'en');
  }

pageVisibilityCallback = isVisible => {

    // for now do nothing
    return;  

    if(windowIsVisible && !isVisible) {
        // transition to invisibility
        alert("You are leaving the Safe Queue page, so won't receive updates. " +
              "Come back periodically to check your status");
    }
    else if(!windowIsVisible && isVisible) {
        // becoming visible again
        alert("pageVisibility going to visible")
        this.updateBusinessList("transition to visible", undefined, false);
        if(global.FCMWebToken == null) 
            this.createWebSocket();  // just to be sure
    }
    else {
        alert("pageVisibility odd case: " + isVisible);
    }

    windowIsVisible = isVisible;
}

showMapAtItem = (theItem,idx) => {
	 if(!global.bAllowMaps)
        return;

	if(this.state.bShowMap === '0') {
		global.itemMap = theItem;
		global.itemMapUserLocation = this.state.deviceLocation;
		this.setState({bShowMap:'1',showMapIdx:idx});

    // Scroll to the item's 
    setTimeout(() => {
        var theref = theItem.theRef;
        if((theref !== null) || (theref === undefined))
            theref.scrollIntoView({ behavior:"smooth"});
    }, 500);
	} 
	else {
		if(this.state.showMapIdx === idx) { 
			global.itemMap = undefined;
			global.itemMapUserLocation = undefined;
			this.setState({bShowMap:'0',showMapIdx:-1});
		}
		else {
			global.itemMap = theItem;
			global.itemMapUserLocation = this.state.deviceLocation;
			this.setState({bShowMap:'1',showMapIdx:idx});

      setTimeout(() => {
          var theref = theItem.theRef;
          if((theref !== null) || (theref === undefined))
              theref.scrollIntoView({ behavior:"smooth"});
      }, 500);
		}
	}
}

updateMapAtItem = () => {
    if(!global.bAllowMaps)
        return;

    if(this.state.bShowMap !== '1')
        return;

    if(global.itemMapUserLocation !== this.state.deviceLocation) {
        // we can get here before the map has been drawn, so make sure
        let timerIdMap = setInterval(() => {
            if((this.theMap !== undefined) && (this.theMap !== null)) {
                clearInterval(timerIdMap); 

                /* we want diretion of travel to be at the top.
                 * so we have to correct from what have as heading and what the map will display
                 * deviceHeading
                 *   0: Going North
                 * 180: Going South
                 *  90: Going East
                 * 270: Going West
                 *
                 * the map display
                 *   0: South at top
                 *  90: West at top
                 * 180: North at top
                 * 270: East at top
                 *
                 * So, when traveling East, we want east on top, and so forth...
                 *
                 *    deviceHeading    mapHeading
                 *    North:   0       180
                 *    South: 180         0
                 *    East:   90       270
                 *    West:  270        90
                 *
                 *    mapHeading = (deviceHeading + 180) % 360
                 *
                 *    
                 */
                var compensatedHeading = (this.state.deviceHeading + 180) % 360;
                if(compensatedHeading === 0)
                    compensatedHeading = 180;

                this.theMap.setState({userLocation:this.state.deviceLocation,
                                      userHeading:compensatedHeading});
                global.itemMapUserLocation = this.state.deviceLocation; 
            }
            else 
                console.log("No map yet...");
        }, 1000);
    }
}


drawMap() {
	 if(!global.bAllowMaps)
        return;

	if(this.state.bShowMap === '0')
		return;

  var height = "360px";

  var radius = 1000;  // default
  if((global.itemMap.custom !== undefined) && (global.itemMap.custom.radius !== undefined))
      radius = global.itemMap.custom.radius;

  return (
    <div ref={(ref) => this.theMapDiv = ref}>
       <DisplayMapClass ref={(ref) => this.theMap = ref}
          height={height} 
          radius={radius}
          userLocation={this.state.deviceLocation}
          userHeading={this.state.deviceHeading}
          storeLocation={global.itemMap.location}
          storeName={global.itemMap.name}/>
    </div>  
    );
}


/*
 *  Join the pickup list with the same notification as used 
 *  but not from already waiting in line 
 *  This assumes we already deleted the customer item in the database, 
 *  but we remembered it in the "Thank You" screen so we can create a new database entry with the item
 */
addToPickup = (customerItem) => {
    var max = 1000;
    var randomvar = Math.floor(Math.random() * Math.floor(max));
    var newid = '#_' + randomvar.toString().padStart(4,'0');
    var nickname = newid.substring(0,6);  
    var nickname64 = Buffer.from(nickname, 'binary').toString('base64');

    var pushToken = getAPNTokenFromContact(customerItem.contact);
    var contact = this.state.userID + '][' + pushToken;  // keep the same push token
    
    const payload = {
      ...customerItem,
        description: nickname64,
        contact: contact,
        logo:'',
        state: 'pickup',
    };

    this.setState({joinNickanme:nickname,
                   bShowBackdrop: MSG_CREATING_YOUR_PICKUP,
                   bShowJoinDialog:'0',
                   bShowMap: '0',    
                   showMapIdx: -1}); 

    addResilient(payload, payload, (item) => {
        if(item != null) {
            console.log("SUCCESS: " + payload.contact + "  state:" + payload.state);
            bScannedInProgress = false; // allow updates again
            this.updateBusinessList("after move to pickup", payload.name, true, this.addtoPickupCallback);
        }
        else {
          alert("Could not join. There was an error at the server.")
        }
    });
}

addtoPickupCallback = () => {
    var title = MSG_SOMEONE_HAS_JOINED; 
    var body  = ''; // we really don't know this value:   This is the first person in line.';
    var sound = 'beep1.wav';
    this.sendPushToStore(this.state.storePossiblePickup, global.notificationNewJoin, title, body, sound);
}


drawPossiblePickupQRCode() {
  if(this.state.bShowPossiblePickupQRCode === '0')
      return;

  if(this.state.bWereDoneHere === '0')
      return;

  if(this.isPickup(item_me))
      return;

  if(this.state.storePossiblePickup) {
      var features = this.state.storePossiblePickup.features;
      if(features === undefined)
          return;  // no pickup support

      if(features.indexOf('|P') === -1)
          return;  // no pickup support
  }

  var btnstyle = {width:"80%",marginTop:8,borderRadius:8,borderColor:'#FFFFFF', backgroundColor:themeMainColor};
  var checkinstyle = {display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:140};

  return (
    <div style={checkinstyle}>

          <Button variant='outlined' style={btnstyle} 
                onClick={(e) => { 
                    e.stopPropagation();
                    this.addToPickup(this.state.itemPossiblePickup);
                }}>
                <div style={{color:'#FFFFFF',fontSize:'175%'}}>{BTN_CHECKIN_FOR_PICKUP}</div>
           </Button>

        {false && 
          <div>
            <div>{this.state.userID}</div>
            <QRCode
               value={this.state.userID}
               size={120}
               color="black"
            />
         </div>
      }
    </div>  
    );
}

/*
 * This asks the user if he wants to hear voice notifications.
 *
 * If the user agrees, it cleverly plays a sound which prevents Safari from suppressing sound in the future
 */
drawVoiceNotificationAccept = () => {
    if(this.state.textSafariStartup === '')
        return;


    this.preloadSafariStartup();  // this gets the audio, ready to be played back

    var namestyle = {fontSize:"80%"};

    const handleOkay = () => {
        if(this.state.textSafariStartup !== '') {
            this.playSafariStartup();  // plays the just-loaded speech
        }
        this.setState({textSafariStartup:'',bVoiceNotificationsEnabled:true});  // never again!
    };

    const handleNo = () => {
        this.setState({textSafariStartup:'', bVoiceNotificationsEnabled:false});  // never again!
    };

    return (
        <div>
          <Dialog open={true}  aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{fontSize:"75%"}}>{MSG_WOULD_YOU_LIKE_TO_RECEIVE_VOICE}</DialogTitle>
            <DialogContent>
                <div style={{display: 'flex',  justifyContent:'space-around', alignItems:'center',paddingBottom:16}}>
                    <Button onClick={handleOkay} color="primary">
                      <div style={{fontSize:"150%"}}>{BTN_YES}</div>
                    </Button>  
                     <Button onClick={handleNo} color="secondary">
                        <div style={{fontSize:"150%"}}>{BTN_NO}</div>
                    </Button>                  
                </div>
            </DialogContent>
          </Dialog>
        </div>
    );
}


drawNotification() {
   if(this.state.bShowNotification === '0')
      return;

  const handleClose = (event, reason) => {
      this.setState({bShowNotification:'0'});
  };

  const handleClick = (event, reason) => {
      if(this.state.textThatDidntGetPlayed !== '') {
          var text = this.state.textThatDidntGetPlayed;
          this.playSpeech();
      }   

      if(soundToPlayOnNotificationTap != null) {
          this.playSound(soundToPlayOnNotificationTap);
      }
      this.setState({bShowNotification:'0'});
  };

  var autoHide = 6000;
  var margintop = 0;
  if(this.state.textThatDidntGetPlayed !== '') {
      autoHide = 600000;  // forever
      margintop = 16;
  }

  return (
    <div>
      <Snackbar 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={true}
        autoHideDuration={autoHide}
        //TransitionComponent=<Slide direction="up" />
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
                    style={{color:"#FFFFFF", marginTop:margintop}} onClick={() => { handleClick() }}>
                    { this.state.textThatDidntGetPlayed !== '' && 
                        <img src={btn_play_white} height="44"/>
                    }
                    { this.state.textThatDidntGetPlayed === '' &&
                        <div>OKAY</div>
                    }
                </Ons.Button>
            </React.Fragment>
          }              
      />
      </Snackbar>
    </div>
  );
}

drawLostWebSocketHandler() {
   if(this.state.bShowLostWebSocketHandler === '0')
      return;

  const handleClose = (event, reason) => {
      this.setState({bShowLostWebSocketHandler:'0'});
  };

  const handleClick = (event, reason) => {
      	this.setState({bShowLostWebSocketHandler:'0'});
      	returnToCustomer();
  };

  return (
    <div>
      <Snackbar 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={true}
        autoHideDuration={120*1000}  // will close when we re-connect
        //TransitionComponent=<Slide direction="up" />
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
                    			REFRESH
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


drawJoinDialog() {
    if(this.state.bShowJoinDialog === '0')
      return;

    var item = this.state.joinProps;

    var notePlaceHolder = MSG_ADD_A_NICKNAME_OPTIONAL;

    const handleClose = () => {
        this.setState({bShowJoinDialog:'0'});
    };

    const handleJoin = () => {
        if(this.state.userID === '') {
            alert("Sorry...\n\nWe can't put you in line because we are unable to create a temporary ID.\n" +
                  "Safe Queue may be incompatible with your browser, so please use the Safe Queue App.");
        }
        else {
            this.joinLine(NotifyTypeNone);
        }
    };

    const handleChange = (event) => {
        nicknameEntered = event.target.value;
    }

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

    var namestyle = {fontSize:"150%"};
    var btnstyle={width:"100%",marginTop:2,borderRadius:8,borderColor:'#FFFFFF', backgroundColor:themeMainColor};

    return (
      <div>
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>
            <div style={{fontSize:"120%"}}>{BTN_JOIN_SAFE_QUEUE}</div>

            <DialogContentText style={namestyle}>
                <b>{item.name}</b>  

            <div style={{marginBottom:16}}></div>

            <Button fullWidth style={btnstyle} 
                onClick={(e) => { 
                    handleJoin()
                    e.stopPropagation();
                }}>
                <div style={{color:'#FFFFFF',fontSize:'120%'}}>{BTN_JOIN}</div>
            </Button>

            </DialogContentText>
            <TextField
              margin="dense"
              variant="outlined"
              placeholder={notePlaceHolder}
              id="nickname"
              onChange={handleChange}
              fullWidth
            />


            <DialogContentText style={{fontSize:"80%",marginTop:8}}>    
            <div style={{fontSize:"120%"}}><b>{MSG_YOU_WILL_RECEIVE_NOTIFICATIONS}</b></div>  

            { global.bAllowSMSNotifications &&        
                <div>{MSG_YOU_CAN_ALSO_RECEIVE_TEXT_MESSAGES}</div>  
            }
            { global.bAllowSMSNotifications && 
                <MuiPhoneNumber defaultCountry={!global.bSpanish ? 'us' : 'es'} 
                                regions={['north-america',  'south-america', 'central-america', 'carribean','europe']}
                                margin="dense"
                                variant="outlined"
                                id="sms"
                                label={TTL_PHONE_NUMBER}
                                fullWidth
                                onChange={handleSmsChange}/>
            }
            { global.bAllowSMSNotifications && 
                <div style={{fontSize:"120%"}}><b>NOTE: You will only receive text messages when you are near the front of the line. 
                You can always see your position in line by opening this page.</b></div>   
            } 

            </DialogContentText>

           

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {BTN_CANCEL}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}


drawPickupDialog() {
    if(this.state.bShowPickupDialog === '0')
      return;

    var item = this.state.joinProps;

    var notePlaceHolder = MSG_ADD_A_NICKNAME;

    const handleClose = () => {
        this.setState({bShowPickupDialog:'0'});
    };

     const handlepickup = () => {
        if(this.state.userID === '') {
            alert("Sorry...\n\nWe can't put you in line because we are unable to create a temporary ID.\n" +
                  "Safe Queue may be incompatible with your browser, so please use the Safe Queue App.");
        }
        else {
            this.joinPickup(NotifyTypeNone);
        }
    };

    const handleChange = (event) => {
        nicknameEntered = event.target.value;
    }

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

    var namestyle = {fontSize:"150%"};
    var btnstyle={width:"100%",marginTop:2,borderRadius:8,borderColor:'#FFFFFF', backgroundColor:themeMainColor};

    return (
      <div>
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>
            <div style={{fontSize:"120%"}}>{BTN_JOIN_SAFE_QUEUE}</div>

            <DialogContentText style={namestyle}>
                <b>{item.name}</b>  

            <div style={{marginBottom:16}}></div>

            <Button style={btnstyle} 
                onClick={(e) => { 
                    handlepickup()
                    e.stopPropagation();
                }}>
                <div style={{color:'#FFFFFF',fontSize:'120%', textTransform:"none"}}>{BTN_CHECKIN}</div>
            </Button>

            </DialogContentText>
            <TextField
              margin="dense"
              variant="outlined"
              placeholder={notePlaceHolder}
              id="nickname"
              onChange={handleChange}
              fullWidth
            />


            <DialogContentText style={{fontSize:"80%",marginTop:8}}>    
            <div style={{fontSize:"120%"}}><b>{MSG_YOU_WILL_RECEIVE_NOTIFICATIONS}</b></div> 
            { global.bAllowSMSNotifications &&        
                <div>{MSG_YOU_CAN_ALSO_RECEIVE_TEXT_MESSAGES}</div>  
            }
            { global.bAllowSMSNotifications &&        
                <MuiPhoneNumber defaultCountry={!global.bSpanish ? 'us' : 'es'} 
                                regions={['north-america',  'south-america', 'central-america', 'carribean','europe']}
                                margin="dense"
                                variant="outlined"
                                id="sms"
                                label={TTL_PHONE_NUMBER}
                                fullWidth
                                onChange={handleSmsChange}/>
            }
            <div style={{fontSize:"120%"}}><b>NOTE: You will only receive text messages when you are near the front of the line. 
            You can always see your position in line by opening this page.</b></div>    
            </DialogContentText>


          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {BTN_CANCEL}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}



drawJoinFutureDialog() {
    if(this.state.bShowJoinFutureDialog === '0')
      return;

    var item = this.state.joinProps;

    var notePlaceHolder = MSG_ADD_A_NICKNAME_OPTIONAL;

    // Get the radius 
    var radius  = 1000;
    if((item.custom !== undefined) && (item.custom.radius !== undefined))
        radius = item.custom.radius;   // in feet
    var radiusM = ((radius * 304.8)/1000).toFixed(0);

    if((item.units !== undefined) && (item.units === 'm')) {
        var m = global.bSpanish ? 'metros' : 'meters';
        MSG_MUST_BE_WITHIN_1000FT  = MSG_MUST_BE_WITHIN + " " + radiusM + " " + m;
    }
    else {
        var f = global.bSpanish ? 'pies' : 'feet';  // NEEDS TRANSLATION
        MSG_MUST_BE_WITHIN_1000FT  = MSG_MUST_BE_WITHIN + " " + radius + " " + f ;
    }


    const handleClose = () => {
        this.setState({bShowJoinFutureDialog:'0'});
    };

    const handleChange = (event) => {
        nicknameEntered = event.target.value;
    }

    const handleRegisterAndJoin = () => {
        var nickname = nicknameEntered;
        if(nicknameEntered === '') 
            nickname = global.userID.substring(0,8); 

        // Need to ask the user for voice notification
        bSafariStartupPreloaded = false; // need to reload 
        this.setState({bShowJoinFutureDialog:'0',joinNickanme:nickname});
        this.joinLine(NotifyTypeRegisterAndJoin);
        bPlayedAutoJoinSound = false;
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

    // Seems dialogs on Android are a little skinnier, so make the text a little smaller
    var namestyle = {fontSize:"150%"};
    var btnstyle={width:"100%",marginTop:8,borderRadius:8,borderColor:'#000000', backgroundColor:themeMainColor};

    return (
      <div>
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>

                <DialogContentText style={namestyle}>
                    <div style={{fontSize:"80%"}}>{MSG_YOU_ARENT_CLOSE_ENOUGH}:</div>
                    <b>{item.name}</b>  
                    <div style={{fontSize:"80%"}}>{MSG_TO_JOIN_THE_LINE}</div>
                    <div style={{fontSize:"70%",marginTop:6}}>{MSG_MUST_BE_WITHIN_1000FT}</div>
                </DialogContentText>

                <div style={{marginBottom:16}}></div>

                <div style={{marginTop:8}}><b>{MSG_THE_APP_CAN_JOIN_FOR_YOU}<sup><span style={{fontSize:"120%"}}>*</span></sup></b></div>      

                <Button fullWidth style={btnstyle} 
                    onClick={(e) => { 
                        handleRegisterAndJoin()
                        e.stopPropagation();
                    }}>
                    <div style={{color:'#FFFFFF',fontSize:'120%'}}>{BTN_JOIN_AUTOMATICALLY}</div>
                </Button>
              

                <DialogContentText style={{fontSize:"80%",marginTop:12}}>
                    <TextField
                    margin="dense"
                    variant="outlined"
                    placeholder={notePlaceHolder}
                    id="nickname"
                    fullWidth
                    onChange={handleChange}
                />

                <div style={{fontSize:"120%",marginTop:12}}><b>{MSG_YOU_WILL_RECEIVE_NOTIFICATIONS}</b></div>            
                <div>{MSG_YOU_CAN_ALSO_RECEIVE_TEXT_MESSAGES}</div>
                <MuiPhoneNumber defaultCountry={!global.bSpanish ? 'us' : 'es'} 
                            regions={['north-america',  'south-america', 'central-america', 'carribean', 'europe']}
                            margin="dense"
                            variant="outlined"
                            id="sms"
                            label={TTL_PHONE_NUMBER}
                            fullWidth
                            onChange={handleSmsChange}/>
                 <div style={{fontSize:"120%"}}><b>NOTE: You will only receive text messages when you are near the front of the line. 
                    You can always see your position in line by opening this page.</b></div>    

                <div style={{fontSize:"100%", marginTop:16}}><sup><span style={{fontSize:"200%"}}>*</span></sup>{MSG_THE_APP_WILL_TRACK_YOUR_LOCATION}</div>

                <div style={{marginBottom:8}}></div>
            
                 <div style={{marginBottom:16}}></div>

              </DialogContentText>
              
          </DialogContent>
          <DialogActions>
             <Button onClick={handleClose} color="primary">
              {BTN_CANCEL}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}


drawPickupFutureDialog() {
    if(this.state.bShowPickupFutureDialog === '0')
      return;

    var item = this.state.joinProps;

    var notePlaceHolder = MSG_ADD_A_NICKNAME;

    // Get the radius 
    var radius  = 1000;
    if((item.custom !== undefined) && (item.custom.radius !== undefined))
        radius = item.custom.radius;   // in feet
    var radiusM = ((radius * 304.8)/1000).toFixed(0);

    if((item.units !== undefined) && (item.units === 'm')) {
        var m = global.bSpanish ? 'metros' : 'meters';
        MSG_MUST_BE_WITHIN_1000FT  = MSG_MUST_BE_WITHIN + " " + radiusM + " " + m;
    }
    else {
        var f = global.bSpanish ? 'pies' : 'feet';  // NEEDS TRANSLATION
        MSG_MUST_BE_WITHIN_1000FT  = MSG_MUST_BE_WITHIN + " " + radius + " " + f ;
    }


    const handleClose = () => {
        this.setState({bShowPickupFutureDialog:'0'});
    };

    const handleChange = (event) => {
        nicknameEntered = event.target.value;
    }

    const handleRegisterAndPickup = () => {
        var nickname = nicknameEntered;
        if(nicknameEntered === '') 
            nickname = global.userID.substring(0,8); 

        // Need to ask the user for voice notification
        bSafariStartupPreloaded = false; // need to reload 
        if(this.joinPickup(NotifyTypeRegisterAndPickup))
            this.setState({bShowPickupFutureDialog:'0',joinNickanme:nickname});
        bPlayedAutoJoinSound = false;
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

    // Seems dialogs on Android are a little skinnier, so make the text a little smaller
    var namestyle = {fontSize:"150%"};
    var btnstyle={width:"100%",marginTop:8,borderRadius:8,borderColor:'#000000', backgroundColor:themeMainColor};

    return (
      <div>
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>

                <DialogContentText style={namestyle}>
                    <div style={{fontSize:"80%"}}>{MSG_YOU_ARENT_CLOSE_ENOUGH}:</div>
                    <b>{item.name}</b>  
                    <div style={{fontSize:"80%"}}>{MSG_TO_CHECK_IN_FOR_A_PICKUP}</div>
                    <div style={{fontSize:"70%",marginTop:6}}>{MSG_MUST_BE_WITHIN_1000FT}</div>
                </DialogContentText>

                <div style={{marginBottom:16}}></div>

                <div style={{marginTop:8}}><b>{MSG_THE_APP_CAN_CHECKIN_FOR_YOU}
                                            <sup><span style={{fontSize:"120%"}}>*</span></sup></b></div>      

                <Button style={btnstyle} 
                    onClick={(e) => { 
                        handleRegisterAndPickup()
                        e.stopPropagation();
                    }}>
                    <div style={{color:'#FFFFFF',fontSize:'120%'}}>{BTN_CHECK_IN_AUTOMATICALLY}</div>
                </Button>
              

                <DialogContentText style={{fontSize:"80%",marginTop:12}}>
                    <TextField
                    margin="dense"
                    variant="outlined"
                    placeholder={MSG_ADD_A_NICKNAME}
                    id="nickname"
                    fullWidth
                    onChange={handleChange}
                />

                <div style={{fontSize:"120%",marginTop:12}}><b>{MSG_YOU_WILL_RECEIVE_NOTIFICATIONS}</b></div>            
                <div>{MSG_YOU_CAN_ALSO_RECEIVE_TEXT_MESSAGES}</div>
                <MuiPhoneNumber defaultCountry={!global.bSpanish ? 'us' : 'es'} 
                            regions={['north-america',  'south-america', 'central-america', 'carribean', 'europe']}
                            margin="dense"
                            variant="outlined"
                            id="sms"
                            label={TTL_PHONE_NUMBER}
                            fullWidth
                            onChange={handleSmsChange}/>

                <div style={{fontSize:"120%"}}><b>NOTE: You will only receive text messages when you are near the front of the line. 
                            You can always see your position in line by opening this page.</b></div>    

                <div style={{fontSize:"100%", marginTop:16}}><sup><span style={{fontSize:"200%"}}>*</span></sup>
                        {MSG_THE_APP_WILL_TRACK_YOUR_LOCATION_CHECKIN}</div>

                <div style={{marginBottom:8}}></div>

              </DialogContentText>
              
          </DialogContent>
          <DialogActions>
             <Button onClick={handleClose} color="primary">
              {BTN_CANCEL}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}


drawCantJoinDialog() {
    if(this.state.bShowCantJoinDialog === '0')
      return;

    var item = this.state.joinProps;

    const handleClose = () => {
        this.setState({bShowCantJoinDialog:'0'});
    };

    const handleNotify = () => {
        this.setState({bShowCantJoinDialog:'0',
                       bShowJoinFutureDialog:'1'});
    };

    var namestyle = {fontSize:"150%"};

    var btnstyle={width:"98%",marginTop:24,borderRadius:8,borderColor:'#000000', backgroundColor:themeMainColor};

    // Get the radius 
    var radius  = 1000;
    if((item.custom !== undefined) && (item.custom.radius !== undefined))
        radius = item.custom.radius;   // in feet
    var radiusM = ((radius * 304.8)/1000).toFixed(0);

    if((item.units !== undefined) && (item.units === 'm')) {
        var m = global.bSpanish ? 'metros' : 'meters';
        MSG_MUST_BE_WITHIN_1000FT  = MSG_MUST_BE_WITHIN + " " + radiusM + " " + m;
    }
    else {
        var f = global.bSpanish ? 'pies' : 'feet';  // NEEDS TRANSLATION
        MSG_MUST_BE_WITHIN_1000FT  = MSG_MUST_BE_WITHIN + " " + radius + " " + f ;
    }

    return (
      <div>
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>
            <DialogContentText>
                {MSG_YOU_ARENT_CLOSE_ENOUGH}<br />
                <div style={namestyle}><b>{item.name}</b></div>
                {MSG_TO_JOIN_THE_LINE}<br />{MSG_MUST_BE_WITHIN_1000FT}<br /> 
                <br /><b>{MSG_THE_APP_CAN_JOIN_FOR_YOU}</b>               
                <Button style={btnstyle} onClick={handleNotify} > 
                    <div style={{color:'#FFFFFF',fontSize:'100%',padding:2}}>HHHH {BTN_JOIN_AUTOMATICALLY}</div>
                </Button>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {BTN_CANCEL}
            </Button>  
          </DialogActions>
        </Dialog>
      </div>
    );
}

drawClosedDialog() {
    if(this.state.bShowClosedDialog === '0')
      return;

    var item = this.state.joinProps;

    const handleClose = () => {
        this.setState({bShowClosedDialog:'0'});
    };

    var namestyle = {fontSize:"150%"};

    return (
      <div>
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>
            <DialogContentText>
                {MSG_YOU_CANT_JOIN_THE_LINE}
                <div style={namestyle}><b>{item.name}</b></div>
                {MSG_BECAUE_THE_QUEUE_IS_CLOSED}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

drawLeftDialog() {
    if(this.state.bShowLeftDialog === '0')
      return;

    var item = this.state.joinProps;

    const handleClose = () => {
        this.setState({bShowLeftDialog:'0'});
    };

    var namestyle = {fontSize:"150%"};

    /* FOR TEST
    var distance;
    var distInFeet = this.distanceBetweenPointsInFeet(this.state.deviceLocation, item.location);
    if((item.units !== undefined) && (item.units === 'm')) {
        var distInM = distInFeet / 3.28084;
        distance = distInM.toFixed(0) + " m";
    }
    else
        distance = distInFeet.toFixed(0) + " ft";
    */

    return (
      <div>
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{MSG_SORRY}</DialogTitle>
          <DialogContent>
            <DialogContentText>
                {MSG_YOU_ARE_NO_LONGER_CLOSE_ENOUGH}
                <div style={namestyle}><b>{item.name}</b></div>
                {MSG_YOU_WERE_REMOVED_FROM_THE_LINE}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}



// Edge support
// Uses the gpsHistory to smooth out the direction
// Should only be called when waiting in line
movingAwayFromStore = () => {
    var store = this.state.singleItem[0];
    if(store == undefined)
        return true;   // though there is no good answer

    // In gpsHistory, index length-1 is the latest sample
    //
    // We'll use a N point filter
    // current distance is sum(n-1,n-2,n-3,...)/n
    // last    distance is sum(n-2,n-3,n-4,...)/n
    //
    // if current > last, then we're moving away


    // get all the distances (could optimize this out later)
    var n = gpsHistory.length;
    for(var i=0; i<n; i++) {
        distanceHistory[i] = this.distanceBetweenPointsInFeet(gpsHistory[i], store.location);
    }
    //this.dumpdistancehistory();

    // Tried several filter lengths from 1 to 3 and all have idiosyncracies !!!
    // Longer filters seemed to miss large swing in distance and shorter filter miss smaller swings.
    // We'll err on getting to many notifications, and filter them for the user in another way
    //
    // THIS IS BECAUSE THIS ISN'T REALLY A TIME-SPACE FILTER, IT IS JUST A SPACE FILTER!!!
    // TODO: create time-space filter by
    //       - add timestamp to each location, then the filter can act in the time domain
    //       this should eliminate most idiosyncracies (or so I think)

    var fl = 1;  // filter length

    var sumCurrent = 0;
    for(var i=1; i<(fl+1); i++) {
        var idx = n - i;
        sumCurrent += distanceHistory[idx];
    }
    sumCurrent /= fl;

    var sumLast = 0;
    for(var i=2; i<(fl+2); i++) {
        var idx = n - i;
        sumLast += distanceHistory[idx];
    }
    sumLast /= fl;    

    //console.log("SUM CURR: " + sumCurrent + "  LAST:" + sumLast); 

    if(sumCurrent > sumLast)
        return true;   // moving away
    else
        return false; // not moving away
}

drawEdgeWarning() {
    if(this.state.bShowEdgeWarning === '0')
      return;

    var item = this.state.joinProps;

    const handleClose = () => {
        this.setState({bShowEdgeWarning:'0'});
    };

    var namestyle = {fontSize:"150%"};

    var max = '1000 feet';
    if((item.units !== undefined) && (item.units !== 'ft'))
        max = '300 m';
    if(global.bSpanish)
        max = '300 m';

    const handleClick = (event, reason) => {
        if(soundToPlayOnNotificationTap != null) {
            this.playSound(soundToPlayOnNotificationTap);
        }
        this.setState({bShowEdgeWarning:'0'});
    };

    return (
        <div>
          <Snackbar 
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={true}
              autoHideDuration={5*60*1000}  // 5 minutes
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
              message={this.state.bShowEdgeWarning}
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

drawLeaveDialog() {
    if(this.state.bShowLeaveDialog === '0')
      return;

    var item = this.state.joinProps;

    const handleClose = () => {
        this.setState({bShowLeaveDialog:'0'});
    };

    const handleLeave = () => {
        this.leaveLine(this.state.inlineMe, item);
    };

    var namestyle = {fontSize:"150%"};

    var bRegistered = false;
    if((item_me.state === 'registerjoin') || (item_me.state === 'registerpickup'))
        bRegistered = true;

    var title = MSG_ARE_YOU_SURE_YOU_WANT_TO_LEAVE + ":";
    var button = MSG_YES_LEAVE;
    if(bRegistered) {
        title = MSG_ARE_YOU_SURE_YOU_WANT_TO_STOP_WAITING;
        button = MSG_YES_STOP;
    }

    var btnstyle = {marginTop:8,borderRadius:8,borderColor:'#000000', backgroundColor:themeMainColor};

    return (
      <div>
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>
            <div style={{fontSize:'120%', marginBottom:8}}>{title}</div>
            <DialogContentText>
                <div style={namestyle}><b>{item.name}</b></div>  
                { bRegistered && false &&  
                  <div style={{fontSize:'80%'}}>Tap on REMOVE and you won't receive notifications.</div>  
                }    
            </DialogContentText>

             <Button style={btnstyle} onClick={handleLeave}>
                <div style={{color:'#FFFFFF',fontSize:'90%'}}>{button}</div>
            </Button>
           
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {BTN_CANCEL}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}


drawSelfManagedLeaveDialog() {
    if(this.state.bShowSelfManagedLeaveDialog === '0')
      return;

    var item = this.state.joinProps;

    const handleClose = () => {
        this.setState({bShowSelfManagedLeaveDialog:'0'});
    };

    const handleSelfManagedLeave = () => {
        this.selfManagedLeaveLine(this.state.inlineMe, item);
    };

    var namestyle = {fontSize:"150%"};

    var title = MSG_ARE_YOU_SURE_YOU_WANT_TO_LEAVE + ":";
    var button = MSG_YES_LEAVE;

    var btnstyle = {marginTop:8,borderRadius:8,borderColor:'#000000', backgroundColor:themeMainColor};

    return (
      <div>
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>
            <div style={{fontSize:'120%', marginBottom:8}}>{title}</div>
            <DialogContentText>
                <div style={namestyle}><b>{item.name}</b></div>  
            </DialogContentText>

             <Button style={btnstyle} onClick={handleSelfManagedLeave}>
                <div style={{color:'#FFFFFF',fontSize:'90%'}}>{button}</div>
            </Button>
           
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {BTN_CANCEL}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

// This notifies a registered user that he is now close enough to join a line
drawCloseEnoughDialog() {
    if(this.state.bShowCloseEnoughDialog === '0')
      return;

    var item = this.state.joinProps;

    const handleClose = () => {
        this.setState({bShowCloseEnoughDialog:'0'});
    };

    var namestyle = {fontSize:"150%"};

    const handleClick = (event, reason) => {
        this.setState({bShowCloseEnoughDialog:'0'});
    };

    return (
        <div>
          <Snackbar 
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={true}
              autoHideDuration={30*1000}  
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
              message={this.state.bShowCloseEnoughDialog}
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

drawJoinedInformation= () => {
    if(this.state.bShowJoinedInformation === '0')
        return;

    const handleCancel = () => {
        this.setState({bShowJoinedInformation:'0'});
    };

    var token = getAPNTokenFromContact(item_me.contact);

    var title;
    var line1;
    var line2;
    var line3;

    // determine if we're setup for SMS 
    if((item_me.state === 'registerjoin') || (item_me.state === 'registerpickup')) {
        if(token.substring(0,4) === 'sms_') {
            line1 = "You will receive text message notifications only when you are near the front of the line.";
            line2 = "And while this page is visible, it will update with your position.";
            line3 = "If you leave this page, reload it when you get a text.";
        }
        else {
            line1 = "As you get closer, your display will update with your position.";
            line2 = "However, this page must remain visible.";
            line3 = "So, If you leave this page, you must periodically come back to see updates.";
        }
        title = "We'll add you to the line when we can."
    }
    else {
        if(token.substring(0,4) === 'sms_') {
            line1 = "You will receive text message notifications only when you are near the front of the line.";
            line2 = "And while this page is visible, it will update with your position.";
            line3 = "If you leave this page, reload it when you get a text.";
        }
        else {
            line1 = "As the line changes, your display will update.";
            line2 = "However, this page must remain visible.";
            line3 = "So, If you leave this page, you must periodically come back to see updates.";
        }
        title = this.state.bShowJoinedInformation;
    }

    return (
        <div>
            <Dialog open={true} onClose={handleCancel} aria-labelledby="form-dialog-title">
              <DialogContent>
                  <div style={{fontSize:"90%", marginTop:4}}>{title}</div>
                  <div style={{fontSize:"75%",marginTop:8}}>{line1}</div>
                  <div style={{fontSize:"75%"}}>{line2}</div>
                  <br />
                  <div style={{fontSize:"75%"}}>{line3}</div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancel} color="primary">
                  Okay
                </Button>
              </DialogActions>
            </Dialog>
        </div>
    );
}

drawBackdrop = () => {
  if(this.state.bShowBackdrop === '0')
      return;

    var namestyle = {fontSize:"80%"};

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
        returnToCustomer();
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
displayErrorMessage = (title, subtitle, error) => {
   this.setState({bShowErrorMessage:title, bShowErrorMessageSubtitle:subtitle, bShowErrorMessageError:error});
}


drawInformationMessage = () => {
  if(this.state.bShowInformationMessage === '0')
      return;

    var namestyle = {fontSize:"80%"};

    const handleOkay = () => {
        this.setState({bShowInformationMessage:'0'});
    };

    return (
        <div>
            <Dialog open={true}  aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title" style={{fontSize:"75%"}}>{this.state.bShowInformationMessage}</DialogTitle>
              <DialogContent>
                    <div>{this.state.bShowInformationMessageSubtitle}</div>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',paddingBottom:16,marginTop:16}}>
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
displayInformationMessage = (title, subtitle) => {
   this.setState({bShowInformationMessage:title, bShowInformationMessageSubtitle:subtitle});
}


socketState = (input) => {
    if(input === 0) return "CONNECTING";
    if(input === 1) return "OPEN";
    if(input === 2) return "CLOSING";
    if(input === 3) return "CLOSED";

}

 /*
  * We use a websocket for notifications
  *
  * If we get disconnected, its puts up notificaitn ands tries to re-connect
  */
createWebSocket = () => {
    //console.log("Creating Web Socket for Customer at " + global.wsurl);
     // close any previous websocket, if possible
    if(webSocket !== null) {
        console.log("Closing previous Web Socket")
        webSocket.close();
    }

    webSocket = new WebSocket(global.wsurl);  

    webSocket.onopen = () => {
        //console.log("Web Socket Opened at " + global.wsurl);
        if(myUserID !== '') {
        	if (webSocket.readyState === 0) 
     		   console.log("Waiting for webSocket - customer");
     		else
            	webSocket.send("register::" + myUserID);
        }
        else 
            ; // well, I don't know what else - we need to try again later

        // close the warning dialog
        webSocketRetries = 0;  // reset 
        //console.log(">>>>>>> ***  " + this.socketState(webSocket.readyState));
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
        console.log("Web Socket Error:" + errstr + "  " + error.code);
    };
    webSocket.onclose = (event) => {
        // We get onclose calls for stale websockets since our webSocket is a singleton (!@#$)
        if((webSocket.readyState === 2) || (webSocket.readyState === 3)) {  
            // CLOSED or CLOSING
            //console.log(">>>>>>> !!! " + this.socketState(webSocket.readyState));
            this.setState({webSocketState:'!!!'});
            if(event.code === 1000){
                alert("Web Socket Closed normally");
            }
            else if(event.code === 1006) {
                //console.log("Web Socket disconnected. Re-connecting...");

                if(navigator.onLine) {
                    // we're online, so let's re-connect immediately
                    //console.log("Web Socket re-connect since w're online");
                    webSocketRetries++;
                    this.createWebSocket();   // should work
                }
                else {
                    // We're offline, so let's retry every 5 seconds (though we will get an event it seems)
                    // console.log("Web Socket not on line, so will try again in 5 seconds")
                    setTimeout(() => {
                        // we may have connected while this timer is running, so 
                        if((webSocket.readyState !== 0) && (webSocket.readyState !== 1)) {  
                            this.setState({"bShowLostWebSocketHandler": "Lost Internet Connection!"});
                            webSocketRetries++;
                            this.createWebSocket();  // oddly recursive
                        }
                        else {
                            // DEBUG console.log("Web Socket slow retry found sockect is ready!")
                        }
                    }, 5000);
                }
            }
            else {
                //console.log("Web Socket Closed with error:" + event.code);
            }
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

// Legacy - the push notification sends a sound filename, but we want text for text-to-speech
textFromSound = (name) => {
    if(name === 'next.wav')        return NOTE_YOU_ARE_NEXT;
    else if(name === 'second.wav') return NOTE_YOU_ARE_SECOND;
    else if(name === 'third.wav')  return NOTE_YOU_ARE_THIRD;
    else if(name === 'fourth.wav') return NOTE_YOU_ARE_FOURTH;
    else if(name === 'goin.wav')   return NOTE_GO_IN_NOW;
    else if(name === 'warning.wav') return NOTE_WARNING;
    else if(name === 'added.wav')  return NOTE_ADDED;
    else if(name === 'closeenough.wav') return NOTE_CLOSE_ENOUGH;
    else return NOTE_LINE_HAS_MOVED;
}

playSpeech = (text) => {

    console.log("playSpeech: " + text)

    if(!this.state.bVoiceNotificationsEnabled)
        return;

    const audioCallback = (type, error) => {
        if(type === 'finishgen') {
            console.log("finishgen")
        }
        else if(type === 'audioend') {
        }
        else if(type === 'networkerror') {
            console.log("There was a network error. Try Again");
        }
        else if(type === 'audioerror') {
            var title = "Audio Playback Not Allowed";
            var subtitle = "Check the audio playback and auto-play settings for this site in your browser.";
            error = "\"" + error + "\"";
            this.displayErrorMessage(title, subtitle, error);
        }
        else if(type === 'audiostart') {
            //console.log("audiostart")
        }
        else if(type === 'didntplay') {
            console.log("Didn't play - setting didntplaytext to :" + text)
            this.setState({textThatDidntGetPlayed:text}); // will be played if user taps on it
        }
        else if(type === 'audiofile') {
            var url = error;
            this.setState({notifcationSoundURL:url})
            var player = document.getElementById("customerplayer"); 

            if(player !== undefined) {
                // success
                player.onended = function() { audioCallback('audioend'); }
                player.onplay = function() { audioCallback('audiostart'); }
                player.onerror = function() { alert("ERROR")}
                
                var audioPromise = player.play();
                audioPromise.then(function() {
                    // success

                }).catch(function (err) {
                    // failed
                    //console.log("catch:" + JSON.stringify(err))
                    //console.log("catch message:" + err.message)
                    audioCallback('didntplay')
                    //this.setState({textThatDidntGetPlayed:text}); // will be played if user taps on it
                    // audioCallback('audioerror', err.message);
                });
            }
            else {
                // failed
                //console.log("catch:" + JSON.stringify(err))
                //console.log("catch message:" + err.message)
                audioCallback('audioerror', "INTERNAL ERROR: No audio object to play audio!");
            }         
        }
    }

    if((text === undefined) && (this.state.textSafariStartup !== '')) {
        // play the text that didn't get played
        if(this.state.textThatDidntGetPlayed !== '') {
            // the player should be ready

            console.log("playing textthatdidn't get played: " + this.state.textThatDidntGetPlayed)
            var player = document.getElementById("customerplayer");
            if(player !== undefined) {
                // success
                player.onended = function() { audioCallback('audioend'); }
                player.onplay = function() { audioCallback('audiostart'); }
                player.onerror = function() { alert("ERROR")}
                
                var audioPromise = player.play();
                audioPromise.then(function() {
                    // success
                }).catch(function (err) {
                    // failed, forget about it
                    alert("FAILED TO PLAY: " + err.message)
                });
            }  
            this.setState({textThatDidntGetPlayed: ''});  // just take one shot at playing! 
        }
    }
    else {
        playSpeechFromText(text, audioCallback, true);  // get the file
    }
}

preloadSafariStartup = () => {
    if(bSafariStartupPreloaded)
        return;

    bSafariStartupPreloaded = true;

    //console.log("preload Startup")
    const audioCallback = (type, error) => {
        if(type === 'finishgen') {
            console.log("finishgen")
        }
        else if(type === 'networkerror') {
            console.log("there was a network error in preload.");
            //playSpeechFromText(this.state.textSafariStartup, audioCallback, true);  // get the file
        }
        else if(type === 'audiofile') {
            var url = error;
            this.setState({notifcationSoundURL:url});

            /*TEST SLOW LOAD
             setTimeout(() => { 
                console.log("setting URL")
                this.setState({notifcationSoundURL:url});
            }, 3000);
            */
        }
    }

    // This gets the file only - it doens't try to play
    playSpeechFromText(this.state.textSafariStartup, audioCallback, true);  // get the file
}

playSafariStartup = () => {
    if(this.state.textSafariStartup !== '') {
        // play the text that didn't get played
        console.log("playing Startup: " + this.state.textSafariStartup)
        var player = document.getElementById("customerplayer"); 
        if(player !== undefined) {
            // try to play the speech assuming it was loaded fast enough
            var audioPromise = player.play();
            audioPromise.then(function() {
                  // success
            }).catch(function (err) {
                // failed, probably haven't loaded the speech yet
                // Spin for a while to give it a chance
                // This could also be just a slow (or fast) redraw of the screen
                let retryCount = 0;
                let timerId = setInterval(() => {
                    console.log("[" + retryCount + "} player.src = " + player.src)
                    if(player.src !== '') {
                        var audioPromise = player.play();
                        audioPromise.then(function() {
                            // success
                            clearInterval(timerId); 
                        }).catch(function (err) {
                            // failed, only try another 3 times
                            retryCount++;
                            if(retryCount >= 6) {
                                clearInterval(timerId);
                                console.log("giving up playing - took too long")
                            }
                        });
                    }
                }, 500);            
            });
        }

        this.setState({textSafariStartup: ''});  // just take one shot at playing! 
    }
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

    // play the sound, but first get the screen update going
    var sound = 'silent.wav';
    if (note.android) 
        sound = note.android.notification.sound;
    else if (note.data.websound) 
        sound = note.data.websound;

    if (true) { // why was this there? note.foreground) {
        let data  = JSON.parse(note.data.payload);
        let type  = data.type;
        let title = note.notification.title;
        let body  = note.notification.body;
        let notifyUserID = data.userid;

        if(type === global.notificationYouAreNext)
        {
            // This is notification for me, so alert myself !!!
            // worked in web-to-web:  var notifyUserID = data.userid;
            //var notifyNickname = data.nickname;

            // sanity check
            if(notifyUserID !== myUserID) {
                console.log("INTERNAL ERROR", "Received notification for wrong user" +
                  "with different ID than me.\n\nGot:\n" + notifyUserID + "\n\nExpected:\n" + this.state.userID);
            }

            var appTitle = MSG_YOU_ARE_IN_LINE;
            var goinTitle = MSG_GO_IN_NOW;
            var notifyMessage; 

            // this could be a pickup 
            if(this.isPickup(item_me)) {
                appTitle = NOTE_YOUR_ORDER_IS_READY;
                goinTitle = MSG_READY;
                if(customPickupMessage !== '')
                    notifyMessage = customPickupMessage;
                else  
                    notifyMessage = NOTE_YOUR_ORDER_IS_READY;
            }
            else {
                // check for custom notification message
                if(customNotifyMessage !== '') 
                    notifyMessage = customNotifyMessage;
                else {
                    notifyMessage = MSG_GO_IN_NOW;
                    if(!global.bSpanish) 
                        notifyMessage = "Go in, now!";   // adding the comma make TTS sound better
                }
            }

            setTimeout(() => { 
              this.playSpeech(NOTE_THIS_IS_SAFE_QUEUE + " " + notifyMessage)
            }, 500);

            // use time now
            let time = moment(Date.now()).format('hh:mm A')
            this.setState({isSelected:'1', 
                           showQRCode:'1',
                           bShowNotification:notifyMessage,
                           whenNotified: MSG_YOU_WERE_NOTIFIED_AT + time,
                           appBarTitle: appTitle,
                           countdown: goinTitle});
        }
        else if(type === global.notificationScanned)
        {
            // If this was a pickup, we need to prevent a browser refresh from joining the
            // pickup list again.  We'll save it away 

            // If we've been scanned, stop updating on GPS changes.
            // GPS Updates seems to adjust the screen unexpectedly, particularly in the lag between
            // setting state variables and seeing them realized on the screen
            bScannedInProgress = true;

            if(this.isPickup(item_me)) {
                console.log("Saving " + item_me.description + " to localStorage");
                window.localStorage.setItem('@SafeQueuePickupComplete', item_me.description);
            }

            var showUserQRCode = '0';
            var itemToRemember = item_me;
            var storeToRemember = this.state.singleItem[0];
            storeToRemember.theRef = undefined;
            if(global.bAllowPickup && (itemToRemember !== undefined) && (storeToRemember !== undefined)) {
                showUserQRCode = '1';
            }

            // We were just scanned so clear everything !!
            // If this queue supports pickup, then put up the QR Code for continuation
            this.clearInLine();
            this.setState({sortedfilteredItems:[], singleItem:[], bWereDoneHere: '1',
                           bShowPossiblePickupQRCode: showUserQRCode,
                           itemPossiblePickup: itemToRemember,
                           storePossiblePickup: storeToRemember,
                           appBarTitle:MSG_THANK_YOU,
                           bShowNotification:'0'});  // don't like this anymore: MSG_THANK_YOU_FOR_USING_SAFE_QUEUE});
            //navigation.navigate('    ');  // Home screen has hidden name label

            setTimeout(() => { this.playSpeech(NOTE_THANK_YOU_FOR_USING_SAFE_QUEUE)}, 500);
        }
        else if(type === global.notificationMoveUp)
        {
            // This means a user went into a store, so we all move up
            // I won't get this if I was scanned
            var talk = this.textFromSound(sound);
            this.setState({bShowNotification:title + " " + talk});
            var name = this.state.singleItem[0].name;  // the queue we are in now
            this.updateBusinessList("Updating, the line has moved up...", name, true);
            setTimeout(() => { this.setState({bShowNotification:'0'})}, 8000);

            // only talk when fourth in line or closer
            if((talk === NOTE_YOU_ARE_NEXT)  || (talk === NOTE_YOU_ARE_SECOND) ||
               (talk === NOTE_YOU_ARE_THIRD) || (talk === NOTE_YOU_ARE_FOURTH)) {
                setTimeout(() => { this.playSpeech(NOTE_THIS_IS_SAFE_QUEUE + " " + this.textFromSound(sound))}, 500);
            }
        }
        else if(type === global.notificationRemoved) {
            // the Manager removed me, so remove everything
            this.clearInLine();
            this.setState({sortedfilteredItems:[], singleItem:[], bWereDoneHere: '1',
                           bShowPossiblePickupQRCode: '0',
                           appBarTitle:MSG_THANK_YOU,
                           bShowNotification:MSG_YOU_HAVE_BEEN_REMOVED}); 
        }
        else if((type === global.notificationPong) ||
                (type === global.notificationNewJoin) || 
                (type === global.notificationNewLeave)) {
            // We'll ignore notifications for a store, in case the save device is a store and customer,
            // which happends in debugging all the time
            //console.log("Ignoring a PONG:\n\n" + title + "\n" + body + "\n" + notifyUserID + "\n");
        }
        else {
            console.log("Got unknown notification type:" + type + "\n\n" + title + "\n" + body + "\n" + notifyUserID + "\n");
        }
    }
}

beforeunload(e) {
    console.log("beforeunload");

    return;

    if (true) {
      e.preventDefault();
      e.returnValue = true;
    }
    return "This is my message";
}

handleLostFocus = () => {
    console.log("losing focus");
    //alert("You are leaving Safe Queue, so you will no longer be getting updates to the line." + 
    //      " You are still in line, but you must come back to this page to see updates");
}


firstLoadComplete = () => {
    //console.log("firstLoadComplete called")
    this.setState({bShowWorldMap:true})
}

handleConnectionChange = () => {
    console.log("handleConnectionChnage: " + navigator.onLine)
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
        webSocketRetries = 0;
        this.createWebSocket();
    }
    else {
        webSocketRetries = 0;
        this.createWebSocket();
    }
}

componentDidMount() {
    //window.addEventListener('beforeunload', this.beforeunload);
	//window.addEventListener('blur', this.handleLostFocus);
	//window.addEventListener('focus', this.handleFocus);

    if ("geolocation" in navigator) {
        // Start by getting our current position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var posstr = position.coords.latitude + "," + position.coords.longitude;
                //console.log("POS:" + posstr);
                this.setState({deviceLocation: posstr});

                if(global.userID === null) {
                    let timerUserID = setInterval(() => {
                        if(global.userID !== null) {
                            //console.log("Customer.js global.userID: " + global.userID);
                            clearInterval(timerUserID); 

                            myUserID = global.userID;
                            this.setState({userID: global.userID});
                            this.updateBusinessList("first gps location", undefined, false, this.firstLoadComplete); 
                        }
                        else {
                            //console.log("Customer.js waiting for global.userID...");
                        }
                      }, 500);
                }
                else {
                    //console.log("Customer.js already has global.userID: " + global.userID);
                    myUserID = global.userID;
                    this.setState({userID: global.userID});
                    this.updateBusinessList("got first location", undefined, false, this.firstLoadComplete); 
                }

                this.createWebSocket();  // for push notifications
            },
            (error) => {
                // add in a little delay to test UI
                 setTimeout(() => {
                    if(global.bAllowFakeGPSLocation) {   
                        this.setState({deviceLocation:global.fakeGPSLocation, deviceHeading:180});  // down the street

                         // Need to wait for a user id, which could come from the legacy mybluemix.net storage
                        if(global.userID === null) {
                            let timerUserID = setInterval(() => {
                                if(global.userID !== null) {
                                    //console.log("Customer.js global.userID: " + global.userID);
                                    clearInterval(timerUserID); 

                                    myUserID = global.userID;
                                    this.setState({userID: global.userID});
                                    this.updateBusinessList("no gps update", undefined, false, this.firstLoadComplete); 
                                }
                                else {
                                    //console.log("Customer.js waiting for global.userID...");
                                }
                              }, 500);
                        }
                        else {
                            //console.log("Customer.js already has global.userID: " + global.userID);
                            myUserID = global.userID;
                            this.setState({userID: global.userID});
                            this.updateBusinessList("no gps update", undefined, false, this.firstLoadComplete); 
                        }

                        this.createWebSocket();  // for push notifications
                    }
                    else {
    	            	this.displayErrorMessage(
                            MSG_SAFE_QUEUE_NEEDS_YOUR_GPS_LOCATION,
                            MSG_CHANGE_YOUR_BROWSER_SETTINGS,
                            MSG_YOUR_BROWSER_REPORTED + "'" + error.message + "'");

    	                // for testing
    	                this.setState({deviceLocation: "0,0"});
    	            }
                }, 2000);
            },
            {enableHighAccuracy: true}    
        );

        // Keep getting position updates
        navigator.geolocation.watchPosition(
            (position) => {
                var posstr = position.coords.latitude + "," + position.coords.longitude;
                var heading = 180;
                //console.log("New position:" + posstr);
                positionWatchCount++;

                // keep the last 5 points in history
                gpsHistory.push(posstr); // adds new position to the end (newest)
                gpsHistory.shift();      // removes the first entry (oldest)

                // don't do anything til we have a userid.
                // Note that this can by asynchronous, since we may get a legacy update from mybluemix.net localStorage
                if(this.state.userID === '') {
                    console.log("watchPostion ignored, since no user id yet")
                    return;
                }


                //alert("Accuracy:" + position.coords.accuracy);
              /*
               * We seem to get dozens of position updates in just a few seconds, and
               * even when standing still we get some 1 foot and smaller changes.
               *
               * This causes some items to bounce around just because we've moved a few feet.
               * This is probably only going to happen in testing, when there's a bunch of stores together,
               *
               * Regardless, we'll go with these rules when we get a new position:
               * 1. Hit the database no more than every 30 seconds (this just changes numbers in line)
               * 2. Update the store list if we've moved more than 25 feet
               *
               * This also exposed a bug, where if an update happens while we are joining a line,
               * it seems to not work... so we won't update if we're in the middle of a join
               */
                if(!bJoinInProgress && !bScannedInProgress) {
                    var debugstr;

                    const moved_m = this.distanceBetweenInMeters(positionAtLastUpdate, posstr);
                    const moved_ft = moved_m * 3.28084;
                    console.log("UPDATED POS: moved " + moved_ft.toFixed(0) + " feet");

                    var elapsed;
                    var now = new Date().getTime();
                    if(timeAtLastUpdate === null)
                        elapsed = 300*1000;  // first time, so force update
                    else
                        elapsed = now - timeAtLastUpdate;  // in msec

                    if(elapsed > 30*1000) {
                        // check the database
                        timeAtLastUpdate = now;
                        positionAtLastUpdate = posstr;
                        positionUpdateCount++;
                        debugstr = "db update " + moved_ft.toFixed(0) + " feet " + positionUpdateCount + " of " + positionWatchCount;
                        this.updateBusinessList("updated location, moved " + moved_ft.toFixed(0) + " ft", undefined, false); 
                    }
                    else if(moved_ft > 25) {
                        // we aren't updating from the database, 
                        // but we've moved far enough to update the display

                        // calculate heading
                        heading = this.getHeadingFromPoints(posstr, positionAtLastUpdate);  // to, from

                        debugstr = "disp update " + moved_ft.toFixed(0) + " feet " + positionUpdateCount + " of " + positionWatchCount;
                        if((this.state.singleItem.length === 0) && (this.state.sortedfilteredItems.length > 0)) {
                        	  // not in line, just update the list
                            this.sortandfilter(this.state.sortedfilteredItems, posstr, true);  // use the new position
                        }
                        else if(this.state.singleItem.length > 0) {
                        	  // in line, so check for leaving the 1000 ft mark, or crossing the 700 ft mark
                        	  var store = this.state.singleItem[0];
                        	  var distance = this.distanceBetweenPointsInFeet(posstr, store.location);
                  			    //console.log("WE ARE NOW " + distance + " feet away");
                            bMovingAwayFromStore = this.movingAwayFromStore();

                            // Calulate the region we are in 
                            var radius = 1000;  // default, in feet
                            if((store.custom !== undefined) && (store.custom.radius !== undefined))
                                radius = store.custom.radius;
                            var radiusLeadingEdge = 0.7 * radius;   // the edge where we warn
                  			if(distance > radiusLeadingEdge) 
                  				this.updateBusinessList("detected too far away", undefined, false);
                        }
                    }

                    if(bShowDebug) {
                   		  console.log(debugstr);
                        this.setState({debugString:debugstr});
                    }
                }

                this.setState({deviceLocation: posstr, deviceHeading:heading});
            }, 
            (error) => {
                // Nothing we can do ... I think
            },
            {enableHighAccuracy: true}  
        );

        // listen for network connection changes
        window.addEventListener('online', this.handleConnectionChange);
        window.addEventListener('offline', this.handleConnectionChange);

        // Background timer will send Pongs if enabled
        timerKeepAlive = setInterval(() => {
            if(bSendKeepAlives) {
                if((item_me !== undefined) && ((this.isPickup(item_me) || (this.state.singleItem.length > 0)))) {
                    let time = Date.now();

                    // don't need to do this for text notification
                    var apns = getAPNTokenFromContact(item_me.contact);
                    if(apns.substring(0,4) !== 'sms_') {
                        //console.log("Sending pong to " + this.state.singleItem[0].contact + "  " + time + "   " + moment(time).format('hh:mm A'));
                        var myid = getUserIDFromContact(item_me.contact);
                        this.sendPushToStore(this.state.singleItem[0], global.notificationPong, time, myid, "silent.wav");
                    }
                }
                else
                    console.log("ODD: sendKeepAlive is true, but there's no singleItem or pickup")
            }
        }, global.timerKeepAliveInterval);

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

componentWillUnmount() {
    console.log("unmount");
    window.removeEventListener('beforeunload', this.beforeunload);
    window.removeEventListener('online', this.handleConnectionChange);
    window.removeEventListener('offline', this.handleConnectionChange);
    clearInterval(timerKeepAlive);
}


handleFocus = () => {
	console.log("got focus");
	//alert("GOT FOCUS");
}

// send the push to the store
sendPushToStore = (item, type, title, body, sound) => {
    // could be a race condition here, since this can be called fron a timer or notification
    if(item === undefined)
        return;

    var token  = getAPNTokenFromContact(item.contact);
    if(token === undefined) {
        console.log("sendPushToStore has undefined token: " + title);
        return;
    }

    var payload = {title: title, body: body, payload: {type: type, nickname: '', userid: ''}};
    var spayload = JSON.stringify(payload);
    var spayload64 = Buffer.from(spayload, 'binary').toString('base64');

    pushResilient(token, spayload64, sound, (response) => {
        if(response != null) {
            if(response.result == 'SUCCESS') {
               // Alert.alert("NOTIFIED!", 'Person has been notified.');
               // console.log("OWNER: " + token + "  Manager has been notified.");
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

    // Sync up a MIRROR by sending it the same notification
    if((item.mirrors !== undefined) && (item.mirrors !== '')) {
        // there is a mirror, so send it to them
        var mirrorToken = getAPNTokenFromContact(item.mirrors);
        if(mirrorToken === undefined) {
             console.log("sendPushToStore has undefined mirrorToken: " + item.mirrors);
            return;
        }

        pushResilient(mirrorToken, spayload64, sound, (response) => {
            if(response != null) {
                if(response.result == 'SUCCESS') {
                    //console.log("MIRROR: " + mirrorToken + "  Manager has been notified.");
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
}


getQueueIcon = (props) => {
    if(props.quantity === 0) return q0;
    if(props.quantity <= 5) return q1;
    if(props.quantity <= 10) return q2;
    return q3;
}


testmove = (topos) => {
    var posstr = topos;

    var heading = this.getHeadingFromPoints(posstr, positionAtLastUpdate);  // to, from
    console.log("Heading: " + heading);
    positionAtLastUpdate = posstr;

    this.setState({deviceLocation: posstr, deviceHeading: heading});

    /* we want diretion of travle to be at the top.
     * so we have to correct from what have as heading and what the map will display
     * deviceHeading
     *   0: Going North
     * 180: Going South
     *  90: Going East
     * 270: Going West
     *
     * the map display
     *   0: South at top
     *  90: West at top
     * 180: North at top
     * 270: East at top
     *
     * So, when traveling East, we want east on top, and so forth...
     *
     *    deviceHeading    mapHeading
     *    North:   0       180
     *    South: 180         0
     *    East:   90       270
     *    West:  270        90
     *
     *    mapHeading = (deviceHeading + 180) % 360
     */

    var store = this.state.singleItem[0];

    // keep the last 5 points in history
    var distance = this.distanceBetweenPointsInFeet(posstr, store.location);
    console.log("Pushing: " + distance);
    gpsHistory.push(posstr);  // adds new position to the end (newest)
    gpsHistory.shift();      // removes the first entry (oldest)

    bMovingAwayFromStore = this.movingAwayFromStore();
    this.dumpdistancehistory();

    var txt = bMovingAwayFromStore ? "AWAY" : "TOWARD";
    console.log("WE ARE NOW " + distance + " feet, " + txt);

    // update the map
    if(this.state.bShowMap === '1')
        this.updateMapAtItem();
}

dumpgpshistory = () => {
    for(var i=0; i<gpsHistory.length; i++) {
        console.log("GPS[" + i + "] " + gpsHistory[i]);
    }
}

dumpdistancehistory = () => {
    for(var i=0; i<distanceHistory.length; i++) {
        console.log("DIST[" + i + "] " + distanceHistory[i]);
    }
}

// custom field breakouts
calculateWaitTime = (item, position) => {
    var custom = item.custom;
    var time = '';
    if(custom !== undefined) {
        if(custom.timepercustomer !== undefined)
           time = custom.timepercustomer;
    }
    if(time === 'not set')
        return '';

    if(time !== '') {
        // convert seconds to displayable value
        var secs = parseInt(time, 10);
        var totalsecs = secs * position;   // position is 1-based

        if(totalsecs < 60) {
            // fast
            time = 'a minute';
        }
        else if(totalsecs < 3600) {
            // less than 1 hour
            var min = Math.round(totalsecs/60);
            var ms = (min  == 1) ? '' : 's';
            time = min + ' minute' + ms;
        } 
        else {
            // greater than 1 hour
            var hour = Math.round(totalsecs/3600);
            var min  = Math.round((totalsecs%3600)/60);
            var hs = (hour == 1) ? '' : 's';
            var ms = (min  == 1) ? '' : 's';
            if(min != 0)
                time = hour + ' hour' + hs + ' ' + min + ' minute' + ms;
            else 
                time = hour + ' hour' + hs;
        }
    }
    return time;
}



/*
 * THIS IS EACH ITEM IN THE List
 */
  renderItem = (item, idx) => {
    const classes = useStyles();

    var address = item.description.split('\n');
    var address0 = address[0].trim();
    var address1 = "";
    if(address.length > 1)
        address1 = address[1].trim();
    var address2 = "";
    if(address.length > 2)
    	address2 = address[2].trim();

    var closedLabel = (item.state === 'closed') ? MSG_CLOSED : "";
  
    var imageUrl = "";
    if((item.logo !== undefined) && (item.logo !== "")) {
          const byteCharacters = atob(item.logo);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          let image = new Blob([byteArray], { type: 'image/jpeg' });
          imageUrl = URL.createObjectURL(image);
    }

    var units = item.units;
    if(units === undefined)
    	units = 'ft';

    // Get the nickname entered by the user 
    var nickname = '';
    if(item_me.description !== undefined) {
        if(this.state.showQRCode !== '0')   // we're in line, so get nickname from database
            nicknameEntered = Buffer.from(item_me.description, 'base64').toString('binary');
        if(nicknameEntered === '') 
            nickname = global.userID.substring(0,8);  
        else
          nickname = nicknameEntered; 
    }
  
    // display the sms number if present
    var smsNumber = '';
    if(item_me.contact !== undefined) {
        var token = getAPNTokenFromContact(item_me.contact);
        if(token.substring(0,4) === 'sms_')
            smsNumber = nickname + "  @" + token.substr(4);
    }

    // contact info
    var contactInfo = '';
    if((item.custom !== undefined) && (item.custom.contactinfo !== undefined))
        contactInfo = item.custom.contactinfo;

    var feet = this.distanceAwayInFeet(item);
    var bCanGetInLine = this.canGetInLineFeet(item, feet);


    // get the store basics
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

    // Backward compatiiblity, somewhat...
    if(!bStoreHasPickup && !bStoreHasWalkin) {
        // must be old store, so assume it is walk-in only
        bStoreHasWalkin = true;
    }

    var bPickup = this.isPickup(item_me);
    if(item_me.state === 'registerpickup')
        bPickup = true;

    // look to see if the user has registered to receive close-enough notification
    var bRegistered = false;
    var registerMessage = MSG_WAITING_TO_GET_CLOSE_ENOUGH; 
    var registerMessage2;
    var reallyShowQRCode = this.state.showQRCode;

    if(item.registered !== undefined) {
        bRegistered = true;
        reallyShowQRCode = '0';   // don't show qrcode for registered users, only users actually in line
        registerMessage2 = bPickup ? MSG_THEN_WELL_CHECK_YOU_IN : MSG_THEN_WELL_ADD_YOU_TO_THE_LINE; 

        // we'll always open the map if registered, just one time in case the user wants to close it later
        if(!bMapShownOnRegister) { 
            global.itemMap = item;
            global.itemMapUserLocation = this.state.deviceLocation;
            this.setState({bShowMap:'1',showMapIdx:idx});

            setTimeout(() => {
                var theref = item.theRef;
                if((theref !== null) || (theref === undefined))
                    theref.scrollIntoView({ behavior:"smooth"});
            }, 500);
            bMapShownOnRegister = true;  // dont' force the map open anymore
        }      

    }
    else {
        // onlys show the QR Code if we've been notified
        if(this.state.isSelected === '1')
            reallyShowQRCode = '1';
        else
            reallyShowQRCode = '0';
    }

    var style;
    if(reallyShowQRCode === '1') {
        // notified to come in
        style={width:"98%",marginBottom:8,borderRadius:10,borderColor:'#000000', backgroundColor:'#97FEAE'}; // green
    }
    else if(bRegistered) {
        // registered for future join
        if(bCanGetInLine && (item.state !== 'closed'))     
            style={width:"98%",marginBottom:8,borderRadius:10,borderColor:'#000000', backgroundColor:'#97FEAE'}; // green
        else 
            style={width:"98%",marginBottom:2,borderRadius:10,borderColor:'#000000', backgroundColor:'#F1F0EE'}; // gray
    }
    else  if(this.state.showQRCode == '1') {
        // this means we are in line
        style={width:"98%",marginBottom:8,borderRadius:10,borderColor:'#000000', backgroundColor:'#E3D4FF'}; // light purple
    }
    else {
        // all the not-in-line cases
        if(bCanGetInLine && (item.state !== 'closed')) {
            // not in line, but close enough
            style={width:"98%",marginBottom:2,borderRadius:10,borderColor:'#000000', backgroundColor:'#97FEAE'}; // green
        }
        else {
            // not in line, not close enough 
            style={width:"98%",marginBottom:2,borderRadius:10,borderColor:'#000000', backgroundColor:'#F1F0EE'}; // gray
        }
    }

    var textNameStyle      = {textAlign:"left", color:"#000000", textTransform:"none", fontSize:"110%", marginTop:8};
    var textAddressStyle   = {textAlign:"left", color:"gray",    textTransform:"none", fontSize:"110%", marginTop:-8};
    var textAddressStyleNO   = {textAlign:"left", color:"gray",    textTransform:"none", fontSize:"110%", marginTop:0};

    var textNameLargeStyle = {textAlign:"left", color:"#000000", textTransform:"none", fontSize:"150%", marginTop:0};
    var notifybtnstyle     = {width:"100%", marginTop:8,borderRadius:8,borderColor:'#000000', backgroundColor:'#81808e'};
    var btnstyle           = {width:"50%",marginTop:8,borderRadius:8,borderColor:'#000000', backgroundColor:themeMainColor};

    var contactStyle   = {textAlign:"left", color:"gray", textTransform:"none", fontSize:"110%", marginTop:0};

    const handleNotify = () => {
        this.setState({bShowJoinFutureDialog:'1', joinProps:item});
    };

    var qrCodeValue = this.state.userID;  // default
    var entranceText = MSG_THIS_IS_YOUR_ENTRANCE_CODE;

    // update the map
    // we'll always show the map if we're registered to auto-join
    var scrollMargin  = "0px";
    var scrollPadding = "0px";
    if(this.state.bShowMap === '1') {
        this.updateMapAtItem();

        // we need some margin at top for scrollToView to account for the fixed banner "Safe Queues Near You"
        // Chrome has a scrollMargin property, but this isn't supported in Safari
        // so on Safari we'll just add some space at the top...
        // TURNS OUT, even Chrome on iOS doesn't support scrollMargin (must be iOS WebKit in common)
        if(isSafari || isIOS) {
            // can't use scrollMargin, so we'll create a blank <div> above the size of the banner
            // but only for the item with the map
            if(this.state.showMapIdx === idx) { 
                scrollMargin  = "0px";
                scrollPadding = "52px";  // isAndroid ? "70px" : "58px";  
            }
        }
        else {
            // chrome likley, but many other browsers support scrollMargin
            // we'll assume scrollMargin is supported, which just looks a little better
            scrollMargin  = "58px";     // isAndroid ? "70px" : "58px"; 
            scrollPadding = "0px";
        }
    }

    var btnleavestyle={width:"100%",marginTop:8,marginBottom:8,borderRadius:8,borderWidth:2,borderColor:'#000000', backgroundColor:'#F1F0EE'};
    var bSelfManaged = false;
    var bSelfManagedAndFirstInline = false;

    if(this.isSelfManaged(item)) {
        bSelfManaged = true;
        if((this.state.inlinePositionMe === 0) || (reallyShowQRCode === '1')) {
            bSelfManagedAndFirstInline = true;
            reallyShowQRCode = '0';
        }
    }

    var positionToDisplay = this.state.inlinePositionMe;
    if(bSelfManaged)
        positionToDisplay--;

    var waitTimeToDisplay = this.calculateWaitTime(item, positionToDisplay);

    // saved for later
    customNotifyMessage = '';
    if(item.custom !== undefined) {
        if(item.custom.notifymessage !== undefined)
           customNotifyMessage = item.custom.notifymessage;
    }
    customPickupMessage = '';
    if(item.custom !== undefined) {
        if(item.custom.pickupmessage !== undefined)
           customPickupMessage = item.custom.pickupmessage;
    }

    if(bPickup || (this.state.showQRCode === '1' && !item_me.bRegistered)) {
        if(!bSendKeepAlives) {
            // Transitioning fron not sending to sending. Force the first
            if((this.state.singleItem.length > 0) && (item_me !== undefined)) {
                let time = Date.now();
                //console.log("Sending FIRST pong to " + this.state.singleItem[0].contact + "  " + time + "   " + moment(time).format('hh:mm A'));
                var myid = getUserIDFromContact(item_me.contact);
                this.sendPushToStore(this.state.singleItem[0], global.notificationPong, time, myid, "silent.wav");
            }
            bSendKeepAlives = true;
        }
    }
    else {
        bSendKeepAlives = false;    
    }

    // since we only send SMS texts when near the "front" of the line,
    // This is defined in QueueManagment.js, which supresses the SMS texts for every position beyond 2
    var bNearFrontOfLine = false;
    if(this.state.inlinePositionMe < 3)   // positionme is zero-based
        bNearFrontOfLine = true;

    // Adjust the walk-in, pick-up button text
    // On thin screens, like 360 pixel we end up with two lines
    var btnFontSize = "120%";
    if(window.innerWidth < 391)  // seems it goes to two lines of text at 390 px
        btnFontSize = "100%";

    const handleWalkin = () => {
        if(this.state.singleItem.length === 0) {
            if(item.state === 'closed') {
                this.setState({bShowClosedDialog:'1', joinProps:item});
            }
            else if(bCanGetInLine) {
                this.setState({bShowJoinDialog:'1', joinProps:item});
            } 
            else {
                this.setState({bShowJoinFutureDialog:'1', joinProps:item});
            }
        }
        else {
            this.updateBusinessList("after user tap", item.name, false);
            if(global.FCMWebToken === null) 
                this.createWebSocket();  // just to be sure
        }
    }

    const handlePickup = () => {
         if(this.state.singleItem.length === 0) {
            if(item.state === 'closed') {
                this.setState({bShowClosedDialog:'1', joinProps:item});
            }
            else if(bCanGetInLine) {
                this.setState({bShowPickupDialog:'1', joinProps:item});
            } 
            else {
                this.setState({bShowPickupFutureDialog:'1', joinProps:item});
            }
        }
        else {
            this.updateBusinessList("after user tap", item.name, false);
            if(global.FCMWebToken === null) 
                this.createWebSocket();  // just to be sure
        }
    }

    return (
        // We need a reference to the item, so it can be used for scrolling
        // NOTE: This is a self-reference, so must be removed before a stringify
        //       If there's a better idea, what is it?  Can't seem to get a ref to the PlainList (!@#)
  	    <div ref={(ref) => { item.theRef = ref; }} style={{scrollMargin:scrollMargin}}>
        { scrollPadding !== "0px" &&
            <div style={{height:scrollPadding}}></div>
        }
        <Button key={idx} variant='outlined' style={style}  
            onClick={(e) => 
            { 
                if(this.state.singleItem.length === 0) {
                    // if there's only one cnotificationYouAreNextce, we'll do that
                    if(bStoreHasWalkin && !bStoreHasPickup)
                        handleWalkin();
                    else if(!bStoreHasWalkin && bStoreHasPickup)
                        handlePickup();
                    else
                        this.showMapAtItem(item,idx); e.stopPropagation(); // We'll use this to put up the map
                }
                else {
              		// We're in line, so use this click as a refresh
                    this.updateBusinessList("after user tap", item.name, false);
                    
                    this.createWebSocket();  // just to be sure
                }
            }}>
            <div className={classes.root}>
                <Grid container spacing={0}>
                    { imageUrl !== "" &&
                        <Grid container
                              direction="column"
                              justify="flex-start"
                              alignItems="flex-start"  
                              xs={9}>
                              { this.state.singleItem.length > 0 &&
                              	  <Button style={{marginLeft:-8,marginTop:-4}}> 
                                  <img onClick={(e) => { 
                                  		//this.setState({bShowLeaveDialog:'1', joinProps:item});
                                      //e.stopPropagation();
                                  }} src={imageUrl} width="100%" style={{marginTop:8,borderRadius:10}}/>
                                  </Button>
                              }
                              { this.state.singleItem.length == 0 &&
								                  <img src={imageUrl} width="100%" style={{marginTop:8,borderRadius:10}}/>
                              }
                        </Grid>
                    }
                    { imageUrl === "" &&
                        <Grid container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"  
                            xm={9} xs={9}>
                            	{ this.state.singleItem.length > 0 &&
                              	  <Button style={{marginLeft:-8,marginTop:-4}} 
                              	      onClick={() => this.setState({bShowLeaveDialog:'1', joinProps:item})}> 
                              	   		 <div style={textNameLargeStyle}><b>{item.name}</b></div>
                                  </Button>
	                            }
	                            { this.state.singleItem.length == 0 &&
                                	<div style={textNameLargeStyle}><b>{item.name}</b></div>
	                            }
                        </Grid>
                    }
                    <Grid container 
                          direction="column"
                          justify="flex-end"
                          alignItems="flex-end"  xs={3}>
                          <Button onClick={(e) => { this.showMapAtItem(item,idx); e.stopPropagation();}}>
                          		<img src={mappin} height="40"/>
                          </Button>
                          <div style={{fontSize:"150%",textTransform:"none"}}>{this.distanceAwayDisplay(item)}</div>
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
                              { address0 === '' &&
                                  <div style={textAddressStyleNO}>{address1}</div>
                              }
                              { address0 !== '' && 
                                  <div style={textAddressStyle}>{address1}</div>
                              }
                              { address2 !== "" &&
                                  <div style={textAddressStyle}>{address2}</div>
                              }

                              { contactInfo !== '' &&
                                  <div style={contactStyle}><b>Contact: </b>{contactInfo}</div>
                              }
                              
                              { this.state.showQRCode !== '1' &&
                                <Grid container
                                      style={{marginTop:8,marginBottom:8}}
                                      direction="row"
                                      justify="flex-start"
                                      alignItems="center">

                                    { bStoreHasWalkin && bStoreHasPickup &&
                                        <Button size="small" variant='outlined' style={{width:"48%", backgroundColor:'#F8F8F8'}}
                                                onClick={(e) => {handleWalkin();e.stopPropagation()}}>
                                            <Grid item>
                                                <img style={{height:28,marginTop:5}} src={icon_walkin}/>
                                            </Grid>
                                            <Grid item style={{marginLeft:4}}>
                                                <div style={{fontSize:btnFontSize}}>WALK-IN</div>
                                            </Grid>
                                        </Button>
                                    }
                                    { bStoreHasWalkin && !bStoreHasPickup &&  
                                        <div style={{fontSize:"100%"}}>WALK-IN</div>
                                    }

                                    { bStoreHasPickup && bStoreHasWalkin &&
                                        <Button size="small" variant='outlined' style={{marginLeft: bStoreHasWalkin ? "4%" : 0,width:"48%",backgroundColor:'#F8F8F8'}}
                                                onClick={(e) => {handlePickup();e.stopPropagation()}}>
                                            <Grid item >
                                                <div style={{fontSize:btnFontSize}}>PICK-UP</div>
                                            </Grid>
                                            <Grid item  style={{marginLeft:4}}>
                                                <img style={{height:28,marginTop:6}} src={icon_pickup}/>
                                            </Grid>
                                        </Button>
                                    } 
                                    { bStoreHasPickup && !bStoreHasWalkin &&  
                                        <div style={{fontSize:"100%"}}>PICK-UP</div>
                                    } 
                                </Grid>
                              }


                              { bShowDebug === true && <div style={textAddressStyle}>{this.state.debugString}</div> }
                    </Grid>
                    <Grid container
                          direction="row"
                          justify="flex-end"
                          alignItems="center" 
                          xs={3} xm={3}>
                              <img src={this.getQueueIcon(item)} height="28"/>
                              <div style={{fontSize:"150%",marginLeft:4}}>{item.quantity}</div>
                              { false && !bRegistered && item.state !== 'closed' && !bCanGetInLine &&
                                  <Button style={notifybtnstyle} onClick={(e) => {handleNotify();e.stopPropagation()}} > 
                                      <div style={{color:'#FFFFFF',fontSize:'90%'}}>Notify</div>
                                  </Button>
                              }
                              <div>{closedLabel}</div>
                    </Grid>
                </Grid>

              { (this.state.showMapIdx === idx) && this.drawMap() }

              { this.state.showQRCode === '1' &&  // this means we are line
                  <div>
                  { bRegistered &&   
                      <div>                          
                          <div style={{textTransform:"none",textColor:'#000000',fontSize:"130%", marginTop:8}}>
                              <b>{MSG_KEEP_THIS_PAGE_VISIBLE}</b></div>
                          { smsNumber === '' &&
                              <div>
                                  <div style={{textTransform:"none",fontSize:"100%",marginTop:-4}}>
                                      <b>{MSG_IF_YOU_LEAVE_THIS_PAGE},</b>
                                  </div>
                                  <div style={{textTransform:"none",fontSize:"100%",marginTop:-4}}>
                                      <b>{bPickup ? MSG_IF_YOU_WILL_NOT_BE_ABLE_TO_CHECKIN : MSG_IF_YOU_WILL_NOT_BE_ABLE_TO_JOIN}.</b>
                                  </div>
                                  <div style={{textTransform:"none",marginTop:8}}>ID: {nickname}</div>
                              </div>
                          }
                          { smsNumber !== '' &&
                              <div>
                                 { bNearFrontOfLine && 
                                      <div>
                                          <div style={{textTransform:"none",fontSize:"90%",marginTop:-4}}>
                                              <b>{MSG_IF_YOU_LEAVE_THIS_PAGE},</b>
                                          </div>
                                          <div style={{textTransform:"none",fontSize:"90%",marginTop:-4}}>
                                              <b>{bPickup ? MSG_IF_YOU_WILL_NOT_BE_ABLE_TO_JOIN_OR_GET_TEXT_CHECKIN : MSG_IF_YOU_WILL_NOT_BE_ABLE_TO_JOIN_OR_GET_TEXT}</b>
                                          </div>
                                      </div>
                                  }
                                  { !bNearFrontOfLine &&
                                      <div>
                                          <div style={{textTransform:"none",textColor:'#000000',fontSize:"130%", marginTop:8}}>
                                               <b>{MSG_KEEP_THIS_PAGE_VISIBLE}</b>
                                          </div>
                                          <div style={{textTransform:"none",fontSize:"90%",marginTop:-4}}>
                                                <b>{MSG_IF_YOU_LEAVE_THIS_PAGE},</b>
                                          </div>
                                          <div style={{textTransform:"none",fontSize:"90%",marginTop:-4}}>
                                                <b>you can come back any time to see your position.</b>
                                          </div>
                                          <div style={{textTransform:"none",fontSize:"90%",marginTop:4}}>
                                                 <b>You will receive text messages</b>
                                          </div>
                                          <div style={{textTransform:"none",fontSize:"90%",marginTop:-4}}>
                                                 <b>when you are near the front of the line.</b>
                                          </div>
                                     </div>
                                  }
                                  <div style={{textTransform:"none",marginTop:8}}>ID: {smsNumber}</div>
                              </div>
                          }
                          <div style={{textTransform:"none",fontSize:"130%", marginTop:8}}>{registerMessage}</div>
                          <div style={{textTransform:"none",fontSize:"130%", marginTop:-4}}>{registerMessage2}</div>

                          <Button style={btnstyle} 
                                onClick={(e) => { 
                                    this.setState({bShowLeaveDialog:'1', joinProps:item});
                                    e.stopPropagation();
                                }}>
                                <div style={{color:'#FFFFFF',fontSize:'100%'}}>{BTN_STOP_WAITING}</div>
                          </Button>
                      </div>
                  }

                  { !bRegistered && !bSelfManagedAndFirstInline &&  // in line for real!
                      <div>
                          { smsNumber === '' &&
                              <div>
                                  { reallyShowQRCode === '0' && 
                                      <div>
                                          <div style={{textTransform:"none",textColor:'#000000',fontSize:"130%", marginTop:8}}>
                                              <b>{MSG_KEEP_THIS_PAGE_VISIBLE}</b>
                                          </div>
                                          <div style={{textTransform:"none",fontSize:"90%",marginTop:-4}}>
                                            <b>{MSG_IF_YOU_LEAVE_THIS_PAGE},</b>
                                          </div>
                                          <div style={{textTransform:"none",fontSize:"90%",marginTop:-4}}>
                                            <b>{ bPickup ? MSG_IF_YOU_WILL_NOT_BE_NOTIFIED_TO_PICKUP : MSG_IF_YOU_WILL_NOT_BE_NOTIFIED}.</b>
                                          </div>
                                      </div>
                                  }
                                  { !bPickup &&
                                      <div style={{textTransform:"none",marginTop:8}}>ID: {nickname}</div>
                                  }
                              </div>
                          }
                          { smsNumber !== '' &&
                              <div>
                                   { reallyShowQRCode === '0' && 
                                      <div>
                                          { bNearFrontOfLine && 
                                              <div>
                                                    <div style={{textTransform:"none",fontSize:"90%",marginTop:8}}>
                                                        <b>{MSG_IF_YOU_LEAVE_THIS_PAGE},</b>
                                                    </div>
                                                    <div style={{textTransform:"none",fontSize:"90%",marginTop:-4}}>
                                                        <b>{MSG_IF_COME_BACK_WHEN_YOU_GET_A_TEXT}.</b>
                                                    </div>
                                              </div>
                                          }
                                          { !bNearFrontOfLine &&
                                              <div>
                                                  <div style={{textTransform:"none",textColor:'#000000',fontSize:"130%", marginTop:8}}>
                                                       <b>{MSG_KEEP_THIS_PAGE_VISIBLE}</b>
                                                  </div>
                                                  <div style={{textTransform:"none",fontSize:"90%",marginTop:-4}}>
                                                        <b>{MSG_IF_YOU_LEAVE_THIS_PAGE},</b>
                                                  </div>
                                                  <div style={{textTransform:"none",fontSize:"90%",marginTop:-4}}>
                                                        <b>you can come back any time to see your position.</b>
                                                  </div>
                                                  <div style={{textTransform:"none",fontSize:"90%",marginTop:4}}>
                                                         <b>You will receive text messages only</b>
                                                  </div>
                                                  <div style={{textTransform:"none",fontSize:"90%",marginTop:-4}}>
                                                         <b>when you are near the front of the line.</b>
                                                  </div>
                                             </div>
                                          }
                                      </div>
                                   }
                                    <div style={{textTransform:"none",marginTop:8}}>ID: {smsNumber}</div>   
                                </div>
                          }
                      </div>
                  }
                  </div>
              }

              { reallyShowQRCode === '1' && this.state.bShowBtnSelfManagedLeave === '0' &&
                  <div>
                        <div></div>
                        { smsNumber !== '' &&
                            <div style={{textTransform:"none",marginTop:8}}>{smsNumber}</div>
                        }
                        { smsNumber === '' &&
                            <div style={{textTransform:"none",marginTop:8}}>{nickname}</div>
                        }
                        <QRCode
                           value={qrCodeValue}
                           size={180}
                           color="black"
                        />

                        <div style={{textTransform:"none"}}>{entranceText}</div>
                  </div>
              }
              { this.state.showQRCode === '1' && !bRegistered &&
                  <div>
                        { bPickup && item_me.state !== 'notified' &&
                            <div style={{fontSize:"200%"}}>{nickname}</div>
                        }
                        { this.state.isSelected === '0' && /* !bPickup && */
                            <div>
                                { !bPickup && 
                                    <div>
                                        <div>{MSG_YOUR_POSITION}</div>
                                        <div style={{fontSize:"400%"}}>{positionToDisplay}</div>
                                        <div>{MSG_OF} {this.state.inlineWithMeItems.length} {MSG_IN_LINE}</div>

                                        { waitTimeToDisplay !== '' && 
                                            <div style={{fontSize:'120%', textTransform:'none'}}>About {waitTimeToDisplay}</div>
                                        }
                                    </div>
                                }

                                <Button style={btnstyle} 
                                      onClick={(e) => { 
                                          this.setState({bShowLeaveDialog:'1', joinProps:item});
                                          e.stopPropagation();
                                      }}>
                                      <div style={{color:'#FFFFFF',fontSize:'80%'}}>{BTN_LEAVE_SAFE_QUEUE}</div>
                                </Button>
                            </div>
                        }
                        { this.state.isSelected === '1' &&
                            <div>
                                <div style={{textTransform:"none",fontSize:"400%"}}>{this.state.countdown}</div>
                                <div style={{textTransform:"none"}}>{this.state.whenNotified}</div>
                                <Button style={btnstyle} 
                                      onClick={(e) => { 
                                          this.setState({bShowLeaveDialog:'1', joinProps:item});
                                          e.stopPropagation();
                                      }}>
                                      <div style={{color:'#FFFFFF',fontSize:'80%'}}>{BTN_LEAVE_SAFE_QUEUE}</div>
                                </Button>
                            </div>
                        }
                        { bSelfManagedAndFirstInline  &&
                            <Button variant='outlined' style={btnleavestyle}
                                onClick={(e) => { 
                                    this.selfManagedLeaveLine(this.state.inlineMe, item);
                                    e.stopPropagation();
                                }}>
                                <div style={{fontSize:"150%",color:"#000000"}}>When you leave<br />Tap Here!</div>
                            </Button>
                        }
                  </div>
              }
          </div>
       </Button>
      </div>
    );
}


/*
 * Transistion from waiting to get close enough to joining 
 *
 * This simply changes the state from 'registerjoin' to 'open' (though the open doesn't matter)
 */
autoJoinLine = (itemMe) => {
  if(bJoinInProgress) {
        console.log("STOPPING SECOND JOIN FROM AUTOJOIN");
        return;   
    }
    bJoinInProgress = true;

    var props = this.state.joinProps;

    var message = MSG_JOINING;
    if(itemMe.state === 'registerpickup')
        message = "Checking in..."

    var newstate = 'open';  // for walk-ins
    if(itemMe.state === 'registerpickup')
        newstate = 'pickup';

    this.setState({joinNickanme:nicknameEntered,
                   bShowBackdrop: message,
                   bShowJoinDialog:'0',
                   bShowMap:'0',
                   showMapIdx:-1});

    // change the state to 'open'
    const payload = {
        ...itemMe,
        state: newstate,
    };

    /*
    var tempitem = {...payload};
    tempitem.theRef = undefined;
    console.log("PAYLOAD: " + JSON.stringify(tempitem))
    */
    
    updateResilient(payload, payload, (item) => {
        if(item != null) {
            console.log("autojoin update success");
            this.setState({bShowBackdrop:'0', bShowCloseEnoughDialog:'0'});
            this.updateBusinessList("after auto join", payload.name, true);

            // notify the store. Distinguish the first user with different sound
            // TODO: try to limit the beeps... with hysterisis maybe
            if(props.quantity < 25) {
                var title = MSG_SOMEONE_HAS_AUTOJOINED; 
                var body = '';
                var sound = 'beep2.wav';
                if(itemMe.state === 'registerpickup') 
                    title = MSG_SOMEONE_HAS_AUTOCHECKEDIN;
                this.sendPushToStore(props, global.notificationNewJoin, title, body, sound);
            }
        }
        else {
            this.setState({bShowBackdrop:'0'});
            alert('Network Error\n\nFailed autojoin after two retries. Please check your network connection and try again.');
        }
    });
}

/*
 *  Join a line at the store
 */
joinLine(notifyType) {
    if(bJoinInProgress) {
        console.log("STOPPING SECOND JOIN");
        return;   
    }
    bJoinInProgress = true;

    var props = this.state.joinProps;

    var nickname64;
    var newstate;
    if(global.targetPickupID !== '') {
        // this is the result of scanning a pick-up QR Code
        var pickupID = Buffer.from(global.targetPickupID, 'base64').toString('binary');
        console.log("detected pick-up join for " + global.targetPickupID + "  " + pickupID);
        nickname64 = global.targetPickupID;
    }
    else {
        // base64 encode nickname
        var nickname;
        if(nicknameEntered === '') {
        	//var userId = getUserIDFromContact(props.contact); 
            nickname = global.userID.substring(0,8);  
        }
       	else
        	nickname = nicknameEntered;
        nickname64 = Buffer.from(nickname, 'binary').toString('base64');
    }

    // handle SMS text as new "APN"
    // NOTE: even if the user gives an SMS phone number, 
    //       the back-end will still try to notify via webSocket, so the app can update if it can
    var pushToken = myUserID;  // default is websocket notify, with myid as the token
    if(smsEntered !== '') {
        pushToken = 'sms_' + smsEntered;  // we'll now be updated by SMS
    }
    else if(global.FCMWebToken != null) {
        pushToken = global.FCMWebToken;
    }

    // mark the state of this entry as a future notify or undefined if normal...
    var newstate;
    if(notifyType === NotifyTypeRegisterAndJoin)
        newstate = 'registerjoin';
    else if(global.targetPickupID !== '')
        newstate = 'pickup';
    else
        newstate = undefined;     // default for joining when close enough
    bMapShownOnRegister = false;  // so we show the map 

    var bSelfManaged = false;
    if(props.features !== undefined)  {
        if(props.features.indexOf('|M') !== -1)
            bSelfManaged = true;
    }

    var msg_starting = MSG_STARTING;
    if(newstate === 'pickup')
        msg_starting = "Checking in Pickup..."

    const payload = {
      ...props,
        type:'Store',
        name: props.name,
        contact: this.state.userID + '][' + pushToken,  
        description: nickname64,
        logo:'',
        state: newstate,
        userID: props.userID,
        mirrors: props.mirrors
    };

    /*
    var tempitem = {...payload};
    tempitem.theRef = undefined;
    console.log("PAYLOAD: " + JSON.stringify(tempitem))
    */
    
    this.setState({joinNickanme:nickname,
                   bShowBackdrop: (newstate === undefined) ? MSG_JOINING : msg_starting,
                   bShowJoinDialog:'0',
                   bShowBtnSelfManagedLeave: bSelfManaged ? '1' : '0',
                   bShowMap: '0',    
                   showMapIdx: -1}); 

    addResilient(payload, payload, (item) => {
        if(item != null) {
            global.targetBusinessEnter = '0';  // so we don't join again (must refresh the browser)
            this.updateBusinessList("after join", props.name, true);

            // notify the store. Distinguish the first user with different sound
            // TODO: try to limit the beeps... with hysterisis maybe

            // NOTE:
            // We're not sending the push concurrently with the database update!
            // This is a race, and I've already seen the push get to the phone
            // before the database update, so the phone doesn't update properly
            //
            // SO... We'll simply send the push only after we know the database is updated
            // 
            if(props.quantity < 25) {
                var title;
                var body;
                var sound;

                if(notifyType === NotifyTypeRegisterAndJoin) {
                    title = MSG_A_PERSON_HAS_REGISTERED; 
                    body = '';
                    sound = 'beep1.wav';
                }
                else if(props.quantity === 0) {
                    title = MSG_SOMEONE_HAS_JOINED; 
                    body  = ''; // we really don't know this value:   This is the first person in line.';
                    sound = 'beep1.wav';
                }
                else {
                    var num = props.quantity + 1;
                    title = MSG_ANOTHER_PERSON_HAS_JOINED; 
                    body  = ''; // we really don't know this value: There are now ' + num + ' users in line.';
                    sound = 'beep2.wav';
                }

                this.sendPushToStore(props, global.notificationNewJoin, title, body, sound);
            }
        }
        else {
        	alert("Could not join. There was an error at the server.")
        }
    });
}

/*
 *  Join a line at the store
 */
joinPickup(notifyType) {
    if(bJoinInProgress) {
        console.log("STOPPING SECOND JOIN");
        return;   
    }
    bJoinInProgress = true;

    var props = this.state.joinProps;

    // base64 encode nickname
    if(nicknameEntered === '') {
        this.displayInformationMessage("Oops...", MSG_YOU_MUST_ADD_A_NOTE);    
        bJoinInProgress = false;
        return false;
    }
    var nickname64 = Buffer.from(nicknameEntered, 'binary').toString('base64');

    // handle SMS text as new "APN"
    // NOTE: even if the user gives an SMS phone number, 
    //       the back-end will still try to notify via webSocket, so the app can update if it can
    var pushToken = myUserID;  // default is websocket notify, with myid as the token
    if(smsEntered !== '') {
        pushToken = 'sms_' + smsEntered;  // we'll now be updated by SMS
    }
    else if(global.FCMWebToken != null) {
        pushToken = global.FCMWebToken;
    }

    // mark the state of this entry as a future notify or undefined if normal...
    var newstate;
    if(notifyType === NotifyTypeRegisterAndPickup)
        newstate = 'registerpickup';
    else if(global.targetPickupID !== '')
        newstate = 'pickup';
    else
        newstate = 'pickup';     // default for joining when close enough
    
    var msg_starting = MSG_CHECKING_IN_FOR_PICKUP; 
    if(newstate === 'registerpickup')
        msg_starting = MSG_REGISTERING_FOR_CHECKIN; 

    const payload = {
      ...props,
        type:'Store',
        name: props.name,
        contact: this.state.userID + '][' + pushToken,  
        description: nickname64,
        logo:'',
        state: newstate,
        userID: props.userID,
        mirrors: props.mirrors
    };

    /*
    var tempitem = {...payload};
    tempitem.theRef = undefined;
    console.log("PAYLOAD: " + JSON.stringify(tempitem))
    */
    
    this.setState({joinNickanme:nicknameEntered,
                   bShowBackdrop: msg_starting,
                   bShowJoinDialog:'0',
                   bShowPickupDialog:'0',
                   bShowBtnSelfManagedLeave:'0',
                   bShowMap: '0',    
                   showMapIdx: -1}); 

    addResilient(payload, payload, (item) => {
        if(item != null) {
            global.targetBusinessEnter = '0';  // so we don't join again (must refresh the browser)
            this.updateBusinessList("after pickup join", props.name, true);

            // notify the store. 
            var title;
            var body;
            var sound;

            if(notifyType ===  NotifyTypeRegisterAndPickup) {
                title = MSG_A_PERSON_HAS_REGISTERED_CHECKIN; 
                body = '';
                sound = 'beep1.wav';
            }
            else {
                title = MSG_ANOTHER_PERSON_HAS_CHECKEDIN; 
                body  = ''; // we really don't know this value: There are now ' + num + ' users in line.';
                sound = 'beep2.wav';
            }

            this.sendPushToStore(props, global.notificationNewJoin, title, body, sound);
        }
        else {
            alert("Could not add pickup. There was an error at the server.")
        }
    });

    return true; // success
}

/*
 *  FOR TEST: Create random user to join a line at the store
 */
createRandomUser = () => {

    var newid = 'web_' + Math.random().toString(36).substr(2, 9);

    var max = 1000000;
    var nick = newid; // '#' + Math.floor(Math.random() * Math.floor(max));
    var nickname = nick.substring(0,8);  

    console.log("JOING: " + newid + "   " + nickname);

    this.randomJoinLine(nickname, newid);
}

randomJoinLine = (nickname, newid) => {
    
    var props = this.state.joinProps;

    // base64 encode nickname
    var nickname64 = Buffer.from(nickname, 'binary').toString('base64');

    const payload = {
      ...props,
        type:'Store',
        name: props.name,
        contact: this.state.userID + '][' + newid,  // push token is my id
        description: nickname64,
        userID: newid
    };

    this.setState({joinNickanme:nicknameEntered,
                   bShowBackdrop: MSG_JOINING,
                   bShowJoinDialog:'0',
                   bShowMap:'0',
                   showMapIdx:-1});

    addResilient(payload, payload, (item) => {
        if(item != null) {
            console.log("randomJoinLine success");
        }
        else {
          alert("Could not join. There was an error at the server.")
        }
    });
}


/*
 *   Leave a line by choice
 */
leaveLine(itemid, store, userMessage) {

    const payload = {
        ...item_me
    }

    var bRegistered = false;
    if((item_me.state === 'registerjoin') || (item_me.state === 'registerpickup'))
        bRegistered = true;

    var title = bRegistered ? MSG_REMOVING : MSG_LEAVING;

    this.setState({bShowBackdrop: title,
                   bShowLeaveDialog:'0',
                   bShowMap:'0',
                   bInGracePeriod:'0',  // reset
                   showMapIdx:-1});
    removeResilient(payload, payload, (item) => {
     	if(item != null) {
            global.targetBusinessEnter = '0'; // so we don't join again (without browser refresh)
     		this.setState({bShowBackdrop: '0', bShowNav:'0'});
    	    this.clearInLine();
    	    this.updateBusinessList("after leave", undefined, true);

	        // Notify the store that we've left, but not for an un-register
            if(!bRegistered) {
    	        var title = 'Someone has left your Safe Queue';
    	        var body  = ''; // TMI They may have driven away or simply removed themselves.';
    	        var sound = 'beep2.wav';
    	        this.sendPushToStore(this.state.joinProps, global.notificationNewLeave, title, body, sound);
            }
     	}
     	else {
     		// this error will happen if a user leaves a line, 
            // but does so after the manger has deleted him !
            // So we'll just ignore this one....
            global.targetBusinessEnter = '0'; // so we don't join again (without browser refresh)
            this.setState({bShowBackdrop: '0', bShowNav:'0'});
            this.clearInLine();
            this.updateBusinessList("after leave", undefined, true);
     	}
 	});
};

/*
 *   Leave a self-managed line, which notifies the next person in line
 */
selfManagedLeaveLine = (itemid, store, userMessage) => {
    var props = this.state.joinProps;
    const payload = {
        ...props,
           type:'Store',
           id: itemid
    };

    var title = "Thank You! Notifying the next person..."

    this.setState({bShowBackdrop: title,
                   bShowSelfManagedLeaveDialog:'0',
                   bShowMap:'0',
                   bInGracePeriod:'0',  // reset
                   showMapIdx:-1});
    removeResilient(payload, payload, (item) => {
        if(item != null) {
            global.targetBusinessEnter = '0'; // so we don't join again (without browser refresh)

            // Get the rest of the people in line to notify
            // TODO MAYBE...: There is a race here, if there is no one else in line, but then someone joins
            //       just after we do this query. That person then sits there forever, so the workaround
            //       is the user does an update (manually or from GPS update) which shows him to be the
            //       only one in line and so he notifies himself.  Whew.
            const storeItem = {
                type:'Store',
                name:store.name
            };

            searchResilient(storeItem, storeItem,  (results, payload) => {
                if(results != null) {

                    const sortedItems = results.sort((a, b) => {
                       var aq = parseInt(a.whenCreated);
                       var bq = parseInt(b.whenCreated);
                       return aq - bq;
                    });

                    // See QueueManagement.js for lengthy comments
                    // This code is copied from there (can't really reuse the code it seems)
                    var tonotify = new Array(); 
                    var offset = 0;

                    for(var i=0; i<sortedItems.length; i++) {
                        var titem = results[i];                      
                        var titemid = getUserIDFromContact(titem.contact);
                        if(titemid !== 'none@none.com')                   
                            tonotify.push(titem);
                    }

                    //console.log("tonotify has " + tonotify.length + " items. Offset= " + offset);

                    this.setState({sortedfilteredItems:[], singleItem:[], bWereDoneHere:'1',
                                   bShowBackdrop:'0',
                                   appBarTitle:MSG_THANK_YOU,
                                   bShowNotification:MSG_THANK_YOU_FOR_USING_SAFE_QUEUE});


                    // This is a bit different, since the "next" person should actually just go in,
                    // So, we'll bump everyone up

                    var type;
                    var title = ''; // Your Safe Queue has been updated.';
                    var body;
                    var sound;
                    for(var i=0; i<tonotify.length; i++) {
                        var titem = tonotify[i];

                        var itemstate = getStateFromState(titem.state);
                        if(itemstate !== 'notified') { // means notified to come in! So dont' send anything
                            if(i == 0) {
                                type = global.notificationYouAreNext;
                                sound = 'goin.wav';
                                body = 'You can go in now!';
                            }
                            else if(i == 1) {
                                type = global.notificationMoveUp;
                                sound = 'next.wav';
                                body = 'You are next in line!';
                            }
                            else if(i == 2) {
                                type = global.notificationMoveUp;
                                sound = 'second.wav';
                                body = 'You are now second in line!';
                            }
                            else if(i == 3) {
                                type = global.notificationMoveUp;
                                sound = 'third.wav';
                                body = 'You are now third in line!';
                            }
                            else {
                                type = global.notificationMoveUp;
                                sound = 'beep1.wav';
                                body  = 'The line has moved up.';
                            }

                            console.log("Sending push to " + getUserIDFromContact(titem.contact) + " " + i + " " + sound);
                            sendPush(titem, type, title, body, sound, webSocket);
                        }

                    }
                }
                else {
                    alert("ERROR getting the line list in Self-Managed leave");
                }
            });
        }
    });
};


canGetInLineFeet = (store, dist) => { 
    var radius = 1000;   // default to 1000 ft
    if((store.custom !== undefined) && (store.custom.radius !== undefined))
        radius = store.custom.radius;

    if(dist <= radius)
       return true;
    else
       return false;
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

getHeadingFromPoints(to, from) {
    var arrto = to.split(',');
    var tolat = arrto[0];
    var tolon = arrto[1];

    var arrfrom = from.split(',');
    var fromlat = arrfrom[0];
    var fromlon = arrfrom[1];

    return this.getHeadingFromLatLon(fromlat, fromlon, tolat, tolon);
}


// Converts from degrees to radians.
toRadians(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
toDegrees(radians) {
  return radians * 180 / Math.PI;
}

getHeadingFromLatLon(startLat, startLng, destLat, destLng ){
  startLat = this.toRadians(startLat);
  startLng = this.toRadians(startLng);
  destLat = this.toRadians(destLat);
  destLng = this.toRadians(destLng);

  let y = Math.sin(destLng - startLng) * Math.cos(destLat);
  let x = Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  let brng = Math.atan2(y, x);
  brng = this.toDegrees(brng);
  return (brng + 360) % 360;
}


deg2rad(deg) {
  return deg * (Math.PI/180)
}

runtest = () => {

  var lat = 33.74850178638623;
  var lon = -118.39797829951722;

 
  // latitude  is east-west
  // longitute is north-south
  // 
  // going north, latitude increases
  // going east, longitude increases


  //heading north
  var newlat = lat + .5;
  var newlon = lon;
  var heading = this.getHeadingFromLatLon(lat, lon, newlat, newlon);
  console.log("Going North  H: " + heading +  "  FROM:" + lat + "," + lon + "  TO:" + newlat + "," + newlon);

  //heading south
  newlat = lat - .5;
  newlon = lon;
  heading = this.getHeadingFromLatLon(lat, lon, newlat, newlon);
  console.log("Going South  H: " + heading +  "  FROM:" + lat + "," + lon + "  TO:" + newlat + "," + newlon);

 //heading east
  newlat = lat;
  newlon = lon + .5;
  heading = this.getHeadingFromLatLon(lat, lon, newlat, newlon);
  console.log("Going East   H: " + heading +  "  FROM:" + lat + "," + lon + "  TO:" + newlat + "," + newlon);

   //heading west
  newlat = lat;
  newlon = lon - .5
  heading = this.getHeadingFromLatLon(lat, lon, newlat, newlon);
  console.log("Going West   H: " + heading +  "  FROM:" + lat + "," + lon + "  TO:" + newlat + "," + newlon);

}



// distance from text points in "lat,lon" string format
distanceBetweenPointsInFeet = (point1, point2) => {
	var arr = point1.split(',');
    var lat1 = arr[0];
    var lon1 = arr[1];

    var arrme = point2.split(',');
    var lat1me = arrme[0];
    var lon1me = arrme[1];

    var distance = this.getDistanceFromLatLonInKm(lat1,lon1,lat1me,lon1me);
    distance *= 3.28084 * 1000;  // in feet
    return distance;
}

  distanceInMeters = (props) => {
        var arr = props.location.split(',');
        var lat1 = arr[0];
        var lon1 = arr[1];

        var arrme = this.state.deviceLocation.split(',');
        var lat1me = arrme[0];
        var lon1me = arrme[1];

        var distance = this.getDistanceFromLatLonInKm(lat1,lon1,lat1me,lon1me);
        return distance * 1000;
    };

 distanceAwayInFeet = (props) => {
      var distance = this.distanceInMeters(props);
      return distance * 3.28084;
  }

  // returns x ft or x mi
   distanceAwayDisplay = (props) => {
        if(this.state.deviceLocation === '0,0')  // we don't know our location
            return '??'

        var result;
        var feet = this.distanceAwayInFeet(props);

        // handle units
        if((props.units !== undefined) && (props.units === 'm')) {
        	// METERS
        	var meters = feet / 3.28084;
        	if(meters > 2000) {
	            meters = meters/1000;
	            result = meters.toFixed(0) + " km";
	        }
	        else if(meters > 1000) {
	            meters = meters/1000;
	            result = meters.toFixed(1) + " km";
	        }
	        else
	            result = meters.toFixed(0) + " m";
        }
        else {
        	// FEET
        	if(feet > 5280*10) {
        		// 10 miles
        		var miles = feet/5280;
	            result = miles.toFixed(0) + " mi";
        	}
	        else if(feet > 5280) {
	        	// 1 - 10 miles
	            feet = feet/5280;
	            result = feet.toFixed(1) + " mi";
	        }
	        else if(feet > 2000) {
	            feet = feet/5280;
	            result = feet.toFixed(1) + " mi";
	        }
	        else
	            result = feet.toFixed(0) + " ft";
	    }

        return result;
  }


/*
 *  Update the display!!
 */
updateBusinessList = (userMessage, targetBusiness, bCloseDialog, callback) => {

    if(bScannedInProgress) 
        return;  // if we've been scanned, there's no screen update needed

    if(targetBusiness === undefined) {
        // this means default to whatever is in the URL
        if(global.targetBusinessWildcard === '0') 
            targetBusiness = global.targetBusinessName;
    }

    //console.log("UpdateBusinessList for '" + targetBusiness + "   " + userMessage);

	const payload = {
      //...query,
        name: targetBusiness,
        location: this.state.deviceLocation
    };    

    searchResilient(payload, payload,  (results, payload) => {
        if(results != null) {

            this.sortandfilter(results, this.state.deviceLocation, false);

            textStartup = '';  // dont' display voice notification dialog
            if(item_me.name !== undefined)  // we're going to show one person
            {
                
                // Put up the voice notification dialog if we don't know yet
                if(this.state.bVoiceNotificationsEnabled === undefined) {
                    bSafariStartupPreloaded = false;
                    if(item_me.state === 'registerjoin')
                        textStartup = MSG_WAITING_TO_JOIN_SHORT + " " + item_me.name;
                    else if(item_me.state === 'registerpickup')
                        textStartup = MSG_WAITING_TO_CHECKIN_SHORT + " " + item_me.name;
                    else if(item_me.state === 'pickup')
                        textStartup = MSG_YOU_ARE_CHECKEDIN_AT + " " + item_me.name;
                    else if(item_me.state === 'notifiedpickup') {
                        textStartup = NOTE_YOUR_ORDER_IS_READY_AT + " " + item_me.name;  // standard message

                        var store = this.state.singleItem[0];
                        if((store !== undefined) && (store.custom !== undefined)) {
                            if((store.custom.pickupmessage !== undefined) && (store.custom.pickupmessage !== ''))
                               textStartup = store.custom.pickupmessage;
                        }
                    }
                    else if(item_me.state === 'notified') {
                        // get custom message
                        textStartup = MSG_GO_IN_NOW;  // standard message

                        var store = this.state.singleItem[0];
                        if((store !== undefined) && (store.custom !== undefined)) {
                            if((store.custom.notifymessage !== undefined) && (store.custom.notifymessage !== ''))
                               textStartup = store.custom.notifymessage;
                        }
                    }
                    else
                        textStartup = MSG_YOU_ARE_IN_LINE_AT + " " + item_me.name;


                    console.log("startup: " + textStartup)
                    /*
                    var tempitem = {...store};
                    tempitem.theRef = undefined;
                    console.log("STARTUP: " + JSON.stringify(tempitem))
                    */

                    //textStartup = "This is SafeQueue!";
                }
            }

            if(bCloseDialog) {
                this.setState({bShowNav:'1',
                	           bShowBackdrop:'0',
                               bShowJoinDialog:'0',
                               bShowLeaveDialog:'0',
                               textSafariStartup: textStartup,
                               pullHookState:'initial'});
                bJoinInProgress = false;
            }
            else 
                this.setState({bShowNav:'1',
                	           bShowBackdrop:'0',
                               textSafariStartup: textStartup,
                               pullHookState:'initial'});

            if(callback !== undefined)
                callback();
        }
        else {
            // Nothing we can do...
            // Alert.alert('Network Error', 'updateBusinessList failed.\n[customer]', [{text: 'OK'}]);
            if(bCloseDialog) {
	              this.setState({bShowBackdrop:'0',
                               bShowJoinDialog:'0',
                               bShowLeaveDialog:'0',
                               pullHookState:'initial'});
                bJoinInProgress = false;
    	      }
    	      else 
    	          this.setState({bShowBackdrop:'0',
    	                         pullHookState:'initial'});
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

// clear everything needed to reset the display to not in line
clearInLine = () => {
    nicknameEntered = '';
    smsEntered = '';
    userWasWarned = false;
    this.setState({showQRCode:'0',
                   isSelected:'0',
                   inlineWithMeItems:[],
                   inlineMe:'',
                   inlinePositionMe:'0',
                   singleItem:[]});
}


/* 
 * This does the real work of creating the visible list
 *
 * bLoccationUpdateOnly is used to update the visible list because of GPS change.
 * GPS updates can happen faster than we want to hit the server database, so that's
 * when the bLocationUpdateOnly would be set.
 */
sortandfilter = (items, loc, bLocationUpdateOnly) => {
        var arrme = (loc !== "") ? loc.split(',') : this.state.deviceLocation.split(',')
        var lat1me = arrme[0];
        var lon1me = arrme[1];

        if(items.length == 0)
            alert("No Safe Queues were found");

        if(bScannedInProgress) 
            return;  // if we've been scanned, there's no screen update needed

        // Sort all items from closest to farthest
        const sorteditems = items.sort((a, b) => {
            var arra = a.location.split(',');
            var lat1a = arra[0];
            var lon1a = arra[1];
            const aDist = this.getDistanceFromLatLonInKm(lat1a,lon1a,lat1me,lon1me);

            var arrb = b.location.split(',');
            var lat1b = arrb[0];
            var lon1b = arrb[1];
            const bDist = this.getDistanceFromLatLonInKm(lat1b,lon1b,lat1me,lon1me);

           return aDist - bDist;
        });

        // remove all the references...
        //myRefs = new Array();

        // find the stores we're dealing with here...
        var allStores = new Map();
        var blockedStores = new Array();
        for(var i=0; i<sorteditems.length; i++) {
            var sitem = sorteditems[i];
            var customer = getUserIDFromContact(sitem.contact);

            /* debug
            if(sitem.logo !== undefined)
                console.log("ITEM: " + sitem.name + " LOGO: " + sitem.logo.length);
            else
                console.log("ITEM: " + sitem.name + " LOGO: none");
            */
            //console.log("ITEM: " + sitem.name + "  " + sitem.id);

            // don't show the Beta Test database entry
            var uid = sitem.userID;
            if(uid === 'dave4522269')
                continue;
            if(uid === 'dave07234567')
                continue;

            // remove the stores I blocked
            if(sitem.state === 'flagged') {
                var fid = getAPNTokenFromContact(sitem.contact);
                if(fid === this.state.userID) {
                    // I blocked this store
                    blockedStores.push(sitem);
                }
                continue;  // skip over all "flagged" entries, as these are persons not stores
            }
            
            if(this.isStoreItself(sitem)) { // customer === "none@none.com") {
            	if(!bLocationUpdateOnly)
                	sitem.quantity = 0;   // don't clear the quantity, as this should already be correct
                allStores.set(sitem.name, sitem); 
            }
        }

        // remove blocked stores (by name comparison)
        for(var j=0; j<blockedStores.length; j++) {
            var bitem = blockedStores[j];

            for(const [key, value] of allStores.entries()) {
                if(key === bitem.name) {
                    // found it, now remove it
                    allStores.delete(bitem.name);
                    break;
                }
            }
        }
        blockedStores = new Array();  // start fresh

        // See if we're in line somewhere, as if so we'll collapse the list to just that
        // TODO: uses store name as equality (assumes uniqueness) so we'll change that to ID eventually
        var idStoreInline = '';   // til we know otherwise
        var nameStoreInline = ''; // til we know otherwise
        var inlineMe = '';        // til we know otherwise
        var nickname = '';
        var storeItem;

        var registeredStores = new Array();  // names of the stores we have registered with

        var finalitems = new Array();
        for(var k=0; k<sorteditems.length; k++) {
            var item = sorteditems[k];
            // look for already me in line...
            // I'm in line (or registered) if the contact field has my user ID
            var bRegistered = false;
            var contactID = getUserIDFromContact(item.contact);
            if(contactID === this.state.userID) {
                if((item.state === 'registerjoin') || (item.state === 'registerpickup')) {
                    // I'm not in line, but have registered to be notified when I'm close enough
                    registeredStores.push({"name":item.name, "type":item.state});
                    inlineMe = item['_id'];
                    nameStoreInline = item.name;
                }
                else {
                    //setInline('1');  // seems redundant now
                    inlineMe = item['_id'];
                    nameStoreInline = item.name;
                    storeItem = item;
                    // nickname is base64, so decode it
                    nickname = Buffer.from(item.description, 'base64').toString('binary');
                }
            }

            if(this.isStoreItself(item)) { // contactID === "none@none.com") {
                // This is a store
                // don't show the Beta Test database entry
                var uid = item.userID;

                // remove the stores I blocked
                if(item.state === 'flagged') {
                    var fid = getAPNTokenFromContact(item.contact);
                    if(fid === this.state.userID) {
                        // I blocked this store
                        blockedStores.push(item);
                    }
                    continue;  // skip over all "flagged" entries, as these are persons not stores
                }

                if((uid !== 'dave4522269') && (uid !== 'dave07234567'))
                    finalitems.push(item);   // only stores shown
            }
            else if(!bLocationUpdateOnly) {
                // This is someone in line for a store
                // Add him to the line count for that store
                // Don't add anyone just waiting to be notified when they come close enough
                // we could get people in line at a blocked store, so drop them
                var sitem = allStores.get(item.name);
                if((sitem !== undefined) && (item.state !== 'registerjoin') && (item.state !== 'registerpickup') &&
                    !this.isPickup(item)) {
                    sitem.quantity++;
                }
            }
        }

        // mark stores that I'm registered to wait for close-enough notification
        for(var i=0; i<finalitems.length; i++) {
            var storeitem = finalitems[i];

            for(var k=0; k<registeredStores.length; k++) {
                var reg = registeredStores[k];
                if(reg.name === storeitem.name) {
                    // we are registered with this store, so mark it
                    storeitem.registered = reg;
                    break;
                }
            }
        }
          
  /*
        // remove blocked stores (by name comparison)
        for(var i=0; i<blockedStores.length; i++) {
            var bitem = blockedStores[i];

            for(var k=0; k<finalitems.length; k++) {
                var fitem = finalitems[k];
                if(fitem.name == bitem.name) {
                    finalitems.splice(k, 1);  // removes the item
                    break;
                }
            }
        }
  */

        // If we're in line, then get the entire line and our position in it
        // This must look in the original list, since we've removed ourself form the sorted one
        if(nameStoreInline !== "") {
            var inlinePositionMe = 55555;
            var inlineWithMe = new Array();
            for(var n=0; n<items.length; n++) {
                var item = items[n];
                var itemid = getUserIDFromContact(item.contact);

                // Don't count users just waiting to be notified they are close enough
                contactID = getUserIDFromContact(item.contact);
                if((item.name === nameStoreInline) && !this.isStoreItself(item) && (item.state != 'registerjoin') && (item.state != 'registerpickup') &&
                   !this.isPickup(item)) {
                        // this is a customer waiting with us, including me
                        inlineWithMe.push(item)
                }
            }

            // Save the line (for updates) and sort it by whenCreated
            const sortedline = inlineWithMe.sort((a, b) => {
               var aq = parseInt(a.whenCreated);
               var bq = parseInt(b.whenCreated);
               return aq - bq;
            });


            // find my position in line
            item_me = undefined;  
            for(var m=0; m<sortedline.length; m++) {
               var litem = sortedline[m];
               contactID = getUserIDFromContact(litem.contact);
               if(contactID === this.state.userID)
               {
                   // this is me, I'm the i+1 person in line
                   inlinePositionMe = m;
                   item_me = litem;
                   break;  // I should only be there once  TODO: make sure this is true
               }
            }

            // If we are registered to auto-join, we won't be in the line,
            // so need to look for ourself in the larger line
            if(item_me === undefined) {
                // we are not in line but registered to auto-join
                // we have to look through the entire line
                for(var n=0; n<items.length; n++) {
                    var ritem = items[n];
                    // Don't count users just waiting to be notified they are close enough
                    contactID = getUserIDFromContact(ritem.contact);
                    if(contactID === this.state.userID)
                    {
                         // this is me
                         item_me = ritem;
                         break;  // I should only be there once  TODO: make sure this is true
                    }
                }
            }

            // Also, collapse the List to show just the store we are in line for
            var reallyfinalitems = new Array();
            for(i=0; i<finalitems.length; i++) {
                var item = finalitems[i];
                if(item.name === nameStoreInline) {
                    // BUT WAIT !!!  Make sure we didn't leave the area of the store
                    var store = item.location;
                    var me = this.state.deviceLocation;
                    var distM = this.distanceBetweenInMeters(me, store);

                    var bRegistered = false;
                    if(item.registered !== undefined)
                        bRegistered = true;

                    // Calulate the region we are in
                    var radius  = 1000;  // in feet
                    if((item.custom !== undefined) && (item.custom.radius !== undefined))
                        radius = item.custom.radius; 
                    var radiusM = (radius * 304.8)/1000;
                    var radiusLeadingEdgeM = 0.7 * radiusM;   // the edge where we warn
                    var radiusTrailingEdge = 1.1 * radiusM;   // the grace period we wait

                    var bCloseEnough = (distM <= radiusM);    // can join
                    var bInTheEdge   = ((distM < radiusM) && (distM > radiusLeadingEdgeM)); 
                    var bNotEdge     = (distM < radiusM/2);   // we close the in the edge warning here
                    var bTooFarAway  = (distM > radiusTrailingEdge);  // too far, including grace period
    
                    if(bRegistered) {
                        // Look for being close enough
                        // we can get GPS updates faster than the screen updates (so it seems),
                        // so we'll make sure we only autojoin once
                        if(bCloseEnough && !bPlayedAutoJoinSound && (this.state.bShowCloseEnoughDialog === '0')) {

                            bPlayedAutoJoinSound = true;  // prevents multiple plays

                            if(item.registered.type === 'registerpickup') {
                                var text = NOTE_THIS_IS_SAFE_QUEUE + " " + "You've been checked in at" + " " + item.name;
                                this.playSpeech(text);
                            }
                            else {
                                var text = NOTE_THIS_IS_SAFE_QUEUE + " " + NOTE_ADDED_AT + " " + item.name;
                                this.playSpeech(text);
                            }
                        
                            var message = NOTE_CLOSE_ENOUGH;
                            if(item.registered.type === 'registerjoin')
                                message = NOTE_ADDED; 
                            else if(item.registered.type === 'registerpickup')
                                message = "You've been checked in for pick-up!";
                            this.setState({bShowCloseEnoughDialog:message, joinProps:item});

                            // remove the registration entry in the databsase,
                            // which is the same as leaving
                            setTimeout(() => { this.autoJoinLine(item_me); }, 500); 
                            
                            var token = getAPNTokenFromContact(item_me.contact);
                            if(token.substring(0,4) === 'sms_') {
                                // send a text as well, if chosen by the user
                                setTimeout(() => {      
                                    var token = getAPNTokenFromContact(item_me.contact);
                                    if(token.substring(0,4) === 'sms_') {
                                        var type = "none";
                                        var title = ''; 
                                        var body = message;                               
                                        sendPush(item_me, type, title, body, "none.wav", undefined);
                                    }
                                }, 2000);
                            }

                            return;  // don't re-draw
                        }
                    }
                    else if(bInTheEdge && bMovingAwayFromStore) {
                        // we're in line and moving away from the store, warn the user (if we haven't already)
                        if(!didEdgeWarning && (this.state.bShowEdgeWarning === '0')) {
                            var max = radius + ' feet';
                            if((item.units !== undefined) && (item.units !== 'ft')) 
                                max = radiusM.toFixed(0) + ' m';
                            
                            var message = MSG_WARNING_YOU_WILL_BE_TAKEN_OUT + max + ".";
                            this.setState({bShowEdgeWarning:message, joinProps:item});
                            didEdgeWarning = true;
                            var text = NOTE_THIS_IS_SAFE_QUEUE + " " + NOTE_WARNING;
                            this.playSpeech(text)

                            // send a text as well, if necessary
                            var token = getAPNTokenFromContact(item_me.contact);
                            if(token.substring(0,4) === 'sms_') {
                                var type = "none";
                                var title = ''; 
                                var body = message;                               
                                sendPush(item_me, type, title, body, "none.wav", undefined);
                            }
                        }
                    }
                    else if(bTooFarAway) {
                        // we're moved away from the store, give a little extra space (10%)
                        // ignore registered notifications, as they will typically be too far away
                        if(!bRegistered) {
                            if(this.state.bShowLeftDialog === '0') { 
                                console.log("MOVED TOO FAR AWAY: " + distM + " - leaving the line");         
                                this.setState({bShowLeftDialog:'1', joinProps:item, bShowEdgeWarning:'0', bInGracePeriod:'0'});
                                this.leaveLine(item_me['_id'], item); 
                                didEdgeWarning = false;
                            }
                            return;
                        }
                    }
                    else {
                        // we're closer than the "edge" area
                        // take away the edge warning if we've gotten closer than 500 ft
                        if(didEdgeWarning && bNotEdge) {
                            // Okay, so we've come back toward the store. Remove the warning
                            this.setState({bShowEdgeWarning:'0'});
                            didEdgeWarning = false;
                        }
                    }

                    reallyfinalitems.push(item)
                    break;
                }
            }

            // Handle the self-managed line, where if I'm first in line, I act as if I were scanned
            var bSelfMangagedFirstInLine = false;
            if(storeItem !== undefined) {
                if(storeItem.features !== undefined)  {
                    if(storeItem.features.indexOf('|M') !== -1) {
                          // self manageed, now see if we're first in line
                          if(inlinePositionMe == 0)
                              bSelfMangagedFirstInLine = true;
                    }
                }
            }

            // There's a rare bug where:
            //    the display shows green "go in now" but then the display changes back to purple. 
            // We suspect this comes from a 'go in now' notification that changes the display
            // and then we end up here (probably from GPS update) but item_me.state is stale.
            // The fix (which appeared to work, as we did demonstrate it once:
            //    the notification code sets isSelected state variable to 1
            //    so we'll use that variable in addition to item_me.state

            // Check to see if I have a notification to go in the store
            // This could have come from the database state - as per item_me.state
            // or   could have come from a notification - as per this.state.isSelected
            if((item_me.state === 'notified') || (item_me.state === 'notifiedpickup') || (this.state.isSelected === '1') || bSelfMangagedFirstInLine) {

                var appTitle = MSG_YOU_ARE_IN_LINE;
                var goinTitle = MSG_GO_IN_NOW;

                // this could be a pickup 
                if(this.isPickup(item_me)) {
                    appTitle = NOTE_YOUR_ORDER_IS_READY;
                    goinTitle = MSG_READY;
                }
                
            	let time = moment(item_me.whenNotified).format('hh:mm A')
                this.setState({isSelected:'1',
                               singleItem:reallyfinalitems,
                               sortedfilteredItems:[],
                               QRCodeValue:this.state.userID, // this code is my user ID
                               inlinePositionMe:inlinePositionMe,  // 0-based
                               inlineMe:inlineMe,
                               showQRCode:'1',
                               joinNickanme:nickname,
                               bInGracePeriod:'0',  // if we got to go in while in grace period, clear grace period
                               bShowLeftDialog:'0',
                               countdown: goinTitle,
                               appBarTitle: appTitle,
                               bShowBtnSelfManagedLeave: bSelfMangagedFirstInLine ? '1' : '0',
                               whenNotified:MSG_YOU_WERE_NOTIFIED_AT + time});
            }
            else if(item_me.state === 'scanned') {
                // We were just scanned to clear everything !!

                // If this was a pickup, we need to prevent a browser refresh from joining the
                // pickup list again.  We'll save it away 
                if(this.isPickup(item_me)) {
                    console.log("Saving " + item_me.description + " to localStorage");
                    window.localStorage.setItem('@SafeQueuePickupComplete', item_me.description);
                }

                // We may have missed a notification of being scanned so handle it now
                // Go back the original line
                this.clearInLine();
                this.setState( { sortedfilteredItems: finalitems, appBarTitle:MSG_THANK_YOU } );
                setTimeout(function() { alert(MSG_THANK_YOU_FOR_USING_SAFE_QUEUE)}, 500);
            }
            else {
                //console.log("Setting list to N:" + reallyfinalitems.length);
                //console.log("I'm " + inlinePositionMe + " in line");

                // Let the user know the limitations of IOS/Safari and notifications
                // Until we get FCM on Chrome, show this for all devices
                var warn = '0';

                /* DON'T NEED THIS ANYMORE
                if(!userWasWarned) warn = (isIOS || isSafari || true) ? 'You are in line!' : '0';
                userWasWarned = true;
                */

                var newTitle = MSG_YOU_ARE_IN_LINE; 
                if(item_me.state === 'registerjoin')
                    newTitle = MSG_WAITING_TO_JOIN;
                else if(item_me.state == 'registerpickup')
                    newTitle = MSG_WAITING_TO_CHECKIN;

                // this could be a pickup 
                if(this.isPickup(item_me))
                    newTitle = MSG_WAITING_FOR_PICKUP;

                this.setState({QRCodeValue:this.state.userID,
                               showQRCode:'1',  // this code is my user ID
                               isSelected:'0',
                               joinNickanme:nickname,
                               inlineWithMeItems:sortedline,
                               inlinePositionMe:inlinePositionMe+1,  // 0-based
                               inlineMe:inlineMe,
                               sortedfilteredItems:[],
                               bShowJoinedInformation: warn,
                               appBarTitle:newTitle,
                               singleItem:reallyfinalitems}
                               );
            }
        }
        else {
            //console.log("Setting list to FULL:" + finalitems.length);

            // remove all the stores except one that was targeted in the URL
            if(global.targetBusinessName !== '') {
              	var targetedItems = new Array();  // possibly more than one I guess

                // we'll use the targetBusinessName as a wildcard, so any business with a name 
                // that includes the passed name will qualify.
                // This allows a business with multiple queues to show just theirs
              	for(var j=0; j<finalitems.length; j++) {
		            var fitem = finalitems[j];
		            //console.log("Candidate: " + fitem.name);
		            if(fitem.name.includes(global.targetBusinessName)) {
		            	targetedItems.push(fitem);
                    }
    		    }

                // enter the line only if there's only one response
                if((targetedItems.length === 1) && (global.targetBusinessEnter !== '0')) {
                    console.log("Joining the line from URL!");

                    if(fitem.state === 'closed') {
                        this.setState({bShowClosedDialog:'1', joinProps:fitem});
                    }
                    else {                    
                        var feet = this.distanceAwayInFeet(fitem);
                        var bCloseEnough = this.canGetInLineFeet(fitem, feet);

                        if(global.targetBusinessEnter === 'auto') {
                            // join with all defaults
                            if(bCloseEnough) {
                                this.setState({joinProps:fitem});
                                console.log("Automatically entering the line from URL!");
                                setTimeout(() => { this.joinLine(NotifyTypeNone); }, 500);
                            }
                            else {
                                this.setState({bShowJoinFutureDialog:'1', joinProps:fitem});
                            }
                        }
                        else if(global.targetBusinessEnter === '1') {
                            // ask to join the walk-in line
                            if(bCloseEnough)
                                this.setState({bShowJoinDialog:'1', joinProps:fitem});
                            else 
                                this.setState({bShowJoinFutureDialog:'1', joinProps:fitem});
                        }
                        else if(global.targetBusinessEnter === 'checkin') {
                            // show the checkin dialog
                            if(bCloseEnough) {
                                this.setState({joinProps:fitem});
                                console.log("Automatically checking in from URL!");
                                this.setState({bShowPickupDialog:'1', joinProps:fitem});
                            }
                            else {
                                this.setState({bShowPickupFutureDialog:'1', joinProps:fitem})
                            }
                        }
                        

                        /*

                        if(this.canGetInLineFeet(fitem, feet)) {
                            if(global.targetBusinessEnter === 'auto') {
                                // join without asking
                                this.setState({joinProps:fitem});
                                console.log("Automatically entering the line from URL!");
                                setTimeout(() => { 
                                    this.joinLine(NotifyTypeNone);                                        
                                }, 1000);
                            }
                            else if(global.targetBusinessEnter === 'checkin') {
                                // show the checkin dialog
                                this.setState({joinProps:fitem});
                                console.log("Automatically checking in from URL!");
                                this.setState({bShowPickupDialog:'1', joinProps:fitem});
                            }
                            else {
                                // ask to join
                                this.setState({bShowJoinDialog:'1', joinProps:fitem});
                            }
                        }
                        else {
                            this.setState({bShowCantJoinDialog:'1', joinProps:fitem});
                        }
                        */
                    }
                }

		        // just show everything if we didn't find the targeted store
		        if(targetedItems.length > 0)
			        this.setState( { sortedfilteredItems: targetedItems,
		            				 singleItem:[],
		                     		 showQRCode:'0',
		                     		 inlineWithMeItems:[],
		                     		 inlineMe:'',
		                     		 inlinePositionMe:'0',
		            				 appBarTitle:"Safe Queue" } );
			   	 else 
			   		this.setState( { sortedfilteredItems: finalitems,
		            				 singleItem:[],
		                     		 showQRCode:'0',
		                     		 inlineWithMeItems:[],
		                     		 inlineMe:'',
		                     		 inlinePositionMe:'0',
		            				 appBarTitle:TTL_SAFE_QUEUES_NEAR_YOU } );
            }
            else {
	            this.setState( { sortedfilteredItems: finalitems,
	            				 singleItem:[],
	                     		 showQRCode:'0',
	                     		 inlineWithMeItems:[],
	                     		 inlineMe:'',
	                     		 inlinePositionMe:'0',
	            				 appBarTitle:TTL_SAFE_QUEUES_NEAR_YOU } );
	          }
        }
  }

onChange = () => {
    console.log("onChange:" + this.state.pullHookState);
}

onLoad = () => {
    console.log("onLoad");
    this.setState( { pullHookState: 'action'});
    this.updateBusinessList("onLoad update", undefined, true);
}


addPullHook = () => {
return (
      <Ons.PullHook onChange={this.onChange} onLoad={this.onLoad}>
      {
         (this.state.pullHookState === 'initial') ?
              <span >
              </span> 
          :
          (this.state.pullHookState === 'preaction') ?
               <span>
                 Refresh your Safe Queues
               </span>
          :   
          <span><Spinner name="circle" color="black" /> Loading data...</span>
      }
      </Ons.PullHook>
    );
}


isPickup = (theItem) => {
    if((theItem.state === 'pickup') || (theItem.state === 'notifiedpickup'))
        return true;

    // KLUGE - a pickup and so has a description beginning with '#_'
    if((theItem !== undefined) && (theItem.description !== undefined) && (theItem.description !== '')) {
        var desc = Buffer.from(theItem.description, 'base64').toString('binary');
        var pre = desc.substring(0,2);
        if(pre === '#_') 
            return true;
        else
            return false;
    }

    return false;
}

isSelfManaged = (theItem) => {
    if(theItem === undefined) 
        return false;

    if(theItem.features !== undefined)  {
        if(theItem.features.indexOf('|M') !== -1) 
            return true;
        else 
            return false;
    }

    return false;
}


isStoreItself = (theItem) => {
    // The contact field for for a store has userId of none@none.com
    var userid = getUserIDFromContact(theItem.contact);
    if(userid === 'none@none.com') {
        // don't show the Beta Test database entry
        var uid = theItem.userID;
        if((uid === 'dave4522269') || (uid === 'dave07234567'))
            return false;

        return true;
    }
    else 
        return false;
}



getWebSocketIcon = () => {
    if(this.state.webSocketState === '***')
        return icon_good;
     else
        return icon_warning;
}

getVoiceNotificationState = () => {
    if(this.state.bVoiceNotificationsEnabled === undefined)
        return; // we don't know yet

    if(this.state.bVoiceNotificationsEnabled)
        return icon_audio_on  
     else
        return icon_audio_off;
}


drawNavigation = () => {
	if(this.state.bShowNav === '0')
		return 

  // we need an adjustment on the center item when the text is long
  // Not sure why, but different browsers and device center differently
  var marginLeft = 0;

  if(this.state.appBarTitle !== undefined) {
      if(isSafari) {
          if(this.state.appBarTitle.length > 25)
              marginLeft = -45;
          else if(this.state.appBarTitle.length > 15)
              marginLeft = -10;
      }
      else if(isAndroid) {
          if(this.state.appBarTitle.length > 25)
              marginLeft = 25;
          else if(this.state.appBarTitle.length > 15)
              marginLeft = 20;
      }
      else if(isChrome) {  // desktop chrome, not androis
          if(this.state.appBarTitle.length > 25)
              marginLeft = -45;
          else if(this.state.appBarTitle.length > 15)
              marginLeft = 0;
      }
  }

	return (
		<ons-toolbar style={{display: 'flex:1', justifyContent:'flex-start', alignItems:'center', backgroundColor:themeMainColor}}>
			<div class="left">
				{ this.state.singleItem.length > 0 &&
            <div>
			    <img style={{marginTop:12,marginLeft:4,height:20}} src={this.getWebSocketIcon()}/>
                <img style={{marginTop:13,marginLeft:4,height:18}} src={this.getVoiceNotificationState()}/>
                { /* navigator.onLine ? "ON" : "OFF" */ }
            </div>
				}
			</div>
			<div class="center">
            <Typography variant="title" style={{fontSize:'120%',color:'#FFFFFF'}}>
      			<div style={{marginLeft:marginLeft}}>{this.state.appBarTitle}</div>
            </Typography>   

    	</div>
    		 <div class="right">
    		 	{ global.targetBusinessName !== '' && 
    		 		<img style={{marginTop:16,marginRight:4,height:36}} src={icon_safequeue}/>
    		 	}
    		 </div>
    </ons-toolbar>
  );
}

drawWorldMap = () => {
    if(!this.state.bShowWorldMap)
        return;

    var height = 700;

    return (
         <WorldMapClass
          location={this.state.deviceLocation}
          stores={this.state.sortedfilteredItems}
          />
    )
}


render () {
	// appBar height is bigger on Android, than iOS (so it seems) so adjust here
	var offsetStyle;
	if(isAndroid)
		offsetStyle = {height:64,backgroundColor:'#F1F0EE'};
	else
		offsetStyle = {height:52,backgroundColor:'#F1F0EE'};

  var headingLabel = MSG_FINDING_SAFE_QUEUES;
  var headingSublabel = '';
  if(global.targetBusinessName !== '') {
      headingLabel = global.targetBusinessName;
      //headingSublabel = "Loading ...";
  }


  var splash = logo_safequeue;
  if(global.bSpanish)
      splash = logo_safequeue_es;

  return (
      <PageVisibility onChange={this.pageVisibilityCallback}>

      <div>

        { this.drawNavigation() }

      	<Ons.Page contentStyle={{padding: 0, maxWidth:414, display: 'block', marginLeft:'auto', marginRight:'auto'}}>
                {((this.state.sortedfilteredItems.length === 0) && (this.state.singleItem.length === 0))  ?
                    <div>
                    <img src={splash} style={{maxWidth:414,width:"100%", height:"100%",position:'absolute', marginLeft:"-0%"}}/>
                    </div>
                    :
                    <div>
                    </div>
                }

          <div className="App">
                { /* this.addPullHook()  doesn't seem to work */ }  

                { this.drawJoinDialog()}
                { this.drawPickupDialog()}
                { this.drawCantJoinDialog()}
                { this.drawJoinFutureDialog()}
                { this.drawPickupFutureDialog()}
                { this.drawCloseEnoughDialog()}
                { this.drawLeaveDialog()}
                { this.drawLeftDialog()}
                { this.drawEdgeWarning()}
                { this.drawClosedDialog()}
                { this.drawBackdrop()}
                { this.drawNotification()}
                { this.drawJoinedInformation()}
                { this.drawLostWebSocketHandler()}
                { this.drawErrorMessage()}
                { this.drawInformationMessage()}
                { this.drawSelfManagedLeaveDialog()}
                { this.drawPossiblePickupQRCode()}
                { this.drawVoiceNotificationAccept() }

                { /* this.drawWorldMap() */ }

                {((this.state.bWereDoneHere === '0') && (this.state.sortedfilteredItems.length === 0) && (this.state.singleItem.length === 0))  ?
                    <div>
                      <Ons.Button modifier="large--quiet" 
                          style={{color:"#FFFFFF"}} onClick={() => {  }}>
                          <div style={{transform:'none'}}>{headingLabel}</div>
                          { headingSublabel != '' &&
                              <div style={{transform:'none'}}>{headingSublabel}</div>
                          }
                          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                              <Spinner name="circle" color="white" />
                              { this.state.deviceLocation === '0,0' &&
                                    <div style={{transform:'none',marginLeft:8,fontSize:"80%"}}>{MSG_WAITING_FOR_GPS_INFORMATION}</div>
                              }
                              { (this.state.deviceLocation !== '0,0') && (global.userID !== null) &&
                                  <div style={{transform:'none',marginLeft:8,fontSize:"80%"}}>{MSG_LOADING_DATA}</div>
                              }
                              { (this.state.deviceLocation !== '0,0') && (global.userID === null) &&
                                  <div style={{transform:'none',marginLeft:8,fontSize:"80%"}}>Validating User ID...</div>
                              }
                          </div>
                      </Ons.Button>
                    </div>
                    :
                    <div>
                        {/* <Ons.Button modifier="large--cta" style={{fontSize:"150%",backgroundColor:themeMainColor}} onClick={() => {}}>Safe Queues</Ons.Button> */}
                    </div>
                }

           		  {/* offset after the appBar */}
                <div style={offsetStyle}></div>

        <audio id="customerplayer" src={this.state.notifcationSoundURL}>No Audio Support</audio>

                { this.state.singleItem.length > 0 && 
                    <PlainList
                        list={this.state.singleItem}
                        renderItem={this.renderItem}
                        wrapperHtmlTag="div"
                        // any html props for div tag
                        id="single-container"
                        style={{background: '#F1F0EE' /*"#7030A0"*/}}
                        onMouseOver={this.mouseOverHandler} // will attach events
                        ref={this.containerRef} // will forward ref
                    />
                }
                { this.state.singleItem.length === 0 && 
                    <PlainList  
                        list={this.state.sortedfilteredItems}
                        renderItem={this.renderItem}
                        wrapperHtmlTag="div"
                        // any html props for div tag
                        id="my-container"
                        style={{background: '#F1F0EE' /*"#7030A0"*/}}
                        onMouseOver={this.mouseOverHandler} // will attach events
                        ref={this.containerRef} // will forward ref
                    />
                }

                { global.targetBusinessName !== '' &&
                	<div style={{marginTop:20,color:themeMainColor,fontSize:'130%'}}><b>you're safe in our line</b></div>
            	}
          </div>
      </Ons.Page>
      </div>
      </PageVisibility>

    );
  }
}

export default Customer;



/* ORIGINAL
const Customer = () => {
    return (
       <div>
          <h1>Customer</h1>
           <p>Home page body content</p>
       </div>
    );
}
 
export default Customer;
*/