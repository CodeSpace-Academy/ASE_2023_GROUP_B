// pages/api/filterRecipes.js

import { filterRecipesBySteps, filterRecipesByIngredients, getUniqueIngredients, closeConnections } from "../../path-to-filterModule/filterModule";

export default async function handler(req, res) {
  const { steps, ingredients } = req.body;

  try {
    const recipesBySteps = await filterRecipesBySteps(steps);
    const recipesByIngredients = await filterRecipesByIngredients(ingredients);
    const uniqueIngredients = await getUniqueIngredients();


    res.status(200).json({ recipesBySteps, recipesByIngredients, uniqueIngredients });
  } catch (error) {
    console.error("Error handling filter request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await closeConnections();
  }
}
