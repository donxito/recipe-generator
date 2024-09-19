"use client"

import React, { useState } from 'react'
import { signInWithEmail, signInWithGoogle } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { error } = await signInWithEmail(email, password)
      if (error) throw error

      toast({
        title: "Success",
        description: "You have successfully signed in",
      })

      router.push('/')
    } catch (error: any) {
      console.error('Sign in failed', error)
      setError(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      const { error } = await signInWithGoogle()
      if (error) throw error
      // The user will be redirected to Google's sign-in page
    } catch (error: any) {
      console.error('Google sign in failed', error)
      setError(error.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={handleSignIn} disabled={loading} className="w-full">
            {loading ? 'Loading...' : 'Sign In'}
          </Button>
          <Button onClick={handleGoogleSignIn} variant="outline" disabled={loading} className="w-full">
            {loading ? 'Loading...' : 'Sign In with Google'}
          </Button>
          <p className="text-sm text-center">
            Don&apos;t have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignIn