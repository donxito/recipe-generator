
export interface Ingredient {
    text: string;
    quantity: number;
    measure: string;
    food: string;
    weight: number;
    foodCategory: string;
    foodId: string;
    image: string;
  }
  
  export interface Recipe {
    id: string
    label: string;
    image: string;
    source: string;
    url: string;
    ingredients: Ingredient[];
  }