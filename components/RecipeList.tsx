import React from "react";
import Masonry from "react-masonry-css";
import { Recipe as RecipeType } from "@/types/types";
import Recipe from "./Recipe";

const masonryStyles = `
.my-masonry-grid {
  display: flex;
  margin-left: -16px; /* gutter size offset */
  width: auto;
}
.my-masonry-grid_column {
  padding-left: 16px; /* gutter size */
  background-clip: padding-box;
}
.my-masonry-grid_column > div {
  margin-bottom: 16px;
}
`;

interface RecipeListProps {
  recipes: RecipeType[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      <style>{masonryStyles}</style>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {recipes.map((recipe, index) =>
          recipe && recipe.id ? (
            <Recipe key={recipe.id} recipe={recipe} />
          ) : (
            <div key={index}>Invalid recipe data</div>
          )
        )}
      </Masonry>
    </>
  );
};

export default RecipeList;
