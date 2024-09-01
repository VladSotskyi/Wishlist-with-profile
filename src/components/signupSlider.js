import React from "react";
import "../style/signup-slider.css";

function SignupSlider({ handleSwitch, activeForm }) {
  const handleBundleClick = (type) => {
    handleSwitch(type);
  };
  return (
    <div className="slider">
      <button
        className={`slider-button ${activeForm === "register" ? "active" : ""}`}
        onClick={() => handleBundleClick("register")}
      >
        Register
      </button>
      <div className="divider"></div>
      <button
        className={`slider-button ${activeForm === "login" ? "active" : ""}`}
        onClick={() => handleBundleClick("login")}
      >
        Login
      </button>
    </div>
  );
}

export default SignupSlider;
