import React, { Component } from 'react';
import {
    Col,
    NavbarBrand,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

let pkg = require('../../../package.json');

class Sidebar extends Component {
    render() {
        return (
            <Col md="2" className="sidebar">
                <div className="d-flex flex-column">
                    <NavbarBrand tag={Link} 
                        to="/" 
                        style={{color: "inherit", "fontSize": "1.75rem" }}
                        className="mx-auto">
                        Asset Angels
                    </NavbarBrand>
                    <div className="version-number muted mx-auto">{pkg ? pkg.version : "Unknown"}</div>
                    <Link to="/" className="mx-auto mt-2 mb-4">
                        <img src={process.env.PUBLIC_URL + '/aa_logo.png'} 
                            alt="Asset Angels logo" 
                            height="150" width="150" />
                    </Link>
                </div>
                <ListGroup>
                    <ListGroupItem tag="a" action href={process.env.PUBLIC_URL + '/dashboard'}>
                        Dashboard
                    </ListGroupItem>
                    <ListGroupItem tag="a" action href={process.env.PUBLIC_URL + '/assets'}>
                        Assets
                    </ListGroupItem>
                    <ListGroupItem tag="a" action  href={process.env.PUBLIC_URL + '/assets/register'}>
                        Register
                    </ListGroupItem>
                    <ListGroupItem tag="a" action href={process.env.PUBLIC_URL + '/reports'}>
                        Reports
                    </ListGroupItem>
                </ListGroup>
            </Col>
        );
    }
}

export default Sidebar;