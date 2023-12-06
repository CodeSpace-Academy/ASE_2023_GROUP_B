import { buildPipeline } from "@/helpers/buildPipeline";
import { connectToMongo, closeMongoConnection, getClient } from "../pages/api/mongodb";

export async function getRecipes(page, sort) {
  await connectToMongo();
  const client = getClient();

  try {
    const db = client.db("devdb");
    await db.command({ ping: 1 });
    const collection = db.collection("recipes");

    const filters = {}; 
    const search = ''; 
    
    const pipeline = buildPipeline(filters, search, sort);
    const skip = (page - 1) * 100;
    const data = await collection.aggregate(pipeline).skip(skip).limit(100).toArray();
    

    return data;
  } catch (error) {
    console.error("Failed to fetch data from MongoDB:", error);
    return [];
  } finally {
    await closeMongoConnection();
  }
}

export async function getRecipeById(id) {
  await connectToMongo();
  const client = getClient();

  try {
    const db = client.db("devdb");
    const collection = db.collection("recipes");
    const result = await collection.findOne({ _id: id });
    return result;
  } catch (error) {
    console.error("Failed to fetch data from MongoDB:", error);
    return null;
  } finally {
    await closeMongoConnection();
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