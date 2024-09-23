import { Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../navigation';
import { Recipe } from '../types';
import { useAppContext } from '@/components/AppContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import RecipeApi from '@/components/RecipeApi';

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { addRecipe } = useAppContext();  
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const recipeApi = new RecipeApi();
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      console.log('Fetching recipes home screen');
      // todo: enable users to set these filters
      const recipes = await recipeApi.searchRecipes({
        query: '',
        addRecipeNutrition: true,
        addRecipeInstructions: true,
        fillIngredients: true,
        maxReadyTime: 20,
        number: 2,
        offset: page,
        instructionsRequired: true,
        sort: 'popularity'
      });
      setPage((prevPage) => {
        return prevPage + 1;
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
    fetchRecipes();
  }, []);

  const recipe = recipes[selectedRecipeIndex];
  if (loading || !recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('RecipeInfoScreen', { recipe: recipe })}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Image
          style={styles.image}
          source={{ uri: recipe.image }}
        />
        <View style={styles.durationContainer}>
          <Icon name="time-outline" size={20} color="#000" />
          <Text> {recipe.readyInMinutes} minutes</Text>
        </View>
        <View style={styles.durationContainer}>
          <Icon name="flash" size={20} color="#000" />
          <Text> {Math.floor(recipe.nutrition.nutrients[0].amount)} calories</Text>
        </View>
        <TouchableOpacity style={styles.saveForLaterButton} onPress={() => addRecipe(recipe)}>
          <Text style={styles.text}>Save for Later</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.findRecipeButton} onPress={() => findNewRecipe()}>
          <Text style={styles.text}>Find a New Recipe</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    height: '90%',
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
    marginVertical: 10,
  },
  saveForLaterButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0ad4e',
    borderRadius: 5,
    width: '100%',
  },
  findRecipeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#5bc0de',
    borderRadius: 5,
    width: '100%',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
});