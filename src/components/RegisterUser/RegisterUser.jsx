import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    Spinner,
    Breadcrumb,
    BreadcrumbItem,
    UncontrolledAlert
} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

import {
    BASE_API_PATH
} from "../../consts";

import {userNewId, addUser} from '../../helperFile';
import Session from "../Session/Session.js";

function PageBreadcrumbs() {
    return (
        <Breadcrumb className="mt-1">
            <BreadcrumbItem>
                <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Link to="/users">Users</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Register</BreadcrumbItem>
        </Breadcrumb>
    );
}

class RegisterUser extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            userId: -1,
            userIdLoaded: false,
            userSet: false,

            first_name: "",
            last_name: "",
            password: "",
            account: "",

            error: "",
        };
        this.handleOnAdd = this.handleOnAdd.bind(this);
    }

    componentDidMount() {
        if ( Session.isSignedIn() ) {
            /// Get new user id from db
            axios({
                method: 'GET',
                url: userNewId(),
                headers: { 
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + Session.getUser().api_token, 
                 },
            }).then(result => {
                this.setState({
                    userId: result.data.userId,
                    userIdLoaded: true,
                });
            }).catch(error => {
                this.setState({
                    userIdLoaded: true,
                    userId: "?",
                    error: error.message,
                })
            })
        }
    }

    handleOnAdd(e) {
        //console.log(`Register User - Email:'${this.state.email}' Pass:'${this.state.password}'`);
        axios({
            method: 'post',
            url: addUser(),
            headers: { 'content-type': 'application/json' },
            data: this.state
          }).then(result => {
              this.setState({
                mailSent: result.data.sent
              })
          }).catch(error => this.setState({ error: error.message }));
    }
    
    render() {
        let idNumHtml = <div>
                            <Label>Id:</Label>
                            <Input type="number" name="usid" placeholder="?" disabled value={this.state.userId} />
                        </div>
        let sentHtml =  <div className="d-flex">
                            <div className="ml-auto">
                                User has been set!
                            </div>
                        </div>
        return (
            <Container className="mt-3">
                { this.state.loaded && this.state.error && <UncontrolledAlert color="danger">Error: {this.state.error}</UncontrolledAlert>}
                <PageBreadcrumbs />
                <h1>Register a New User</h1>
                <p>Insert new information to add a new user of the site.</p>
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                { this.state.userIdLoaded ? 
                                    idNumHtml 
                                    : 
                                    <Spinner size="sm" color="primary" />
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label>Account Type:</Label>
                                <Input type="select" name="account" id="accountType" onChange={ e => this.setState({ account: e.target.value }) }>
                                    <option value="normal">Normal</option>
                                    <option value="staff">Staff</option>
                                    <option value="admin">Admin</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="firstNameInput">First Name</Label>
                                <Input type="text" name="name" id="firstNameInput" placeholder="Alan" 
                                    onChange={ e => this.setState({ first_name: e.target.value }) } />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastNameInput">Last Name</Label>
                                <Input type="text" name="name" id="lastNameInput" placeholder="Smith"
                                    onChange={ e=> this.setState({ last_name: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="A super secure password" 
                                    onChange={ e => this.setState({ password: e.target.value }) } />
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className="w-100">
                        <Button className="ml-auto" color="primary" onClick={this.handleOnAdd}>
                            Register
                        </Button>
                    </div>
            
                    { this.state.userSet && sentHtml }
                </Form>
            </Container>
        );
    }
}

export default RegisterUser;