/**
 * Hardcoded recipe data. Nothing is fetched; the whole app runs offline
 * except for the photos.
 *
 * Recipe shape:
 *   id            unique string: FlatList key and the route parameter
 *   title         display name
 *   category      'Breakfast' | 'Lunch' | 'Dinner' | 'Dessert'
 *   minutes       total time
 *   difficulty    'Easy' | 'Medium' | 'Hard'
 *   emoji         shown if the photo cannot load (offline, or a dead link)
 *   image         photo URL
 *   credit        photographer, shown under the photo
 *   summary       one-sentence description
 *   ingredients   array of strings
 *   steps         array of strings
 *
 * Photos are from Unsplash (https://unsplash.com), used under the Unsplash
 * License, which allows free use. Credits are shown in the detail screen.
 */

// Builds a sized, compressed photo URL from an Unsplash photo id.
// w=800 and q=70 keep each image small enough for a phone on cellular data.
const photo = (id) => `https://images.unsplash.com/${id}?w=800&q=70&fm=jpg&fit=crop`;

export const RECIPES = [
  {
    id: 'r1',
    title: 'Fluffy Pancakes',
    category: 'Breakfast',
    minutes: 20,
    difficulty: 'Easy',
    emoji: '🥞',
    image: photo('photo-1543168691-518c24c546ea'),
    credit: 'Maddi Bazzocco',
    summary: 'Light, golden pancakes that come together in one bowl.',
    ingredients: [
      '1½ cups all-purpose flour',
      '2 tbsp sugar',
      '1 tbsp baking powder',
      '¼ tsp salt',
      '1¼ cups milk',
      '1 egg',
      '3 tbsp melted butter',
    ],
    steps: [
      'Whisk the flour, sugar, baking powder and salt in a large bowl.',
      'In a second bowl, whisk the milk, egg and melted butter.',
      'Pour the wet mixture into the dry and stir until just combined. A few lumps are fine.',
      'Heat a lightly greased pan over medium heat and pour in ¼ cup of batter per pancake.',
      'Cook until bubbles form on top, flip, and cook about 2 more minutes until golden.',
    ],
  },
  {
    id: 'r2',
    title: 'Avocado Toast',
    category: 'Breakfast',
    minutes: 10,
    difficulty: 'Easy',
    emoji: '🥑',
    image: photo('photo-1490091119006-59eb16fe739d'),
    credit: 'Caroline Attwood',
    summary: 'Creamy avocado on crisp toast with a squeeze of lemon.',
    ingredients: [
      '2 slices sourdough or whole-grain bread',
      '1 ripe avocado',
      '1 tbsp lemon juice',
      'Pinch of salt',
      'Pinch of chili flakes',
      '1 tsp olive oil',
    ],
    steps: [
      'Toast the bread until golden and crisp.',
      'Mash the avocado with the lemon juice and salt.',
      'Spread the avocado generously over the toast.',
      'Finish with a drizzle of olive oil and a pinch of chili flakes.',
    ],
  },
  {
    id: 'r3',
    title: 'Tomato & Cucumber Salad',
    category: 'Lunch',
    minutes: 10,
    difficulty: 'Easy',
    emoji: '🥗',
    image: photo('photo-1606735584785-1848fdcaea57'),
    credit: 'Loes Klinker',
    summary: 'A crisp, no-cook salad that tastes best with summer tomatoes.',
    ingredients: [
      '3 ripe tomatoes, sliced',
      '1 cucumber, sliced',
      '½ red onion, thinly sliced',
      '100 g feta cheese',
      '2 tbsp olive oil',
      '1 tbsp red wine vinegar',
      '½ tsp dried oregano',
      'Salt and pepper',
    ],
    steps: [
      'Arrange the tomatoes, cucumber and onion on a plate or in a wide bowl.',
      'Whisk the olive oil, vinegar, oregano, salt and pepper together.',
      'Pour the dressing over the vegetables.',
      'Crumble the feta on top and serve right away.',
    ],
  },
  {
    id: 'r4',
    title: 'Tomato Basil Soup',
    category: 'Lunch',
    minutes: 35,
    difficulty: 'Medium',
    emoji: '🍅',
    image: photo('photo-1608949621301-dc970e104c90'),
    credit: 'Nathan Dumlao',
    summary: 'Silky tomato soup built from pantry staples and fresh basil.',
    ingredients: [
      '1 tbsp olive oil',
      '1 onion, chopped',
      '2 garlic cloves, minced',
      '800 g canned whole tomatoes',
      '2 cups vegetable stock',
      'A handful of fresh basil',
      '¼ cup cream (optional)',
      'Salt and pepper',
    ],
    steps: [
      'Warm the oil in a pot and cook the onion for about 5 minutes until soft.',
      'Add the garlic and cook for 1 minute.',
      'Add the tomatoes and stock, then simmer for 20 minutes.',
      'Add the basil and blend until smooth, taking care with the hot liquid.',
      'Stir in the cream, season with salt and pepper, and serve hot.',
    ],
  },
  {
    id: 'r5',
    title: 'Spaghetti Carbonara',
    category: 'Dinner',
    minutes: 30,
    difficulty: 'Medium',
    emoji: '🍝',
    image: photo('photo-1633337474564-1d9478ca4e2e'),
    credit: 'Rob Wicks',
    summary: 'Roman pasta with a creamy egg-and-cheese sauce and no cream at all.',
    ingredients: [
      '200 g spaghetti',
      '100 g guanciale or pancetta, diced',
      '2 whole eggs plus 1 egg yolk',
      '50 g grated pecorino or parmesan',
      'Plenty of black pepper',
      'Salt, for the pasta water',
    ],
    steps: [
      'Boil the spaghetti in well-salted water until al dente. Save 1 cup of the pasta water.',
      'Cook the pancetta in a cold pan over medium heat until crisp.',
      'Whisk the eggs, yolk, cheese and a generous amount of pepper in a bowl.',
      'Toss the drained pasta with the pancetta off the heat.',
      'Add the egg mixture and a splash of pasta water, tossing fast so the sauce turns creamy, not scrambled.',
    ],
  },
  {
    id: 'r6',
    title: 'Vegetable Stir-Fry',
    category: 'Dinner',
    minutes: 20,
    difficulty: 'Easy',
    emoji: '🥦',
    image: photo('photo-1464500650248-1a4b45debb9f'),
    credit: 'Clem Onojeghuo',
    summary: 'A fast, colorful weeknight dinner cooked in one hot pan.',
    ingredients: [
      '2 tbsp vegetable oil',
      '1 red bell pepper, sliced',
      '1 carrot, thinly sliced',
      '1 cup broccoli florets',
      '2 garlic cloves, minced',
      '1 tsp grated ginger',
      '3 tbsp soy sauce',
      '1 tsp sesame oil',
      'Cooked rice, to serve',
    ],
    steps: [
      'Heat the oil in a wok or large pan over high heat until it shimmers.',
      'Cook the carrot and broccoli for 3 minutes, stirring often.',
      'Add the pepper, garlic and ginger and cook for 1 more minute.',
      'Add the soy sauce and sesame oil and toss for 1 minute.',
      'Serve over rice.',
    ],
  },
  {
    id: 'r7',
    title: 'Homemade Lasagna',
    category: 'Dinner',
    minutes: 90,
    difficulty: 'Hard',
    emoji: '🍽️',
    image: photo('photo-1640063414338-af9faa0c2485'),
    credit: 'Cosmin Ursea',
    summary: 'Layers of meat sauce, pasta and creamy béchamel, baked until bubbling.',
    ingredients: [
      '12 lasagna sheets',
      '500 g ground beef',
      '700 g tomato passata',
      '1 onion, chopped',
      '2 garlic cloves, minced',
      '500 ml béchamel sauce',
      '200 g mozzarella, grated',
      '50 g parmesan, grated',
      'Olive oil, salt and pepper',
    ],
    steps: [
      'Brown the onion and beef in a little olive oil, then add the garlic.',
      'Stir in the passata and simmer for 30 minutes. Season to taste.',
      'Heat the oven to 180 °C (350 °F).',
      'Layer the sauce, pasta sheets and béchamel in a baking dish. Repeat three times.',
      'Top with the last of the béchamel, the mozzarella and the parmesan.',
      'Bake for about 40 minutes until golden, then rest for 10 minutes before cutting.',
    ],
  },
  {
    id: 'r8',
    title: 'Chocolate Chip Cookies',
    category: 'Dessert',
    minutes: 40,
    difficulty: 'Medium',
    emoji: '🍪',
    image: photo('photo-1499636136210-6f4ee915583e'),
    credit: 'Jennifer Pallian',
    summary: 'Crisp edges, soft centers and plenty of chocolate.',
    ingredients: [
      '1 cup (225 g) butter, softened',
      '¾ cup white sugar',
      '¾ cup brown sugar',
      '2 eggs',
      '2¼ cups all-purpose flour',
      '1 tsp baking soda',
      '1 tsp salt',
      '2 cups chocolate chips',
    ],
    steps: [
      'Heat the oven to 190 °C (375 °F) and line a baking tray.',
      'Beat the butter and both sugars until pale and fluffy, then beat in the eggs.',
      'Mix the flour, baking soda and salt, then stir them into the butter mixture.',
      'Fold in the chocolate chips.',
      'Drop rounded tablespoons of dough onto the tray, spaced apart.',
      'Bake 9 to 11 minutes until the edges are golden. Cool on the tray for 5 minutes.',
    ],
  },
];

/** The filter chips shown above the list. 'All' is a special value, not a category. */
export const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'];
