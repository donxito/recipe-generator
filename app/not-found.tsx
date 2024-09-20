'use client'

import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// dynamically import framer-motion
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false })

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">404 - Recipe Not Found</h1>
      <div className="text-9xl mb-8">🍳</div>
      <p className="text-xl mb-8 text-center">
        Oops! This recipe seems to have burned. Let&apos;s go back to the kitchen!
      </p>
      <MotionDiv
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link href="/" className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold">
          Back to Home
        </Link>
      </MotionDiv>
    </div>
  )
}

export default NotFound
