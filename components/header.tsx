"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-2xl font-bold tracking-tight hover:text-yellow-300 transition duration-300">
            Recipe Generator
          </Link>
        </motion.div>
        <nav>
          <ul className="flex space-x-6">
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/favorites" className="hover:text-yellow-300 transition duration-300">Favorites</Link>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/about" className="hover:text-yellow-300 transition duration-300">About</Link>
            </motion.li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
