import React, { Component } from 'react';
 
import '../App.css';

import Manager  from './Manager';


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

import {
  // isBrowser,
  // isMobile,
  //isChrome,
  isAndroid
} from "react-device-detect";


global.materialclasses = null;


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

let columns = 1;


class MetaManager extends Component {

  	constructor(props) {
    	super(props);

      if(columns !== undefined)
          columns = props.columns;

	    this.state = {  
          bShowSafeQueue: '0',
          bShowConfirmDialog: '0',
          bShowErrorMessage: '0',
          bShowBackdrop: '0',
          confirmCallback: null,
          confirmDialogTitle: '',
          confirmDialogSubtitle: ''
	    };

      this.boxRef = React.createRef();
  	}

  	componentWillMount() {
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
		              <div style={{display:'flex:1',  direction:'column', justifyContent:'space-evenly', alignItems:'center',paddingBottom:16}}>
		              		<div style={{marginBottom:16}}>{this.state.backdropSubtitle}</div>
		                  	<CircularProgress variant="indeterminate" size={24} color="primary" thickness={4} />
		              </div>
		          </DialogContent>
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
          <DialogTitle id="form-dialog-title">{this.state.confirmDialogTitle}</DialogTitle>
          <DialogContent>
                <div>{this.state.confirmDialogSubtitle}</div>
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


/*
 *  This is the entire screen
 */
render () {

  console.log("Render: MetaManager: columns:" + columns)
  var sw = window.innerWidth;

  // target is to get as many columns as passed in props.columns
  var width = sw/columns;
  var minwidth = 1024/3;

  if(width >= 414)
      width = 414;
  else if(width >= 375)
      width = 375;
  else 
      width = minwidth;

/*
  // how many columns can we get at 414 and 375
  var columns414 = sw/414;
  var columns375 = sw/375;

  // we target 3 wide
  var width;
  if(columns414 >= 3)
      width = sw/3;
  else if(columns375 >= 3) 
      width = sw/3
  else
      width = 1024/3;  // worst case... 
*/

	return (
		<div>
      { this.drawConfimDialog() }
      { this.drawErrorMessage() }
      { this.drawBackdrop() }

			 <Ons.Page contentStyle={{padding: 0, display: 'block', marginLeft:'auto', marginRight:'auto'}}>
          <Grid container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center">  
              <Grid item>
                  <Grid container
                      direction="column"
                      justify="flex-start"
                      alignItems="center">
                      <Grid item>
                          <iframe width={width} height='700'  
                              src='./?dest=manager' 
                              allow="geolocation"
                              frameborder='0'>
                          </iframe>  
                      </Grid>
                  </Grid>
              </Grid>
              { columns >= 2 && 
              <Grid item>
                  <Grid container
                      direction="column"
                      justify="flex-start"
                      alignItems="center">
                      <Grid item>
                          <iframe width={width} height='700'  
                              src='./?dest=manager' 
                              allow="geolocation"
                              frameborder='0'>
                          </iframe>  
                      </Grid>
                  </Grid>
              </Grid>
              }
              { columns >= 3 && 
                <Grid item>
                   <Grid container
                      direction="column"
                      justify="flex-start"
                      alignItems="center">
                      <Grid item>
                          <iframe width={width} height='700'  
                              src='./?dest=manager' 
                              allow="geolocation"
                              frameborder='0'>
                          </iframe>  
                      </Grid>
                  </Grid>
                </Grid>
              }
          </Grid>
      </Ons.Page>
		</div>
	);
}
}
 
export default MetaManager;