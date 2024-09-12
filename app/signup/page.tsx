"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'


function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    
    const router = useRouter();
    const { toast } = useToast();

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            })
    
            if (error) throw error
    
            if (data.user) {
                toast({
                    title: "Success",
                    description: "You have successfully signed up. Please check your email to confirm your account.",
                })
                router.push("/signin")
            } else {
                throw new Error("Failed to create user")
            }
        } catch (error: any) {
            console.error("Error signing up:", error)
            setError(error.message || "An error occurred during sign up")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignUp}>
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
                    <Button onClick={handleSignUp} disabled={loading} className="w-full">
                        {loading ? 'Loading...' : 'Sign Up'}
                    </Button>
                    <p className="text-sm text-center">
                        Already have an account? <Link href="/signin" className="text-blue-500 hover:underline">Sign In</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SignUp