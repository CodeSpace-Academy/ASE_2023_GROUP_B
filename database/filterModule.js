// filterModule.js

import { getClient, connectToMongo, closeMongoConnection } from "../pages/api/mongodb";

export async function getIngredients() {
  const client = getClient();
  try {
    await connectToMongo();
    const collection = client.db("devdb").collection("recipes");
    const ingredients = await collection
      .aggregate([
        {
          $project: {
            ingredients: {
              $objectToArray: "$ingredients",
            },
          },
        },
        {
          $unwind: "$ingredients",
        },
        {
          $group: {
            _id: null,
            uniqueIngredients: {
              $addToSet: "$ingredients.k",
            },
          },
        },
        {
          $project: {
            _id: 0,
            uniqueIngredients: 1,
          },
        },
      ])
      .toArray();

    return ingredients[0].uniqueIngredients;
  } catch (error) {
    console.error("Error fetching unique ingredients:", error);
    throw error;
  } finally {
    await closeMongoConnection();
  }
}

export async function filteringByIngredient(selectedIngredients) {
  const client = getClient();

  try {
    await connectToMongo();
    const recipesCollection = client.db("devdb").collection("recipes");

    if (!selectedIngredients || selectedIngredients.length === 0) {
      throw new Error('No selected ingredients provided');
    }

    const query = {
      $or: selectedIngredients.map((ingredient) => ({ [`ingredients.${ingredient}`]: { $exists: true } })),
    };

    const filterIngredientsResult = await recipesCollection
      .find(query)
      .toArray();

    return filterIngredientsResult;
  } catch (error) {
    console.error("Error filtering recipes by ingredients:", error);
    throw error;
  } finally {
    await closeMongoConnection();
  }
}

export async function filteringByNumberOfSteps(numOfSteps) {
  
  try {
    await connectToMongo();
    const client = getClient();
    const parsedNumOfSteps = parseInt(numOfSteps, 10);

    if (isNaN(parsedNumOfSteps) || parsedNumOfSteps <= 0) {
      throw new Error('Invalid or non-positive number of steps provided');
    }

    const query = {
      instructions: {
        $exists: true,
        $not: {
          $size: 0,
        },
        $size: parsedNumOfSteps,
      },
    };

    const filterStepsResult = await client.db("devdb").collection("recipes")
      .find(query)
      .limit(10)
      .toArray();

    return filterStepsResult;
  } catch (error) {
    console.error("Error filtering recipes by number of steps:", error);
    throw error;
  } finally {
    await closeMongoConnection();
  }
}
