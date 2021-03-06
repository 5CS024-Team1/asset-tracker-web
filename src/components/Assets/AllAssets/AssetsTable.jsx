import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { 
    textFilter,
    selectFilter,
    dateFilter,
} from 'react-bootstrap-table2-filter';
import { Link } from 'react-router-dom';
import {
    Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { id, display_name, category, last_ping_time, date_loaned, date_return } from '../../../helperFile';
import { convertDateFromDb } from "../../../utils";

// Checker for if a value is null and what to return instead
function NullCheck (cell) {
    if (cell) {
        return cell;
    } else {
        return "-";
    }
}

// Format for Id column to make it a clickable link
function IdFormatter (cell, row) {
    return  <Link to={"asset/" + cell}>
                {cell}
            </Link>
}

function DateFormatter (cell, row) {
    if (cell)
        return convertDateFromDb(cell).toLocaleString('en-GB');
    else
        return "-";
}

// All options of categories. 
// Key should match expected data, value change to be it's display value
const categoryOptions = {
    "Emergency": 'Emergency',
    "Non Emergency": "Non Emergency",
    "B": "b",
};

class AssetsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: props.data
        };
    }

    emptyFormatter = (cell, row, rowIndex) => {
        return (
            <div className="d-flex">
                <Link to={"asset/" + row.id}>
                    <Button color="primary" className="px-2 py-1">
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
                </Link>
            </div>
        );
    }

    render() {
        const columns = [{
            dataField: id,
            text: "Id",
            sort: true,
            formatter: IdFormatter,
            filter: textFilter()
        }, {
            dataField: display_name,
            text: "Display Name",
            sort: true,
            formatter: NullCheck,
            filter: textFilter()
        }, {
            dataField: category,
            text: "Category",
            sort: true,
            formatter: cell => categoryOptions[cell],
            filter: selectFilter({
                options: categoryOptions
            })
        }, {
            dataField: last_ping_time,
            text: "Last Pinged Time",
            formatter: DateFormatter,
            sort: true,
            filter: dateFilter(),
        }, {
            dataField: date_loaned,
            text: "Loaned",
            formatter: DateFormatter,
            sort: true,
            filter: dateFilter(),
        }, {
            dataField: date_return,
            text: "Return Date",
            formatter: DateFormatter,
            sort: true,
            filter: dateFilter(),
        }, {
            text: "",
            isDummyField: true,
            formatter: this.emptyFormatter,
            headerStyle: { width: "60px" }
        }];

        const defaultSort = [{
            dataField: id,
            order: "asc", //ascending or descending (asc/desc)
        }];

        return (
            <BootstrapTable 
                bootstrap4 hover
                keyField="id"
                data={this.state.assets}
                columns={columns}
                defaultSorted={defaultSort}
                filter={ filterFactory() }
                filterPosition="top" />
        );
    }
}

export default AssetsTable;