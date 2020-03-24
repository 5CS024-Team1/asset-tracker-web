import React, { Component } from 'react';
import {
    Col,
    NavbarBrand,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Session from "../Session/Session.js";

let pkg = require('../../../package.json');

/// HTML for one element of the navigation list
function SidebarListElement(props) {
    return (
        <ListGroupItem className="py-4" tag="a" action href={props.href}>
            <h5 className="text-center my-auto">{props.text}</h5>
        </ListGroupItem>
    );
}

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
                    <SidebarListElement text="Dashboard"  href={process.env.PUBLIC_URL + '/dashboard'} />
                    <SidebarListElement text="Assets" href={process.env.PUBLIC_URL + '/assets'} />
                    <SidebarListElement text="Register" href={process.env.PUBLIC_URL + '/assets/register'} />
                    <SidebarListElement text="Reports" href={process.env.PUBLIC_URL + '/reports'} />
                    {
                        Session.isAdminUser() && <SidebarListElement className="bg-secondary" text="Users" href={process.env.PUBLIC_URL + '/users'} />
                    }
                </ListGroup>
            </Col>
        );
    }
}

export default Sidebar;