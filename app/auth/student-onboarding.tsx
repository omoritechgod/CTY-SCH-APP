import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, MapPin, GraduationCap, Check } from 'lucide-react-native';

const LOCATIONS = [
  'Lagos, Nigeria',
  'Abuja, Nigeria',
  'Port Harcourt, Nigeria',
  'Kano, Nigeria',
  'Ibadan, Nigeria',
  'Other',
];

const SAMPLE_SCHOOLS = {
  'Lagos, Nigeria': [
    'University of Lagos',
    'Lagos State University',
    'Yaba College of Technology',
    'Lagos Business School',
    'Pan-Atlantic University',
    'My school is not listed',
  ],
  'Abuja, Nigeria': [
    'University of Abuja',
    'Nile University',
    'Baze University',
    'African University of Science and Technology',
    'My school is not listed',
  ],
  'Port Harcourt, Nigeria': [
    'University of Port Harcourt',
    'Rivers State University',
    'Ignatius Ajuru University',
    'My school is not listed',
  ],
  'Kano, Nigeria': [
    'Bayero University Kano',
    'Northwest University',
    'My school is not listed',
  ],
  'Ibadan, Nigeria': [
    'University of Ibadan',
    'Lead City University',
    'The Polytechnic Ibadan',
    'My school is not listed',
  ],
  'Other': [
    'My school is not listed',
  ],
};

export default function StudentOnboardingScreen() {
  const [step, setStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');

  const handleContinue = () => {
    if (step === 1) {
      if (!selectedLocation) {
        Alert.alert('Error', 'Please select your location');
        return;
      }
      setStep(2);
    } else {
      if (!selectedSchool) {
        Alert.alert('Error', 'Please select your school');
        return;
      }
      router.replace('/(tabs)');
    }
  };

  const renderLocationStep = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Select Your Location</Text>
        <Text style={styles.subtitle}>Where are you located?</Text>
      </View>

      <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
        {LOCATIONS.map((location) => (
          <TouchableOpacity
            key={location}
            style={[
              styles.option,
              selectedLocation === location && styles.optionSelected,
            ]}
            onPress={() => setSelectedLocation(location)}
          >
            <MapPin size={20} color={selectedLocation === location ? '#2563EB' : '#9CA3AF'} />
            <Text style={[
              styles.optionText,
              selectedLocation === location && styles.optionTextSelected,
            ]}>
              {location}
            </Text>
            {selectedLocation === location && (
              <Check size={20} color="#2563EB" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  const renderSchoolStep = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Select Your School</Text>
        <Text style={styles.subtitle}>Choose your educational institution</Text>
      </View>

      <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
        {SAMPLE_SCHOOLS[selectedLocation as keyof typeof SAMPLE_SCHOOLS]?.map((school) => (
          <TouchableOpacity
            key={school}
            style={[
              styles.option,
              selectedSchool === school && styles.optionSelected,
            ]}
            onPress={() => setSelectedSchool(school)}
          >
            <GraduationCap size={20} color={selectedSchool === school ? '#2563EB' : '#9CA3AF'} />
            <Text style={[
              styles.optionText,
              selectedSchool === school && styles.optionTextSelected,
            ]}>
              {school}
            </Text>
            {selectedSchool === school && (
              <Check size={20} color="#2563EB" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  return (
    <LinearGradient colors={['#2563EB', '#7C3AED']} style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => step === 1 ? router.back() : setStep(1)}
      >
        <ArrowLeft size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(step / 2) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step {step} of 2</Text>
        </View>

        {step === 1 ? renderLocationStep() : renderSchoolStep()}

        <TouchableOpacity
          style={[
            styles.continueButton,
            (step === 1 && !selectedLocation) || (step === 2 && !selectedSchool) 
              ? styles.continueButtonDisabled : null,
          ]}
          onPress={handleContinue}
          disabled={(step === 1 && !selectedLocation) || (step === 2 && !selectedSchool)}
        >
          <Text style={styles.continueButtonText}>
            {step === 2 ? 'Complete Setup' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 120,
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  optionsContainer: {
    flex: 1,
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  optionSelected: {
    backgroundColor: '#FFFFFF',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  optionTextSelected: {
    color: '#2563EB',
    fontFamily: 'Inter-Medium',
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
});