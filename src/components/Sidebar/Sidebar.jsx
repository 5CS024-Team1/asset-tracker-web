import React, { Component } from 'react';
import {
    Button,
    Container,
    Row,
    Col
} from 'reactstrap';

class Sidebar extends Component {
    render() {
        return (
            <Col md="2" style={{ background: "red" }}>
                Sidebar
            </Col>
        );
    }
}

export default Sidebar;