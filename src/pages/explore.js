import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useAuth } from "../context/authContext";
import { db } from "../firebase";
import Link from "../images/link.png";
import "../style/explore.css";
import userDefault from "../images/userDefautl.png";
import favoriteActive from "../images/favorite-2.png";
import favoriteInactive from "../images/favorite.png";
import { Riple } from "react-loading-indicators";

function Explore() {
  const { currentUser } = useAuth();
  const [wishes, setWishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const fetchWishesAndUsers = async () => {
      setLoading(true);

      let userFavoritesData = [];
      if (currentUser?.uid) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          userFavoritesData = userData.favorites || [];
          setUserFavorites(userFavoritesData);
        }
      }

      const wishesCollection = collection(db, "wishes");
      const q = query(wishesCollection);

      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const wishesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const userIds = [...new Set(wishesArray.map((wish) => wish.createdBy))];

        if (userIds.length > 0) {
          const usersCollection = collection(db, "users");
          const usersQuerySnapshot = await getDocs(
            query(usersCollection, where("uid", "in", userIds)),
          );

          const usersMap = usersQuerySnapshot.docs.reduce((acc, userDoc) => {
            acc[userDoc.id] = {
              name: userDoc.data().name,
              photoURL: userDoc.data().photoURL || userDefault,
            };
            return acc;
          }, {});

          const wishesWithCreators = wishesArray.map((wish) => ({
            ...wish,
            createdByName: usersMap[wish.createdBy]?.name || "Unknown",
            createdByPhoto: usersMap[wish.createdBy]?.photoURL || userDefault,
          }));

          setWishes(wishesWithCreators);
        } else {
          setWishes(wishesArray);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    };

    fetchWishesAndUsers();
  }, [currentUser]);

  const handleFavoriteToggle = async (wishId) => {
    if (!currentUser?.uid) {
      // Можно показать уведомление о необходимости входа в систему, если пользователь не авторизован
      return;
    }

    try {
      const userDocRef = doc(db, "users", currentUser.uid);

      if (userFavorites.includes(wishId)) {
        await updateDoc(userDocRef, {
          favorites: arrayRemove(wishId),
        });
        setUserFavorites((prevFavorites) =>
          prevFavorites.filter((id) => id !== wishId),
        );
      } else {
        await updateDoc(userDocRef, {
          favorites: arrayUnion(wishId),
        });
        setUserFavorites((prevFavorites) => [...prevFavorites, wishId]);
      }
    } catch (error) {
      console.error("Error toggling favorite: ", error);
    }
  };

  const filteredWishes = wishes.filter(
    (wish) =>
      wish.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wish.createdByName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          className="searchBar"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="explore-panel active-font">
        {loading ? (
          <div className="loading">
            <Riple color="#DD6A78" size="medium" text="" textColor="" />
          </div>
        ) : (
          <div className="explore-list">
            {filteredWishes.length > 0 ? (
              filteredWishes.map((wish) => (
                <div key={wish.id} className="explore-item">
                  <div className="createdBy">
                    <img
                      src={wish.createdByPhoto}
                      alt={wish.createdByName}
                      className="createdByPhoto"
                    />
                    {wish.createdByName}
                  </div>
                  {wish.imageUrl && (
                    <div>
                      <img
                        src={wish.imageUrl}
                        alt={wish.itemName}
                        className="wish-image"
                      />
                    </div>
                  )}
                  <div className="exploreItemName">{wish.itemName}</div>
                  <div>
                    {wish.estimatedValue} {wish.currencySymbol}
                  </div>
                  <div className="button-group">
                    {wish.link ? (
                      <a
                        href={wish.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="exploreLink"
                      >
                        <img
                          src={Link}
                          alt="link"
                          className="exploreLinkImg active"
                        />
                      </a>
                    ) : (
                      <img
                        src={Link}
                        alt="link"
                        className="exploreLinkImg disabled"
                      />
                    )}
                    <img
                      src={
                        userFavorites.includes(wish.id)
                          ? favoriteActive
                          : favoriteInactive
                      }
                      alt="favorite"
                      className={`favorite-button ${!currentUser ? "disabled" : ""}`}
                      onClick={() => handleFavoriteToggle(wish.id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No wishes found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
