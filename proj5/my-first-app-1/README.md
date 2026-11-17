# Recipe Book (Demo 5)

A cross-platform (iOS and Android) recipe app built with **React Native + Expo**. Introduces core React Native building blocks and mobile screen navigation.

Users can browse recipes, filter them by category, open one to read the ingredients and steps, and save favorites that appear on a second tab/screen.

---

## 1. Context

Demos 1 to 3 covered web React: JSX, `useState`, controlled forms, components, `react-router-dom`. This demo moves the same React skills onto mobile. Nothing new about React hooks, props, state or components. What changes are the building blocks (`<View>` instead of `<div>`, `StyleSheet` instead of CSS) and how screens are navigated (native stack and tabs instead of URLs/Link).

Favorites recipes are shared between screens by *lifting state up* into `App.js` and passing it down as props. This is concept of prop drilling and is suitable when the size of the component tree is not that large.

---

## 2. Topics Covered

| Topic | FileName in Project Tree |
|---|---|
| `View`, `Text`, `Image`, `ScrollView`, `TouchableOpacity`, `FlatList` | `src/components/*`, `src/screens/*` |
| `StyleSheet.create`, Flexbox (column by default), `flex: 1`, `gap`, `flexWrap` | every file with a `styles` block |
| Absolute positioning (heart button over the photo) | `RecipeCard.js` |
| Remote images (`source={{ uri }}`, required width and height, `onError` fallback) | `RecipeImage.js` |
| `FlatList`: `keyExtractor`, `renderItem`, `extraData`, `ListEmptyComponent` | `RecipesScreen.js` |
| `ScrollView` vs `FlatList`: when to use which | `RecipeDetailScreen.js` |
| Touch ergonomics: 48 px targets, `hitSlop`, thumb-zone button placement | `RecipesScreen.js`, `RecipeCard.js`, `RecipeDetailScreen.js` |
| Local state with `useState` (selected category) and derived data | `RecipesScreen.js` |
| Lifting state up and prop drilling; immutable updates; functional `setState` | `App.js` |
| Stack navigation: `navigate`, `route.params`, back behavior | `RecipesStack.js`, `RecipesScreen.js`, `RecipeDetailScreen.js` |
| Bottom tab navigation, nesting a stack inside a tab, tab badge | `RootTabs.js` |
| Passing props to screens with render callbacks | `RecipesStack.js`, `RootTabs.js` |
| Safe areas on notched phones (`SafeAreaView`, `edges`) | `src/screens/*` |
| Reusable presentational components | `RecipeCard.js`, `DifficultyBadge.js`, `RecipeImage.js` |

---

## 3. Course's Learning outcomes

**Outcome: Create cross-platform iOS and Android apps for mobile systems using technologies such as React Native. [1, 2, 6b]**

- One JavaScript codebase runs on both platforms through Expo, with no platform-specific code.
- Platform differences are handled by the framework: native stack transitions and headers, the Android hardware back button, the iOS swipe-back gesture, and safe-area insets.
- Mobile-specific concerns are built in: touch targets, thumb-zone controls, and images that degrade gracefully with no signal.

**Outcome: Create and customize dynamic views and implement navigation techniques across platforms for mobile systems. [1, 2, 3, 6a, 6b]**

- Dynamic views: a list rendered from data, filter chips that change what the list shows, a heart and a button whose appearance depends on state, empty states, and a tab badge that counts favorites.
- Navigation: a stack navigator (list to detail, with a route parameter) nested inside a bottom tab navigator.
- Customization: a shared theme, a themed navigation container, conditional styles, and reusable components.

---

## 4. Dependencies and install commands

| Package | Purpose |
|---|---|
| `expo`, `react`, `react-native` | Runtime and dev server (installed with the Expo template) |
| `@react-navigation/native` | Navigation container and theming |
| `@react-navigation/native-stack` | Native stack navigator |
| `@react-navigation/bottom-tabs` | Bottom tab navigator |
| `react-native-screens`, `react-native-safe-area-context` | Native screen containers and safe-area insets (required by React Navigation) |
| `expo-status-bar` | Status bar styling |

No other packages are needed.

### Starting from scratch

```bash
npx create-expo-app@latest recipe-book --template blank
cd recipe-book
npm install @react-navigation/native@^7 @react-navigation/native-stack@^7 @react-navigation/bottom-tabs@^7
npx expo install react-native-screens react-native-safe-area-context expo-status-bar
```

Copy `index.js`, `App.js` and `src/` over the generated files, and make sure `package.json` has the main property pointing to index.js in the root directory as follows: `"main": "index.js"`.

### Run it

```bash
npx expo start
```

Scan the QR code with **Expo Go** App on Android Phones (https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US) Or for iPhones download the **TestFlight** App (https://apps.apple.com/us/app/testflight/id899247664) (phone and laptop MUST be on the same WiFi network), or press `a` for an Android emulator or whatever the command is for iOS simulator XCode. 

If a phone cannot reach the laptop on campus Wi-Fi, use 
```bash
npx expo start --tunnel
```
or run a WiFi hotspot from your phone and connect your laptop to the hotspot.

---

## 5. Project structure

```
index.js                      entry point (registerRootComponent)
App.js                        owns the favorites state, mounts navigation
app.json                      Expo config
src/
├── navigation/
│   ├── RootTabs.js           bottom tabs: Recipes, Favorites
│   └── RecipesStack.js       native stack: list -> detail
├── screens/
│   ├── RecipesScreen.js      category chips + FlatList
│   ├── RecipeDetailScreen.js photo, ingredients, steps, favorite button
│   └── FavoritesScreen.js    FlatList of favorited recipes
├── components/
│   ├── RecipeCard.js         photo, heart, title, time, difficulty
│   ├── RecipeImage.js        remote photo with emoji fallback
│   └── DifficultyBadge.js    Easy / Medium / Hard pill
├── data/
│   └── recipes.js            8 mock recipes + the category list
└── styles/
    └── theme.js              colors, difficulty colors, MIN_TOUCH
```

### Component tree

```
App                                   state: favoriteIds
└─ SafeAreaProvider
   └─ NavigationContainer
      └─ RootTabs                     Bottom Tab Navigator
         ├─ "RecipesTab" -> RecipesStack        Native Stack Navigator
         │    ├─ "RecipeList"   -> RecipesScreen       state: selectedCategory
         │    │                     └─ FlatList -> RecipeCard -> RecipeImage, DifficultyBadge
         │    └─ "RecipeDetail" -> RecipeDetailScreen
         │                          └─ RecipeImage, DifficultyBadge
         └─ "FavoritesTab" -> FavoritesScreen
                                └─ FlatList -> RecipeCard -> RecipeImage, DifficultyBadge
```

### How favorites flow (React prop drilling)

```
App  (favoriteIds, toggleFavorite)
 └─ RootTabs
     ├─ RecipesStack
     │    ├─ RecipesScreen        reads favoriteIds (heart), calls onToggleFavorite
     │    └─ RecipeDetailScreen   reads favoriteIds (button), calls onToggleFavorite
     └─ FavoritesScreen           reads favoriteIds (list), calls onToggleFavorite
```

---

## 6. Photos and licensing

The recipe photos are loaded from Unsplash's image CDN. They need an internet connection. Each recipe has an emoji fallback, so the app still works offline. Photos are used under the [Unsplash License](https://unsplash.com/license) (free to use, attribution appreciated). The detail screen credits the photographer under each photo.

| Recipe | Photographer |
|---|---|
| Fluffy Pancakes | Maddi Bazzocco |
| Avocado Toast | Caroline Attwood |
| Tomato & Cucumber Salad | Loes Klinker |
| Tomato Basil Soup | Nathan Dumlao |
| Spaghetti Carbonara | Rob Wicks |
| Vegetable Stir-Fry | Clem Onojeghuo |
| Homemade Lasagna | Cosmin Ursea |
| Chocolate Chip Cookies | Jennifer Pallian |

**To swap a photo:** open the photo on unsplash.com, right-click the image, choose "Copy image address", and take the part that starts at `photo-` and ends before the `?`. Paste it into the `photo('...')` call in `src/data/recipes.js`. Avoid photos marked "Unsplash+"; those use a different, paid license.

---



## 9. Common Mistakes to be aware of

- **Hearts that do not update.** `FlatList` redraws rows only when `data` changes. `favoriteIds` is not part of `data`, so it must be passed as `extraData`. 
- **Images that do not appear.** A remote `Image` has no intrinsic size. Without a `width` and `height` in its style, it renders at 0 x 0 px.
- **`flexDirection` is `column` by default**, the opposite of the web. Rows must be explicitly written in styling layout using flex.
- **Two headers on the Recipes tab.** Nesting a stack inside a tab shows both navigators' headers unless the tab navigator is set to `headerShown: false`.
- **Missing `key`.** Anything rendered with `.map()` (ingredients, steps, chips) needs a unique `key`.
- **Never mutate state.** `toggleFavorite` builds a new array with `filter` or a spread. Do not directly overwrite the original state. 
- **Import `SafeAreaView` from `react-native-safe-area-context`.** The one used in `react-native` only works on iOS. Android has to use padding/margins to create a boundary if SafeAreaView glitches out.

---

