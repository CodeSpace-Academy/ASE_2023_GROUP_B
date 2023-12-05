import { searching } from "@/database/filterModule";
import { getClient } from "../mongodb";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { search } = req.body;
  try {
    const client = getClient()
    const searchResult = await searching(search);
    // console.log(searchResult)
    res.status(200).json({ recipes: searchResult });
  } catch (error) {
    console.error("Error searching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;