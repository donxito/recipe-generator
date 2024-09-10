"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Recipe as RecipeType } from "@/types/types"
import { motion } from "framer-motion"
import FavoriteButton from "./FavoriteButton"
import SafeImage from "./SafeImage"

interface RecipeProps {
  recipe: RecipeType,
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-semibold truncate">{recipe.label}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <div className="relative pb-[56.25%] mb-4">
            <SafeImage
              src={recipe.image}
              alt={recipe.label}
              fallbackSrc="/placeholder-image.jpg"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <ScrollArea className="flex-grow h-40 mb-4">
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm mb-1">{ingredient.text}</li>
              ))}
            </ul>
          </ScrollArea>
          <div className="flex justify-between items-center mt-auto">
            <Button variant="outline" asChild>
              <a href={recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
            </Button>
            <FavoriteButton recipe={recipe} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Recipe