import React, { useState, useEffect } from 'react'
import { Heart } from "lucide-react"
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'
import { supabase } from "@/lib/supabase"
import { useRouter } from 'next/navigation'

interface FavoriteButtonProps {
    recipeId: string
}

function FavoriteButton({ recipeId }: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setIsLoggedIn(!!user)
            if (user) {
                const { data, error } = await supabase
                    .from('favorites')
                    .select()
                    .eq('user_id', user.id)
                    .eq('recipe_id', recipeId)
                    .single()
                
                if (error && error.code !== 'PGRST116') {
                    console.error('Error checking favorite status:', error)
                } else {
                    setIsFavorite(!!data)
                }
            }
        }
        checkAuth()
    }, [recipeId])

    const toggleFavorite = async () => {
        if (!isLoggedIn) {
            toast({
                title: "Authentication Required",
                description: "Please log in to favorite recipes",
                variant: "destructive",
            })
            router.push('/login')
            return
        }

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                throw new Error('User not authenticated')
            }

            if (isFavorite) {
                const { error } = await supabase
                    .from('favorites')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('recipe_id', recipeId)
                
                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('favorites')
                    .insert({ user_id: user.id, recipe_id: recipeId })
                
                if (error) throw error
            }

            setIsFavorite(!isFavorite)
            toast({
                title: isFavorite ? "Removed from favorites" : "Added to favorites",
                description: isFavorite ? "The recipe has been removed from your favorites" : "The recipe has been added to your favorites",
            })
        } catch (error) {
            console.error('Error toggling favorite:', error)
            toast({
                title: "Error",
                description: "Failed to update favorites",
                variant: "destructive",
            })
        }
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleFavorite}
            aria-label={isLoggedIn ? (isFavorite ? "Remove from favorites" : "Add to favorites") : "Login to favorite"}
        >
            <Heart className={`h-4 w-4 ${isFavorite && isLoggedIn ? "fill-current text-red-500" : ""}`} />
        </Button>
    )
}

export default FavoriteButton