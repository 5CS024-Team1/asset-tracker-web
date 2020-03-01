import React, { Component } from 'react';
import {
    Col,
    NavbarBrand,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <Col md="2" style={{ background: "red" }}>
                <div className="d-flex flex-column">
                    <NavbarBrand tag={Link} 
                        to="/" 
                        style={{color: "inherit", "fontSize": "1.75rem" }}
                        className="mx-auto">
                        Asset Angels
                    </NavbarBrand>
                    <Link to="/" className="mx-auto mt-2 mb-4">
                        <img src={process.env.PUBLIC_URL + '/aa_logo.png'} 
                            alt="Asset Angels logo" 
                            height="150" width="150" />
                    </Link>
                </div>
                <ListGroup>
                    <ListGroupItem tag="a" action href="/dashboard">
                        Dashboard
                    </ListGroupItem>
                    <ListGroupItem tag="a" action href="/assets">
                        Assets
                    </ListGroupItem>
                    <ListGroupItem tag="a" action href="/assets/register">
                        Register
                    </ListGroupItem>
                    <ListGroupItem tag="a" action href="/reports">
                        Reports
                    </ListGroupItem>
                </ListGroup>
            </Col>
        );
    }
}

export default Sidebar;