
import React from 'react'
import Image from 'next/image';
import { Recipe as RecipeType } from "@/types/types"

interface RecipeProps {
recipe: RecipeType
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {

    return (
        <div className="">
            <h2 
            className='text-xl font-semibold'
            >{recipe.label}</h2>
            <Image 
                className='object-cover w-full h-56 rounded-lg lg:w-64'
                width={200} 
                height={200} 
                src={recipe.image} 
                alt={recipe.label} />
            
            <h3>Ingredients:</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.text}</li>
                ))}
            </ul>
            
            {/* <h3>Instructions:</h3>
            <p>{recipe.instructions}</p> */}
            <a 
            href={recipe.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className='text-lg font-bold text-gray-600 hover:underline '
            >View Recipe</a>
        </div>

    )
}


export default Recipe