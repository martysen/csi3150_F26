import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import RecipeCard from '../components/RecipeCard';
import { RECIPES } from '../data/recipes';
import { COLORS } from '../styles/theme';

/**
 * Favorites tab: the recipes whose ids are in `favoriteIds`.
 *
 * This screen shows SHARED state. The heart that fills in on the Recipes tab
 * (or the button on the detail screen) changes App's `favoriteIds`, and this
 * screen re-renders with the new list. It owns no data of its own.
 *
 * Because the favorites are derived from ids, there is one source of truth.
 * A recipe edited in src/data/recipes.js changes everywhere at once.
 *
 * This tab has no navigator header, so SafeAreaView protects the TOP edge
 * (status bar / notch). The tab bar handles the bottom.
 */
export default function FavoritesScreen({ favoriteIds, onToggleFavorite }) {
  const favorites = RECIPES.filter((recipe) => favoriteIds.includes(recipe.id));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <Text style={styles.headerCount}>{favorites.length} saved</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyText}>
            Tap the heart on any recipe and it will show up here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              isFavorite
              onToggleFavorite={() => onToggleFavorite(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgApp },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.bgCard,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: { color: COLORS.textMain, fontSize: 20, fontWeight: '800' },
  headerCount: { color: COLORS.textMuted, fontSize: 14, fontWeight: '600' },
  listContent: { padding: 16, gap: 16 },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyIcon: { fontSize: 48, color: COLORS.textMuted, marginBottom: 8 },
  emptyTitle: { color: COLORS.textMain, fontSize: 18, fontWeight: '700' },
  emptyText: { color: COLORS.textMuted, fontSize: 14, textAlign: 'center', marginTop: 4 },
});
