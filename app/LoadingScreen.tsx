import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Animated as a } from 'react-native';
import Animated, { SlideInDown } from "react-native-reanimated";

const LoadingScreen = () => {
  const spinValue = new a.Value(0);

  // Rotate animation
  a.loop(
    a.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        entering={SlideInDown}
      >
        <Text style={styles.title}>Cooking up something delicious...</Text>
        <View style={styles.animationContainer}>
          <a.Image
            style={[styles.image, { transform: [{ rotate: spin }] }]}
            source={require('../assets/images/padded-icon.png')}
          />
        </View>
        <Text style={styles.subtitle}>Hang tight, your perfect recipe is on the way!</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF5A5F',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 20,
    color: '#666',
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default LoadingScreen;
