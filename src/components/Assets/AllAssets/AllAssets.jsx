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
    BASE_API_PATH
} from "../../../consts";

function isAssetOnline(timeMs) {
    return timeMs < 60000 ? "Online" : "Offline"
}

function timeToDisplay(timeMs) {
    var parsed = parseFloat(timeMs);
    var date = new Date(parsed);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
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
            method: 'post',
            url: `${BASE_API_PATH}/assets/all/index.php`,
            headers: { 'content-type': 'application/json' }
        }).then(result => {
            console.log(result.data.assets);
            this.setState({
                assets: result.data.assets,
                loaded: true,
            });
        }).catch(error => this.setState({ error: error.message }));

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
        let loadingSpinner;
        if (!this.state.loaded) {
            loadingSpinner = <div className="d-flex">
                                <Spinner className="mx-auto" style={{ width: '5rem', height: '5rem' }} />
                            </div>;
        }
        
        return (
            <div>
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
                                <th>Owner</th>
                                <th>Location</th>
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
                                            <td>{asset.owner}</td>
                                            <td>{asset.location}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    {
                        this.state.loaded == false && loadingSpinner
                    }
                </Container>
            </div>
        );
    }
}

export default AllAssets;