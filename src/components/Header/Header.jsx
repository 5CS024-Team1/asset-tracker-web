import React, { Component } from 'react';
import {
    Input,
    Button
} from 'reactstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import LoginBtn from "../LoginBtn";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: "",
            isHomePage: this.props.location.pathname == '/',
        };

        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    }

    handleInputKeyDown(e) {
        // Redirect to search when enter pressed on Input
        if (e.key === 'Enter') {
            this.setState({ redirect: `/search?query=${this.state.search}` });
        }
    }

    render() {
        return (
            <div className="header d-flex ">
                {/* Search bar*/}
                <div className="mr-auto my-auto w-75 d-flex">
                    {
                        !this.state.isHomePage && 
                            <div className="d-flex w-100">
                                <Input className="ml-5" 
                                    placeholder="Search for an asset..." 
                                    onChange={e => this.setState({ search: e.target.value })}
                                    onKeyDown={this.handleInputKeyDown}/>

                                <Link to={'/search?query=' + this.state.search}>
                                    <Button className="px-3" color="primary">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                </Link>
                            </div>
                    }
                </div>
                {/* Login button */}
                <LoginBtn />
                { this.state.redirect && <Redirect push to={this.state.redirect}/> }
            </div>
        );
    }
}

export default withRouter(Header);