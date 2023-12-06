import React, { useState, useEffect } from 'react';
import classes from '../recipes/recipe-list.module.css';
import SearchBar from '../search/SearchBar';
import Hero from '@/components/hero/Hero';
import Pagination from './pagination';
import RecipeCard from './recipeCard';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import classes from '../recipes/recipe-list.module.css';
import SearchBar from '../search/SearchBar';
import Hero from '@/components/hero/Hero';
import Pagination from './pagination';
import RecipeCard from './recipeCard';
import Link from 'next/link';

function RecipeList({ data, onRemove }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filterIngredientResults, setFilterIngredientResults] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(data);
  const recipesPerPage = 100;
  const totalPageCount = Math.ceil(filteredRecipes.length / recipesPerPage);

  useEffect(() => {
    setRecipes(data);
  }, [data]);

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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPageCount) {
      setCurrentPage(page);
    }
  };

  const handleSearch = () => {
    const lowerCaseSearchText = search.toLowerCase();
    const filtered = data.filter((recipe) =>
      recipe.title.toLowerCase().includes(lowerCaseSearchText)
    );
    setRecipes(filtered);
   
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

 if(recipes.length === 0 || !recipes){
  return (
   <>
    <h3>No matching recipes found</h3>
    <Link href="/">Go back to home page</Link>
   </>
  )
 }

 console.log(recipes , "123")
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
function RecipeList({ data, onRemove }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filterIngredientResults, setFilterIngredientResults] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(data);
  const recipesPerPage = 100;
  const totalPageCount = Math.ceil(filteredRecipes.length / recipesPerPage);

  useEffect(() => {
    setRecipes(data);
  }, [data]);

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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPageCount) {
      setCurrentPage(page);
    }
  };

  const handleSearch = () => {
    const lowerCaseSearchText = search.toLowerCase();
    const filtered = data.filter((recipe) =>
      recipe.title.toLowerCase().includes(lowerCaseSearchText)
    );
    setRecipes(filtered);
   
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

 if(recipes.length === 0 || !recipes){
  return (
   <>
    <h3>No matching recipes found</h3>
    <Link href="/">Go back to home page</Link>
   </>
  )
 }

 console.log(recipes , "123")
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
