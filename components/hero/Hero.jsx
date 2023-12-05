import React from "react";
import Ingredients from "@/components/ingredients/ingredients";
import styles from "./hero.module.css";
import Tags from '@/components/tags/Tags'
import Categories from "../categories/categories";


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

}) {
  return (
    <div className={styles.heroContainer}>
      <div>
        <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        <br />

        <div>
          <Ingredients
            filterIngredientResults={filterIngredientResults}
            setFilterIngredientResults={setFilterIngredientResults}
            setRecipes={setRecipes}
            handleDefaultIngredientFilter={handleDefaultIngredientFilter}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
          />
          <br />

          <Categories
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <br />
        </div>
      </div>
    </div>
  );
}
