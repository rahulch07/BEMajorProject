import React from "react";
import { useState, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../../utils/images/startpose.json";
import "./Startpose.css";

const Startpose = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className="lottie-container"
      style={{ width: "30rem", height: "25rem" }}
    >
      <div className="startbtn">
        <a href="/choice" class="cta">
          <span>BEGIN</span>
          <svg width="13px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </a>
      </div>

      <Lottie
        options={defaultOptions}
        style={{ marginTop: "150px", marginRight: "20px" }}
      />
    </div>
  );
};

export default Startpose;
