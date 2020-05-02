import React, { Component } from 'react';
import {
    Container,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    UncontrolledAlert,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import "./reports.css";
import ReturnTable from './ReturnTable';
import { BASE_API_PATH, API_TIMEOUT } from '../../consts';
import LoadingSpinner from '../LoadingSpinner';

import {allAssets, assignedAssets} from '../../helperFile';
import Session from "../Session/Session.js";

function PageBreadcrumbs() {
    return (
        <Breadcrumb className="mt-1">
            <BreadcrumbItem>
                <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
                Reports
            </BreadcrumbItem>
        </Breadcrumb>
    );
}

class Reports extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            returnAssets: null,
            loaded: false,
        }
        this.handleOnAll = this.handleOnAll.bind(this);
        this.handleOnAssigned = this.handleOnAssigned.bind(this);
        this.resetLoad = this.resetLoad.bind(this);
    }

    
    componentDidMount() {
        if ( Session.isSignedIn() ) {
            // Using all endpoint for now
            axios({
                method: 'get',
                url: allAssets(),
                headers: { 
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + Session.getUser().api_token, 
                 },
                timeout: API_TIMEOUT
            }).then(result => {
                this.setState({
                    returnAssets: result.data.assets,
                    loaded: true,
                });
            }).catch(error => {
                this.setState({ 
                    error: error.message,
                    loaded: true, 
                });
            });
        }
    }
    
    //Rests the load state, needed to refresh the report page
    resetLoad() {
        this.setState({
            loaded: false,
        });
    }

    //Changes path to assigned assets
    handleOnAssigned() {
        if ( Session.isSignedIn() ) {
            this.resetLoad();
            axios({
                method: 'get',
                url: assignedAssets(),
                headers: { 
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + Session.getUser().api_token, 
                 },
                timeout: API_TIMEOUT
            }).then(result => {
                console.log(result.data);
                this.setState({
                    returnAssets: result.data.assets,
                    loaded: true,
                });
            }).catch(error => {
                this.setState({ 
                    error: error.message,
                    loaded: true, 
                });
            });
        }
    }

    //Changes path to assets all
    handleOnAll() {
        if ( Session.isSignedIn() ) {
            this.resetLoad()
            axios({
                method: 'get',
                url: allAssets(),
                headers: { 
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + Session.getUser().api_token, 
                 },
                timeout: API_TIMEOUT
            }).then(result => {
                console.log(result.data);
                this.setState({
                    returnAssets: result.data.assets,
                    loaded: true,
                });
            }).catch(error => {
                this.setState({ 
                    error: error.message,
                    loaded: true, 
                });
            });
        }
    }

    //Displays information on screen when render is done
    render() {
        let noLoaded = <div>No info loaded</div>;
        return (
            <div className="mx-5">
                { this.state.loaded && this.state.error && <UncontrolledAlert color="danger" className="my-3">Error: {this.state.error}</UncontrolledAlert> }
                <PageBreadcrumbs />
                <h1>Reports</h1>
                <div className="my-3">
                    
                </div>
                <div className="d-flex my-3">
                    <Button className="mr-2" color="primary" onClick={this.handleOnAll}>
                        All
                    </Button>
                    <Button className="mx-2" color="primary" onClick={this.handleOnAssigned}>
                        Assigned Assets
                    </Button>
                    <Link to="/reports/calendar" className="ml-auto">
                        <Button color="primary">
                            Collection Calendar
                        </Button>
                    </Link>
                </div>
                
                { this.state.loaded && this.state.returnAssets && <ReturnTable data={this.state.returnAssets} /> }

                <div className="d-flex">
                    { !this.state.loaded && <LoadingSpinner /> }
                    { this.state.loaded && !this.state.returnAssets && noLoaded }
                </div>
            </div>
        );
    }
}

export default Reports;