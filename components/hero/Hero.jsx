import React from "react";
import Ingredients from "@/components/ingredients/ingredients";
import styles from "./hero.module.css";
import Tags from '@/components/tags/Tags'
//import SearchBar from "../search/SearchBar";

export default function Hero({
  setFilterIngredientResults,
  filterIngredientResults,
  handleDefaultIngredientFilter,
  selectedIngredients,
  setSelectedIngredients,
  setRecipes,
  selectedTags,
  setSelectedTags,
}) 

{
  return (
    <div className={styles.heroContainer}>
      <div className={styles.blurBackground}></div>
      <div>
      <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      {/* <SearchBar
        onSearch={handleSearch}
        search={search}
        setSearch={setSearch}
      /> */}
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
        </div>
      </div>
    </div>
  );
}
