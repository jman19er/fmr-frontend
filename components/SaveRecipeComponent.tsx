import { Recipe } from "@/app/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppContext } from "./AppContext";
import { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";


export const SaveRecipeComponent = ({ recipe }: { recipe: Recipe }) => {
    const { addRecipe, deleteRecipe, isRecipeSaved } = useAppContext();
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const handleToggleRecipe = (recipe: Recipe) => {
        if (isSaved) {
            deleteRecipe(recipe.id);
        } else {
            addRecipe(recipe);
        }
        setIsSaved(!isSaved);
    };

    useEffect(() => {
        setIsSaved(isRecipeSaved(recipe.id));
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{ ...styles.saveForLaterButton, backgroundColor: isSaved ? '#d9534f' : '#5cb85c' }}
                onPress={() => handleToggleRecipe(recipe)}
            >
                <Text style={styles.text}>{isSaved ? "Remove from Saved" : "Save for Later"}</Text>
            </TouchableOpacity>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%', // Ensures the container takes full width of the parent
        alignItems: 'center', // Centers the button horizontally
        marginTop: 15,
    },
    saveForLaterButton: {
        marginTop: 10,
        paddingVertical: 12,
        borderRadius: 25, // Fully rounded button
        minWidth: 200, // Minimum width of 200
        width: '80%', // Fit button nicely on the screen
        alignSelf: 'center', // Center button
        alignItems: 'center',
    },
    saveForLaterText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        color: '#fff',
        textAlign: 'center',
    },
})