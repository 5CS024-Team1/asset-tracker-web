import React, { Component } from 'react';
import {
    Container,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ReturnTable from './ReturnTable';
import { BASE_API_PATH, API_TIMEOUT } from '../../consts';
import LoadingSpinner from '../LoadingSpinner';

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
        // Using all endpoint for now
        axios({
            method: 'get',
            url: `${BASE_API_PATH}/assets/all/`,
            headers: { 'content-type': 'application/json' },
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
    
    resetLoad() {
        this.setState({
            loaded: false,
        });
    }

    handleOnAssigned() {
        this.resetLoad()
        axios({
            method: 'get',
            url: `${BASE_API_PATH}/assets/assigned-assets/`,
            headers: { 'content-type': 'application/json' },
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

    handleOnAll() {
        this.resetLoad()
        axios({
            method: 'get',
            url: `${BASE_API_PATH}/assets/all/`,
            headers: { 'content-type': 'application/json' },
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

    render() {
        let noLoaded = <div>No info loaded</div>;
        return (
            <Container className="my-3">
                <h1>Reports</h1>
                <div className="my-3">
                    <Link to="/reports/calendar">
                        <Button color="primary">
                            Collection Calendar
                        </Button>
                    </Link>
                </div>
                <div className="my-3">
                    <Button color="primary" onClick={this.handleOnAll}>
                        All
                    </Button>
                </div>
                <div className="my-3">
                    <Button color="primary" onClick={this.handleOnAssigned}>
                        Assigned Assets
                    </Button>
                </div>
                { this.state.loaded && <ReturnTable data={this.state.returnAssets} /> }

                <div className="d-flex">
                    { !this.state.loaded && <LoadingSpinner /> }
                    { this.state.loaded && !this.state.returnAssets && noLoaded }
                </div>
            </Container>
        );
    }
}

export default Reports;