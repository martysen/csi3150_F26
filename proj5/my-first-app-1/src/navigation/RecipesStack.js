import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecipesScreen from '../screens/RecipesScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import { COLORS } from '../styles/theme';

const Stack = createNativeStackNavigator();

/**
 * STACK NAVIGATOR: the "drill down" flow inside the Recipes tab.
 *
 *   RecipeList  ->  RecipeDetail
 *
 * A stack works like a pile of cards. navigation.navigate('RecipeDetail')
 * puts a screen on top; going back removes it and reveals the one below. Going
 * back happens through the header's back button, the iOS swipe-back gesture,
 * or the Android hardware back button, with no code on our side. "Native"
 * stack means each platform's own transition animation and header.
 *
 * RENDER CALLBACKS
 *   Normally a screen is given with component={MyScreen}. That cannot carry
 *   extra props, so to pass favoriteIds and onToggleFavorite down we give the
 *   screen as a function child instead. `props` is { navigation, route }, and
 *   we forward it along with our own props.
 */
export default function RecipesStack({ favoriteIds, onToggleFavorite }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.bgCard },
        headerTintColor: COLORS.textMain,
        headerTitleStyle: { fontWeight: '800' },
        contentStyle: { backgroundColor: COLORS.bgApp },
      }}
    >
      <Stack.Screen name="RecipeList" options={{ title: 'Recipe Book' }}>
        {(props) => (
          <RecipesScreen
            {...props}
            favoriteIds={favoriteIds}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="RecipeDetail" options={{ title: 'Recipe' }}>
        {(props) => (
          <RecipeDetailScreen
            {...props}
            favoriteIds={favoriteIds}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
