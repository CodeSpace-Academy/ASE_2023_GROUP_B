import React from 'react';
import { Fragment } from 'react';
import RecipeList from '@/components/recipes/recipe-list';
import ArrowIpIcon from '@/components/icons&Buttons/arrow-up-icon';
import { run } from '../../database/recipesModule';
import Hero from '@/components/hero.jsx';
import { useState } from 'react';

export default function AllRecipes(props) {
  // console.log(props.data);
  const [recipes, setRecipes] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filterIngredientResults,setFilterIngredientResults]= useState([])
  

  function handleDefaultIngredientFilter() {
    setSelectedIngredients([]);
  }

  return (
    <Fragment>
      <Hero
        handleDefaultIngredientFilter={handleDefaultIngredientFilter}
        setFilterIngredientResults={setFilterIngredientResults}
        setRecipes={setRecipes}
        filterIngredientResults={filterIngredientResults}
        setSelectedIngredients={setSelectedIngredients}
        selectedIngredients={selectedIngredients}
      />
      <RecipeList data={props.data} />
      <ArrowIpIcon />
    </Fragment>
  );
}

export async function getServerSideProps() {
  const data = await run(1);

  return {
    props: {
      data: data,
    },
  };
}
