import { useState, useCallback, useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import type { SessionRow } from '../../database/schema';
import { createWhiteboardRoom } from '../../services/whiteboardApi';
import {
  createSession,
  getLiveSessions,
  getSessionHistory,
  deleteAllSessions,
} from '../../database/repositories/sessionsRepository';

type Props = NativeStackScreenProps<RootStackParamList, 'TeacherDashboard'>;

export function useTeacherDashboardScreen({ navigation }: Readonly<Props>) {
  const [liveSessions, setLiveSessions] = useState<SessionRow[]>([]);
  const [pastSessions, setPastSessions] = useState<SessionRow[]>([]);
  const [showStartModal, setShowStartModal] = useState(false);
  const [classTitle, setClassTitle] = useState('');
  const [isStartingClass, setIsStartingClass] = useState(false);

  const loadSessions = useCallback(async () => {
    try {
      const [live, past] = await Promise.all([getLiveSessions(), getSessionHistory()]);
      setLiveSessions(live);
      setPastSessions(past);
    } catch (err) {
      console.error('[Teacher] Failed to load sessions:', err);
    }
  }, []);

  useEffect(() => {
    loadSessions();
    // Reload whenever this screen comes back into focus (e.g. after leaving classroom)
    const unsubscribe = navigation.addListener('focus', loadSessions);
    return unsubscribe;
  }, [loadSessions, navigation]);

  const handleLogout = useCallback(() => {
    navigation.replace('RoleSelect');
  }, [navigation]);

  const handleOpenStartModal = useCallback(() => {
    setClassTitle('');
    setShowStartModal(true);
  }, []);

  const handleCancelStart = useCallback(() => {
    setShowStartModal(false);
  }, []);

  const handleConfirmStart = useCallback(async () => {
    if (isStartingClass) { return; }
    const title = classTitle.trim() || 'New Class';
    setShowStartModal(false);
    setIsStartingClass(true);
    try {
      const room = await createWhiteboardRoom();
      const session = await createSession({
        title,
        subject: 'General',
        teacher_name: 'Teacher',
        whiteboard_room_uuid: room.uuid,
      });
      loadSessions();
      navigation.navigate('Classroom', {
        channelId: session.channel_id,
        roomUUID: room.uuid,
        role: 'teacher',
        title: session.title,
        sessionId: session.id,
      });
    } catch (err) {
      console.error('[Teacher] Failed to start class:', err);
    } finally {
      setIsStartingClass(false);
    }
  }, [isStartingClass, classTitle, navigation, loadSessions]);

  const handleRejoinSession = useCallback((session: SessionRow) => {
    navigation.navigate('Classroom', {
      channelId: session.channel_id,
      roomUUID: session.whiteboard_room_uuid,
      role: 'teacher',
      title: session.title,
      sessionId: session.id,
    });
  }, [navigation]);

  const handleClearAll = useCallback(async () => {
    try {
      await deleteAllSessions();
      setLiveSessions([]);
      setPastSessions([]);
    } catch (err) {
      console.error('[Teacher] Failed to clear sessions:', err);
    }
  }, []);

  return {
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
  };
}
