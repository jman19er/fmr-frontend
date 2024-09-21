import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


export type RootStackParamList = {
  HomeScreen: undefined;
  RecipeInfoScreen: RecipeInfoScreenProps;
};

export type RecipeInfoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RecipeInfoScreen'
>;

export type RecipeInfoScreenRouteProp = RouteProp<
  RootStackParamList,
  'RecipeInfoScreen'
>;

export type RecipeInfoScreenProps = {
  recipe: Recipe;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;