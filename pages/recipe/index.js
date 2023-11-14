import React from "react";
import { Fragment } from "react";
import RecipeList from "@/pages/recipe/recipe-list";
import ArrowIpIcon from "@/components/icons&Buttons/arrow-up-icon";
import { run } from "../../database/recipesModule";

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
      revalidate: 60,
    },
  };
}
