import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, Plus, X, BookOpen } from 'lucide-react-native';

interface TimetableEntry {
  id: number;
  subject: string;
  time: string;
  duration: string;
  location: string;
  instructor: string;
  day: string;
  color: string;
}

const SAMPLE_TIMETABLE: TimetableEntry[] = [
  {
    id: 1,
    subject: 'Mathematics',
    time: '08:00',
    duration: '1h 30m',
    location: 'Room 101',
    instructor: 'Dr. Smith',
    day: 'Monday',
    color: '#2563EB',
  },
  {
    id: 2,
    subject: 'Physics',
    time: '10:00',
    duration: '2h',
    location: 'Lab 201',
    instructor: 'Prof. Johnson',
    day: 'Monday',
    color: '#7C3AED',
  },
  {
    id: 3,
    subject: 'Chemistry',
    time: '14:00',
    duration: '1h 30m',
    location: 'Lab 301',
    instructor: 'Dr. Brown',
    day: 'Monday',
    color: '#059669',
  },
  {
    id: 4,
    subject: 'English Literature',
    time: '09:00',
    duration: '1h',
    location: 'Room 205',
    instructor: 'Ms. Davis',
    day: 'Tuesday',
    color: '#DC2626',
  },
  {
    id: 5,
    subject: 'History',
    time: '11:00',
    duration: '1h 30m',
    location: 'Room 102',
    instructor: 'Mr. Wilson',
    day: 'Tuesday',
    color: '#D97706',
  },
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const COLORS = ['#2563EB', '#7C3AED', '#059669', '#DC2626', '#D97706', '#0891B2'];

export default function TimetableScreen() {
  const [timetable, setTimetable] = useState(SAMPLE_TIMETABLE);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showModal, setShowModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    subject: '',
    time: '',
    duration: '',
    location: '',
    instructor: '',
    color: COLORS[0],
  });

  const handleAddEntry = () => {
    if (!newEntry.subject || !newEntry.time || !newEntry.duration) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const entry: TimetableEntry = {
      id: Date.now(),
      subject: newEntry.subject,
      time: newEntry.time,
      duration: newEntry.duration,
      location: newEntry.location,
      instructor: newEntry.instructor,
      day: selectedDay,
      color: newEntry.color,
    };

    setTimetable([...timetable, entry]);
    setNewEntry({
      subject: '',
      time: '',
      duration: '',
      location: '',
      instructor: '',
      color: COLORS[0],
    });
    setShowModal(false);
  };

  const getTodayClasses = () => {
    return timetable
      .filter(entry => entry.day === selectedDay)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Timetable</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowModal(true)}
        >
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.daysContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {DAYS.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDay === day && styles.selectedDayButton,
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={[
                styles.dayButtonText,
                selectedDay === day && styles.selectedDayButtonText,
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.dateHeader}>
          <Calendar size={20} color="#6B7280" />
          <Text style={styles.dateText}>
            {selectedDay}, {new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}
          </Text>
        </View>

        {getTodayClasses().length === 0 ? (
          <View style={styles.emptyState}>
            <BookOpen size={48} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No classes scheduled</Text>
            <Text style={styles.emptyDescription}>
              Add a new class to your {selectedDay} schedule
            </Text>
          </View>
        ) : (
          <View style={styles.classesContainer}>
            {getTodayClasses().map((entry, index) => (
              <View key={entry.id} style={styles.classCard}>
                <View style={[styles.colorBar, { backgroundColor: entry.color }]} />
                <View style={styles.classContent}>
                  <View style={styles.classHeader}>
                    <Text style={styles.classSubject}>{entry.subject}</Text>
                    <View style={styles.timeContainer}>
                      <Clock size={16} color="#6B7280" />
                      <Text style={styles.classTime}>
                        {formatTime(entry.time)} • {entry.duration}
                      </Text>
                    </View>
                  </View>
                  
                  {entry.location && (
                    <Text style={styles.classLocation}>📍 {entry.location}</Text>
                  )}
                  
                  {entry.instructor && (
                    <Text style={styles.classInstructor}>👨‍🏫 {entry.instructor}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Class</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <X size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Subject *</Text>
              <TextInput
                style={styles.textInput}
                value={newEntry.subject}
                onChangeText={(text) => setNewEntry({...newEntry, subject: text})}
                placeholder="Subject name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Time *</Text>
              <TextInput
                style={styles.textInput}
                value={newEntry.time}
                onChangeText={(text) => setNewEntry({...newEntry, time: text})}
                placeholder="08:00"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Duration *</Text>
              <TextInput
                style={styles.textInput}
                value={newEntry.duration}
                onChangeText={(text) => setNewEntry({...newEntry, duration: text})}
                placeholder="1h 30m"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.textInput}
                value={newEntry.location}
                onChangeText={(text) => setNewEntry({...newEntry, location: text})}
                placeholder="Room number or location"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Instructor</Text>
              <TextInput
                style={styles.textInput}
                value={newEntry.instructor}
                onChangeText={(text) => setNewEntry({...newEntry, instructor: text})}
                placeholder="Instructor name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Color</Text>
              <View style={styles.colorContainer}>
                {COLORS.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      newEntry.color === color && styles.selectedColor,
                    ]}
                    onPress={() => setNewEntry({...newEntry, color})}
                  />
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddEntry}
            >
              <Text style={styles.saveButtonText}>Add Class</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#2563EB',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dayButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F3F4F6',
  },
  selectedDayButton: {
    backgroundColor: '#2563EB',
  },
  dayButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  selectedDayButtonText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  classesContainer: {
    gap: 12,
  },
  classCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
  },
  colorBar: {
    width: 4,
  },
  classContent: {
    flex: 1,
    padding: 16,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  classSubject: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  classTime: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  classLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  classInstructor: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  modalActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});