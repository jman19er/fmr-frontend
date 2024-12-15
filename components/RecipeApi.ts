import axios, { AxiosResponse } from 'axios';


interface RecipeApiParams {
  [key: string]: any;
  query?: string;
  addRecipeNutrition?: boolean;
  addRecipeInstructions?: boolean;
  fillIngredients?: boolean;
  instructionsRequired?: boolean;
  sort?: string;
  maxReadyTime?: number;
  number?: number;
  offset?: number;
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
  private SEARCH_RECIPE_URL = process.env.EXPO_PUBLIC_SEARCH_RECIPE_URL;
  private SEARCH_V1 = "search?"
  private SEARCH_V2 = "search-v2?"

  searchRecipes = async (params: RecipeApiParams): Promise<any> => {
    const url = `${this.SEARCH_RECIPE_URL!}${this.SEARCH_V1}`;

    try {
      const transfromedParams = this.transformParms(params);
      console.log(`Fetching recipes with params ${JSON.stringify(transfromedParams)}`);
      const response: AxiosResponse<any> = await axios.get(url,
          { 
              params: transfromedParams,
              headers: {
                  'Content-Type': 'application/json',
              }
          });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch recipes at ${url} with params ${JSON.stringify(params)}`);
      throw error;
    }
  };

  searchRecipesV2 = async (params: RecipeApiParams): Promise<any> => {
    const url = `${this.SEARCH_RECIPE_URL!}${this.SEARCH_V2}`;

    try {
      const transfromedParams = this.transformParms(params);
      console.log(`Fetching recipes with params search-v2 ${JSON.stringify(transfromedParams)}`);
      const response: AxiosResponse<any> = await axios.get(url,
          { 
              params: transfromedParams,
              headers: {
                  'Content-Type': 'application/json',
              }
          });
      // console.log("response is", response.data);
      return JSON.parse(response.data);
    } catch (error) {
      console.error(`Failed to fetch recipes at ${url} with params ${JSON.stringify(params)}`);
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
