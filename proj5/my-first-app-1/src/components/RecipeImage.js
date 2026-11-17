import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../styles/theme';

/**
 * A recipe photo that never leaves a hole in the layout.
 *
 * Remote images can fail: no signal, a dead link, a slow network. Image's
 * onError fires when that happens, and we swap in a placeholder showing the
 * recipe's emoji. The app looks intentional offline instead of broken.
 *
 * IMAGE GOTCHAS (React Native, unlike the web)
 *  - A remote image has no intrinsic size, so the caller MUST pass a style with
 *    a width and height. Without them the image renders at 0 x 0 and nothing
 *    appears.
 *  - Remote images use source={{ uri }}. Bundled files use require('./x.png').
 *  - resizeMode="cover" fills the box and crops the overflow, like CSS
 *    object-fit: cover.
 *
 * @param {{ recipe: object, style: object }} props
 */
export default function RecipeImage({ recipe, style }) {
  const [failed, setFailed] = useState(false);

  if (failed || !recipe.image) {
    return (
      <View style={[styles.placeholder, style]}>
        <Text style={styles.emoji}>{recipe.emoji}</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: recipe.image }}
      style={style}
      resizeMode="cover"
      onError={() => setFailed(true)}
      accessibilityLabel={`Photo of ${recipe.title}`}
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: COLORS.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 56 },
});
