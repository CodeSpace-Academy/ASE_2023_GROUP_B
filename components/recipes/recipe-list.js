import React from "react";
import Link from "next/link";
import classes from "../recipes/recipe-list.module.css"
import ViewRecipeBtn from "../icons&Buttons/view-recipe-btn";
import ShowMoreButton from "../icons&Buttons/show-more";

function RecipeList({ data }) {

  
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Recipes</h1>
      <div className={classes.cardContainer}>
        {data.map((recipe, index) => (
          <div key={index} className={classes.card}>
            <div className={classes.cardImageContainer}>
              <img
                src={recipe.images[0]}
                alt={recipe.title}
                className={classes.cardImage}
              />
            </div>
            <div className={classes.cardContent}>
              <h2 className={classes.cardTitle}>{recipe.title}</h2>
              <p className={classes.cardCategory}>
                Category: {recipe.category}
              </p>
              <Link href={`/recipe/${recipe._id}`}>
                <ViewRecipeBtn />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <br></br>
      <ShowMoreButton />
    </div>
  );
}
export default RecipeList;
