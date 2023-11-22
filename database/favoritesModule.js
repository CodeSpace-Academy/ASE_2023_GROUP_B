import { connectToMongo, getClient } from '../pages/api/mongodb';

async function connectToCollection(database, collection) {
  try {
    await connectToMongo();
    const db = getClient().db(database);
    const col = db.collection(collection);
    return col;
  } catch (error) {
    console.error('Failed to connect to collection:', error);
    throw error;
  }
}

export async function AddFavoriteToMongoDB(recipe) {
  try {
    const db = await connectToCollection('devdb', 'favorites');
    const existingFavorite = await db.findOne({
      _id: recipe._id,
    });
    if (existingFavorite) {
      console.log('Favorite already exists.');
      return;
    } else {
      await db.insertOne({ _id: recipe._id, recipe });
      console.log('Favorite added to MongoDB.');
    }
  } catch (error) {
    console.error('Error adding favorite to MongoDB:', error);
    throw error;
  }
}

export async function addFavoritesFromMongoDB(recipe) {
  try {
    const db = await connectToMongo();
    await db.db('devdb').collection('favorites').insertOne(recipe);
  } catch (error) {
    console.error('Error adding favorite from MongoDB:', error);
    throw error;
  }
}

export async function getFavoritesFromMongoDB() {
  try {
    const db = await connectToMongo();
    const favs = await db.db('devdb').collection('favorites').find().toArray();
    return favs;
  } catch (error) {
    console.error('Error getting favorites from MongoDB:', error);
    throw error;
  }
}

export async function RemoveFavoriteFromDB(recipeId) {
  try {
    const favoritesCollection = await connectToCollection('devdb', 'favorites');
    const deleteResult = await favoritesCollection.deleteOne({ _id: recipeId });
    return deleteResult;
  } catch (error) {
    console.error('Error removing favorite from MongoDB:', error);
    throw error;
  }
}

export async function getFavoritesCount() {
  try {
    const db = await connectToMongo();
    const count = await db.db('devdb').collection('favorites').countDocuments();
    return count;
  } catch (error) {
    console.error('Error getting favorite count from MongoDB:', error);
    throw error;
  }
}
