import React, { Component } from 'react';
import {
    Col,
    NavbarBrand,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <Col md="2" style={{ background: "red" }}>
                <NavbarBrand tag={Link} to="/" style={{color: "inherit"}}>
                    Asset Tracker
                </NavbarBrand>
                <ListGroup>
                    <ListGroupItem tag="a" href="/dashboard">
                        Dashboard
                    </ListGroupItem>
                    <ListGroupItem tag="a" href="/assets">
                        Assets
                    </ListGroupItem>
                </ListGroup>
            </Col>
        );
    }
}

export default Sidebar;