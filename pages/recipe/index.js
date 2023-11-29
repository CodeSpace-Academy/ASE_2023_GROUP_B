import React from 'react';
import { Fragment } from 'react';
import RecipeList from '@/components/recipes/recipe-list';
import ArrowIpIcon from '@/components/icons&Buttons/arrow-up-icon';
import { getAllRecipes } from '../../database/recipesModule';
import { get } from 'lodash';

export default function AllRecipes(props) {

  return (
    <Fragment>
      
      <RecipeList data={props.data} />
      <ArrowIpIcon />
    </Fragment>
  );
}

export async function getServerSideProps() {
  const data = await getAllRecipes(1);

  return {
    props: {
      data: data,
      
    },
  };
}
