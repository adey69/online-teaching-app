import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { useParentDashboardScreen, type ActiveSession } from './useParentDashboardScreen';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'ParentDashboard'>;

type SessionCardProps = Readonly<{
  session: ActiveSession;
  onObserve: (id: string) => void;
}>;

function SessionCard({ session, onObserve }: SessionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardSubject}>{session.subject}</Text>
          <Text style={styles.cardChild}>{session.childName}</Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.observeButton,
            pressed && styles.observeButtonPressed,
          ]}
          onPress={() => onObserve(session.id)}
          accessibilityRole="button"
          accessibilityLabel={`Observe ${session.childName}'s ${session.subject} session`}
        >
          <Text style={styles.observeButtonText}>Observe ›</Text>
        </Pressable>
      </View>
      <View style={styles.cardMeta}>
        <Text style={styles.cardTeacher}>{session.teacherName}</Text>
        <Text style={styles.cardStartedAt}>Started {session.startedAt}</Text>
      </View>
    </View>
  );
}

export default function ParentDashboardScreen(props: Readonly<Props>) {
  const { activeSessions, handleLogout, handleObserveClass } =
    useParentDashboardScreen(props);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Parent</Text>
          <Pressable
            style={styles.switchRoleButton}
            onPress={handleLogout}
            accessibilityRole="button"
            accessibilityLabel="Switch role"
          >
            <Text style={styles.switchRoleText}>Switch Role</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Active Sessions</Text>

        {activeSessions.map(session => (
          <SessionCard
            key={session.id}
            session={session}
            onObserve={handleObserveClass}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
