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
import {useMutation, useQuery, useLazyQuery, useApolloClient} from '@apollo/client';
import {carsQuery} from '../cars-table/queires';
import {addCarMutation, updateCarMutation} from './mutations';
import {usersQuery} from '../users-table/queries';
import {modelsQuery, modelsByBrandQuery, brandsQuery} from '../cars-form/queries';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


function CarsForm({open, onClose, selectedValue, handleChange, handleSelectChange, classes, isEdit}) {
    const [value, setValue] = useState(selectedValue);
    const [brand, setBrand] = useState(isEdit ? selectedValue.model.brand.id : '');

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
    const {loading: loadingBrands, data: dataBrands} = useQuery(brandsQuery);

    const {loading: loadingModels, data: dataModels} = isEdit ? targetModels(selectedValue.model.brand.id)
    : useQuery(modelsQuery);

    const [models, setModels] = useState(dataModels);




    const targetModels = (brandId) => {
        return useQuery(modelsByBrandQuery, {
            variables: {
                brandId: brandId,
            }
        })
    };


    useEffect(() => {
        setValue(selectedValue);
    }, [selectedValue]);

    const onChange = (e) => {
        handleChange(e.target.name, e.target.value);
    };

    const onBrandChange = (e) => {
        const models = targetModels(e.target.value);
        setModels(models);
        // const models = getModels({
        //     variables: { brandId: e.target.value }
        // }).then(result => {
        //     setModels(result.data.modelsByBrand);
        // });
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
                    <Select value={value.model.brand.id} onChange={onBrandChange}
                                input={<OutlinedInput name='brandId' id='outlined-user' labelWidth={57}/>}
                    >
                        {!loadingBrands && dataBrands.brands.map(brand =>
                            <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>)}
                    </Select>
                </FormControl>
                {console.log(dataModels)}
                <FormControl variant='outlined' className={classes.formControlSelect}>
                    <InputLabel htmlFor='outlined-age-simple'>
                        Model
                    </InputLabel>
                    <Select disabled={!isEdit}
                            value={value.model.id}
                            onChange={onChange}
                            input={<OutlinedInput name='modelId' id='outlined-user' labelWidth={57}/>}
                    >
                        {!loadingModels && dataModels.modelsByBrand && dataModels.modelsByBrand.map(model =>
                            <MenuItem key={model.id} value={model.id}>{model.model}</MenuItem>)}
                    </Select>
                </FormControl>

                {/*{isEdit ? <h1>Liza</h1> : <h1>Inna</h1>}*/}

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