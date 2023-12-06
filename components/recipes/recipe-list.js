import React, { useState, useEffect } from 'react';
import classes from '../recipes/recipe-list.module.css';
import SearchBar from '../search/SearchBar';
import Hero from '@/components/hero/Hero';
import Pagination from './pagination';
import RecipeCard from './recipeCard';

/**
 * RecipeList Component
 * Component to manage and display a list of recipes
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of recipe data
 * @param {function} props.onRemove - Function to remove a recipe
 * @returns {JSX.Element} React component
 */

function RecipeList({ data, onRemove }) {
  // State variables to manage pagination, filtering, and search
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filterIngredientResults, setFilterIngredientResults] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(data);
  const recipesPerPage = 100;
  const totalPageCount = Math.ceil(filteredRecipes.length / recipesPerPage);

  // Effect to set recipes when data changes
  useEffect(() => {
    setRecipes(data);
  }, [data]);

  // Function to handle default ingredient filter
  function handleDefaultIngredientFilter() {
    if (selectedIngredients.length > 0) {
      setSelectedIngredients([]);
    }
  }

  // Check if data is not an array or is empty
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className={classes.container}>
        <h1 className={classes.title}>No recipes available.</h1>
      </div>
    );
  }

  // Function to handle page change for pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPageCount) {
      setCurrentPage(page);
    }
  };

  // Function to handle search functionality
  const handleSearch = () => {
    const lowerCaseSearchText = search.toLowerCase();
    const filtered = data.filter((recipe) =>
      recipe.title.toLowerCase().includes(lowerCaseSearchText)
    );
    setFilteredRecipes(filtered);
    setCurrentPage(1); 
  };

  const remainingRecipes = data.length - currentPage * recipesPerPage;

  let displayedRecipes = recipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  if (remainingRecipes < recipesPerPage) {
    displayedRecipes = recipes.slice((currentPage - 1) * recipesPerPage);
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>RECIPES</h1>

      <SearchBar
        onSearch={handleSearch}
        search={search}
        setSearch={setSearch}
      />
      <br />

      <Hero
        handleDefaultIngredientFilter={handleDefaultIngredientFilter}
        setFilterIngredientResults={setFilterIngredientResults}
        setRecipes={setRecipes}
        filterIngredientResults={filterIngredientResults}
        setSelectedIngredients={setSelectedIngredients}
        selectedIngredients={selectedIngredients}
      />

      <div className={classes.cardContainer}>
        {displayedRecipes.map((recipe, index) => (
          <div key={index} className={classes.cardContent}>
            <RecipeCard
              recipe={recipe}
              search={search}
              onRemove={() => onRemove(recipe._id)}
            />
          </div>
        ))}
      </div>

      <br />
      <div className={classes.pageInfo}>
        {totalPageCount > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPageCount={totalPageCount}
            handlePageChange={handlePageChange}
          />
        )}
        <div className={classes.pageInfo}>
          <p>
            {remainingRecipes > 0 && ` ${remainingRecipes} recipes remaining.`}
            Page {currentPage} of {totalPageCount}.
          </p>
        </div>
      </div>
    </div>
  );
}
export default RecipeList;
