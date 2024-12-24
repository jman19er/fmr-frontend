import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAppContext } from '@/components/AppContext';
import { View, Text, StyleSheet } from 'react-native';
import { Badge } from 'react-native-paper';

export default function TabsLayout() {
  const { notification } = useAppContext();

  const SavedTabIcon = ({ color }: { color: string }) => (
    <View style={styles.tabIconWrapper}>
      <FontAwesome size={25} name="bookmark" color={color} />
      {notification && (
        <View style={styles.badge}>
          <Badge size={10} />
        </View>
      )}
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF5A5F',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={styles.tabIconWrapper}>
              <FontAwesome size={25} name="home" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="SavedScreen"
        options={{
          title: 'Saved',
          headerShown: false,
          tabBarIcon: SavedTabIcon,
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Info',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={styles.tabIconWrapper}>
              <FontAwesome size={25} name="info" color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconWrapper: {
    position: 'relative', // Position the badge
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    width: 50, // Fixed width for consistency
    height: 50, // Fixed height for consistency
    borderRadius: 25, // Keep circular
  },
  badge: {
    position: 'absolute',
    top: 6, // Slightly above the icon
    right: 6, // Slightly to the right

  },
});
