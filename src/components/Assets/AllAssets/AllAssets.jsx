import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Table,
    Button
} from 'reactstrap';
import axios from 'axios';
import {
    BASE_API_PATH
} from "../../../consts";

function isAssetOnline(timeMs) {
    return timeMs < 60000 ? "Online" : "Offline"
}

function timeToDisplay(timeMs) {
    var date = new Date(timeMs);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

class AllAssets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: null
        }
    }

    componentDidMount() {
        // Get all assets
        // axios({
        //     method: 'post',
        //     url: `${BASE_API_PATH}/assets/get/index.php`,
        //     headers: { 'content-type': 'application/json' }
        // }).then(result => {
        //     this.setState({
        //         mailSent: result.data.sent
        //     })
        // }).catch(error => this.setState({ error: error.message }));

        this.setState({
            assets: [
                {
                    name: "Wheelchair",
                    id: 0,
                    last_ping: 1581693898056,
                    owner: "Jeff Jones",
                    location: "Wolverhampton, UK"
                },
                {
                    name: "Walking Stick",
                    id: 3,
                    last_ping: 1581693898056,
                    owner: "Jeff Jones",
                    location: "London, UK"
                }
            ]
        });
    }

    render() {
        return (
            <div>
                {/* <Link to="/assets/all/1234">
                    Go To Asset 1234
                </Link>
                <br />
                <Link to="/assets/register">
                    Register an Asset
                </Link> */}
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
                                this.state.assets ? this.state.assets.map((asset, index) => {
                                    return (
                                        <tr key={index}>
                                            <td scope="yesy">
                                                <Link to={"assets/" + asset.id}>
                                                    {asset.id}
                                                </Link>
                                            </td>
                                            <td>{asset.name}</td>
                                            <td>
                                                {isAssetOnline(asset.last_ping)}
                                            </td>
                                            <td>{timeToDisplay(asset.last_ping)}</td>
                                            <td>{asset.owner}</td>
                                            <td>{asset.location}</td>
                                        </tr>
                                    )
                                }) : null
                            }
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default AllAssets;