import React, { Component } from 'react';
import {
    Table,
    UncontrolledAlert
} from 'reactstrap';
import axios from 'axios';
import {
    Link
} from "react-router-dom";

import {
    API_TIMEOUT
} from "../../consts";
import { allAssets } from "../../helperFile";
import Session from "../Session/Session.js";
import LoadingSpinner from "../LoadingSpinner";
import { convertDateFromDb } from "../../utils.js";

// Sorts assets by their return date and returns the top amount (0 to amount)
function sortByReturnDate(assets, amount) {
    // Remove any assets that don't have return date
    var filtered = assets.filter(function (element) {
        return element.date_return != null;
    });
    
    var sorted = filtered.sort(function(a, b) {
        // convert to js date and compare
        var dateA = convertDateFromDb(a.date_return), dateB = convertDateFromDb(b.date_return);
        if( dateA > dateB)
            return 1;
        else 
            return -1;
    }).splice(0, amount);
    
    return sorted;
}

class RecentDevices extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            devices: null,
            loaded: false,
        };
    }

    componentDidMount() {
        if ( Session.isSignedIn() ) {
            axios({
                method: 'GET',
                url: allAssets(),
                headers: { 
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + Session.getUser().api_token, 
                 },
                timeout: API_TIMEOUT
            }).then(result => {
                //console.log(result.data);
                this.setState({
                    assets:  result.data.assets ? sortByReturnDate(result.data.assets, 5) : null,
                    loaded: true,
                    error: result.data.error,
                });
            }).catch(error => {
                this.setState({ 
                    error: error.message,
                    loaded: true, 
                });
            });   
        }
    }

    renderTableData() {
        // Return HTML if no assets are set
        if (!this.state.assets)
        {
            if (this.state.loaded)
                return (<tr key="1">
                            <th>No Assets Found</th>
                        </tr>);
            else
                return (<tr key="1">
                            <th><LoadingSpinner /></th>
                        </tr>);
        }

        // Else return table HTML
        return this.state.assets.map((asset, index) => {
            return (
                <tr key={asset.id}>
                    <th>
                        <Link to={"asset/" + asset.id}>
                            #{asset.id}
                        </Link>
                    </th>
                    <th>{asset.display_name}</th>
                    <th>{asset.date_return}</th>
                </tr>
            );
        });
    }

    render() {
        return (
            <div style={{"overflowY": "auto"}}>
                <h3>Return Devices</h3>
                <h6>Sorted in chronological order</h6>
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Return Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderTableData() }
                    </tbody>
                </Table>
                {
                    this.state.error && <UncontrolledAlert color="danger">
                                            Error Occured!: {this.state.error}
                                        </UncontrolledAlert>
                }
            </div>
        );
    }
}

export default RecentDevices;