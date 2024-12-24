import { Ingredient, Recipe, SavedIngredient } from "@/app/types";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

interface IngredientListProps {
  items: Ingredient[];
  renderItem: (item: SavedIngredient, checked: boolean, toggleCheckbox: () => void) => JSX.Element;
  recipe: Recipe;
  heading: string;
  footer?: string;
}

export const IngredientList = ({ items, renderItem, recipe, heading }: IngredientListProps) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(items.length).fill(false));

  const toggleCheckbox = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <View style={styles.itemsContainer}>
      <Text style={styles.heading}>{heading}</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          {renderItem({...item, recipe: recipe}, checkedItems[index], () => toggleCheckbox(index))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemsContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    width: '100%',
  },
});