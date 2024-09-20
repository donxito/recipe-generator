import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react'

function AnimatedFoodIcon() {

    const foods = ["🍔", "🍕", "🍣", "🍜", "🍰", "🍎"];

    const [currentFoodIndex, setCurrentFoodIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFoodIndex((prev) => (prev + 1) % foods.length);
        }, 2000);

        return () => clearInterval(interval);
    },[foods.length])

        

  return (
    <AnimatePresence mode='wait'>
        <motion.span
        key={foods[currentFoodIndex]}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className='text-3xl mr-2'
        >
      {foods[currentFoodIndex]}
    </motion.span>
    </AnimatePresence>
  )
}

export default AnimatedFoodIcon
