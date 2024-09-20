"use client"

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ChefHat } from 'lucide-react'

// dynamically import framer-motion
const MotionButton = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false })
const AnimatePresence = dynamic(() => import('framer-motion').then(mod => mod.AnimatePresence), { ssr: false })

function ScrollToTop() {

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)

        return () => window.removeEventListener('scroll', toggleVisibility)
    },[])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

  return (
    <AnimatePresence>
        {isVisible && (
            <MotionButton
                className='fixed bottom-5 right-5 bg-primary text-primary-foreground p-3 rounded-full shadow-lg'
                onClick={scrollToTop}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ChefHat className='w-6 h-6' />
            </MotionButton>
        )}
    </AnimatePresence>
  )
}

export default ScrollToTop
