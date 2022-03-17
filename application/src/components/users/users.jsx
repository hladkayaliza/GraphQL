import React, { useState } from 'react';
import withHocs from './user-hoc';
import UsersTable from '../users-table/users-table';
import UsersForm from '../users-form/users-form';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function Users({classes}) {
    const initValue = {
        id: '',
        name: '',
        email: '',
        status: false,
    };

    const [model, setModel] = useState(initValue);
    const [open, setOpen] = useState(false);

    const handleClickOpen = (data = initValue) => {
        setModel({...model, ...data});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setModel(initValue);
    };

    const handleChange = (name, value) => {
        if (value !== undefined || value !== '' || value !== null) {
            let currentModel = model;
            currentModel[name] = value;
            setModel({...model, currentModel});
        }
    }

    return (
        <>
            <UsersForm handleChange={handleChange}
                       selectedValue={model}
                       open={open}
                       onClose={handleClose}
            />
            <div className={classes.wrapper}>
                <UsersTable onOpen={handleClickOpen} onClose={handleClose} />
                 <Fab onClick={handleClickOpen}
                      color="primary"
                      aria-label="Add"
                      className={classes.fab}
                 >
                     <AddIcon />
                 </Fab>
            </div>
        </>
    );
}

export default withHocs(Users);