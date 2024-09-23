export type RootStackParamList = {
    Home: undefined;
    Saved: undefined;
    RecipeInfo: Recipe;
  };

  
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  steps: string[];
  ingredients: string[];
  readyInMinutes: string;
}