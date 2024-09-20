"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import RecipeList from "@/components/RecipeList";
import { Recipe } from "@/types/types";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import LoadingContainer from "@/components/LoadingContainer";
import { motion } from "framer-motion";
import { Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <LoadingContainer isLoading={loading}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center mb-8">
            <Heart className="w-8 h-8 text-red-500 mr-3" />
            <h1 className="text-3xl font-bold">Your Favorite Recipes</h1>
          </motion.div>

          {favoriteRecipes.length ? (
            <motion.div variants={itemVariants}>
              <RecipeList recipes={favoriteRecipes} />
            </motion.div>
          ) : (
            <motion.div 
              variants={itemVariants}
              className="text-center mt-8 p-8 bg-gray-100 rounded-lg shadow-inner"
            >
              <h2 className="text-2xl font-semibold mb-4">No Favorites Yet</h2>
              <p className="text-lg text-gray-600 mb-6">
                You haven&apos;t added any favorite recipes yet. Start exploring and save some delicious recipes!
              </p>
              <Button 
                onClick={() => router.push('/')}
                className="flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Discover Recipes
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </LoadingContainer>
  );
}

export default Favorites;