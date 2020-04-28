import React, { Component } from 'react';
import { UncontrolledAlert } from 'reactstrap';
import Session from '../Session/Session';

class Home extends Component {
    constructor(props) {
        super(props);
        // Check if login info has expired
        var params = new URLSearchParams(this.props.location.search);
        // Only show if getUser has actually expired, could navigate to page with login info
        var expired = params.get('expired') && Session.getUser() == null;
        var hasAuth = params.get('auth');

        this.state = {
            expired: expired,
            hasAuth: hasAuth,
        };
    }
    
    componentDidMount() {

    }

    render() {
        return (
            <div className="w-100 d-flex container-full-width">
                <div className="w-100">
                    {
                        this.state.expired &&   <UncontrolledAlert className="mx-5 mt-3" color="danger">
                                                    Sign in has expired. Please sign in again
                                                </UncontrolledAlert>
                    }
                    {
                        this.state.hasAuth &&   <UncontrolledAlert className="mx-5 mt-3" color="danger">
                                                    Sorry, you don't have access to view that page. Try signing in
                                                </UncontrolledAlert>
                    }
                    <div className="mx-auto my-5">
                    
                        <h1 className="text-center" style={{ "font-size": "3rem" }} >Asset Angels</h1>
                        <h6 className="text-center">Tracking your assets so you don't have to <span role="img" aria-label="wink">😉</span></h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;