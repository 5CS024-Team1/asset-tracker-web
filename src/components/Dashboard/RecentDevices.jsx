import React, { Component } from 'react';
import {
    Table
} from 'reactstrap';

class RecentDevices extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>Recent Devices</h3>
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Online</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>#12</th>
                            <th>Walking Stick</th>
                            <th>ONLINE</th>
                            <th>Wolverhampton, UK</th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default RecentDevices;