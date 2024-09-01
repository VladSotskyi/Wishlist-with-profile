import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useAuth } from "../context/authContext";
import { db } from "../firebase";
import Link from "../images/link.png";
import "../style/explore.css";
import userDefault from "../images/userDefautl.png";
import favoriteActive from "../images/favorite-2.png"; // Импортируем изображение активного избранного
import favoriteInactive from "../images/favorite.png";
import { Riple } from "react-loading-indicators"; // Импортируем изображение неактивного избранного

function Explore() {
  const { currentUser } = useAuth();
  const [wishes, setWishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Добавляем состояние загрузки
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const fetchWishesAndUsers = async () => {
      setLoading(true); // Запускаем загрузку
      try {
        const wishesCollection = collection(db, "wishes");
        const usersCollection = collection(db, "users");

        const [wishesSnapshot, usersSnapshot] = await Promise.all([
          getDocs(wishesCollection),
          getDocs(usersCollection),
        ]);

        const usersMap = usersSnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = {
            name: doc.data().name,
            photoURL: doc.data().photoURL || userDefault,
          };
          return acc;
        }, {});

        const wishesList = wishesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdByName: usersMap[doc.data().createdBy]?.name || "Unknown",
          createdByPhoto:
            usersMap[doc.data().createdBy]?.photoURL || userDefault,
        }));

        setWishes(wishesList);

        // Fetch user favorites
        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserFavorites(userDocSnap.data().favorites || []);
          }
        }
      } catch (error) {
        console.error("Error fetching wishes or users:", error);
      } finally {
        setLoading(false); // Останавливаем загрузку
      }
    };

    fetchWishesAndUsers();
  }, [currentUser]);

  const handleFavoriteToggle = async (wishId) => {
    try {
      const userDocRef = doc(db, "users", currentUser.uid);

      if (userFavorites.includes(wishId)) {
        // Remove from favorites
        await updateDoc(userDocRef, {
          favorites: arrayRemove(wishId),
        });
        setUserFavorites((prevFavorites) =>
          prevFavorites.filter((id) => id !== wishId),
        );
      } else {
        // Add to favorites
        await updateDoc(userDocRef, {
          favorites: arrayUnion(wishId),
        });
        setUserFavorites((prevFavorites) => [...prevFavorites, wishId]);
      }
    } catch (error) {
      console.error("Error toggling favorite: ", error);
    }
  };

  // Фильтрация списка желаний на основе поискового запроса
  const filteredWishes = wishes.filter(
    (wish) =>
      wish.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wish.createdByName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      {" "}
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
                      className="favorite-button"
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
