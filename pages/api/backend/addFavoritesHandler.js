import { addFavoritesFromMongoDB } from "../mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { recipe } = req.body;
    try {
      await addFavoritesFromMongoDB(recipe);
      res.status(200).json({ message: 'success' });
    } catch (error) {
      res.status(500).json({ message: 'not working', error });
    }
  }
}





