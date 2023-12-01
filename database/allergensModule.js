import { connectToMongo, closeMongoConnection, getClient } from "../pages/api/mongodb";

export async function getAllergens() {
  await connectToMongo();
  const client = getClient();

  try {
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
