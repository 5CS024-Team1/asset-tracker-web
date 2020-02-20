import React, { Component } from 'react';
import {
    Container,
    Table,
    Button,
    Col, Row,
    Jumbotron,
} from 'reactstrap';
import axios from 'axios';
import {
    BASE_API_PATH
} from "../../../consts";
import IndiAssetMap from '../AllAssets/IndiAssetMap';

// Element for "/asset/:assetId?"
// Displays full information about a specific asset
// WIP

function AssetIndiControl(props) {
    return (
        <Row >
            <Col md={2}>
                <h5>{props.deviceName}</h5>
            </Col>
            <Col md={2}>
                <h5>{props.deviceID}</h5>
            </Col>
        </Row>
    );
}

//Will link to DB to collect data
function AssetProperties(props) {
    return (
        <div>
            <Row >
                <Col md={4}>
                    <h6>Device Name:</h6>
                </Col>
                <Col md={8}>
                    <div>{props.deviceName}</div>
                </Col>
            </Row>
            <Row >
                <Col md={4}>
                    <h6>ID:</h6>
                </Col>
                <Col md={8}>
                    <div>{props.deviceID}</div>
                </Col>
            </Row>
            <Row >
                <Col md={4}>
                    <h6>Current Location:</h6>
                </Col>
                <Col md={8}>
                    <div>{props.deviceLocation}</div>
                </Col>
            </Row>
            <Row >
                <Col md={4}>
                    <h6>Owner Name:</h6>
                </Col>
                <Col md={8}>
                    <div>{props.deviceOwner}</div>
                </Col>
            </Row>
            <Row >
                <Col md={4}>
                    <h6>Origin:</h6>
                </Col>
                <Col md={8}>
                    <div>{props.deviceOrigin}</div>
                </Col>
            </Row>
            <Row >
                <Col md={4}>
                    <h6>County:</h6>
                </Col>
                <Col md={8}>
                    <div>{props.deviceCounty}</div>
                </Col>
            </Row>
        </div>
    );
}

class SingleAsset extends Component 
{
    constructor(props) {
        super(props);
        
        const { params } = this.props.match;
        this.state = {
            id: params.assetId
        };
        console.log("Asset ID: " + this.state.id);
    }

    componentDidMount() {
        /// Retrieve correct asset from database
        axios({
            method: 'get',
            // No api set up currently, being left for now
            url: `${BASE_API_PATH}/singleasset`,
            headers: { 'content-type': 'application/json' },
        }).then(result => {
            console.log(result);
            this.setState({
                assetId: result.data.assetId,
                assetIdLoaded: true,
            });
        }).catch(error => {
            console.log(error);
            this.setState({
                assetIdLoaded: true,
                assetId: "?",
                error: error.message,
            })
        })
    }

    render() {
        return (
            <Container className="my-3">
                <h1>Device</h1>
                <AssetIndiControl deviceName="Walking Stick" deviceID="#001" />
                <Row>
                    <Col md={6} className="h-100">
                        <Row>
                            <Jumbotron className="w-100">
                                <AssetProperties deviceName="Walking Stick" deviceID="1" deviceLocation="Wolverhampton, UK" deviceOwner="John Doe" deviceOrigin="Russels Hall Hospital" deviceCounty="West Midlands"/>
                            </Jumbotron>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <div className="w-100 h-100">
                            <IndiAssetMap />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SingleAsset;