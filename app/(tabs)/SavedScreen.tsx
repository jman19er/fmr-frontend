import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppContext } from '@/components/AppContext';
import { SavedScreenNavigationProp } from '../navigation';
import { useNavigation } from '@react-navigation/native';
import SavedComponent from '@/components/SavedComponent';
import { Badge, SegmentedButtons } from 'react-native-paper';
import { ToTryRecipeRenderItem } from '@/components/ToTryRecipeRenderItem';
import { Recipe, SavedIngredient } from '../types';
import { ShoppingListRenderItem } from '@/components/ShoppingListRenderItem';
import { LikedRecipeRenderItem } from '@/components/LikedRecipeRenderItem';

const SavedScreen = () => {
  const { 
    savedRecipes,
    recipesToTry,
    shoppingList,
    likedNotification,
    toTryNotification,
    groceryNotification,
    clearNotification,
    clearLikedNotification,
    clearToTryNotification,
    clearGroceryNotification,
  } = useAppContext();
  const [selectedTab, setSelectedTab] = useState<'saved' | 'toTry' | 'groceryList'>('saved');

  const navigation = useNavigation<SavedScreenNavigationProp>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearNotification(); // Clear the notification when the tab is focused
    });

    return unsubscribe; // Cleanup the listener on unmount
  }, [navigation, clearNotification]);

  return (
    <View style={styles.container}>
      {/* Segmented control at the top */}
      <SegmentedButtons
        theme={{ colors: { secondaryContainer: '#FF5A5F' } }}
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value as 'saved' | 'toTry' | 'groceryList')}
        buttons={[
          { 
            value: 'saved',
            label: 'Liked',
            onPress: () => clearLikedNotification(),           
            icon: ({ color, size }) => (
              <View style={styles.iconAndBadge}>
                { likedNotification && <Badge size={10}/> }
              </View>
            )
          },
          { 
            value: 'toTry', 
            label: 'To Try', 
            onPress: () => clearToTryNotification(),
            icon: ({ color, size }) => (
              <View style={styles.iconAndBadge}>
                { toTryNotification && <Badge size={10}/> }
              </View>
            )

          },
          { 
            value: 'groceryList',
            label: 'Groceries',
            onPress: () => clearGroceryNotification(),
            icon: ({ color, size }) => (
              <View style={styles.iconAndBadge}>
                { groceryNotification && <Badge size={10}/>}
              </View>
            )
          },
        ]}
        style={styles.segmentedControl}
      />

      {selectedTab === 'saved' && 
        <SavedComponent
          saved={savedRecipes}
          navigation={navigation}
          renderItem={LikedRecipeRenderItem}
          keyExtractor={(recipe: Recipe) => recipe.title}
        />
      }
      {selectedTab === 'toTry' &&
        <SavedComponent
          saved={recipesToTry}
          navigation={navigation}
          renderItem={ToTryRecipeRenderItem}
          keyExtractor={(recipe: Recipe) => recipe.title}
        />
      }
      {
        selectedTab === 'groceryList' &&
        <SavedComponent
          saved={shoppingList}
          navigation={navigation}
          renderItem={ShoppingListRenderItem}
          keyExtractor={(ingredient: SavedIngredient) => ingredient.name}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  segmentedControl: {
    margin: 16,
  },
  iconAndBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    // Slight margin to keep icon and badge separated
    marginRight: 2,
  },
  badge: {
    // Adjust styling to suit your design
    backgroundColor: 'red',
  },

});

export default SavedScreen;