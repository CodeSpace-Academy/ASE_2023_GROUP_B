import React from 'react';
import { FaCalendar, FaHourglass, FaClock } from 'react-icons/fa';
import Link from 'next/link';
import ViewRecipeBtn from '../icons&Buttons/view-recipe-btn';
import AddToFavoritesButton from '@/components/icons&Buttons/add-to-favorite-btn';
import { formatDate } from '@/helpers/date-util';
import { formatTime } from '@/helpers/time-util';
import classes from './recipe-list.module.css';
import Highlighter from 'react-highlight-words';

const RecipeCard = ({ recipe, search, onRemove }) => {
  
  return (
    <div className={classes.card}>
      <div className={classes.cardImageContainer}>
        {recipe.images && recipe.images.length > 0 && (
          <img
            src={recipe.images[0]}
            alt={recipe.title}
            className={classes.cardImage}
          />
        )}
      </div>

      <div className={classes.cardContent}>
        <h2 className={classes.cardTitle}>
          <Highlighter
            textToHighlight={recipe.title}
            searchWords={[search]}
            autoEscape={true}
          />
        </h2>

        <p
          className={classes.cardCategory}
          title={`Date: ${formatDate(recipe.published)}`}
        >
          <FaCalendar style={{ fontSize: '1.0em' }} />
          Date Published: {formatDate(recipe.published)}
        </p>

        <p className={classes.cardCategory}>
          <FaHourglass style={{ fontSize: '1.0em' }} /> Prep-Time:{' '}
          {formatTime(recipe.prep)}
        </p>

        <p className={classes.cardCategory}>
          <FaClock style={{ fontSize: '1.0em' }} /> Cook-Time:{' '}
          {formatTime(recipe.cook)}
        </p>

        <p className={classes.cardCategory}>
          <FaClock style={{ fontSize: '1.0em' }} /> Total-Time:{' '}
          {formatTime(recipe.cook + recipe.prep)}
        </p>

        <Link href={`/recipe/${recipe._id}`}>
          <ViewRecipeBtn />
        </Link>

        <AddToFavoritesButton
          recipe={recipe}
          onRemove={() => onRemove(recipe._id)}
        />
      </div>
    </div>
  );
};

export default RecipeCard;
