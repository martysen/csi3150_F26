import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RecipesStack from './RecipesStack';
import FavoritesScreen from '../screens/FavoritesScreen';
import { COLORS } from '../styles/theme';

const Tab = createBottomTabNavigator();

/** Emoji tab icons keep the project free of an icon library. */
const tabIcon = (emoji) =>
  function TabIcon({ focused }) {
    return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.55 }}>{emoji}</Text>;
  };

/**
 * BOTTOM TAB NAVIGATOR: the two top-level areas of the app.
 *
 *   Recipes (a whole stack)   |   Favorites
 *
 * The Recipes tab contains a stack navigator (see RecipesStack.js). That is
 * a navigator NESTED inside a navigator, the standard mobile pattern: the
 * detail screen slides over the list while the tab bar stays visible below.
 *
 * `headerShown: false` here, because the stack draws its own header and the
 * Favorites screen draws its own title bar. Without this you would see two
 * headers stacked on the Recipes tab.
 *
 * The badge on the Favorites tab reads favoriteIds, the state lifted into
 * App.js. Mark a recipe as a favorite anywhere and the count updates. An
 * `undefined` badge hides it; a number shows it.
 */
export default function RootTabs({ favoriteIds, onToggleFavorite }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.bgCard,
          borderTopColor: COLORS.border,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
      }}
    >
      <Tab.Screen
        name="RecipesTab"
        options={{ title: 'Recipes', tabBarIcon: tabIcon('🍳') }}
      >
        {() => (
          <RecipesStack favoriteIds={favoriteIds} onToggleFavorite={onToggleFavorite} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="FavoritesTab"
        options={{
          title: 'Favorites',
          tabBarIcon: tabIcon('❤️'),
          tabBarBadge: favoriteIds.length > 0 ? favoriteIds.length : undefined,
          tabBarBadgeStyle: { backgroundColor: COLORS.primary },
        }}
      >
        {() => (
          <FavoritesScreen favoriteIds={favoriteIds} onToggleFavorite={onToggleFavorite} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
