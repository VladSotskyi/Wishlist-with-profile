import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignModal from "./modalAuth";
import ModalMakeAWish from "./modalMakeAWish";
import "../style/navbar.css";
import wand from "../images/wand.png";
import account from "../images/personal-account.png";
import { useAuth } from "../context/authContext";
import LogOutButton from "./logOutButton";
import { toast } from "react-toastify";
import Sidebar from "./sideBar";

function NavBar() {
  const { currentUser } = useAuth();
  const [showWishModal, setShowWishModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const handleOpenWishModal = () => {
    currentUser
      ? setShowWishModal(true)
      : toast.error("You need an account to make a wish !", {
          position: "top-center",
          autoClose: 2000,
        });
  };
  return (
    <>
      <nav className="navbar active-font">
        <Sidebar />
        <ul className="navbar-nav">
          <li className="nav-item active">
            <button
              type="button"
              className="btn make-wish"
              onClick={handleOpenWishModal}
            >
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
        {currentUser ? (
          <LogOutButton />
        ) : (
          <button type="button" className="btn signup-btn" onClick={handleOpen}>
            <img src={account} alt="account-img" className="acc-btn-img" />
            Login/Register
          </button>
        )}
      </nav>
      <SignModal showModal={show} closeModal={handleClose} />
      <ModalMakeAWish
        show={showWishModal}
        onHide={() => {
          setShowWishModal(false);
        }}
      />
    </>
  );
}

export default NavBar;
