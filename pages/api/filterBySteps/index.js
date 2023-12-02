// pages/api/filterBySteps.js
import { filteringByNumberOfSteps } from "@/database/filterModule";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { numOfSteps } = req.body;

  try {
    if (typeof numOfSteps === 'undefined') {
      throw new Error('numOfSteps is not provided in the request body');
    }
  
    const filterStepsResult = await filteringByNumberOfSteps(numOfSteps);
    res.status(200).json({ recipes: filterStepsResult });
  } catch (error) {
    console.error("Error filtering recipes by steps:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
