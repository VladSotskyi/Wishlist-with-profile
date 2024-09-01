import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "../style/navbar.css";

function LogOutButton() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successful !");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <button type="button" className="btn logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default LogOutButton;
