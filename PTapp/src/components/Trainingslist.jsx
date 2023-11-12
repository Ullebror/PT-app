import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Snackbar from '@mui/material/Snackbar';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from 'dayjs';

function Trainingslist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

function fullNameGetter(params) {
    return params.data.customer.firstname + " " + params.data.customer.lastname;
}

const deleteTraining = (id) => {
    if (window.confirm("Are you sure?")) {
        const url = 'https://traineeapp.azurewebsites.net/api/trainings/' + id
        fetch(url, {method: 'DELETE'})
        .then(response => {
            if(response.ok){
                setOpen(true);
                fetchTrainings();
            } else {
                throw new Error("error in deletion: " + response.statusText);
            }
        })
        .catch(err => console.error(err));
    }
}


    const [columnDefs] = useState([
        {   
            field: 'date', 
            sortable: true, 
            filter: true, 
            valueFormatter: function (params) {
            return dayjs(params.value).format('DD.MM.YYYY HH:mm')
            }, 
        },
        {
            field: 'duration',
            sortable: true,
            filter: true, 
        },
        {
            field: 'activity',
            sortable: true,
            filter: true, 
        },
        {
            field: 'firstname&lastname',
            headerName:'Customer',
            valueGetter: fullNameGetter,
            sortable: true,
            filter: true,
        },
        {
            cellRenderer: params => <Button onClick={() => deleteTraining(params.data.id.toString())}>Delete</Button>,
             width: 120
        },
        
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
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Training deleted succesfully"
            />
        </LocalizationProvider >
    );
}

export default Trainingslist;