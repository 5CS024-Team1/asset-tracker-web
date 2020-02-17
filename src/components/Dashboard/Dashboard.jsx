import React, { Component } from 'react';
import {
    Container,
    Col, Row,
    Jumbotron,
} from 'reactstrap';

import QuickNavigate from "./QuickNavigate";
import RecentDevices from "./RecentDevices";
import OverviewMap from "./OverviewMap";

function AssetStatusControl(props) {
    return (
        <Row >
            <Col md={6}>
                <h5>{props.onlineAmount}</h5>
                <div>Online</div>
            </Col>
            <Col md={6}>
                <h5>{props.offlineAmount}</h5>
                <div>Offline</div>
            </Col>
        </Row>
    );
}

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assetStatus: {
                online: 0,
                offline: 0
            },
            recentAssets : [ ],
        }
    }
    
    render() {
        return (
            <Container className="my-3">
                <Row>
                    <Col md={6} className="h-100">
                        <Row>
                            <Jumbotron className="w-100">
                                <AssetStatusControl onlineAmount="2" offlineAmount="5" />
                            </Jumbotron>
                        </Row>
                        <Row>
                            <Jumbotron className="w-100">
                                <QuickNavigate />
                            </Jumbotron>
                        </Row>
                        <Row>
                            <Jumbotron className="w-100">
                                <RecentDevices />
                            </Jumbotron>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <Jumbotron className="w-100 h-100 mb-0 p-3">
                            <OverviewMap />
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Dashboard;