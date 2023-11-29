import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCalendar, FaHourglass, FaClock } from 'react-icons/fa';
import classes from '../recipes/recipe-list.module.css';
import ViewRecipeBtn from '../../components/icons&Buttons/view-recipe-btn';
import { formatDate } from '@/helpers/date-util';
import { formatTime } from '@/helpers/time-util';
import Sort from '../../components/recipes/sort';
import SearchBar from '../../components/search/SearchBar';
import Highlighter from 'react-highlight-words';
import AddToFavoritesButton from '@/components/icons&Buttons/add-to-favorite-btn';
import Hero from "@/components/hero.jsx"

function RecipeList({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filterIngredientResults, setFilterIngredientResults] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
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

  

  const handleSort = (order) => {
    setSortOrder(order);
  };

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
    setFilteredRecipes(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const remainingRecipes = data.length - currentPage * recipesPerPage;

  let displayedRecipes = recipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  if (remainingRecipes < recipesPerPage) {
    displayedRecipes = recipes.slice(
      (currentPage - 1) * recipesPerPage
    );
  }

  switch (sortOrder) {
    case 'newest':
      displayedRecipes.sort(
        (a, b) => new Date(b.published) - new Date(a.published)
      );
      break;
    case 'cook-asc':
      displayedRecipes.sort((a, b) => a.cook - b.cook);
      break;
    case 'cook-desc':
      displayedRecipes.sort((a, b) => b.cook - a.cook);
      break;
    case 'prep-asc':
      displayedRecipes.sort((a, b) => a.prep - b.prep);
      break;
    case 'prep-desc':
      displayedRecipes.sort((a, b) => b.prep - a.prep);
      break;
    case 'steps-asc':
      displayedRecipes.sort(
        (a, b) => a.instructions.length - b.instructions.length
      );
      break;
    case 'steps-desc':
      displayedRecipes.sort(
        (a, b) => b.instructions.length - a.instructions.length
      );
      break;
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
      <Sort onSort={handleSort} />
      <br />
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
          <div key={index} className={classes.card}>
            <div className={classes.cardImageContainer}>
              <img
                src={recipe.images[0]}
                alt={recipe.title}
                className={classes.cardImage}
              />
            </div>
            <div className={classes.cardContent}>
              <br />
              <Highlighter
                highlightClassName={classes.highlight}
                textToHighlight={recipe.title}
                searchWords={[search]}
                autoEscape={true}
              />
              <br />
              <br />
              <div className={classes.iconsCol}>
                <div className={classes.iconsCol1}>
                  <p
                    className={classes.cardCategory}
                    title={`Date: ${formatDate(recipe.published)}`}
                  >
                    <FaCalendar style={{ fontSize: '1.0em' }} />
                    Date Published:<br></br>
                    {formatDate(recipe.published)}
                  </p>
                  <br></br>
                  <p className={classes.cardCategory}>
                    <FaHourglass style={{ fontSize: '1.0em' }} /> Prep-Time:
                    {formatTime(recipe.prep)}
                  </p>
                </div>
                <div className={classes.iconsCol2}>
                  <p className={classes.cardCategory}>
                    <FaClock style={{ fontSize: '1.0em' }} /> Cook-Time:{' '}
                    <br></br>
                    {formatTime(recipe.cook)}
                  </p>
                  <br></br>
                  <p className={classes.cardCategory}>
                    <FaClock style={{ fontSize: '1.0em' }} /> Total-Time:{' '}
                    <br></br>
                    {formatTime(recipe.cook + recipe.prep)}
                  </p>
                </div>
              </div>
              <br />
              <br />
              <Link href={`/recipe/${recipe._id}`}>
                <ViewRecipeBtn />
              </Link>
              <div className={classes.favHeart}>
                <AddToFavoritesButton recipe={recipe} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <div className={classes.pageInfo}></div>
    </div>
  );
}
export default RecipeList;
     
  