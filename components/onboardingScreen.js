import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; // For the go-back arrow

export default function OnboardingScreen({ navigation }) {
  const [currentPage, setCurrentPage] = useState(0);

  const onboardingData = [
    {
      title: 'Track Homework',
      description: 'Easily manage all your assignments.',
      image: require('../assets/welcome1.png'), // Add your image path here
    },
    {
      title: 'Join Cohort',
      description: 'Collaborate and study with classmates.',
      image: require('../assets/woried2.png'), // Add your image path here
    },
    {
      title: 'Stay Updated',
      description: 'Get the latest school news and updates.',
      image: require('../assets/goodgrade3.png'), // Add your image path here
    },
  ];

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      navigation.navigate('GetStartedScreen'); // Navigate to Get Started screen when onboarding completes
    }
  };

  const handleSkip = () => {
    navigation.navigate('GetStartedScreen'); // Skip onboarding to Get Started screen
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSwipe = (gesture) => {
    if (gesture.nativeEvent.translationX > 50) {
      // Swipe right to go back
      handlePrevious();
    } else if (gesture.nativeEvent.translationX < -50) {
      // Swipe left to go forward
      handleNext();
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={handleSwipe}>
        <View style={styles.innerContainer}>
          {/* Go Back Arrow - Only show on second and third screens */}
          {currentPage > 0 && (
            <TouchableOpacity style={styles.goBack} onPress={handlePrevious}>
              <AntDesign name="arrowleft" size={24} color="#072859" />
            </TouchableOpacity>
          )}

          <View style={styles.imageContainer}>
            <Image source={onboardingData[currentPage].image} style={styles.image} />
          </View>

          <Text style={styles.title}>{onboardingData[currentPage].title}</Text>
          <Text style={styles.description}>{onboardingData[currentPage].description}</Text>

          <View style={styles.indicatorContainer}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  { opacity: index === currentPage ? 1 : 0.3 },
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSkip} style={styles.button}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(254, 254, 254, 0.68)', // Background color with opacity
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBack: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: '#35B2FF', // Outline color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 25, // Border radius for the image itself
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#072859',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'rgba(94, 105, 112, 0.68)', // Description color with opacity
    textAlign: 'center',
    marginBottom: 30,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#072859', // Indicator color
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 10,
    backgroundColor: '#35B2FF',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
