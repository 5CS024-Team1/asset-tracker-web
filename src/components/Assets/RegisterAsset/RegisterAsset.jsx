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
    Spinner
} from 'reactstrap';
import axios from 'axios';

import {
    BASE_API_PATH
} from "../../../consts";

// Element at "assets/register"
// Registers a new asset into the app
class RegisterAsset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            hasOwner: false,
            assetIdLoaded: false,
            assetSet: false,
        };

        this.handleOnRegisterAsset = this.handleOnRegisterAsset.bind(this);
    }

    componentDidMount() {
        /// Retrieve a new asset id from database
        axios({
            method: 'get',
            url: `${BASE_API_PATH}/assets/get/new-id`,
            headers: { 'content-type': 'application/json' },
        }).then(result => {
            console.log(result);
            this.setState({
                assetId: result.data.assetId,
                assetIdLoaded: true,
            });
        })
    }

    handleOnRegisterAsset(e) {
        console.log(`Register asset btn clicked`);

        /// Register the asset using the inputted information
        axios({
            method: 'post',
            url: `${BASE_API_PATH}/assets/register/`,
            headers: { 'content-type': 'application/json' },
            data: this.state
        }).then(result => {
            console.log(result);
            this.setState({
                assetSet: result.data.assetSet
            })
        }).catch(error => this.setState({ error: error.message }));
    }

    render() {
        let ownerFormInfo = <div>
                                <FormGroup>
                                    <Label for="ownerNameInput">Name:</Label>
                                    <Input type="text" name="" id="ownerNameInput" placeholder="Name of Owner" 
                                        onChange={ e => this.setState({ password: e.target.value }) } />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="ownerAddressInput">Address:</Label>
                                    <Input type="text" name="ownerAddress" id="ownerAddressInput" placeholder="1234 Example Street" />
                                </FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <Label for="ownerCityInput">City:</Label>
                                        <Input type="text" name="ownerCity" id="ownerCityInput" placeholder="London" />
                                    </Col>
                                    <Col md={3} className="px-0">
                                        <Label for="ownerRegionInput">Region:</Label>
                                        <Input type="text" name="ownerRegion" id="ownerRegionInput" placeholder="Greater London" />
                                    </Col>
                                    <Col md={3}>
                                        <Label for="ownerPostcodeInput">Postcode:</Label>
                                        <Input type="text" name="ownerPostcode" id="ownerPostcodeInput" placeholder="SE1 9SG"/>
                                    </Col>
                                </Row>
                            </div>
        let sentHtml =  <div>
                            Asset has been set!
                        </div>

        return (
            <Container className="mt-3">
                <h1>Register Asset</h1>
                <p>Register a new asset into the system database.</p>
                <div className="d-flex">
                    <Button color="primary" className="ml-auto" onClick={this.handleOnRegisterAsset}>Register Asset</Button>
                </div>
                <Form className="mt-5">
                    <Row form>
                        <Col md={6} className="pr-3">
                            <h5>Asset Information</h5>
                            <FormGroup>
                                <Label for="idLabel" className="mr-3 mt-2">ID Number:</Label>
                                <Label id="idLabel">
                                    { this.state.assetIdLoaded ? 
                                        <div># {this.state.assetId}</div> 
                                        : 
                                        <Spinner size="sm" color="primary" />
                                    }
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Label for="nameInput">Name:</Label>
                                <Input type="text" name="name" id="nameInput" placeholder="Name of Asset" />
                                    {/* onChange={ e => this.setState({ name: e.target.value }) }  */}
                            </FormGroup>
                            <FormGroup>
                                <Label>Origin:</Label>
                                <Input type="text" name="origin" id="originInput" placeholder="Location origin of asset" />
                            </FormGroup>
                        </Col>
                        <Col md={6} className="pl-3">
                            <h5>Owner Information</h5>
                            <FormGroup>
                                <Input className="ml-0" type="checkbox" name="check" id="assetHasOwner" 
                                    onChange={ e => this.setState({ hasOwner: !this.state.hasOwner })}/>
                                <Label for="" className="ml-3">Does the asset have an owner?</Label>
                            </FormGroup>
                            { this.state.hasOwner && ownerFormInfo }
                        </Col>
                    </Row>
                </Form>
                { this.state.assetSet && sentHtml }
            </Container>
        );
    }
}

export default RegisterAsset;