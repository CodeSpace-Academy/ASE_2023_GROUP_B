import { useState, createContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);
  const [changeListeners, setChangeListeners] = useState([]);
  const notifyChangeListeners = () => {
    changeListeners.forEach((listener) => {
      listener();
    });
  };
  const isRecipeInFavorites = (recipeId) => {
    return (userFavorites || []).some(
      (recipe) => recipe && recipe._id === recipeId
    );
  };
  const addChangeListener = (listener) => {
    setChangeListeners((prevListeners) => [...prevListeners, listener]);
  };
  const removeChangeListener = (listener) => {
    setChangeListeners((prevListeners) =>
      prevListeners.filter((l) => l !== listener)
    );
  };
  const addFavoritesHandler = (recipe) => {
    setUserFavorites((prevUserFavorites) => [...prevUserFavorites, recipe]);
    notifyChangeListeners();
  };
  const updateFavoritesHandler = (recipes) => {
    setUserFavorites(recipes);
    notifyChangeListeners();
  };
  const removeFavoritesHandler = (recipeId) => {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((favorite) => favorite._id !== recipeId);
    });
    notifyChangeListeners();
  };
  const context = {
    userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoritesHandler,
    updateFavorites: updateFavoritesHandler,
    removeFavorite: removeFavoritesHandler,
    recipeIsFavorite: isRecipeInFavorites,
    addChangeListener,
    removeChangeListener,
  };
  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}
export default FavoritesContext;