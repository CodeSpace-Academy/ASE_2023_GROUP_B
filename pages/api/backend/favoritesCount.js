import { getFavoritesCount } from '../../../database/favoritesModule';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const count = await getFavoritesCount();
      res.status(200).json({ count });
    } catch (error) {
      console.error('Error fetching favorite count:', error);
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
