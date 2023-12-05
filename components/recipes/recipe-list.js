import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCalendar, FaHourglass, FaClock } from 'react-icons/fa';
import classes from '../recipes/recipe-list.module.css';
import ViewRecipeBtn from '../../components/icons&Buttons/view-recipe-btn';
import { formatDate } from '@/helpers/date-util';
import { formatTime } from '@/helpers/time-util';
import SearchBar from '../../components/search/SearchBar';
import Highlighter from 'react-highlight-words';
import AddToFavoritesButton from '@/components/icons&Buttons/add-to-favorite-btn';
import Hero from '@/components/hero.jsx';

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
    <div className={classes.whole}>
      <form className={classes.form}>
        <input
          required
          value={search || ''}
          onClick={() => setShowSearchButton(true)}
          onChange={handleChange}
          type="text"
          className={classes.input}
        />
        <span className={classes.caret}></span>
        {isLongQuery && showSearchButton && (
          <>
            <button type="button" onClick={clear} className={classes.clearButton}>
              <FaTimes />
            </button>
            <button type="button" onClick={handleSearch}>
              Submit
            </button>
          </>
        )}
      </form>

      { showSearchButton && searchHistory.length > 0 && !isLongQuery && (
        <ul>
          {searchHistory.map((historyItem, index) => (
            <li key={index}>{historyItem}</li>
          ))}
        </ul>
      )}
    </div>
  );
}


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
                    title={Date: ${formatDate(recipe.published)}}
                  ></div>

<FaCalendar style={{ fontSize: '1.0em' }} />
                    Date Published:
                    <br />
                    {formatDate(recipe.published)}
                  </p>
                  <br />
                  <p className={classes.cardCategory}>
                    <FaHourglass style={{ fontSize: '1.0em' }} /> Prep-Time:
                    <br />
                    {formatTime(recipe.prep)}
                  </p>
                </div>
                <div className={classes.iconsCol2}>
                  <p className={classes.cardCategory}>
                    <FaClock style={{ fontSize: '1.0em' }} /> Cook-Time: <br />
                    {formatTime(recipe.cook)}
                  </p>
                  <br />
                  <p className={classes.cardCategory}>
                    <FaClock style={{ fontSize: '1.0em' }} /> Total-Time: <br />
                    {formatTime(recipe.cook + recipe.prep)}
                  </p>
                </div>
              </div>
              <br />
              <br />
              <div className={classes.recipeOptions}>
                <div className={classes.viewRecipeBtn}>
                  <Link href={/recipe/${recipe._id}}>
                    <ViewRecipeBtn />
                  </Link>
                </div>
                <div className={classes.favHeart}>
                  <AddToFavoritesButton
                    recipe={recipe}
                    onRemove={() => onRemove(recipe._id)}
                  />
                </div>
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