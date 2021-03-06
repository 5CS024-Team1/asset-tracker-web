import React, { Component } from 'react';
import queryString from 'query-string';
import {
    Container,
    CardColumns,
    Card,
    CardText,
    CardBody,
    CardTitle,
} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {
    BASE_API_PATH,
    API_TIMEOUT
} from "../../consts";

import LoadingSpinner from "../LoadingSpinner";
import Session from "../Session/Session.js";
import {searchAsset} from '../../helperFile';

function Results(props) {
    return (
        <CardColumns>
            {
                props.results && props.results.map((result, index) => {
                    return (
                        <Card body outline>
                            <CardBody>
                                <CardTitle>
                                    <Link to={'asset/' + result.id}>
                                        Asset #{result.id}
                                    </Link>
                                </CardTitle>
                                <CardText>
                                    Name: '{result.display_name}' <br />
                                    Category: {result.category} <br/>
                                    Origin: {result.origin} <br/>

                                </CardText>
                            </CardBody>
                        </Card>
                    );
                })
            }
        </CardColumns>
    );
}

class Search extends Component {
    constructor(props) {
        super(props);

        // Get query from url using query-string
        const parsed = queryString.parse(props.location.search);
        this.state = {
            query: parsed.query,
            loaded: false,
            results: null,
            category_results: null,
            error: null,
        };
    }

    componentDidMount() {
        if ( Session.isSignedIn() ) {
            /// Get relevent query results from api
            console.log(`Searching for '${this.state.query}'`)
            axios({
                method: 'get',
                url: searchAsset(this.state.query),
                headers: { 
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + Session.getUser().api_token, 
                 },
                timeout: API_TIMEOUT
            }).then(result => {
                console.log(result.data);
                this.setState({
                    results: result.data.assets,
                    category_results: result.data.category,
                    loaded: true,
                    error: result.data.error,
                });
            }).catch(error => {
                console.log(error);
                this.setState({ 
                    error: error.message,
                    loaded: true, 
                });
            });
        }
    }

    render() {
        return (
            <Container className="my-3">
                <h1>Search Results</h1>
                Searching database for "{this.state.query}".
                {
                    this.state.loaded && this.state.results && ` Found '${this.state.results.length}' results!`
                }
                <hr />

                <div className="mt-3">
                    {/* Loading icon for when data is being loaded */}
                    { !this.state.loaded && <LoadingSpinner /> }
                    {/* Default message when no data was able to be found */}
                    { this.state.loaded && !this.state.results && <div>No Results Found </div> }
                    {/* Display UI for results if loaded was complete with results */}
                    {
                        this.state.loaded && this.state.results && <Results results={this.state.results}/>
                    }
                    {
                        this.state.loaded && this.state.category_results && <Results results={this.state.category_results} />
                    }
                </div>
                
            </Container>
        );
    }
}

export default Search;