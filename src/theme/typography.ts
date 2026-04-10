// ─── Typography ──────────────────────────────────────────────────────────────
// System fonts only – no custom font loading required.
// iOS uses SF Pro; Android uses Roboto.

export type Typography = typeof typography;

const fontFamily = {
  regular: undefined,   // platform default
  medium: undefined,
  semiBold: undefined,
  bold: undefined,
} as const;

const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 34,
} as const;

const fontWeight = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const;

// Line heights are paired 1:1 with font sizes.
// Rule of thumb: ~1.4× size for body, ~1.2× for headings.
const lineHeight = {
  xs: 16,    // 11 × ~1.45
  sm: 18,    // 13 × ~1.38
  base: 22,  // 15 × ~1.47
  md: 24,    // 17 × ~1.41
  lg: 28,    // 20 × 1.40
  xl: 32,    // 24 × 1.33
  '2xl': 36, // 28 × 1.29
  '3xl': 42, // 34 × 1.24
} as const;

// ─── Predefined Text Styles ──────────────────────────────────────────────────

const textStyles = {
  heading1: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight['3xl'],
    letterSpacing: -0.5,
  },
  heading2: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight['2xl'],
    letterSpacing: -0.3,
  },
  heading3: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.xl,
    letterSpacing: -0.2,
  },
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.base,
    letterSpacing: 0,
  },
  bodySmall: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.sm,
    letterSpacing: 0,
  },
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.xs,
    letterSpacing: 0.2,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.sm,
    letterSpacing: 0.1,
  },
  button: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.base,
    letterSpacing: 0.3,
  },
} as const;

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  textStyles,
} as const;
