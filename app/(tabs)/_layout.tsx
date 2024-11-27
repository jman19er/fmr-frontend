import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAppContext } from '@/components/AppContext';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';

export default function TabsLayout() {
  const { notification } = useAppContext();

  const SavedTabIcon = ({ color }: { color: string }) => (
    <View style={styles.iconContainer}>
      <FontAwesome size={28} name="heart" color={color} />
      {notification && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>New</Text>
        </View>
      )}
    </View>
  );

  useEffect(() => { 
    console.log("Notification value: ", notification);
  }, [notification]);
  
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
        title: 'Explore',
        headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color}/>
      }} />

      <Tabs.Screen
        name="SavedScreen"
        options={{
          title: 'Saved',
          headerShown: false,
          tabBarIcon: SavedTabIcon,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -10, // Position the badge higher
    right: -15, // Move the badge further to the right
    backgroundColor: '#ff4d4d', // Sleek, modern red color
    borderRadius: 12, // Rounded shape
    paddingHorizontal: 6, // Adjust horizontal padding for text
    paddingVertical: 3, // Adjust vertical padding for sleekness
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3, // For Android shadow
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600', // Semi-bold for modern look
    textTransform: 'uppercase', // Uppercase for clean design
  },
});