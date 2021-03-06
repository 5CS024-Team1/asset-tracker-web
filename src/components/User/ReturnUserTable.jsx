import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { 
    textFilter,
    selectFilter,
} from 'react-bootstrap-table2-filter';
import { Link, Redirect } from 'react-router-dom';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';
import axios from 'axios';
import {
    BASE_API_PATH, API_TIMEOUT
} from "../../consts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { removeUser, stfid } from '../../helperFile';
import Session from "../Session/Session.js";


class ReturnUserTable extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            returnUsers: props.data,
            deleteModalToggle: false,
            deleteId: -1,
        };
        this.toggleDeleteUserModal = this.toggleDeleteUserModal.bind(this);
        this.onConfirmDeleteUser = this.onConfirmDeleteUser.bind(this);
    }

    editRemoveColumnFormatter = (cell, row, rowIndex) => {
        return (
            <div className="d-flex">
                <Link to={'/users/edit/' + row.user_id}>
                    <Button color="warning" className="px-2 py-1" title="Edit this user">
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </Button>
                </Link>
                <Button color="danger" title="Delete this user" className="px-2 py-1 ml-1" onClick={() => this.toggleDeleteUserModal(row.user_id)}>
                    <FontAwesomeIcon icon={faUserTimes} />
                </Button>
            </div>
        );
    }

    toggleDeleteUserModal(id) {
        console.log("Toggling DeleteUser modal");
        this.setState({
            deleteId: !this.state.deleteModalToggle ? id : -1,
            deleteModalToggle: !this.state.deleteModalToggle,
        });
    }

    onConfirmDeleteUser() {
        if (this.state.deleteId < 0) {
            console.warn("Can't delete since delete id is not set");
            return;
        }
        console.error("DELETING USER " + this.state.deleteId);
        axios({
            method: 'post',
            url: `${BASE_API_PATH}/user/remove/`,
            headers: { 
                'content-type': 'application/json',
                'authorization': 'Bearer ' + Session.getUser().api_token,
            },
            data: this.state,
            timeout: API_TIMEOUT,
        }).then(result => {
            console.log(result);
            // Reload page once deallocate has succeeded
            window.location.reload();
        }).catch(error => {
            this.setState({
                deallocateConfirm: true,
                error: error.message,
                deallocateModalOpen: true,
            })
        });
        this.toggleDeleteUserModal(-1);
        /// Redirect user once complete
        setTimeout(() => {
            this.setState({ redirect: "/users" });
        }, 1000);
        
    }

    render() {
        const columns =[{
            dataField: "user_id",
            text: "User ID",
            sort: true,
            filter: textFilter()
        }, {
            text: "",
            isDummyField: true,
            formatter: this.editRemoveColumnFormatter,
            headerStyle: { width: "100px" }
        }];

        const defaultSort = [{
            dataField: stfid,
            order: "asc", //ascending or descending (asc/desc)
        }];
        
        return (
            <div>
                <BootstrapTable 
                    bootstrap4 hover
                    keyField="user_id"
                    data={this.state.returnUsers}
                    columns={columns}
                    defaultSorted={defaultSort} 
                    filter={ filterFactory() }
                    filterPosition="top" />
                <Modal isOpen={this.state.deleteModalToggle}>
                    <ModalHeader>Permanently Remove User?</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete user {this.state.deleteId}? They won't be able to sign in or use the site anymore.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.onConfirmDeleteUser}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={this.toggleDeleteUserModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                { this.state.redirect && <Redirect push to={this.state.redirect} />}
            </div>
        );
    }
}

export default ReturnUserTable;