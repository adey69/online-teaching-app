import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { useRoleSelectScreen } from './useRoleSelectScreen';
import {
  styles,
  teacherCard,
  studentCard,
  parentCard,
} from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'RoleSelect'>;

type RoleCardProps = {
  icon: string;
  title: string;
  description: string;
  cardStyle: object;
  iconStyle: object;
  titleStyle: object;
  onPress: () => void;
};

function RoleCard({
  icon,
  title,
  description,
  cardStyle,
  iconStyle,
  titleStyle,
  onPress,
}: Readonly<RoleCardProps>) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        cardStyle,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Continue as ${title}`}
    >
      <View style={[styles.iconContainer, iconStyle]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={[styles.cardTitle, titleStyle]}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

export default function RoleSelectScreen(props: Readonly<Props>) {
  const { handleSelectTeacher, handleSelectStudent, handleSelectParent } =
    useRoleSelectScreen(props);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.appName}>Welcome</Text>
          <Text style={styles.subtitle}>Choose your role to continue</Text>
        </View>

        <View style={styles.rolesContainer}>
          <RoleCard
            icon="🎓"
            title="Teacher"
            description="Create and manage live classes"
            cardStyle={teacherCard.card}
            iconStyle={teacherCard.iconContainer}
            titleStyle={teacherCard.title}
            onPress={handleSelectTeacher}
          />
          <RoleCard
            icon="📚"
            title="Student"
            description="Browse and join ongoing classes"
            cardStyle={studentCard.card}
            iconStyle={studentCard.iconContainer}
            titleStyle={studentCard.title}
            onPress={handleSelectStudent}
          />
          <RoleCard
            icon="👨‍👧"
            title="Parent"
            description="Observe your child's sessions"
            cardStyle={parentCard.card}
            iconStyle={parentCard.iconContainer}
            titleStyle={parentCard.title}
            onPress={handleSelectParent}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
