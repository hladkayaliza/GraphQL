import React, {useEffect, useState} from 'react';
import withHocs from './cars-form-hoc';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {useMutation, useQuery} from '@apollo/client';
import { usersQuery } from '../users-table/queries';
import { brandsQuery } from './queries';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addCarMutation, updateCarMutation } from './mutations';
import { carsQuery } from '../cars-table/queires';


function CarsForm({open, onClose, classes, handleChange, selectedValue, carModels}) {

    const [value, setValue] = useState(selectedValue);
    const [models, setModels] = useState(carModels);

    const [addCar] = useMutation(addCarMutation, {
        refetchQueries: [
            carsQuery,
        ],
    });
    const [updateCar] = useMutation(updateCarMutation, {
        refetchQueries: [
            carsQuery,
        ],
    });

    useEffect(() => {
        setValue(selectedValue);
        setModels(carModels);
    }, [selectedValue, carModels]);

    const {loading: loadingUsers, data: dataUsers} = useQuery(usersQuery, {
        fetchPolicy: "cache-first"
    });
    const {loading: loadingBrands, data: dataBrands} = useQuery(brandsQuery, {
        fetchPolicy: "cache-first"
    });

    const onChange = (e) => {
        handleChange(e.target.name, e.target.value);
    }

    const handleSave = () => {
        value.id ? updateCar({
                variables: {
                    id: value.id,
                    modelId: value.modelId,
                    type: value.type,
                    year: value.year,
                    ownerId: value.ownerId,
                    color: value.color,
                }
            })
            : addCar({
                variables: {
                    modelId: value.modelId,
                    type: value.type,
                    year: value.year,
                    ownerId: value.ownerId,
                    color: value.color,
                }
            });
        onClose();
    };

    return (
        <Dialog onClose={onClose} open={open} aria-labelledby="simple-dialog-title">
            <DialogTitle className={classes.title} id="simple-dialog-title">Car information</DialogTitle>
            <form className={classes.container} noValidate autoComplete="off">
                <FormControl variant='outlined' className={classes.formControlSelect}>
                    <InputLabel htmlFor='outlined-age-simple'>
                        Brand
                    </InputLabel>
                    <Select value={value.brandId} onChange={onChange}
                            input={<OutlinedInput name='brandId' id='outlined-user' labelWidth={57}/>}
                    >
                        {!loadingBrands && dataBrands.brands.map(brand =>
                            <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant='outlined' className={classes.formControlSelect}>
                    <InputLabel htmlFor='outlined-age-simple'>
                        Model
                    </InputLabel>
                    <Select value={value.modelId} onChange={onChange}
                            input={<OutlinedInput name='modelId' id='outlined-user' labelWidth={57}/>}
                    >
                        {models && models.map(model =>
                            <MenuItem key={model.id} value={model.id}>{model.model}</MenuItem>)}
                    </Select>
                </FormControl>
                <TextField
                    id='outlined-type'
                    label='Type'
                    name='type'
                    className={classes.textField}
                    margin='normal'
                    variant='outlined'
                    value={value.type}
                    onChange={onChange}
                />
                <TextField
                    id='outlined-color'
                    label='Color'
                    name='color'
                    className={classes.textField}
                    margin='normal'
                    variant='outlined'
                    value={value.color}
                    onChange={onChange}
                />
                <FormControl variant='outlined' className={classes.formControlSelect}>
                    <InputLabel htmlFor='outlined-age-simple'>
                        Owner
                    </InputLabel>
                    <Select value={value.ownerId} onChange={onChange}
                            input={<OutlinedInput name='ownerId' id='outlined-user' labelWidth={57}/>}
                    >
                        {!loadingUsers && dataUsers.users.map(user =>
                            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <div className={classes.wrapper}>
                    <Button onClick={handleSave} variant='contained' color='primary' className={classes.button}>
                        <SaveIcon /> Save
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}

export default withHocs(CarsForm);