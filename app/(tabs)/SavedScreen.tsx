import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useAppContext } from '@/components/AppContext';
import { Recipe } from '../types';

const SavedScreen = () => {
  const { savedRecipes, deleteRecipe } = useAppContext();

  const renderItem = ({ item }: { item: Recipe }) => (
    <View style={styles.recipeItem}>
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <Button title="Delete" onPress={() => deleteRecipe(item.id)} />
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Recipes</Text>
      <FlatList
        data={savedRecipes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recipeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recipeTitle: {
    fontSize: 18,
  },
});

export default SavedScreen;