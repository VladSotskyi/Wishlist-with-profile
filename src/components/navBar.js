import React from "react";
import { Link } from "react-router-dom";

function NavBar({ openModal }) {
  return (
    <>
      <nav className="navbar navbar-expand-md flex-row justify-content-between navBar px-5 mt-3">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <button type="button" className="btn btn-primary">
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
        <button type="button" className="btn btn-light" onClick={openModal}>
          Sign Up
        </button>
      </nav>
    </>
  );
}

export default NavBar;
