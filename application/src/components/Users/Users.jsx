import React, { useState } from 'react';

import withHocs from './UserHoc';
import UsersTable from "../UsersTable/UsersTable";
import UsersForm from "../UsersForm/UsersForm";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

function Users({classes}) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = (data) => {
        setOpen(true);
    };

    const handleClose = () => {
        setName('');
        setEmail('');
        setOpen(false);
        setStatus(false);
    };

    const handleChange = (name) => ({target}) => {
        switch (name) {
            case 'name':
                setName(target.value);
                break;
            case 'email':
                setEmail(target.value);
                break;
            case 'status':
                setStatus(target.value);
                break;
            case 'open':
                setOpen(target.value);
                break;
            default: break;
        }
    }

    const handleCheckboxChange = (name) => ({target}) => {
        switch (name) {
            case 'name':
                setName(target.value);
                break;
            case 'email':
                setEmail(target.value);
                break;
            case 'status':
                setStatus(target.value);
                break;
            case 'open':
                setOpen(target.value);
                break;
            default: break;
        }
    }


    return (
        <>
            {/*<UsersForm handleChange={handleChange}*/}
            {/*           handleCheckboxChange={handleCheckboxChange}*/}
            {/*           selectedValue={{id, name, email, status}}*/}
            {/*           open={open}*/}
            {/*           onClose={handleClose}*/}
            {/*>*/}
            {/*    <div className={classes.wrapper}>*/}
            {/*        /!*<UsersTable onOpen={handleClickOpen} onClose={handleClose} />*!/*/}
            {/*         <Fab onClick={handleClickOpen(null)}*/}
            {/*              color="primary"*/}
            {/*              aria-label="Add"*/}
            {/*              className={classes.fab}*/}
            {/*         >*/}
            {/*             <AddIcon />*/}
            {/*         </Fab>*/}
            {/*    </div>*/}
            {/*</UsersForm>*/}
        </>
    );
}

export default withHocs(Users);