import React, { Component } from 'react';
import {
    Container,
    Breadcrumb,
    BreadcrumbItem,
} from 'reactstrap';
import { Link } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import axios from 'axios';

import LoadingSpinner from '../../LoadingSpinner';
import "./Collect.css";

import {
    BASE_API_PATH,
    API_TIMEOUT
} from "../../../consts";
import {
    convertDateFromDb
} from "../../../utils";

import { allAssets, date_return } from '../../../helperFile';

const localizer = momentLocalizer(moment);

function PageBreadcrumbs() {
    return (
        <Breadcrumb className="mt-1">
            <BreadcrumbItem>
                <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
                <Link to="/reports">Reports</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
                Calendar
            </BreadcrumbItem>
        </Breadcrumb>
    );
}


class CollectCalendar extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            loaded: false,
            error: "",
            returnEvents: [],
        };
    }

    componentDidMount() {
        /// Get relevent query results from api
        axios({
            method: 'GET',
            url: allAssets(),
            headers: { 'content-type': 'application/json' },
            timeout: API_TIMEOUT
        }).then(result => {
            let results = [];
            result.data.assets.forEach((element, index) => {
                if (!element.date_return)
                    return;
                results.push(
                    {
                        id: index,
                        title: element.display_name,
                        start: convertDateFromDb(element.date_return),
                        end: convertDateFromDb(element.date_return),
                    }
                );
            });
            console.log(results);
            this.setState({
                returnEvents: results,
                loaded: true,
            });
        }).catch(error => {
            this.setState({ 
                error: error.message,
                loaded: true, 
            });
        });
    }

    render() {
        return (
            <Container className="calendar-container">
                <PageBreadcrumbs />
                <h1>Collection Calendar</h1>
                <p>A useful calendar view for viewing the date and time to collect assets</p>
                {/* Spinner for when data hasn't finished loading */}
                { !this.state.loaded && <LoadingSpinner /> }
                {/* If no results are found after load, display message */}
                { this.state.loaded && !this.state.returnEvents && <div>Unable to get any data</div> }
                {
                    this.state.loaded && this.state.returnEvents &&
                            <div className="h-100">
                                {/* Needs own parent element that 100% to make sure calendar displays */}
                                <Calendar
                                    localizer={localizer}
                                    events={this.state.returnEvents}
                                    startAccessor="start"
                                    endAccessor="end" />
                            </div>
                }
            </Container>
        );
    }
}

export default CollectCalendar;