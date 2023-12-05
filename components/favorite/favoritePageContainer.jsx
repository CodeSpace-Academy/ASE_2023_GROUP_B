import React, { useState, useEffect, useContext } from 'react';
import FavoritePage from '../../pages/recipe/favoritePage';
import FavoritesContext from 'path/to/FavoritesContext'; // Make sure to provide the correct path

const FavoritePageContainer = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const favoriteCtx = useContext(FavoritesContext);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      // Set the favorite recipes from context
      setFavoriteRecipes(favoriteCtx.userFavorites);
    };
    fetchFavoriteRecipes();
  }, [favoriteCtx.userFavorites]);

  return <FavoritePage favoriteRecipes={favoriteRecipes} />;
};
export default FavoritePageContainer;
