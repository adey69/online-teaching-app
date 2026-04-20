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

  // ── Section ───────────────────────────────────────────────────────────────
  sectionTitle: {
    ...typography.textStyles.heading3,
    color: colors.text.primary,
    marginBottom: spacing.scale.md,
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
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.scale.sm,
  },
  cardInfo: {
    flex: 1,
    marginRight: spacing.scale.md,
  },
  cardSubject: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  cardChild: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.scale.xs,
  },
  cardTeacher: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  cardStartedAt: {
    ...typography.textStyles.caption,
    color: colors.text.disabled,
  },
  observeButton: {
    backgroundColor: colors.role.parent.accent,
    borderRadius: spacing.borderRadius.full,
    paddingHorizontal: spacing.scale.md,
    paddingVertical: spacing.scale.xs,
    alignSelf: 'flex-start',
  },
  observeButtonPressed: {
    opacity: 0.85,
  },
  observeButtonText: {
    ...typography.textStyles.label,
    color: colors.text.inverse,
  },
});
