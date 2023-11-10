import React, { Fragment, useState, useEffect } from 'react';
import styles from '../recipe/RecipeDetailPage.module.css';
import { getRecipeById } from '../../database/recipesModule';
import { formatTime } from '@/helpers/time-util';
import UpdateDescription from '@/components/Updates/UpdateDescription';
import UpdateInstructions from '@/components/Updates/UpdateInstructions';
import { run1 } from '../../database/allergensModule';
import AddToFavoritesButton from '@/components/icons&Buttons/add-to-favorite-btn';


export default function RecipeDetailPage({ recipe, error, allergens }) {
  const [tagsError, setTagsError] = useState(false);
  const [isInstructionsVisible, setInstructionsVisible] = useState(false);

  const ingredientsArray = recipe && recipe.ingredients
    ? Object.entries(recipe.ingredients).map(([ingredient, amount]) => `${ingredient}: ${amount}`)
    : [];

  if (!recipe.ingredients) {
    return (
      <div>
        <h1>Recipe not found</h1>
        <p>This recipe does not have any ingredients.</p>
      </div>
    );
  }

  const allergensForRecipe = allergens.filter((allergen) =>
    ingredientsArray.some((ingredient) => ingredient.includes(allergen))
  );

  useEffect(() => {
    if (error && error.message === 'Failed to load tags') {
      setTagsError(true);
    }
  }, [error]);

  if (error) {
    return <div>Error loading recipe details.</div>;
  }

  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState([]);

  useEffect(() => {
    if (recipe) {
      if (Array.isArray(recipe.instructions)) {
        setEditedInstructions(recipe.instructions);
      } else if (typeof recipe.instructions === 'string') {
        setEditedInstructions(recipe.instructions.split('\n'));
      } else {
        setEditedInstructions([]);
      }
    }
  }, [recipe]);

  const handleSaveInstructions = (updatedInstructions) => {
    let updatedInstructionsArray = [];
    if (typeof updatedInstructions === 'string') {
      updatedInstructionsArray = updatedInstructions.split('\n');
    }
    setEditedInstructions(updatedInstructionsArray);
    setIsEditingInstructions(false);
  };

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    recipe.description
  );

  const handleSaveDescription = (updatedDescription) => {
    setEditedDescription(updatedDescription);
    setIsEditingDescription(false);
  };

  const instructionsArray = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : typeof recipe.instructions === 'string'
      ? recipe.instructions.split('\n')
      : [];

  const tags = Array.isArray(recipe.tags)
    ? recipe.tags.join(', ')
    : recipe.tags;

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.containerContent}>
        <img src={recipe.images[0]} alt={recipe.id} width={200} height={200} />
      
          <h1 className={styles.title}>{recipe.title}</h1>

          <AddToFavoritesButton />

          {isEditingDescription ? (
            <UpdateDescription
              initialDescription={editedDescription}
              onSave={handleSaveDescription}
            />
          ) : (
            <p>{editedDescription}</p>
          )}

          <button
            className="btn"
            onClick={() => setIsEditingDescription(!isEditingDescription)}
          >
            {isEditingDescription ? 'Cancel' : 'Update Description'}
          </button>

          <h1 className={styles.title}>Allergens:</h1>
          {allergensForRecipe.length > 0 ? (
            <ul>
              {allergensForRecipe.map((allergen, index) => (
                <li key={index}>{allergen}</li>
              ))}
            </ul>
          ) : (
            <p>No Allergens present in this recipe.</p>
          )}

          <h1 className={styles.title}>Tags:</h1>
          {tagsError ? (
            <div className={styles.errorMessage}>Failed to load tags.</div>
          ) : (
            <p>{tags}</p>
          )}

          <button
            className="btn"
            onClick={() => setInstructionsVisible(!isInstructionsVisible)}
          >
            {isInstructionsVisible ? 'Hide Instructions' : 'View Instructions'}
          </button>

          {isInstructionsVisible && (
            <div>
              <h1 className={styles.title}>Instructions:</h1>
              {isEditingInstructions ? (
                <UpdateInstructions
                  initialInstructions={instructionsArray.join('\n')}
                  onSave={handleSaveInstructions}
                />
              ) : (
                <ol className={styles.instructions}>
                  {editedInstructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              )}
              <button
                className="btn"
                onClick={() => setIsEditingInstructions(!isEditingInstructions)}
              >
                {isEditingInstructions ? 'Cancel' : 'Update Instructions'}
              </button>
            </div>
          )}

          <h3 className={styles.title}>Ingredients:</h3>
          <ul>
            {ingredientsArray.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

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
};

export const getServerSideProps = async ({ params }) => {
  try {
    const router = params;
    const { recipeId } = router;
    const Recipe = await getRecipeById(recipeId);
    const docs1 = await run1();


    if (!Recipe || !Recipe.instructions) {
      throw new Error('Failed to load instructions.');
    }
    if (!Recipe || !Recipe.tags) {
      throw new Error('Failed to load tags');
    }


    return {
      props: {
        recipe: Recipe,
        allergens: docs1[0],
        error: false,
      },
    };

  } catch (error) {
    return {
      props: {
        recipe: null,
        error: 'Failed to load recipe.',
      },
    };
  }
};