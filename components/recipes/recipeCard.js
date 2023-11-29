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

const RecipeCard = ({ recipe, search, onRemove }) => {
   const cardImage =
    recipe.images && recipe.images.length > 0 ? recipe.images[0] : recipe.image;

  return (
    <div className={classes.card}>
      <div className={classes.cardImageContainer}>
         {recipe.images && recipe.images.length > 0 && (
          <Image
            src={cardImage}
            alt={recipe.title}
            width={400}
            height={300}
            className={classes.cardImage}
            priority={true} 
          />
        )}
      </div>

      <div className={classes.cardContent}>
        <Highlighter
          highlightClassName={classes.highlight}
          textToHighlight={recipe.title}
          searchWords={[search]}
          autoEscape={true}
        />
<br/>
 <div className={classes.iconsCol}>
          <div className={classes.iconsCol1}>
          </div>
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

        <div className={classes.favHeart}>
          <AddToFavoritesButton
            recipe={recipe}
            onRemove={() => onRemove(recipe._id)}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default RecipeCard;
