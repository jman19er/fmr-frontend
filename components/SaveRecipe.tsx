import { Recipe } from "@/app/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppContext } from "./AppContext";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { HelperText } from "react-native-paper";


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
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => handleToggleRecipe(recipe)}
            >
                <FontAwesome
                    size={30}
                    name={isSaved ? 'heart' : 'heart-o'} // 'heart-o' for outlined, 'heart' for filled
                    color="#FF5A5F"
                />
            </TouchableOpacity>
            <HelperText type="info" visible={true}>
                { isSaved ? "saved to liked" : "add to liked" }
            </HelperText>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})