import React, { useState } from "react";
import api from "../services/api";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { gState } from "../../store/gStates";
import { useNavigate } from "react-router-dom";
import "./Login2.css";
const Signup2 = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setUName = useSetRecoilState(gState);
  const nnn = useRecoilValue(gState);

  const handleSignup = async () => {
    try {
      const response = await api.post("/users/signup", {
        username,
        password,
        role: "customer",
      });

      if (response && response.data) {
        console.log("Signup Response:", response);
        // Perform any action after successful signup
      } else {
        console.error("Signup failed. Response or response.data is undefined.");
      }
    } catch (error) {
      console.error("Signup failed", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Error message:", error.response.data.message);
      } else {
        console.error("An error occurred while handling the signup request.");
      }
    }
  };

  return (
    <div className="Logincardmain">
      <div className="Logincard" id="helloo">
        <div className="logintextdiv">
          <div className="logintext">SIGN UP :</div>
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
        <div className="startbtn">
          <div class="cta" style={{ color: "black" }} onClick={handleSignup}>
            <span>Signup</span>
            <svg width="13px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup2;
