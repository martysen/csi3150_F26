import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import DifficultyBadge from './DifficultyBadge';
import RecipeImage from './RecipeImage';
import { COLORS, MIN_TOUCH } from '../styles/theme';

/**
 * One recipe card, used on both the Recipes list and the Favorites tab.
 *
 * It is purely presentational: it receives data and callbacks and knows
 * nothing about navigation or where the favorites live. That is what lets two
 * different screens reuse it.
 *
 * Props
 *   recipe            the recipe object
 *   isFavorite        true -> filled heart
 *   onPress           optional. Tapping the card (the Favorites tab omits it)
 *   onToggleFavorite  tapping the heart
 *
 * LAYOUT NOTES
 *  - In React Native every View is position: 'relative' by default, so the
 *    heart can be placed with position: 'absolute' inside the image wrapper.
 *  - The heart is a TouchableOpacity nested inside the card's TouchableOpacity.
 *    The innermost touchable wins, so tapping the heart does not also open the
 *    recipe.
 *  - The heart's touch area is 48 x 48 (MIN_TOUCH) even though the icon is small.
 */
export default function RecipeCard({ recipe, isFavorite, onPress, onToggleFavorite }) {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.85 : 1}
      onPress={onPress}
      style={styles.card}
      accessibilityRole={onPress ? 'button' : undefined}
    >
      <View>
        <RecipeImage recipe={recipe} style={styles.image} />

        <TouchableOpacity
          style={styles.heartButton}
          onPress={onToggleFavorite}
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite
              ? `Remove ${recipe.title} from favorites`
              : `Add ${recipe.title} to favorites`
          }
        >
          <Text style={[styles.heart, isFavorite && styles.heartActive]}>
            {isFavorite ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.summary} numberOfLines={2}>
          {recipe.summary}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>⏱ {recipe.minutes} min</Text>
          <DifficultyBadge difficulty={recipe.difficulty} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // overflow: 'hidden' lets the card's rounded corners clip the image.
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  image: { width: '100%', height: 170 },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: MIN_TOUCH,
    height: MIN_TOUCH,
    borderRadius: MIN_TOUCH / 2,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: { fontSize: 24, color: COLORS.textMuted },
  heartActive: { color: COLORS.heart },
  body: { padding: 14 },
  title: { color: COLORS.textMain, fontSize: 18, fontWeight: '700' },
  summary: { color: COLORS.textMuted, fontSize: 14, marginTop: 4 },
  // flexDirection defaults to 'column', so a horizontal row must opt in.
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  meta: { color: COLORS.textMain, fontSize: 13, fontWeight: '600' },
});
