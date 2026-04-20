import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#000',
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.scale.xs,
    paddingHorizontal: spacing.layout.screenPadding,
    paddingVertical: spacing.scale.xs,
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerTitle: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semiBold,
    color: '#fff',
    flex: 1,
  },

  // Observer badge (shown in header)
  observerBadge: {
    backgroundColor: '#2a2a2a',
    borderRadius: spacing.borderRadius.full,
    paddingHorizontal: spacing.scale.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#444',
  },
  observerBadgeText: {
    ...typography.textStyles.caption,
    color: '#aaa',
  },

  // Hide / Show video toggle
  toggleButton: {
    paddingHorizontal: spacing.scale.sm,
    paddingVertical: 3,
    borderRadius: spacing.borderRadius.full,
    borderWidth: 1,
    borderColor: '#444',
  },
  toggleButtonPressed: {
    opacity: 0.7,
  },
  toggleButtonText: {
    ...typography.textStyles.caption,
    color: '#ccc',
  },

  // Leave button
  leaveButton: {
    backgroundColor: colors.error?.main ?? '#EF4444',
    borderRadius: spacing.borderRadius.full,
    paddingHorizontal: spacing.scale.md,
    paddingVertical: 3,
  },
  leaveButtonPressed: {
    opacity: 0.8,
  },
  leaveButtonText: {
    ...typography.textStyles.label,
    color: '#fff',
  },

  // ── Video row (2 tiles side by side) ──────────────────────────────────────
  videoRow: {
    flexDirection: 'row',
    height: 130,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  videoTile: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRightWidth: 1,
    borderRightColor: '#222',
  },
  videoSurface: {
    flex: 1,
    width: '100%',
  },
  videoLabel: {
    ...typography.textStyles.caption,
    color: '#aaa',
    textAlign: 'center',
    paddingVertical: 3,
    backgroundColor: 'rgba(0,0,0,0.55)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  videoTilePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoTilePlaceholderText: {
    ...typography.textStyles.caption,
    color: '#444',
  },

  // ── Whiteboard ────────────────────────────────────────────────────────────
  whiteboard: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // ── Connecting overlay ────────────────────────────────────────────────────
  statusOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    ...typography.textStyles.body,
    color: '#fff',
    marginTop: spacing.scale.sm,
  },
});
