import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Button,
    Spinner,
    UncontrolledAlert,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import axios from 'axios';
import Barcode from 'react-barcode';

import {
    API_TIMEOUT
} from "../../../consts";
import Session from "../../Session/Session.js";

import {assetNewId, registerAsset} from '../../../helperFile';

function PageBreadcrumbs() {
    return (
        <Breadcrumb className="mt-1">
            <BreadcrumbItem>
                <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Link to="/assets">Assets</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
                Register an Asset
            </BreadcrumbItem>
        </Breadcrumb>
    );
}

// Element at "assets/register"
// Registers a new asset into the app
class RegisterAsset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assetId: -1,
            assetIdLoaded: false,
            assetSet: false,

            name: "",
            //origin: "",
            //purchase_cost: 0.0,
            category: "Unknown",
            latitude: "",
            longitude: "",
            longitude: "",
            department: "",

            error: "",
        };

        this.handleOnRegisterAsset = this.handleOnRegisterAsset.bind(this);
        this.handlePrintAssetBarcode = this.handlePrintAssetBarcode.bind(this);
    }

    componentDidMount() {
        if ( Session.isSignedIn() ) {
            /// Retrieve a new asset id from database
            axios({
                method: 'GET',
                url: assetNewId(),
                headers: { 
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + Session.getUser().api_token,
                },
                timeout: API_TIMEOUT,
            }).then(result => {
                this.setState({
                    assetId: result.data.assetId,
                    assetIdLoaded: true,
                    error: result.data.error,
                });
            }).catch(error => {
                this.setState({
                    assetIdLoaded: true,
                    assetId: "?",
                    error: error.message,
                })
            })
        }
    }

    handleOnRegisterAsset(e) {
        /// Register the asset using the inputted information
        axios({
            method: 'post',
            url: registerAsset(),
            headers: { 
                'content-type': 'application/json',
                'authorization': 'Bearer ' + Session.getUser().api_token,
            },
            data: this.state,
            timeout: API_TIMEOUT,
        }).then(result => {
            console.log(result);
            this.setState({
                assetSet: result.data.asset_set,
                error: result.data.error,
            });
            /// Redirect user once complete
            // setTimeout(() => {
            //     window.location.replace(`/assets`);
            // }, 1000);
        }).catch(error => this.setState({ error: error.message }));
    }

    handlePrintAssetBarcode(e) {
        console.log("Printing barcode");
        
        let popupWinindow;
        let barcodeContainer = document.getElementById("barcodeParent");
        let svg = barcodeContainer.firstChild;
        /// Code to change height/width of svg barcode
        // svg.setAttribute("height", "500px");
        // svg.setAttribute("width", "500px");

        popupWinindow = window.open('', '_blank', 'width=1000,height=1000,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><style></style></head><body onload="window.print()">' + svg.outerHTML + '</html>');
        popupWinindow.document.close();
    }

    render() {
        let idNumHtml = <div>
                            <Label>Id Number:</Label>
                            <Input type="number" name="idNumber" placeholder="Asset Id number" disabled value={this.state.assetId} />
                        </div>
        let sentHtml =  <div className="d-flex">
                            <div className="ml-auto">
                                Asset has been set!
                            </div>
                        </div>

        return (
            <Container>
                {
                    this.state.assetIdLoaded && this.state.error &&
                        <UncontrolledAlert color="danger" className="my-3">
                            Error Occured: {this.state.error}
                        </UncontrolledAlert>
                }
                <PageBreadcrumbs />
                <h1>Register Asset</h1>
                <p>Register a new asset into the system database.</p>
                <Form className="mt-5">
                    <Row form>
                        <Col md={6} className="pr-3">
                            <h5>Asset Information</h5>
                            <FormGroup>
                                { this.state.assetIdLoaded ? 
                                    idNumHtml 
                                    : 
                                    <Spinner size="sm" color="primary" />
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="nameInput">Name:</Label>
                                <Input type="text" name="name" id="nameInput" placeholder="Name of Asset" 
                                    onChange={ e => this.setState({ name: e.target.value }) } />
                            </FormGroup>
                            <FormGroup>
                                <Label>Category:</Label>
                                <Input type="select" name="select" id="categorySelect">
                                    <option>Unknown</option>
                                    <option>Category 1</option>
                                    <option>Category 2</option>
                                    <option>Category 3</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="latInput">Latitude:</Label>
                                <Input type="text" name="latitude" id="latInput" placeholder="52.5086710" 
                                    onChange={ e => this.setState({ latitude: e.target.value }) } />
                            </FormGroup>
                            <FormGroup>
                                <Label for="longInput">Longitude:</Label>
                                <Input type="text" name="longitude" id="longInput" placeholder="-2.0873400" 
                                    onChange={ e => this.setState({ longitude: e.target.value }) } />
                            </FormGroup>
                            <FormGroup>
                                <Label for="deptInput">Department ID:</Label>
                                <Input type="text" name="department" id="deptInput" placeholder="1" 
                                    onChange={ e => this.setState({ department: e.target.value }) } />
                            </FormGroup>
                        </Col>
                        <Col md={6} className="pl-3">
                            <h5>Barcode:</h5>
                            <FormText color="muted">
                                Use this barcode to determine which asset is which by attaching it to the asset
                            </FormText>
                            <div className="d-flex justify-content-center" id="barcodeParent">
                                {/* Value required to be a string so convert it */}
                                <Barcode value={`${this.state.assetId}`}  />
                            </div>
                            <Button color="secondary" className="mt-2" onClick={this.handlePrintAssetBarcode}>
                                Print Barcode
                            </Button>
                        </Col>
                    </Row>
                    <div className="d-flex">
                        <Button color="primary" className="ml-auto" onClick={this.handleOnRegisterAsset}>
                            Submit
                        </Button>
                    </div>
                    { this.state.assetSet && sentHtml }
                </Form>
            </Container>
        );
    }
}

export default RegisterAsset;