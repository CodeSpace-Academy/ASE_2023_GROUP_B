import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGODB_CONNECTION_STRING;

const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function fetchRecipes(req, res) {
  try {
    await client.connect();

    if (req.method === 'GET') {
      try {
        const db = client.db('devdb');

        const documents = await db
          .collection('recipes')
          .find()
          .skip(20)
          .limit(100)
          .sort()
          .toArray();

        res.status(200).json({ comments: documents });
      } catch (error) {
        res.status(500).json({ message: 'Getting recipes failed.' });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to connect!" });
  } finally {
    await client.close();
  }
}

export default fetchRecipes;