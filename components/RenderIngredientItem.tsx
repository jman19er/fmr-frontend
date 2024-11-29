import { Ingredient } from "@/app/types";
import CheckBox from "expo-checkbox";
import { View, Text, StyleSheet } from 'react-native';

export const renderIngredientItem = (ingredient: Ingredient, checked: boolean, toggleCheckbox: () => void) => (
  <View style={styles.container}>
    <CheckBox value={checked} onValueChange={toggleCheckbox} />
    <Text style={[styles.item, checked && styles.checkedItem]}>
      [ {ingredient.amount.toFixed(2)} {ingredient.unit}] {ingredient.originalName}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  item: {
    fontSize: 16,
    marginBottom: 4,
    padding: 10,
    flexShrink: 1,
    flex: 1,
  },
  checkedItem: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});