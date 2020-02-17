import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

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
          }}>
            {props.text}
          </div>
    );
}

class OverviewMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assets: [ ],
            map: {
                center: { 
                    lat: 52.5860628, 
                    lng: -2.1263473
                },
                zoom: 13
            }
        }
    }

    render() {
        return (
            <div className="w-100 h-100">
                <GoogleMapReact
                    defaultCenter={this.state.map.center}
                    defaultZoom={this.state.map.zoom}>
                    <AssetMarker 
                        lat={this.state.map.center.lat} 
                        lng={this.state.map.center.lng}
                        text={'Example Asset'} />
                </GoogleMapReact>
            </div>
        );
    }
}

export default OverviewMap;