import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import type { SessionRow } from '../../database/schema';
import { useTeacherDashboardScreen } from './useTeacherDashboardScreen';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'TeacherDashboard'>;

type SessionCardProps = Readonly<{
  session: SessionRow;
  onPress?: () => void;
}>;

function SessionCard({ session, onPress }: SessionCardProps) {
  const isLive = session.status === 'live';
  const date = new Date(session.created_at);
  const timeStr = date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        onPress && pressed && styles.cardPressed,
      ]}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={1}>{session.title}</Text>
        <View style={isLive ? styles.badgeLive : styles.badgeCompleted}>
          <Text style={isLive ? styles.badgeTextLive : styles.badgeTextCompleted}>
            {isLive ? '● Live' : 'Done'}
          </Text>
        </View>
      </View>
      <Text style={styles.cardSubject}>{session.subject}</Text>
      <Text style={styles.cardTime}>{timeStr}</Text>
      {isLive && (
        <Text style={styles.cardRejoinHint}>Tap to rejoin</Text>
      )}
    </Pressable>
  );
}

export default function TeacherDashboardScreen(props: Readonly<Props>) {
  const {
    liveSessions,
    pastSessions,
    showStartModal,
    classTitle,
    setClassTitle,
    isStartingClass,
    handleLogout,
    handleOpenStartModal,
    handleCancelStart,
    handleConfirmStart,
    handleRejoinSession,
    handleClearAll,
  } = useTeacherDashboardScreen(props);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Teacher</Text>
          <Pressable
            style={styles.switchRoleButton}
            onPress={handleLogout}
            accessibilityRole="button"
            accessibilityLabel="Switch role"
          >
            <Text style={styles.switchRoleText}>Switch Role</Text>
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.startClassButton,
            (pressed || isStartingClass) && styles.startClassButtonPressed,
          ]}
          onPress={handleOpenStartModal}
          disabled={isStartingClass}
          accessibilityRole="button"
          accessibilityLabel="Start a new class"
        >
          <Text style={styles.startClassButtonText}>
            {isStartingClass ? 'Starting…' : '+ Start New Class'}
          </Text>
        </Pressable>

        {liveSessions.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Live Now</Text>
            {liveSessions.map(session => (
              <SessionCard
                key={session.id}
                session={session}
                onPress={() => handleRejoinSession(session)}
              />
            ))}
          </>
        )}

        {pastSessions.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Recent Sessions</Text>
            {pastSessions.map(session => (
              <SessionCard key={session.id} session={session} />
            ))}
          </>
        )}

        {liveSessions.length === 0 && pastSessions.length === 0 && (
          <Text style={styles.emptyText}>
            No sessions yet. Start a class to begin!
          </Text>
        )}

        {(liveSessions.length > 0 || pastSessions.length > 0) && (
          <Pressable
            style={({ pressed }) => [
              styles.clearAllButton,
              pressed && styles.clearAllButtonPressed,
            ]}
            onPress={handleClearAll}
            accessibilityRole="button"
            accessibilityLabel="Clear all sessions"
          >
            <Text style={styles.clearAllText}>Clear All Sessions</Text>
          </Pressable>
        )}
      </ScrollView>

      {/* ── Start Class Modal ── */}
      <Modal
        visible={showStartModal}
        transparent
        animationType="fade"
        onRequestClose={handleCancelStart}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Start New Class</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Class title (e.g. Algebra Lesson 3)"
              placeholderTextColor="#9CA3AF"
              value={classTitle}
              onChangeText={setClassTitle}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleConfirmStart}
            />
            <View style={styles.modalActions}>
              <Pressable
                style={({ pressed }) => [
                  styles.modalCancelButton,
                  pressed && styles.modalButtonPressed,
                ]}
                onPress={handleCancelStart}
                accessibilityRole="button"
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.modalConfirmButton,
                  pressed && styles.modalButtonPressed,
                ]}
                onPress={handleConfirmStart}
                accessibilityRole="button"
              >
                <Text style={styles.modalConfirmText}>Start</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}
