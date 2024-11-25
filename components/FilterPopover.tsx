import { FilterPopoverProps } from '@/app/types';
import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const MAX_MACROS_DEFAULT = 10000000;

const FilterPopover = ({ visible, onClose, onApply }: FilterPopoverProps) => {
    const [query, setQuery] = useState<string | undefined>();
    const [maxReadyTime, setMaxReadyTime] = useState<number | undefined>();
    const [includeIngredients, setIncludeIngredients] = useState<string[]>([]);
    const [excludeIngredients, setExcludeIngredients] = useState<string[]>([]);
    const [minProtein, setMinProtein] = useState<number | undefined>();
    const [maxProtein, setMaxProtein] = useState<number | undefined>();
    const [minCarbs, setMinCarbs] = useState<number | undefined>();
    const [maxCarbs, setMaxCarbs] = useState<number | undefined>();
    const [minFat, setMinFat] = useState<number | undefined>();
    const [maxFat, setMaxFat] = useState<number | undefined>();
    const [minCalories, setMinCalories] = useState<number | undefined>();
    const [maxCalories, setMaxCalories] = useState<number | undefined>();

    const handleApply = () => {
        onApply({
            query,
            maxReadyTime,
            includeIngredients: includeIngredients.length > 0 ? includeIngredients.join(',') : undefined, // Convert array to comma-separated string or set to undefined
            excludeIngredients: excludeIngredients.length > 0 ? excludeIngredients.join(',') : undefined, // Similarly handle excludeIngredients
            minProtein,
            maxProtein,
            minCarbs,
            maxCarbs,
            minFat,
            maxFat,
            minCalories,
            maxCalories,
        });
        onClose();
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView>
                        <Text style={styles.modalTitle}>Filter Recipes</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Keyword Search"
                            placeholderTextColor="#3b4047"
                            keyboardType="default"
                            value={query}
                            onChangeText={setQuery}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Max Ready Time"
                            placeholderTextColor="#3b4047"
                            keyboardType="numeric"
                            value={maxReadyTime?.toString()}
                            onChangeText={(text) => setMaxReadyTime(text ? parseInt(text, 10) : undefined)}
                        />
                        <Text style={styles.sectionTitle}>Macros</Text>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Min Protein"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={minProtein?.toString()}
                                onChangeText={(text) => setMinProtein(text ? parseInt(text, 10) : undefined)}
                            />
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Max Protein"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={maxProtein?.toString()}
                                onChangeText={(text) => setMaxProtein(text ? parseInt(text, 10) : undefined)}
                            />
                        </View>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Min Carbs"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={minCarbs?.toString()}
                                onChangeText={(text) => setMinCarbs(text ? parseInt(text, 10) : undefined)}
                            />
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Max Carbs"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={maxCarbs?.toString()}
                                onChangeText={(text) => setMaxCarbs(text ? parseInt(text, 10) : undefined)}
                            />
                        </View>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Min Fat"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={minFat?.toString()}
                                onChangeText={(text) => setMinFat(text ? parseInt(text, 10) : undefined)}
                            />
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Max Fat"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={maxFat?.toString()}
                                onChangeText={(text) => setMaxFat(text ? parseInt(text, 10) : undefined)}
                            />
                        </View>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Min Calories"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={minCalories?.toString()}
                                onChangeText={(text) => setMinCalories(text ? parseInt(text, 10) : undefined)}
                            />
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Max Calories"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={maxCalories?.toString()}
                                onChangeText={(text) => setMaxCalories(text ? parseInt(text, 10) : undefined)}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Apply" onPress={handleApply} />
                            <Button title="Close" onPress={onClose} />
                        </View>
                    </ScrollView>
                </View>
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        height: '90%',
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    macroInput: {
        width: '45%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default FilterPopover;