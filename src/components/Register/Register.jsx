import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Button
} from 'reactstrap';
import axios from 'axios';

import {
    BASE_API_PATH
} from "../../consts";

class Register extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };

        this.handleOnRegister = this.handleOnRegister.bind(this);
    }

    handleOnRegister(e) {
        console.log(`Register User - Email:'${this.state.email}' Pass:'${this.state.password}'`);

        axios({
            method: 'post',
            url: `${BASE_API_PATH}/register/index.php`,
            headers: { 'content-type': 'application/json' },
            data: this.state
          }).then(result => {
              this.setState({
                mailSent: result.data.sent
              })
          }).catch(error => this.setState({ error: error.message }));
    }

    render() {
        return (
            <Container className="mt-3">
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="email@example.com" 
                                    onChange={ e => this.setState({ email: e.target.value }) } />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="" 
                                    onChange={ e => this.setState({ password: e.target.value }) } />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button onClick={this.handleOnRegister}>Register</Button>
                </Form>
            </Container>
        );
    }
}

export default Register;