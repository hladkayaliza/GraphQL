import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CarsDialog from '../cars-dialog/cars-dialog';
import withHocs from './cars-table-hoc';
import { carsQuery } from '../cars-table/queires';
import { useQuery } from '@apollo/client';

function CarsTable({classes, onOpen}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeElem, setActiveElem] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const {loading, error, data} = useQuery(carsQuery);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleClick = ({ currentTarget }, data) => {
        setAnchorEl(currentTarget);
        setActiveElem(data);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = (data) => {
        onOpen(data);
        handleClose();
    };

    const handleDelete = () => {
        handleDialogOpen();
        handleClose();
    };

    return loading ? <h3>Loading...</h3>
        : <>
            <CarsDialog open={openDialog} handleClose={handleDialogClose} id={activeElem ? activeElem.id : null} />
            <Paper className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Color</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Owner</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.cars.map(car => {
                            return (
                                <TableRow key={car.id}>
                                    <TableCell component="th" scope="row">{car.model.brand}</TableCell>
                                    <TableCell component="th" scope="row">{car.model.model}</TableCell>
                                    <TableCell component="th" scope="row">{car.type}</TableCell>
                                    <TableCell component="th" scope="row">{car.color}</TableCell>
                                    <TableCell component="th" scope="row">{car.year}</TableCell>
                                    <TableCell component="th" scope="row">{car.owner.name}</TableCell>
                                    <TableCell align="right">
                                        <>
                                            <IconButton color="inherit" onClick={(e) => handleClick(e, car)}>
                                                <MoreIcon />
                                            </IconButton>
                                            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
                                                <MenuItem onClick={handleEdit}><CreateIcon /> Edit</MenuItem>
                                                <MenuItem onClick={handleDelete}><DeleteIcon/> Delete</MenuItem>
                                            </Menu>
                                        </>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
         </>;
}

export default withHocs(CarsTable);