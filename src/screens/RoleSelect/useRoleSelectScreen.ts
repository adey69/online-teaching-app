import { useCallback } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RoleSelect'>;

export function useRoleSelectScreen({ navigation }: Readonly<Props>) {
  const handleSelectTeacher = useCallback(() => {
    navigation.replace('TeacherDashboard');
  }, [navigation]);

  const handleSelectStudent = useCallback(() => {
    navigation.replace('StudentDashboard');
  }, [navigation]);

  const handleSelectParent = useCallback(() => {
    navigation.replace('ParentDashboard');
  }, [navigation]);

  return { handleSelectTeacher, handleSelectStudent, handleSelectParent };
}
