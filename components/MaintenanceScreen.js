import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Dimensions } from 'react-native';

export default function MaintenanceScreen() {
  const bounceAnim = useRef(new Animated.Value(0)).current; // Create an animated value

  useEffect(() => {
    const bounce = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -10, // Move up
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0, // Move down
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start(); // Start the animation loop
    };

    bounce(); // Call the bounce animation
  }, [bounceAnim]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>We're working on it!</Text>
      <Text style={styles.description}>
        Our app is currently in development. Check back soon for updates!
      </Text>

      {/* Bouncing Image */}
      <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
        <Image
          source={require('../assets/working.png')} // Ensure your image path is correct
          style={styles.image}
        />
      </Animated.View>
    </View>
  );
}

const { width } = Dimensions.get('window'); // Get screen width for image scaling

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#072859',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#5E6970',
    textAlign: 'center',
    marginBottom: 40,
  },
  image: {
    width: width * 0.8, // 80% of screen width for better responsiveness
    height: 300, // Adjust height as needed
    resizeMode: 'contain',
  },
});
