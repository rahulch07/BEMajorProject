import React, { useState } from 'react';
import api from '../../components/services/api'

export default function History() {
    const username = localStorage.getItem('userName');
    const [data, setData] = useState([]);

    const handleFetch = async () => {
        try {
          const response = await api.post('/users/history', { username});
          console.log(username);
          
      
          // Check if 'response' and 'response.data' are defined before accessing
          if (response && response.data) {
            console.log('Fetch Response:', response);
          
            setData(response.data);
            //console.log(data);
    
          
          
        } else {
            console.error('Fetch failed. Response or response.data is undefined.');
          }
        } catch (error) {
          // Log the entire error object for debugging
          console.error('Fetch failed', error);
    
          // Check if 'error.response' is defined before accessing its properties
          if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
          } else {
            console.error('An error occurred while handling the fetch request.');
          }
        }
      };

    

  return (
    <div>
      <h2>This is history of your performed poses.</h2>

      <button className='btn-primary' onClick={handleFetch}>Fetch data</button>

      <div>
        {data.map((element) =>{
            return(
                <li key={element._id}>
                    Pose Name: {element.pose}, Hold for: {element.time}, on Date: {element.date}
                </li>
            );
        }

        )}
      </div>

    </div>
  )
}
