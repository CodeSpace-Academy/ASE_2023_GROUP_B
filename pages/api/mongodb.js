import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
let client;

async function connectToMongo() {
  if (client && client.connected) {
    return client;
  }

  const connectionString = process.env.MONGODB_CONNECTION_STRING;
  client = new MongoClient(connectionString, {
    maxIdleTimeMS: 500,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

async function closeMongoConnection() {
  try {
    if (client && client.connected) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  } catch (error) {
    console.error('Failed to close MongoDB connection:', error);
  }
}

function getClient() {
  return client;
}
export { connectToMongo, closeMongoConnection, getClient };

export { connectToMongo, closeMongoConnection, getClient };