import React, { useState, useEffect, useContext } from 'react';
import FavoritePage from '../../pages/recipe/favoritePage';
import FavoritesContext from 'path/to/FavoritesContext'; // Make sure to provide the correct path

/**
 * FavoritePageContainer Component
 * Container component to display favorite recipes using context
 * @returns {JSX.Element} React component
 */
const FavoritePageContainer = () => {
  // State to manage favorite recipes
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  
  // Accessing the FavoritesContext
  const favoriteCtx = useContext(FavoritesContext);

  // Fetching favorite recipes from context and updating state
  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      // Set the favorite recipes from context
      setFavoriteRecipes(favoriteCtx.userFavorites);
    };
    fetchFavoriteRecipes();
  }, [favoriteCtx.userFavorites]);

  // Rendering the FavoritePage component with favoriteRecipes as props
  return <FavoritePage favoriteRecipes={favoriteRecipes} />;
};

export default FavoritePageContainer;
