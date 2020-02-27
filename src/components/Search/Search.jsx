import React, { Component } from 'react';
import queryString from 'query-string';

class Search extends Component {
    constructor(props) {
        super(props);

        // Get query from url using query-string
        const parsed = queryString.parse(props.location.search);
        this.state = {
            query: parsed.query,
        };
    }

    render() {
        return (
            <div>
                Searching for {this.state.query}
            </div>
        );
    }
}

export default Search;