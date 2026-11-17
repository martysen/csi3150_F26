import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, DIFFICULTY_STYLES } from '../styles/theme';

/**
 * Small pill showing Easy / Medium / Hard.
 *
 * The colors are chosen at render time from a lookup table, then layered over
 * the static styles with a style array. Later entries in the array win.
 *
 * @param {{ difficulty: 'Easy'|'Medium'|'Hard' }} props
 */
export default function DifficultyBadge({ difficulty }) {
  const palette = DIFFICULTY_STYLES[difficulty] ?? {
    background: COLORS.chip,
    text: COLORS.textMuted,
  };

  return (
    <View style={[styles.badge, { backgroundColor: palette.background }]}>
      <Text style={[styles.text, { color: palette.text }]}>{difficulty}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  text: { fontSize: 12, fontWeight: '700' },
});
