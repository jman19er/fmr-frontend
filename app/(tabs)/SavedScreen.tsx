import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useAppContext } from '@/components/AppContext';
import { Recipe } from '../types';
import { SavedScreenNavigationProp } from '../navigation';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const SavedScreen = () => {
  const { savedRecipes, deleteRecipe, clearNotification } = useAppContext();
  const navigation = useNavigation<SavedScreenNavigationProp>();

  const renderRightActions = (itemId: string) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRecipe(itemId)}>
      <Icon name="trash-outline" size={30} color="#fff" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Recipe }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.title)}>
      <TouchableOpacity style={styles.recipeItem} onPress={() => navigation.navigate('RecipeInfoScreen', { recipe: item })}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
      </TouchableOpacity>
    </Swipeable>

  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearNotification(); // Clear the notification when the tab is focused
    });

    return unsubscribe; // Cleanup the listener on unmount
  }, [navigation, clearNotification]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Recipes</Text>
      <FlatList
        data={savedRecipes}
        renderItem={renderItem}
        keyExtractor={item => item.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
  savedRecipeThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
  }
});

export default SavedScreen;