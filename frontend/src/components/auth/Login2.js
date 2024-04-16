import React, { useState } from "react";
import api from "../services/api";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { gState } from "../../store/gStates";
import { useNavigate } from "react-router-dom";

import "./Login2.css";
const Login2 = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setUName = useSetRecoilState(gState);
  const nnn = useRecoilValue(gState);

   const handleLogin = async () => {
     try {
       const response = await api.post("/users/login", { username, password });
       console.log(username);
       console.log(password);
       console.log("Hello");
       // Check if 'response' and 'response.data' are defined before accessing
       if (response && response.data) {
         console.log("Login Response:", response);
         const accessToken = response.data.accessToken;
         console.log(accessToken);
         // Store the accessToken securely (e.g., in cookies or localStorage)
         localStorage.setItem("accessToken", accessToken);

         //Call setUserId to update userId in the App.js
         //setUserId(response.data.userId);
         console.log(localStorage.getItem("userName"));
         localStorage.setItem("userId", response.data.userId);
         localStorage.setItem("userName", username);
         console.log(localStorage.getItem("userName"));
         console.log("here");
         console.log(response.data.userId);
         console.log(response.data.role);
         setUName({ uname: username });

         navigate("/choice");
         //const name = useRecoilValue(gState);
         console.log(nnn.uname);
         //console.log(name);
         // Redirect or perform any other action after successful login
         if (response.data.role === "customer") {
           //window.location.href = '/transactions';
           //window.location.href='/start'
         }
       } else {
         console.error("Login failed. Response or response.data is undefined.");
       }
     } catch (error) {
       // Log the entire error object for debugging
       console.error("Login failed", error);

       // Check if 'error.response' is defined before accessing its properties
       if (
         error.response &&
         error.response.data &&
         error.response.data.message
       ) {
         console.error("Error message:", error.response.data.message);
       } else {
         console.error("An error occurred while handling the login request.");
       }
     }
   };



  return (
    <div className="Logincardmain">
      <div className="Logincard" id="helloo">
        <div className="logintextdiv">
          <div className="logintext">LOGIN :</div>
        </div>
        <div className="Loginheader" id="username">
          username:
        </div>
        <div className="inputdiv">
          <input
            className="logininput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div className="Loginheader">password:</div>
        <div className="inputdiv">
          <input
            type="password"
            className="logininput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />

        <br />
        <div className="startbtn">
          <div class="cta" style={{ color: "black" }} onClick={handleLogin}>
            <span>Login</span>
            <svg width="13px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </div>
        </div>

        <div id="signupbutton" onClick={() => navigate("/signup")}>
          <div className="signupheader">Signup</div>
        </div>
      </div>
    </div>
  );
};

export default Login2;
