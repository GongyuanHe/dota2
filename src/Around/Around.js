import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';

import ReactGoogleMaps from './GoogleMap.js';
import Chat from './Chat.js';

class Around extends Component {
    constructor (props) {
        super(props);
        this.state = {
            center: { lat: 31.216610, lng: 121.387506 },
        };
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
            <div className="container" >
                <div style={styles.container}>
                    <Chat />
                </div>
                <div>
                    <ReactGoogleMaps center={this.state.center}/>
                </div>
            </div>
        )
    }
}

const styles = ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
    }
})
export default geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(Around);
