"use client";

import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import fetchRecipes from "../lib/fetchRecipes";
import { Recipe as RecipeType } from "@/types/types";
import SearchBar from "@/components/SearchBar";
import RecipeList from "@/components/RecipeList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const RecipePage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchRecipes(query);
      setRecipes(results);
    } catch (error) {
      setError("Error fetching recipes");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchRecipes();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar
        query={query}
        setQuery={setQuery}
        searchRecipes={searchRecipes}
        handleKeyDown={handleKeyDown}
      />

      {loading && (
        <div className="flex justify-center my-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="my-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <ErrorBoundary
        fallback={
          <Alert variant="destructive" className="my-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong</AlertDescription>
          </Alert>
        }
      >
        {recipes.length > 0 && <RecipeList recipes={recipes} />}
      </ErrorBoundary>
    </div>
  );
};

export default RecipePage;