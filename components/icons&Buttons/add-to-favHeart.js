import React, { useState } from "react";
import styles from "../icons&Buttons/add-to-favorite-btn.module.css"; 
import { GiHearts } from "react-icons/gi";

function AddToFavoritesButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  const buttonClasses = isFavorite ? `${styles.favoriteButton} ${styles.pulse}` : styles.favoriteButton;

  return (
    <button onClick={toggleFavorite} className={buttonClasses}>
      {isFavorite ? <GiHearts color="red" size={30} /> : <GiHearts color="gray" size={30} />}
    </button>
  );
}

export default AddToFavoritesButton;
