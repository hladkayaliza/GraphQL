import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';

import withHocs from './UsersFormHoc';
import FormControlLabel from "@material-ui/core/FormControlLabel";

class UsersForm  extends React.Component{
    handleClose = () => {
        this.props.onClose();
    };

    handleSave = () => {
        const { selectedValue, onClose, addUser, updateUser } = this.props;
        const { id, name, email, status } = selectedValue;
        id ? updateUser( { id, name, email, status: Boolean(status) } ) : addUser( { name, email, status: Boolean(status) });
        onClose();
    };

    render() {

        const { selectedValue = {}, open, classes, handleChange, handleCheckboxChange } = this.props;
        const { name, email, status } = selectedValue;


        return (
            <Dialog onClose={this.handleClose} open={open} aria-labelledby="simple-dialog-title">
                <DialogTitle className={classes.title} id="simple-dialog-title">User information</DialogTitle>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="outlined-name"
                        label="Name"
                        className={classes.textField}
                        value={name}
                        onChange={handleChange('name')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-email"
                        label="Email"
                        className={classes.textField}
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        margin="normal"
                        variant="outlined"
                    />
                    <div className={classes.wrapper}>
                        <FormControlLabel
                            control={<Checkbox checked={status} onChange={handleCheckboxChange('status')} value="status" />}
                            label="Status"
                        />
                        <Button onClick={this.handleSave} variant="contained" color="primary" className={classes.button}>
                            <SaveIcon /> Save
                        </Button>
                    </div>
                </form>
            </Dialog>
        );
    }
};

export default withHocs(UsersForm);

