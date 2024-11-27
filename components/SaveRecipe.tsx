import { Recipe } from "@/app/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppContext } from "./AppContext";
import { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";


export const SaveRecipe = ({ recipe }: { recipe: Recipe }) => {
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
            <TouchableOpacity
                onPress={() => handleToggleRecipe(recipe)}
                style={styles.saveRecipeButton}
            >
                <FontAwesome 
                    size={28}
                    name={isSaved ? 'heart-o' : 'heart'} // 'heart-o' for outlined, 'heart' for filled
                    color="#d9534f"
                 />
            </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    saveRecipeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 5,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        margin: 5,
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