import React, { Component } from 'react';
import {
    Container,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Change to custom user table
import ReturnUserTable from './ReturnUserTable';
import { BASE_API_PATH, API_TIMEOUT } from '../../consts';
import LoadingSpinner from '../LoadingSpinner';

class Reports extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            returnUsers: null,
            loaded: false,
        }
        this.handleOnAll = this.handleOnAll.bind(this);
        this.handleOnAdmin = this.handleOnAdmin.bind(this);
        this.resetLoad = this.resetLoad.bind(this);
    }

    
    componentDidMount() {
        // Using all endpoint for now
        axios({
            method: 'get',
            url: `${BASE_API_PATH}/user/all/`,
            headers: { 'content-type': 'application/json' },
            timeout: API_TIMEOUT
        }).then(result => {
            this.setState({
                returnUsers: result.data.user,
                loaded: true,
            });
        }).catch(error => {
            this.setState({ 
                error: error.message,
                loaded: true, 
            });
        });
    }
    
    //Rests the load state, needed to refresh the report page
    resetLoad() {
        this.setState({
            loaded: false,
        });
    }

    //Changes path to assigned assets
    handleOnAdmin() {
        this.resetLoad();
        axios({
            method: 'get',
            url: `${BASE_API_PATH}/user/admin-users/`,
            headers: { 'content-type': 'application/json' },
            timeout: API_TIMEOUT
        }).then(result => {
            this.setState({
                returnUsers: result.data.user,
                loaded: true,
            });
        }).catch(error => {
            this.setState({ 
                error: error.message,
                loaded: true, 
            });
        });
    }

    //Changes path to assets all
    handleOnAll() {
        this.resetLoad()
        axios({
            method: 'get',
            url: `${BASE_API_PATH}/user/all/`,
            headers: { 'content-type': 'application/json' },
            timeout: API_TIMEOUT
        }).then(result => {
            this.setState({
                returnUsers: result.data.user,
                loaded: true,
            });
        }).catch(error => {
            this.setState({ 
                error: error.message,
                loaded: true, 
            });
        });
    }

    //Displays information on screen when render is done
    render() {
        let noLoaded = <div>No info loaded</div>;
        return (
            <Container className="my-3">
                <h1>Users</h1>
                <div className="my-3">
                    
                </div>
                <div className="d-flex my-3">
                    <Button className="mr-2" color="primary" onClick={this.handleOnAll}>
                        All Users
                    </Button>
                    <Button className="mx-2" color="primary" onClick={this.handleOnAdmin}>
                        Admin Users
                    </Button>
                </div>
                
                { this.state.loaded && this.state.returnUsers && <ReturnUserTable data={this.state.returnUsers} /> }

                <div className="d-flex">
                    { !this.state.loaded && <LoadingSpinner /> }
                    { this.state.loaded && !this.state.returnUsers && noLoaded }
                </div>
            </Container>
        );
    }
}

export default Reports;