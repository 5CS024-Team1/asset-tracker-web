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
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import {
    BASE_API_PATH,
    API_TIMEOUT
} from '../../consts';
import Session from "../Session/Session.js";
import LoadingSpinner from "../LoadingSpinner";

class LoginBtn extends Component
{
    constructor(props) {
        super(props);
        
        // Setup state of control
        this.state = {
            modalToggle: false,
            email: "",
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
            url: `${BASE_API_PATH}/user/login/`,
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
            window.location.replace("/");
        }, 1000);
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
                <Modal isOpen={this.state.modalToggle}>
                    <ModalHeader>
                        { this.state.login_info ? "Sign In" : "Sign Out" }
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
                                        <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="username@email.com" 
                                            onChange={e => this.setState({ email: e.target.value })}/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="examplePassword" className="mr-sm-2">Password</Label>
                                        <Input type="password" name="password" id="examplePassword" placeholder="" required 
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
                                                    <a href="/register" className="mr-auto">
                                                        <Button color="primary">
                                                            Register
                                                        </Button>
                                                    </a>
                                                    {
                                                        !this.state.loaded && <LoadingSpinner small className="my-auto"/>
                                                    }
                                                    <Button className="mr-2" color="primary" onClick={this.handleConfirmLogin}>Confirm</Button>
                                                    <Button color="secondary" onClick={this.handleToggleLoginModal}>Cancel</Button>
                                                </div>
                        }
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default LoginBtn;