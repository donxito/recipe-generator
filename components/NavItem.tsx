import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

function NavItem({ href, label, icon, isActive }: { href: string, label: string, icon: React.ReactNode, isActive: boolean }) {
  return (
    <li>
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative ${isActive ? "text-yellow-300" : ""}`}
    >
      <Link
        href={href}
        className="flex items-center text-sm font-medium transition-colors hover:text-yellow-300"
      >
        {icon}
        <span className="ml-2">{label}</span>
      </Link>
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300"
          layoutId="underline"
        />
      )}
    </motion.div>
  </li>
  )
}

export default NavItem



