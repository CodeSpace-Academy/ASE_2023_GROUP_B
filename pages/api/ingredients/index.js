import { getIngredients } from "@/database/filterModule";
import { connectToMongo } from "../mongodb";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      // Ensure MongoDB connection is established
      const client = await connectToMongo();

      // Use the MongoDB client to access the collection
      const ingredients = await getIngredients(client);

      res.status(200).json(ingredients);
    } catch (error) {
      console.error('Error in API route:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end();
  }
};
