import React from "react";

import "../style/solarSystem.css";
import bear from "../images/bear.png";
import car from "../images/car.png";
import tool from "../images/tools.png";
import iphone from "../images/iphone.png";
import fan from "../images/fan.png";
import TV from "../images/smart-tv.png";
import palette from "../images/beauty.png";

import "../style/doubleSolarSystem.css";
function DoubleSolarSystem() {
  return (
    <>
      <div className="solar-system-container-1">
        <div className="solar-system">
          <div className="sun"></div>
          <div className="orbit orbit1">
            <img src={bear} alt="bear" className="icon1 icon" />
          </div>
          <div className="orbit orbit2">
            <img src={car} alt="car" className="icon2 icon" />
          </div>
          <div className="orbit orbit3">
            <img src={tool} alt="tool" className="icon3 icon" />
          </div>
          <div className="orbit orbit4">
            <img src={iphone} alt="iphone" className="icon4 icon" />
          </div>
          <div className="orbit orbit5">
            <img src={fan} alt="fan" className="icon5 icon" />
          </div>
          <div className="orbit orbit6">
            <img src={TV} alt="TV" className="icon1 icon" />
          </div>
          <div className="orbit orbit7">
            <img src={palette} alt="palette" className="icon2 icon" />
          </div>
        </div>
      </div>
      <div className="solar-system-container-2">
        <div className="solar-system">
          <div className="sun"></div>
          <div className="orbit orbit1">
            <img src={bear} alt="bear" className="icon1 icon" />
          </div>
          <div className="orbit orbit2">
            <img src={car} alt="car" className="icon2 icon" />
          </div>
          <div className="orbit orbit3">
            <img src={tool} alt="tool" className="icon3 icon" />
          </div>
          <div className="orbit orbit4">
            <img src={iphone} alt="iphone" className="icon4 icon" />
          </div>
          <div className="orbit orbit5">
            <img src={fan} alt="fan" className="icon5 icon" />
          </div>
          <div className="orbit orbit6">
            <img src={TV} alt="TV" className="icon1 icon" />
          </div>
          <div className="orbit orbit7">
            <img src={palette} alt="palette" className="icon2 icon" />
          </div>
        </div>
      </div>
    </>
  );
}

export default DoubleSolarSystem;
