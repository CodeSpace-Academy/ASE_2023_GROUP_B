import { getIngredients, } from "@/database/filterModule";
import { getClient } from "../mongodb";

export default async (req, res) => {
 
  if (req.method === "GET") {
    const client = getClient()
    const ingredients = await getIngredients(client);

    res.status(200).json(ingredients);
  } else {
    res.status(405).end();
  }
};