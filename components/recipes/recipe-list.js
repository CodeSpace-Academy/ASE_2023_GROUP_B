import React, { useState } from 'react';
import Link from 'next/link';
import { FaCalendar, FaHourglass, FaClock } from 'react-icons/fa';
import classes from '../recipes/recipe-list.module.css';
import ViewRecipeBtn from '../icons&Buttons/view-recipe-btn';
import ShowMoreButton from '../icons&Buttons/show-more';
import { formatDate } from '@/helpers/date-util';
import { formatTime } from '@/helpers/time-util';
import Sort from './sort';
import AddToFavHeart from '../icons&Buttons/add-to-favHeart';
import SearchBar from '../search/SearchBar';
import Pagination from './pagination';

function RecipeList({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('default');
  const recipesPerPage = 100;
  const totalPageCount = Math.ceil(data.length / recipesPerPage);

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPageCount) {
      setCurrentPage(page);
    }
  };

  const remainingRecipes = data.length - currentPage * recipesPerPage;

  let displayedRecipes = data.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  if (remainingRecipes < recipesPerPage) {
    displayedRecipes = data.slice((currentPage - 1) * recipesPerPage);
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
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>RECIPES</h1>

      <SearchBar />
      <br />
      <Sort onSort={handleSort} />
      <br />
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
              <h2 className={classes.cardTitle}>{recipe.title}</h2>
              <br />

              <p
                className={classes.cardCategory}
                title={`Date: ${formatDate(recipe.published)}`}
              >
                <FaCalendar size="1.0em" />
                <span>{formatDate(recipe.published)}</span>
              </p>

              <p className={classes.cardCategory}>
                <FaHourglass style={{ fontSize: '1.0em' }} />
                <span>{formatTime(recipe.prep)}</span>
              </p>

              <p className={classes.cardCategory}>
                <FaClock style={{ fontSize: '1.0em' }} />
                <span>{formatTime(recipe.cook)}</span>
              </p>
            </div>
            <br />
            <Link href={`/recipe/${recipe._id}`}>
              <ViewRecipeBtn className={classes.btn} />
            </Link>
            <AddToFavHeart />
          </div>
        ))}
      </div>
      <br />
      <div>
        {totalPageCount > 1 && currentPage < totalPageCount && (
          <Pagination
            currentPage={currentPage}
            totalPageCount={totalPageCount}
            handlePageChange={handlePageChange}
          />
        )}

        <div className={classes.pageInfo}>
          <p>
            {remainingRecipes > 0 && `${remainingRecipes} recipes remaining.`}
            Page {currentPage} of {totalPageCount}.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecipeList;
