/* eslint-disable react/no-unescaped-entities */
"use client"

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string |null>(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });
      if (result?.error) throw new Error(result.error)

        router.push("/")
    } catch (error: any) {
        console.error("Sign in failed", error);
        setError(error.message || "Something went wrong")
    } finally {
        setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/"})
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
            <Button onClick={handleGoogleSignIn} variant="outline" className='w-full'>
                Sign In with Google
            </Button>
            <p className="text-sm text-center">
                Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
            </p>
        </CardFooter>
    </Card>
</div>
  )
}

export default SignIn
