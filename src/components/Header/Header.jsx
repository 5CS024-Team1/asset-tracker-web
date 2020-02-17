import React, { Component } from 'react';

import LoginBtn from "../LoginBtn";

class Header extends Component {
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