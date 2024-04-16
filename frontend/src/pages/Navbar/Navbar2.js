import React from 'react';
import "./Navbar2.css";
import { Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { gState } from "../../store/gStates";

const Navbar2 = () => {
  const name = useRecoilValue(gState);
  const setUName = useSetRecoilState(gState);
  console.log(name.uname);

  const handleLogout = () => {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("userId", "");
    console.log(localStorage.getItem("accessToken"));
    setUName({ uname: "" });
    localStorage.removeItem("userName");
  };

  return (
    <div>
      <div className="navbar">
        <div>
          <a href="#" className="navbtn">
            Explore
          </a>
          <a href="/about" className="aboutbtn">
            About
          </a>
        </div>

        <a href="/">
          <div className="logo">YogaWise</div>
        </a>

        <div className="rightbtns">
          <div className="navusernamemain">
            {localStorage.getItem("userName") == null ? (
              <a href="/login">
                <div className="navbtn">Login/Signup</div>
              </a>
            ) : (
              <a href="/history">
                <div className="navusername">
                  {localStorage.getItem("userName")}
                </div>
              </a>
            )}
          </div>

          <div>
            {localStorage.getItem("userName") != null ? (
              <a href="/">
                <div onClick={handleLogout} className="navbtn">
                  Logout
                </div>
              </a>
            ) : (
              localStorage.getItem("userName")
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar2
