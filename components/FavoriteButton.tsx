import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { Recipe } from '@/types/types'
import { motion, AnimatePresence } from 'framer-motion'

interface FavoriteButtonProps {
  recipe: Recipe
}

function FavoriteButton({ recipe }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
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
          .eq('recipe_id', recipe.id)
          .single()
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error checking favorite status:', error)
        } else {
          setIsFavorite(!!data)
        }
      }
    }
    checkAuth()
  }, [recipe.id])

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

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1000)

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
          .eq('recipe_id', recipe.id)
        
        if (error) throw error
        setIsFavorite(false)
        toast({
          title: "Removed from favorites",
          description: "The recipe has been removed from your favorites",
        })
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({ 
            user_id: user.id, 
            recipe_id: recipe.id,
            recipe_data: recipe
          })
        
        if (error) throw error
        setIsFavorite(true)
        toast({
          title: "Added to favorites",
          description: "The recipe has been added to your favorites",
        })
      }
      router.refresh()
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      })
    }
  }

  const heartVariants = {
    inactive: { scale: 1 },
    active: { scale: 1.2 },
  }

  const burstVariants = {
    inactive: { scale: 0, opacity: 0 },
    active: {
      scale: [0, 1.5, 0],
      opacity: [0, 1, 0],
      transition: { duration: 0.5 }
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleFavorite}
      aria-label={isLoggedIn ? (isFavorite ? "Remove from favorites" : "Add to favorites") : "Login to favorite"}
      className="relative"
    >
      <motion.div
        variants={heartVariants}
        animate={isAnimating ? "active" : "inactive"}
      >
        <Heart className={`h-4 w-4 ${isFavorite && isLoggedIn ? "fill-current text-red-500" : ""}`} />
      </motion.div>
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            variants={burstVariants}
            initial="inactive"
            animate="active"
            exit="inactive"
          >
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 w-1 h-1 bg-red-500 rounded-full"
                style={{
                  rotate: index * 60,
                  originY: "50%",
                  top: "50%",
                }}
                animate={{
                  scaleY: [0, 2, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  )
}

export default FavoriteButton