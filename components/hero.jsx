import React from "react";

import Ingredients from "./ingredients/ingredients.jsx";

export default function Hero({
  
  setFilterIngredientResults,
  filterIngredientResults,
  handleDefaultIngredientFilter,
  selectedIngredients,
  setSelectedIngredients,
  // handleDefaultSearch,
  
  setRecipes,
  onSearch,
  onAutocomplete,
  setSearchQuery,
  searchQuery,
  
  
 
}) {
  
  return (
    <div >
      <div >
        
        <div >
          
          
          <Ingredients
            filterIngredientResults={filterIngredientResults}
            setFilterIngredientResults={setFilterIngredientResults}
            setRecipes={setRecipes}
            handleDefaultIngredientFilter={handleDefaultIngredientFilter}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
          />

          
        </div>
      </div>
    </div>
  );
}