import React from "react";
import Ingredients from "@/components/ingredients/ingredients";
import styles from "./hero.module.css";
import Tags from '@/components/tags/Tags'
import Categories from "../categories/categories";
import Instructions from '@/components/instructions/instructions';

export default function Hero({
  setFilterIngredientResults,
  filterIngredientResults,
  handleDefaultIngredientFilter,
  selectedIngredients,
  setSelectedIngredients,
  setRecipes,
  selectedTags,
  setSelectedTags,
  selectedCategories,
  setSelectedCategories,
  selectedInstructions,
  handleChange,
}) {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.filters}>
                  
          <Categories
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <br />
          
          <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          <br />

          <Ingredients
            handleDefaultIngredientFilter={handleDefaultIngredientFilter}
            setFilterIngredientResults={setFilterIngredientResults}
            setRecipes={setRecipes}
            filterIngredientResults={filterIngredientResults}
            setSelectedIngredients={setSelectedIngredients}
            selectedIngredients={selectedIngredients}
          />
        <br />

          <Instructions
            selectedInstructions={selectedInstructions}
            handleChange={handleChange}
          />

      </div>
    </div>
  );
}
