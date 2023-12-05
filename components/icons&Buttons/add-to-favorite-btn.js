import React, { useState, useEffect,useContext } from 'react';
import styles from '../icons&Buttons/favorite.module.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import FavoritesContext from '../favorite/fav-context';

function AddToFavoritesButton({ recipe, onRemove, updateFavoritesCount }) {
  const [isFavorite, setIsFavorite] = useState(
    typeof window !== 'undefined' &&
      localStorage.getItem(`favorite_${recipe._id}`) === 'true'
  );
  const [isClicked, setIsClicked] = useState(false);
  const [message, setMessage] = useState('');
  const favoriteCtx = useContext(FavoritesContext);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`favorite_${recipe._id}`, isFavorite);
    }
  }, [isFavorite, recipe._id]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      // Check if the user wants to unfavorite the recipe
      const confirmed = window.confirm(
        'Are you sure you want to unfavorite this recipe?'
      );
      if (!confirmed) {
        return;
      }
      // Remove the favorite
      removeFavorite(recipe._id);
    } else {
      // Add the favorite
      await addFavorite();
    }

    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    setIsClicked(true);
    setMessage(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    setTimeout(() => {
      setIsClicked(false);
      setMessage('');
    }, 3000);

    try {
      if (isFavorite) {
        favoriteCtx.removeFavorite(recipe._id);
        onRemove(recipe._id);
      } else {
        await addFavorite();
      }

      if (updateFavoritesCount) {
        updateFavoritesCount(); 
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setMessage('Failed to toggle favorite');
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
      } else {
        // Update local state and notify change listeners
        favoriteCtx.addFavorite(recipe);
      }
      return data;
    } catch (error) {
      console.error('Error adding favorite:', error);
      setMessage('Failed to toggle favorite');
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
      setIsFavorite(false);
      setIsClicked(false);
      setMessage('Removed from favorites');
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      setMessage('Failed to remove favorite');
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