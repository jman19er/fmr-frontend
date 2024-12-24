import { Recipe } from "@/app/types";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import {StyleSheet, Text} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { AppContextType } from "./AppContext";

export const LikedRecipeRenderItem = ({item, navigation, contextData}: {item: Recipe, navigation: any, contextData: AppContextType}) => {
    const deleteRecipe = contextData.deleteRecipe;
    const renderRightActions = (itemId: string) => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRecipe(itemId)}>
            <Icon name="trash-outline" size={30} color="#fff" />
        </TouchableOpacity>
    );
    return (
    <Swipeable renderRightActions={() => renderRightActions(item.title)}>
        <TouchableOpacity style={styles.recipeItem} onPress={() => navigation.navigate('RecipeInfoScreen', { recipe: item })}>
            <Text style={styles.recipeTitle}>{item.title}</Text>
        </TouchableOpacity>
    </Swipeable>
    );
};

const styles = StyleSheet.create({
    recipeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    recipeTitle: {
        fontSize: 18,
    },
    savedRecipeThumbnail: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: '100%',
    }

});
