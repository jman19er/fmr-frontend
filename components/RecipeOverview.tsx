import { Nutrient, Recipe } from '@/app/types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SaveRecipe } from './SaveRecipe';
import { TryLaterButton } from './TryLaterButton';

interface RecipeOverviewProps {
    recipe: Recipe;
}

const RecipeOverview: React.FC<RecipeOverviewProps> = ({ recipe }) => {


    const findNutrient = (nutrients: Nutrient[], nutrient: string) => {
        return nutrients.find((n) => n.name === nutrient);
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.description}>{recipe.description}</Text>
            <View style={styles.bottomSection}>
                <View style={styles.infoRows}>
                    <View style={styles.iconContainer}>
                        <Icon name="time-outline" size={20} color="#000" />
                        <Text style={styles.text}> {recipe.readyInMinutes === 0 ? '?' : recipe.readyInMinutes} minutes</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="flash" size={20} color="#000" />
                        <Text style={styles.text}> {Math.floor(recipe.calories ?? 0)} calories</Text>
                    </View>
                    {
                        recipe.servings && (
                            <View style={styles.iconContainer}>
                                <Icon name="person" size={20} color="#000" />
                                <Text style={styles.text}> {recipe.servings} servings</Text>
                            </View>
                        )
                    }

                    <View style={styles.iconContainer}>
                        <Icon name="flash" size={20} color="#000" />
                        <Text style={styles.text}> {Math.floor(findNutrient(recipe.macroNutrients, "Fat")!.amount)}{findNutrient(recipe.macroNutrients, "Fat")!.unit} fat</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="flash" size={20} color="#000" />
                        <Text style={styles.text}> {Math.floor(findNutrient(recipe.macroNutrients, "Carbs")!.amount)}{findNutrient(recipe.macroNutrients, "Carbs")!.unit} carbs</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="flash" size={20} color="#000" />
                        <Text style={styles.text}> {Math.floor(findNutrient(recipe.macroNutrients, "Protein")!.amount)}{findNutrient(recipe.macroNutrients, "Protein")!.unit} protein</Text>
                    </View>
                </View>
                <View style={styles.saveRow}>
                    <SaveRecipe recipe={recipe} />
                    <TryLaterButton recipe={recipe} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    topSection: {
        alignItems: 'center',
    },
    bottomSection: {
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
    },
    image: {
        width: '90%',
        aspectRatio: 16 / 9,
        borderRadius: 8,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    description: {
        textAlign: 'center',
        fontSize: 14,
        color: '#666',
    },
    infoRows: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allows wrapping to the next row
        justifyContent: 'space-evenly', // Space between icons
        marginTop: 5,
    },
    saveRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    iconContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        flexBasis: '30%', // Each icon takes up 30% of the row width
        margin: 5,
    },
    text: {
        color: '#000',
    },
    actionRow: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allows buttons to wrap to the next row
        justifyContent: 'space-evenly', // Space between buttons
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: 5, // Reduced padding for compactness
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 5,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        margin: 5, // Margin for spacing between buttons
    },
    pinterestButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        margin: 5,
    },
});

export default RecipeOverview;
