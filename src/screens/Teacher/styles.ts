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

  // ── Start Class Button ────────────────────────────────────────────────────
  startClassButton: {
    backgroundColor: colors.role.teacher.accent,
    borderRadius: spacing.borderRadius.lg,
    paddingVertical: spacing.scale.md,
    alignItems: 'center',
    marginTop: spacing.scale.sm,
    marginBottom: spacing.scale.lg,
  },
  startClassButtonPressed: {
    opacity: 0.85,
  },
  startClassButtonText: {
    ...typography.textStyles.button,
    color: colors.text.inverse,
  },

  // ── Section ───────────────────────────────────────────────────────────────
  sectionTitle: {
    ...typography.textStyles.heading3,
    color: colors.text.primary,
    marginBottom: spacing.scale.md,
  },
  emptyText: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.scale.xl,
  },

  // ── Session Card ──────────────────────────────────────────────────────────
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.scale.xs,
  },
  cardTitle: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text.primary,
    flex: 1,
    marginRight: spacing.scale.sm,
  },
  badgeLive: {
    backgroundColor: colors.error.light,
    borderRadius: spacing.borderRadius.full,
    paddingHorizontal: spacing.scale.sm,
    paddingVertical: 2,
  },
  badgeCompleted: {
    backgroundColor: colors.neutral[100],
    borderRadius: spacing.borderRadius.full,
    paddingHorizontal: spacing.scale.sm,
    paddingVertical: 2,
  },
  badgeTextLive: {
    ...typography.textStyles.caption,
    color: colors.error.dark,
    fontWeight: typography.fontWeight.medium,
  },
  badgeTextCompleted: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  cardSubject: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  cardTime: {
    ...typography.textStyles.caption,
    color: colors.text.disabled,
  },
  cardRejoinHint: {
    ...typography.textStyles.caption,
    color: colors.role.teacher.accent,
    marginTop: spacing.scale.xs,
  },

  // ── Clear All ─────────────────────────────────────────────────────────────
  clearAllButton: {
    alignItems: 'center',
    paddingVertical: spacing.scale.sm,
    marginBottom: spacing.scale.lg,
  },
  clearAllButtonPressed: {
    opacity: 0.6,
  },
  clearAllText: {
    ...typography.textStyles.label,
    color: colors.error.dark,
  },

  // ── Start Class Modal ─────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.surface.overlay,
    justifyContent: 'center',
    paddingHorizontal: spacing.layout.screenPadding,
  },
  modalCard: {
    backgroundColor: colors.surface.card,
    borderRadius: spacing.borderRadius.xl,
    padding: spacing.scale.xl,
  },
  modalTitle: {
    ...typography.textStyles.heading3,
    color: colors.text.primary,
    marginBottom: spacing.scale.md,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.surface.border,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: spacing.scale.md,
    paddingVertical: spacing.scale.sm,
    ...typography.textStyles.body,
    color: colors.text.primary,
    marginBottom: spacing.scale.lg,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.scale.sm,
  },
  modalCancelButton: {
    paddingHorizontal: spacing.scale.md,
    paddingVertical: spacing.scale.sm,
  },
  modalConfirmButton: {
    backgroundColor: colors.role.teacher.accent,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: spacing.scale.lg,
    paddingVertical: spacing.scale.sm,
  },
  modalButtonPressed: {
    opacity: 0.8,
  },
  modalCancelText: {
    ...typography.textStyles.button,
    color: colors.text.secondary,
  },
  modalConfirmText: {
    ...typography.textStyles.button,
    color: colors.text.inverse,
  },
});
