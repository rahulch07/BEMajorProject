// frontend/src/components/Login.js
import React, { useState} from 'react';
import api from '../services/api';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { gState } from '../../store/gStates';
import './Login.css'

const Login = ({setUserId}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const setUName = useSetRecoilState(gState);
  const nnn = useRecoilValue(gState);

  const handleLogin = async () => {
    try {
      const response = await api.post('/users/login', { username, password });
      console.log(username);
  console.log(password);
  console.log("Hello");
      // Check if 'response' and 'response.data' are defined before accessing
      if (response && response.data) {
        console.log('Login Response:', response);
      const accessToken = response.data.accessToken;
      console.log(accessToken);
      // Store the accessToken securely (e.g., in cookies or localStorage)
      localStorage.setItem('accessToken', accessToken);

      //Call setUserId to update userId in the App.js
      //setUserId(response.data.userId);
      console.log(localStorage.getItem('userName'));
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userName', username);
      console.log(localStorage.getItem('userName'));
      console.log("here");
      console.log(response.data.userId);
      console.log(response.data.role);
      setUName({uname: username});
      //const name = useRecoilValue(gState);
      console.log(nnn.uname);
      //console.log(name);
      // Redirect or perform any other action after successful login
      if(response.data.role==='customer'){
      //window.location.href = '/transactions';
      //window.location.href='/start'
      }
    } else {
        console.error('Login failed. Response or response.data is undefined.');
      }
    } catch (error) {
      // Log the entire error object for debugging
      console.error('Login failed', error);

      // Check if 'error.response' is defined before accessing its properties
      if (error.response && error.response.data && error.response.data.message) {
        console.error('Error message:', error.response.data.message);
      } else {
        console.error('An error occurred while handling the login request.');
      }
    }
  };

  const handleLogout = () =>{
    localStorage.setItem('accessToken', "");
    localStorage.setItem('userId', "");
    console.log(localStorage.getItem('accessToken'));
    setUName({uname: ''})
    localStorage.removeItem('userName');
  }

  const handleSignup = async () => {
    try {
      const response = await api.post('/users/signup', { username, password, role: 'customer' });

      if (response && response.data) {
        console.log('Signup Response:', response);
        // Perform any action after successful signup
      } else {
        console.error('Signup failed. Response or response.data is undefined.');
      }
    } catch (error) {
      console.error('Signup failed', error);

      if (error.response && error.response.data && error.response.data.message) {
        console.error('Error message:', error.response.data.message);
      } else {
        console.error('An error occurred while handling the signup request.');
      }
    }
  };


  

  return (
    <div>
      <div className='outContn'>
      <div className='container contn' >
      <h2>Login</h2>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
      <br/>
      <button onClick={handleLogout}>Logout</button>
      </div>

      <div className='container contn'>
      <h2>signUp</h2>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleSignup}>Create Account</button>
      </div>
      </div>
    </div>
  );
};

export default Login;