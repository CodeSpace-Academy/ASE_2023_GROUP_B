import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
let client;

export async function connectToMongo() {
  const connectionString = process.env.MONGODB_CONNECTION_STRING;
  client = new MongoClient(connectionString, {
    maxIdleTimeMS: 500,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  // Define a helper function to connect and handle errors
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

// Define a helper function to close the connection
export async function closeMongoConnection() {
  try {
    // await client.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Failed to close MongoDB connection:", error);
  }
}

export function getClient() {
  return client;
}

export async function AddFavoriteToMongoDB(recipe) {
  try {
     const db = client.db('devdb');
     await db.command({ ping: 1 });
    const favoritesCollection = db.collection('favorites');
    const existingFavorite = await favoritesCollection.findOne({
      _id: recipe._id,
    });
    if (existingFavorite) {
      console.log('Favorite already exists.');
      return;
    } else {
      await favoritesCollection.insertOne({ _id: recipe._id, recipe });
      console.log('Favorite added to MongoDB.');
    }
  } catch (error) {
    console.error('Error adding favorite to MongoDB:', error);
    throw error;
  }
};

export async function RemoveFavoriteFromDB(recipeId) {
  try {
    const favoritesCollection = await connectToCollection('devdb', 'favorites');
    const deleteResult = await favoritesCollection.deleteOne({ _id: recipeId });
    return deleteResult;
  } catch (err) {}
};

export async function addFavoriteToMongoDBToo(title) {
  const db = client.db('devdb');
  await db.collection('favorites').insertOne({
    recipe: title,
  });
};

export const connectToMongoToo = new MongoClient(
  'mongodb+srv://groupb:siGyDb5l6UAMEEgD@groupb.xmhz5up.mongodb.net/?retryWrites=true&w=majority',
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

export async function addFavoritesFromMongoDB(recipe) {
  const db = connectToMongoToo.db('devdb')
  await db.collection('favorites').insertOne(recipe)
};

export async function getFavoritesFromMongoDB() {
  const db = connectToMongoToo.db('devdb');
  const favs = await db
    .collection('favorites')
    .find()
    .toArray();
  return favs;
}