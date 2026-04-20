export type RootStackParamList = {
  RoleSelect: undefined;
  TeacherDashboard: undefined;
  StudentDashboard: undefined;
  ParentDashboard: undefined;
  Classroom: {
    channelId: string;
    roomUUID: string;
    role: 'teacher' | 'student' | 'parent';
    title: string;
    sessionId?: string; // only set for teacher; used to end the session on leave
  };
};
