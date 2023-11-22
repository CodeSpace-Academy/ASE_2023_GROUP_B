import React from 'react';
import { Fragment } from 'react';




export default function AllRecipes(props) {
  // console.log(props.data);
 
import RecipeList from '@/components/recipes/recipe-list';
import ArrowIpIcon from '@/components/icons&Buttons/arrow-up-icon';
import { run } from '../../database/recipesModule';

export default function AllRecipes(props) {

  return (
    <Fragment>
      
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
