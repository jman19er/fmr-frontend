import axios, { AxiosResponse } from 'axios';

interface RecipeApiParams {
  [key: string]: any;
  query?: string;
  addRecipeNutrition: boolean;
  addRecipeInstructions: boolean;
  fillIngredients: boolean;
  maxReadyTime?: number;
  number: number;
  offset: number;
  instructionsRequired: boolean;
  sort: string;
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

}

class RecipeApi {
  private SEARCH_RECIPE_URL = 'https://8xsda2kbj1.execute-api.us-east-1.amazonaws.com/default/search?';
  searchRecipes = async (params: RecipeApiParams): Promise<any> => {
    try {
      const transfromedParams = this.transformParms(params);
      console.log(`Fetching recipes with params ${JSON.stringify(transfromedParams)}`);
      const response: AxiosResponse<any> = await axios.get(this.SEARCH_RECIPE_URL,
          { 
              params: transfromedParams,
              headers: {
                  'Content-Type': 'application/json',
              }
          });
      return response.data.results;
    } catch (error) {
      console.error(`Failed to fetch recipes at ${this.SEARCH_RECIPE_URL} with params ${JSON.stringify(params)}`);
      throw error;
    }
  };

  transformParms = (params: RecipeApiParams) => {
    const cleanedParams: { [key: string]: any } = {};

    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== '') {
        cleanedParams[key] = value;
      }
    });
    // Ensure 'query' is set to an empty string if it does not exist in params
    if (!cleanedParams.hasOwnProperty('query')) {
      cleanedParams['query'] = '';
    }
    return cleanedParams;
  }
}

export default RecipeApi;
