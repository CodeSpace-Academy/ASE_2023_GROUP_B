import { getRecipes } from '../../database/recipesModule';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { page, sort } = req.query;

    try {
      const data = await getRecipes(page, sort);
      res.status(200).json(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end();
  }
}
