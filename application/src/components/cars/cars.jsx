import React, {useState} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CarsForm from "../cars-form/cars-form";
import CarsTable from "../cars-table/cars-table";

import withHocs from './cars-hoc';

function Cars({classes}) {
    const initValue = {
        id: '',
        model: {
            id: '',
            model: '',
            brand: {
                id: '',
                name: '',
            },
        },
        type: '',
        color: '',
        year: 0,
        owner: {
            id: '',
            name: ''
        },
    };

    const [model, setModel] = useState(initValue);
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleClickOpenOnEdit = (data ) => {
        setIsEdit(true);
        setModel({...model, ...data});
        setOpen(true);
    };
    const handleClickOpenOnAdd = (initValue) => {
        setIsEdit(false);
        setModel({...model, ...initValue});
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
                          isEdit={isEdit}
                />
                <div className={classes.wrapper}>
                    <CarsTable onOpen={handleClickOpenOnEdit} onClose={handleClose} />
                    <Fab onClick={handleClickOpenOnAdd}
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