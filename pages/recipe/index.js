import React, { useEffect }from 'react';
import { useState } from 'react';
import RecipeList from '@/components/recipes/recipe-list';
import ArrowIpIcon from '@/components/icons&Buttons/arrow-up-icon';
import { getRecipes } from '../../database/recipesModule';
import { useState, useEffect } from "react";
import Sort from "../../components/recipes/sort"; // Adjust the import path accordingly

function AllRecipes({ data }) {
  const [sortedData, setSortedData] = useState(data);
  const [sortOrder, setSortOrder] = useState("default");

  const handleSort = (order) => {
    setSortOrder(order);
  };

  useEffect(() => {
    sortData();
  }, [sortOrder, data]);

  const sortData = () => {
    let sorted = [...data];

    switch (sortOrder) {
      case "newest":
        sorted.sort((a, b) => new Date(b.published) - new Date(a.published));
        break;
      case "cook-asc":
        sorted.sort((a, b) => a.cook - b.cook);
        break;
      case "cook-desc":
        sorted.sort((a, b) => b.cook - a.cook);
        break;
      case "prep-asc":
        sorted.sort((a, b) => a.prep - b.prep);
        break;
      case "prep-desc":
        sorted.sort((a, b) => b.prep - a.prep);
        break;
      case "steps-asc":
        sorted.sort((a, b) => a.instructions.length - b.instructions.length);
        break;
      case "steps-desc":
        sorted.sort((a, b) => b.instructions.length - a.instructions.length);
        break;
      default:
        // Default sorting logic if needed
        break;
    }

    setSortedData(sorted);
  };
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filterIngredientResults, setFilterIngredientResults] = useState([]);
  const [recipes, setRecipes] = useState([]);
  //const [filteredRecipes, setFilteredRecipes] = useState(data);
  
  useEffect(() => {
    setRecipes(props.data);
  }, []);

  function handleDefaultIngredientFilter() {
    if (selectedIngredients.length > 0) {
      setSelectedIngredients([]);
    }
  }

  return (
    <div>
      <Sort onSort={handleSort} />
      <RecipeList data={sortedData} />
      <ArrowIpIcon />
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getRecipes(1); // Replace with your data fetching logic

  return {
    props: {
      data: data,
    },
  };
}

export default AllRecipes;