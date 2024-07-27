import React from "react";
import "../style/notSignupHome.css";
function NotSignupHome() {
  return (
    <>
      <div className="container style-font">
        <h1 className="style-font logo">MyWish</h1>
        <p className="style-font tagline">Share Your Dreams</p>
        <p className="style-font tagline">Make Them Reality</p>
        <div className="instruction">
          <div className="wish-container">
            <div className="circle">1</div>
            <h2>Wish</h2>
            <p>Make your wish and add it to your wishlist.</p>
          </div>
          <p className="arrow-container">
            <span className="right-arrow"></span>
          </p>
          <div className="wish-container">
            <div className="circle">2</div>
            <h2>Share</h2>
            <p>Share your wishlist with friends and family.</p>
          </div>
          <p className="arrow-container">
            <span className="right-arrow"></span>
          </p>
          <div className="wish-container">
            <div className="circle">3</div>
            <h2>Receive</h2>
            <p>Receive gifts from friends and family from your wishlist.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotSignupHome;
