import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import classes from './RecipeDetailPage.module.css';

export default function FavoritePage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  return (
    <section>
      <Link href={`/recipe`} passHref>
        <IoIosArrowBack title="Back to recipes" className={classes.favIcon} />
      </Link>

      <h1 className={classes.fav}>Favorite</h1>

      {favoriteRecipes.length === 0 && (
        <p className={classes.message}>
          You have not favorited any recipes yet. Start adding your favorites!
        </p>
      )}

      {/* Display favorited recipes here */}
    </section>
  );
}
