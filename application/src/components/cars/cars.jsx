import React, {useState} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CarsForm from "../cars-form/cars-form";
import CarsTable from "../cars-table/cars-table";

import withHocs from './cars-hoc';
import {useLazyQuery} from "@apollo/client";
import {modelsByBrandQuery} from "../cars-form/queries";

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
    const [getModels] = useLazyQuery(modelsByBrandQuery);

    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);


    const handleClickOpenOnEdit = (data) => {
        setIsEdit(true);
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
        getModels({
            variables: {
                brandId: model.brandId
            }
        }).then(res => {
            setCarModels(res.data.modelsByBrand);
        });

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
        if (name === "brandId") {
            getModels({
                variables: {
                    brandId: currentModel.brandId
                }
            }).then(res => {
                setCarModels(res.data.modelsByBrand);
            });
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