import { filteringByCategories } from "@/database/filterModule";
import { getClient } from "../mongodb";

const handler = async (req, res) => {
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
 
  const { selectedCategories } = req.body;
  console.log(selectedCategories)
  try {
    const client = getClient()
    const filterCategoriesResult = await filteringByCategories(
      selectedCategories
    );
    console.log(filterCategoriesResult)
    res.status(200).json({ recipes: filterCategoriesResult });
    
  }  catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;