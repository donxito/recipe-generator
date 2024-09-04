import axios from "axios"
import { Recipe } from "@/types/types"
import { generateRecipeId } from "./utils"
import { v4 as uuidv4 } from 'uuid';


// interface Recipe {
//     label: string;
//     image: string;
//     source: string;
//     url: string;
//     ingredients: string[];
//     instructions: string;
//   }

interface FetchRecipesResponse {
  hits: { recipe: Recipe }[]
}

const fetchRecipes = async (query: string): Promise<Recipe[]> => {
    const appId = process.env.NEXT_PUBLIC_EDAMAM_APP_ID;
    const appKey = process.env.NEXT_PUBLIC_EDAMAM_APP_KEY;
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}`;

    try {
        const response = await axios.get<FetchRecipesResponse>(url);
        return response.data.hits.map(hit => ({
            ...hit.recipe,
            id: uuidv4()
        }));

    } catch (error) {
        console.error("Error fetching recipes:", error) 
        return []
    }
}

export default fetchRecipes;