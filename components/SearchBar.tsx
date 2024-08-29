import React from "react";
import { motion } from 'framer-motion';

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchRecipes: () => void;
}

function SearchBar({ query, setQuery, searchRecipes }: SearchBarProps) {
  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto mt-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Enter ingredients (e.g: 'potatoes, garlic, celery')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-5 py-3 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition duration-300"
        />
        <button
          onClick={searchRecipes}
          className="absolute right-2 top-2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Try searching for multiple ingredients separated by commas
      </p>
    </motion.div>
  );
}

export default SearchBar;
