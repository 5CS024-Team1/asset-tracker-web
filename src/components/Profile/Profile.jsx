import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Container,
    Breadcrumb,
    BreadcrumbItem,
    Row, Col, 
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    UncontrolledAlert
} from "reactstrap";
import axios from 'axios';

import { 
    BASE_API_PATH,
    API_TIMEOUT
} from "../../consts.js";
import Session from "../Session/Session.js";
import LoadingSpinner from "../LoadingSpinner";
import { getUser } from '../../helperFile.js';

function PageBreadcrumbs() {
    return (
        <Breadcrumb className="mt-1">
            <BreadcrumbItem>
                <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
                User Profile
            </BreadcrumbItem>
        </Breadcrumb>
    );
}

function ProfileInfo(props) {
    return (
        <div>
            <Row className="mx-0">
                <Col md={2}>
                    <h6>Id:</h6>
                </Col>
                <Col md={10}>
                    <div>{props.user ? props.user.id : "None"}</div>
                </Col>
            </Row>
            <Row className="mx-0">
                <Col md={2}>
                    <h6>Patient Id:</h6>
                </Col>
                <Col md={10}>
                    <div>{props.user ? props.user.patient_id : "None"}</div>
                </Col>
            </Row>
            <Row className="mx-0">
                <Col md={2}>
                    <h6>Name:</h6>
                </Col>
                <Col md={10}>
                    <div>{props.user ? `${props.user.forename} ${props.user.surname}` : "Unknown Name"}</div>
                </Col>
            </Row>
            <Row className="mx-0">
                <Col md={2}>
                    <h6>Address:</h6>
                </Col>
                <Col md={10}>
                    <div>{props.user ? `${props.user.address}, ${props.user.town}, ${props.user.county}` : "?"}</div>
                </Col>
            </Row>
            <Row className="mx-0">
                <Col md={2}>
                    <h6>Permission Level:</h6>
                </Col>
                <Col md={10}>
                    <div>{props.user ? props.user.user_type : "Unknown"}</div>
                </Col>
            </Row>
        </div>
    )
}

class Profile extends Component {
    constructor(props) {
        super(props);

        var usr = Session.getUser();
        this.state = {
            loaded: false,
            user: null,
            id: usr ? usr.user_id : -1,
            pass_current: "",
            pass_new: "",
            pass_newCheck: "",
        };
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    }

    componentDidMount() {
        if (!this.state.id) {
            console.error("No Id!");
            return;
        }
        axios({
            method: 'GET',
            url: getUser(this.state.id),
            headers: { 
                'content-type': 'application/json', 
                'authorization': 'Bearer ' + Session.getUser().api_token, 
            },
            timeout: API_TIMEOUT
        }).then(result => {
            console.log(result);
            this.setState({
                user: result.data.user,
                loaded: true,
                error: result.data.error,
            });
            console.log(this.state.assets);
        }).catch(error => {
            console.log(error);
            this.setState({ 
                error: error.message,
                loaded: true, 
            });
        });
    }

    handleSubmitPassword() {
        console.log("submit password change");
        axios({
            method: 'POST',
            url: `${BASE_API_PATH}/user/password-change`,
            headers: { 
                'content-type': 'application/json',
                'authorization': 'Bearer ' + Session.getUser().api_token, 
            },
            timeout: API_TIMEOUT,
            data: this.state
        }).then(result => {
            console.log(result);
            this.setState({
                passSuccess: result.data.success,
                passLoaded: true,
                successMessage: "Sucessfully changed password!",
                error: result.data.error,
            });
            // Refresh page if password change is success
            if (this.state.passSuccess) {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        }).catch(error => {
            console.log(error);
            this.setState({ 
                error: error.message,
                passLoaded: true, 
                passSuccess: false,
            });
        });
    }

    render() {
        return (
            <Container>
                {
                    this.state.error && 
                        <UncontrolledAlert color="danger" className="my-3">
                            Error: {this.state.error}
                        </UncontrolledAlert>
                }
                {
                    this.state.passSuccess && this.state.successMessage &&
                        <UncontrolledAlert color="success" className="my-3">
                            {this.state.successMessage}
                        </UncontrolledAlert>
                }
                <PageBreadcrumbs />
                <h1>Profile</h1>
                { !this.state.loaded && <LoadingSpinner /> }
                
                { this.state.loaded && <ProfileInfo user={this.state.user}/> }

                <h4 className="mt-3">Change Password</h4>
                <div>Change your current password</div>
                <Row className="mt-3">
                    <Col md={6}>
                        <Form>
                            <FormGroup>
                                <Label for="currentPass">Current Password</Label>
                                <Input type="password" name="password" id="currentPass" placeholder="Current password" 
                                    onChange={e => this.setState({ pass_current: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="newPassword">New Password</Label>
                                <Input type="password" name="password" id="newPassword" placeholder="Your new password" 
                                    onChange={e => this.setState({ pass_new: e.target.value })}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="newPasswordRetype">Retype New Password</Label>
                                <Input type="password" name="password" id="newPasswordRetype" placeholder="Retype your new password" 
                                    onChange={e => this.setState({ pass_newCheck: e.target.value })}/>
                            </FormGroup>
                            <Button color="primary" onClick={this.handleSubmitPassword}>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profile;