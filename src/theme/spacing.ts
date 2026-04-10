// ─── Spacing ─────────────────────────────────────────────────────────────────
// 8pt grid system. Every value is a multiple of 4 (half-grid) or 8 (full grid).

export type Spacing = typeof spacing;

// Named scale
const scale = {
  xs: 4,    // half-grid
  sm: 8,    // 1 unit
  md: 16,   // 2 units
  lg: 24,   // 3 units
  xl: 32,   // 4 units
  '2xl': 48, // 6 units
  '3xl': 64, // 8 units
} as const;

// Semantic layout values
const layout = {
  screenPadding: 16,
  cardPadding: 16,
  sectionGap: 24,
} as const;

// Border radius
const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const spacing = {
  scale,
  layout,
  borderRadius,
} as const;
