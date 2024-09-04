import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL! 
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// sign in with Google
export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    })
    return { data, error}
    
}

// ign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
    const { data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    return { data, error}
}

// sign up with email and password
export const signUpWithEmail = async (email: string, password: string) => {
    const { data, error} = await supabase.auth.signUp({
        email,
        password,
    })
    return { data, error}
}

// sign out
export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return error
}

// get the current user
export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}