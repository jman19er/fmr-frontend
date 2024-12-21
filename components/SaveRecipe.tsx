import { Recipe } from "@/app/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppContext } from "./AppContext";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";


export const SaveRecipe = ({ recipe }: { recipe: Recipe }) => {
    const { addRecipe, deleteRecipe, isRecipeSaved } = useAppContext();
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const handleToggleRecipe = (recipe: Recipe) => {
        if (isSaved) {
            deleteRecipe(recipe.title);
        } else {
            addRecipe(recipe);
        }
        setIsSaved(!isSaved);
    };

    useEffect(() => {
        setIsSaved(isRecipeSaved(recipe.title));
    });

    return (
            <TouchableOpacity
                onPress={() => handleToggleRecipe(recipe)}
                style={[styles.saveRecipeButton]}
            >
                <FontAwesome 
                    size={30}
                    name={isSaved ? 'heart' : 'heart-o' } // 'heart-o' for outlined, 'heart' for filled
                    color="#d9534f"
                 />
            </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    saveRecipeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        width: 60, // Button diameter
        height: 60, // Button diameter
        borderRadius: 30, // Half the width/height for a perfect circle
        backgroundColor: '#FFF', // Button background color
        justifyContent: 'center', // Center the icon inside the button
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