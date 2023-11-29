import { addFavoritesFromMongoDB } from '../../../database/favoritesModule';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { recipe } = req.body;

    try {
      if (!recipe) {
        throw new Error('Invalid request body. Missing "recipe" property.');
      }

      await addFavoritesFromMongoDB(recipe);

      res.status(200).json({ success: true, message: 'Added to favorites' });
    } catch (error) {
      console.error('Error adding to favorites:', error.message);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
