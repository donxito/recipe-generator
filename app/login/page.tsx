"use client"

import React, { useEffect, useState } from 'react'
import { supabase, signInWithEmail, signInWithGoogle } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'
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
            const { data, error } = await signInWithEmail(email, password)
            if (error) throw error
            
            toast({
                title: "Success",
                description: "You have successfully logged in",
            })
            router.push("/")
        } catch (error: any) {
            console.error("Error logging in:", error);
            setError(error.message || "An error occurred during login")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setLoading(true)
        try {
            const { error } = await signInWithGoogle()
            if (error) throw error
            // The toast and redirect will be handled by the auth state change listener
        } catch (error: any) {
            setError(error.message || "An error occurred during Google login")
            setLoading(false)
        }
    }

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                toast({
                    title: "Success",
                    description: "You have successfully logged in",
                })
                router.push("/")
            }
        })

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [router, toast])

      
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
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
                <CardFooter className="flex flex-col space-y-2">
                    <Button onClick={handleLogin} disabled={loading} className="w-full">
                        {loading ? 'Loading...' : 'Login'}
                    </Button>
                    <Button onClick={handleGoogleLogin} variant="outline" className="w-full" disabled={loading}>
                        {loading ? 'Loading...' : 'Login with Google'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
export default Login