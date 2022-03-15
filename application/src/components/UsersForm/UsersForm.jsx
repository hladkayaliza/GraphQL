import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';

import withHocs from './UsersFormHoc';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {addUserMutation} from "./mutations";

function UsersForm({classes, handleChange, handleCheckboxChange, open, onClose, selectedValue}) {

    const [value, setValue] = useState(selectedValue);
    const [addUser, {dateAfterAdd}] = useMutation(addUserMutation);
    const [updateUser, {dateAfterUpdate}] = useMutation(addUserMutation);

    // to-do
    //here should be added hooks useMutation for addUser updateUser

    const handleClose = () => {
       onClose();
    };

    const handleSave = () => {
        const { id, name, email, status } = selectedValue;
        // id ? updateUser( { id, name, email, status: Boolean(status) } ) : addUser( { 'name': value.name, 'email': value.email, 'status': Boolean(value.status) });
        onClose();
    };

    return(
        <Dialog onClose={handleClose} open={open} aria-labelledby="simple-dialog-title">
            <DialogTitle className={classes.title} id="simple-dialog-title">User information</DialogTitle>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
                    value={value.name}
                    onChange={handleChange('name')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-email"
                    label="Email"
                    className={classes.textField}
                    value={value.email}
                    onChange={handleChange('email')}
                    type="email"
                    margin="normal"
                    variant="outlined"
                />
                <div className={classes.wrapper}>
                    <FormControlLabel
                        control={<Checkbox checked={value.status} onChange={handleCheckboxChange('status')} value="status" />}
                        label="Status"
                    />
                    <Button onClick={handleSave} variant="contained" color="primary" className={classes.button}>
                        <SaveIcon /> Save
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}



export default withHocs(UsersForm);

