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
    Button
} from "reactstrap";
import axios from 'axios';

import { 
    BASE_API_PATH,
    API_TIMEOUT
} from "../../consts.js";
import Session from "../Session/Session.js";
import LoadingSpinner from "../LoadingSpinner";

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
                    <div>{props.user ? props.user.admin_id : "-1"}</div>
                </Col>
            </Row>
            <Row className="mx-0">
                <Col md={2}>
                    <h6>Name:</h6>
                </Col>
                <Col md={10}>
                    <div>{props.user ? props.user.admin_name : "Unknown Name"}</div>
                </Col>
            </Row>
            <Row className="mx-0">
                <Col md={2}>
                    <h6>Email:</h6>
                </Col>
                <Col md={10}>
                    <div>{props.user ? props.user.admin_email : "?"}</div>
                </Col>
            </Row>
            <Row className="mx-0">
                <Col md={2}>
                    <h6>Permission Level:</h6>
                </Col>
                <Col md={10}>
                    <div>{props.user ? props.user.admin_type : "Unknown"}</div>
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
        axios({
            method: 'GET',
            url: `${BASE_API_PATH}/user/get?id=${this.state.id}`,
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
            headers: { 'content-type': 'application/json' },
            timeout: API_TIMEOUT,
            data: this.state
        }).then(result => {
            console.log(result);
            this.setState({
                passSuccess: result.success,
                passLoaded: true,
            });
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