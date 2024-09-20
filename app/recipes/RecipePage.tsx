"use client";

import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import fetchRecipes from "../../lib/fetchRecipes";
import { Recipe as RecipeType } from "@/types/types";
import SearchBar from "@/components/SearchBar";
import RecipeList from "@/components/RecipeList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import LoadingContainer from "@/components/LoadingContainer";

const RecipePage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const searchRecipes = async () => {
    setLoading(true);
    setError(null);
    setPage(0);
    try {
      const results = await fetchRecipes(query, 0);
      setRecipes(results);
      setHasMore(results.length > 0);
    } catch (error) {
      setError("Error fetching recipes");
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreRecipes = async () => {
    if (!hasMore) return;

    try {
      const nextPage = page + 1;
      const results = await fetchRecipes(query, nextPage);
      setRecipes(prevRecipes => [...prevRecipes, ...results]);
      setPage(nextPage);
      setHasMore(results.length > 0);
    } catch (error) {
      setError("Error fetching more recipes");
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

      <LoadingContainer isLoading={loading}>
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
          {hasMore && !loading && (
            <div className="flex justify-center my-8">
              <Button onClick={fetchMoreRecipes}>Load More</Button>
            </div>
          )}
        </ErrorBoundary>
      </LoadingContainer>
    </div>
  );
};

export default RecipePage;