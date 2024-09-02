"use client"

import React from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Recipe as RecipeType } from "@/types/types"
import { motion } from "framer-motion"

interface RecipeProps {
  recipe: RecipeType
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm mx-auto"
    >
      <Card className="overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="relative h-48">
          <Image
            alt={recipe.label}
            src={recipe.image}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h3 className="text-white text-2xl font-bold text-center px-4 opacity-95">
              {recipe.label}
            </h3>
          </div>
        </div>
        <CardContent className="p-6">
          <CardTitle className="mb-4 text-xl">Ingredients:</CardTitle>
          <ScrollArea className="h-40 w-full rounded-md border">
            <ul className="p-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="py-2 border-b last:border-b-0">
                  {ingredient.text}
                </li>
              ))}
            </ul>
          </ScrollArea>
          <Button
            className="mt-6 w-full"
            asChild
          >
            <a
              href={recipe.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full Recipe
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Recipe