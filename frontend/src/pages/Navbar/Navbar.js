import React from 'react';
import { Link } from 'react-router-dom'
import { useSetRecoilState, useRecoilValue } from "recoil";
import { gState } from '../../store/gStates';

export default function Navbar() {
  const name = useRecoilValue(gState);
   const setUName = useSetRecoilState(gState);
  console.log(name.uname)


  const handleLogout = () => {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("userId", "");
    console.log(localStorage.getItem("accessToken"));
    setUName({ uname: "" });
    localStorage.removeItem("userName");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        {/* Container wrapper */}
        <div className="container">
          {/* Navbar brand */}
          <a className="navbar-brand me-2" href="#">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd3yhKyM_Gh-jTZt7xff_OlwIBshFh3Xocmg&usqp=CAU"
              height={50}
              alt="Yoga-logo"
              loading="lazy"
              style={{ marginTop: "0px" }}
            />
          </a>
          {/* Toggle button */}
          <button
            data-mdb-collapse-init=""
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>
          {/* Collapsible wrapper */}
          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            {/* Left links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link text-black "
                  style={{ fontFamily: "sans-serif", fontSize: "30px" }}
                  href="/"
                >
                  Yoga
                </a>
              </li>
            </ul>
            {/* Left links */}
            <div className="d-flex align-items-center">
              {localStorage.getItem("userName") == null ? (
                <a href="/auth">
                  <button
                    class="btn btn-primary ms-3"
                    type="button"
                    aria-expanded="false"
                    style={{ borderRadius: "10px" }}
                  >
                    Login/Signup
                  </button>
                </a>
              ) : (
                <button
                  class="btn btn-primary ms-3"
                  type="button"
                  aria-expanded="false"
                  style={{ borderRadius: "10px" }}
                >
                  {localStorage.getItem("userName")}
                </button>
              )}
            </div>

            <div class="dropdown">
              <button
                class="btn btn-primary dropdown-toggle ms-3"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ borderRadius: "10px" }}
              >
                Profile
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="/history">
                    History
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {localStorage.getItem("userName") != null ? (
            <a href="/">
              <button
                class="btn btn-primary ms-3"
                type="button"
                aria-expanded="false"
                style={{ borderRadius: "10px" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </a>
          ) : (
            localStorage.getItem("userName")
          )}

          {/* Collapsible wrapper */}
        </div>
        {/* Container wrapper */}
      </nav>
      {/* Navbar */}
    </>
  );
}

