import React from "react";
import { useState, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../../utils/images/startposeanimation.json";
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
      <div
        className="startpose-container"
        style={{ transform: "rotate(-28deg)", fontSize: "50px" }}
      >
        Start Pose
      </div>

      <Lottie
        options={defaultOptions}
        style={{ marginTop: "150px", marginRight: "20px" }}
      />
    </div>
  );
};

export default Startpose;
