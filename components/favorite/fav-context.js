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
     return userFavorites.some((recipe) => recipe._id === recipeId);
   };

  const addChangeListener = (listener) => {
    setChangeListeners((prevListeners) => [...prevListeners, listener]);
  };

   const removeChangeListener = (listener) => {
     setChangeListeners((prevListeners) =>
       prevListeners.filter((l) => l !== listener)
     );
   };

    const updateFavorites = (newFavorites) => {
      setUserFavorites(newFavorites);
      notifyChangeListeners();
    };

  const addFavorite = (recipe) => {
    const updatedFavorites = [...userFavorites, recipe];
    updateFavorites(updatedFavorites);
  };

  const removeFavorite = (recipeId) => {
    const updatedFavorites = userFavorites.filter(
      (favorite) => favorite._id !== recipeId
    );
    updateFavorites(updatedFavorites);
  };


  const context = {
    userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite,
    updateFavorites,
    removeFavorite,
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
