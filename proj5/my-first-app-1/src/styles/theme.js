/**
 * Design tokens shared by every screen.
 *
 * React Native has no CSS files or CSS variables, so shared values live in a
 * plain JavaScript module and are imported where needed. Each component builds
 * its own styles with StyleSheet.create().
 */
export const COLORS = {
  bgApp: '#fbf7f2',
  bgCard: '#ffffff',
  primary: '#c2431f',
  textMain: '#2b2118',
  textMuted: '#7a6a5d',
  border: '#eadfd3',
  chip: '#f1e8dd',
  heart: '#d64545',
};

/**
 * Difficulty is shown with a label AND a color, never color alone. The pairs
 * are chosen for readable contrast (dark text on a light tint).
 */
export const DIFFICULTY_STYLES = {
  Easy: { background: '#e3f4ea', text: '#1f7a46' },
  Medium: { background: '#fdf0d2', text: '#8a5a00' },
  Hard: { background: '#fbe3e3', text: '#a12a2a' },
};

/**
 * Minimum touch target (density-independent pixels) recommended by the
 * Android and iOS guidelines.
 */
export const MIN_TOUCH = 48;
