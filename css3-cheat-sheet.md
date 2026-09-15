# CSS3 Cheat Sheet - Syntax Reference

A practical reference for CSS used in real-world UI development. Organized by function.

---

## 1. Syntax & How Rules Apply

| Concept | Description / When to Use |
|---|---|
| `selector { property: value;}` | Basic rule structure. |
| `/* comment */` | CSS comments. no `//` line comments exist. |
| Specificity (inline > ID > class/attribute/pseudo-class > element) | Determines which rule wins when multiple rules target the same element. Inline styles and `!important` should be treated as escape hatches, not defaults. They break the cascade and are hard to override later. |
| Cascade order (when specificity ties) | Later rules in the stylesheet win. Source order matters. |
| Inheritance | Some properties (`color`, `font-family`, `line-height`) inherit from parent to child automatically; layout properties (`margin`, `border`, `width`) do not. Use `inherit`, `initial`, `unset`, or `revert` keywords to explicitly control this. |
| `!important` | Overrides normal cascade rules. **Avoid This.It is a maintenance trap; fix specificity/order instead**. |

---

## 2. Selectors

| Selector | Description / When to Use |
|---|---|
| `*` | Universal selector. targets everything. Common in CSS resets. |
| `element` | Type selector (`p`, `div`, `h1`). |
| `.class` | Class selector. the primary tool for reusable, component-based styling. |
| `#id` | ID selector. high specificity, use sparingly (once per page by definition anyway). |
| `A, B` | Group selector. applies the same rule to multiple selectors (A and B). |
| `A B` | Descendant combinator. B anywhere inside A. |
| `A > B` | Child combinator.B is a *direct* child of A only. |
| `A + B` | Adjacent sibling. B immediately follows A. |
| `A ~ B` | General sibling. B follows A anywhere at the same level. |
| `[attr]` | Attribute selector.element has the attribute at all. |
| `[attr="value"]` | Attribute equals exact value. |
| `[attr^="value"]` | Attribute starts with value. |
| `[attr$="value"]` | Attribute ends with value. |
| `[attr*="value"]` | Attribute contains value anywhere. |
| `:hover` | Mouse-over state. |
| `:focus` | Element has keyboard/click focus. essential for accessible interactive elements. |
| `:focus-visible` | Focus styling only when focus is likely from keyboard navigation, not a mouse click.avoids the "ugly outline on click" while keeping keyboard accessibility. |
| `:active` | Element is being actively clicked/pressed. |
| `:first-child` / `:last-child` | Matches an element only if it is the first/last child of its parent. |
| `:nth-child(n)` | Matches by position. supports formulas (`:nth-child(2n)` for even, `:nth-child(odd)`). Common for zebra-striping tables/lists. |
| `:not(selector)` | Excludes elements matching the inner selector. |
| `:checked` | Matches checked checkboxes/radios/options. **used for CSS-only toggle UI tricks**. |
| `:disabled` / `:enabled` | Matches form elements by disabled state. |
| `:required` / `:optional` | Matches form inputs by the `required` attribute. |
| `:valid` / `:invalid` | Matches form inputs based on HTML5 validation state. |
| `::before` / `::after` | Pseudo-elements. inject generated content (via `content:`) without adding markup. Used constantly for icons, decorative shapes, clearfixes, tooltips. |
| `::placeholder` | Styles the placeholder text of an input. |
| `::first-line` / `::first-letter` | Styles just the first line/letter of a block (drop caps, editorial styling). |
| `::selection` | Styles user-highlighted text. |

---

## 3. Box Model

| Property | Description / When to Use |
|---|---|
| `box-sizing: border-box;` | Makes `width`/`height` include padding and border, instead of adding to them. Almost universally set globally (`* { box-sizing: border-box; }`) because it makes sizing math predictable. |
| `width` / `height` | Element dimensions. Accepts px, %, vw/vh, ch, auto, etc. |
| `min-width` / `max-width` / `min-height` / `max-height` | Bounds on sizing. critical for responsive design (e.g., `max-width: 100%` on images). |
| `margin` | Space *outside* the border, between elements. Shorthand: `margin: top right bottom left;`. `margin: 0 auto;` horizontally centers a block element with a set width. |
| `padding` | Space *inside* the border, between border and content. Same shorthand order as margin. |
| `border` | Shorthand for `border-width border-style border-color` (e.g., `border: 1px solid #ccc;`). |
| `border-radius` | Rounds corners. A single large value (e.g., `9999px`) on a square element makes a circle/pill shape. **Neat trick. Remember this.** |
| `outline` | Drawn outside the border, does not affect layout. used for focus indicators. Do not remove (`outline: none`) without providing a visible replacement focus style; that is a common accessibility failure. |
| `box-shadow` | `box-shadow: x-offset y-offset blur spread color;`. Use `inset` keyword for an inner shadow. |
| `overflow` | Controls content that exceeds its container: `visible` (default), `hidden` (clips), `scroll` (always scrollbars), `auto` (scrollbars only when needed). |

---

## 4. Display & Positioning

| Property/Value | Description / When to Use |
|---|---|
| `display: block` | Element takes full available width, starts on a new line (div, p, h1 default). |
| `display: inline` | Element flows with text, ignores width/height/vertical margin (span, a default). |
| `display: inline-block` | Flows inline but respects width/height/margin.  hybrid, useful for nav items, buttons. |
| `display: none` | Removes element from layout entirely (not just visually hidden). |
| `display: flex` | Turns element into a flex container.See Flexbox section. |
| `display: grid` | Turns element into a grid container. See Grid section. |
| `visibility: hidden` | Hides element but preserves its layout space (unlike `display: none`). |
| `position: static` | Default; normal document flow, `top`/`left`/etc. have no effect. |
| `position: relative` | Stays in normal flow, but `top`/`left`/`right`/`bottom` offset it *from where it would have been*. Also establishes a positioning context for absolutely-positioned children. |
| `position: absolute` | Removed from normal flow, positioned relative to the nearest ancestor with `position` set to anything other than `static` (or the viewport if none exists). Classic pattern: `position: relative` on parent + `position: absolute` on child for tooltips, badges, overlays. |
| `position: fixed` | Positioned relative to the viewport, stays in place on scroll (sticky headers done the "hard way," modals, cookie banners). |
| `position: sticky` | Hybrid. it behaves as `relative` until a scroll threshold (`top: 0`, etc.), then "sticks" like `fixed` within its parent's bounds. Used for sticky table headers, section nav. |
| `z-index` | Stack order for overlapping positioned elements. Only works on elements with a `position` value other than `static`. Higher value renders on top. |
| `top` / `right` / `bottom` / `left` | Offsets used with any non-static `position`. |

---

## 5. Flexbox (1-dimensional layout)

| Property | Description / When to Use |
|---|---|
| `display: flex` | Applied to the **parent**. Children become flex items. Use for one-dimensional layouts: navbars, button groups, centering content, equal-height cards in a row. |
| `flex-direction` | `row` (default), `row-reverse`, `column`, `column-reverse`: sets the main axis. |
| `flex-wrap` | `nowrap` (default, items shrink/overflow) or `wrap` (items flow to new lines when out of space). |
| `justify-content` | Aligns items along the **main axis**: `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`. |
| `align-items` | Aligns items along the **cross axis**: `stretch` (default), `flex-start`, `center`, `flex-end`, `baseline`. |
| `align-content` | Like `align-items` but controls spacing between multiple wrapped rows, not individual items. |
| `gap` | Space between flex items. modern replacement for margin hacks between items. |
| `flex-grow` | How much a flex item grows to fill leftover space, relative to siblings (0 = don't grow, the default). |
| `flex-shrink` | How much an item shrinks when space is tight (1 = default, shrinks proportionally). |
| `flex-basis` | The item's starting size before growing/shrinking is applied. often used instead of `width` in flex contexts. |
| `flex` | Shorthand for `flex-grow flex-shrink flex-basis`. `flex: 1;` is a very common "take up equal available space" pattern. |
| `align-self` | Overrides `align-items` for a single flex item. |
| `order` | Changes visual order of a flex item independent of source/DOM order. **Use sparingly**, it can hurt accessibility/tab order alignment with visual order. |

---

## 6. Grid (2-dimensional layout)

| Property | Description / When to Use |
|---|---|
| `display: grid` | Applied to the **parent**. Use for two-dimensional layouts: full page structure, image galleries, dashboards, card grids. |
| `grid-template-columns` | Defines column tracks, e.g., `grid-template-columns: 1fr 1fr 1fr;` (3 equal columns) or `repeat(3, 1fr)`. |
| `grid-template-rows` | Defines row tracks, same syntax as columns. |
| `fr` unit | "Fraction" of remaining space. The core unit that makes CSS Grid powerful (`1fr 2fr` = second column is twice as wide). |
| `repeat()` | Shorthand to avoid writing the same track size repeatedly: `repeat(4, 1fr)`. |
| `minmax(min, max)` | Sets a flexible range for a track. Ccommon in responsive grids: `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`. |
| `gap` (or `row-gap` / `column-gap`) | Space between grid tracks. |
| `grid-column` / `grid-row` | Places/spans an item across specific tracks, e.g., `grid-column: 1 / 3;` or `grid-column: span 2;`. |
| `grid-template-areas` | Named layout regions defined visually as a string grid, then assigned to elements via `grid-area`. Very readable for page-level layout (header/sidebar/main/footer). |
| `justify-items` / `align-items` | Aligns items within their grid cell, horizontal/vertical respectively. |
| `justify-content` / `align-content` | Aligns the entire grid within its container when tracks do not fill all available space. |
| `place-items` | Shorthand for `align-items justify-items`. |

---

## 7. Typography

| Property | Description / When to Use |
|---|---|
| `font-family` | Font stack, comma-separated fallbacks ending in a generic family (`sans-serif`, `serif`, `monospace`). |
| `font-size` | Text size. Prefer `rem` over `px` for accessibility. respects user's browser font-size setting. |
| `font-weight` | Numeric (`100` - `900`) or keyword (`normal`, `bold`). Requires the font file to actually include that weight to render distinctly. |
| `font-style` | `normal`, `italic`, `oblique`. |
| `line-height` | Vertical spacing between lines. Unitless values (e.g., `1.5`) are recommended as they scale with font-size, unlike fixed px. |
| `letter-spacing` | Space between characters. Small negative values tighten large headings, positive values are common for all-caps labels/buttons. |
| `text-align` | `left`, `right`, `center`, `justify`. |
| `text-decoration` | `underline`, `line-through`, `none` (commonly used to strip the default underline on `<a>` tags). |
| `text-transform` | `uppercase`, `lowercase`, `capitalize`. it transforms display without changing the underlying text/HTML. |
| `white-space` | Controls wrapping/whitespace collapsing: `nowrap` prevents wrapping, `pre` preserves whitespace exactly. |
| `text-overflow: ellipsis` | Shows `...` for clipped text. It must be paired with `overflow: hidden` and `white-space: nowrap` to work. |
| `@font-face` | Declares a custom web font from a font file URL, for use in `font-family`. Check out : `https://fonts.google.com/` |

---

## 8. Color, Backgrounds & Units

| Property/Concept | Description / When to Use |
|---|---|
| `color` | Text color. |
| `background-color` | Element's fill color. |
| `background-image: url(...)` | Sets an image as background. If you use image only for styling and not content, use this. |
| `background-size` | `cover` (fills container, may crop), `contain` (fits entirely, may letterbox), or explicit values. |
| `background-position` | Positions a background image, e.g., `center center`. |
| `background-repeat` | `repeat` (default), `no-repeat`, `repeat-x`, `repeat-y`. |
| `linear-gradient()` / `radial-gradient()` | CSS-generated gradients, used as a `background-image` value. |
| Hex (`#rrggbb`) | **Most common color format**. |
| `rgb() / rgba()` | RGB with optional alpha (transparency) channel. |
| `hsl() / hsla()` | Hue-Saturation-Lightness. often more intuitive for adjusting shades/tints programmatically than hex/rgb. |
| `opacity` | Transparency of the **entire element including children/text** (unlike rgba background, which only affects the background). |
| `px` | Absolute unit. Does not scale with anything. |
| `%` | Relative to the **parent** element's corresponding dimension. |
| `em` | Relative to the **current element's** font-size (compounds when nested). |
| `rem` | Relative to the **root** (`<html>`) font-size. Predictable, does not compound. **Preferred over `em` for most sizing**. |
| `vw` / `vh` | 1% of viewport width/height. used for full-screen sections, responsive type scaling. |
| `vmin` / `vmax` | 1% of the smaller/larger of viewport width or height. |
| `ch` | Width of the "0" character in the current font. Useful for setting readable line lengths on text blocks. |

---

## 9. CSS Variables (Custom Properties)

| Syntax | Description / When to Use |
|---|---|
| `--main-color: #3498db;` | Declares a custom property, typically on `:root` selector for global scope. |
| `color: var(--main-color);` | Uses the variable. |
| `var(--main-color, #000);` | Second argument is a fallback if the variable is undefined. |
| Scoped redeclaration | Re-declaring `--main-color` inside a class/component scope overrides it locally. The basis of theming (e.g., dark mode toggles by swapping variable values on a root class). |

---

## 10. Transitions & Animations

| Property | Description / When to Use |
|---|---|
| `transition` | Shorthand for `transition-property duration timing-function delay`, e.g., `transition: all 0.3s ease-in-out;`. Animates a property change smoothly (hover states, expanding menus). |
| `transition-property` | Which property to animate (`all` for everything, but naming specific properties is better for performance). |
| `timing-function` | `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, or a custom `cubic-bezier()`. |
| `@keyframes name { ... }` | Defines a multi-step animation sequence using percentage or `from`/`to` steps. |
| `animation` | Shorthand to apply a `@keyframes` animation: `animation: name duration timing-function iteration-count;`. |
| `animation-iteration-count: infinite;` | Loops forever. Used for spinners, pulsing indicators. |
| `transform` | Applies 2D/3D transformations without affecting document flow: `translate()`, `scale()`, `rotate()`, `skew()`. Animating `transform` (and `opacity`) is GPU-accelerated and far more performant than animating `top`/`left`/`width`. |
| `transform-origin` | Sets the pivot point for `rotate`/`scale` transforms (default is the element's center). |

---

## 11. Responsive Design

| Concept | Description / When to Use |
|---|---|
| `@media (max-width: 768px) { ... }` | Media query. Applies rules only when the condition matches. Mobile-first practice: write base styles for mobile, then use `min-width` queries to add complexity for larger screens. Opposite philosophy for desktop-first practice. |
| `@media (prefers-color-scheme: dark)` | Detects OS-level dark mode preference. |
| `@media (prefers-reduced-motion: reduce)` | Detects user preference to reduce animation. **respecting this matters for accessibility** (vestibular disorders). |
| `max-width: 100%` on images | Prevents images from overflowing their container on small screens. |
| `clamp(min, preferred, max)` | Fluid values that scale with viewport but stay within bounds. Common for responsive font sizes without a media query: `font-size: clamp(1rem, 2vw, 2rem);`. |
| Container queries `@container (min-width: 400px)` | Styles based on the size of a *containing element* rather than the viewport. Newer, useful for reusable components that must adapt regardless of where they are placed on the page. |

---

## 12. Common Layout Patterns Worth Knowing by Name

| Pattern | How it is typically done |
|---|---|
| Centering a div (both axes) | `display: flex; justify-content: center; align-items: center;` on the parent, or Grid's `place-items: center;`. |
| Sticky footer | Flex column on `<body>`/wrapper with `flex: 1` on the main content area so the footer is pushed down but not off-screen on short pages. |
| Responsive card grid | `display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;` |
| Full-bleed hero image | `background-size: cover; background-position: center; height: 100vh;` |
| Clearfix (legacy, pre-flexbox float issue) | `::after { content: ""; display: table; clear: both; }`;  you will see this in older codebases; modern layout with flex/grid avoids the problem entirely. |

---

## 13. Practices to Avoid in Real Projects

| Old / risky approach | Use instead |
|---|---|
| Floats for page layout (`float: left`) | Flexbox or Grid |
| Fixed `px` for all font sizes | `rem`, with `clamp()` for fluid scaling |
| `!important` to force overrides | Fix selector specificity / reorganize source order |
| Table-based layout via CSS floats/positioning hacks | Grid/Flexbox |
| Removing `outline` on `:focus` with no replacement | Style `:focus-visible` explicitly instead |
| Deeply nested selectors (`.a .b .c .d span`) | Flat, class-based selectors |
| `em` for component sizing (compounding bug) | `rem` for most sizing; `em` only when you deliberately want scaling relative to a local font-size |

---


