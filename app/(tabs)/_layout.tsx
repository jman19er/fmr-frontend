import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        title: '',
        headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
      }} />
      <Tabs.Screen name="SavedScreen" options={{
        title: '',
        headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
      }} />
    </Tabs>
  );
}