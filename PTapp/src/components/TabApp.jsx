import React, { useState } from 'react';
import Customerlist from './Customerlist';
import Trainingslist from './Trainingslist';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TabApp() {
    const [value, setValue] = useState('one');
    const handleChange = (event, value) => {
        setValue(value);
    }

    return (<div>
        <Tabs value={value} onChange={handleChange}>
            <Tab value="one" label="Customers" />
            <Tab value="two" label="Trainings" />
        </Tabs>
        {value === 'one' &&  <div><Customerlist /></div>}
        {value === 'two' &&  <div> <Trainingslist /></div>}
    </div>
    );
}

export default TabApp;