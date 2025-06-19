import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, GraduationCap, Users, Shield } from 'lucide-react-native';

export default function RoleSelectionScreen() {
  const [selectedRole, setSelectedRole] = useState<string>('');

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Access assignments, chat, and school updates',
      icon: GraduationCap,
      color: '#059669',
    },
    {
      id: 'staff',
      title: 'Staff',
      description: 'Manage assignments and timetables',
      icon: Users,
      color: '#7C3AED',
    },
    {
      id: 'admin',
      title: 'School Admin',
      description: 'Full school management access',
      icon: Shield,
      color: '#DC2626',
    },
  ];

  const handleContinue = () => {
    if (selectedRole === 'student') {
      router.push('/auth/student-onboarding');
    } else if (selectedRole === 'admin') {
      router.push('/auth/admin-onboarding');
    } else {
      // Staff goes directly to tabs
      router.replace('/(tabs)');
    }
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
          <Text style={styles.title}>Choose Your Role</Text>
          <Text style={styles.subtitle}>Select how you'll be using CTY</Text>
        </View>

        <View style={styles.roleContainer}>
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <TouchableOpacity
                key={role.id}
                style={[
                  styles.roleOption,
                  isSelected && styles.roleOptionSelected,
                ]}
                onPress={() => setSelectedRole(role.id)}
              >
                <View style={[styles.iconContainer, { backgroundColor: role.color }]}>
                  <IconComponent size={32} color="#FFFFFF" />
                </View>
                <View style={styles.roleInfo}>
                  <Text style={styles.roleTitle}>{role.title}</Text>
                  <Text style={styles.roleDescription}>{role.description}</Text>
                </View>
                <View style={[
                  styles.radioButton,
                  isSelected && styles.radioButtonSelected,
                ]} />
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedRole && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedRole}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  roleContainer: {
    flex: 1,
    gap: 16,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roleOptionSelected: {
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  radioButtonSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
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