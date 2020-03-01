import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { 
    textFilter,
    selectFilter,
} from 'react-bootstrap-table2-filter';
import { Link } from 'react-router-dom';

function IdFormatter (cell, row) {
    return  <Link to={"asset/" + cell}>
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

class ReturnTable extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            returnAssets: props.data,
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
            dataField: "id",
            text: "Id",
            sort: true,
            formatter: IdFormatter,
            filter: textFilter()
        },
        {
            dataField: "display_name",
            text: "Display Name",
            sort: true,
            filter: textFilter()
        }, 
        {
            dataField: "category",
            text: "Category",
            sort: true,
            formatter: cell => categoryOptions[cell],
            filter: selectFilter({
                options: categoryOptions
            })
        }, 
        {
            dataField: "owner_date_recieved",
            text: "Recieved Date",
            formatter: NullCheck,
            sort: true,
        },
        {
            dataField: "owner_date_return",
            text: "Return Date",
            formatter: NullCheck,
            sort: true,
        }, 
        {
            text: "Overdue",
            isDummyField: true,
            formatter: this.overdueFormatter,
        }];

        const defaultSort = [{
            dataField: "id",
            order: "asc", //ascending or descending (asc/desc)
        }];
        
        return (
            <BootstrapTable 
                bootstrap4 hover
                keyField="id"
                data={this.state.returnAssets}
                columns={columns}
                defaultSorted={defaultSort} 
                filter={ filterFactory() }
                filterPosition="top" />
        );
    }
}

export default ReturnTable;