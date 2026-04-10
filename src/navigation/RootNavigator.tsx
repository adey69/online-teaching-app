import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import RoleSelectScreen from '../screens/RoleSelectScreen';
import TeacherDashboardScreen from '../screens/Teacher/TeacherDashboardScreen';
import StudentDashboardScreen from '../screens/Student/StudentDashboardScreen';
import ParentDashboardScreen from '../screens/Parent/ParentDashboardScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="RoleSelect"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      <Stack.Screen name="TeacherDashboard" component={TeacherDashboardScreen} />
      <Stack.Screen name="StudentDashboard" component={StudentDashboardScreen} />
      <Stack.Screen name="ParentDashboard" component={ParentDashboardScreen} />
    </Stack.Navigator>
  );
}
