import { connectToMongo, closeMongoConnection, getClient } from "../pages/api/mongodb";


export async function getIngredients() {
  const client = getClient();
  try {
    await connectToMongo(); // Ensure that the MongoDB connection is established

   
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
    await closeMongoConnection(); // Close the MongoDB connection when done
  }
}

export async function filteringByIngredient(selectedIngredients) {
  
  
  const client = getClient();
  
  try {
    
    await connectToMongo();
    const recipesCollection =client.db("devdb").collection("recipes")

  const query = {};

  if (selectedIngredients && selectedIngredients.length > 0) {
    query.$or = selectedIngredients.map((ingredient) => ({
      [`ingredients.${ingredient}`]: { $exists: true },
    }));
  }
    const filterIngredientsResult = await recipesCollection
      .find(query)
      .limit(5)
      .toArray();
    return filterIngredientsResult;
  } catch (error) {
    console.error("Error filtering recipes by ingredients:", error);
    throw error;
  }
}

export async function searching(search) {

  const client = getClient();
  const query = {};

  try {
    await connectToMongo();
    const recipesCollection =client.db("devdb").collection("recipes")
    
    if (search && search.length > 0) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    
    const result = await recipesCollection
      .find(query)
      .limit(100)
      .toArray();

    return result;
  } catch (error) {
    throw new Error(
      "could not filter recipes according to the filters selected",
    );
  }
}
