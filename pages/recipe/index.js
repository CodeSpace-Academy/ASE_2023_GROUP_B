import React, { useEffect }from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import RecipeList from '@/components/recipes/recipe-list';
import ArrowIpIcon from '@/components/icons&Buttons/arrow-up-icon';
import { getRecipes } from '../../database/recipesModule';

export default function AllRecipes(props) {
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
    <Fragment>
      
      <Hero

        handleDefaultIngredientFilter={handleDefaultIngredientFilter}
        setFilterIngredientResults={setFilterIngredientResults}
        setRecipes={setRecipes}
        filterIngredientResults={filterIngredientResults}
        setSelectedIngredients={setSelectedIngredients}
        selectedIngredients={selectedIngredients}

      />
      <ArrowIpIcon />
      <RecipeList data={recipes} />
    </Fragment>
  );
}

export async function getServerSideProps() {
  const data = await getRecipes(1);

  return {
    props: {
      data: data,

    },
  };
}
