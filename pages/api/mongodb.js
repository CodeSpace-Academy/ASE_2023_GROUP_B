import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGODB_CONNECTION_STRING;

const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function run(page) {
  try {
    await client.connect();

    const db = client.db("devdb");
    await client.db("devdb").command({ ping: 1 });
    const collection = db.collection("recipes");
    const skip = (page - 1) * 100;

    const data = await collection.find({}).skip(skip).limit(100).toArray();
    return data;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  } finally {
    await client.close();
  }
}

export async function run1() {
  try {
    await client.connect();

    const db = client.db("devdb");
    await client.db("devdb").command({ ping: 1 });
    const collection = db.collection("allergens");

    const data = await collection.find({}).toArray();
    const dataArray = data.map((doc) => doc.allergens);

    return dataArray;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  } finally {
    await client.close();
  }
}

export async function getRecipeById(id) {
  await client.connect();
  const db = client.db("devdb");

  const collection = db.collection("recipes");
  return collection.findOne({ _id: id });
}