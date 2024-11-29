import { FilterPopoverProps } from '@/app/types';
import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TextInput, ScrollView } from 'react-native';

const FilterPopover = ({ visible, onClose, onApply }: FilterPopoverProps) => {
    const [query, setQuery] = useState<string | undefined>();
    const [maxReadyTime, setMaxReadyTime] = useState<number | undefined>();
    const [minProtein, setMinProtein] = useState<number | undefined>();
    const [maxProtein, setMaxProtein] = useState<number | undefined>();
    const [minCarbs, setMinCarbs] = useState<number | undefined>();
    const [maxCarbs, setMaxCarbs] = useState<number | undefined>();
    const [minFat, setMinFat] = useState<number | undefined>();
    const [maxFat, setMaxFat] = useState<number | undefined>();
    const [minCalories, setMinCalories] = useState<number | undefined>();
    const [maxCalories, setMaxCalories] = useState<number | undefined>();
    const [minIngredients, setMinIngredients] = useState<number | undefined>();
    const [maxIngredients, setMaxIngredients] = useState<number | undefined>();
    const [error, setError] = useState<string | null>(null);

    const handleApply = () => {
        // Validate numeric inputs
        if (
            (minProtein !== undefined && maxProtein !== undefined && minProtein > maxProtein) ||
            (minCarbs !== undefined && maxCarbs !== undefined && minCarbs > maxCarbs) ||
            (minFat !== undefined && maxFat !== undefined && minFat > maxFat) ||
            (minCalories !== undefined && maxCalories !== undefined && minCalories > maxCalories) ||
            (minIngredients !== undefined && maxIngredients !== undefined && minIngredients > maxIngredients)
        ) {
            setError("Ensure that minimum values are not greater than maximum values.");
            return;
        }

        // Apply filters
        onApply({
            query: query?.trim(), // Trim whitespace
            maxReadyTime,
            minProtein,
            maxProtein,
            minCarbs,
            maxCarbs,
            minFat,
            maxFat,
            minCalories,
            maxCalories,
            minIngredients,
            maxIngredients,
        });
        setError(null);
        onClose();
    };

    const validateNumericInput = (value: string) => {
        const trimmedValue = value.trim();
        return trimmedValue === "" ? undefined : parseInt(trimmedValue, 10);
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView>
                        <Text style={styles.modalTitle}>Recipe Filters</Text>
                        <Text style={styles.subtext}>all filters are optional</Text>
                        {error && <Text style={styles.errorText}>{error}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Keyword Search"
                            placeholderTextColor="#3b4047"
                            keyboardType="default"
                            value={query}
                            onChangeText={(text) => setQuery(text.trimStart())} // Dynamically trim leading spaces
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Max Ready Time"
                            placeholderTextColor="#3b4047"
                            keyboardType="numeric"
                            value={maxReadyTime?.toString()}
                            onChangeText={(text) => setMaxReadyTime(validateNumericInput(text))}
                        />
                        {/* Example for Min and Max Inputs */}
                        <View style={styles.row}>
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Min Ingredients"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={minIngredients?.toString()}
                                onChangeText={(text) => setMinIngredients(validateNumericInput(text))}
                            />
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Max Ingredients"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={maxIngredients?.toString()}
                                onChangeText={(text) => setMaxIngredients(validateNumericInput(text))}
                            />
                        </View>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Min Protein"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={minProtein?.toString()}
                                onChangeText={(text) => setMinProtein(validateNumericInput(text))}
                            />
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Max Protein"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={maxProtein?.toString()}
                                onChangeText={(text) => setMaxProtein(validateNumericInput(text))}
                            />
                        </View>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Min Carbs"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={minCarbs?.toString()}
                                onChangeText={(text) => setMinCarbs(validateNumericInput(text))}
                            />
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Max Carbs"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={maxCarbs?.toString()}
                                onChangeText={(text) => setMaxCarbs(validateNumericInput(text))}
                            />
                        </View>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Min Fat"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={minFat?.toString()}
                                onChangeText={(text) => setMinFat(validateNumericInput(text))}
                            />
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Max Fat"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={maxFat?.toString()}
                                onChangeText={(text) => setMaxFat(validateNumericInput(text))}
                            />
                        </View>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Min Calories"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={minCalories?.toString()}
                                onChangeText={(text) => setMinCalories(validateNumericInput(text))}
                            />
                            <TextInput
                                style={styles.macroInput}
                                placeholder="Max Calories"
                                placeholderTextColor="#3b4047"
                                keyboardType="numeric"
                                value={maxCalories?.toString()}
                                onChangeText={(text) => setMaxCalories(validateNumericInput(text))}
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
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    subtext: {
        color: '#3b4047',
        marginTop: 5,
        marginBottom: 10,
        fontStyle: 'italic',
    }
});

export default FilterPopover;
