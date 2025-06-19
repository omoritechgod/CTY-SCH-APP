import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MessageCircle, Send, Users, Plus } from 'lucide-react-native';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isGroup: boolean;
  avatar: string;
}

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  isMe: boolean;
}

const SAMPLE_CHATS: Chat[] = [
  {
    id: 1,
    name: 'Study Group - Math',
    lastMessage: 'Hey everyone, did you solve problem 15?',
    timestamp: '2m',
    unreadCount: 3,
    isGroup: true,
    avatar: '#7C3AED',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    lastMessage: 'Can you help me with the essay?',
    timestamp: '1h',
    unreadCount: 1,
    isGroup: false,
    avatar: '#059669',
  },
  {
    id: 3,
    name: 'Science Lab Team',
    lastMessage: 'Meeting tomorrow at 3 PM',
    timestamp: '3h',
    unreadCount: 0,
    isGroup: true,
    avatar: '#DC2626',
  },
  {
    id: 4,
    name: 'Mike Chen',
    lastMessage: 'Thanks for the notes!',
    timestamp: '1d',
    unreadCount: 0,
    isGroup: false,
    avatar: '#D97706',
  },
];

const SAMPLE_MESSAGES: Message[] = [
  {
    id: 1,
    text: 'Hey everyone! How are you doing with the math assignment?',
    sender: 'Sarah',
    timestamp: '10:30 AM',
    isMe: false,
  },
  {
    id: 2,
    text: 'I\'m struggling with problem 15. Anyone figured it out?',
    sender: 'Mike',
    timestamp: '10:32 AM',
    isMe: false,
  },
  {
    id: 3,
    text: 'Yes! I can help. It\'s about applying the quadratic formula.',
    sender: 'You',
    timestamp: '10:33 AM',
    isMe: true,
  },
  {
    id: 4,
    text: 'That would be great! Can you walk us through it?',
    sender: 'Sarah',
    timestamp: '10:35 AM',
    isMe: false,
  },
];

export default function ChatScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const renderChatList = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.newChatButton}>
          <Plus size={24} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#9CA3AF" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
        {SAMPLE_CHATS.filter(chat => 
          chat.name.toLowerCase().includes(searchText.toLowerCase())
        ).map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={styles.chatItem}
            onPress={() => setSelectedChat(chat)}
          >
            <View style={[styles.avatar, { backgroundColor: chat.avatar }]}>
              {chat.isGroup ? (
                <Users size={20} color="#FFFFFF" />
              ) : (
                <Text style={styles.avatarText}>{chat.name.charAt(0)}</Text>
              )}
            </View>
            
            <View style={styles.chatInfo}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{chat.name}</Text>
                <Text style={styles.chatTime}>{chat.timestamp}</Text>
              </View>
              <View style={styles.chatPreview}>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
                {chat.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{chat.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  const renderChatView = () => (
    <KeyboardAvoidingView 
      style={styles.chatView} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.chatHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setSelectedChat(null)}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.chatTitleContainer}>
          <View style={[styles.smallAvatar, { backgroundColor: selectedChat!.avatar }]}>
            {selectedChat!.isGroup ? (
              <Users size={16} color="#FFFFFF" />
            ) : (
              <Text style={styles.smallAvatarText}>{selectedChat!.name.charAt(0)}</Text>
            )}
          </View>
          <Text style={styles.chatTitle}>{selectedChat!.name}</Text>
        </View>
      </View>

      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isMe ? styles.myMessage : styles.otherMessage,
            ]}
          >
            {!message.isMe && (
              <Text style={styles.senderName}>{message.sender}</Text>
            )}
            <View style={[
              styles.messageBubble,
              message.isMe ? styles.myMessageBubble : styles.otherMessageBubble,
            ]}>
              <Text style={[
                styles.messageText,
                message.isMe ? styles.myMessageText : styles.otherMessageText,
              ]}>
                {message.text}
              </Text>
            </View>
            <Text style={styles.messageTime}>{message.timestamp}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Type a message..."
          value={messageText}
          onChangeText={setMessageText}
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSendMessage}
        >
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {selectedChat ? renderChatView() : renderChatList()}
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
  newChatButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  chatTime: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  chatPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  unreadBadge: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  chatView: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2563EB',
  },
  chatTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallAvatarText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  chatTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  myMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  senderName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 4,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  myMessageBubble: {
    backgroundColor: '#2563EB',
  },
  otherMessageBubble: {
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#111827',
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#2563EB',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});