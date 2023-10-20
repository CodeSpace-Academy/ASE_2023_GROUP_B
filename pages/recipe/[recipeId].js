import React, { Fragment, useState, useEffect } from 'react';
import styles from './RecipeDetailPage.module.css';
import { getRecipeById } from '../api/mongodb';
import { formatTime } from '@/helpers/time-util';

export default function RecipeDetailPage({ recipe, error }) {
  const [tagsError, setTagsError] = useState(false);

  useEffect(() => {
    if (error && error.message === 'Failed to load tags') {
      setTagsError(true);
    }
  }, [error]);

  if (error && error.message !== 'Failed to load tags') {
    return <div>Error loading recipe details.</div>;
  }

  let instructionsArray = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : typeof recipe.instructions === 'string'
    ? recipe.instructions.split('\n')
    : [];

  // Handle tags as an array of strings
  const tags = Array.isArray(recipe.tags) ? recipe.tags.join(', ') : recipe.tags;

  return (
    <Fragment>
      <div className={styles.container}>
        <img src={recipe.images[0]} alt={recipe.id} width={200} height={200} />
        <div>
          <h1>{recipe.title}</h1>
          <p className={styles.instructions}>{recipe.description}</p>
          {tagsError ? (
            <div className={styles.errorMessage}>Failed to load tags.</div>
          ) : (
            <Fragment>
              <h1 className={styles.title}>Tags:</h1>
              <p>{tags}</p>
            </Fragment>
          )}

          <h1 className={styles.title}>Instructions:</h1>
          {instructionsArray.length > 0 ? (
            <ol className={styles.instructions}>
              {instructionsArray.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          ) : (
            <div>Failed to load instructions.</div>
          )}
          <h1 className={styles.title}>Preparation Time:</h1>
          <p>{formatTime(recipe.prep)}</p>
          <h1 className={styles.title}>Cooking Time:</h1>
          <p>{formatTime(recipe.cook)}</p>
          <h1 className={styles.title}>Total Time:</h1>
          <p>{formatTime(recipe.cook + recipe.prep)}</p>
        </div>
      </div>
    </Fragment>
  );
}


export const getServerSideProps = async ({ params }) => {
  try {
    const router = params;
    const { recipeId } = router;
    const Recipe = await getRecipeById(recipeId);

    if (!Recipe || !Recipe.instructions) {
      throw new Error('Failed to load instructions.');
    }

    if (!Recipe || !Recipe.tags) {
      throw new Error('Failed to load tags');
    }

    return {
      props: {
        recipe: Recipe,
        error: false,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        recipe: null,
        error: error,
      },
    };
  }
};