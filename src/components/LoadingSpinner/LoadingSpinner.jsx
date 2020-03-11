import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

class LoadingSpinner extends Component {
    propToSize() {
        if (this.props.small) {
            return '1.5rem';
        } else if (this.props.medium) {
            return '3rem';
        } else {
            return '5rem';
        }
    }

    render() {
        return (
            <Spinner className="mx-auto" style={{ 
                width: this.propToSize(), 
                height: this.propToSize(),
            }} />
        );
    }
}

export default LoadingSpinner;