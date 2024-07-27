import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignModal from "./modal";
import "../style/navbar.css";
import wand from "../images/wand.png";
import account from "../images/personal-account.png";

function NavBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  return (
    <>
      <nav className="navbar navbar-expand-md flex-row align-items-center justify-content-between navBar active-font">
        <ul className="navbar-nav flex-row align-items-center justify-content-center">
          <li className="nav-item active">
            <button type="button" className="btn make-wish">
              <img src={wand} alt="wand" className="make-wish-img" />
              Make a Wish
            </button>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/explore">
              Explore
            </Link>
          </li>
        </ul>
        <button type="button" className="btn signup-btn" onClick={handleOpen}>
          <img src={account} alt="account-img" className="acc-btn-img" />
          Login/Register
        </button>
      </nav>
      <SignModal showModal={show} closeModal={handleClose} />
    </>
  );
}

export default NavBar;
