import React from 'react';
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
import CarsDialog from '../CarsDialog/CarsDialog';
import withHocs from './CarsTableHoc';


class CarsTable extends React.Component {
    state = {
        anchorEl: null,
        openDialog: false,
    };

    handleDialogOpen = () => { this.setState({ openDialog: true }); };
    handleDialogClose = () => { this.setState({ openDialog: false }); };

    handleClick = ({ currentTarget }, data) => {
        this.setState({
            anchorEl: currentTarget,
            data,
        });
    };

    handleClose = () => { this.setState({ anchorEl: null }); };

    handleEdit = () => {
        this.props.onOpen(this.state.data);
        this.handleClose();
    };

    handleDelete = () => {
        this.handleDialogOpen();
        this.handleClose();
    };

    render() {
        const { anchorEl, openDialog, data: activeElem = {} } = this.state;
        const { classes, data = {} } = this.props;
        const { cars = [] } = data;

        return (
            <>
                <CarsDialog open={openDialog} handleClose={this.handleDialogClose} id={activeElem.id} />
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
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cars.map(car => {
                                return (
                                    <TableRow key={car.id}>
                                        <TableCell component="th" scope="row">{car.brand}</TableCell>
                                        <TableCell>{car.model}</TableCell>
                                        <TableCell>{car.type}</TableCell>
                                        <TableCell>{car.color}</TableCell>
                                        <TableCell>{car.year}</TableCell>
                                        <TableCell>{car.owner.name}</TableCell>
                                        <TableCell align="right">
                                            <>
                                                <IconButton color="inherit" onClick={(e) => this.handleClick(e, car)}>
                                                    <MoreIcon />
                                                </IconButton>
                                                <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} >
                                                    <MenuItem onClick={this.handleEdit}><CreateIcon /> Edit</MenuItem>
                                                    <MenuItem onClick={this.handleDelete}><DeleteIcon/> Delete</MenuItem>
                                                </Menu>
                                            </>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </>
        );
    }
}

export default withHocs(CarsTable);