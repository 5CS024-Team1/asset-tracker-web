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
} from 'reactstrap';
import axios from 'axios';

import {
    BASE_API_PATH
} from "../../consts";

class RegisterUser extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            userId: -1,
            userIdLoaded: false,
            userSet: false,

            email: "",
            name: "",
            password: "",
            account: "",

            error: "",
        };
        this.handleOnAdd = this.handleOnAdd.bind(this);
    }

    componentDidMount() {
        /// Get new user id from db
        axios({
            method: 'GET',
            url: `${BASE_API_PATH}/user/get/new-id`,
            headers: { 'content-type': 'application/json' },
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

    handleOnAdd(e) {
        console.log(`Register User - Email:'${this.state.email}' Pass:'${this.state.password}'`);

        axios({
            method: 'post',
            url: `${BASE_API_PATH}/user/add/`,
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
                            <Label>Id Number:</Label>
                            <Input type="number" name="usid" placeholder="User Id number" disabled value={this.state.userId} />
                        </div>
        let sentHtml =  <div className="d-flex">
                            <div className="ml-auto">
                                User has been set!
                            </div>
                        </div>
        return (
            <Container className="mt-3">
                <Form>
                    <Row form>
                        <Col md={1}>
                            <FormGroup>
                                { this.state.userIdLoaded ? 
                                    idNumHtml 
                                    : 
                                    <Spinner size="sm" color="primary" />
                                }
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="text" name="email" id="exampleEmail" placeholder="email@example.com" 
                                    onChange={ e => this.setState({ email: e.target.value }) } />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="text" name="password" id="examplePassword" placeholder="" 
                                    onChange={ e => this.setState({ password: e.target.value }) } />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="exampleName">Name</Label>
                                <Input type="text" name="name" id="exampleName" placeholder="" 
                                    onChange={ e => this.setState({ name: e.target.value }) } />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label>Account Type:</Label>
                                <Input type="select" name="account" id="exampleAccount">
                                    <option value="normal">Normal</option>
                                    <option value="admin">Admin</option>
                                    onChange={ e => this.setState({ account: e.target.value }) } />
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button onClick={this.handleOnAdd}>Register</Button>
                    { this.state.userSet && sentHtml }
                </Form>
            </Container>
        );
    }
}

export default RegisterUser;