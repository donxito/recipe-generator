import NextAuth, { NextAuthOptions, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { createClient } from "@supabase/supabase-js"
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

// Define custom types for NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
    accessToken?: string | null
  }
  interface User {
    id: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string 
  }
}

// Environment variable validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        const { data, error } = await supabase.auth.signUp({
          email: profile.email,
          password: crypto.randomUUID(), // Generate a random password
          options: {
            data: {
              name: profile.name,
              avatar: profile.image,
            },
          },
        })

        if (error) {
          console.error("Supabase sign up error:", error)
          return false
        }

        return true
      }
      return false
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
  pages: {
    signIn: '/signin',
    error: '/auth/error', // Add a custom error page
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }