import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from 'dayjs';

function Trainingslist() {
    const [trainings, setTrainings] = useState([]);

function fullNameGetter(params) {
    return params.data.customer.firstname + " " + params.data.customer.lastname;
}


    const [columnDefs] = useState([
        {   field: 'date', 
            sortable: true, 
            filter: true, 
            valueFormatter: function (params) {
            return dayjs(params.value).format('DD.MM.YYYY HH:mm')
            }, 
        },
        {field: 'duration', sortable: true, filter: true },
        {field: 'activity', sortable: true, filter: true },
        {headerName:'Customer', field: 'firstname&lastname', valueGetter: fullNameGetter, sortable: true, filter: true}
        
    ]);

    useEffect(() => {
        fetchTrainings();
    },[])

    const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => {
            if (response.ok)
                return response.json();

                throw new Error("Something went wrong: " + response.statusText);
        })
        .then(responseData => setTrainings(responseData))
        .catch(err => console.error(err))
    }
    

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            
            <div className='ag-theme-material' style={{ width: '100%', height: 600}}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}

                 />

            </div>
        </LocalizationProvider >
    );
}

export default Trainingslist;