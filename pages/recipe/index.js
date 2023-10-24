import React from "react";
import { Fragment } from "react";
//import { useRouter } from 'next/router';
import RecipeList from "@/components/recipes/recipe-list";
import ArrowIpIcon from "@/components/icons&Buttons/arrow-up-icon";

import { run } from "../api/mongodb";
//import { EXPORT_DETAIL } from "next/dist/shared/lib/constants";

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
