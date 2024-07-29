"use client"

import { useState } from 'react';
import fetchRecipes from '../lib/fetchRecipes';
import Recipe from '../components/Recipe';
import { Recipe as RecipeType } from '@/types/types';
import SearchBar from '@/components/SearchBar';


const RecipePage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchRecipes(query);
      setRecipes(results);
    } catch (error) {
      setError('Error fetching recipes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white">
      <SearchBar query={query} setQuery={setQuery} searchRecipes={searchRecipes} />

      {loading && <p>Loading...</p>}

      {error && <p>P{error}</p>}

      <div className='container px-6 py-10 mx-auto'>
        <div className='grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2'>
        {recipes.map((recipe, index) => (
          <Recipe key={index} recipe={recipe} />
        ))}

        </div>
      </div>
 
    </section>
  );
};

export default RecipePage;