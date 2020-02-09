import React, { Component } from 'react';
import {
    Button,
    Container,
    Row,
    Col,
    NavbarBrand,
    ButtonGroup,
} from 'reactstrap';

class Sidebar extends Component {
    render() {
        return (
            <Col md="2" style={{ background: "red" }}>
                <NavbarBrand>
                    Asset Tracker
                </NavbarBrand>
                <Button color="primary">
                    Dashboard
                </Button>
                <Button color="primary">
                    All Assets
                </Button>
            </Col>
        );
    }
}

export default Sidebar;