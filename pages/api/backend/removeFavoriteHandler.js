import { RemoveFavoriteFromDB } from '../../../database/favoritesModule';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { recipeId } = req.body;
    try {
      await RemoveFavoriteFromDB(recipeId);
      res.status(200).json({ message: 'success' });
    } catch (error) {
      res.status(500).json({ message: 'not working', error });
    }
  }
}
