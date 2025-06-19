import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, BookOpen, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, X, Calendar } from 'lucide-react-native';

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  description: string;
  priority: 'high' | 'medium' | 'low';
}

const SAMPLE_ASSIGNMENTS: Assignment[] = [
  {
    id: 1,
    title: 'Essay on Climate Change',
    subject: 'Environmental Science',
    dueDate: '2025-01-22',
    status: 'pending',
    description: 'Write a 1500-word essay on the impact of climate change',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Mathematical Problem Set #5',
    subject: 'Mathematics',
    dueDate: '2025-01-25',
    status: 'pending',
    description: 'Complete problems 1-20 from chapter 8',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'History Timeline Project',
    subject: 'History',
    dueDate: '2025-01-18',
    status: 'completed',
    description: 'Create a timeline of major historical events',
    priority: 'low',
  },
];

export default function AssignmentsScreen() {
  const [assignments, setAssignments] = useState(SAMPLE_ASSIGNMENTS);
  const [showModal, setShowModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    dueDate: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
  });

  const handleCreateAssignment = () => {
    if (!newAssignment.title || !newAssignment.subject || !newAssignment.dueDate) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const assignment: Assignment = {
      id: Date.now(),
      title: newAssignment.title,
      subject: newAssignment.subject,
      dueDate: newAssignment.dueDate,
      status: 'pending',
      description: newAssignment.description,
      priority: newAssignment.priority,
    };

    setAssignments([assignment, ...assignments]);
    setNewAssignment({
      title: '',
      subject: '',
      dueDate: '',
      description: '',
      priority: 'medium',
    });
    setShowModal(false);
  };

  const toggleAssignmentStatus = (id: number) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === id 
        ? { ...assignment, status: assignment.status === 'completed' ? 'pending' : 'completed' }
        : assignment
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} color="#059669" />;
      case 'overdue':
        return <AlertCircle size={20} color="#DC2626" />;
      default:
        return <Clock size={20} color="#D97706" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#D1FAE5';
      case 'overdue':
        return '#FEE2E2';
      default:
        return '#FEF3C7';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#DC2626';
      case 'medium':
        return '#D97706';
      default:
        return '#059669';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const pendingAssignments = assignments.filter(a => a.status === 'pending');
  const completedAssignments = assignments.filter(a => a.status === 'completed');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Assignments</Text>
          <Text style={styles.headerSubtitle}>
            {pendingAssignments.length} pending, {completedAssignments.length} completed
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowModal(true)}
        >
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {pendingAssignments.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending</Text>
            {pendingAssignments.map((assignment) => (
              <TouchableOpacity
                key={assignment.id}
                style={styles.assignmentCard}
                onPress={() => toggleAssignmentStatus(assignment.id)}
              >
                <View style={styles.assignmentHeader}>
                  <View style={styles.assignmentInfo}>
                    <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                    <Text style={styles.assignmentSubject}>{assignment.subject}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(assignment.status) }]}>
                    {getStatusIcon(assignment.status)}
                  </View>
                </View>
                
                <Text style={styles.assignmentDescription}>{assignment.description}</Text>
                
                <View style={styles.assignmentFooter}>
                  <View style={styles.dueDateContainer}>
                    <Calendar size={16} color="#6B7280" />
                    <Text style={styles.dueDate}>Due {formatDate(assignment.dueDate)}</Text>
                  </View>
                  <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(assignment.priority) }]}>
                    <Text style={styles.priorityText}>{assignment.priority}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {completedAssignments.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completed</Text>
            {completedAssignments.map((assignment) => (
              <TouchableOpacity
                key={assignment.id}
                style={[styles.assignmentCard, styles.completedCard]}
                onPress={() => toggleAssignmentStatus(assignment.id)}
              >
                <View style={styles.assignmentHeader}>
                  <View style={styles.assignmentInfo}>
                    <Text style={[styles.assignmentTitle, styles.completedTitle]}>
                      {assignment.title}
                    </Text>
                    <Text style={styles.assignmentSubject}>{assignment.subject}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(assignment.status) }]}>
                    {getStatusIcon(assignment.status)}
                  </View>
                </View>
                
                <Text style={styles.assignmentDescription}>{assignment.description}</Text>
                
                <View style={styles.assignmentFooter}>
                  <View style={styles.dueDateContainer}>
                    <Calendar size={16} color="#6B7280" />
                    <Text style={styles.dueDate}>Due {formatDate(assignment.dueDate)}</Text>
                  </View>
                  <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(assignment.priority) }]}>
                    <Text style={styles.priorityText}>{assignment.priority}</Text>
                  </View>
                </View>
              </TouchableOpacity>
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
            <Text style={styles.modalTitle}>New Assignment</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <X size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Title *</Text>
              <TextInput
                style={styles.textInput}
                value={newAssignment.title}
                onChangeText={(text) => setNewAssignment({...newAssignment, title: text})}
                placeholder="Assignment title"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Subject *</Text>
              <TextInput
                style={styles.textInput}
                value={newAssignment.subject}
                onChangeText={(text) => setNewAssignment({...newAssignment, subject: text})}
                placeholder="Subject name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Due Date *</Text>
              <TextInput
                style={styles.textInput}
                value={newAssignment.dueDate}
                onChangeText={(text) => setNewAssignment({...newAssignment, dueDate: text})}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={newAssignment.description}
                onChangeText={(text) => setNewAssignment({...newAssignment, description: text})}
                placeholder="Assignment description"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Priority</Text>
              <View style={styles.priorityContainer}>
                {['high', 'medium', 'low'].map((priority) => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.priorityButton,
                      newAssignment.priority === priority && styles.priorityButtonSelected,
                    ]}
                    onPress={() => setNewAssignment({...newAssignment, priority: priority as any})}
                  >
                    <Text style={[
                      styles.priorityButtonText,
                      newAssignment.priority === priority && styles.priorityButtonTextSelected,
                    ]}>
                      {priority}
                    </Text>
                  </TouchableOpacity>
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
              style={styles.createButton}
              onPress={handleCreateAssignment}
            >
              <Text style={styles.createButtonText}>Create</Text>
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
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#2563EB',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  assignmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  completedCard: {
    opacity: 0.7,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  assignmentSubject: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2563EB',
  },
  statusBadge: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignmentDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  assignmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dueDate: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  priorityButtonSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  priorityButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textTransform: 'capitalize',
  },
  priorityButtonTextSelected: {
    color: '#FFFFFF',
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
  createButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});