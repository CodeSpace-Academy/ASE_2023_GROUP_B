import React, {useState, useEffect} from "react";
import styles from "./RecipeDetailPage.module.css";
import { getRecipeById } from "../api/mongodb";
import UpdateDescription from "@/components/Updates/UpdateDescription";
import UpdateInstructions from "@/components/Updates/UpdateInstructions";

export default function RecipeDetailPage({ recipe, error }) {
  
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
    console.log('Updated Instructions:', updatedInstructionsArray);
    setEditedInstructions(updatedInstructionsArray);
    setIsEditingInstructions(false);
  };

  let instructionsArray = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : typeof recipe.instructions === 'string'
      ? recipe.instructions.split('\n')
      : [];



  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(recipe.description);

  const handleSaveDescription = (updatedDescription) => {
    console.log("Updated Description:", updatedDescription);
    setEditedDescription(updatedDescription);
    setIsEditingDescription(false);
  }


  return (
    <div className={styles.container}>
      <img src={recipe.images[0]} alt={recipe.id} width={200} height={200} />
      <div>
        <h1 className={styles.title}>{recipe.title}</h1>


        {isEditingDescription ? (
          <UpdateDescription
            initialDescription={editedDescription}
            onSave={handleSaveDescription}
          />
        ) : (
          <p>{editedDescription}</p>
        )}

        <button className="btn"
          onClick={() => setIsEditingDescription(!isEditingDescription)}>
          {isEditingDescription ? 'Cancel' : 'Update Description'}
        </button>


        <h1>Instructions:</h1>
      
        {isEditingInstructions ? (
          <UpdateInstructions
            initialInstructions={instructionsArray.join('\n')} // Pass the initial instructions as a string
            onSave={handleSaveInstructions}
          />
        ) : (
          <ol className={styles.instructions}>
            {instructionsArray.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        )}

        <button className="btn"
          onClick={() => setIsEditingInstructions(!isEditingInstructions)}>
          {isEditingInstructions ? 'Cancel' : 'Update Instructions'}
        </button>






      </div>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  try {
    const router = params;
    const { recipeId } = router;
    const Recipe = await getRecipeById(recipeId);
    if (!Recipe || !Recipe.instructions) {
      throw new Error("Failed to load instructions.");
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
