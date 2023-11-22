import { useState, useEffect } from 'react';
import _ from 'lodash';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Statistics() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchTrainings();
        console.log(data);
    },[])

    const chartData = _(data)
      .groupBy('name')
      .map((activity, name) => ({
        name: name,
        duration: _.sumBy(activity, 'duration'),
      }))
      .value()

      console.log(chartData)



    const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => {
            if (response.ok)
                return response.json();

            throw new Error("Something went wrong: " + response.statusText);
        })
        .then(responseData => setData(
            responseData.map((training) => {
                return {
                    name: training.activity,
                    duration: training.duration,
                }
            
            })
        ))
        .catch(err => console.error(err))
        
    } 
    
    
    
    return (
      <>
        <BarChart
          width={1000}
          height={500}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
      </>
    );
}

export default  Statistics;