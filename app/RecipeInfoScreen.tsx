import React, { useState } from 'react';
import { Text, ScrollView, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useRoute } from '@react-navigation/native';
import { RecipeInfoScreenRouteProp } from './navigation';
import { useAppContext } from '@/components/AppContext';
import Icon from 'react-native-vector-icons/Ionicons';

const RecipeInfoScreen = () => {
    const route = useRoute<RecipeInfoScreenRouteProp>();
    const { recipe } = route.params;

    const { addRecipe } = useAppContext();
    const [checkedSteps, setCheckedSteps] = useState<boolean[]>(new Array(recipe.analyzedInstructions[0].steps.length).fill(false));
    const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(new Array(recipe.extendedIngredients.length).fill(false));

    const toggleCheckbox = (steps: boolean, index: number) => {
        if (steps) {
            const newCheckedSteps = [...checkedSteps];
            newCheckedSteps[index] = !newCheckedSteps[index];
            setCheckedSteps(newCheckedSteps);
        } else {
            const newCheckedIngredients = [...checkedIngredients];
            newCheckedIngredients[index] = !newCheckedIngredients[index];
            setCheckedIngredients(newCheckedIngredients);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.title}>{recipe.title}</Text>
                <View style={styles.durationContainer}>
                    <Icon name="time-outline" size={20} color="#000" />
                    <Text> {recipe.readyInMinutes} minutes</Text>
                </View>
                <Text style={styles.description}>{recipe.description}</Text>
                <Image source={{ uri: recipe.image }} style={styles.image} />
                <View style={styles.ingredientsContainer}>
                    <Text style={styles.heading}>Ingredients</Text>
                    {recipe.extendedIngredients.map((ingredient: string, index: number) => (
                        <View key={index} style={styles.ingredientContainer}>
                            <CheckBox
                                value={checkedIngredients[index]}
                                onValueChange={() => toggleCheckbox(false, index)}
                            />
                            <Text key={index} style={[styles.ingredient, checkedIngredients[index] && styles.checkedStep]}>
                                [ {ingredient.amount.toFixed(2)} {ingredient.unit}] {ingredient.originalName}
                            </Text>

                        </View>
                    ))}
                </View>
                <View style={styles.stepsContainer}>
                    <Text style={styles.heading}>Steps</Text>
                    {recipe.analyzedInstructions[0].steps.map((step: string, index: number) => (
                        <View key={index} style={styles.stepContainer}>
                            <CheckBox
                                value={checkedSteps[index]}
                                onValueChange={() => toggleCheckbox(true, index)}
                            />
                            <Text style={[styles.step, checkedSteps[index] && styles.checkedStep]}>
                                {step.step}
                            </Text>
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.saveForLaterButton} onPress={() => addRecipe(recipe)}>
                    <Text style={styles.text}>Save for Later</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Set background color to cover the whole screen
    },
    buttonContainer: {
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 1,
    },
    scrollViewContent: {
        padding: 16,
        paddingTop: 60, // Adjust to avoid overlap with the button
        alignItems: 'center',
    },
    title: {
        justifyContent: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center', // Center text
    },
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center', // Center text
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 16,
        borderRadius: 8,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        textAlign: 'center', // Center text
    },
    stepsContainer: {
        marginTop: 16,
        padding: 10,
    },
    ingredientsContainer: {
        marginTop: 16,
        padding: 10,
    },
    ingredientContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        width: '100%',
    },
    ingredient: {
        fontSize: 16,
        marginBottom: 4,
        padding: 10,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        width: '100%',
    },
    step: {
        marginLeft: 10,
        fontSize: 16,
        flex:1,
        flexWrap: 'wrap', // Ensure text wraps within the container
    },
    checkedStep: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    saveForLaterButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f0ad4e',
        borderRadius: 5,
        width: '100%',
    },
    text: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default RecipeInfoScreen;