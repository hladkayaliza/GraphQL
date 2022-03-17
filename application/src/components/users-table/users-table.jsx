import React, { useState } from "react";
import withHocs from './users-table-hoc';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Checkbox from '@material-ui/core/Checkbox';
import UserDialog from '../users-dialog/users-dialog';
import {useQuery} from '@apollo/client';
import { usersQuery } from './queries';


function UsersTable({onOpen, classes}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeElem, setActiveElem] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const {loading, error, data} = useQuery(usersQuery);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleClick = ({currentTarget}, data) => {
        setAnchorEl(currentTarget);
        setActiveElem(data);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = (row) => {
        onOpen(row);
        handleClose();
    };

    const handleDelete = (row) => {
        handleDialogOpen();
        handleClose();
    };

    return loading ?  <h3>Loading...</h3>
                    : <>
                            <UserDialog open={openDialog} handleClose={handleDialogClose} id={activeElem ? activeElem.id : null} />
                            <Paper className={classes.root}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Cars</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.users.map(user => {
                                            return (
                                                <TableRow key={user.id}>
                                                    <TableCell component="th" scope="row">{user.name}</TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>
                                                        <Checkbox key={user.status}
                                                                  checked={user.status}
                                                                  disabled={true}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <>
                                                            <IconButton color="inherit" onClick={(e) => handleClick(e, user)}>
                                                                <MoreIcon />
                                                            </IconButton>
                                                            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                                                <MenuItem onClick={() => handleEdit(activeElem)}><CreateIcon />Edit</MenuItem>
                                                                <MenuItem onClick={handleDelete}><DeleteIcon /> Delete</MenuItem>
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
}

export default withHocs(UsersTable);