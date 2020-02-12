import React, { Component, useState } from 'react';
import {
    Navbar,
    Button
} from 'reactstrap';


import LoginBtn from "../LoginBtn";

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="d-flex" style={{ background: "yellow", height: "50px" }}>
                <div className="mr-auto">
                    Header 
                </div>
                <LoginBtn />
            </div>
        );
    }
}

export default Header;