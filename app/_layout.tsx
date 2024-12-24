import { Stack } from 'expo-router';
import { AppProvider } from '@/components/AppContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FilterPopover from '@/components/FilterPopover';
import React, { useState } from 'react';
import { Filters } from './types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import FilterIcon from '@/components/FilterIcon';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF5A5F',
  },
};



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
        <PaperProvider theme={theme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{
              headerTitle: 'MacroMatch',
              headerRight: () => (
                <TouchableOpacity
                  style={styles.filterContainer}
                  onPress={() => setFilterVisible(true)}
                >
                  <FilterIcon size={24}/>
                </TouchableOpacity>),
            }}
              initialParams={{ filters }}
            />
            <Stack.Screen name="RecipeInfoScreen" options={{
              headerTitle: 'MacroMatch',
              headerBackTitleVisible: false, // Hide the title next to the back arrow
            }} />
          </Stack>
          <FilterPopover
            visible={filterVisible}
            onClose={() => setFilterVisible(false)}
            onApply={handleApplyFilters}
          />
        </PaperProvider>

      </AppProvider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  filterContainer: {
    marginRight: 10, // Add space from the edge of the screen
  }
});
