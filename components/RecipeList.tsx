import React from "react";
import { Recipe as RecipeType } from "@/types/types";
import Recipe from "./Recipe";



interface RecipeListProps {
  recipes: RecipeType[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {recipes.map((recipe, index) => (
        // check if recipe is valid and has id
        recipe && recipe.id ? (
          <Recipe key={recipe.id} recipe={recipe} />
        ) : (
          <div key={index}>
            {recipe && recipe.label ? `Invalid recipe data: ${recipe.label}` : `Invalid recipe data `}
          </div>
        )
      ))}
    </div>
  )
};

export default RecipeList;
