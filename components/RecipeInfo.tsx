import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import RecipeOverview from "./RecipeOverview";
import { CheckList } from "./CheckList";
import { renderIngredientItem } from "./RenderIngredientItem";
import { renderStepItem } from "./RenderStepItem";
import { Recipe } from "@/app/types";

export const RecipeInfo = ({ recipe }: { recipe: Recipe }) => {
    const ingredients = recipe?.extendedIngredients || [];
    const instructions = recipe.analyzedInstructions[0]?.steps || [];

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* Section 1 */}
            <Animated.View entering={SlideInRight} exiting={SlideOutRight} style={styles.card}>
                <RecipeOverview recipe={recipe} />
            </Animated.View>

            {/* Section 2 */}
            { ingredients.length > 0 && 
                <Animated.View entering={SlideInRight} exiting={SlideOutRight} style={styles.card}>
                    <CheckList items={ingredients} renderItem={renderIngredientItem} heading="Ingredients" />
                  </Animated.View>
            }
            { instructions.length > 0 &&
                <Animated.View entering={SlideInRight} exiting={SlideOutRight} style={styles.card}>
                    <CheckList items={instructions} renderItem={renderStepItem} heading="Steps"/>
                </Animated.View>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        marginVertical: 10,
        padding: 15,
        width: '90%',
    },
});
