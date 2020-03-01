import React, { Component } from 'react';
import {
    Container,
    Breadcrumb,
} from 'reactstrap';
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

const localizer = momentLocalizer(moment);

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
            url: `${BASE_API_PATH}/assets/all`,
            headers: { 'content-type': 'application/json' },
            timeout: API_TIMEOUT
        }).then(result => {
            let results = [];
            result.data.assets.forEach((element, index) => {
                if (!element.owner_date_return)
                    return;
                results.push(
                    {
                        id: index,
                        title: element.display_name,
                        start: convertDateFromDb(element.owner_date_return),
                        end: convertDateFromDb(element.owner_date_return),
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
            <Container className="my-3 h-75">
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