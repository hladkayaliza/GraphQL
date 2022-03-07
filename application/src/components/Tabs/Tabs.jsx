import {Typography} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from "react";
import SwipeableViews from 'react-swipeable-views';
import UserIcon from '@material-ui/icons/Person';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';

import withHocs from './TabsHoc';
import Users from "../Users/Users";
const TabContainer = ({ children, dir }) => (
    <Typography component='div' dir={dir} style={{padding: 8 * 3 }}>
        {children}
    </Typography>
);

class SimpleTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => { this.setState({ value }); };
    handleChangeIndex = index => { this.setState({ value: index }) };

    render() {
        const { classes, theme } = this.props;
        const { value } = this.state;

        return(
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                        <Tab label="Users" icon={<UserIcon />} />
                        <Tab label="Cars" icon={<DirectionsCarIcon />} />
                    </Tabs>
                </AppBar>
                <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={this.handleChangeIndex} >
                    <TabContainer dir={theme.direction}><Users /></TabContainer>
                    <TabContainer dir={theme.direction}>2</TabContainer>
                </SwipeableViews>
            </div>
        );
    };
}

export default withHocs(SimpleTabs);