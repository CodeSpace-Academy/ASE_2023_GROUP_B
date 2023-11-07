import React from "react";
import Link from "next/link";
import styles from "@/components/recipes/favorites-recipes.module.css"; // Import the CSS module

function FavoritedRecipes({ favoriteRecipes, data }) {
  return (
    <div className={styles.favoriteRecipes}>
      <h2>Your Favorite Recipes</h2>
      {favoriteRecipes.map((recipeId) => {
        const recipe = data.find((item) => item._id === recipeId);
        if (recipe) {
          return (
            <div key={recipe._id} className={styles.favoriteRecipe}>
              <Link href={`/recipe/${recipe._id}`}>
                
                  <div className={styles.recipeImageContainer}>
                    <img
                      src={recipe.images[0]}
                      alt={recipe.title}
                      className={styles.recipeImage}
                    />
                  </div>
                  <h3>{recipe.title}</h3>
                  <p className={styles.recipeDescription}>{recipe.description}</p>
                
              </Link>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default FavoritedRecipes;





















