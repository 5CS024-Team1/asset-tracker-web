import React, { Component } from 'react';
import {
    Container,
    Col, Row,
    Jumbotron,
    UncontrolledAlert,
} from 'reactstrap';

import RecentDevices from "./RecentDevices";
import OverviewMap from "./OverviewMap";
import axios from 'axios';

import {
    API_TIMEOUT
} from "../../consts";
import { allAssets } from '../../helperFile';
import Session from "../Session/Session.js";
import LoadingSpinner from '../LoadingSpinner';

function StatsControl(props) {
    return (
        <Row>
            <Col md={6} className="mx-auto">
                { 
                    props.assetsTotal 
                    ? <div><h5 className="text-center">{props.assetsTotal}</h5><div className="text-center">Registered Assets</div></div> 
                    : <LoadingSpinner className="mx-auto" medium /> 
                }
            </Col>
            <Col md={6}>
                {
                    props.assignedTotal
                    ? <div><h5 className="text-center">{props.assignedTotal}</h5><div className="text-center">Assigned to Patients</div></div>
                    : <LoadingSpinner medium />
                }
            </Col>
            
        </Row>
    );
}

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: allAssets(),
            headers: { 
                'content-type': 'application/json',
                'authorization': 'Bearer ' + Session.getUser().api_token, 
            },
            timeout: API_TIMEOUT,
        }).then(result => {
            console.log(result);
            this.setState({
                loaded: true,
                totalAssets: result.data.assets.length,
                totalAssigned: result.data.assets.filter(function (value) {
                    return value.date_loaned != null ? value : null;
                }).length,
            });
        }).catch(error => {
            console.log(error);
            this.setState({
                loaded: true,
                error: error.message,
            })
        });
    }
    
    render() {
        return (
            <Container className="container-full-width">
                { this.state.error && this.state.loaded && <UncontrolledAlert color="danger">Error: {this.state.error}</UncontrolledAlert> }
                <Row className="h-100">
                    <Col md={6}>
                        <Row>
                            <Jumbotron className="w-100">
                                <StatsControl assetsTotal={this.state.totalAssets} assignedTotal={this.state.totalAssigned} />
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