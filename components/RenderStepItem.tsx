import { Step } from "@/app/types";
import CheckBox from "@react-native-community/checkbox";
import { Text, StyleSheet, View } from 'react-native';

export const renderStepItem = (step: Step, checked: boolean, toggleCheckbox: () => void) => (
    <View style={styles.container}>

      <CheckBox value={checked} onValueChange={toggleCheckbox} />
      <Text style={[styles.item, checked && styles.checkedItem]}>
        {step.step}
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
    checkbox: {
        width: 20,
        height: 20,
      },
  });