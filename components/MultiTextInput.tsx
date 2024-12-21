import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface MultiTextInputProps {
    placeholder: string;
    values: string[];
    onChange: (values: string[]) => void;
}

const MultiTextInput = ({ placeholder, values, onChange }: MultiTextInputProps) => {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onChange([...values, text.trim()]);
      setText('');
    }
  };

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />
      <View style={styles.itemsContainer}>
      {
        values.map((value, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemText}>{value}</Text>
            <TouchableOpacity onPress={() => handleRemove(index)}>
              <Icon name="close-circle-outline" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))
      }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',   
  },
  itemContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },
  itemText: {
    marginRight: 2,
  },
});

export default MultiTextInput;