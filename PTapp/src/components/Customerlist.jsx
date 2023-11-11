import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Customerlist() {
    const [customers, setCustomers] = useState([]);


    const [columnDefs] = useState([
        {headerName: 'First Name', field: 'firstname', sortable: true, filter: true },
        {headerName: 'Last Name',field: 'lastname', sortable: true, filter: true },
        {headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true },
        {field: 'postcode', sortable: true, filter: true, width: 120 },
        {field: 'city', sortable: true, filter: true },
        {field: 'email', sortable: true, filter: true },
        {field: 'phone', sortable: true, filter: true },

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
            
            <div className='ag-theme-material' style={{ width: '104%', height: 600}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}

                 />

            </div>
        </>
    );
}

export default Customerlist;