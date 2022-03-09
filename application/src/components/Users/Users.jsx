import React from 'react';

import withHocs from './UserHoc';
import UsersTable from "../UsersTable/UsersTable";
import UsersForm from "../UsersForm/UsersForm";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

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

    handleChange = name =>({ target }) => {this.setState({[name]: target.value }); };

    handleCheckboxChange = name => ({ target }) => {this.setState({[name]: target.value }); };

    render() {

        const { name, email, status, id, open } = this.state;
        const { classes } = this.props;

        return (
            <>
                <UsersForm
                    handleChange={this.handleChange}
                    handleCheckboxChange={this.handleCheckboxChange}
                    selectedValue={{ id, name, email, status }}
                    open={open}
                    onClose={this.handleClose}
                />
                <div className={classes.wrapper}>
                    <UsersTable onOpen={this.handleClickOpen} onClose={this.handleClose} />
                    <Fab onClick={() => this.handleClickOpen(null)} color="primary" aria-label="Add" className={classes.fab}>
                        <AddIcon />
                    </Fab>
                </div>
            </>

        );
    }
}

export default withHocs(Users);