import { ScrollView } from "react-native-gesture-handler";
import { Linking, StyleSheet, Text, View } from 'react-native';
import Animated, { SlideInLeft, SlideInRight, SlideOutRight } from "react-native-reanimated";
import RecipeOverview from "./RecipeOverview";
import { CheckList } from "./CheckList";
import { renderIngredientItem } from "./RenderIngredientItem";
import { Recipe } from "@/app/types";
import OpenUrlButton from "./OpenUrlButton";

export const RecipeInfo = ({ recipe }: { recipe: Recipe }) => {
    const ingredients = recipe?.extendedIngredients || [];
    
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* Section 1 */}
            <Animated.View 
                entering={SlideInLeft} 
                exiting={SlideOutRight} 
                style={styles.card} 
                key={`recipe-overview-${recipe.id}`} // Unique key for re-rendering
            >
                <RecipeOverview recipe={recipe} />
            </Animated.View>

            {/* Section 2 */}
            { ingredients.length > 0 && 
                <Animated.View 
                    entering={SlideInLeft} 
                    exiting={SlideOutRight} 
                    style={styles.card} 
                    key={`ingredients-${recipe.id}`} // Unique key for re-rendering
                >                    
                    <CheckList items={ingredients} renderItem={renderIngredientItem} heading="Ingredients" />
                </Animated.View>
            }
            <Animated.View 
                entering={SlideInLeft} 
                exiting={SlideOutRight} 
                style={styles.card} 
                key={`instructions-${recipe.id}`} // Unique key for re-rendering
            >                    
            <Text style={styles.heading}>Instructions</Text>
            <OpenUrlButton 
                url={recipe.sourceUrl}
                children={
                    <View style={styles.linkButtonContainer}>
                    <Text style={styles.linkButtonText}>
                      <Text style={styles.icon}>📖 </Text>
                      Open Full Instructions
                    </Text>
                  </View>
                }
            />
        </Animated.View>
            
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
        zIndex: 1,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    linkButtonText: {
        flexDirection: 'row',
        color: '#fff', // White text for contrast
        fontSize: 14, // Maintain readability while being compact
        fontWeight: '600', // Semi-bold for emphasis
        textAlign: 'center',
        letterSpacing: 0.3, // Keep slight spacing
    },
    icon: {
        fontSize: 14, // Match icon size to text
    },
    linkButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF5A5F', // Vibrant red
        borderRadius: 12, // Reduced corners for a slimmer appearance
        paddingVertical: 6, // Minimal vertical padding for a skinny look
        paddingHorizontal: 16, // Narrower button width
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3, // Subtle shadow
    },
});
