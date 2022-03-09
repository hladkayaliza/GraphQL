import React from 'react';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from "@material-ui/core/FormControl";
import withHocs from './CarsFormHoc';

class CarsForm extends React.Component{

    handleClose = () => {
        this.props.onClose();
    };

    handleSave = () => {
        const { selectedValue, onClose, addCar, updateCar } = this.props;
        const { id, model, brand, color, type, year, ownerId } = selectedValue;
        id ?
            updateCar({id, model, brand, color, type, year, ownerId}) :
            addCar({model, brand, color, type, year, ownerId });
        onClose();
    };

    render() {
        const { classes, open, handleChange, handleSelectChange, selectedValue = {}, data = {} } = this.props;
        const { model, brand, color, type, year, ownerId } = selectedValue;
        const { users = [] } = data;

        return (
            <Dialog onClose={this.handleClose} open={open} aria-labelledby="simple-dialog-title">
                <DialogTitle className={classes.title} id="simple-dialog-title">Car information</DialogTitle>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="outlined-brand"
                        label="Brand"
                        className={classes.textField}
                        value={brand}
                        onChange={handleChange('brand')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-model"
                        label="Model"
                        className={classes.textField}
                        value={model}
                        onChange={handleChange('model')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-color"
                        label="Color"
                        className={classes.textField}
                        value={color}
                        onChange={handleChange('color')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-type"
                        label="Type"
                        className={classes.textField}
                        value={type}
                        onChange={handleChange('type')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-year"
                        label="Year"
                        value={year}
                        onChange={handleChange('year')}
                        type="number"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    <FormControl variant="outlined" className={classes.formControlSelect}>
                        <InputLabel
                            ref={ref => { this.InputLabelRef = ref; }}
                            htmlFor="outlined-age-simple"
                        >
                            Owner
                        </InputLabel>
                        <Select
                            value={ownerId}
                            onChange={handleSelectChange}
                            input={<OutlinedInput name="ownerId" id="outlined-user" labelWidth={57}/>}
                        >
                            {users.map(user => <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Button onClick={this.handleSave} variant="contained" color="primary" className={classes.button}>
                        <SaveIcon /> Save
                    </Button>
                </form>
            </Dialog>
        );
    }
}

export default withHocs(CarsForm);