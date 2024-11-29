import { Stack } from 'expo-router';
import { AppProvider } from '@/components/AppContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FilterPopover from '@/components/FilterPopover';
import React, { useState } from 'react';
import { Filters } from './types';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();


export default function Layout() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({});
  const navigation = useNavigation<any>();

  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
    setFilterVisible(false);
    navigation.setParams({ filters: newFilters }); // Update the filters dynamically
  };
  return (
    <GestureHandlerRootView>
      <AppProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{
            headerTitle: 'What\'s for Dinner?', // Hide the title next to the back arrow
            headerRight: () => (
              <TouchableOpacity
              style={styles.filterContainer}
              onPress={() => setFilterVisible(true)}
            >
              <View style={styles.iconTextWrapper}>
                <Icon name="filter-outline" size={24} color="#000" />
                <Text style={styles.filterText}>Filters</Text>
              </View>
            </TouchableOpacity>            ),
            }}
            initialParams={{ filters }}
          />
          <Stack.Screen name="RecipeInfoScreen" options={{
            headerTitle: 'What\'s for Dinner?',
            headerBackTitleVisible: false, // Hide the title next to the back arrow
          }} />
        </Stack>
        <FilterPopover
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          onApply={handleApplyFilters}
        />
      </AppProvider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  filterContainer: {
    marginRight: 10, // Add space from the edge of the screen
  },
  iconTextWrapper: {
    flexDirection: 'column', // Icon and text aligned horizontally
    alignItems: 'center', // Center them vertically
  },
  filterText: {
    marginLeft: 4, // Space between icon and text
    fontSize: 12, // Modern, small font size
    color: '#555', // Subtle, neutral color
    fontWeight: '300', // Light font for a sleek look
    letterSpacing: 0.5, // Slight spacing for a modern touch
    textTransform: 'capitalize', // Text looks polished and clean
  },
});
