import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { 
    textFilter,
    selectFilter,
    dateFilter,
} from 'react-bootstrap-table2-filter';
import { Link } from 'react-router-dom';

import { id, display_name, category, last_ping_time, date_loaned, date_return } from '../../helperFile';
import { convertDateFromDb } from '../../utils';

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
        }, 
        {
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