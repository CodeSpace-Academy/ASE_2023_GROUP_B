import { filteringByInstructions } from "@/database/filterModule";


const handler = async (req, res) => {
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
 
  const { selectedInstructions } = req.body;
  console.log(selectedInstructions)
  try {
    const filterInstructionsResult = await filteringByInstructions(
      selectedInstructions
    );
    console.log(filterInstructionsResult)
    res.status(200).json({ recipes: filterInstructionsResult });
    
  }  catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;