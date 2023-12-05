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
    await closeMongoConnection();
  }
}

export async function filteringByIngredient(selectedIngredients) {
  const client = getClient();
  try {
    await connectToMongo();
    const recipesCollection = client.db("devdb").collection("recipes");
    const query = {};
    if (selectedIngredients && selectedIngredients.length > 0) {
      query.$or = selectedIngredients.map((ingredient) => ({
        [`ingredients.${ingredient}`]: { $exists: true },
      }));
    }
    const filterIngredientsResult = await recipesCollection.find(query).toArray();
    return filterIngredientsResult;
  } catch (error) {
    console.error("Error filtering recipes by ingredients:", error);
    throw error;
  }
}

async function getTags() {
  try {
    // Connect to MongoDB
    await client.connect();

    // Access your database and collection
    const database = client.db("your-database-name");
    const collection = database.collection("your-collection-name");

    // Perform a query to retrieve tags
    const tags = await collection.distinct("tagName");

    return tags;
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

export { getTags };