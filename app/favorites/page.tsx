"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import RecipeList from "@/components/RecipeList";
import { Recipe } from "@/types/types";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function Favorites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function fetchFavorites() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to view your favorites",
          variant: "destructive",
        });
        router.push('/login');
        return;
      }

      const { data: favorites, error } = await supabase
        .from("favorites")
        .select("recipe_data")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching favorites:", error);
        toast({
          title: "Error",
          description: "Failed to fetch favorites",
          variant: "destructive",
        });
      } else {
        const validRecipes = favorites
          .map((favorite) => favorite.recipe_data)
          .filter((recipe): recipe is Recipe => 
              recipe !== null && typeof recipe === "object" && 
              "label" in recipe && 
              "id" in recipe
          );
        setFavoriteRecipes(validRecipes);
      }
      setLoading(false);
    }

    fetchFavorites();
  }, [toast, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!favoriteRecipes.length) {
    return (
      <div className="text-center mt-8">
        <p className="text-lg text-gray-600">You haven&apos;t added any favorite recipes yet.</p>
        <p className="text-md text-gray-500 mt-2">Start exploring and save some recipes!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Favorite Recipes</h1>
      <RecipeList recipes={favoriteRecipes} />
    </div>
  );
}

export default Favorites;