"use client"

import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'
import { signIn } from 'next-auth/react'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    
    const router = useRouter();

    const { toast } = useToast();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });
            if (result?.error) throw Error (result.error)
            
            router.push("/")
        } catch (error: any) {
            console.error("Error logging in:", error);
            setError(error.message || "An error occurred during login")
        } finally {
            setLoading(false)
        }
    }

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "An error occurred during sign up");
            }

            toast({
                title: "Success",
                description: "You have successfully signed up",
            })
        
        } catch (error: any) {
            console.error("Error signing up:", error);
            setError(error.message || "An error occurred during sign up")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        signIn('google', { callbackUrl: '/' })
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login / Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
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
                <CardFooter className="flex justify-between">
                    <Button onClick={handleLogin} disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </Button>
                    <Button onClick={handleSignUp} variant="outline" disabled={loading}>
                        {loading ? 'Loading...' : 'Sign Up'}
                    </Button>
                    <Button onClick={handleGoogleLogin} variant="outline" className='w-full'>
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login