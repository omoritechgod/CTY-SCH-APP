import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function GetStartedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CTY School</Text>
      <Text style={styles.description}>A complete solution for managing school activities.</Text>
      
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('SignUpScreen')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <View style={styles.signInSignUpContainer}>
        <Text>Sign in or </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
          <Text style={styles.linkText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#072859',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: 'rgba(94, 105, 112, 0.68)',
    textAlign: 'center',
    marginBottom: 40,
  },
  getStartedButton: {
    backgroundColor: '#231395', // Get Started button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInSignUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: '#231395',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
