import React, { Component } from 'react';
import { 
    Container, 
    UncontrolledAlert,
    Breadcrumb,
    BreadcrumbItem,
    Input, Label,
    Form, FormGroup,
    Button,
    Row, Col
} from 'reactstrap';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import Session from "../Session/Session.js";
import {
    BASE_API_PATH,
    API_TIMEOUT,
} from "../../consts";
import LoadingSpinner from '../LoadingSpinner/index.js';
import {getUser} from '../../helperFile';


function PageBreadcrumbs() {
    return (
        <Breadcrumb className="mt-1">
            <BreadcrumbItem>
                <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Link to="/users">Users</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Edit User</BreadcrumbItem>
        </Breadcrumb>
    );
}

class EditUser extends Component {
    constructor(props) {
        super(props);
        
        // Get asset id from Path parameters
        const { params } = this.props.props.match;
        this.state = {
            loaded: false,
            error: "",
            user: null,
            id: params.userId,
            user_Username: "",
            user_newEmail: "",
            user_newType: "",
        };

        this.handleSubmitEdits = this.handleSubmitEdits.bind(this);
    }

    componentDidMount() {
        if ( Session.isSignedIn() ) {
            axios({
                method: 'GET',
                url: getUser(this.state.id),
                headers: { 
                    'content-type': 'application/json', 
                    'authorization': 'Bearer ' + Session.getUser().api_token, 
                },
                timeout: API_TIMEOUT
            }).then(result => {
                this.setState({
                    loaded: true,
                    error: result.data.error,
                    user: result.data.user,
                    user_Username: result.data.user ? result.data.user.Username : "",
                    user_newEmail: result.data.user ? result.data.user.admin_email : "",
                    user_newType:  result.data.user ? result.data.user.admin_type : "",
                    pass_new: "",
                    pass_newCheck: "",
                });
            }).catch(error => {
                console.log(error);
                this.setState({ 
                    error: error.message,
                    loaded: true, 
                });
            });
        }
    }

    handleSubmitEdits() {
        console.log(this.state);
        axios({
            method: 'POST',
            url: `${BASE_API_PATH}/user/edit/`,
            headers: { 
                'content-type': 'application/json', 
            },
            data: this.state,
            timeout: API_TIMEOUT
        }).then(result => {
            console.log(result);
            this.setState({
                loaded: true,
                success: result.data.success
            });
            if (this.state.success) {
                setTimeout(() => {
                    this.setState({ redirect: "/users" });
                }, 1000);
            } else {
                this.setState({
                    error: "Unable to set new user data. Refresh and try again"
                });
            }
        }).catch(error => {
            console.log(error);
            this.setState({ 
                error: error.message,
                loaded: true, 
            });
        });
    }

    render() {
        return (
            <Container>
                { this.state.error && this.state.loaded && <UncontrolledAlert color="danger" className="my-2">Error: {this.state.error}</UncontrolledAlert> }
                { this.state.success && <UncontrolledAlert color="success" className="my-2">Successfully set new changes!</UncontrolledAlert>}
                <PageBreadcrumbs />
                <h1>Edit User {this.state.userId}</h1>
                
                { !this.state.loaded && <LoadingSpinner className="my-3"/> }
                { 
                    this.state.loaded && this.state.user &&
                    <Form>
                        <FormGroup row>
                            <Label for="newId" md={2}>Id:</Label>
                            <Col>
                                <Input type="text" name="text" id="newId" placeholder="User ID"
                                    value={this.state.user.admin_id} 
                                    disabled
                                    md={10}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="newName" md={2}>Username:</Label>
                            <Col>
                                <Input type="text" name="text" id="newName" placeholder="Username" 
                                    value={this.state.user.user_Username} 
                                    onChange={e => this.setState({ user_Username: e.target.value })}
                                    md={10}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                        <Label for="newPermission" md={2}>Permission Level:</Label>
                            <Col>
                                <Input type="select" name="account" id="newPermission" value={this.state.user_newType} onChange={ e => this.setState({ user_newType: e.target.value }) } md={10}>
                                    <option value="normal">Normal</option>
                                    <option value="admin">Admin</option>
                                </Input>
                            </Col>
                        </FormGroup>
                    </Form>
                }

                <h4>Reset Users Password</h4>
                <Row className="mt-3">
                    <Col md={6}>
                        <p>Set a new password for this user.</p>
                        <Form>
                            <FormGroup>
                                <Label for="newPassword">New Password</Label>
                                <Input type="password" name="password" id="newPassword" placeholder="New password" 
                                    onChange={e => this.setState({ pass_new: e.target.value })}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="newPasswordRetype">Retype New Password</Label>
                                <Input type="password" name="password" id="newPasswordRetype" placeholder="Retype new password" 
                                    onChange={e => this.setState({ pass_newCheck: e.target.value })}/>
                            </FormGroup>
                            <Link to="/users">
                                <Button color="secondary">Cancel</Button>
                            </Link>
                            <Button color="primary"  className="mx-3" onClick={this.handleSubmitEdits}>Submit</Button>
                        </Form>
                    </Col>
                </Row>
                { this.state.redirect && <Redirect push to={this.state.redirect}/> }
            </Container>
        );
    }
}

export default EditUser;