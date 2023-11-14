import React, { useState } from 'react';
import styles from '../icons&Buttons/add-to-favorite-btn.module.css';

function AddToFavoritesButton({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const toggleFavorite = async () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000);
    const response = await fetch('/api/backend/addFavoritesHandler', {
      method: 'POST',
      body: JSON.stringify({ recipe }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.log('failed to respond');
    }
    return data;
  };
  const buttonClasses = isClicked
    ? `${styles.favoriteButton} ${styles.pulse}`
    : styles.favoriteButton;
  return (
    <button onClick={toggleFavorite} className={buttonClasses}>
      {isFavorite ? 'Remove Recipe' : 'Save Recipe'}
      {isFavorite ? "🤍" :"❤️" }
    </button>
  );
}
export default AddToFavoritesButton;
