import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { 
    textFilter,
    selectFilter,
} from 'react-bootstrap-table2-filter';
import { Link } from 'react-router-dom';

function IdFormatter (cell, row) {
    return  <Link to={"user/" + cell}>
                {cell}
            </Link>
}

function NullCheck (cell) {
    return cell ? cell : "-";
}

// All options of categories. 
// Key should match expected data, value change to be it's display value
const categoryOptions = {
    "Unknown": 'Unknown',
    "A": "a",
    "B": "b",
};

class ReturnUserTable extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            returnUsers: props.data,
        }
    }

    overdueFormatter = (cell, row, rowIndex) => {
        return (
            <div className="d-flex">
                <div style={{ "color": row.return }}></div>
            </div>
        );
    }

    render() {
        const columns =[{
            dataField: "admin_id",
            text: "Id",
            sort: true,
            formatter: IdFormatter,
            filter: textFilter()
        },
        {
            dataField: "admin_name",
            text: "User Name",
            sort: true,
            filter: textFilter()
        }, 
        {
            dataField: "admin_email",
            text: "User Email",
            sort: true,
            filter: textFilter()
        }, 
        {
            dataField: "admin_type",
            text: "User Type",
            sort: true,
        }];

        const defaultSort = [{
            dataField: "admin_id",
            order: "asc", //ascending or descending (asc/desc)
        }];
        
        return (
            <BootstrapTable 
                bootstrap4 hover
                keyField="admin_id"
                data={this.state.returnUsers}
                columns={columns}
                defaultSorted={defaultSort} 
                filter={ filterFactory() }
                filterPosition="top" />
        );
    }
}

export default ReturnUserTable;