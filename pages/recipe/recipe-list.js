import React, { useState } from 'react';
import Link from 'next/link';
import { FaCalendar, FaHourglass, FaClock } from 'react-icons/fa';
import classes from './recipe-list.module.css';
import ViewRecipeBtn from '../../components/icons&Buttons/view-recipe-btn';
import SearchBar from '../../components/search/SearchBar';
import { formatDate } from '@/helpers/date-util';
import { formatTime } from '@/helpers/time-util';
import Sort from '../../components/recipes/sort';
import AddToFavoritesButton from '@/components/icons&Buttons/add-to-favorite-btn';

function RecipeList({ data }) {
  const [sortOrder, setSortOrder] = useState('default');

  const handleSort = (order) => {
    setSortOrder(order);
  };

  let displayedRecipes = data;

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
            <div className="saveRecipeBtnContainer">
              <AddToFavoritesButton
                recipe={recipe}
                className={`${classes.saveRecipeBtn} ${classes.btn}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
