import React, { Component } from 'react';

// Element for "/asset/:assetId?"
// Displays full information about a specific asset
class SingleAsset extends Component 
{
    constructor(props) {
        super(props);
        
        const { params } = this.props.match;
        this.state = {
            id: params.assetId
        };
        console.log("Asset ID: " + this.state.id);
    }

    render() {
        return (
            <div>
                Single asset '{this.state.id}'
            </div>
        );
    }
}

export default SingleAsset;