import React from 'react';
import { Fragment } from 'react';
import RecipeList from '@/components/recipes/recipe-list';
import ArrowIpIcon from '@/components/icons&Buttons/arrow-up-icon';
import { run } from '../../database/recipesModule';

export default function AllRecipes(props) {
  return (
    <Fragment>
      <RecipeList data={props.data} error ={props.error} />
      <ArrowIpIcon />
    </Fragment>
  );
}

export async function getServerSideProps() {
 try{
  const data = await run(1);

  return {
    props: {
      data: data,
    }
  };
 }catch(error){

  return{
    props:{
      error : "No recipes found"
    }
  }
 }


}
