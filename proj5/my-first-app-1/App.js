import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootTabs from './src/navigation/RootTabs';
import { COLORS } from './src/styles/theme';

/**
 * React Navigation's built-in light theme with our palette on top. This
 * colors screen backgrounds, headers, the tab bar and borders in one place.
 */
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    background: COLORS.bgApp,
    card: COLORS.bgCard,
    text: COLORS.textMain,
    border: COLORS.border,
  },
};

/**
 * Root component and the owner of the app's shared state.
 *
 * LIFTING STATE UP
 *   Two screens need to know which recipes are favorites: the Recipes stack
 *   (hearts on cards and the detail button) and the Favorites tab. They are
 *   not parent and child, so the state lives in their closest common
 *   ancestor, this component, and is passed down as props:
 *
 *     App  ->  RootTabs  ->  RecipesStack  ->  RecipesScreen / RecipeDetailScreen
 *                       \->  FavoritesScreen
 *
 *   Passing props through several layers like this is called "prop drilling".
 *   It is fine for a small app, and it is exactly the pain that a global store
 *   (zustand) removes in the standalone state-management demo.
 *
 * We store only the IDs, not copies of the recipes. The recipe data has one
 * source of truth (src/data/recipes.js), and favorites is just a list of
 * pointers into it.
 */
export default function App() {
  const [favoriteIds, setFavoriteIds] = useState([]);

  /**
   * Add the id if it is missing, remove it if present.
   *
   * Two rules at work:
   *  1. Never mutate state. Build a NEW array (filter / spread).
   *  2. Use the functional form setX((current) => ...) when the new value
   *     depends on the old one, so rapid taps never read a stale value.
   */
  const toggleFavorite = (id) => {
    setFavoriteIds((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    );
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="dark" />
        <RootTabs favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
