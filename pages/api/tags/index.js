import { getTags } from "@/database/filterModule";
import { connectToMongo } from "../mongodb";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      
      const client = await connectToMongo();
      const tags = await getTags(client);

      res.status(200).json(tags);
    } catch (error) {
      console.error('Error in API route:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end();
  }
};
