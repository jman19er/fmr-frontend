export type RootStackParamList = {
    Home: undefined;
    Saved: undefined;
    RecipeInfo: Recipe;
  };

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  originalName: string;
}

export interface Step {
  step: string;
}
  
export interface Nutrition {
  nutrients: Nutrient[];
  ingredients: Ingredient[];
}

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}
export interface Recipe {
  extendedIngredients: any;
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  aggregateLikes: number;
  analyzedInstructions: {
    steps: {
      step: string;
    }[];
  }[];
  nutrition: Nutrition;
    ingredients: {
      name: string;
      amount: number;
      unit: string;
    }[];
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