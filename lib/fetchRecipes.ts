import axios from "axios"
import { Recipe } from "@/types/types"
import { generateRecipeId } from "./utils"
import { v4 as uuidv4 } from 'uuid';


interface FetchRecipesResponse {
  hits: { recipe: Recipe }[]
}

const fetchRecipes = async (query: string, page: number = 0, pageSize: number = 10): Promise<Recipe[]> => {

    const appId = process.env.NEXT_PUBLIC_EDAMAM_APP_ID;
    const appKey = process.env.NEXT_PUBLIC_EDAMAM_APP_KEY;
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}`;

    try {
        const response = await axios.get<FetchRecipesResponse>(url);
        return response.data.hits.map(hit => ({
            ...hit.recipe,
            id: uuidv4(),
            image: hit.recipe.image || "/placeholder.jpg",
        }));

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error fetching recipes:", error.response?.status, error.response?.data);
          } else {
            console.error("Error fetching recipes:", error);
          }
          throw error; // Re-throw the error to be handled by the calling function
        }
      }
export default fetchRecipes;