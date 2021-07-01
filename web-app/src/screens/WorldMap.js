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

var blueIcon;

/*
 * Simple translation to spanish
 */
const setLanguage = (lang) => {
  var bSpanish = (lang === 'es') ? true : false;
}



export class WorldMapClass extends React.Component {
  mapRef = React.createRef();

  state = {
      // The map instance to use during cleanup
      map: null,
      margin:0,
  };

  componentDidMount() {
  
    const platform = new H.service.Platform({
        apikey: "vYb6CK_C2mfI-bgLTmKKXIdu_qqhhQgDSLtqEyTH68A"
    });

    setLanguage(global.bSpanish ? 'es' : 'en');

    var redicon = new H.map.Icon(markerRed, {
                      anchor: new H.math.Point(11, 31),
                      size: new H.math.Size(22, 31)
    });

    // Create an instance of the map at the location
    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
        this.mapRef.current,
        //defaultLayers.vector.normal.map,
        defaultLayers.raster.satellite.map,
        {
            //center: {lat:38.711133, lng:-177.115640},
            //center: { lat: lat, lng: lon },
            //zoom: 10,  
            pixelRatio: window.devicePixelRatio || 1,
            //padding: {top: 80, left: 80, bottom: 120, right: 80}
            //padding: {top: 80, left: 80, bottom: 120, right: 80}

        }
    );

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    console.log("Got " + this.props.stores.length + " Stores")
    var minLat = 1000000000;
    var maxLat = 0;
    var minLon = 1000000000;
    var maxLon = 0;

    for(var i=0; i<this.props.stores.length; i++) {
        var titem = this.props.stores[i];  

        var loc = titem.location;
        var arr = loc.split(',');
        var lat = arr[0];
        var lon = arr[1];    

        if(lat < minLat) minLat = lat;
        if(lat > maxLat) maxLat = lat;
      
        if(lon < minLon) minLon = lon;
        if(lon > maxLon) maxLon = lon;

        var markerBusiness = new H.map.Marker({lat:lat, lng:lon}, {icon: redicon});
        map.addObject(markerBusiness);
    }

    /*
    var bbox = new H.geo.Rect(minLat,minLon,maxLat,maxLon);
        map.getViewModel().setLookAtData({
            bounds: bbox,
    });
    */

    var bbox = new H.geo.Rect(53.143643,-129.661951,  -39.744994,151.412260);
    map.getViewModel().setLookAtData({
            bounds: bbox,
    });
    
   //map.setZoom(0);


    /*
    if(markerCustomer !== null) {
        // display both customer and business
        map.addObject(markerBusiness);
        this.addDomMarker(map, this.props.storeName, lat, lon);

        map.addObject(markerCustomer);

        var bbox = new H.geo.Rect(lat,lon,lat1,lon1);
        map.getViewModel().setLookAtData({
            bounds: bbox,
        });


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
    */

    this.setState({ 
        map: map,
    });   
}


componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
}


shouldComponentUpdate(props, state) {
    console.log("should update")
    return false;
}

componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
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

    var sh = window.innerHeight;
    sh *= 0.9;

    var width = (this.props.width === undefined) ? "1024px" : this.props.width;
    var height = (this.props.height === undefined) ? sh + "px" : this.props.height;

    /*
    setTimeout(() => {

       var arr1 = this.props.location.split(',');
       var lat1 = arr1[0];
       var lon1 = arr1[1];

        this.state.map.setCenter({lat:lat1, lng:lon1});
        this.state.map.setZoom(16);

            /*
            console.log("DO: " + this.state.margin)
            if(this.state.margin < -1000) {
              var newmargin = this.state.margin - 50;
              if(newmargin < -1000)
                newmargin = 0;
              this.setState({margin:newmargin})
            }
            * /
    }, 5000);
*/

    return (
      <div style={{marginLeft:this.state.margin}}>
          <div ref={this.mapRef} style={{ height:height, width:width }} />
      </div>
    );
  }
}
