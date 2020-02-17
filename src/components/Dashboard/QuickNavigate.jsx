import React, { Component } from 'react';
import {
    Row,
    Col,
    Button
} from 'reactstrap';
import {
    Link
} from 'react-router-dom';

class QuickNavigate extends Component {
    render() {
        return (
            <div>
                <h3 className="mb-3">Quick Navigation</h3>
                <Row className="mx-auto">
                    <Col md={6}>
                        <Link to="/assets" >
                            <Button color="primary">
                                All Assets
                            </Button>
                        </Link>
                    </Col>
                    <Col md={6} >
                        <Link to="/register-user">
                            <Button color="primary">
                                Add a User
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default QuickNavigate;