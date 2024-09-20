"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { last } from "lodash"

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchRecipes: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const commonIngredients = [
  "tomato", "onion", "garlic", "chicken", "beef", "pasta", "rice", "potato",
  "carrot", "broccoli", "spinach", "cheese", "egg", "milk", "bread", "olive oil"
];

function SearchBar({ query, setQuery, searchRecipes, handleKeyDown }: SearchBarProps) {

  const [suggestions, setSuggestions] = useState<string[]>([])

  // Autocomplete suggestions for the last ingredient in the query
  useEffect(() => {
    const lastIngredient = query.split(',').pop()?.trim().toLowerCase() || "";
    if (lastIngredient.length > 1) {
      const filtered = commonIngredients.filter(ingredient => 
        ingredient.toLowerCase().startsWith(lastIngredient)
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([])
    }
  },[query])



  // Add the selected suggestion to the query and clear the suggestions
  const handleSuggestionClick = (suggestion: string) => {
    const ingredients = query.split(',').map(ingredient => ingredient.trim());
    ingredients.pop();
    ingredients.push(suggestion);
    setQuery(ingredients.join(', '));
    setSuggestions([])
  }


  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto mt-8 mb-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter ingredients (e.g: 'pepper, garlic, celery, onion, tomato')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-20 text-white placeholder:text-gray-300"
        />
        <Button
          onClick={searchRecipes}
          className="absolute right-0 top-0 h-full rounded-l-none"
        >
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 w-full bg-background border border-input rounded-md mt-1 shadow-lg"
            >
              {suggestions.map((suggestion, index) => (
                <motion.li
                  key={suggestion}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-accent cursor-pointer"
                >
                  {suggestion}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <p className="text-sm text-muted-foreground mt-2 text-center text-white">
        Try searching for multiple ingredients separated by commas
      </p>
    </motion.div>
  );
}

export default SearchBar;