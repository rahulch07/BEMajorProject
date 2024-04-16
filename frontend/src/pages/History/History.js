import React, { useState, useEffect } from 'react';
import api from '../../components/services/api';
import  Chart  from './Chart';

export default function History() {
    const username = localStorage.getItem('userName');
    const [data, setData] = useState([]);
    //let result=[];
    const [result, setResult] = useState([]);

    const handleFetch = async () => {
        try {
            const response = await api.post('/users/history', { username });
            if (response && response.data) {
                setData(response.data);
                organizeDataByPose(response.data);
            } else {
                console.error('Fetch failed. Response or response.data is undefined.');
            }
        } catch (error) {
            console.error('Fetch failed', error);
            if (error.response && error.response.data && error.response.data.message) {
                console.error('Error message:', error.response.data.message);
            } else {
                console.error('An error occurred while handling the fetch request.');
            }
        }
    };

    useEffect(() => {
        handleFetch();; // Call handleFetch when component mounts
    }, []); // Empty dependency array means it only runs once after the initial render

  //   useEffect(() => {
  //     organizeDataByPose(data) // Call handleFetch when component mounts
  //     console.log(data)
  // }, [data]);
    
//console.log(data);
      function organizeDataByPose(data) {
        const organizedData = {};
    
        data.forEach(entry => {
            const { pose, time, date } = entry;
            
            if (!organizedData[pose]) {
                organizedData[pose] = {
                    pose: pose,
                    time: [],
                    date: []
                };
            }
            
            organizedData[pose].time.push(time);
            organizedData[pose].date.push(date);
        });
    
        // Convert time array to set to remove duplicates
        // for (const pose in organizedData) {
        //     organizedData[pose].time = [...new Set(organizedData[pose].time)];
        // }
    
        setResult(Object.values(organizedData));
    }

    
    
    console.log(result[0]);

    return (
        <div>
            <h2>This is the history of your performed poses.</h2>
            {/* <div>
                {data.map((element) => (
                    <li key={element._id}>
                        Pose Name: {element.pose}, Hold for: {element.time}, on Date: {element.date}
                    </li>
                ))}
            </div> */}



            {/* {result.length > 0 && <Chart data={result[0]} />} */}


                <div className='container' style={{border: 'solid 1px grey', padding: 100}}>
            { result.map((item, index) => (
                <Chart key={index} data={item} id={`chart_${index}`} />
            ))}
            </div>
        </div> 
    );

    
}
