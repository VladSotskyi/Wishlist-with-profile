import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../style/signupHome.css";
import userDefault from "../images/userDefautl.png";

function SignupHome() {
  const { currentUser } = useAuth();

  const [activeOption, setActiveOption] = useState("wishes");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (currentUser) {
      (async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserName(userDoc.data().name);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      })().catch((error) => {
        console.error("Error in fetchUserName: ", error);
      });
    }
  }, [currentUser]);

  return (
    <>
      <div className="container active-font">
        <div className="profile-nav">
          <div className="profile-nav-item">
            <button
              className={` btn option ${activeOption === "wishes" ? "selected" : ""}`}
              onClick={() => {
                setActiveOption("wishes");
              }}
            >
              Wishes
            </button>
            <div className="line"></div>
          </div>
          <div className="profile">
            <img
              src={userDefault}
              alt="Profile Avatar"
              className="profile-picture"
            />
            <div className="profile-name">{userName}</div>
          </div>
          <div className="profile-nav-item">
            <button
              className={` btn option ${activeOption === "favorites" ? "selected" : ""}`}
              onClick={() => {
                setActiveOption("favorites");
              }}
            >
              Favorites
            </button>
            <div className="line"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupHome;
