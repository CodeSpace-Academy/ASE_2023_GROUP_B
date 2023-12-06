import { filteringByTags } from "@/database/filterModule";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
 
  const { selectedTags } = req.body;
  console.log(selectedTags)

  try {
    
    const filterTagsResult = await filteringByTags(
      selectedTags
    );
    console.log(filterTagsResult)
    res.status(200).json({ recipes: filterTagsResult });
    
  }  catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;