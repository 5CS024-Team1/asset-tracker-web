import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Table,
    Button,
    Spinner
} from 'reactstrap';
import axios from 'axios';

import {
    BASE_API_PATH,
    API_TIMEOUT
} from "../../../consts";
import LoadingSpinner from "../../LoadingSpinner";

function isAssetOnline(timeMs) {
    if (timeMs == null)
        return <div>-</div>
    return timeMs < 60000 ? "Online" : "Offline"
}

function timeToDisplay(time) {
    if (time == null) {
        return <div>-</div>
    } else {
        // Date stored as "YYYY-MM-DD HH:MM"
        var split = time.split(' ');
        var date = new Date(split[0]);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    }
}

class AllAssets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: null,
            loaded: false,
        }
    }

    componentDidMount() {
        /// Get all assets from database
        axios({
            method: 'get',
            url: `${BASE_API_PATH}/assets/all/`,
            headers: { 'content-type': 'application/json' },
            timeout: API_TIMEOUT
        }).then(result => {
            this.setState({
                assets: result.data.assets,
                loaded: true,
            });
            console.log(this.state.assets);
        }).catch(error => {
            console.log(error);
            this.setState({ 
                error: error.message,
                loaded: true, 
            });
        });

        /// Example Data
        // this.setState({
        //     assets: [
        //         {
        //             name: "Wheelchair",
        //             id: 0,
        //             last_ping: 1581693898056,
        //             owner: "Jeff Jones",
        //             location: "Wolverhampton, UK"
        //         },
        //         {
        //             name: "Walking Stick",
        //             id: 3,
        //             last_ping: 1581693898056,
        //             owner: "Jeff Jones",
        //             location: "London, UK"
        //         }
        //     ]
        // });
    }

    render() {
        let noLoaded = <h5 className="mx-auto">No data loaded</h5>;
        let unknownEntry = <div>-</div>;
        return (
            <Container>
                <h1 className="mt-3">Assets List</h1>
                <div className="d-flex float-right my-3">
                    <Link to="/assets/register" >
                        <Button color="primary">
                            Register an Asset
                        </Button>
                    </Link>
                </div>
                <Table bordered hover className="mt-5">
                    <thead>
                        <tr>
                            <th>Asset Id</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Last pinged time</th>
                            <th>Location</th>
                            <th>Owner</th>
                            <th>Due Back</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Map each asset from API onto table
                            this.state.assets && this.state.assets.map((asset, index) => {
                                return (
                                    <tr key={index}>
                                        <td scope="yesy">
                                            <Link to={"asset/" + asset.id}>
                                                {asset.id}
                                            </Link>
                                        </td>
                                        <td>{asset.display_name}</td>
                                        <td>
                                            {isAssetOnline(asset.last_ping)}
                                        </td>
                                        <td>{timeToDisplay(asset.last_ping_time)}</td>
                                        <td>{asset.location ? asset.location : unknownEntry}</td>
                                        <td>{asset.owner_name != null ? asset.owner_name : unknownEntry}</td>
                                        <td>{timeToDisplay(asset.owner_date_return)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <div className="d-flex">
                    {/* While loading data, display the loading spinner */}
                    { !this.state.loaded && <LoadingSpinner /> }
                    {/* if no data loaded from backend, display message */}
                    { this.state.loaded && (this.state.assets == null || this.state.assets != null && this.state.assets.length == 0) ? noLoaded : null }
                </div>
            </Container>
        );
    }
}

export default AllAssets;