import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './types'; // Import the types
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function App() {
  return (
    <View>
      <Text>Indexes are sexy</Text>
    </View>
  );
}