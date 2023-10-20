import React, { Fragment, useState, useEffect } from 'react';
import styles from './RecipeDetailPage.module.css';
import { getRecipeById } from '../api/mongodb';
import { formatTime } from '@/helpers/time-util';
import UpdateDescription from '@/components/Updates/UpdateDescription';
import UpdateInstructions from '@/components/Updates/UpdateInstructions';

export default function RecipeDetailPage({ recipe, error }) {
  const [tagsError, setTagsError] = useState(false);

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
  const [editedDescription, setEditedDescription] = useState(recipe.description);

  const handleSaveDescription = (updatedDescription) => {
    setEditedDescription(updatedDescription);
    setIsEditingDescription(false);
  };

  const instructionsArray = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : typeof recipe.instructions === 'string'
    ? recipe.instructions.split('\n')
    : [];

  const tags = Array.isArray(recipe.tags) ? recipe.tags.join(', ') : recipe.tags;

  return (
    <Fragment>
      <div className={styles.container}>
        <img src={recipe.images[0]} alt={recipe.id} width={200} height={200} />
        <div>
          <h1 className={styles.title}>{recipe.title}</h1>

          {isEditingDescription ? (
            <UpdateDescription initialDescription={editedDescription} onSave={handleSaveDescription} />
          ) : (
            <p>{editedDescription}</p>
          )}

          <button className="btn" onClick={() => setIsEditingDescription(!isEditingDescription)}>
            {isEditingDescription ? 'Cancel' : 'Update Description'}
          </button>

          <h1 className={styles.title}>Tags:</h1>
          {tagsError ? (
            <div className={styles.errorMessage}>Failed to load tags.</div>
          ) : (
            <p>{tags}</p>
          )}

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

          <button className="btn" onClick={() => setIsEditingInstructions(!isEditingInstructions)}>
            {isEditingInstructions ? 'Cancel' : 'Update Instructions'}
          </button>

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
