import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
    UncontrolledAlert
} from 'reactstrap';
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import {
    API_TIMEOUT
} from '../../consts';
import Session from "../Session/Session.js";
import LoadingSpinner from "../LoadingSpinner";
import { login } from '../../helperFile';

class LoginBtn extends Component
{
    constructor(props) {
        super(props);
        
        // Setup state of control
        this.state = {
            modalToggle: false,
            id: "",
            password: "",
            api_token: "",
            login_user: null,
            loaded: true,
        };

        // Bind click events to their relevant functions
        this.handleToggleLoginModal = this.handleToggleLoginModal.bind(this);
        this.handleConfirmLogin = this.handleConfirmLogin.bind(this);
        this.handleConfirmSignout = this.handleConfirmSignout.bind(this);
    }

    componentDidMount() {
        var user = Session.loadUser();
        console.log("--- User Auth ---");
        console.log(user);
        if (user && user.api_token) {
            this.setState({
                api_token: user.api_token,
                login_user: {
                    name: user.user_id,
                    type: user.user_type,
                },
            });
        }
    }

    // Handles toggling the current state of the login modal
    handleToggleLoginModal() {
        console.log("Toggling Modal State");
        this.setState(state => ({
            modalToggle: !state.modalToggle
        }));
    }

    onSuccessfulLogin() {
        Session.setUser(this.state.api_token);
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }

    // Confirm the current login details and attempt a login
    handleConfirmLogin() {
        this.setState({
            loaded: false,
            error: "",
            success: false,
        });
        axios({
            method: 'POST',
            url: login(),
            headers: { 'content-type': 'application/json' },
            timeout: API_TIMEOUT,
            data: this.state,
        }).then(result => {
            console.log(result);
            this.setState({
                loaded: true,
                success: result.data.success,
                api_token: result.data.api_token,
                error: result.data.error,
            });
            if (this.state.success) {
                this.onSuccessfulLogin();
            }
        }).catch(error => {
            console.log(error);
            this.setState({ 
                loaded: true,
                success: error.success,
                error: error.message,
            });
        });
    }

    handleConfirmSignout() {
        Session.setUser(null);
        setTimeout(() => {
            this.setState({ 
                redirect: "/",
                api_token: null,
            });
        }, 1000);
        this.handleToggleLoginModal();
    }

    render() {
        return (
            <div className="my-auto mr-3">
                {
                    this.state.login_user && <Link className="my-auto mr-3" to='/profile'>
                                                <Button className="px-3" color="info">
                                                    <FontAwesomeIcon icon={faUser} />
                                                </Button>
                                            </Link>
                }
                <Button color="info" onClick={this.handleToggleLoginModal}>
                    {
                        this.state.login_user ? <div>
                                                    Hi {this.state.login_user.name}
                                                    <FontAwesomeIcon icon={faSignOutAlt} className="mx-2" />
                                                </div> 
                                                : 
                                                <div>
                                                    Login
                                                    <FontAwesomeIcon icon={faSignInAlt} className="mx-2" />
                                                </div>
                    }
                </Button>
                {/* Login Modal */}
                <Modal isOpen={this.state.modalToggle} onKeyPress={((e) => {if(e.which == 13) { this.handleConfirmLogin(); }})}>
                    <ModalHeader>
                        { this.state.login_user ? "Sign Out" : "Sign In" }
                    </ModalHeader>
                    <ModalBody>
                        {
                            this.state.login_user ?
                                <div>
                                    Are you sure you want to sign out?
                                </div>
                                :
                                <Form action="#">
                                    {
                                        this.state.success && <UncontrolledAlert color="success">Logged in successfully!</UncontrolledAlert>
                                    }
                                    {
                                        !this.state.success && this.state.error && <UncontrolledAlert color="danger">Error: {this.state.error}</UncontrolledAlert>
                                    }
                                    <FormGroup className="mb-2 mr-sm-2">
                                        <Label for="exampleId" className="mr-sm-2">User Id:</Label>
                                        <Input type="text" name="id" id="exampleId" placeholder="ABC123" 
                                            onChange={e => this.setState({ id: e.target.value })}/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="examplePassword" className="mr-sm-2">Password</Label>
                                        <Input type="password" name="password" id="examplePassword" placeholder="password" required 
                                            onChange={e => this.setState({ password: e.target.value })}/>
                                    </FormGroup>
                                </Form>
                        }
                    </ModalBody>
                    <ModalFooter>
                        {
                            this.state.login_user ?
                                                <div>
                                                    <Button className="mr-2" color="danger" onClick={this.handleConfirmSignout}>Confirm</Button>
                                                    <Button color="secondary" onClick={this.handleToggleLoginModal}>Cancel</Button>
                                                </div>
                                                :
                                                <div className="d-flex w-100">
                                                    {/* <a href="/register" className="mr-auto">
                                                        <Button color="primary">
                                                            Register
                                                        </Button>
                                                    </a> */}
                                                    {
                                                        !this.state.loaded && <LoadingSpinner small className="mr-auto"/>
                                                    }
                                                    <Button className="ml-auto" color="primary" onClick={this.handleConfirmLogin}>Confirm</Button>
                                                    <Button className="ml-2" color="secondary" onClick={this.handleToggleLoginModal}>Cancel</Button>
                                                </div>
                        }
                    </ModalFooter>
                </Modal>
                { this.state.redirect && <Redirect push to={this.state.redirect} /> }
            </div>
        );
    }
}

export default LoginBtn;