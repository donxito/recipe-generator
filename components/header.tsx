"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const titles = [
  "NextBite",
  "TailwindTastes",
  "ShadcnSavor",
  "ReactoRecipe",
  "DevDish",
  "CodedCuisine",
  "StackSnack",
  "ByteBite",
  "QueryCuisine"
]

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-2xl font-bold tracking-tight hover:text-yellow-300 transition duration-300">
            NextBite
          </Link>
        </motion.div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Button variant="ghost" asChild>
                <Link href="/favorites">Favorites</Link>
              </Button>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button variant="ghost" asChild>
                <Link href="/about">About</Link>
              </Button>
            </motion.li>
          </ul>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col space-y-4 mt-6">
              <Link href="/favorites" className="text-lg font-medium">
                Favorites
              </Link>
              <Link href="/about" className="text-lg font-medium">
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Header