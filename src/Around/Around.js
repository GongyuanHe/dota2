import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';

import ReactGoogleMaps from './GoogleMap.js';

class Around extends Component {
    constructor () {
        super();
        this.state = {
            center: { lat: 31.216610, lng: 121.387506 },
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.coords){
            this.setState({
                center: { lat: nextProps.coords.latitude, lng: nextProps.coords.longitude }
            });
        }
    }
    render () {
        return(
            <div style={styles.container}>
                <ReactGoogleMaps center={this.state.center}/>
            </div>
        )
    }
}
const styles = ({
    container: {

    }
})

export default geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(Around);
