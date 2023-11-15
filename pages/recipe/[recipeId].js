import React, { Fragment, useState, useEffect } from 'react';
import styles from '../recipe/RecipeDetailPage.module.css';
import { getRecipeById } from '../../database/recipesModule';
import { formatTime } from '@/helpers/time-util';
import UpdateDescription from '@/components/Updates/UpdateDescription';
import UpdateInstructions from '@/components/Updates/UpdateInstructions';
import { run1 } from '../../database/allergensModule';
import RecipeTags from '@/components/home-page/recipe-tags';
import AddToFavoritesButton from '@/components/icons&Buttons/add-to-favorite-btn';

export default function RecipeDetailPage({ recipe, error, allergens }) {
  const [tagsError, setTagsError] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const ingredientsArray = Object.entries(recipe.ingredients).map(([ingredient, amount]) => `${ingredient}: ${amount} `);
  const allergensForRecipe = allergens.filter((allergen) =>
    ingredientsArray.some((ingredient) => ingredient.includes(allergen))
  );

  useEffect(() => {
    if (error && error.message === 'Failed to load tags') {
      setTagsError(true);
    } 
  }, [error]);

  const clearSelectedTags = () => {
    setSelectedTags([]); 
  };

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

  return (
    <Fragment>
      <div className={styles.container}>
        <img src={recipe.images[0]} alt={recipe.id} width={200} height={200} />
        <div>
          <h1 className={styles.title}>{recipe.title}</h1>

          {/* Display RecipeTags component */}
          <RecipeTags tags={recipe.tags} tagsError={tagsError} selectedTags={selectedTags} clearSelectedTags={clearSelectedTags} />

          {isEditingDescription ? (
            <UpdateDescription initialDescription={editedDescription} onSave={handleSaveDescription} />
          ) : (
            <p>{editedDescription}</p>
          )}

          <AddToFavoritesButton />

        <h1 className={styles.title}>Allergens:</h1>

<<<<<<< Updated upstream
          {allergensForRecipe.length > 0 ? (
=======
        {allergensForRecipe.length > 0 ? (
          <ul>
            {allergensForRecipe.map((allergen, index) => (
              <li className={styles.p} key={index}>{allergen}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.p}>No Allergens present in this recipe.</p>
        )}

        <h1 className={styles.title}>Tags:</h1>
        {tagsError ? (
          <div className={styles.errorMessage}>Failed to load tags.</div>
        ) : (
          <div className={styles.tagButtonsContainer}>
            {recipe.tags.map((tag, index) => (
              <button
                key={index}
                className={`${styles.tagButton} ${
                  selectedTags.includes(tag) ? styles.selectedTag : ''
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

    <h1 className={styles.title}>Description:</h1>
        {isEditingDescription ? (
          <UpdateDescription
            initialDescription={editedDescription}
            onSave={handleSaveDescription}
          />
        ) : (
          <p className={styles.p}>{editedDescription}</p>
        )}

        <button
          className="btn"
          onClick={() => setIsEditingDescription(!isEditingDescription)}
        >
          {isEditingDescription ? 'Cancel' : 'Update Description'}
        </button>
        <br />

        <div>
          <div>
            <AddToFavoritesButton
                recipe={recipe}
            />
            <div>
              <h1 className={styles.sub}>Preparation Time:</h1>
              <p className={styles.p}>{formatTime(recipe.prep)}</p>
              <br/>
              <h1 className={styles.sub}>Cooking Time:</h1>
              <p className={styles.p}>{formatTime(recipe.cook)}</p>
              <br/>
              <h1 className={styles.sub}>Total Time:</h1>
              <p className={styles.p}>{formatTime(recipe.cook + recipe.prep)}</p>
            </div>
            <h3 className={styles.title}>Ingredients:</h3>
>>>>>>> Stashed changes
            <ul>
              {allergensForRecipe.map((allergen, index) => (
                <li key={index}>{allergen}</li>
              ))}
            </ul>
          ) : (
            <p>No Allergens present in this recipe.</p>
          )}

          <button className="btn" onClick={() => setIsEditingDescription(!isEditingDescription)}>
            {isEditingDescription ? 'Cancel' : 'Update Description'}
          </button>

          <h1 className={styles.title}>Tags:</h1>
          {tagsError ? (
            <div className={styles.errorMessage}>Failed to load tags.</div>
          ) : (
            <div>
              {/* Display selected tags */}
              {selectedTags.length > 0 ? (
                <p>Selected Tags: {selectedTags.join(', ')}</p>
              ) : (
                <p>No tags selected.</p>
              )}

              {/* Button to clear selected tags */}
              <button className="btn" onClick={clearSelectedTags}>
                Clear Selected Tags
              </button>
            </div>
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
}

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
    console.error(error);
    return {
      props: {
        recipe: null,
        error: error,
      },
    };
  }
};