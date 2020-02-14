import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AllAssets extends Component {
    render() {
        return (
            <div>
                List All Registered Assets
                <br />
                <Link to="/assets/all/1234">
                    Go To Asset 1234
                </Link>
                <br />
                <Link to="/assets/register">
                    Register an Asset
                </Link>
            </div>
        );
    }
}

export default AllAssets;