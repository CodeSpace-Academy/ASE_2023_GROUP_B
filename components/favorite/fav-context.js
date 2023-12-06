import { useState, createContext } from 'react';

// Creating a new context for managing user favorites
const FavoritesContext = createContext();

/**
 * FavoritesContextProvider Component
 * Provides a context to manage user favorites across the app
 * @param {Object} props - Component props
 * @returns {JSX.Element} React component
 */
export function FavoritesContextProvider(props) {
  // State to manage user favorites and change listeners
  const [userFavorites, setUserFavorites] = useState([]);
  const [changeListeners, setChangeListeners] = useState([]);

  // Notifies change listeners when there's an update in favorites
  const notifyChangeListeners = () => {
    changeListeners.forEach((listener) => {
      listener();
    });
  };

  // Checks if a recipe is in the user favorites
  const isRecipeInFavorites = (recipeId) => {
    return userFavorites.some((recipe) => recipe._id === recipeId);
  };

  // Adds a change listener to the context
  const addChangeListener = (listener) => {
    setChangeListeners((prevListeners) => [...prevListeners, listener]);
  };

  // Removes a change listener from the context
  const removeChangeListener = (listener) => {
    setChangeListeners((prevListeners) =>
      prevListeners.filter((l) => l !== listener)
    );
  };

  // Updates user favorites and notifies change listeners
  const updateFavorites = (newFavorites) => {
    setUserFavorites(newFavorites);
    notifyChangeListeners();
  };

  // Adds a recipe to user favorites
  const addFavorite = (recipe) => {
    const updatedFavorites = [...userFavorites, recipe];
    updateFavorites(updatedFavorites);
  };

  // Removes a recipe from user favorites
  const removeFavorite = (recipeId) => {
    const updatedFavorites = userFavorites.filter(
      (favorite) => favorite._id !== recipeId
    );
    updateFavorites(updatedFavorites);
  };

  // Context value containing user favorites and related functions
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

  // Provides the context value to its children components
  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
