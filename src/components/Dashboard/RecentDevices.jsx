import React, { Component } from 'react';
import {
    Table
} from 'reactstrap';

class RecentDevices extends Component {
    render() {
        return (
            <div style={{"overflow-y": "auto"}}>
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
                            <th>#1</th>
                            <th>Walking Stick</th>
                            <th>ONLINE</th>
                            <th>Wolverhampton, UK</th>
                        </tr>
                        <tr>
                            <th>#3</th>
                            <th>Walking Stick</th>
                            <th>ONLINE</th>
                            <th>Wolverhampton, UK</th>
                        </tr>
                        <tr>
                            <th>#5</th>
                            <th>Walking Stick</th>
                            <th>ONLINE</th>
                            <th>Wolverhampton, UK</th>
                        </tr>
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