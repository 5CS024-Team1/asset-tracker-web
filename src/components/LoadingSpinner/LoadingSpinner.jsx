import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

class LoadingSpinner extends Component {
    render() {
        return (
            <Spinner className="mx-auto" style={{ width: '5rem', height: '5rem' }} />
        );
    }
}

export default LoadingSpinner;