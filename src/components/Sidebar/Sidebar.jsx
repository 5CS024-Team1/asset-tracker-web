import React, { Component } from 'react';
import {
    Col,
    NavbarBrand,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

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
                    <div className="d-flex mx-auto">
                        <div className="version-number muted my-auto">{pkg ? pkg.version : "Unknown"}</div>
                        <a className="my-auto ml-2" href="https://github.com/5CS024-Team1/asset-tracker-web/" style={{ color: "black" }}>
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </div>
                    <Link to="/" className="mx-auto mt-2 mb-4">
                        <img src={process.env.PUBLIC_URL + '/aa_logo.png'} 
                            alt="Asset Angels logo" 
                            height="250" width="150" />
                    </Link>
                </div>
                <ListGroup>
                    <SidebarListElement text="Dashboard"  href={process.env.PUBLIC_URL + '/dashboard'} />
                    <SidebarListElement text="Assets" href={process.env.PUBLIC_URL + '/assets'} />
                    {
                        Session.isUserTypeOrAbove("management") && <SidebarListElement text="Register" href={process.env.PUBLIC_URL + '/assets/register'} />
                    }
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