import React, { useEffect, useState } from "react";
import "../style/wishesPanel.css";
import { useAuth } from "../context/authContext";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import Delete from "../images/delete.png";
import Link from "../images/link.png";
import userDefault from "../images/userDefautl.png";
import favoriteActive from "../images/favorite-2.png";
import favoriteInactive from "../images/favorite.png";
import { Riple } from "react-loading-indicators";

function WishesPanel({ activeOption }) {
  const { currentUser } = useAuth();
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    if (!currentUser?.uid) return;

    const fetchWishesAndUsers = async () => {
      setLoading(true);
      let wishesArray = [];

      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUserFavorites(userData.favorites || []);

        if (activeOption === "wishes") {
          const wishesCollection = collection(db, "wishes");
          const q = query(
            wishesCollection,
            where("createdBy", "==", currentUser.uid),
          );

          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            wishesArray = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setWishes(wishesArray);
            setLoading(false);
          });

          return () => unsubscribe();
        } else if (activeOption === "favorites") {
          const favorites = userData.favorites || [];

          if (favorites.length > 0) {
            const wishesCollection = collection(db, "wishes");
            const q = query(wishesCollection, where("uid", "in", favorites));
            const querySnapshot = await getDocs(q);

            wishesArray = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            const userIds = [
              ...new Set(wishesArray.map((wish) => wish.createdBy)),
            ];
            if (userIds.length > 0) {
              const usersCollection = collection(db, "users");
              const usersQuerySnapshot = await getDocs(
                query(usersCollection, where("uid", "in", userIds)),
              );
              const usersMap = usersQuerySnapshot.docs.reduce(
                (acc, userDoc) => {
                  acc[userDoc.id] = {
                    name: userDoc.data().name,
                    photoURL: userDoc.data().photoURL || userDefault,
                  };
                  return acc;
                },
                {},
              );

              const wishesWithCreators = wishesArray.map((wish) => ({
                ...wish,
                createdByName: usersMap[wish.createdBy]?.name || "Unknown",
                createdByPhoto:
                  usersMap[wish.createdBy]?.photoURL || userDefault,
              }));

              setWishes(wishesWithCreators);
            } else {
              setWishes(wishesArray);
            }
          } else {
            setWishes([]);
          }
          setLoading(false);
        }
      }
    };

    fetchWishesAndUsers();
  }, [currentUser?.uid, activeOption]);

  const handleDelete = async (docId) => {
    try {
      const docRef = doc(db, "wishes", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data();

        if (docData.imageUrl) {
          const imageRef = ref(storage, docData.imageUrl);
          await deleteObject(imageRef);
        }

        await deleteDoc(docRef);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error deleting document or image: ", error);
    }
  };

  const handleFavoriteToggle = async (wishId) => {
    // Сначала меняем состояние, чтобы обновить картинку
    setUserFavorites((prevFavorites) =>
      prevFavorites.includes(wishId)
        ? prevFavorites.filter((id) => id !== wishId)
        : [...prevFavorites, wishId],
    );

    try {
      const userDocRef = doc(db, "users", currentUser.uid);

      if (userFavorites.includes(wishId)) {
        await updateDoc(userDocRef, {
          favorites: arrayRemove(wishId),
        });

        if (activeOption === "favorites") {
          setWishes((prevWishes) =>
            prevWishes.filter((wish) => wish.id !== wishId),
          );
        }
      } else {
        await updateDoc(userDocRef, {
          favorites: arrayUnion(wishId),
        });
      }
    } catch (error) {
      console.error("Error toggling favorite: ", error);
      // В случае ошибки можно отменить изменение состояния
      setUserFavorites((prevFavorites) =>
        prevFavorites.includes(wishId)
          ? [...prevFavorites, wishId]
          : prevFavorites.filter((id) => id !== wishId),
      );
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <Riple color="#DD6A78" size="medium" />
      </div>
    );
  }

  return (
    <div className="wishes-panel">
      <div className="wishes-list">
        {wishes.length > 0 ? (
          wishes.map((wish) => (
            <div
              key={wish.id}
              className={`wish-item ${
                activeOption === "favorites" ? "favorite-wish" : ""
              }`}
            >
              {activeOption === "favorites" && (
                <div className="createdBy">
                  <img
                    src={wish.createdByPhoto}
                    alt={wish.createdByName}
                    className="createdByPhoto"
                  />
                  {wish.createdByName}
                </div>
              )}
              {wish.imageUrl && (
                <div>
                  <img
                    src={wish.imageUrl}
                    alt={wish.itemName}
                    className="wish-image"
                  />
                </div>
              )}
              <div className="wishItemName">{wish.itemName}</div>
              <div>
                {wish.estimatedValue} {wish.currencySymbol}
              </div>
              <div className="button-container">
                {wish.link ? (
                  <div>
                    <a
                      href={wish.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wishLink"
                    >
                      <img
                        src={Link}
                        alt="link"
                        className="wishLinkImg active"
                      />
                    </a>
                  </div>
                ) : (
                  <div>
                    <img
                      src={Link}
                      alt="link"
                      className="wishLinkImg disabled"
                    />
                  </div>
                )}
                <img
                  src={
                    userFavorites.includes(wish.id)
                      ? favoriteActive
                      : favoriteInactive
                  }
                  alt="favorite"
                  className="favorite-button"
                  onClick={() => handleFavoriteToggle(wish.id)}
                />
              </div>
              {activeOption === "wishes" && (
                <label>
                  <span className="deleteWishCustom">
                    <img src={Delete} alt="delete" className="deleteWishImg" />
                  </span>
                  <button
                    className="deleteWish"
                    onClick={() => handleDelete(wish.id)}
                  ></button>
                </label>
              )}
            </div>
          ))
        ) : (
          <p>No wishes found</p>
        )}
      </div>
    </div>
  );
}

export default WishesPanel;
