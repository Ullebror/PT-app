import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    const deleteCustomer = (url) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, {method: 'DELETE'})
            .then(response => {
                if(response.ok){
                    setOpen(true);
                    fetchCustomers();
                } else {
                    throw new Error("error in deletion: " + response.statusText);
                }
            })
            .catch(err => console.error(err));
        }
    }


    const [columnDefs] = useState([
        {
            field: 'firstname',
            headerName: 'First Name',
            sortable: true, 
            filter: true, 
            width: 140,
        },
        {
            field: 'lastname',
            headerName: 'Last Name', 
            sortable: true, 
            filter: true, 
        },
        { 
            field: 'streetaddress',
            headerName: 'Street Address',
            sortable: true,
            filter: true, 
        },
        {
            field: 'postcode',
            sortable: true,
            filter: true,
            width: 120, 
        },
        {
            field: 'city',
            sortable: true,
            filter: true, 
            width: 120,
        },
        {
            field: 'email',
            sortable: true,
            filter: true, 
        },
        {
            field: 'phone',
            sortable: true,
            filter: true, 
            width: 140,
        },
        //sends the parameters as customerdata to AddTraining
        {
            cellRenderer: params => <AddTraining customerdata={params.data} />, width: 70
            
        },

        {
            cellRenderer: params => <EditCustomer customerdata={params.data} fetchCustomers={fetchCustomers} />,
            width: 70,
        },
        {
            cellRenderer: params => (<Tooltip title="Delete"><IconButton onClick={() => deleteCustomer(params.data.links[0].href)}><DeleteIcon color="warning"></DeleteIcon></IconButton></Tooltip>),
             width: 70,
        },

    ]);

    useEffect(() => {
        fetchCustomers();
    },[])

    const fetchCustomers = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
        .then(response => {
            if (response.ok)
                return response.json();

                throw new Error("Something went wrong: " + response.statusText);
        })
        .then(responseData => setCustomers(responseData.content))
        .catch(err => console.error(err))
    }

    return(
        <>
            <AddCustomer fetchCustomers={fetchCustomers} />            
            <div className='ag-theme-material' style={{ width: '100%', height: 600}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                 />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Customer deleted succesfully"
            />
        </>
    );
}

export default Customerlist;