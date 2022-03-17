import React, {useState} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CarsForm from "../cars-form/cars-form";
import CarsTable from "../cars-table/cars-table";

import withHocs from './cars-hoc';

function Cars({classes}) {
    const initValue = {
        id: '',
        modelId: '',
        type: '',
        color: '',
        year: 0,
        ownerId: '',
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
        let currentModel = model;
        currentModel[name] = value;
        setModel({...model, currentModel});
    };

    return (
            <>
                <CarsForm handleChange={handleChange}
                          selectedValue={model}
                          open={open}
                          onClose={handleClose}
                />
                <div className={classes.wrapper}>
                    <CarsTable onOpen={handleClickOpen} onClose={handleClose} />
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

export default withHocs(Cars);