import { RemoveFavoriteFromDB } from '../../../database/favoritesModule';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { recipeId } = req.body;
    try {
      await RemoveFavoriteFromDB(recipeId);
      res.status(200).json({ message: 'Successfully removed from favorites.' });
    } catch (error) {
      console.error('Error removing favorite:', error);
      res.status(500).json({ message: 'Failed to remove from favorites.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
