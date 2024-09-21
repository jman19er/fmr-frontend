import React, { useState } from 'react';
import { Text, ScrollView, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useRoute } from '@react-navigation/native';
import { RecipeInfoScreenRouteProp } from './navigation';
import { useAppContext } from '@/components/AppContext';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

const RecipeInfoScreen = () => {
    const route = useRoute<RecipeInfoScreenRouteProp>();
    const router = useRouter();
    const { recipe } = route.params;

    const { addRecipe } = useAppContext();  
    const [checkedSteps, setCheckedSteps] = useState<boolean[]>(new Array(recipe.steps.length).fill(false));

    const toggleCheckbox = (index: number) => {
        const newCheckedSteps = [...checkedSteps];
        newCheckedSteps[index] = !newCheckedSteps[index];
        setCheckedSteps(newCheckedSteps);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => router.back()}>
                <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.title}>{recipe.title}</Text>
                <View style={styles.durationContainer}>
                    <Icon name="time-outline" size={20} color="#000" />
                    <Text> {recipe.duration} minutes</Text>
                </View>
                <Text style={styles.description}>{recipe.description}</Text>
                <Image source={{ uri: recipe.image }} style={styles.image} />
                <Text style={styles.heading}>Steps</Text>
                {recipe.steps.map((step: string, index: number) => (
                    <View key={index} style={styles.stepContainer}>
                        <CheckBox
                            value={checkedSteps[index]}
                            onValueChange={() => toggleCheckbox(index)}
                        />
                        <Text style={[styles.step, checkedSteps[index] && styles.checkedStep]}>
                            {index + 1}. {step}
                        </Text>
                    </View>
                ))}
                <Text style={styles.heading}>Ingredients</Text>
                {recipe.ingredients.map((ingredient: string, index: number) => (
                    <Text key={index} style={styles.ingredient}>{ingredient}</Text>
                ))}
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
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    step: {
        fontSize: 16,
        marginLeft: 8,
    },
    checkedStep: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    ingredient: {
        fontSize: 16,
        marginBottom: 4,
        textAlign: 'center', // Center text
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