import { SavedIngredient } from "@/app/types";
import { View, Text, StyleSheet } from 'react-native';
import { IconButton, MD3Colors } from "react-native-paper";
import { useAppContext } from "./AppContext";

export const renderIngredientItem = (ingredient: SavedIngredient, checked: boolean, toggleCheckbox: () => void) => {
  const { addToShoppingList, decrementShoppingListItem } = useAppContext();

  const handlebuttonPress = () => {
    toggleCheckbox();
    if (checked) {
      decrementShoppingListItem(ingredient.name, ingredient.amount);
    } else {
      addToShoppingList(ingredient);
    }
  };

    return (
      <View style={styles.container}>
        <Text style={[styles.item]}>
          {ingredient.amount} {ingredient.unit} {ingredient.name}
        </Text>
        <IconButton
          icon={checked ? "minus" : "plus"}
          iconColor={MD3Colors.error50}
          size={20}
          onPress={handlebuttonPress}
        />
      </View>
    );

  };

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
