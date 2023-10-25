import React, { useState } from "react";
import styles from "../icons&Buttons/add-to-favorite-btn.module.css";

function AddToFavoritesButton() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    setIsClicked(true);

    setTimeout(() => setIsClicked(false), 1000);
  };

  const buttonClasses = isClicked ? `${styles.favoriteButton} ${styles.pulse}` : styles.favoriteButton;

  return (
    <button onClick={toggleFavorite} className={buttonClasses}>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}

export default AddToFavoritesButton;
