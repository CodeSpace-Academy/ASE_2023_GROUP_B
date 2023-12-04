import { connectToMongo, getClient } from '../../../database/favoritesModule';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Connect to MongoDB
      await connectToMongo();

      const favoritesCollection = getClient()
        .db('devdb')
        .collection('favorites');

      // Fetch all favorite recipes
      const favorites = await favoritesCollection.find().toArray();

      res.status(200).json(favorites);
    } catch (error) {
      console.error('Error fetching favorites from MongoDB:', error);
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
