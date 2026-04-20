import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.layout.screenPadding,
  },

  // ── Header ───────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.scale.lg,
    paddingBottom: spacing.scale.md,
  },
  greeting: {
    ...typography.textStyles.heading2,
    color: colors.text.primary,
  },
  switchRoleButton: {
    paddingVertical: spacing.scale.xs,
    paddingHorizontal: spacing.scale.sm,
  },
  switchRoleText: {
    ...typography.textStyles.label,
    color: colors.text.secondary,
  },

  // ── Section Header ────────────────────────────────────────────────────────
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.scale.md,
    gap: spacing.scale.sm,
  },
  sectionTitle: {
    ...typography.textStyles.heading3,
    color: colors.text.primary,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.role.student.tint,
    borderRadius: spacing.borderRadius.full,
    paddingHorizontal: spacing.scale.sm,
    paddingVertical: 2,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.role.student.accent,
  },
  liveText: {
    ...typography.textStyles.caption,
    color: colors.role.student.accent,
    fontWeight: typography.fontWeight.semiBold,
  },

  // ── Class Card ────────────────────────────────────────────────────────────
  card: {
    backgroundColor: colors.surface.card,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.layout.cardPadding,
    marginBottom: spacing.scale.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  cardPressed: {
    opacity: 0.9,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.scale.xs,
  },
  cardInfo: {
    flex: 1,
    marginRight: spacing.scale.md,
  },
  cardTitle: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  cardTeacher: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.scale.sm,
  },
  subjectTag: {
    backgroundColor: colors.role.student.tint,
    borderRadius: spacing.borderRadius.full,
    paddingHorizontal: spacing.scale.sm,
    paddingVertical: 2,
  },
  subjectTagText: {
    ...typography.textStyles.caption,
    color: colors.role.student.accent,
    fontWeight: typography.fontWeight.medium,
  },
  participantText: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  joinButton: {
    backgroundColor: colors.role.student.accent,
    borderRadius: spacing.borderRadius.full,
    paddingHorizontal: spacing.scale.md,
    paddingVertical: spacing.scale.xs,
  },
  joinButtonPressed: {
    opacity: 0.85,
  },
  joinButtonText: {
    ...typography.textStyles.label,
    color: colors.text.inverse,
  },
  emptyText: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.scale.xl,
  },
});
