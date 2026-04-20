import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { useStudentDashboardScreen, type LiveClass } from './useStudentDashboardScreen';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'StudentDashboard'>;

type ClassCardProps = Readonly<{
  liveClass: LiveClass;
  onJoin: (id: string) => void;
}>;

function ClassCard({ liveClass, onJoin }: ClassCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{liveClass.title}</Text>
          <Text style={styles.cardTeacher}>{liveClass.teacherName}</Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.joinButton,
            pressed && styles.joinButtonPressed,
          ]}
          onPress={() => onJoin(liveClass.id)}
          accessibilityRole="button"
          accessibilityLabel={`Join ${liveClass.title}`}
        >
          <Text style={styles.joinButtonText}>Join ›</Text>
        </Pressable>
      </View>
      <View style={styles.cardBottomRow}>
        <View style={styles.subjectTag}>
          <Text style={styles.subjectTagText}>{liveClass.subject}</Text>
        </View>
        <Text style={styles.participantText}>{liveClass.participantCount} joined</Text>
      </View>
    </View>
  );
}

export default function StudentDashboardScreen(props: Readonly<Props>) {
  const { liveClasses, handleLogout, handleJoinClass } = useStudentDashboardScreen(props);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Student</Text>
          <Pressable
            style={styles.switchRoleButton}
            onPress={handleLogout}
            accessibilityRole="button"
            accessibilityLabel="Switch role"
          >
            <Text style={styles.switchRoleText}>Switch Role</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Live Now</Text>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        {liveClasses.length === 0 ? (
          <Text style={styles.emptyText}>No live classes right now. Check back soon!</Text>
        ) : (
          liveClasses.map(liveClass => (
            <ClassCard
              key={liveClass.id}
              liveClass={liveClass}
              onJoin={handleJoinClass}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
