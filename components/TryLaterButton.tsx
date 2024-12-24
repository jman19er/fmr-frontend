import { Recipe } from "@/app/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppContext } from "./AppContext";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { HelperText } from "react-native-paper";


export const TryLaterButton = ({ recipe }: { recipe: Recipe }) => {
    const { addRecipeToTry, deleteRecipeToTry, isRecipeToTry } = useAppContext();
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const handleToggleRecipe = (recipe: Recipe) => {
        if (isSaved) {
            deleteRecipeToTry(recipe.title);
        } else {
            addRecipeToTry(recipe);
        }
        setIsSaved(!isSaved);
    };

    useEffect(() => {
        setIsSaved(isRecipeToTry(recipe.title));
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => handleToggleRecipe(recipe)}
            >
                <FontAwesome 
                    size={30}
                    name={isSaved? 'bookmark' : 'bookmark-o'} // 'heart-o' for outlined, 'heart' for filled
                    color="#FF5A5F"
                    />
            </TouchableOpacity>
            <HelperText type="info" visible={true}>
                { isSaved ? "saved to try later" : "add to try later" }
            </HelperText>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});