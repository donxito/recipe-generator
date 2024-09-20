"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

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
  const [suggestions, setSuggestions] = useState<string[]>([]);

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
  }, [query])

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
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex">
          <Input
            type="text"
            placeholder="Enter ingredients (e.g: pepper, garlic, celery)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow pr-20 border-none focus:ring-0 text-gray-800 placeholder:text-gray-400"
          />
          <Button
            onClick={searchRecipes}
            className="absolute right-0 top-0 h-full rounded-l-none bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </motion.div>
          </Button>
        </div>
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 w-full bg-white border-t border-gray-200 rounded-b-md shadow-lg"
            >
              {suggestions.map((suggestion, index) => (
                <motion.li
                  key={suggestion}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                >
                  {suggestion}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <p className="text-sm text-white mt-2 text-center">
        Try searching for multiple ingredients separated by commas
      </p>
    </motion.div>
  );
}

export default SearchBar;