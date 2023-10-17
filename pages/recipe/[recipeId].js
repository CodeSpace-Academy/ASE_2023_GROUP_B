import React from 'react';
import styles from './RecipeDetailPage.module.css';
import { getEventById } from '../api/mongodb';

export default function RecipeDetailPage({ recipe, error }) {
  // console.log(recipe);

  // if (error) {
  //   return <div>Error loading recipe details.</div>;
  // }

  // let instructionsArray = Array.isArray(recipe.instructions)
  // ? recipe.instructions
  // : typeof recipe.instructions === 'string'
  // ? recipe.instructions.split('\n')
  // : [];


  return (
    <div className={styles.container}>
      {/* <img src={recipe.images[0]} alt={recipe.id} width={200} height={200} />
      <div>
        <h1 className={styles.title}>{recipe.title}</h1>

        <p className={styles.instructions}>{recipe.description}</p>

        <h1>Instructions:</h1>
        {instructionsArray.length > 0 ? (
          <ol className={styles.instructions}>
            {instructionsArray.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : (
          <div>Failed to load instructions.</div>
        )}
      </div> */}
      <p>TEST</p>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  try {
    const router = params;
    const { recipeId } = router;
    const Recipe = await getEventById(recipeId);
    if (!Recipe || !Recipe.instructions) {
      throw new Error('Failed to load instructions.');
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
        error: true,
      },
    };
  }
};
