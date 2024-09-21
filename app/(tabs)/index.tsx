import { Text, StyleSheet, SafeAreaView, Alert, Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../navigation';
import { Recipe } from '../types';
import { useAppContext } from '@/components/AppContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { addRecipe } = useAppContext();  

  const testRecipe: Recipe = {
    id: '1',
    title: 'Pancakes',
    description: 'This is a detailed description of the recipe.',
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
    steps: ['Step 1', 'Step 2', 'Step 3'],
    ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
    duration: '30',
  };

  const testRecipe2: Recipe = {
    id: '2',
    title: 'Steak',
    description: 'This is a detailed description of the recipe.',
    image: 'https://www.seriouseats.com/thmb/-KA2hwMofR2okTRndfsKtapFG4Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__05__Anova-Steak-Guide-Sous-Vide-Photos15-beauty-159b7038c56a4e7685b57f478ca3e4c8.jpg',
    steps: ['Step 1', 'Step 2', 'Step 3'],
    ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
    duration: '30',
  };

    // this will be populated with the result of an api call, so will need to move this to a useEffect
    const [ recipe, setRecipe ] = useState<Recipe>(testRecipe)


  const findNewRecipe = () => {
    console.log('Finding a new recipe');
    const random = Math.random();
    if (random > 0.5) {
      setRecipe(testRecipe);
    } else {
      setRecipe(testRecipe2);
    }
  };


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
          <Text> {recipe.duration} minutes</Text>
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