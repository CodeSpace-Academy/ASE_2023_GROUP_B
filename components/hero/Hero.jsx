import React from "react";
import Ingredients from "@/components/ingredients/ingredients";
import styles from "./hero.module.css";

export default function Hero({
  setFilterIngredientResults,
  filterIngredientResults,
  handleDefaultIngredientFilter,
  selectedIngredients,
  setSelectedIngredients,
  setRecipes,
  onSearch,
  onAutocomplete,
  setSearchQuery,
  searchQuery,
}) {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.background}></div>
      <div>
        <div>
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
