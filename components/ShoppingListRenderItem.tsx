import { SavedIngredient } from "@/app/types";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import {StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { AppContextType } from "./AppContext";

export const ShoppingListRenderItem = ({item, navigation, contextData}: {item: SavedIngredient, navigation: any, contextData: AppContextType}) => {
    // need this to store list of recips, not just one. Each recipe in the list should link back to that recipe's info page
    const decrementShoppingListItem = contextData.decrementShoppingListItem;
    const deleteFromShoppingList = contextData.deleteFromShoppingList;
    const renderRightActions = (itemId: string) => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteFromShoppingList(itemId)}>
            <Icon name="trash-outline" size={30} color="#fff" />
        </TouchableOpacity>
    );
    return (
    <Swipeable renderRightActions={() => renderRightActions(item.name)}>
        <View style={styles.recipeItem}>
            <Text style={styles.recipeTitle}>{item.amount} {item.unit} {item.name}</Text>
        </View>
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
