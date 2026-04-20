import { useState, useCallback, useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { getLiveSessions } from '../../database/repositories/sessionsRepository';

type Props = NativeStackScreenProps<RootStackParamList, 'StudentDashboard'>;

export type LiveClass = {
  id: string;
  title: string;
  teacherName: string;
  subject: string;
  participantCount: number;
  channelId: string;
  roomUUID: string;
};

export function useStudentDashboardScreen({ navigation }: Readonly<Props>) {
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);

  // Reload whenever the screen comes into focus — a teacher may have just started a class
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const sessions = await getLiveSessions();
        setLiveClasses(
          sessions.map(s => ({
            id: s.id,
            title: s.title,
            teacherName: s.teacher_name,
            subject: s.subject,
            participantCount: 1,
            channelId: s.channel_id,
            roomUUID: s.whiteboard_room_uuid,
          })),
        );
      } catch (err) {
        console.error('[Student] Failed to load live sessions:', err);
      }
    });
    return unsubscribe;
  }, [navigation]);

  const handleLogout = useCallback(() => {
    navigation.replace('RoleSelect');
  }, [navigation]);

  const handleJoinClass = useCallback(
    (id: string) => {
      const session = liveClasses.find(c => c.id === id);
      if (!session) { return; }
      navigation.navigate('Classroom', {
        channelId: session.channelId,
        roomUUID: session.roomUUID,
        role: 'student',
        title: session.title,
      });
    },
    [liveClasses, navigation],
  );

  return {
    liveClasses,
    handleLogout,
    handleJoinClass,
  };
}
