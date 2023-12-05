import React, { useState, useEffect } from 'react';
import classes from '../recipes/recipe-list.module.css';
import SearchBar from '../search/SearchBar';
import Hero from '@/components/hero/Hero';
import Pagination from './pagination';
import RecipeCard from './recipeCard';

function RecipeList({ data, onRemove, error  }) {
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
        {/* <h1 className={classes.title}>No matching recipes.</h1> */}
      </div>
    );
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPageCount) {
      setCurrentPage(page);
    }
  };


  const fetchRecipesByFilters = async (search) => {
    try {
      const response = await fetch(`/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search,
        }),
      });

      if (response.ok) {
        const result = await response.json();

          console.log(result.recipes)
        
          setFilteredRecipes(result.recipes);
          // console.log(searchResult.recipes)
      } else {
        throw Error
      }

    } catch (error) {
      throw Error
    }
  }

  useEffect(() => {

    fetchRecipesByFilters(search)
  }, [search])

  const handleSearch = () => {
    if(search.length>=4){
      fetchRecipesByFilters(search)
    }
  }

  const remainingRecipes = data.length - currentPage * recipesPerPage;

   let displayedRecipes = filteredRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  if (!filteredRecipes || filteredRecipes.length === 0) {
    return (
      <div className={classes.container}>
        <h1 className={classes.title}>No recipes available.</h1>
    <Link href="/">Go to home page</Link>
      </div>
    );
  }

  if (remainingRecipes < recipesPerPage) {
    displayedRecipes = filteredRecipes.slice(
      (currentPage - 1) * recipesPerPage
    );
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
            <RecipeCard recipe={recipe} search={search} />
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
