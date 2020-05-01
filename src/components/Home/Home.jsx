import React, { Component } from 'react';
import { UncontrolledAlert, 
    Row,
    Col,
    Button,
} from 'reactstrap';
import {
    Link
} from "react-router-dom";
import Session from '../Session/Session';
import LoginBtn from '../LoginBtn';

function HomeInfoBox (props) {
    return (
        <div className="mx-5">
            <Row>
                <h4>{props.title}</h4>
            </Row>
            <Row>
                {props.desc}
            </Row>
        </div>
    );
}

class Home extends Component {
    constructor(props) {
        super(props);
        // Check if login info has expired
        var params = new URLSearchParams(this.props.location.search);
        // Only show if getUser has actually expired, could navigate to page with login info
        var isSignedIn = Session.getUser() != null;
        var expiredAuth = params.get('expired') && !isSignedIn;
        var hasAuth = params.get('auth');

        this.state = {
            expired: expiredAuth,
            hasAuth: hasAuth,
            isSignedIn: isSignedIn,
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
                        <h1 className="text-center" style={{ "fontSize": "3rem" }} >Asset Angels</h1>
                        <h6 className="text-center">Tracking your assets so you don't have to <span role="img" aria-label="wink">😉</span></h6>
                    </div>
                    <hr className="mx-5 py-3"/>
                    <div className="my-3 mb-5 mx-auto text-center">
                        {
                            !this.state.isSignedIn && (
                                <div>
                                    If you have an account, click below to get started. Otherwise, contact your system administrator for access
                                    <br/>
                                    <div className="mt-3">
                                        <LoginBtn />
                                    </div>
                                </div>
                            )
                        }
                        {
                            this.state.isSignedIn && (
                                <div>
                                    Navigate to the Dashboard to get started!
                                    <br />
                                    <Link to="/dashboard"><Button className="mt-3 px-5 py-2 w-25" color="info">Dashboard</Button></Link>
                                </div>
                            )
                        }
                    </div>
                    <hr className="mx-5 py-3"/>
                    <Row className="w-100 mx-0 px-5 mt-5">
                        <Col md={4}>
                            <HomeInfoBox title="Track your Assets!" desc="Create and add any assets you have into Asset Angels. Allocate assets out the patients without losing track of has what. Be in control of your assets"/>
                        </Col>
                        <Col md={4}>
                            <HomeInfoBox title="Monitor their locations" desc="Get real-time updates on managed assets inserted into Asset Angels and be able to track their location in the world!"/>
                        </Col>
                        <Col md={4}>
                            <HomeInfoBox title="Be in control of your Assets" desc="With Asset Angels, you are able to monitor your assets and be alerted if any leave their safe zone!"/>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Home;