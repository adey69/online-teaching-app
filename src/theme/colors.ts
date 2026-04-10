// ─── Palette ─────────────────────────────────────────────────────────────────

export type Colors = typeof colors;

export const colors = {
  // Primary – trustworthy blue
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB', // brand default
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // Secondary – warm violet accent
  secondary: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED', // brand default
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },

  // Neutrals
  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Semantic
  success: {
    light: '#D1FAE5',
    default: '#10B981',
    dark: '#065F46',
  },
  warning: {
    light: '#FEF3C7',
    default: '#F59E0B',
    dark: '#92400E',
  },
  error: {
    light: '#FEE2E2',
    default: '#EF4444',
    dark: '#991B1B',
  },
  info: {
    light: '#DBEAFE',
    default: '#3B82F6',
    dark: '#1E3A8A',
  },

  // Surfaces
  surface: {
    background: '#F9FAFB',
    card: '#FFFFFF',
    border: '#E5E7EB',
    overlay: 'rgba(17, 24, 39, 0.5)',
  },

  // Text
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    disabled: '#9CA3AF',
    inverse: '#FFFFFF',
    link: '#2563EB',
  },

  // Role-specific tints
  role: {
    teacher: {
      tint: '#EFF6FF',   // primary blue tint
      accent: '#2563EB',
    },
    student: {
      tint: '#D1FAE5',   // green tint
      accent: '#10B981',
    },
    parent: {
      tint: '#F5F3FF',   // purple tint
      accent: '#7C3AED',
    },
  },
} as const;
