import React, { useState } from "react";
import Link from "next/link";
import classes from "../recipes/recipe-list.module.css";
import ViewRecipeBtn from "../icons&Buttons/view-recipe-btn";
import ShowMoreButton from "../icons&Buttons/show-more";

function RecipeList({ data }) {
  const initialRecipesToShow = 50;
  const recipesPerPage = 50;
  const [recipesToShow, setRecipesToShow] = useState(initialRecipesToShow);

  const handleShowMore = () => {
    setRecipesToShow((prev) => prev + recipesPerPage);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Recipes</h1>

      <div className={classes.cardContainer}>
        {data.slice(0, recipesToShow).map((recipe, index) => (
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
      <div>
      {recipesToShow < data.length && (
        <ShowMoreButton onClick={handleShowMore} />
      )}
      </div>
    </div>
  );
}

export default RecipeList;