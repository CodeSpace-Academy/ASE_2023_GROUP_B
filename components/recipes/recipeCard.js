import React from 'react';
import { FaCalendar, FaHourglass, FaClock } from 'react-icons/fa';
import Link from 'next/link';
import ViewRecipeBtn from '../icons&Buttons/view-recipe-btn';
import AddToFavoritesButton from '@/components/icons&Buttons/add-to-favorite-btn';
import { formatDate } from '@/helpers/date-util';
import { formatTime } from '@/helpers/time-util';
import classes from './recipe-list.module.css';
import Image from 'next/image';
import Highlighter from 'react-highlight-words';

const RecipeCard = ({ recipe, onRemove }) => {
  const CardImage =
    recipe.images && recipe.images.length > 0 ? recipe.images[0] : recipe.image;

  return (
    <div className={classes.card}>
      <div className={classes.cardImageContainer}>
        {recipe.images && recipe.images.length > 0 && (
          <Image
            src={CardImage}
            alt={recipe.title}
            width={400}
            height={300}
            className={classes.cardImage}
          />
        )}
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
              <FaClock style={{ fontSize: '1.0em' }} /> Cook-Time: <br></br>
              {formatTime(recipe.cook)}
            </p>
            <br></br>
            <p className={classes.cardCategory}>
              <FaClock style={{ fontSize: '1.0em' }} /> Total-Time: <br></br>
              {formatTime(recipe.cook + recipe.prep)}
            </p>
          </div>
        </div>
        <br />
        <br />
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