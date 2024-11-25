import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

interface CheckListProps<T> {
  items: T[];
  renderItem: (item: T, checked: boolean, toggleCheckbox: () => void) => JSX.Element;
  heading: string;
}

export const CheckList = <T,>({ items, renderItem, heading }: CheckListProps<T>) => {
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
          {renderItem(item, checkedItems[index], () => toggleCheckbox(index))}
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