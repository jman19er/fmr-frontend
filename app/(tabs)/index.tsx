import 'react-native-gesture-handler';
import { Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Filters, Recipe } from '../types';
import { useEffect, useState } from 'react';
import RecipeApi from '@/components/RecipeApi';
import { RecipeInfo } from '@/components/RecipeInfo';

export default function HomeScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const recipeApi = new RecipeApi();
  const route = useRoute();
  const { filters } = route.params as { filters?: Filters } || {};
  const fetchRecipes = async (resetPage = false) => {
    if (resetPage) {
      setPage(0);
    }
    setLoading(true);
    try {
      console.log('Fetching recipes home screen, page:', page);
      // todo: enable users to set these filters
      const recipes = await recipeApi.searchRecipes({
        addRecipeNutrition: true,
        addRecipeInstructions: true,
        fillIngredients: true,
        number: 10,
        offset: resetPage ? 0 : page,
        instructionsRequired: true,
        sort: 'popularity',
        ...filters
      });
      setPage((prevPage) => {
        return prevPage += 10;
      });
      setRecipes(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const findNewRecipe = () => {
    setSelectedRecipeIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= recipes.length) {
        fetchRecipes();
        return 0;
      } else {
        return nextIndex;
      }
    });
  };

  useEffect(() => {
    fetchRecipes(true);
  }, [filters]);

  const recipe = recipes[selectedRecipeIndex];
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }
  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>No recipes found with those filters</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.findNewRecipe} onPress={() => findNewRecipe()}>
            <Text>Find New Recipe</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  return (

    <SafeAreaView style={styles.container}>
      <RecipeInfo recipe={recipe} />
      
      <TouchableOpacity style={styles.findNewRecipe} onPress={() => findNewRecipe()}>
        {/* <Icon name="refresh-outline" size={30} color="#fff" /> */}
        <Text>Find New Recipe</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  buttonContainer: {
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    padding: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  findNewRecipe: {
    flexDirection: 'row',
    backgroundColor: '#5bc0de',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
