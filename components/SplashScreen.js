import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#9189CA', '#C8C4E5', '#E3E1F2', '#F1F0F8', '#FFFFFF']}
        style={styles.background}
      >
        {/* Add your logo image below */}
        <Image 
          source={require('../assets/logo.png')} // Replace with the correct path to your logo
          style={styles.logo}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 205,
    height: 200,
    resizeMode: 'contain',
  },
});
