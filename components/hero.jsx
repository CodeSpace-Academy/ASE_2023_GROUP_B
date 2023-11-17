import React from "react";
import SearchBar from "./search/SearchBar";
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
          {/* <SearchBar
            handleDefault={handleDefaultSearch}
            onSearch={onSearch}
            onAutocomplete={onAutocomplete}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          /> */}
        </div>
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