import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { 
    textFilter,
    selectFilter,
    dateFilter,
} from 'react-bootstrap-table2-filter';
import { Link } from 'react-router-dom';

import { id, display_name, category, last_ping_time, date_loaned, date_return, zone } from '../../helperFile';
import { convertDateFromDb } from '../../utils';
import { MAPBOX_API_KEY, API_TIMEOUT } from '../../consts';
import axios from 'axios';

function IdFormatter (cell, row) {
    return  <Link to={"asset/" + cell}>
                {cell}
            </Link>
}

function NullCheck (cell) {
    return cell ? cell : "-";
}

function DateFormatter (cell, row) {
    if (cell)
        return convertDateFromDb(cell).toLocaleString('en-GB');
    else
        return "-";
}

const isOverdueOptions = {
    0 : "Not Overdue",
    1: "Overdue",
};

/// Manually sets the table data using 
function manualSetTableData (rowIndex, columnIndex, data) {
    var table = document.getElementById("reportsTable");
    if (table) {
        // index that the 0th row of data starts at since table contains "Title" row and "Filters" row
        var rowStartIndex = 2;
        var row = table.rows[rowStartIndex + rowIndex];
        var cell = row.cells[columnIndex];
        cell.innerText = data;
    } else {
        console.error("Unable to find reportsTable to set the innerText location");
    }
}

class ReturnTable extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            returnAssets: props.data,
        }
    }

    /// Formats the date_return to isOverdue or not. 1 = overdue, 0 = not overdue
    overdueFormatter = (cell, row, rowIndex) => {
        var date = convertDateFromDb(row.date_return);
        if (date) {
            var isOverdue = date < new Date();
            return isOverdue ? 1 : 0;  
        } else {
            return 0;
        }
    }

    /// Converts a longitude/latitude to an address
    locationFormatter = (cell, row, index) => {
        if (row && row.latitude && row.longitude) {
            axios({
                method: 'get',
                url: "https://api.mapbox.com" + `/geocoding/v5/mapbox.places/${row.longitude},${row.latitude}.json?access_token=${MAPBOX_API_KEY}`,
                headers: { 'content-type': 'application/json', },
                timeout: API_TIMEOUT
            }).then(result => {
                console.log(result.data);
                // Set the row data "location" so column dataField is bound
                row.location = result.data.features[0].place_name;
                
                // Manually set Location column since no way to do it through bootstrap-table-2
                manualSetTableData(index, 3, result.data.features[0].place_name);
            }).catch(error => {
                console.error(error);
                this.setState({
                    error: error,
                });
                
                // If any errors occur when trying to use the Mapbox api, default to using the long/lat
                manualSetTableData(index, 3, `${row.latitude}, ${row.longitude}`);
            });
        }
        else {
            return "Unknown location";
        }
    }

    render() {
        const columns =[{
            dataField: id,
            text: "Id",
            sort: true,
            formatter: IdFormatter,
            filter: textFilter()
        },
        {
            dataField: display_name,
            text: "Display Name",
            sort: true,
            filter: textFilter()
        }, 
        {
            dataField: category,
            text: "Category",
            sort: true,
            // formatter: cell => categoryOptions[cell],
            // filter: selectFilter({
            //     options: categoryOptions
            // })
        }, {
            dataField: "location",
            text: "Location",
            formatter: this.locationFormatter,
            sort: true,
            filter: textFilter(),
        }, {
            dataField: last_ping_time,
            text: "Last Pinged Time",
            formatter: DateFormatter,
            sort: true,
            filter: dateFilter(),
        },
        {
            dataField: date_loaned,
            text: "Loaned",
            formatter: DateFormatter,
            sort: true,
            filter: dateFilter(),
        },
        {
            dataField: date_return,
            text: "Return Date",
            formatter: DateFormatter,
            sort: true,
            filter: dateFilter(),
        },
        {
            dataField: zone,
            text: "Allowed Zone",
            sort: true,
            filter: textFilter()
        }, 
        {
            //isDummyField: true,
            dataField: date_return,
            text: "Overdue",
            sort: true,
            formatter: (cell, row, index) => isOverdueOptions[this.overdueFormatter(cell, row, index)],
        }];

        const defaultSort = [{
            dataField: id,
            order: "asc", //ascending or descending (asc/desc)
        }];
        
        return (
            <BootstrapTable 
                id="reportsTable"
                bootstrap4 hover
                keyField='id'
                data={this.state.returnAssets}
                columns={columns}
                defaultSorted={defaultSort} 
                filter={ filterFactory() }
                filterPosition="top" />
        );
    }
}

export default ReturnTable;