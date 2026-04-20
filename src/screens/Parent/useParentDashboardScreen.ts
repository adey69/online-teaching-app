import { useCallback } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ParentDashboard'>;

export type ActiveSession = {
  id: string;
  childName: string;
  subject: string;
  teacherName: string;
  startedAt: string;
};

const MOCK_ACTIVE_SESSIONS: ActiveSession[] = [
  {
    id: '1',
    childName: 'Emma',
    subject: 'Mathematics',
    teacherName: 'Ms. Rivera',
    startedAt: '2:45 PM',
  },
  {
    id: '2',
    childName: 'Noah',
    subject: 'Science',
    teacherName: 'Mr. Johnson',
    startedAt: '3:00 PM',
  },
  {
    id: '3',
    childName: 'Emma',
    subject: 'English',
    teacherName: 'Ms. Patel',
    startedAt: '3:30 PM',
  },
];

export function useParentDashboardScreen({ navigation }: Readonly<Props>) {
  const handleLogout = useCallback(() => {
    navigation.replace('RoleSelect');
  }, [navigation]);

  const handleObserveClass = useCallback((id: string) => {
    console.log('Observe class', id);
  }, []);

  return {
    activeSessions: MOCK_ACTIVE_SESSIONS,
    handleLogout,
    handleObserveClass,
  };
}
