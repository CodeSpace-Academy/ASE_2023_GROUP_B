import { getCategories } from "@/database/filterModule";
import { connectToMongo } from "../mongodb";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const client = await connectToMongo();

      const categories = await getCategories(client);

      res.status(200).json(categories);
    } catch (error) {
      console.error('Error in API route:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end();
  }
};
