import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Building, MapPin } from 'lucide-react-native';

export default function AdminOnboardingScreen() {
  const [schoolName, setSchoolName] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    if (!schoolName || !location) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1000);
  };

  return (
    <LinearGradient colors={['#2563EB', '#7C3AED']} style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>School Information</Text>
          <Text style={styles.subtitle}>Tell us about your school</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Building size={20} color="#9CA3AF" />
            <TextInput
              style={styles.input}
              placeholder="School name"
              placeholderTextColor="#9CA3AF"
              value={schoolName}
              onChangeText={setSchoolName}
            />
          </View>

          <View style={styles.inputContainer}>
            <MapPin size={20} color="#9CA3AF" />
            <TextInput
              style={styles.input}
              placeholder="School location"
              placeholderTextColor="#9CA3AF"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              As a school administrator, you'll be able to:
            </Text>
            <Text style={styles.infoList}>
              • Post school news and announcements{'\n'}
              • Add and manage staff members{'\n'}
              • Send email invitations to staff{'\n'}
              • Monitor school activity
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.completeButton, loading && styles.completeButtonDisabled]}
            onPress={handleComplete}
            disabled={loading}
          >
            <Text style={styles.completeButtonText}>
              {loading ? 'Setting up...' : 'Complete Setup'}
            </Text>
          </TouchableOpacity>
        </View>
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
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  form: {
    gap: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  infoList: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  completeButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  completeButtonDisabled: {
    opacity: 0.7,
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
});