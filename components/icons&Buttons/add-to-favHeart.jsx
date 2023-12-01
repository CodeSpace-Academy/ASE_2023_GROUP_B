import React, { useState } from "react";
import styles from "../icons&Buttons/add-to-favorite-btn.module.css"; 
import { HiOutlineHeart } from "react-icons/hi";

function AddToFavoritesButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  const buttonClasses = isFavorite ? `${styles.favoriteButton} ${styles.pulse}` : styles.favoriteButton;

  return (
    <button onClick={toggleFavorite} className={buttonClasses}>
      {isFavorite ? (
        <HiOutlineHeart color="rgba(2,111,2,0.767)" size={30} />
      ) : (
        <HiOutlineHeart color= "green" size={25}/>
      )}
    </button>
  );
}

export default AddToFavoritesButton;
