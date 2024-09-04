import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST: add a recipe to favorites
export async function POST(req: Request) {
    const { recipeId } = await req.json();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const { data, error } = await supabase
        .from("favorites")
        .upsert({ user_id: user.id, recipe_id: recipeId })
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
        return NextResponse.json({ error: "No data returned" }, { status: 500 });
    }

    return NextResponse.json({ favorites: data[0] });
}

// DELETE: remove a recipe from favorites
export async function DELETE(req: Request) {
    const { recipeId } = await req.json();
    const { data: { user} } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const { error } = await supabase
        .from("favorites")
        .delete()
        .match({ user_id: user.id, recipe_id: recipeId });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ sucess: true });
}

// GET: get favorites
export async function GET(req: Request) {
    const { data: { user} } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const { data, error } = await supabase
        .from("favorites")
        .select()
        .eq("user_id", user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ favorites: data.map( fav => fav.recipe_id) });
}