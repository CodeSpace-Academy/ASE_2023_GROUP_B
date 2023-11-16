import React, { useState } from 'react';
import Link from 'next/link';
import { FaCalendar, FaHourglass, FaClock } from 'react-icons/fa';
import classes from '../../pages/recipe/recipe-list.module.css';
import ViewRecipeBtn from '../../components/icons&Buttons/view-recipe-btn';
import { formatDate } from '@/helpers/date-util';
import { formatTime } from '@/helpers/time-util';
import Sort from '../../components/recipes/sort';
import SearchBar from '../../components/search/SearchBar';
import Highlighter from 'react-highlight-words';
// import AddToFavoritesButton from '@/components/icons&Buttons/add-to-favorite-btn';

function RecipeList({ data }) {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const recipesPerPage = 100;

  const handleSort = (order) => {
    setSortOrder(order);
  };

  let displayedRecipes = [...data];

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

      <SearchBar search={search} setSearch={setSearch} />
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
              <Highlighter
                className={classes.cardTitle}
                textToHighlight={recipe.title}
                searchWords={[search]}
                autoEscape={true}
              />

              <p
                className={classes.cardCategory}
                title={`Date: ${formatDate(recipe.published)}`}
              >
                <FaCalendar style={{ fontSize: '1.0em' }} />
                Date Published: <br></br>
                {formatDate(recipe.published)}
              </p>

              <p className={classes.cardCategory}>
                <FaHourglass style={{ fontSize: '1.0em' }} /> Prep-Time:{' '}
                <br></br>
                {formatTime(recipe.prep)}
              </p>

              <p className={classes.cardCategory}>
                <FaClock style={{ fontSize: '1.0em' }} /> Cook-Time: <br></br>
                {formatTime(recipe.cook)}
              </p>

              <p className={classes.cardCategory}>
                <FaClock style={{ fontSize: '1.0em' }} /> total-time: <br></br>
                {formatTime(recipe.cook + recipe.prep)}
              </p>

              <Link href={`/recipe/${recipe._id}`}>
                <ViewRecipeBtn />
              </Link>

              {/* <AddToFavoritesButton
                recipe={recipe}
              /> */}
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
