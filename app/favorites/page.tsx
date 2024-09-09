/* eslint-disable react/no-unescaped-entities */

"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import RecipeList from '@/components/RecipeList'
import { Recipe } from '@/types/types'

function Favorites() {

    const [favoriteRecipes, setFavoriteRecipes ] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchFavorites() {
            const { data: { user } } =  await supabase.auth.getUser()

            if (!user) {
                return <div>Please log in to view your favorites</div>
            }

            const { data: favorites, error } = await supabase
                .from('favorites')
                .select('recipe_data')
                .eq('user_id', user.id)

            if (error) {
                console.error('Error fetching favorites:', error)
    
            } else {
                setFavoriteRecipes(favorites.map((favorite) => favorite.recipe_data))
            }
            setLoading(false)
        }

        fetchFavorites()


    },[])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!favoriteRecipes.length) {
        return <div>You haven't added any favorite recipes yet</div>
    }


  return (

    <div>
        <h1 className='text-2xl font-bold mb-4'>Favorite Recipes</h1>
        <RecipeList recipes={favoriteRecipes} />
    </div>
  )
}

export default Favorites