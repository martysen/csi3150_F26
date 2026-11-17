import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import RecipeCard from '../components/RecipeCard';
import { CATEGORIES, RECIPES } from '../data/recipes';
import { COLORS } from '../styles/theme';

/**
 * Home screen of the Recipes stack: category chips above a scrolling list.
 *
 * Props arrive from two places:
 *   navigation         from React Navigation (used to open the detail screen)
 *   favoriteIds,
 *   onToggleFavorite   from App.js, passed down through RootTabs and the stack
 *
 * LOCAL vs SHARED STATE
 *   `selectedCategory` matters only to this screen, so it stays here in
 *   useState. `favoriteIds` matters to several screens, so it lives in App.js.
 *
 * SafeAreaView (from react-native-safe-area-context, not 'react-native') keeps
 * content out of notches and system bars. The navigator's header already
 * covers the top, and the tab bar covers the bottom, so only left/right remain.
 */
export default function RecipesScreen({ navigation, favoriteIds, onToggleFavorite }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Derived data: computed from state on every render, never stored.
  const visibleRecipes =
    selectedCategory === 'All'
      ? RECIPES
      : RECIPES.filter((recipe) => recipe.category === selectedCategory);

  const renderRecipe = ({ item }) => (
    <RecipeCard
      recipe={item}
      isFavorite={favoriteIds.includes(item.id)}
      // Pass only the id; the detail screen looks the recipe up itself.
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
      onToggleFavorite={() => onToggleFavorite(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <View style={styles.chipRow}>
        {CATEGORIES.map((category) => {
          const isActive = category === selectedCategory;
          return (
            <TouchableOpacity
              key={category}
              activeOpacity={0.7}
              onPress={() => setSelectedCategory(category)}
              // hitSlop extends the tappable area beyond the visible pill:
              // 40 px tall pill + 4 px above and below = a 48 px touch target.
              hitSlop={{ top: 4, bottom: 4 }}
              style={[styles.chip, isActive && styles.chipActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={visibleRecipes}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipe}
        // FlatList only redraws rows when `data` changes. The hearts depend on
        // favoriteIds, which is NOT part of `data`, so we list it here.
        // Remove this line and the hearts stop updating while 'All' is selected.
        extraData={favoriteIds}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.empty}>No recipes in this category yet.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgApp },
  // flexWrap lets chips drop to a second line on narrow phones.
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chip: {
    minHeight: 40,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: COLORS.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: COLORS.primary },
  chipText: { color: COLORS.textMain, fontSize: 14, fontWeight: '600' },
  chipTextActive: { color: '#ffffff' },
  // `gap` spaces the cards without per-card margins.
  listContent: { paddingHorizontal: 16, paddingBottom: 24, gap: 16 },
  empty: { color: COLORS.textMuted, textAlign: 'center', marginTop: 40 },
});
