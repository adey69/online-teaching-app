import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.layout.screenPadding,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.scale['2xl'],
  },
  appName: {
    ...typography.textStyles.heading1,
    color: colors.text.primary,
    marginBottom: spacing.scale.xs,
  },
  subtitle: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  rolesContainer: {
    gap: spacing.scale.md,
  },

  // Base card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: spacing.borderRadius.xl,
    borderWidth: 1.5,
    padding: spacing.scale.lg,
  },
  cardPressed: {
    opacity: 0.75,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: spacing.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.scale.md,
  },
  icon: {
    fontSize: 26,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    ...typography.textStyles.heading3,
    marginBottom: spacing.scale.xs,
  },
  cardDescription: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
  },
  chevron: {
    fontSize: 20,
    color: colors.neutral[300],
    marginLeft: spacing.scale.sm,
  },
});

// Per-role overrides
export const teacherCard = StyleSheet.create({
  card: { backgroundColor: colors.role.teacher.tint, borderColor: colors.primary[200] },
  iconContainer: { backgroundColor: colors.primary[100] },
  title: { color: colors.role.teacher.accent },
});

export const studentCard = StyleSheet.create({
  card: { backgroundColor: colors.role.student.tint, borderColor: '#A7F3D0' },
  iconContainer: { backgroundColor: '#A7F3D0' },
  title: { color: colors.role.student.accent },
});

export const parentCard = StyleSheet.create({
  card: { backgroundColor: colors.role.parent.tint, borderColor: colors.secondary[200] },
  iconContainer: { backgroundColor: colors.secondary[100] },
  title: { color: colors.role.parent.accent },
});
