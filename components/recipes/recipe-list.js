import React, { useState } from "react";
import Link from "next/link";
import classes from "../recipes/recipe-list.module.css";
import ViewRecipeBtn from "../icons&Buttons/view-recipe-btn";
import ShowMoreButton from "../icons&Buttons/show-more";

import { formatDate } from "@/helpers/date-util";
import { formatTime } from "@/helpers/time-util";
import Sort from "./sort"; 
import AddToFavHeart from "../icons&Buttons/add-to-favHeart"; 

function RecipeList({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("default");
  const recipesPerPage = 50;

  const handleSort = (order) => {
    setSortOrder(order);
  };

const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const remainingRecipes = data.length - currentPage * recipesPerPage;

  let displayedRecipes = data.slice(0, currentPage * recipesPerPage);

  switch (sortOrder) {
    case "newest":
      displayedRecipes.sort((a, b) => new Date(b.published) - new Date(a.published));
      break;
    case "cook-asc":
      displayedRecipes.sort((a, b) => a.cook - b.cook);
      break;
    case "cook-desc":
      displayedRecipes.sort((a, b) => b.cook - a.cook);
      break;
    case "prep-asc":
      displayedRecipes.sort((a, b) => a.prep - b.prep);
      break;
    case "prep-desc":
      displayedRecipes.sort((a, b) => b.prep - a.prep);
      break;
   
  }


  return (
    <div className={classes.container}>
      <h1 className={classes.title}>RECIPES</h1>

      <Sort onSort={handleSort} />

      <div className={classes.cardContainer}>
        {displayedRecipes.map((recipe, index) => (
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
              <p className={classes.cardCategory}>Category: {recipe.category}</p>
              {/* You may need to define the formatDate and formatTime functions */}
              <p className={classes.cardCategory}>Date: {formatDate(recipe.published)}</p>
              <p className={classes.cardCategory}>Prep: {formatTime(recipe.prep)}</p>
              <p className={classes.cardCategory}>Cook: {formatTime(recipe.cook)}</p>
              <Link href={`/recipe/${recipe._id}`}>
                <ViewRecipeBtn />
              </Link>
              <AddToFavHeart />
            </div>
          </div>
        ))}
      </div>
      <br />
      <div>
        {remainingRecipes > 0 && (
          <ShowMoreButton
            remainingRecipes={remainingRecipes}
            onClick={handleShowMore}
          />
        )}
      </div>
    </div>
  );
}

export default RecipeList;