import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { SavedIngredient, Recipe } from '@/app/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AppContextType = {
  savedRecipes: Recipe[];
  recipesToTry: Recipe[];
  shoppingList: SavedIngredient[];
  addRecipe: (recipe: Recipe) => void;
  addRecipeToTry: (recipe: Recipe) => void;
  addToShoppingList: (ingredient: SavedIngredient) => void;
  deleteFromShoppingList: (name: string) => void;
  decrementShoppingListItem: (name: string, value: number) => void;
  deleteRecipe: (id: string) => void;
  deleteRecipeToTry: (id: string) => void;
  isRecipeSaved: (id: string) => boolean;
  isRecipeToTry: (id: string) => boolean;
  clearNotification: () => void;
  clearLikedNotification: () => void;
  clearToTryNotification: () => void;
  clearGroceryNotification: () => void
  notification: Boolean;
  likedNotification: Boolean;
  toTryNotification: Boolean;
  groceryNotification: Boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [recipesToTry, setRecipesToTry] = useState<Recipe[]>([]);
  const [shoppingList, setShoppingList] = useState<SavedIngredient[]>([]);
  const [notification, setNotification] = useState<Boolean>(false);
  const [likedNotification, setLikedNotification] = useState<Boolean>(false);
  const [toTryNotification, setToTryNotification] = useState<Boolean>(false);
  const [groceryNotification, setGroceryNotification] = useState<Boolean>(false);

  // Function to load data from AsyncStorage
  const loadSavedRecipes = async () => {
    try {
      const data = await AsyncStorage.getItem('savedRecipes');
      if (data) {
        setSavedRecipes(JSON.parse(data));
      }
    } catch (error) {
      console.error('Failed to load user data', error);
      setSavedRecipes([]);
    }
  };

  const loadRecipesToTry = async () => {
    try {
      const data = await AsyncStorage.getItem('recipesToTry');
      if (data) {
        setRecipesToTry(JSON.parse(data));
      }
    } catch (error) {
      console.error('Failed to load recipesToTry data', error);
      setRecipesToTry([]);
    }
  };

  const loadShoppingList = async () => {
    try {
      const data = await AsyncStorage.getItem('shoppingList');
      if (data) {
        setShoppingList(JSON.parse(data));
      }
    } catch (error) {
      console.error('Failed to load shoppingList data', error);
      setShoppingList([]);
    }
  };

  // Function to save data to AsyncStorage
  const saveRecipesToStorage = async (recipes: Recipe[]) => {
    try {
      await AsyncStorage.setItem('savedRecipes', JSON.stringify(recipes));
    } catch (error) {
      console.error('Failed to update liked recipes', error);
    }
  };

  const saveRecipesToTry = async (recipes: Recipe[]) => {
    try {
      await AsyncStorage.setItem('recipesToTry', JSON.stringify(recipes));
    } catch (error) {
      console.error('Failed to update recipes to try', error);
    }
  };

  const saveShoppingList = async (list: SavedIngredient[]) => {
    try {
      await AsyncStorage.setItem('shoppingList', JSON.stringify(list));
    } catch (error) {
      console.error('Failed to update shopping list', error);
    }
  };

  // Function to add a new recipe
  const addRecipe = (newRecipe: Recipe) => {
    const updatedRecipes = [...savedRecipes.filter(recipe => recipe.title.toLowerCase() != newRecipe.title.toLowerCase()), newRecipe];
    setSavedRecipes(updatedRecipes);
    setNotification(true);
    setLikedNotification(true);
    saveRecipesToStorage(updatedRecipes);
  };

  const addRecipeToTry = (newRecipe: Recipe) => {
    const updatedRecipes = [...recipesToTry.filter(recipe => recipe.title.toLowerCase() != newRecipe.title.toLowerCase()), newRecipe];
    setRecipesToTry(updatedRecipes);
    setNotification(true);
    setToTryNotification(true);
    saveRecipesToTry(updatedRecipes);
  };

  const addToShoppingList = (newIngredient: SavedIngredient, amountToAdd = undefined) => {
    setShoppingList((prevList) => {
      // Check if the ingredient already exists by name
      const existingIndex = prevList.findIndex(
        (item) => 
          item.name.toLowerCase() === newIngredient.name.toLowerCase()
      );

      let updatedList: SavedIngredient[] = [];
      if (existingIndex !== -1) {
        // Ingredient already exists — merge amounts
        updatedList = [...prevList];
        updatedList[existingIndex] = {
          ...updatedList[existingIndex],
          amount: amountToAdd ? updatedList[existingIndex].amount + amountToAdd : updatedList[existingIndex].amount + newIngredient.amount,
        };
      } else {
        // Otherwise, just append the new ingredient
        updatedList = [...prevList, newIngredient];
      }
      setNotification(true);
      setGroceryNotification(true);
      saveShoppingList(updatedList);
      return updatedList;
    });
  }

  // Function to delete a recipe
  const deleteRecipe = (title: string) => {
    const updatedRecipes = savedRecipes.filter(recipe => recipe.title.toLowerCase() != title.toLowerCase());
    setSavedRecipes(updatedRecipes);
    saveRecipesToStorage(updatedRecipes);
  };

  const deleteRecipeToTry = (title: string) => {
    const updatedRecipes = recipesToTry.filter(recipe => recipe.title.toLowerCase() != title.toLowerCase());
    setRecipesToTry(updatedRecipes);
    saveRecipesToTry(updatedRecipes);
  };

  const deleteFromShoppingList = (name: string) => {
    const updatedShoppingList = shoppingList.filter(item => item.name.toLowerCase() != name.toLowerCase());
    setShoppingList(updatedShoppingList);
    saveShoppingList(updatedShoppingList);
  };

  const decrementShoppingListItem = (name: string, value: number) => {
    if (value <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    setShoppingList((prevList) => {
      const existingIndex = prevList.findIndex(
        (item) => 
          item.name.toLowerCase() === name.toLowerCase()
      );

      if (existingIndex === -1) {
        throw new Error(`Item ${name} not found in shopping list`);
      }

      let updatedList = [...prevList];
      const existingValue = updatedList[existingIndex].amount;
      if (existingValue <= value) { 
        // remove the item from the list if the new value is 0
        updatedList = updatedList.filter(item => item.name.toLowerCase() != name.toLowerCase());
      } else {
        updatedList[existingIndex] = {
          ...updatedList[existingIndex],
          amount: existingValue - value,
        }; 
      }
      saveShoppingList(updatedList);
      return updatedList;
    });
  };

  const isRecipeSaved = (title: string) => {
    return savedRecipes.some(recipe => recipe.title.toLowerCase() === title.toLowerCase());
  };

  const isRecipeToTry = (title: string) => {
    return recipesToTry.some(recipe => recipe.title.toLowerCase() === title.toLowerCase());
  };

  const clearNotification = () => {
    setNotification(false);
  };

  const clearLikedNotification = () => {
    setLikedNotification(false);
  };

  const clearToTryNotification = () => {
    setToTryNotification(false);
  };

  const clearGroceryNotification = () => {
    setGroceryNotification(false);
  };

  useEffect(() => {
    loadSavedRecipes();
    loadRecipesToTry();
    loadShoppingList();
  }, []);

  return (
    <AppContext.Provider 
      value={{ 
        savedRecipes,
        recipesToTry,
        shoppingList,
        addRecipe,
        addRecipeToTry,
        addToShoppingList,
        deleteRecipe,
        deleteRecipeToTry,
        deleteFromShoppingList,
        decrementShoppingListItem,
        isRecipeSaved,
        isRecipeToTry,
        clearNotification,
        clearLikedNotification,
        clearToTryNotification,
        clearGroceryNotification,
        notification,
        likedNotification,
        toTryNotification,
        groceryNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};