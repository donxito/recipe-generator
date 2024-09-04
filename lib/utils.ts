import { Recipe } from "@/types/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateRecipeId(recipe: Recipe): string {
  const { label, url } = recipe;
  return btoa(`${label}:${url}`).replace(/[/+=]/g, '');
}

