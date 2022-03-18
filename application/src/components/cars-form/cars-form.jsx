import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
import withHocs from './cars-form-hoc';
import {useMutation, useQuery} from '@apollo/client';
import {carsQuery} from '../cars-table/queires';
import {addCarMutation, updateCarMutation} from './mutations';
import {usersQuery} from '../users-table/queries';
import {modelsQuery, brandsQuery} from '../cars-form/queries';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function CarsForm({open, onClose, selectedValue, handleChange, handleSelectChange, classes}) {
    const [value, setValue] = useState(selectedValue);
    const [models, setModels] = useState([]);

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

    const {loading: loadingUsers, data: dataUsers} = useQuery(usersQuery);
    const {loading: loadingModels, data: dataModels} = useQuery(modelsQuery);
    const {loading: loadingBrands, data: dataBrands} = useQuery(brandsQuery);

    useEffect(() => {
        setValue(selectedValue);
    }, [selectedValue]);

    const onChange = (e) => {
        handleChange(e.target.name, e.target.value);
    };

    const onBrandChange = (e) => {
        handleChange(e.target.name, e.target.value);
        const targetModels = client.readQuery({
            query: modelsQuery,
            variables: {
                brandId: e.target.value,
            }
        });
        setModels(targetModels);
    }

    const handleSave = () => {
        value.id ? updateCar({
            variables: {
                modelId: value.model.id,
                type: value.type,
                year: value.year,
                ownerId: value.owner.id,
                color: value.color,
            }
        })
        : addCar({
                variables: {
                    modelId: value.model.id,
                    type: value.type,
                    year: value.year,
                    ownerId: value.owner.id,
                    color: value.color,
                }
            });
        ;
        onClose();
    };

    const handleClose = () => {
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
                    <Select value={value.model.brand.id} onChange={onChange}
                            input={<OutlinedInput name='ownerId' id='outlined-user' labelWidth={57}/>}
                    >
                        {!loadingBrands && dataBrands.brands.map(brand =>
                            <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>)}
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
                    <Select value={value.owner.id} onChange={onChange}
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