import React, {useEffect, useState} from 'react';
import { useMutation } from '@apollo/client';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import withHocs from './users-form-hoc';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { addUserMutation, updateUserMutation } from './mutations';
import { STATUS } from '../../constants/user';
import { usersQuery } from '../users-table/queries';

function UsersForm({open, classes, handleChange, onClose, selectedValue}) {

    const [value, setValue] = useState(selectedValue);

    const [addUser] = useMutation(addUserMutation, {
        refetchQueries: [
            usersQuery,
        ],
    });
    const [updateUser] = useMutation(updateUserMutation, {
        refetchQueries: [
            usersQuery,
        ],
    });

    useEffect(() => {
        setValue(selectedValue);
    }, [selectedValue]);

    const handleSave = () => {
        value.id ? updateUser({
                variables: {
                    id: value.id,
                    name: value.name,
                    email: value.email,
                    status: value.status
                }
            } )
            : addUser( {
                variables: {
                    name: value.name,
                    email: value.email,
                    status: value.status
                }
            });
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    const onChange = (e) => {
        let value = e.target.name === STATUS
            ? e.target.checked
            : e.target.value;
        handleChange(e.target.name, value);
    };

    return(
        <Dialog onClose={handleClose} open={open} aria-labelledby="simple-dialog-title">
            <DialogTitle className={classes.title} id="simple-dialog-title">User information</DialogTitle>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
                    name="name"
                    value={value.name}
                    onChange={onChange}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-email"
                    label="Email"
                    className={classes.textField}
                    name="email"
                    value={value.email}
                    onChange={onChange}
                    type="email"
                    margin="normal"
                    variant="outlined"
                />
                <div className={classes.wrapper}>
                    <FormControlLabel
                        control={
                            <Checkbox name="status"
                                      checked={value.status}
                                      onChange={onChange}
                            />
                        }
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