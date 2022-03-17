import {Typography} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React, {useState} from "react";
import SwipeableViews from 'react-swipeable-views';
import UserIcon from '@material-ui/icons/Person';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';

import withHocs from './tabs-hoc';
import Users from '../users/users';
import Cars from '../cars/cars';
const TabContainer = ({ children, dir }) => (
    <Typography component='div' dir={dir} style={{padding: 8 * 3 }}>
        {children}
    </Typography>
);

function SimpleTabs({classes, theme}) {
    const [value, setValue] = useState(0);

    const handleChange = (event, value) => {
        setValue(value);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs variant="fullWidth" value={value} onChange={handleChange}>
                    <Tab label="Users" icon={<UserIcon />} />
                    <Tab label="Cars" icon={<DirectionsCarIcon />} />
                </Tabs>
            </AppBar>
            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                <TabContainer dir={theme.direction}><Users /></TabContainer>
                <TabContainer dir={theme.direction}><Cars /></TabContainer>
            </SwipeableViews>
        </div>
    );
}

export default withHocs(SimpleTabs);