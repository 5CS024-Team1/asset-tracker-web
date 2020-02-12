import React, { Component } from 'react';
import {
    Button,
    Container,
    Row,
    Col,
    NavbarBrand,
    ButtonGroup,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <Col md="2" style={{ background: "red" }}>
                <NavbarBrand tag={Link} to="/" style={{color: "inherit"}}>
                    Asset Tracker
                </NavbarBrand>
                <Button color="primary">
                    Dashboard
                </Button>
            </Col>
        );
    }
}

export default Sidebar;