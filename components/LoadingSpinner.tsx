import React from 'react'
import { motion } from 'framer-motion'

function LoadingSpinner() {

    const utensils = ['🍴', '🥄', '🍽️', '🥢'];


  return (
    <div className='flex justify-center items-center h-40'>
      {utensils.map((utensil, index) => (
        <motion.div 
            key={index} 
            className='text-4xl mx-2'
            animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1],
             }}
            transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
             }}
        >
          {utensil}
        </motion.div>
      ))}
    </div>
  )
}

export default LoadingSpinner
