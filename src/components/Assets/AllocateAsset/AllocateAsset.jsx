import React, { Component } from 'react';
import {
    Container,
    Row, Col,
    FormGroup,
    Label,
    Input,
    Button,
    FormText,
    Alert,
    Breadcrumb,
    BreadcrumbItem,
    Spinner,
} from 'reactstrap';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

import {
    API_TIMEOUT
} from '../../../consts';

import {allocateAsset, patientNewId, getAllPatients} from '../../../helperFile';
import Session from "../../Session/Session.js";

function PageBreadcrumbs(props) {
    return (
        <Breadcrumb className="mt-1">
            <BreadcrumbItem>
                <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Link to="/assets">Assets</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Link to={'/asset/' + props.assetId}>Asset {props.assetId}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
                Allocate
            </BreadcrumbItem>
        </Breadcrumb>
    );
}

function DateTimePicker (props) {
    return (
        <Row className="my-2">
            <Col>
                <FormGroup>
                        <Label for="dateControl">Date</Label>
                        <Input
                            type="date"
                            name="date"
                            id="dateControl"
                            placeholder="2020-02-08"
                            onChange={props.onDateChange}/>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="timeControl">Time</Label>
                    <Input
                        type="time"
                        name="time"
                        id="timeControl"
                        placeholder="01:55" 
                        onChange={props.onTimeChange}/>
                </FormGroup>
            </Col>
        </Row>
    );
}

class AllocateAsset extends Component {
    constructor(props) {
        super(props);

        const { params } = this.props.props.match;
        this.state = {
            id: params.assetId,
            error: "",
            changes_set: false,

            setOptionSelected: false,
            setOption: "",
            newPatientId: -1,
            selectedPatientId: -1,

            owner_forename: "",
            owner_surname: "",
            address_line_1: "",
            address_city: "",
            address_region: "",
            recieved_date: "",
            recieved_time: "",
            retrieval_date: "",
            retrieval_time: "",
        };

        this.handleSubmitAllocate = this.handleSubmitAllocate.bind(this);
        this.onDismissError = this.onDismissError.bind(this);
    }

    componentDidMount() {
        // ToDo: Validate that asset hasn't been set.
        // Might have used Back to return to this page
    }

    componentDidUpdate () {
        /// Get a new patient id when user wants to create a new patient
        if(this.state.setOptionSelected && this.state.setOption === "create" && this.state.newPatientId < 0) {
            axios({
                method: 'GET',
                url: patientNewId(),
                headers: { 
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + Session.getUser().api_token,
                 },
                timeout: API_TIMEOUT,
            }).then(result => {
                console.log(result);
                this.setState({
                    error: result.data.error,
                    newPatientId: result.data.patientId,
                });
            }).catch(error => {
                console.log(error);
                this.setState({
                    error: error.message,
                });
            });
        }

        /// Get all patients if user wants to select an existing patients
        if (this.state.setOptionSelected && this.state.setOption ==="select" && !this.state.allPatients) {
            axios({
                method: 'GET',
                url: getAllPatients(),
                headers: { 
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + Session.getUser().api_token,
                 },
                timeout: API_TIMEOUT,
            }).then(result => {
                console.log(result);
                this.setState({
                    error: result.data.error,
                    allPatients: result.data.patients,
                    selectedPatientId: result.data.patients ? result.data.patients[0].id : null,
                });
            }).catch(error => {
                console.log(error);
                this.setState({
                    error: error.message,
                });
            });
        }
    }

    handleSubmitAllocate(e) {
        if (this.state.error) {
            // Reset error if data is there
            this.onDismissError();
        }

        axios({
            method: 'POST',
            url: allocateAsset(),
            headers: { 
                'content-type': 'application/json',
                'authorization': 'Bearer ' + Session.getUser().api_token,
             },
            timeout: API_TIMEOUT,
            data: this.state,
        }).then(result => {
            console.log(result);
            this.setState({
                changes_set: result.data.allocated_asset,
                error: result.data.error,
            });
            if (this.state.changes_set) {
                /// Redirect user once complete
                setTimeout(() => {
                    this.setState({ redirect: `/asset/${this.state.id}` });
                }, 1000);
            }
        }).catch(error => {
            console.log(error);
            this.setState({
                error: error.message,
            })
        });
    }

    onDismissError() {
        this.setState({
            error: "",
        });
    }

    render() {
        return (
            <Container>
                {
                    this.state.error &&
                        <Alert color="danger" className="my-3" toggle={this.onDismissError}>
                            Error Occured: {this.state.error}
                        </Alert>
                }
                <PageBreadcrumbs assetId={this.state.id} />
                <h1 className="mt-3">Allocate Asset (#{this.state.id})</h1>
                <p>Allocate this asset to be given out</p>
                {
                    !this.state.setOptionSelected && 
                        <div>
                            <Row className="mx-auto">
                                <Col>
                                    <h6>Do you wish to allocate to an existing patient or create a new patient?</h6>
                                    <div className="d-flex">
                                        <Button className="mx-3" color="primary" onClick={ e => this.setState({ setOption: "create", setOptionSelected: true })}>
                                            Create a new Patient
                                        </Button>
                                        <Button className="mx-3" color="primary" onClick={ e => this.setState({ setOption: "select", setOptionSelected: true })}>
                                            Select an existing patient
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                }
                {
                    this.state.setOption === "create" &&
                    <div>
                        <Row>
                            <Col>
                                <Label>New Patient Id:</Label>
                                {
                                    this.state.newPatientId >= 0 
                                    ?
                                    <Input type="text" name="usid" placeholder="?" disabled value={this.state.newPatientId} />
                                    : 
                                    <Spinner size="sm" color="primary" />
                                }
                                
                            </Col>
                        </Row>
                        <Row className="pb-1">
                            <Col md={6}>
                                <Label for="ownerNameInput">First Name:</Label>
                                <Input type="text" name="" id="ownerNameInput" placeholder="David" 
                                    onChange={ e => this.setState({ owner_forename: e.target.value }) } />
                                </Col>
                            <Col md={6}>
                                <Label for="ownerLastNameInput">Last Name:</Label>
                                <Input type="text" name="ownerLastName" id="ownerLastNameInput" placeholder="Smith"
                                    onChange={ e => this.setState({ owner_surname: e.target.value }) } />
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="ownerAddressInput">Address:</Label>
                            <Input type="text" name="ownerAddress" id="ownerAddressInput" placeholder="1234 Example Street" 
                                onChange={ e => this.setState({ address_line_1: e.target.value }) }/>
                        </FormGroup>
                        <Row className="pb-1">
                            <Col md={6}>
                                <Label for="ownerCityInput">City:</Label>
                                <Input type="text" name="ownerCity" id="ownerCityInput" placeholder="London" 
                                    onChange={ e => this.setState({ address_city: e.target.value }) }/>
                            </Col>
                            <Col md={6} className="px-0">
                                <Label for="ownerRegionInput">Region:</Label>
                                <Input type="text" name="ownerRegion" id="ownerRegionInput" placeholder="Greater London"
                                    onChange={ e => this.setState({ address_region: e.target.value }) }/>
                            </Col>
                        </Row>
                    </div>
                }
                {
                    this.state.setOption === "select" &&
                        <div>
                            <Row className="pb-1">
                                <Col className="d-flex">
                                        <Label className="my-auto pr-3" style={{ whiteSpace: "nowrap" }}>All Patients:</Label>
                                        {
                                            !this.state.allPatients && <Spinner className="my-auto" size="md" color="primary" />
                                        }
                                        {
                                            this.state.allPatients &&
                                                <Input type="select" name="select" id="exampleSelect" onChange={ e => this.setState({ selectedPatientId: e.target.value }) }>
                                                    {
                                                        this.state.allPatients && this.state.allPatients.map((value) => {
                                                            return <option value={value.id} key={value.id}>#{value.id} - {value.surname}, {value.forename}</option>
                                                        })
                                                    }
                                                </Input>
                                        }
                                </Col>
                            </Row>
                        </div>
                }
                {
                    this.state.setOptionSelected &&
                        <div>
                            <FormGroup className="my-2">
                                <h5>Asset Recieved:</h5>
                                <FormText color="muted">
                                    Date and Time that the asset has been given out.
                                </FormText>
                                <DateTimePicker 
                                    onDateChange={e => this.setState({ recieved_date: e.target.value })}
                                    onTimeChange={e => this.setState({ recieved_time: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <h5>Retrieval:</h5>
                                <FormText color="muted">
                                    Date and Time that the asset will be need to be collected. Leave blank if unknown or not required.
                                </FormText>
                                <DateTimePicker 
                                    onDateChange={e => this.setState({ retrieval_date: e.target.value })}
                                    onTimeChange={e => this.setState({ retrieval_time: e.target.value })} />
                            </FormGroup>
                            <Button className="mt-3" onClick={this.handleSubmitAllocate} color="primary">
                                Submit
                            </Button>
                            {
                                this.state.changes_set && <div>Sucessfully set the new changes</div>
                            }
                        </div>       
                }
                { this.state.redirect && <Redirect push to={this.state.redirect} />}
            </Container>
        );
    }
}

export default AllocateAsset;