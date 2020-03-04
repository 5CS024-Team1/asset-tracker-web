import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    UncontrolledAlert,
} from 'reactstrap';
import axios from 'axios';

import {
    BASE_API_PATH,
    API_TIMEOUT
} from "../../../consts";
import LoadingSpinner from "../../LoadingSpinner";
import AssetsTable from "./AssetsTable";

class AllAssets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: null,
            loaded: false,
            error: "",
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
    }

    render() {
        let noLoaded = <h5 className="mx-auto">No data loaded</h5>;
        return (
            <div className="mx-5">
                {
                    this.state.loaded && !this.state.assets && this.state.error &&
                            <UncontrolledAlert color="danger" className="my-3">
                                Error Occured!: {this.state.error}
                            </UncontrolledAlert>
                }
                <h1 className="mt-3">Assets List</h1>
                <div className="d-flex float-right my-3">
                    <Link to="/assets/register" >
                        <Button color="primary">
                            Register an Asset
                        </Button>
                    </Link>
                </div>
                
                { this.state.assets && <AssetsTable data={this.state.assets} /> }

                <div className="d-flex">
                    {/* While loading data, display the loading spinner */}
                    { !this.state.loaded && <LoadingSpinner /> }
                    {/* if no data loaded from backend, display message */}
                    { this.state.loaded && (!this.state.assets || (this.state.assets && this.state.assets.length <= 0)) ? noLoaded : null }
                </div>
            </div>
        );
    }
}

export default AllAssets;