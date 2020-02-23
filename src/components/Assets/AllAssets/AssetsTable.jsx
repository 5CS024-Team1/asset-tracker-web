import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { 
    textFilter,
    selectFilter,
} from 'react-bootstrap-table2-filter';
import { Link } from 'react-router-dom';
import {
    Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

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

// All options of categories. 
// Key should match expected data, value change to be it's display value
const categoryOptions = {
    "Unknown": 'Unknown',
    "A": "a",
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
            dataField: "id",
            text: "Id",
            sort: true,
            formatter: IdFormatter,
            filter: textFilter()
        }, {
            dataField: "display_name",
            text: "Display Name",
            sort: true,
            filter: textFilter()
        }, {
            dataField: "category",
            text: "Category",
            sort: true,
            formatter: cell => categoryOptions[cell],
            filter: selectFilter({
                options: categoryOptions
            })
        }, {
            dataField: "last_ping_time",
            text: "Last Pinged Time",
            formatter: NullCheck,
            sort: true,
        }, {
            dataField: "location",
            text: "Location",
            formatter: NullCheck,
            sort: true,
        }, {
            dataField: "owner_name",
            text: "Allocated Owner",
            formatter: NullCheck,
            sort: true,
            filter: textFilter()
        }, {
            dataField: "owner_date_return",
            text: "Return Date",
            formatter: NullCheck,
            sort: true,
        }, {
            text: "",
            isDummyField: true,
            formatter: this.emptyFormatter,
            headerStyle: { width: "60px" }
        }];

        const defaultSort = [{
            dataField: "id",
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