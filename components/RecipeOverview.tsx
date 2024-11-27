import { Nutrient, Recipe } from '@/app/types';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Share, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SaveRecipe } from './SaveRecipe';

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

    const openInBrowser = () => {
        Linking.openURL(recipe.sourceUrl).catch((err) => 
            console.error('Error opening the recipe in browser:', err)
        );
    };


    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this recipe: ${recipe.title}\n${recipe.sourceUrl}`,
            });
        } catch (error) {
            console.error('Error sharing the recipe:', error);
        }
    };

    const saveToPinterest = () => {
        const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
            recipe.sourceUrl
        )}&media=${encodeURIComponent(recipe.image)}&description=${encodeURIComponent(recipe.title)}`;
        Linking.openURL(pinterestUrl).catch((err) => 
            console.error('Error opening Pinterest URL:', err)
        );
    };

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
                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                            <Icon name="share-social-outline" size={28} color="#1e90ff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={openInBrowser}>
                            <Icon name="open-outline" size={28} color="#1e90ff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pinterestButton} onPress={saveToPinterest}>
                            <Icon name="logo-pinterest" size={28} color="#E60023" />
                        </TouchableOpacity>
                        <SaveRecipe recipe={recipe} />
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
        justifyContent: 'space-between',
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
        justifyContent: 'space-evenly',
        marginTop: 5,
    },
    iconContainer: {
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
        justifyContent: 'space-around', // Space between buttons
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
