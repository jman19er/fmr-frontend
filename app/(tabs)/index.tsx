import 'react-native-gesture-handler';
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Filters, Recipe } from '../types';
import React, { useEffect, useRef, useState } from 'react';
import RecipeApi from '@/components/RecipeApi';
import { RecipeInfo } from '@/components/RecipeInfo';
import LoadingScreen from '../LoadingScreen';
import IntroScreen from '@/components/IntroScreen';

export default function HomeScreen() {
  const [recipes, setRecipes] = useState<Recipe[] | undefined>(undefined);
  const [seenRecipes, setSeenRecipes] = useState<string[]>([]);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);
  const isFirstRender = useRef(true);
  const recipeApi = new RecipeApi();
  const route = useRoute();
  const { filters } = route.params as { filters?: Filters } || {};

  const fetchRecipes = async (resetPage = false) => {
    // user has attempted fetch
    // Wait for slide-out animation to *start* (e.g. ~300ms), then show loading
    setLoading(true);
    setHasFetched(true);
    setError(null);
    if (resetPage) {
      setPage(null);
    }
    try {
      const response = await recipeApi.searchRecipesV2({
        ...(page !== null && { next: page }),
        ...filters,
        ...(seenRecipes.length > 0 && { seenRecipes: seenRecipes }),
      });

      const next = response.next;
      
      setPage(next);
      
      const recipes = response.results;
      if (!recipes || recipes.length === 0) {
        setError('No recipes found');
        setRecipes([]);
        return; 
      }

      setSeenRecipes((prev) => {
        const newRecipes = recipes.filter((recipe: Recipe) => !prev.includes(recipe.title));
        return [...prev, ...newRecipes.map((recipe: Recipe) => recipe.title)];
      });
      setError(null);
      setRecipes(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Error fetching recipes');
    } finally {
      setLoading(false);
    }
  };

  const findNewRecipe = () => {
    // If we don't have any recipes yet or we are at the end of the array:
    if (!recipes || selectedRecipeIndex + 1 >= recipes.length) {
      // This will call fetchRecipes (which sets hasFetched = true, sets loading = true, etc.)
      fetchRecipes();
      // Reset selected index
      setSelectedRecipeIndex(0);
    } else {
      // Just increment to the next recipe in the array
      setSelectedRecipeIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Only re-fetch if filters changed, ignoring the very first render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // If filters changed, we want to reset page and refetch
    fetchRecipes(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const recipe = 
    recipes && 
    selectedRecipeIndex >= 0 && 
    selectedRecipeIndex < recipes.length 
      ? recipes[selectedRecipeIndex] 
      : null;
        
  // 1. If we haven't fetched anything yet, show the landing page
  if (!hasFetched) {
    return (
      <IntroScreen findNewRecipe={findNewRecipe} />
    );
  }

  // 2. If we’re loading, show a spinner or loading screen
  if (loading) {
    return <LoadingScreen />;
  }

  // 3. If we have an error or no valid `recipe`, show the error screen
  if (error || !recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          {error 
            ? error 
            : "Sorry, we couldn't find any recipes matching those filters at this time."
          }
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.findNewRecipe} onPress={findNewRecipe}>
            <Text style={styles.findNewRecipeText}>Next Recipe</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  return (

    <SafeAreaView style={styles.container}>
        <RecipeInfo recipe={recipe}/>
        <View style={styles.bottomRowContainer}>
        <TouchableOpacity style={styles.findNewRecipe} onPress={() => findNewRecipe()}>
            <Text style={styles.findNewRecipeText}>Next Recipe</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  bottomRowContainer: {
    position: 'absolute', // Position the container without affecting the flow
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Ensure the buttons are above other content
    backgroundColor: 'transparent', // Remove any background color
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'center', // Space buttons to the edges
    paddingHorizontal: 10, // Add spacing on sides
  },
  buttonContainer: {
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    padding: 10,
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
  circularButton: {
    width: 60, // Button diameter
    height: 60, // Button diameter
    borderRadius: 30, // Half the width/height for a perfect circle
    backgroundColor: '#FFF', // Button background color
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Allows the buttons to overlay content
    elevation: 10, // Adds shadow for better visual separation (Android)
    shadowColor: '#000', // Adds shadow for better visual separation (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

  },
  bottomLeft: {
    left: 10, // Adjust as needed for spacing from the left edge
    bottom: 10, // Adjust as needed for spacing from the bottom
  },
  bottomRight: {
    right: 10, // Adjust as needed for spacing from the right edge
    bottom: 10, // Adjust as needed for spacing from the bottom
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
