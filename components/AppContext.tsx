import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Recipe } from '@/app/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppContextType = {
  savedRecipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  // Function to load data from AsyncStorage
  const loadSavedRecipes = async () => {
    try {
      console.log('Loading user data');
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
      console.log('Updating recipes in AsyncStorage');
      await AsyncStorage.setItem('savedRecipes', JSON.stringify(recipes));
    } catch (error) {
      console.error('Failed to update recipes', error);
    }
  };

  // Function to add a new recipe
  const addRecipe = (newRecipe: Recipe) => {
    const updatedRecipes = [...savedRecipes.filter(recipe => recipe.id != newRecipe.id), newRecipe];
    setSavedRecipes(updatedRecipes);
    saveRecipesToStorage(updatedRecipes);
  };

  // Function to delete a recipe
  const deleteRecipe = (id: string) => {
    const updatedRecipes = savedRecipes.filter(recipe => recipe.id != id);
    setSavedRecipes(updatedRecipes);
    saveRecipesToStorage(updatedRecipes);
  };

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  return (
    <AppContext.Provider value={{ savedRecipes, addRecipe, deleteRecipe }}>
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