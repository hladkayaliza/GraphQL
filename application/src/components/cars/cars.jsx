import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CarsForm from '../cars-form/cars-form';
import CarsTable from '../cars-table/cars-table';
import withHocs from './cars-hoc';
import { useLazyQuery } from '@apollo/client';
import { modelsByBrandQuery } from '../cars-form/queries';
import { BRANDID } from '../../constants/user';

function Cars({classes}) {
    const initValue = {
        id: '',
        modelId: '',
        brandId: '',
        type: '',
        color: '',
        year: 0,
        ownerId: '',
    };

    const [model, setModel] = useState(initValue);
    const [carModels, setCarModels] = useState([]);
    const [open, setOpen] = useState(false);

    const [getModels] = useLazyQuery(modelsByBrandQuery);

    const updateModels = (brandId) => {
        getModels({
            variables: {
                brandId: brandId
            }
        }).then(res => {
            setCarModels(res.data.modelsByBrand);
        });
    };

    const handleClickOpenOnEdit = (data) => {
        const model = {
            id: data.id,
            modelId: data.model.id,
            brandId: data.model.brand.id,
            type: data.type,
            color: data.color,
            year: data.year,
            ownerId: data.owner.id
        };
        setModel(model);
        updateModels(model.brandId)
        setOpen(true);
    };

    const handleClickOpenOnAdd = (initValue) => {
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
        if (name === BRANDID) {
            updateModels(currentModel.brandId);
        }
        setModel({...model, currentModel});
    };

    return (
            <>
                <CarsForm handleChange={handleChange}
                          selectedValue={model}
                          carModels={carModels}
                          open={open}
                          onClose={handleClose}
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