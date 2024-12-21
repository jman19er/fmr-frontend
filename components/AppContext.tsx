import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Recipe } from '@/app/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppContextType = {
  savedRecipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  isRecipeSaved: (id: string) => boolean;
  clearNotification: () => void;
  notification: Boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [notification, setNotification] = useState<Boolean>(false);

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

  // Function to save data to AsyncStorage
  const saveRecipesToStorage = async (recipes: Recipe[]) => {
    try {
      await AsyncStorage.setItem('savedRecipes', JSON.stringify(recipes));
    } catch (error) {
      console.error('Failed to update recipes', error);
    }
  };

  // Function to add a new recipe
  const addRecipe = (newRecipe: Recipe) => {
    const updatedRecipes = [...savedRecipes.filter(recipe => recipe.title != newRecipe.title), newRecipe];
    setSavedRecipes(updatedRecipes);
    setNotification(true);
    saveRecipesToStorage(updatedRecipes);
  };

  // Function to delete a recipe
  const deleteRecipe = (title: string) => {
    const updatedRecipes = savedRecipes.filter(recipe => recipe.title != title);
    setSavedRecipes(updatedRecipes);
    saveRecipesToStorage(updatedRecipes);
  };

  const isRecipeSaved = (title: string) => {
    return savedRecipes.some(recipe => recipe.title === title);
  }

  const clearNotification = () => {
    setNotification(false);
  };

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  return (
    <AppContext.Provider value={{ savedRecipes, addRecipe, deleteRecipe, isRecipeSaved, clearNotification, notification}}>
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