import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../style/signupHome.css";
import userDefault from "../images/userDefautl.png";
import WishesPanel from "./wishesPanel";

function SignupHome() {
  const { currentUser } = useAuth();

  const [activeOption, setActiveOption] = useState("wishes");
  const [userName, setUserName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState(userDefault);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (currentUser) {
      (async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.name);
            setNewName(userData.name); // Устанавливаем начальное значение для редактирования имени
            // Устанавливаем URL фото, если оно есть
            if (userData.photoURL) {
              setNewPhotoUrl(userData.photoURL);
            }
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

  const handleNameEditToggle = async () => {
    if (isEditingName && isNameChanged) {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, { name: newName });
        setUserName(newName);
      } catch (error) {
        console.error("Error updating user name: ", error);
      }
    }
    setIsEditingName(!isEditingName);
    setIsNameChanged(false); // Сбрасываем состояние изменения имени после сохранения
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
    setIsNameChanged(true); // Фиксируем изменение имени
  };

  const handleNameKeyDown = async (e) => {
    if (e.key === "Enter") {
      // Если нажата клавиша Enter, сохраняем изменения
      await handleNameEditToggle();
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `avatars/${currentUser.uid}`);
        await uploadBytes(storageRef, file);
        const photoURL = await getDownloadURL(storageRef);

        // Обновляем URL фото в Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, { photoURL });

        setNewPhotoUrl(photoURL); // Обновляем URL фото в состоянии
      } catch (error) {
        console.error("Error uploading photo: ", error);
      }
    }
  };

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
            <label htmlFor="photoUpload" className="edit-photo-button">
              <img
                src={newPhotoUrl}
                alt="Profile Avatar"
                className="profile-picture"
              />
              <input
                type="file"
                accept="image/*"
                id="photoUpload"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
              <div className="edit-photo">✎</div>
            </label>
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
        <div className="profile-name">
          {isEditingName ? (
            <input
              type="text"
              value={newName}
              onChange={handleNameChange}
              onKeyDown={handleNameKeyDown}
              className="name-input"
            />
          ) : (
            <h2>{userName}</h2>
          )}
          <label>
            <button onClick={handleNameEditToggle} className="edit-name-button">
              {isEditingName ? (isNameChanged ? "✔️" : "✖️") : "✎"}{" "}
            </button>
          </label>
        </div>
        <WishesPanel activeOption={activeOption} />
      </div>
    </>
  );
}

export default SignupHome;
