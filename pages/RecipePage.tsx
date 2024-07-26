"use client"

import { useState } from 'react';
import fetchRecipes from '../lib/fetchRecipes';
import Recipe from '../components/Recipe';
import { Recipe as RecipeType } from '@/types/types';


// interface Recipe {
//   label: string;
//   image: string;
//   source: string;
//   url: string;
//   ingredients: {
//     text: string;
//     quantity: number;
//     measure: string;
//     food: string;
//     weight: number;
//     foodCategory: string;
//     foodId: string;
//     image: string;
// }[];
//   instructions: string;
// }

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
    <div className=''>
      <h1>Recipe Generator</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter ingredients"
      />
      <button onClick={searchRecipes}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      <div>
        {recipes.map((recipe, index) => (
          <Recipe key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipePage;