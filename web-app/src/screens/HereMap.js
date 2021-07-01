// src/DisplayMapClass.js
import * as React from 'react';

import mappin      from '../images/mappin.png';
import mappin_red  from '../images/mappin_red.png';
import mappin_blue from '../images/mappin_blue.png';


import Button from '@material-ui/core/Button';

const markerRed = `
<svg width="22px" height="31px" viewBox="0 0 22 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M11,1 C5.00584111,0.922155833 0.0822937842,5.71590055 0,11.71 C0.0025279372,14.0375734 0.776170498,16.2987196 2.2,18.14 L11,31 L19.8,18.14 C21.2238295,16.2987196 21.9974721,14.0375734 22,11.71 C21.9177062,5.71590055 16.9941589,0.922155833 11,1 Z" id="outerPath" fill="#DA1E28"></path>
  <path d="M11,7 C8.23857625,7 6,9.23857625 6,12 C6,14.7614237 8.23857625,17 11,17 C13.7614237,17 16,14.7614237 16,12 C16,10.6739176 15.4732158,9.40214799 14.5355339,8.46446609 C13.597852,7.5267842 12.3260824,7 11,7 Z" id="innerPath" fill="#FFFFFF"></path>
</svg>
`.trim();


const markerBlue = `
<svg width="22px" height="31px" viewBox="0 0 22 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M11,1 C5.00584111,0.922155833 0.0822937842,5.71590055 0,11.71 C0.0025279372,14.0375734 0.776170498,16.2987196 2.2,18.14 L11,31 L19.8,18.14 C21.2238295,16.2987196 21.9974721,14.0375734 22,11.71 C21.9177062,5.71590055 16.9941589,0.922155833 11,1 Z" id="outerPath" fill="#1062FE"></path>
  <path d="M11,7 C8.23857625,7 6,9.23857625 6,12 C6,14.7614237 8.23857625,17 11,17 C13.7614237,17 16,14.7614237 16,12 C16,10.6739176 15.4732158,9.40214799 14.5355339,8.46446609 C13.597852,7.5267842 12.3260824,7 11,7 Z" id="innerPath" fill="#FFFFFF"></path>
</svg>
`.trim();


const H = window.H;

const TYPE_ME       = 200;
const TYPE_BUSINESS = 201;
const TYPE_BOTH     = 202;
const TYPE_NONE     = 203;  // this means the user hasn't selected anything so we'll do what we think is best
var selectedDisplayType = TYPE_NONE; // default

var blueIcon;

/*
 * Simple translation to spanish
 */
var BTN_YOU;
var BTN_BUSINESS;
var BTN_BOTH;

const setLanguage = (lang) => {

  var bSpanish = (lang === 'es') ? true : false;

  // Button titles
  BTN_YOU      = !bSpanish ? "YOU" : "USTED";
  BTN_BUSINESS = !bSpanish ? "BUSINESS" : "NEGOCIOS";
  BTN_BOTH     = !bSpanish ? "BOTH" : "AMBOS";
}



export class DisplayMapClass extends React.Component {
  mapRef = React.createRef();

  state = {
      // The map instance to use during cleanup
      map: null,
      userLocation: '',
      userHeading:180,  // due north at top of screen
      markerCustomer: undefined,
      markerBusiness: undefined,
      iconCustomer: null,
      radius: 777,
      circle: undefined
  };

  componentDidMount() {
  
    const platform = new H.service.Platform({
        apiKey: process.env.REACT_APP_HERE_APIKEY
    });

    /*
    console.log("storeLocation: " + this.props.storeLocation);
    console.log("storeName: " + this.props.storeName);
    console.log("userLocation: " + this.props.userLocation);
    console.log("userHeading: " + this.props.userHeading);
    */

    setLanguage(global.bSpanish ? 'es' : 'en');

    // Create our red-drop icon (the business)
    var loc = this.props.storeLocation;
    var arr = loc.split(',');
    var lat = arr[0];
    var lon = arr[1];
    console.log("the business LOC: " + loc);
    
    var redicon = new H.map.Icon(markerRed, {
                      anchor: new H.math.Point(11, 31),
                      size: new H.math.Size(22, 31)
    });
    var markerBusiness = new H.map.Marker({lat:lat, lng:lon}, {icon: redicon});

    // Optionally, create a blue-drop icon (the customer
    var markerCustomer = null;
    var iconCustomer = null;
    var lat1;
    var lon1;
    var heading = 180; // default to north at top
    if(this.props.userLocation !== undefined) {
        // we will display the user's location
        console.log("user LOC: " + this.props.userLocation);

        var arr1 = this.props.userLocation.split(',');
        lat1 = arr1[0];
        lon1 = arr1[1];

        if((lat1 === undefined) || (lon1 === undefined)) {
            console.log("ERROR: userLocation is malformed:" + this.props.userLocation);
            lat1 = 0.0;
            lon1 = 0.0;
        }

        iconCustomer = new H.map.Icon(markerBlue, {
                  anchor: new H.math.Point(11, 31),
                  size: new H.math.Size(22, 31)
        });
        markerCustomer = new H.map.Marker({lat:lat1, lng:lon1}, {icon: iconCustomer});

        if((this.props.userHeading !== undefined) && (this.props.userHeading !== null)) 
            heading = this.props.userHeading;

        // always start heading north
        heading = 180;

        blueIcon = iconCustomer; 
    }

    // Create an instance of the map at the location
    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
        this.mapRef.current,
        defaultLayers.vector.normal.map,
        //defaultLayers.raster.satellite.map,
        {
            //center: { lat: lat, lng: lon },
            //zoom: 10,  
            pixelRatio: window.devicePixelRatio || 1,
            padding: {top: 80, left: 80, bottom: 120, right: 80}
        }
    );

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    if(markerCustomer !== null) {
        // display both customer and business
        map.addObject(markerBusiness);
        this.addDomMarker(map, this.props.storeName, lat, lon);

        map.addObject(markerCustomer);

        var bbox = new H.geo.Rect(lat,lon,lat1,lon1);
        map.getViewModel().setLookAtData({
            bounds: bbox,
        });

        /*
        map.getViewModel().setLookAtData({
            heading:heading
        });
        */  

        selectedDisplayType = TYPE_BOTH;  // prevents re-centering when GPS location changes
    }
    else {
        // display just the business
        this.addDomMarker(map, this.props.storeName, lat, lon);
        map.addObject(markerBusiness);

        map.setCenter({lat:lat, lng:lon});
        map.setZoom(16);
        selectedDisplayType = TYPE_BUSINESS;  // prevents re-centering when GPS location changes
    }

    // show the close-enough region in the themeMainColor
    var newcircle = undefined;
    if(this.props.nocircle === undefined) 
        newcircle = this.createCircle(map, lat, lon, this.props.radius);

    this.setState({ 
        map: map,
        markerCustomer: markerCustomer,
        markerBusiness: markerBusiness,
        iconCustomer: iconCustomer,
        circle: newcircle,
        userheading:heading,
        radius:this.props.radius
    });   
}

createCircle = (map, lat, lon, radius) => {
    var themeMainColor = global.themeMainColor;
    var rs = themeMainColor.substring(1,3);
    var gs = themeMainColor.substring(3,5);
    var bs = themeMainColor.substring(5,7);
    var r = parseInt(rs, 16);
    var g = parseInt(gs, 16);
    var b = parseInt(bs, 16);

    var radiusInMeters = (radius * 304.8)/1000; 
    // console.log("createCircle Using radius in Meters: " + radiusInMeters )
  
    var newcircle = map.addObject(new H.map.Circle(
        // The central point of the circle is the business
        {lat:lat, lng:lon},
        //{radius},
        //304.8,  // 1000 feet in meters
        radiusInMeters,
        {
          style: {
            strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
            lineWidth: 0,
            fillColor: 'rgba('+ r + ',' + g + ',' + b + ', 0.25)' // Color of the circle
          }
        }
    ));

    return newcircle;
}
  

getDistanceFromLatLonInMiles = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km

    return d * 0.621371;  // convert to miles
}

deg2rad = (deg) => {
    return deg * (Math.PI/180)
}


componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if(this.props.userLocation !== undefined) {
        if(this.props.userLocation !== prevProps.userLocation) {
            // First, update my location on the map
            this.state.map.removeObject(this.state.markerCustomer);
            var arr1 = this.props.userLocation.split(',');
            var lat1 = arr1[0];
            var lon1 = arr1[1];
            var markerCustomer = new H.map.Marker({lat:lat1, lng:lon1}, {icon: this.state.iconCustomer});
            this.state.map.addObject(markerCustomer);
            this.setState({markerCustomer: markerCustomer});

            // update the heading
            if(selectedDisplayType === TYPE_BOTH) {
                 this.state.map.getViewModel().setLookAtData({
                    heading:180
                });
            }
            else {
                this.state.map.getViewModel().setLookAtData({
                    heading:this.state.userHeading
                });
            }

            if(this.props.displayType === "ME") {
                this.state.map.setZoom(16);
                selectedDisplayType = TYPE_ME;
            }

            if((selectedDisplayType === TYPE_ME) ||
               (selectedDisplayType === TYPE_NONE)) {
                // User is tracking himself, so we'll move the map if we're about to go offscreen
                var center = this.state.map.getCenter();
                var moved = this.getDistanceFromLatLonInMiles(lat1,lon1,center.lat,center.lng);
                if(moved > 0.16) {
                    this.state.map.setCenter({lat:lat1, lng:lon1}, true);  // true means animate transition 
                    // this.centerOnMe();
                }
            }
        }
    }

    if(this.props.storeLocation !== prevProps.storeLocation) {
        // we're moving the location of the store
        this.state.map.removeObject(this.state.markerBusiness);
        var loc = this.props.storeLocation;
        var arr = loc.split(',');
        var lat = arr[0];
        var lon = arr[1];
        console.log("NEW STORE LOC: " + loc);
        
        var redicon = new H.map.Icon(markerRed, {
                          anchor: new H.math.Point(11, 31),
                          size: new H.math.Size(22, 31)
        });
        var markerBusiness = new H.map.Marker({lat:lat, lng:lon}, {icon: redicon});
        this.state.map.addObject(markerBusiness);
        this.state.map.setCenter({lat:lat, lng:lon});
        this.state.map.setZoom(16);
        selectedDisplayType = TYPE_BUSINESS;  // prevents re-centering when GPS location changes
        this.setState({markerBusiness:markerBusiness});
    }

    if(this.props.radius !== undefined) {
        //console.log("UPDATE: state:" + this.state.radius)
        //console.log("UPDATE: props:" + this.props.radius)
        //console.log("UPDATE: prevprops:" + prevProps.radius)
        if(this.props.radius !== prevProps.radius) {
            this.redrawRadius()
        }
    }
}


shouldComponentUpdate(props, state) {
    return true;

    /*
    // Only update if the customer is being shown
    if((this.props.userLocation !== undefined) || (this.props.radius !== undefined))
        return true;
    else 
        return false;
      */
}

  componentWillUnmount() {
      // Cleanup after the map to avoid memory leaks when this component exits the page
      this.state.map.dispose();
  }

  centerOnMe = () => {
      selectedDisplayType = TYPE_ME;
      var arr1 = this.props.userLocation.split(',');
      var lat1 = arr1[0];
      var lon1 = arr1[1];
      this.state.map.setCenter({lat:lat1, lng:lon1});
      this.state.map.setZoom(16);

      this.state.map.getViewModel().setLookAtData({
          heading:this.state.userHeading
      });
  }

  centerOnBusiness = () => {
      selectedDisplayType = TYPE_BUSINESS;
      var loc = this.props.storeLocation;
      var arr = loc.split(',');
      var lat = arr[0];
      var lon = arr[1];
      this.state.map.setCenter({lat:lat, lng:lon});
      this.state.map.setZoom(16);
      this.state.map.getViewModel().setLookAtData({
          heading:this.state.userHeading
      });
  }

  centerOnBoth = () => {
      selectedDisplayType = TYPE_BOTH;
      var loc = this.props.storeLocation;
      var arr = loc.split(',');
      var lat = arr[0];
      var lon = arr[1];
      var arr1 = this.props.userLocation.split(',');
      var lat1 = arr1[0];
      var lon1 = arr1[1];
      var bbox = new H.geo.Rect(lat,lon,lat1,lon1);
      this.state.map.getViewModel().setLookAtData({
            bounds: bbox
      });


      this.state.map.getViewModel().setLookAtData({
          heading:180
      });

      //this.state.map.getViewModel().setLookAtData({
      //    heading:this.state.userHeading
      //});
  }

  redrawRadius = () => {
      //console.log("Redraw radius: " + this.props.radius)
      this.state.map.removeObject(this.state.circle);
      var loc = this.props.storeLocation;
      var arr = loc.split(',');
      var lat = arr[0];
      var lon = arr[1];
      var newcircle = this.createCircle(this.state.map, lat, lon, this.props.radius);
      this.state.circle = newcircle;
  }


/*
 * Creates a text Marker for the name of a business
 * Also adds it to the map
 */
addDomMarker = (map, text, lat, lon) => {

    if((text === undefined) || (text === ''))
        return;

    var outerElement = document.createElement('div'),
        innerElement = document.createElement('div');

    // this is a good try, but will leave text flowing off the right edge
    var sw = window.innerWidth;
    var textWidth = (sw * 0.8)/2;

    outerElement.style.userSelect = 'none';
    outerElement.style.webkitUserSelect = 'none';
    outerElement.style.msUserSelect = 'none';
    outerElement.style.mozUserSelect = 'none';
    outerElement.style.cursor = 'default';

    innerElement.style.color = global.themeMainColor;
    //innerElement.style.backgroundColor = 'blue';
    //innerElement.style.border = '2px solid black';
    innerElement.style.font = 'normal 14px arial';
    innerElement.style.lineHeight = '14px'
    innerElement.style.opacity = 1.0;


    innerElement.style.paddingTop = '2px';
    innerElement.style.paddingLeft = '4px';
    innerElement.style.width = textWidth + 'px';
    //innerElement.style.height = '20px';
    innerElement.style.textAlign = 'left';
    // add negative margin to inner element
    // to move the anchor to center of the div
    innerElement.style.marginTop = '-10px';
    innerElement.style.marginLeft = '3px';
    innerElement.style.textTransform = 'none';

    outerElement.appendChild(innerElement);

    // Add text to the DOM element
    innerElement.innerHTML = '<b>' + text + '</b>';

    function changeOpacity(evt) {
      evt.target.style.opacity = 0.6;
    };

    function changeOpacityToOne(evt) {
      evt.target.style.opacity = 1;
    };

    //create dom icon and add/remove opacity listeners
    var domIcon = new H.map.DomIcon(outerElement, {
      // the function is called every time marker enters the viewport
      onAttach: function(clonedElement, domIcon, domMarker) {
        clonedElement.addEventListener('mouseover', changeOpacity);
        clonedElement.addEventListener('mouseout', changeOpacityToOne);
      },
      // the function is called every time marker leaves the viewport
      onDetach: function(clonedElement, domIcon, domMarker) {
        clonedElement.removeEventListener('mouseover', changeOpacity);
        clonedElement.removeEventListener('mouseout', changeOpacityToOne);
      }
    });

    // Marker for Chicago Bears home
    var bearsMarker = new H.map.DomMarker({lat: lat, lng: lon}, {
      icon: domIcon
    });
    map.addObject(bearsMarker);
}


  render() {
    var width = (this.props.width === undefined) ? "100%" : this.props.width;
    var height = (this.props.height === undefined) ? "300px" : this.props.height;

    var themeMainColor = global.themeMainColor;

    var offset = 20;  // to avoid the HERE copyright phrase
    var off = 360 - offset;
    var color = "#D0D0D0A0";

    var marginFix = -8;

    return (
      <div>
          <div ref={this.mapRef} style={{ height:height, width:width }} />

          { this.props.userLocation !== undefined && 
            // Tricky below. Positioning the buttons on top of the map is done by
            // puttig them below the map, then moving them up with a negative marginTop.
            // All this is requried because absolute positioning at the "bottom" is really
            // the bottom of the container of the map, which varies in size.
            // So, we position the buttons relative to the map always.
            <div>
              <Button variant="outlined" 
                    style={{width:80, height:36, position:'absolute', left:20, zIndex:9, marginTop:-50,backgroundColor:color}}
                    onClick={(e) => {
                        e.stopPropagation();
                        this.centerOnMe();
                    }}>
                  <img src={mappin_blue} height="20"/>
                  { true && <div style={{color:'#404040',fontSize:'100%',padding:0,marginLeft:4}}>{BTN_YOU}</div>  }
              </Button>
              <Button variant="outlined" 
                    style={{width:110, height:36, position:'absolute', left:110, zIndex:9, marginTop:-50,backgroundColor:color}}
                    onClick={(e) => {
                        e.stopPropagation();
                        this.centerOnBusiness();
                    }}>
                  <img src={mappin_red} height="20"/>
                  {true && <div style={{color:'#404040',fontSize:'100%',marginLeft:4}}>{BTN_BUSINESS}</div> }
              </Button>
              <Button variant="outlined" 
                    style={{width:100, height:36, position:'absolute', right:20, zIndex:9, marginTop:-50,backgroundColor:color}}
                    onClick={(e) => {
                        e.stopPropagation();
                        this.centerOnBoth();
                    }}>
                  <img src={mappin_red} height="20"/>
                  <img src={mappin_blue} height="20"/>
                  {true && <div style={{color:'#404040',fontSize:'100%',marginLeft:4}}>{BTN_BOTH}</div> }
              </Button>

              { false && 
                <div>
                <Button variant="outlined" 
                      style={{width:40, height:40, position:'absolute', right:4, zIndex:9, marginTop:-168,backgroundColor:themeMainColor}}
                      onClick={(e) => {
                          e.stopPropagation();
                          // go up by 5
                          var ch = this.state.userHeading;
                          ch += 5;
                          this.state.map.getViewModel().setLookAtData({
                              heading:ch
                          });
                          this.setState({userHeading:ch});
                      }}>
                    <div style={{color:'#FFFFFF',fontSize:'100%',padding:4}}>UP</div> 
                </Button>
                <Button variant="outlined" 
                      style={{width:40, height:40, position:'absolute', right:4, zIndex:9, marginTop:-212,backgroundColor:themeMainColor}}
                      onClick={(e) => {
                          e.stopPropagation();
                          // go down by 5
                          var ch = this.state.userHeading;
                          ch -= 5;
                          this.state.map.getViewModel().setLookAtData({
                              heading:ch
                          });
                          this.setState({userHeading:ch});

                      }}>
                    <div style={{color:'#FFFFFF',fontSize:'100%',padding:4}}>DOWN</div> 
                </Button>
                </div>
              }
            </div>
          }

          { this.props.userLocation === undefined && 
              <Button variant="outlined" 
                    style={{width:110, height:36, position:'absolute', 
                            left:0,right:0,marginLeft:'auto',marginRight:'auto',
                            zIndex:9, marginTop:-50,backgroundColor:color}}
                    onClick={(e) => {
                        e.stopPropagation();
                        this.centerOnBusiness();
                    }}>
                  <img src={mappin_red} height="20"/>
                  {true && <div style={{color:'#404040',fontSize:'100%',marginLeft:4}}>{BTN_BUSINESS}</div> }
              </Button>
          }

      </div>
    );
  }
}
