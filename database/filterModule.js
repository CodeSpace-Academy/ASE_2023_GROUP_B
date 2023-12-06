import { connectToMongo, closeMongoConnection, getClient } from "../pages/api/mongodb";


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

export async function getTags() {
  const client = getClient();

  try {
    const collection = client.db("devdb").collection("recipes");

    const tags = await collection
      .aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags" } },
        { $project: { _id: 0, tag: "$_id" } },
      ])
      .toArray();

    return tags.map((tagObj) => tagObj.tag);
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw new Error("Could not fetch tags");
  }
}

export async function getCategories() {
  const client = getClient();

  try {
    await connectToMongo();

    const categoriesCollection = client.db("devdb").collection("categories");
    const categories = await categoriesCollection.find().toArray();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Could not fetch categories");
  } finally {
    await closeMongoConnection();
  }
}

export async function filteringByCategories(categories) {
  const client = getClient();
  try {
    await connectToMongo();
    const recipesCollection = client.db("devdb").collection("recipes");
    const query = {};

    if (categories && categories.length > 0) {
      query.categories = { $in: categories };
    }

    const filterCategoriesResult = await recipesCollection.find(query);
    return filterCategoriesResult.toArray();
  } catch (error) {
    console.error("Error filtering recipes by categories:", error);
    throw error;
  }
}

export async function filtering(filters) {
  const client = getClient();

  try {
    await connectToMongo();

    const {
      tags, ingredients, categories, instructions,
    } = filters;

    const collection = client.db("devdb").collection("recipes");

    const query = {};

    if (categories && categories.length > 0) {
      query.category = { $all: categories };
    }

    if (tags && tags.length > 0) {
      query.tags = { $all: tags };
    }

    if (ingredients && ingredients.length > 0) {
      const ingredientQueries = ingredients.map((ingredient) => ({
        [`ingredients.${ingredient}`]: { $exists: true },
      }));
      query.$and = ingredientQueries;
    }

    if (instructions) {
      query.instructions = { $size: instructions };
    }

    const pipeline = buildPipeline(filters);
    
    if (Object.keys(query).length > 0) {
      pipeline.push({
        $match: query,
      });
    }

    // Execute the pipeline
    const result = await collection.aggregate(pipeline).toArray();

    return result;
  } catch (error) {
    console.error("Error filtering recipes:", error);
    throw error;
  } finally {
    await closeMongoConnection();
  }
}