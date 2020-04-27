import React, { Component } from 'react';
import {
    Container,
    Button,
    UncontrolledAlert,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Change to custom user table
import ReturnUserTable from './ReturnUserTable';
import { BASE_API_PATH, API_TIMEOUT } from '../../consts';
import LoadingSpinner from '../LoadingSpinner';

import {allUsers, adminUsers} from '../../helperFile';

function PageBreadcrumbs() {
    return (
        <Breadcrumb className="mt-1">
            <BreadcrumbItem>
                <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Users</BreadcrumbItem>
        </Breadcrumb>
    );
}

class Reports extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            users: null,
            admins: null,
            loaded: false,
            error: "",
        }
        this.handleOnAll = this.handleOnAll.bind(this);
        this.handleOnAdmin = this.handleOnAdmin.bind(this);
        this.resetLoad = this.resetLoad.bind(this);
    }

    
    componentDidMount() {
        // Using all endpoint for now
        axios({
            method: 'get',
            url: allUsers(),
            headers: { 'content-type': 'application/json' },
            timeout: API_TIMEOUT
        }).then(result => {
            console.log(result.data);
            this.setState({
                users: result.data.users,
                admins: null,
                loaded: true,
                
                error: result.data.error,
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
            url: adminUsers(),
            headers: { 'content-type': 'application/json' },
            timeout: API_TIMEOUT
        }).then(result => {
            console.log(result.data);
            this.setState({
                admins: result.data.admins,
                users: null,
                loaded: true,

                error: result.data.error,
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
            url: allUsers(),
            headers: { 'content-type': 'application/json' },
            timeout: API_TIMEOUT
        }).then(result => {
            console.log(result.data);
            this.setState({
                users: result.data.users,
                admins: null,
                loaded: true,

                error: result.data.error,
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
                { this.state.loaded && this.state.error && <UncontrolledAlert color="danger">Error: {this.state.error}</UncontrolledAlert>}
                <PageBreadcrumbs />
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
                    <Link to="/users/register" className="ml-auto">
                        <Button color="primary">
                            Register a new user
                        </Button>
                    </Link>
                </div>
                
                {/* Table for all Users */}
                { this.state.loaded && this.state.users && !this.state.admins && <ReturnUserTable data={this.state.users} /> }

                {/* Table for only Admins */}
                { this.state.loaded && this.state.admins && !this.state.users && <ReturnUserTable data={this.state.admins} /> }

                <div className="d-flex">
                    { !this.state.loaded && <LoadingSpinner /> }
                    { this.state.loaded && !this.state.users && !this.state.admins && noLoaded }
                </div>
            </Container>
        );
    }
}

export default Reports;