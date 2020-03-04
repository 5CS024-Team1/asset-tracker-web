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
        };
    }

    componentDidMount() {
        /// Get relevent query results from api
        axios({
            method: 'get',
            url: `${BASE_API_PATH}/assets/search?q=${this.state.query}`,
            headers: { 'content-type': 'application/json' },
            timeout: API_TIMEOUT
        }).then(result => {
            this.setState({
                results: result.data.assets,
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
                </div>
                
            </Container>
        );
    }
}

export default Search;