import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CarsForm from "../CarsForm/CarsForm";
import CarsTable from "../CarsTable/CarsTable";

import withHocs from './CarHoc';

class Cars extends React.Component {

    state = {
        open: false,
        brand: '',
        model: '',
        type: '',
        color: '',
        year: 0,
        ownerId: '',
    }

    handleClickOpen = (data = {}) => {
        this.setState({
            open: true,
            ...data,
            ownerId: data.owner ? data.owner.id : '',
        });
    };

    handleClose = () => {
        this.setState({
            brand: '',
            model: '',
            type: '',
            color: '',
            year: 0,
            ownerId: '',
            open: false
        });
    };

    handleSelectChange = ({ target }) => { this.setState({ [target.name]: target.value }); };
    handleChange = name => ({ target }) => { this.setState({ [name]: target.value }); };

    render() {

        const { id, brand, model, type, color, year, ownerId, open } = this.state;
        const { classes } = this.props;

        return (
            <>
                <CarsForm handleChange={this.handleChange} handleSelectChange={this.handleSelectChange}  selectedValue={{ id, brand, model, type, color, year, ownerId }} open={open} onClose={this.handleClose} />
                <div className={classes.wrapper}>
                    <CarsTable onOpen={this.handleClickOpen} onClose={this.handleClose} />
                    <Fab onClick={() => this.handleClickOpen()} color="primary" aria-label="Add" className={classes.fab}>
                        <AddIcon />
                    </Fab>
                </div>
            </>
        );
    }
};

export default withHocs(Cars);