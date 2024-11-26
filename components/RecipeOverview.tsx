import { Nutrient, Recipe } from '@/app/types';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface RecipeOverviewProps {
    recipe: Recipe;
}

const RecipeOverview: React.FC<RecipeOverviewProps> = ({ recipe }) => {
    const [aspectRatio, setAspectRatio] = useState<number | null>(null);

    useEffect(() => {
        Image.getSize(recipe.image, (width, height) => {
            setAspectRatio(width / height);
        });
    }, [recipe.image]);

    const findNutrient = (nutrients: Nutrient[], nutrient: string) => {
        return nutrients.find((n) => n.name === nutrient);
    }

    return (
        <View style={styles.card}>
            <Text style={styles.heading}>At a Glance</Text>

            <View style={styles.topSection}>
                {aspectRatio && (
                    <Image
                        style={[styles.image, { aspectRatio }]}
                        source={{ uri: recipe.image }}
                        resizeMode="cover"
                    />
                )}
            </View>
            <View style={styles.bottomSection}>
                <Text style={styles.title}>{recipe.title}</Text>
                <View style={styles.iconsContainer}>
                    <View style={styles.iconContainer}>
                        <Icon name="time-outline" size={20} color="#000" />
                        <Text style={styles.text}> {recipe.readyInMinutes} minutes</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="flash" size={20} color="#000" />
                        <Text style={styles.text}> {Math.floor(findNutrient(recipe.nutrition.nutrients, "Calories")!.amount)} calories</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="flash" size={20} color="#000" />
                        <Text style={styles.text}> {Math.floor(findNutrient(recipe.nutrition.nutrients, "Fat")!.amount)}{findNutrient(recipe.nutrition.nutrients, "Carbohydrates")!.unit} fat</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="flash" size={20} color="#000" />
                        <Text style={styles.text}> {Math.floor(findNutrient(recipe.nutrition.nutrients, "Carbohydrates")!.amount)}{findNutrient(recipe.nutrition.nutrients, "Carbohydrates")!.unit} carbs</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="flash" size={20} color="#000" />
                        <Text style={styles.text}> {Math.floor(findNutrient(recipe.nutrition.nutrients, "Protein")!.amount)}{findNutrient(recipe.nutrition.nutrients, "Protein")!.unit} protein</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="thumbs-up" size={20} color="#1dc420" />
                        <Text style={styles.text}> {Math.floor(recipe.aggregateLikes)} likes</Text>
                    </View>
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
        justifyContent: 'space-between', // Ensure content is spaced out
    },
    image: {
        width: '90%',
        aspectRatio: 16 / 9,
        borderRadius: 8,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
    },
    iconsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allows wrapping to the next row
        justifyContent: 'space-evenly', // Evenly distribute icons in the row
        marginTop: 5,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexBasis: '30%', // Each icon takes up 30% of the row width
        margin: 5, // Add some spacing between icons
    },    text: {
        color: '#000',
    },
});


export default RecipeOverview;
