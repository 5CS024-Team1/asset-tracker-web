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
    Label
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

class LoginBtn extends Component
{
    constructor(props) {
        super(props);
        
        // Setup state of control
        this.state = {
            modalToggle: false,
            email: "",
            password: "",
        };

        // Bind click events to their relevant functions
        this.handleToggleLoginModal = this.handleToggleLoginModal.bind(this);
        this.handleConfirmLogin = this.handleConfirmLogin.bind(this);
    }

    // Handles toggling the current state of the login modal
    handleToggleLoginModal() {
        console.log("Toggling Modal State");
        this.setState(state => ({
            modalToggle: !state.modalToggle
        }));
    }

    // Confirm the current login details and attempt a login
    handleConfirmLogin() {
        console.log("confirming login!");
        console.log("Email: " + this.state.email + " Pass: " + this.state.password);
    }

    render() {
        return (
            <div className="my-auto mr-3">
                <Button color="info" onClick={this.handleToggleLoginModal}>
                    Login
                    <FontAwesomeIcon icon={faSignInAlt} className="mx-2" />
                </Button>
                {/* Login Modal */}
                <Modal isOpen={this.state.modalToggle}>
                    <ModalHeader>Sign In</ModalHeader>
                    <ModalBody>
                    <Form action="#">
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
                    </ModalBody>
                    <ModalFooter>
                        <a href="/register" className="mr-auto">
                            <Button color="primary">
                                Register
                            </Button>
                        </a>
                        <Button color="primary" onClick={this.handleConfirmLogin}>Confirm</Button>
                        <Button color="secondary" onClick={this.handleToggleLoginModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default LoginBtn;