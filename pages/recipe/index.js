import React from "react";
import Head from "next/head";
import { Fragment } from "react";
import RecipeList from "@/components/recipes/recipe-list";
import ArrowIpIcon from "@/components/icons&Buttons/arrow-up-icon";

export default function AllRecipes() {
  return (
    <Fragment>
      <Head>
        <title>All Recipes</title>
        <meta
          name="description"
          content="Explore food from around the world..."
        />
        <link rel="icon" type="image/png" href="/recipe-book (1).png" />
      </Head>
      <RecipeList />
      <ArrowIpIcon />
    </Fragment>
  );
  }

