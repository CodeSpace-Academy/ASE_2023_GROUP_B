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

// Define a helper function to connect and handle errors
async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

// Define a helper function to close the connection
async function closeMongoConnection() {
  try {
    await client.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Failed to close MongoDB connection:", error);
  }
}

export async function run(page) {
  try {
    await connectToMongo();
    const db = client.db("devdb");
    await db.command({ ping: 1 });
    const collection = db.collection("recipes");
    const skip = (page - 1) * 100;
    const data = await collection.find({}).skip(skip).limit(100).toArray();
    return data;
  } catch (error) {
    console.error("Failed to fetch data from MongoDB:", error);
    return [];
  } finally {
    await closeMongoConnection();
  }
}

export async function run1() {
  try {
    await connectToMongo();
    const db = client.db("devdb");
    await db.command({ ping: 1 });
    const collection = db.collection("allergens");
    const data = await collection.find({}).toArray();
    const dataArray = data.map((doc) => doc.allergens);
    return dataArray;
  } catch (error) {
    console.error("Failed to fetch data from MongoDB:", error);
    return [];
  } finally {
    await closeMongoConnection();
  }
}

export async function getRecipeById(id) {
  try {
    await connectToMongo();
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
