import React, { useState } from "react";
import Link from "next/link";
import { FaCalendar, FaHourglass, FaClock } from "react-icons/fa";
import classes from "../recipes/recipe-list.module.css";
import ViewRecipeBtn from "../icons&Buttons/view-recipe-btn";
import ShowMoreButton from "../icons&Buttons/show-more";
import { formatDate } from "@/helpers/date-util";
import { formatTime } from "@/helpers/time-util";
import Sort from "./sort";
import FavoriteRecipes from "./favoritesRecipes";

function RecipeList({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("default");
  const [favoriteRecipes, setFavoriteRecipes] = useState([]); // State to store favorite recipes
  const recipesPerPage = 50;

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const toggleFavorite = (recipeId) => {
    // Check if the recipe is already in favorites
    if (favoriteRecipes.includes(recipeId)) {
      // If it is, remove it from favorites
      setFavoriteRecipes(favoriteRecipes.filter(id => id !== recipeId));
    } else {
      // If it's not, add it to favorites
      setFavoriteRecipes([...favoriteRecipes, recipeId]);
    }
  };

  const remainingRecipes = data.length - currentPage * recipesPerPage;
  let displayedRecipes = data.slice(0, currentPage * recipesPerPage);

  switch (sortOrder) {
    case "newest":
      displayedRecipes.sort(
        (a, b) => new Date(b.published) - new Date(a.published)
      );
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
      <br />
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

              <p
                className={classes.cardCategory}
                title={`Date: ${formatDate(recipe.published)}`}
              >
                <FaCalendar style={{ fontSize: "1.5em" }} />
                {formatDate(recipe.published)}
              </p>

              <p className={classes.cardCategory}>
                <FaHourglass style={{ fontSize: "1.5em" }} />{" "}
                {formatTime(recipe.prep)}
              </p>

              <p className={classes.cardCategory}>
                <FaClock style={{ fontSize: "1.5em" }} />{" "}
                {formatTime(recipe.cook)}
              </p>

              <Link href={`/recipe/${recipe._id}`}>
                <ViewRecipeBtn />
              </Link>

              <button
                onClick={() => toggleFavorite(recipe._id)}
                className={classes.favoriteButton}
              >
                {favoriteRecipes.includes(recipe._id) ? "Remove from Favorites" : "Add to Favorites"}
              </button>
              
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

      {/* Render the FavoriteRecipes component if there are favorites */}
      {favoriteRecipes.length > 0 && (
        <FavoriteRecipes favoriteRecipes={favoriteRecipes} data={data} />
      )}

    </div>
  );
}

export default RecipeList;