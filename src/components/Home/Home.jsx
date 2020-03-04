import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div className="h-100 w-100 d-flex">
                <div className="mx-auto my-5">
                    <h1 className="text-center" style={{ "font-size": "3rem" }} >Asset Angels</h1>
                    <h6 className="text-center">Tracking your assets so you don't have to <span role="img" aria-label="wink">😉</span></h6>
                </div>
            </div>
        );
    }
}

export default Home;