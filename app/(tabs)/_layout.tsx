import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAppContext } from '@/components/AppContext';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';

export default function TabsLayout() {
  const { notification } = useAppContext();

  const SavedTabIcon = ({ color }: { color: string }) => (
    <View style={styles.tabIconWrapper}>
      <FontAwesome size={25} name="heart" color={color} />
      {notification && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>New</Text>
        </View>
      )}
    </View>
  );

  useEffect(() => {
    console.log('Notification value: ', notification);
  }, [notification]);

  return (
    <Tabs>
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
    top: -6, // Slightly above the icon
    right: -6, // Slightly to the right
    backgroundColor: '#ff4d4d', // Modern red color
    borderRadius: 12, // Fully rounded
    paddingHorizontal: 5, // Adjust for sleekness
    paddingVertical: 2, // Adjust for sleekness
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // Android shadow
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600', // Semi-bold for modern look
    textTransform: 'uppercase', // Uppercase for sleek style
  },
});
