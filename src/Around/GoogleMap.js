import _ from 'lodash';
import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MyGoogleMap = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB46tr670WOrTiblIuPGJhV0lglAPnyVWE',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props=>(
    <GoogleMap defaultZoom={15} center={props.center}>
        <Marker position={props.center} />
    </GoogleMap>
));

const enhance = _.identity;

class ReactGoogleMaps extends React.Component {
    render () {
        return (
            <MyGoogleMap center={this.props.center} key="map"/>
        );
    }
}

export default enhance(ReactGoogleMaps);