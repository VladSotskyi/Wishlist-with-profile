import React, { useState } from "react";
import "../style/signup-slider.css";

function SignupSlider({ handleSwitch }) {
  const [activeButton, setActiveButton] = useState("register");

  const handleBundleClick = (type) => {
    handleSwitch(type);
    setActiveButton(type);
  };
  return (
    <div className="slider">
      <button
        className={`slider-button ${activeButton === "register" ? "active" : ""}`}
        onClick={() => handleBundleClick("register")}
      >
        Register
      </button>
      <div className="divider"></div>
      <button
        className={`slider-button ${activeButton === "login" ? "active" : ""}`}
        onClick={() => handleBundleClick("login")}
      >
        Login
      </button>
    </div>
  );
}

export default SignupSlider;
