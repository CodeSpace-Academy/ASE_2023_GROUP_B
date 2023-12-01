import React, { useState } from 'react';
import styles from './favorite.module.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function AddToFavoritesButton({ recipe }) {
  const initialIsFavorite =
    typeof window !== 'undefined' &&
    localStorage.getItem(`favorite_${recipe._id}`) === 'true';

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isClicked, setIsClicked] = useState(false);

  const toggleFavorite = async () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000);

    if (typeof window !== 'undefined') {
      localStorage.setItem(`favorite_${recipe._id}`, !isFavorite);
    }

    try {
      if (isFavorite) {
        // If it was favorited, remove it
        await removeFavorite(recipe._id);
      } else {
        // If it was not favorited, add it
        await addFavorite();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Handle error as needed
    }
  };

   const addFavorite = async () => {
     try {
       const response = await fetch('/api/backend/addFavoritesHandler', {
         method: 'POST',
         body: JSON.stringify({ recipe }),
         headers: {
           'Content-Type': 'application/json',
         },
       });

       const data = await response.json();
       if (!response.ok) {
         console.log('Failed to add favorite');
       }
       return data;
     } catch (error) {
       console.error('Error adding favorite:', error);
       // Handle error as needed
     }
   };

   const removeFavorite = async (recipeId) => {
     try {
       // Add logic to remove the favorite from MongoDB using your API
       await fetch('/api/backend/removeFavoriteHandler', {
         method: 'POST',
         body: JSON.stringify({ recipeId }),
         headers: {
           'Content-Type': 'application/json',
         },
       });

       // Call the onRemove callback to update the state
       onRemove(recipeId);
     } catch (error) {
       console.error('Failed to remove favorite:', error);
       // Handle error as needed
     }
   };

  const buttonClasses = `${styles.favoriteButton} ${
    isClicked ? styles.pulse : ''
  } ${isFavorite ? styles.favoriteFilled : styles.favoriteEmpty}`;

  return (
    <button onClick={toggleFavorite} className={buttonClasses}>
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}

export default AddToFavoritesButton;
