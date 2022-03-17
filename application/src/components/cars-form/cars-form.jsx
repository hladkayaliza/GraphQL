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

function CarsForm({open, onClose, selectedValue, handleChange, classes}) {
    const [value, setValue] = useState(selectedValue);

    const onChange = (e) => {
        handleChange(e.target.name, e.target.value);
    }
    // {open, classes, handleChange, onClose, selectedValue}

    // const [value, setValue] = useState(selectedValue);
    //
    // const [addCar] = useMutation(addCarMutation, {
    //     refetchQueries: [
    //         carsQuery,
    //     ],
    // })
    // const [updateCar] = useMutation(updateCarMutation, {
    //     refetchQueries: [
    //         carsQuery,
    //     ],
    // })
    //
    // useEffect(() => {
    //     setValue(selectedValue);
    // }, [selectedValue]);
    //
    // const [users] = useQuery(usersQuery)
    //
    //
    // const handleClose = () => {
    //     onClose();
    // };
    // const onChange = (e) => {
    //     // let value = ? e.target.checked : e.target.value;
    //     // handleChange(e.target.name, value);
    // };

    // const handleSave = () => {
    //     value.id ? updateCar({
    //             variables: {
    //                 modelId: value.modelId,
    //                 type: value.type,
    //                 year: value.year,
    //                 ownerId: value.ownerId,
    //                 color: value.color,
    //             }
    //     })
    //         : addCar({
    //         variables: {
    //             modelId: value.modelId,
    //             type: value.type,
    //             year: value.year,
    //             ownerId: value.ownerId,
    //             color: value.color,
    //         }
    //     });
    //     onClose();
    // };

    return (
        <Dialog onClose={onClose} open={open} aria-labelledby="simple-dialog-title">
            <DialogTitle className={classes.title} id="simple-dialog-title">Car information</DialogTitle>
            <form className={classes.container} noValidate autoComplete="off">
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
            </form>
        </Dialog>

    );

}

export default withHocs(CarsForm);