import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DifficultyBadge from '../components/DifficultyBadge';
import RecipeImage from '../components/RecipeImage';
import { RECIPES } from '../data/recipes';
import { COLORS, MIN_TOUCH } from '../styles/theme';

/**
 * Detail screen, pushed onto the stack from the recipe list.
 *
 * `route.params` holds whatever the previous screen passed to navigate().
 * Here that is just { recipeId }. We look the full recipe up ourselves, so the
 * screen never shows stale data and route params stay small.
 *
 * ScrollView vs FlatList
 *   ScrollView renders ALL its children at once, so it suits short, fixed
 *   content like this page. FlatList renders only what is on screen, so it
 *   suits long or unbounded lists. Ingredients and steps are a handful of rows,
 *   so plain .map() inside a ScrollView is right. (Remember the key prop!)
 *
 * THUMB ZONE
 *   The favorite button sits OUTSIDE the ScrollView, pinned to the bottom of
 *   the screen where a thumb rests, so it is reachable without scrolling.
 */
export default function RecipeDetailScreen({ route, favoriteIds, onToggleFavorite }) {
  const { recipeId } = route.params;
  const recipe = RECIPES.find((r) => r.id === recipeId);

  // Defensive: an unknown id shows a message instead of crashing.
  if (!recipe) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <Text style={styles.notFound}>This recipe could not be found.</Text>
      </SafeAreaView>
    );
  }

  const isFavorite = favoriteIds.includes(recipe.id);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <RecipeImage recipe={recipe} style={styles.image} />
        <Text style={styles.credit}>Photo: {recipe.credit} / Unsplash</Text>

        <Text style={styles.title}>{recipe.title}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>⏱ {recipe.minutes} min</Text>
          <Text style={styles.meta}>{recipe.category}</Text>
          <DifficultyBadge difficulty={recipe.difficulty} />
        </View>

        <Text style={styles.summary}>{recipe.summary}</Text>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((ingredient) => (
          <Text key={ingredient} style={styles.ingredient}>
            • {ingredient}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Steps</Text>
        {recipe.steps.map((step, index) => (
          <View key={step} style={styles.stepRow}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onToggleFavorite(recipe.id)}
          style={[styles.favoriteButton, isFavorite && styles.favoriteButtonOn]}
          accessibilityRole="button"
          accessibilityState={{ selected: isFavorite }}
        >
          <Text style={[styles.favoriteText, isFavorite && styles.favoriteTextOn]}>
            {isFavorite ? '♥  Saved to Favorites' : '♡  Save to Favorites'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgApp },
  content: { padding: 16, paddingBottom: 24 },
  image: { width: '100%', height: 220, borderRadius: 12 },
  credit: { color: COLORS.textMuted, fontSize: 11, marginTop: 6 },
  title: { color: COLORS.textMain, fontSize: 26, fontWeight: '800', marginTop: 14 },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 10,
  },
  meta: { color: COLORS.textMain, fontSize: 14, fontWeight: '600' },
  summary: { color: COLORS.textMuted, fontSize: 15, lineHeight: 22, marginTop: 12 },
  sectionTitle: {
    color: COLORS.textMain,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 24,
    marginBottom: 8,
  },
  ingredient: { color: COLORS.textMain, fontSize: 15, lineHeight: 24 },
  stepRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 26,
    fontSize: 13,
    fontWeight: '800',
    overflow: 'hidden',
  },
  // flex: 1 lets the text take the remaining width and wrap, instead of
  // pushing past the screen edge.
  stepText: { flex: 1, color: COLORS.textMain, fontSize: 15, lineHeight: 22 },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.bgCard,
  },
  favoriteButton: {
    minHeight: MIN_TOUCH,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButtonOn: { backgroundColor: COLORS.bgCard },
  favoriteText: { color: '#ffffff', fontSize: 16, fontWeight: '800' },
  favoriteTextOn: { color: COLORS.primary },
  notFound: { color: COLORS.textMain, fontSize: 16, padding: 24 },
});
