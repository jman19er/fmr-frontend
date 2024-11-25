import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RecipeInfoScreenRouteProp } from './navigation';
import { RecipeInfo } from '@/components/RecipeInfo';


const RecipeInfoScreen = () => {
    const route = useRoute<RecipeInfoScreenRouteProp>();
    const { recipe } = route.params;

    return (
        <View style={styles.container}>
            <RecipeInfo recipe={recipe} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default RecipeInfoScreen;