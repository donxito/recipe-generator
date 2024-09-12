"use client"

import React, { useEffect, useState} from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, LogOut, LogIn } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'


function Header() {

  const { data: session} = useSession()

  const [isClient, setIsClient] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAuthAction = () => {
    if (session) {
      signOut()
    } else {
      router.push("/signin")
    }
  }

  const AuthButton = () => (
    <Button variant="ghost" onClick={handleAuthAction} className='flex items-center'>
      {session ? (
        <>
          <LogOut className='mr-2 h-4 w-4' />
          Logout
        </>
      ) : (
        <>
          <LogIn className='mr-2 h-4 w-4' />
          Login
        </>
      )}
    </Button>
  )

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
        
        <div className="flex items-center space-x-4">
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <NavItem href="/favorites" label="Favorites" />
            <NavItem href="/about" label="About" />
            {isClient && <li><AuthButton /></li>}
          </ul>
        </nav>
        <ThemeToggle />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col space-y-4 mt-8">
              <NavItem href="/favorites" label="Favorites" />
              <NavItem href="/about" label="About" />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button variant="ghost" asChild>
      <Link href={href} className="hover:text-yellow-300 transition duration-300">
        {label}
      </Link>
      </Button>
    </motion.li>
  )
}

export default Header