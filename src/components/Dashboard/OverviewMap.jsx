import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import {
    UncontrolledAlert
} from "reactstrap";

import {
    API_TIMEOUT,
    GOOGLE_MAPS_API_KEY
} from "../../consts";
import { allAssets } from "../../helperFile";
import Session from "../Session/Session.js";
import LoadingSpinner from '../LoadingSpinner';

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
            assets: null,
            loaded: false,
            error: null,
            map: {
                center: { 
                    lat: 52.5860628, 
                    lng: -2.1263473
                },
                zoom: 8,
            }
        }
    }

    componentDidMount() {
        if ( Session.isSignedIn() ) {
            axios({
                method: 'GET',
                url: allAssets(),
                headers: { 
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + Session.getUser().api_token, 
                 },
                timeout: API_TIMEOUT
            }).then(result => {
                this.setState({
                    assets:  result.data.assets,
                    loaded: true,
                    error: result.data.error,
                });
                console.log(this.state);
            }).catch(error => {
                this.setState({ 
                    error: error.message,
                    loaded: true, 
                });
            });   
        }
    }

    renderAssets() {
        if (!this.state.assets)
            return;

        this.state.assets.map((asset, index) => {
            return (
                <AssetMarker lat={asset.latitude} lng={asset.longitude} text={asset.display_name} />
            );
        });
    }

    render() {
        return (
            <div className="w-100 h-100">
                { this.state.loaded && this.state.error && 
                    <UncontrolledAlert color="danger">
                        Error Occured!: {this.state.error}
                    </UncontrolledAlert>
                }
                { !this.state.loaded && <LoadingSpinner /> }
                {
                    this.state.assets && this.state.loaded &&
                        <GoogleMapReact
                        bootstrapURLKeys={{
                            key: GOOGLE_MAPS_API_KEY,
                        }}
                        defaultCenter={this.state.map.center}
                        defaultZoom={this.state.map.zoom}>
                            { 
                                this.state.assets.map((asset, index) => {
                                    return ( <AssetMarker key={asset.id} lat={asset.latitude} lng={asset.longitude} text={"#"+asset.id +" "+ asset.display_name} /> );
                                })
                            }
                    </GoogleMapReact>
                }
                
            </div>
        );
    }
}

export default OverviewMap;