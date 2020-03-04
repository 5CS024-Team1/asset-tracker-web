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
} from 'reactstrap';
import axios from 'axios';

import {
    BASE_API_PATH,
    API_TIMEOUT
} from '../../../consts';

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

        const { params } = this.props.match;
        this.state = {
            id: params.assetId,
            error: "",
            submitted: false,

            owner_name: "",
            address_line_1: "",
            address_city: "",
            address_region: "",
            address_postcode: "",
            recieved_date: "",
            recieved_time: "",
            retrieval_date: "",
            retrieval_time: "",
        };

        this.handleSubmitAllocate = this.handleSubmitAllocate.bind(this);
        this.onDismissError = this.onDismissError.bind(this);
    }

    handleSubmitAllocate(e) {
        if (this.state.error) {
            // Reset error if data is there
            this.onDismissError();
        }

        var url = `${BASE_API_PATH}/assets/allocate`
        axios({
            method: 'POST',
            url: url,
            headers: { 'content-type': 'application/json' },
            timeout: API_TIMEOUT,
            data: this.state,
        }).then(result => {
            console.log(result);
            this.setState({
                changes_set: result.data.changes_set,
                submitted: result.data.changes_set,
                error: !result.data.changes_set ? result.data.error : null,
            });
            if (this.state.changes_set) {
                /// Redirect user once complete
                setTimeout(() => {
                    window.location.replace(`/asset/${this.state.id}`);
                }, 1000);
            }
        }).catch(error => {
            console.log(error);
            this.setState({
                submitted: true,
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
                <Alert color="danger" className="my-3" isOpen={this.state.error} toggle={this.onDismissError}>
                    Error Occured: {this.state.error}
                </Alert>
                <h1 className="mt-3">Allocate Asset (#{this.state.id})</h1>
                <p>Allocate this asset to be given out</p>
                <div>
                    <FormGroup>
                        <Label for="ownerNameInput">Name:</Label>
                        <Input type="text" name="" id="ownerNameInput" placeholder="Name of Owner" 
                            onChange={ e => this.setState({ owner_name: e.target.value }) } />
                    </FormGroup>
                    <FormGroup>
                        <Label for="ownerAddressInput">Address:</Label>
                        <Input type="text" name="ownerAddress" id="ownerAddressInput" placeholder="1234 Example Street" 
                            onChange={ e => this.setState({ address_line_1: e.target.value }) }/>
                    </FormGroup>
                    <Row>
                        <Col md={6}>
                            <Label for="ownerCityInput">City:</Label>
                            <Input type="text" name="ownerCity" id="ownerCityInput" placeholder="London" 
                                onChange={ e => this.setState({ address_city: e.target.value }) }/>
                        </Col>
                        <Col md={3} className="px-0">
                            <Label for="ownerRegionInput">Region:</Label>
                            <Input type="text" name="ownerRegion" id="ownerRegionInput" placeholder="Greater London"
                                onChange={ e => this.setState({ address_region: e.target.value }) }/>
                        </Col>
                        <Col md={3}>
                            <Label for="ownerPostcodeInput">Postcode:</Label>
                            <Input type="text" name="ownerPostcode" id="ownerPostcodeInput" placeholder="SE1 9SG"
                             onChange={ e => this.setState({ address_postcode: e.target.value }) }/>
                        </Col>
                    </Row>
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
            </Container>
        );
    }
}

export default AllocateAsset;