import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import BlockIcon from '@material-ui/icons/Block';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useMutation } from '@apollo/client';
import { deleteUserMutation } from './mutations';
import { usersQuery } from '../users-table/queries';

function UserDialog({open, handleClose, id}) {

    const [deleteUser] = useMutation(deleteUserMutation, {
        refetchQueries: [
            usersQuery,
        ],
    });

    const handleDelete = () => {
        deleteUser({
            variables: {
                id: id,
            }
        });
        handleClose();
    }

    return (
        <Dialog open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Are you sire that you want to delete element?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    If you click 'Confirm' this element will be removed from data base.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    <BlockIcon /> Cancel
                </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                    <DeleteForeverIcon /> Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserDialog;