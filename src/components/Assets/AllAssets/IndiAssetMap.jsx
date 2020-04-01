import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {
    GOOGLE_MAPS_API_KEY
} from "../../../consts";

function AssetMarker(props) {
    return (
        <div style={{
            color: 'white', 
            background: 'grey',
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translate(-50%, -50%)'
          }} className="p-2">
            {props.text}
          </div>
    );
}

class IndiAssetMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assetName: this.props.assetName,
            map: {
                center: { 
                    lat: props.latitude,
                    lng: props.longitude,
                },
                zoom: 13
            }
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.latitude !== this.props.latitude 
            && prevProps.longitude !== this.props.longitude) {
          this.setState({
                assetName: this.props.assetName,
                map: {
                    center: { 
                        lat: this.props.latitude,
                        lng: this.props.longitude,
                    },
                    zoom: 13
                }
          });
        }
      }

    render() {
        return (
            <div className="w-100 h-100">
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: GOOGLE_MAPS_API_KEY,
                    }}
                    center={this.state.map.center}
                    defaultZoom={this.state.map.zoom}>
                    <AssetMarker 
                        lat={this.state.map.center.lat} 
                        lng={this.state.map.center.lng}
                        text={this.state.assetName} />
                </GoogleMapReact>
            </div>
        );
    }
}

export default IndiAssetMap;