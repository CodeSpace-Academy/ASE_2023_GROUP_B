import React, { useEffect } from 'react';
import { Fragment } from 'react';
import RecipeList from '@/pages/recipe/recipe-list';
import ArrowIpIcon from '@/components/icons&Buttons/arrow-up-icon';
import { run } from '../../database/recipesModule';
import Hero from '@/components/hero.jsx';
import { useState } from 'react';

export default function AllRecipes(props) {
  // console.log(props.data);
  const [recipes, setRecipes] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filterIngredientResults,setFilterIngredientResults]= useState([])
  
  useEffect(()=>{

    setRecipes(props.data)

  },[])

  function handleDefaultIngredientFilter() {
    if (selectedIngredients.length > 0) {
      setSelectedIngredients([]);
    }
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
      <RecipeList data={recipes} />
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
