import React from "react";
import withHocs from './UsersTableHoc';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Checkbox from '@material-ui/core/Checkbox';
import UserDialog from "../UsersDialog/UsersDialog";


class UsersTable extends React.Component {

    state = {
        anchorEl: null,
        openDialog: false,
    };

    handleDialogOpen = () => { this.setState({ openDialog: true }); };
    handleDialogClose = () => { this.setState({ openDialog: false }); };

    handleClick = ({ currentTarget }, data) => {
        this.setState({
            anchorEl: currentTarget,
            data
        });
    };

    handleClose = () => { this.setState({ anchorEl: null }); };

    handleEdit = (row) => {
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
        const { users = []} = data;

        return (
            <>
                <UserDialog open={openDialog} handleClose={this.handleDialogClose} id={activeElem.id} />
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
                        {users.map(user => {
                            return (
                                <TableRow key={user.id}>
                                    <TableCell component="th" scope="row">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Checkbox
                                            key={user.status}
                                            checked={user.status}
                                            disabled={true}
                                        />
                                    </TableCell>

                                    <TableCell align="right">
                                        <>
                                            <IconButton color="inherit" onClick={(e) => this.handleClick(e, user)}>
                                                <MoreIcon />
                                            </IconButton>
                                            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                                                <MenuItem onClick={() => this.handleEdit(user)}><CreateIcon />Edit</MenuItem>
                                                <MenuItem onClick={this.handleDelete}><DeleteIcon /> Delete</MenuItem>
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

export default withHocs(UsersTable);