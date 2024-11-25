export type RootStackParamList = {
    Home: undefined;
    Saved: undefined;
    RecipeInfo: Recipe;
  };

  
export interface Recipe {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  analyzedInstructions: {
    steps: {
      step: string;
    }[];
  }[];
  nutrition: {
    nutrients: {
      title: string;
      amount: number;
    }[];
    ingredients: {
      name: string;
      amount: number;
      unit: string;
    }[];
  };
}

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