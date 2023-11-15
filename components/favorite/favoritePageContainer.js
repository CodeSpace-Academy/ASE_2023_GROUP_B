import React, { useState, useEffect } from 'react';
import FavoritePage from '../../pages/recipe/favoritePage';

const FavoritePageContainer = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      const data = await getFavoriteRecipes();
      setFavoriteRecipes(data);
    };
    fetchFavoriteRecipes();
  }, []);
  return <FavoritePage favoriteRecipes={favoriteRecipes} />;
};
export default FavoritePageContainer;