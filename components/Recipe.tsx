"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Recipe as RecipeType } from "@/types/types"
import dynamic from "next/dynamic"
import FavoriteButton from "./FavoriteButton"
import SafeImage from "./SafeImage"
import { ExternalLink } from "lucide-react"

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false })

interface RecipeProps {
  recipe: RecipeType,
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold truncate">{recipe.label}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col space-y-4">
          <div className="relative pb-[56.25%]">
            <SafeImage
              src={recipe.image}
              alt={recipe.label}
              fallbackSrc="/placeholder-image.jpg"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <ScrollArea className="flex-grow h-32">
            <h4 className="font-medium mb-2">Ingredients:</h4>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm mb-1">{ingredient.text}</li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-between items-center pt-4">
          <Button variant="outline" asChild className="flex-grow mr-2">
            <a href={recipe.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full Recipe
            </a>
          </Button>
          <FavoriteButton recipe={recipe} />
        </CardFooter>
      </Card>
    </MotionDiv>
  )
}

export default Recipe