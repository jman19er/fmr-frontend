import { Stack } from 'expo-router';
import { AppProvider } from '@/components/AppContext';

export default function Layout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="RecipeInfoScreen" options={{ headerShown: false }} />
      </Stack>
    </AppProvider>
  );
}