import 'react-native-gesture-handler';
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Filters, Recipe } from '../types';
import { useEffect, useState } from 'react';
import RecipeApi from '@/components/RecipeApi';
import { RecipeInfo } from '@/components/RecipeInfo';

const PAGE_SIZE = 5 ;

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
      const response = await recipeApi.searchRecipes({
        addRecipeNutrition: true,
        addRecipeInstructions: true,
        fillIngredients: true,
        number: PAGE_SIZE,
        offset: resetPage ? 0 : page,
        instructionsRequired: true,
        sort: 'popularity',
        ...filters
      });
      const offset = response.offset;
      const number = response.number;
      const newOffset = offset + number;
      setPage(newOffset);
      const recipes = response.results;
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

  const recipe = recipes && selectedRecipeIndex >= 0 && selectedRecipeIndex < recipes.length ? recipes[selectedRecipeIndex] : null;
  
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
        <Text style={styles.findNewRecipeText}>Find New Recipe</Text>
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
    marginTop: 20, // Adds spacing from other content
    paddingVertical: 14, // Larger vertical padding for better touch target
    paddingHorizontal: 20, // Horizontal padding for better spacing
    borderRadius: 25, // Rounded edges for a modern look
    minWidth: 200,
    width: '80%', // Ensure consistent width
    alignSelf: 'center', // Center the button
    alignItems: 'center', // Center text/content inside the button
    justifyContent: 'center', // Ensure the text is centered
    backgroundColor: '#FF5A5F', // Modern, vibrant color
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow effect for Android
    marginBottom: 5,
  },
  findNewRecipeText: {
    color: '#fff', // White text for contrast
    fontSize: 16, // Medium size for readability
    fontWeight: 'bold', // Bold text for emphasis
    letterSpacing: 1, // Slight letter spacing for a modern touch
  },

});
