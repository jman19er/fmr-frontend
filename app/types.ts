export type RootStackParamList = {
    Home: undefined;
    Saved: undefined;
    RecipeInfo: Recipe;
  };

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Nutrition {
  nutrients: Nutrient[];
  ingredients: Ingredient[];
}

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds?: number;
}
export interface Recipe {
  calories?: number;
  description?: string;
  sourceUrl?: string;
  extendedIngredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  title: string;
  readyInMinutes: number;
  flavorRating: number;
  servings: number;
  instructions?: string[];
  macroNutrients: Nutrient[];
};

export interface FilterPopoverProps {
  visible: boolean;
  onClose: () => void;
  onApply: (data: any) => void;
};

export interface Filters {
    query?: string;
    maxReadyTime?: number;
    includeIngredients?: string;
    excludeIngredients?: string;
    minProtein?: number;
    maxProtein?: number;
    minCarbs?: number;
    maxCarbs?: number;
    minFat?: number;
    maxFat?: number;
    minCalories?: number;
    maxCalories?: number;
};