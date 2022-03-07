import React from 'react';

import withHocs from './UserHoc';
import UsersTable from "../UsersTable/UsersTable";

class Users extends React.Component {
    state = {
        open: false,
        name: '',
        email: '',
        status: false
    }

    handleClickOpen = (data) => {
        this.setState({
            open: true,
            ...data,
        });
    };

    handleClose = () => { this.setState({ name: '', email: '', open: false, status: false }); };

    // handleChange = name =>({ target }) =>{ this.setState({ [name]: target.name, [email]: target.email,  [status]: target.status }) };

    render() {

        const { name, email, status, id, open } = this.state;
        const { classes } =this.props;

        return (
            <>
                <UsersTable onOpen={this.handleClickOpen} onClose={this.handleClose} />
            </>

        );
    }
}

export default withHocs(Users);