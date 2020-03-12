import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Container,
    Breadcrumb,
    BreadcrumbItem,
    Row, Col,
} from "reactstrap";

function PageBreadcrumbs() {
    return (
        <Breadcrumb className="mt-1">
            <BreadcrumbItem>
                <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
                User Profile
            </BreadcrumbItem>
        </Breadcrumb>
    );
}

function ProfileInfo(props) {
    return (
        <div>
            
        </div>
    )
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            user: null,
        };
    }

    render() {
        return (
            <Container>
                <PageBreadcrumbs />
                <h1>Profile</h1>
                <Row>
                    <Col md={4}>
                        <ProfileInfo />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profile;