import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import SignModal from "./modalAuth";
import ModalMakeAWish from "./modalMakeAWish";
import wand from "../images/wand.png";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import "../style/sidebar.css";

function Sidebar() {
  const { currentUser } = useAuth();
  const [showWishModal, setShowWishModal] = useState(false);
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleClose = () => setShow(false);

  const handleOpenWishModal = () => {
    currentUser
      ? setShowWishModal(true)
      : toast.error("You need an account to make a wish!", {
          position: "top-center",
          autoClose: 2000,
        });
  };

  const openSidebar = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  }, []);

  const handleClickOutside = useCallback(
    (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    },
    [closeSidebar],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <>
      <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="sidebar-links">
          <li className="nav-item active">
            <button
              type="button"
              className="btn make-wish"
              onClick={() => {
                handleOpenWishModal();
                closeSidebar(); // Закрываем сайдбар после открытия модального окна
              }}
            >
              <img src={wand} alt="wand" className="make-wish-img" />
              Make a Wish
            </button>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/" onClick={closeSidebar}>
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/explore" onClick={closeSidebar}>
              Explore
            </Link>
          </li>
        </ul>
      </div>
      <button
        className={`sidebar-toggle ${isOpen ? "open" : ""}`}
        onClick={(e) => {
          e.stopPropagation(); // Останавливаем всплытие события
          isOpen ? closeSidebar() : openSidebar();
        }}
      >
        {isOpen ? "×" : "☰"}
      </button>
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

export default Sidebar;
