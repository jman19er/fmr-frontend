import axios, { AxiosResponse } from 'axios';

interface RecipeApiParams {
    query: string;
    addRecipeNutrition: boolean;
    addRecipeInstructions: boolean;
    fillIngredients: boolean;
    maxReadyTime: number;
    number: number;
    offset: number;
    instructionsRequired: boolean;
    sort: string;
}

class RecipeApi {
    private SEARCH_RECIPE_URL = 'https://8xsda2kbj1.execute-api.us-east-1.amazonaws.com/default/search?';
    searchRecipes = async (params: RecipeApiParams): Promise<any> => {
        try {
            console.log(`Fetching recipes with params ${JSON.stringify(params)}`);
            const response: AxiosResponse<any> = await axios.get(this.SEARCH_RECIPE_URL,
                { 
                    params: params,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            console.log(`Got response ${JSON.stringify(response.data.results)}`);   
            return response.data.results;
        } catch (error) {
            throw new Error(`Failed to fetch recipes at ${this.SEARCH_RECIPE_URL} with params ${JSON.stringify(params)}`);
        }
    };
}

export default RecipeApi;
