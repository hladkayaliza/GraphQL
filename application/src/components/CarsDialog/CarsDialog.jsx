import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BlockIcon from '@material-ui/icons/Block';
import withHocs from './CarsDialogHoc';

class CarsDialog extends React.Component {
    handleDelete = () => {
        const { id, handleClose, deleteCar } = this.props;
        deleteCar(id);
        handleClose();
    }

    render() {
        const { open, handleClose } = this.props;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Are you sure that you want to delete element?
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
                    <Button onClick={this.handleDelete} color="primary" autoFocus>
                        <DeleteForeverIcon/> Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

// export default withHocs(CarsDialog);
export default CarsDialog;