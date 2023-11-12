import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddTraining from './AddTraining';

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
        },
        {
            cellRenderer: params => <AddTraining customerdata={params.data} />,
            
        },

        {
            cellRenderer: params => <EditCustomer customerdata={params.data} fetchCustomers={fetchCustomers} />,
            width: 120
        },
        {
            cellRenderer: params => <Button onClick={() => deleteCustomer(params.data.links[0].href)}>Delete</Button>,
             width: 120
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