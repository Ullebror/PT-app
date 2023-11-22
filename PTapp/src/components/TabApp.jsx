import { useState } from 'react';

import Customerlist from './Customerlist';
import Trainingslist from './Trainingslist';
import MyCalendar from './MyCalendar';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Statistics from './Statistics';

function TabApp() {
    const [value, setValue] = useState('one');
    const handleChange = (event, value) => {
        setValue(value);
    }

    return (
    <Container>
        <AppBar color='transparent'>
            <Toolbar>
                <Typography variant="h6">Private Trainer App</Typography>
            </Toolbar>
            <Tabs value={value} onChange={handleChange}>
                <Tab value="one" label="Customers" />
                <Tab value="two" label="Trainings" />
                <Tab value="three" label="Calendar" />
                <Tab value="four" label="Statistics" />
            </Tabs>
            {value === 'one' &&  <div><Customerlist /></div>}
            {value === 'two' &&  <div> <Trainingslist /></div>}
            {value === 'three' &&  <div> <MyCalendar /></div>}
            {value === 'four' &&  <div> <Statistics /></div>}
            
        </AppBar>
    </Container>
    );
}

export default TabApp;