"use client"

import React from "react"
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchRecipes: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

function SearchBar({ query, setQuery, searchRecipes, handleKeyDown }: SearchBarProps) {
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
          className="pr-20"
        />
        <Button
          onClick={searchRecipes}
          className="absolute right-0 top-0 h-full rounded-l-none"
        >
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-2 text-center">
        Try searching for multiple ingredients separated by commas
      </p>
    </motion.div>
  );
}

export default SearchBar;