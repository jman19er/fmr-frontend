import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Card, Button, Headline, Paragraph, Text } from 'react-native-paper';
import FilterIcon from './FilterIcon';


export default function IntroScreen({findNewRecipe}: {findNewRecipe: () => void}) {
  return (
    <SafeAreaView style={styles.container}>
      {/* A Card wrapper for neat padding and elevation */}
      <Card style={styles.card}>
        <Card.Content>
          <Headline style={styles.headline}>Welcome to your personal recipe explorer!</Headline>
          
          <Paragraph style={styles.paragraph}>
            Set your (<FilterIcon size={16}/>)
            to discover the perfect meal—whether you’re craving low-carb, high-protein, or
            vegetarian options. We’ll instantly generate a recipe that fits your needs.
          </Paragraph>

          <Paragraph style={styles.paragraph}>
            <Text style={styles.bold}>See something you like?</Text>
            {'\n'}• Save the recipe for later.
            {'\n'}• Add individual ingredients to your grocery list.
            {'\n'}• Show your appreciation by liking it!
          </Paragraph>

          <Paragraph style={styles.paragraph}>
            Ready to explore? Press <Text style={styles.bold}>“Next Recipe”</Text> to get started. Bon appétit!
          </Paragraph>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          {/* Modern button from react-native-paper */}
          <Button 
            mode="contained" 
            onPress={findNewRecipe} 
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Next Recipe
          </Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // center card vertically
    padding: 20,
    backgroundColor: '#F3F4F6', // Slightly off-white background, modern look
  },
  card: {
    borderRadius: 12,          // Rounded corners for a modern feel
    elevation: 3,              // Subtle shadow on Android
    shadowColor: '#000',       // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  headline: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '700',
    color: '#333333',
  },
  paragraph: {
    textAlign: 'left',
    lineHeight: 22,
    color: '#555555',
    marginBottom: 10,
  },
  bold: {
    fontWeight: '700',
    color: '#333',
  },
  actions: {
    justifyContent: 'center',  // center the button horizontally
    marginBottom: 16,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FF5A5F', // Paper's default primary color
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
