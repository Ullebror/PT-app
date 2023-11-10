import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Trainingslist() {
    const [trainings, setTrainings] = useState([]);

    const [columnDefs] = useState([
        {field: 'date', sortable: true, filter: true },
        {field: 'duration', sortable: true, filter: true },
        {field: 'activity', sortable: true, filter: true },
    ]);

    useEffect(() => {
        fetchTrainings();
    },[])

    const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings')
        .then(response => {
            if (response.ok)
                return response.json();

                throw new Error("Something went wrong: " + response.statusText);
        })
        .then(responseData => setTrainings(responseData.content))
        .catch(err => console.error(err))
    }

    return(
        <>
            
            <div className='ag-theme-material' style={{ width: '100%', height: 600}}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}

                 />

            </div>
        </>
    );
}

export default Trainingslist;