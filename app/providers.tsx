'use client'

import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/components/AuthProvider'
import { SessionProvider } from 'next-auth/react'


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem 
      disableTransitionOnChange>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}