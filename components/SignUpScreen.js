import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Icons for password visibility

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const isFormValid = name && email && password && confirmPassword && (password === confirmPassword);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Push content up on keyboard show
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Sign up to CTY School</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/fb_logo.png')} // Correct path to local asset
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/google_logo.png')} // Correct path to local asset
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.separatorContainer}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>OR</Text>
            <View style={styles.line} />
          </View>

          {/* Input Fields */}
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="rgba(0,0,0,0.5)" // Fix for iOS placeholder visibility
            value={name}
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()} // Move to next field
            blurOnSubmit={false}
            onChangeText={setName}
          />
          <TextInput
            ref={(input) => { this.emailInput = input; }} // Reference to move to this field
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(0,0,0,0.5)" // Fix for iOS placeholder visibility
            keyboardType="email-address"
            value={email}
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()} // Move to next field
            blurOnSubmit={false}
            onChangeText={setEmail}
          />

          {/* Password Field with Toggle */}
          <View style={styles.inputWithIcon}>
            <TextInput
              ref={(input) => { this.passwordInput = input; }} // Reference to move to this field
              style={[styles.input, { flex: 1 }]}
              placeholder="Password"
              placeholderTextColor="rgba(0,0,0,0.5)" // Fix for iOS placeholder visibility
              secureTextEntry={!passwordVisible}
              value={password}
              returnKeyType="next"
              onSubmitEditing={() => this.confirmPasswordInput.focus()} // Move to next field
              blurOnSubmit={false}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <AntDesign name={passwordVisible ? "eye" : "eyeo"} size={24} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Field with Toggle */}
          <View style={styles.inputWithIcon}>
            <TextInput
              ref={(input) => { this.confirmPasswordInput = input; }} // Reference to move to this field
              style={[styles.input, { flex: 1 }]}
              placeholder="Confirm Password"
              placeholderTextColor="rgba(0,0,0,0.5)" // Fix for iOS placeholder visibility
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              returnKeyType="done"
              onSubmitEditing={() => {
                if (isFormValid) {
                  navigation.navigate('MaintenanceScreen'); // Submit form
                }
              }}
              blurOnSubmit={false}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
              <AntDesign name={confirmPasswordVisible ? "eye" : "eyeo"} size={24} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[styles.signUpButton, { backgroundColor: isFormValid ? '#231395' : '#23139550' }]} // Reduced opacity for disabled state
            disabled={!isFormValid}
            onPress={() => navigation.navigate('MaintenanceScreen')} // Navigate to MaintenanceScreen
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#072859',
    marginBottom: 20,
    textAlign: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2, // Outline for the social icons
    borderColor: '#231395', // Color for the outline
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderColor: '#231395',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(94, 105, 112, 0.68)',
  },
  separatorText: {
    marginHorizontal: 10,
    color: 'rgba(94, 105, 112, 0.68)',
  },
  input: {
    backgroundColor: '#E0E0E0', // Darker input field color
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0', // Darker input field color
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  signUpButton: {
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#231395',
    fontWeight: 'bold',
  },
});
