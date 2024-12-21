import 'react-native-gesture-handler';
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Filters, Recipe } from '../types';
import React, { useEffect, useState } from 'react';
import RecipeApi from '@/components/RecipeApi';
import { RecipeInfo } from '@/components/RecipeInfo';
import { SaveRecipe } from '@/components/SaveRecipe';
import LoadingScreen from '../LoadingScreen';

export default function HomeScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([{'description': 'Succulent Italian Chicken Instant Pot', 'extendedIngredients': [{'name': 'chicken breast', 'amount': 1.5, 'unit': 'pounds'}, {'name': 'low-sodium chicken broth', 'amount': 1, 'unit': 'cup'}, {'name': 'garlic powder', 'amount': 1, 'unit': 'teaspoon'}, {'name': 'Italian seasoning', 'amount': 1, 'unit': 'tablespoon'}, {'name': 'salt', 'amount': 0.5, 'unit': 'teaspoon'}, {'name': 'black pepper', 'amount': 0.25, 'unit': 'teaspoon'}], 'instructions': ['Place chicken breasts in the Instant Pot.', 'Sprinkle garlic powder, Italian seasoning, salt, and pepper over the chicken.', 'Pour chicken broth around the chicken breasts.', 'Close the lid and set valve to sealing position.', 'Cook on Manual/Pressure Cook (high) for 10 minutes.', 'Allow natural pressure release for 5 minutes, then quick release remaining pressure.', 'Check internal temperature reaches 165°F (74°C).', 'Let rest for 5 minutes before slicing.'], 'title': 'Instant Pot Italian Chicken Breast', 'readyInMinutes': 10, 'macroNutrients': [{'name': 'Protein', 'amount': 35, 'unit': 'g'}, {'name': 'Carbs', 'amount': 2, 'unit': 'g'}, {'name': 'Fat', 'amount': 8, 'unit': 'g'}], 'flavorRating': 7, 'servings': 4, 'calories': 220}]);
  const [seenRecipes, setSeenRecipes] = useState<string[]>([]);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [slidingOut, setSlidingOut] = useState(false);

  const recipeApi = new RecipeApi();
  const route = useRoute();
  const { filters } = route.params as { filters?: Filters } || {};

  const handleAnimationEnd = () => {
    setSlidingOut(false); // Reset sliding state
    setLoading(true); // Show loading screen
};

  const fetchRecipes = async (resetPage = false) => {
    if (resetPage) {
      setPage(null);
    }
    setSlidingOut(true);
    try {
      const response = await recipeApi.searchRecipesV2({
        ...(page !== null && { next: page }),
        ...filters,
        ...(seenRecipes.length > 0 && { seenRecipes: seenRecipes }),
      });

      const next = response.next;
      
      setPage(next);
      
      const recipes = response.results;
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
      <LoadingScreen />
    );
  }
  if (error || !recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Sorry, we couldn't find any recipes matching those filters at this time. Please change your filters. If the problem persists, please try again later.</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.findNewRecipe} onPress={() => findNewRecipe()}>
            <Text>Next Recipe</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  return (

    <SafeAreaView style={styles.container}>
        {!slidingOut && (
            <RecipeInfo recipe={recipe} onExit={handleAnimationEnd} />
        )}      
        <View style={styles.bottomRowContainer}>
        <TouchableOpacity
          style={[styles.circularButton, styles.bottomRight]}
          onPress={() => findNewRecipe()}
        >
          <Icon name="arrow-forward" size={30} color="#FF5A5F" />
        </TouchableOpacity>
        <View style={[styles.circularButton, styles.bottomLeft]}>
          <SaveRecipe recipe={recipe} />
        </View>
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
    justifyContent: 'space-between', // Space buttons to the edges
    paddingHorizontal: 10, // Add spacing on sides
    paddingBottom: 10, // Adjust spacing from the bottom
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
