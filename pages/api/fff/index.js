import { filteringByIngredient } from "@/database/filterModule";
import { getClient } from "../mongodb";


const handler = async (req, res) => {
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
 
  const { selectedIngredients } = req.body;
  console.log(selectedIngredients)
  try {
    const client = getClient()
    const filterIngredientsResult = await filteringByIngredient(
      selectedIngredients
    );
    console.log(filterIngredientsResult)
    res.status(200).json({ recipes: filterIngredientsResult });
    
  }  catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;