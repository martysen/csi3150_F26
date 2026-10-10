# JavaScript & DOM Cheat Sheet

A practical reference for modern JavaScript (ES6+) and browser DOM manipulation. Part 1 covers the core language. Part 2 covers using JavaScript to drive a web page, including forms and calling third party APIs with `fetch`.

---

# PART 1: CORE JAVASCRIPT

## 1. Running JavaScript and Connecting It to HTML

| Approach | Syntax | When to Use |
|---|---|---|
| External file (preferred) | `<script src="app.js" defer></script>` | Standard approach. `defer` downloads the script in parallel and runs it after the HTML is fully parsed, in order, so you can safely touch DOM elements. Put it in `<head>`. |
| External ES module | `<script type="module" src="app.js"></script>` | Enables `import` / `export`. Modules are deferred automatically, run in strict mode, and have their own scope (no accidental globals). |
| Script at end of `<body>` | `<script src="app.js"></script>` | The older way to guarantee the DOM exists before the script runs. `defer` replaces this pattern. |
| `async` attribute | `<script src="analytics.js" async></script>` | Downloads in parallel and runs as soon as ready, in no guaranteed order. Use for independent scripts (analytics), not for code that depends on the DOM or other scripts. |
| Inline script | `<script> console.log("hi"); </script>` | Quick demos only. Hard to maintain and blocked by strict Content Security Policies. |
| Browser console | DevTools (F12), Console tab | Experimenting, debugging. `console.log()`, `console.table()`, `console.error()`. |
| Waiting for the DOM | `document.addEventListener("DOMContentLoaded", () => { ... });` | Only needed if your script is not deferred and runs before the DOM is built. |

Minimal HTML skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Demo</title>
  <script src="app.js" defer></script>
</head>
<body>
  <h1 id="title">Hello</h1>
</body>
</html>
```

---

## 2. Variables and Data Types

| Keyword | Description / When to Use |
|---|---|
| `const` | Binding that cannot be reassigned. Default choice. Note: a `const` object or array can still have its contents mutated, only the binding is fixed. |
| `let` | Block-scoped variable that can be reassigned. Use when the value must change (counters, accumulators). |
| `var` | Function-scoped, hoisted, legacy. Avoid in new code because its scoping rules cause bugs. |

```javascript
const appName = "Demo";
let count = 0;
count = count + 1;
```

**Primitive types:** `string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`. **Everything else is an object** (arrays, functions, dates, plain objects).

| Concept | Example / Note |
|---|---|
| `typeof` | `typeof 42` is `"number"`, `typeof "a"` is `"string"`, `typeof undefined` is `"undefined"`. Known quirk: `typeof null` is `"object"`. |
| Template literals | `` `Hello ${name}, you are ${age + 1} next year` `` supports interpolation and multi-line strings. |
| Truthy / falsy | Falsy values: `false`, `0`, `""`, `null`, `undefined`, `NaN`, `0n`. Everything else is truthy, including `"0"`, `[]`, and `{}`. |
| `null` vs `undefined` | `undefined` means "no value assigned." `null` means "deliberately empty." |
| Type conversion | `Number("42")`, `parseInt("42px", 10)`, `parseFloat("3.14")`, `String(42)`, `Boolean(1)`. `Number("abc")` gives `NaN`; check with `Number.isNaN(x)`. |
| Scope | `let` and `const` are block scoped (`{ }`). Variables declared outside any function are global, so minimize them. |
| Hoisting | `var` and function declarations are hoisted. `let` and `const` exist but cannot be accessed before their declaration line (the "temporal dead zone"). |

---

## 3. Operators

### Arithmetic and assignment (binary)

| Operator | Meaning |
|---|---|
| `+ - * / %` | Add, subtract, multiply, divide, remainder. `+` also concatenates strings. |
| `**` | Exponent: `2 ** 3` is `8`. |
| `= += -= *= /= %= **=` | Assignment and compound assignment (`x += 5` means `x = x + 5`). |


### Unary operators (one operand)

| Operator | Meaning |
|---|---|
| `++x` / `x++` | Increment. Prefix returns the new value, postfix returns the old value, then increments. |
| `--x` / `x--` | Decrement, same prefix/postfix rule. |
| `-x` / `+x` | Negate / convert to number (`+"42"` gives `42`). |
| `!x` | Logical NOT. `!!x` coerces any value to a boolean. |
| `typeof x` | Returns the type as a string. |
| `delete obj.key` | Removes a property from an object. |
| `void expr` | Evaluates and returns `undefined`. Rare. |

### Comparison (binary)

| Operator | Meaning |
|---|---|
| `===` / `!==` | Strict equality (no type coercion). **Always use these.** |
| `==` / `!=` | Loose equality with coercion (`"5" == 5` is `true`). Avoid. |
| `< > <= >=` | Relational comparison. |

### Logical operators

| Operator | Meaning |
|---|---|
| `&&` | AND. Returns the first falsy operand, or the last operand. Often used as a guard: `user && user.name`. |
| `\|\|` | OR. Returns the first truthy operand. Used for defaults, but treats `0` and `""` as missing. |
| `??` | Nullish coalescing. Returns the right side only if the left is `null` or `undefined`. Better for defaults: `const qty = input ?? 1;` keeps a legitimate `0`. |
| `!` | NOT. |


### Ternary operator (three operands)

```javascript
const label = age >= 18 ? "adult" : "minor";
```

Use for simple value selection. Chaining several ternaries gets unreadable, so switch to `if/else` at that point.

### Spread and rest (`...`)

| Use | Example |
|---|---|
| Spread an array | `const merged = [...a, ...b];` |
| Spread an object | `const updated = { ...user, age: 31 };` (shallow copy with override) |
| Rest in function params | `function sum(...nums) { ... }` collects remaining args into an array. |

---

## 4. Branching Statements

```javascript
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else {
  grade = "C";
}
```

```javascript
switch (day) {
  case "sat":
  case "sun":
    type = "weekend";
    break;            // without break, execution "falls through" to the next case
  default:
    type = "weekday";
}
```

| Pattern | Notes |
|---|---|
| Early return / guard clause | `if (!user) return;` at the top of a function avoids deep nesting. |
| `switch` uses strict equality | Matches with `===`. Good for many discrete values, awkward for ranges. |
| Object lookup instead of `switch` | `const labels = { a: "Alpha", b: "Beta" }; labels[key] ?? "Unknown";` |

---

## 5. Loops

| Loop | Syntax | When to Use |
|---|---|---|
| `for` | `for (let i = 0; i < n; i++) { }` | Known number of iterations, or when you need the index. |
| `while` | `while (condition) { }` | Repeat until a condition changes; iteration count unknown. |
| `do...while` | `do { } while (condition);` | Body must run at least once. |
| `for...of` | `for (const item of array) { }` | Iterate **values** of arrays, strings, Maps, Sets. The default choice for arrays. |
| `for...in` | `for (const key in object) { }` | Iterate **keys** of an object. Avoid on arrays (it yields string indexes and inherited properties). |
| `forEach` | `array.forEach((item, i) => { })` | Run a side effect per element. Cannot `break` out and does not wait for `await`. |
| `break` / `continue` | | Exit the loop / skip to the next iteration. |

```javascript
for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}
```

---

## 6. Functions

| Form | Syntax | Notes |
|---|---|---|
| Declaration | `function add(a, b) { return a + b; }` | Hoisted, so callable before its definition appears. **make note of this**. |
| Expression | `const add = function (a, b) { return a + b; };` | Not hoisted. |
| Arrow function | `const add = (a, b) => a + b;` | Concise. Implicit return when the body is a single expression. Does not have its own `this` or `arguments`. |
| Arrow, block body | `const add = (a, b) => { return a + b; };` | Needs explicit `return`. |
| Arrow returning an object | `const make = (n) => ({ name: n });` | Wrap the object literal in parentheses. |
| Single param | `const double = n => n * 2;` | Parentheses optional with exactly one simple parameter. |
| Default parameters | `function greet(name = "friend") { }` | Used when the argument is `undefined`. |
| Rest parameters | `function log(first, ...others) { }` | `others` is a real array. |
| **Destructured parameters** | `function show({ name, age = 0 }) { }` | Common for options objects and React-style props. |
| IIFE | `(function () { ... })();` or `(() => { ... })();` | Immediately Invoked Function Expression. Runs once and keeps its variables private. Mostly replaced by ES modules, but you will see it in older code and bundles. |
| **Callback** | `setTimeout(() => { }, 1000);` | A function passed as an argument to be called later. |
| Higher-order function | `const run = (fn) => fn();` | A function that takes or returns another function. |
| Closure | See below | An inner function remembers variables from the scope where it was created. |

```javascript
function makeCounter() {
  let count = 0;                 // private, only reachable through the returned function
  return () => ++count;
}
const next = makeCounter();
next(); // 1
next(); // 2
```

**`this` rule of thumb:** in a regular function, `this` depends on how it is called. In an arrow function, `this` is inherited from the surrounding scope. For event handlers that need the element, use `event.currentTarget` rather than relying on `this`.

---

## 7. Objects

```javascript
const user = {
  name: "Ada",
  age: 36,
  address: { city: "Detroit" },
  greet() { return `Hi, ${this.name}`; },   // method shorthand
};
```

| Operation | Syntax |
|---|---|
| Read | `user.name`, `user["name"]` (bracket form is needed for dynamic or unusual keys) |
| Write / add | `user.email = "a@b.com";` |
| Delete | `delete user.age;` |
| Check key | `"name" in user`, `Object.hasOwn(user, "name")` |
| Computed key | `const key = "role"; const o = { [key]: "admin" };` |
| Shorthand property | `const name = "Ada"; const o = { name };` |
| Destructuring | `const { name, age } = user;` / rename: `const { name: userName } = user;` / default: `const { role = "guest" } = user;` |
| Nested destructuring | `const { address: { city } } = user;` |
| Keys / values / pairs | `Object.keys(user)`, `Object.values(user)`, `Object.entries(user)` |
| Shallow copy / merge | `{ ...user }`, `Object.assign({}, user, extra)` |
| Deep copy | `structuredClone(user)` (spread only copies one level deep) |
| Freeze | `Object.freeze(obj)` prevents changes (shallow). |
| To / from JSON | `JSON.stringify(user)`, `JSON.parse(text)` |
| Class (template for objects) | `class Person { constructor(n) { this.name = n; } greet() { } }` and `new Person("Ada")` |

---

## 8. Arrays

```javascript
const nums = [10, 20, 30];
```

| Method | Returns / Effect | Mutates original? |
|---|---|---|
| `nums.length` | Number of elements | no |
| `nums[0]`, `nums.at(-1)` | Element by index; `at(-1)` is the last element | no |
| `push(x)` / `pop()` | Add / remove at the **end** | **yes** |
| `unshift(x)` / `shift()` | Add / remove at the **start** | **yes** |
| `splice(start, deleteCount, ...items)` | Remove / insert in place | **yes** |
| `slice(start, end)` | Copy of a portion | no |
| `concat(other)` or `[...a, ...b]` | Combined array | no |
| `indexOf(x)` / `includes(x)` | Position / boolean existence check | no |
| `find(fn)` / `findIndex(fn)` | First matching element / its index | no |
| `filter(fn)` | New array of elements where `fn` is true | no |
| `map(fn)` | New array of transformed elements | no |
| `reduce((acc, x) => ..., initial)` | Collapses to a single value (sum, grouped object, etc.) | no |
| `some(fn)` / `every(fn)` | Does at least one / do all elements pass? | no |
| `sort(compareFn)` | Sorts in place. Default sort is **alphabetical**, so numbers need `(a, b) => a - b`. | **yes** |
| `toSorted()`, `toReversed()` | Non-mutating versions of `sort` / `reverse` (ES2023, modern browsers) | no |
| `reverse()` | Reverses in place | **yes** |
| `join(", ")` | Array to string | no |
| `flat()` / `flatMap(fn)` | Flatten nested arrays / map then flatten | no |
| `Array.isArray(x)` | Reliable array check (`typeof []` is `"object"`) | no |
| `Array.from(iterable)` | Convert NodeList, Set, string, etc. to a real array | no |
| `[a, b] = [b, a]` | Swap via destructuring | yes (variables) |

```javascript
const [first, second, ...rest] = nums;   // array destructuring
```

---

## 9. Arrays of Objects (The Shape of Most Real Data)

API responses, database rows, and UI lists are almost always arrays of objects.

```javascript
const products = [
  { id: 1, name: "Keyboard", price: 49, inStock: true,  category: "tech" },
  { id: 2, name: "Mouse",    price: 25, inStock: false, category: "tech" },
  { id: 3, name: "Desk",     price: 180, inStock: true, category: "furniture" },
];
```

| Task | Code |
|---|---|
| Get one field from every item | `products.map(p => p.name)` |
| Filter by condition | `products.filter(p => p.inStock && p.price < 100)` |
| Find one by id | `products.find(p => p.id === 2)` |
| Sort by number | `[...products].sort((a, b) => a.price - b.price)` (copy first so the original is not mutated) |
| Sort by string | `[...products].sort((a, b) => a.name.localeCompare(b.name))` |
| Sum a field | `products.reduce((sum, p) => sum + p.price, 0)` |
| Group by field | `products.reduce((groups, p) => { (groups[p.category] ??= []).push(p); return groups; }, {})` |
| Add an item (immutable) | `const next = [...products, newProduct];` |
| Update an item (immutable) | `products.map(p => p.id === 2 ? { ...p, price: 30 } : p)` |
| Remove an item (immutable) | `products.filter(p => p.id !== 2)` |
| Does any item match? | `products.some(p => !p.inStock)` |
| Chain operations | `products.filter(p => p.inStock).map(p => p.name).join(", ")` |
| Display as a table in the console | `console.table(products)` |

---

## 10. Error Handling

```javascript
try {
  const data = JSON.parse(text);      // may throw
  process(data);
} catch (error) {
  console.error("Failed:", error.message);
} finally {
  hideSpinner();                       // runs whether or not an error occurred
}
```

| Concept | Notes |
|---|---|
| `throw new Error("message")` | Raise your own error. Always throw `Error` objects, not strings, so you get a stack trace. |
| Common built-in errors | `TypeError` (wrong type, e.g. calling `undefined`), `ReferenceError` (undeclared variable), `SyntaxError` (e.g. bad JSON), `RangeError`. |
| `error.name`, `error.message`, `error.stack` | Useful properties for logging. |
| Custom errors | `class ValidationError extends Error { }` lets you distinguish error kinds with `instanceof`. |
| `catch` without a binding | `catch { ... }` is allowed when you do not need the error object. |
| Async errors | `try/catch` catches rejected promises only when you `await` inside the `try`. See the Async section. |

---

## 11. Asynchronous JavaScript (Required for `fetch`)

JavaScript runs on a single thread. Slow operations (network requests, timers) are started and handled later so the page does not freeze.

| Concept | Syntax | Notes |
|---|---|---|
| Timers | `setTimeout(fn, ms)`, `setInterval(fn, ms)`, `clearTimeout(id)`, `clearInterval(id)` | `setInterval` runs repeatedly until cleared. |
| Promise | An object representing a future result: pending, fulfilled, or rejected. | Returned by `fetch` and many APIs. |
| `.then()` / `.catch()` / `.finally()` | `fetch(url).then(r => r.json()).then(data => ...).catch(err => ...)` | The promise chain style. |
| `async` function | `async function load() { }` or `const load = async () => { };` | Always returns a promise. |
| `await` | `const data = await somePromise;` | Pauses the async function until the promise settles. Only valid inside `async` functions (or top level of modules). |
| `Promise.all([...])` | `const [a, b] = await Promise.all([fetchA(), fetchB()]);` | Run requests in parallel. Rejects if any one fails. |
| `Promise.allSettled([...])` | | Waits for all, reports each success or failure. |
| `Promise.race([...])` | | Settles with the first promise to settle. |

---

# PART 2: JAVASCRIPT AND THE DOM

The **DOM** (Document Object Model) is the browser's live, tree-shaped representation of your HTML. JavaScript reads and changes the page by reading and changing this tree through the global `document` object.

## 12. Selecting Elements and Storing Them in Variables

| Method | Returns | Notes |
|---|---|---|
| `document.getElementById("id")` | One element or `null` | Fastest, no `#` in the argument. |
| `document.querySelector(".card")` | First match or `null` | Accepts any CSS selector. The most versatile method. |
| `document.querySelectorAll("li.item")` | Static `NodeList` of all matches | Supports `forEach` and `for...of`. Wrap with `Array.from()` or `[...list]` to use `map` / `filter`. |
| `document.getElementsByClassName("x")` / `getElementsByTagName("p")` | Live `HTMLCollection` | Older API, updates automatically. Not an array, so convert it before using array methods. |
| `element.querySelector(...)` | Searches within one element | Scope your searches to a container. |
| `element.closest(".card")` | Nearest ancestor (or itself) matching the selector | Essential for event delegation. |
| `element.matches(".active")` | Boolean | Tests whether an element matches a selector. |

```javascript
const title = document.getElementById("title");
const form = document.querySelector("#signup-form");
const items = document.querySelectorAll(".item");
const first = document.querySelector("ul > li:first-child");
```

Always guard against `null` when an element might not exist on every page: `title?.classList.add("big");`

### Navigating the tree

| Property | Meaning |
|---|---|
| `parentElement` | Parent element |
| `children` | Child elements (elements only) |
| `firstElementChild` / `lastElementChild` | First / last child element |
| `nextElementSibling` / `previousElementSibling` | Adjacent sibling elements |
| `childNodes` | All child nodes including text and whitespace nodes (rarely what you want) |

---

## 13. Reading and Updating Content, Attributes, and Properties

| Task | Code | Notes |
|---|---|---|
| Set / read plain text | `el.textContent = "Hello";` | Safe: treats input as text, never as HTML. **Default choice.** |
| Set HTML | `el.innerHTML = "<b>Hi</b>";` | Parses HTML. **Never use with user-supplied or API-supplied strings** (XSS vulnerability). Only use with trusted, static markup. |
| Read visible text | `el.innerText` | Respects CSS visibility and triggers layout. Slower; `textContent` is usually preferred. |
| Get / set attribute | `el.getAttribute("href")`, `el.setAttribute("href", url)` | Works for any attribute. |
| Remove / check attribute | `el.removeAttribute("disabled")`, `el.hasAttribute("disabled")` | |
| Direct properties | `img.src = "a.png"; input.value = ""; checkbox.checked = true; button.disabled = true;` | Preferred for standard attributes and form state. |
| Boolean toggle | `el.toggleAttribute("hidden")` | |
| Custom data attributes | `<div data-user-id="42">` then `el.dataset.userId` | Store small bits of app data on elements. `data-user-id` becomes `userId` (camelCase). |
| `hidden` property | `el.hidden = true;` | Quick show/hide (works via the `hidden` attribute). |
| Focus | `el.focus()`, `el.blur()` | Important for accessibility after dynamic changes. |

---

## 14. Creating, Inserting, Replacing, and Deleting Nodes

### Create and insert

```javascript
const li = document.createElement("li");   // 1. create
li.textContent = "New task";               // 2. configure
li.classList.add("task");
document.querySelector("#list").append(li); // 3. insert into the page
```

| Method | Behavior |
|---|---|
| `document.createElement("tag")` | Creates a detached element. |
| `document.createTextNode("text")` | Creates a text node. |
| `parent.append(a, b, "text")` | Adds nodes or strings at the **end** of the parent. |
| `parent.prepend(node)` | Adds at the **start**. |
| `el.before(node)` / `el.after(node)` | Inserts as a sibling before / after `el`. |
| `parent.appendChild(node)` | Older API; takes exactly one node, returns it. |
| `parent.insertBefore(newNode, referenceNode)` | Older positional insert. |
| `el.insertAdjacentHTML("beforeend", html)` | Insert an HTML string at `beforebegin`, `afterbegin`, `beforeend`, or `afterend`. Same XSS caution as `innerHTML`. |
| `el.cloneNode(true)` | Deep copy (`true`) or shallow copy (`false`) of a node. |
| `template.content.cloneNode(true)` | Clone the inert contents of an HTML `<template>` to stamp out repeated UI. |
| `new DocumentFragment()` or `document.createDocumentFragment()` | Build many nodes off-screen, then insert once for fewer reflows. |

### Update, replace, delete

| Task | Code |
|---|---|
| Replace an element | `oldEl.replaceWith(newEl)` |
| Replace all children | `parent.replaceChildren(...newNodes)` (call with no arguments to empty the parent) |
| Remove an element | `el.remove()` |
| Remove a child (older) | `parent.removeChild(child)` |
| Clear all children | `parent.replaceChildren();` (better than `innerHTML = ""`) |

### Rendering an array of objects to the page

```javascript
const tasks = [
  { id: 1, text: "Write notes", done: false },
  { id: 2, text: "Push to GitHub", done: true },
];

function render(list) {
  const ul = document.querySelector("#list");
  ul.replaceChildren(                       // clear and rebuild
    ...list.map(task => {
      const li = document.createElement("li");
      li.textContent = task.text;           // textContent keeps this XSS safe
      li.dataset.id = task.id;
      li.classList.toggle("done", task.done);
      return li;
    })
  );
}
render(tasks);
```

---

## 15. Styling and Updating Style Sheets

| Task | Code | Notes |
|---|---|---|
| Add / remove / toggle a class | `el.classList.add("active")`, `.remove("active")`, `.toggle("active")` | **Preferred approach.** Keep styles in CSS, let JS flip classes. |
| Force toggle state | `el.classList.toggle("active", isOn)` | Second argument forces add (`true`) or remove (`false`). |
| Check / replace a class | `el.classList.contains("active")`, `el.classList.replace("a", "b")` | |
| Replace all classes | `el.className = "card big"` | Overwrites everything. |
| Inline style | `el.style.backgroundColor = "tomato";` | CSS properties become camelCase (`background-color` becomes `backgroundColor`). Values are strings with units: `"12px"`. |
| Several inline styles | `Object.assign(el.style, { color: "white", padding: "8px" });` | |
| Set / remove CSS variable | `el.style.setProperty("--accent", "#3498db");` / `el.style.removeProperty("--accent")` | Great for theming. Change a variable on `document.documentElement` to retheme the whole page. |
| Read the **computed** style | `getComputedStyle(el).width` | Final value after the cascade. `el.style` only shows inline styles. |
| Read element size / position | `el.getBoundingClientRect()`, `el.offsetWidth`, `el.scrollHeight` | |
| Insert a rule into a stylesheet | `document.styleSheets[0].insertRule(".x { color: red; }", 0);` | Modifies an existing stylesheet at runtime. Same-origin sheets only. |
| Construct a stylesheet | `const sheet = new CSSStyleSheet(); sheet.replaceSync("p { color: blue; }"); document.adoptedStyleSheets = [sheet];` | Modern way to add styles from JS. |
| Add a `<link>` or `<style>` element | `const s = document.createElement("style"); s.textContent = "..."; document.head.append(s);` | Simple dynamic CSS injection. |
| Dark mode toggle pattern | `document.documentElement.dataset.theme = "dark";` with CSS `:root[data-theme="dark"] { ... }` | Persist the choice with `localStorage`. |
| Match a media query | `window.matchMedia("(prefers-color-scheme: dark)").matches` | |

---

## 16. Events and Event Listeners

```javascript
button.addEventListener("click", (event) => {
  console.log("clicked", event.target);
});
```

| Concept | Syntax / Notes |
|---|---|
| Add / remove listener | `el.addEventListener(type, handler, options)`, `el.removeEventListener(type, handler)`. Removal requires the **same function reference**, so anonymous arrows cannot be removed. |
| Options | `{ once: true }` (auto-remove after first call), `{ passive: true }` (promise not to call `preventDefault`, helps scroll performance), `{ capture: true }`. |
| `event.target` | The element that actually triggered the event. |
| `event.currentTarget` | The element the listener is attached to. |
| `event.preventDefault()` | Cancels default behavior (form submission, link navigation). |
| `event.stopPropagation()` | Stops the event bubbling to ancestors. Use sparingly. |
| Bubbling | Most events travel from the target **up** through ancestors, which makes delegation possible. |
| Avoid `onclick="..."` in HTML | Inline handlers mix behavior with markup and conflict with strict CSP. Use `addEventListener`. |

### Common events

| Category | Events |
|---|---|
| Mouse | `click`, `dblclick`, `mouseenter`, `mouseleave`, `mousemove`, `contextmenu` |
| Keyboard | `keydown`, `keyup` (use `event.key`, e.g. `"Enter"`, `"Escape"`). Avoid the deprecated `keypress`. |
| Form | `submit`, `input` (fires on every change), `change` (fires on commit/blur), `focus`, `blur`, `reset` |
| Page | `DOMContentLoaded`, `load`, `resize`, `scroll`, `beforeunload` |
| Pointer / touch | `pointerdown`, `pointermove`, `pointerup` (unifies mouse, touch, pen), `touchstart` |
| Other | `dragstart`, `drop`, `visibilitychange`, `online`, `offline` |

### Event delegation (one listener for many elements)

Instead of attaching a listener to every list item, attach one to the parent and inspect `event.target`. This also works for items added later.

```javascript
document.querySelector("#list").addEventListener("click", (e) => {
  const item = e.target.closest("li");
  if (!item) return;                       // click was not on a list item
  console.log("clicked task", item.dataset.id);
});
```

### Debouncing a noisy event (search-as-you-type)

```javascript
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
search.addEventListener("input", debounce((e) => runSearch(e.target.value)));
```

### Browser storage (for remembering things between visits)

| API | Notes |
|---|---|
| `localStorage.setItem("k", value)` / `getItem("k")` / `removeItem("k")` | Persists until cleared. Strings only, so use `JSON.stringify` / `JSON.parse` for objects. Roughly 5 MB. |
| `sessionStorage` | Same API, cleared when the tab closes. |
| Security note | Never store tokens or secrets in `localStorage` for sensitive apps; any script on the page can read it. |

---

## 17. Forms: Reading Values, Validation, and Submission

### Reading form values

| Task | Code |
|---|---|
| Get the form | `const form = document.querySelector("#signup-form");` |
| Read one field | `form.elements.email.value` or `document.querySelector("#email").value` (always a string, even for `type="number"`) |
| Checkbox / radio | `checkbox.checked` (boolean). Selected radio: `form.querySelector('input[name="plan"]:checked')?.value` |
| Select dropdown | `select.value`, `select.selectedOptions` |
| File input | `fileInput.files[0]` (a `File` object with `name`, `size`, `type`) |
| All fields at once | `const data = new FormData(form);` then `data.get("email")` or `Object.fromEntries(data)` for a plain object (repeated names, such as multiple checkboxes, need `data.getAll("name")`) |

### Handling submission

Listen to the form's **`submit`** event, not the button's `click` event. That way Enter-key submission and assistive technology work too.

```javascript
form.addEventListener("submit", async (event) => {
  event.preventDefault();                  // stop the page reload
  if (!form.checkValidity()) {             // run built-in HTML5 validation
    form.reportValidity();                 // show browser error bubbles
    return;
  }
  const payload = Object.fromEntries(new FormData(form));
  // send it, see the fetch section
});
```

### Validation approaches

| Layer | Tools | Notes |
|---|---|---|
| HTML5 attributes (start here) | `required`, `type="email"`, `minlength`, `maxlength`, `min`, `max`, `pattern` | Free, accessible, no JS needed. |
| Constraint Validation API | `input.validity.valueMissing`, `.typeMismatch`, `.patternMismatch`, `.tooShort`, `.rangeUnderflow`, `input.validationMessage`, `input.checkValidity()`, `form.reportValidity()` | Lets JS inspect why a field is invalid. |
| Custom messages | `input.setCustomValidity("Passwords must match");` | A non-empty string marks the field invalid. **Reset with `setCustomValidity("")`** or the field stays invalid forever. |
| Live feedback | Listen to `input` or `blur` events and toggle an error element and class | Show errors next to the field and link them with `aria-describedby`. |
| Regex checks | `/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(value)` | Good for simple format checks. Email regexes are never perfect, so rely on `type="email"` plus server verification. |
| Disable styles for pristine fields | CSS `:user-invalid` (modern) | Avoids showing red errors before the user has typed anything. |

Custom cross-field validation example:

```javascript
const pw = form.elements.password;
const confirm = form.elements.confirm;

function checkMatch() {
  confirm.setCustomValidity(pw.value === confirm.value ? "" : "Passwords do not match");
}
pw.addEventListener("input", checkMatch);
confirm.addEventListener("input", checkMatch);
```

**Critical rule:** client-side validation is a usability feature, not security. Users can bypass it with DevTools or direct requests. The server must validate everything again.

---

## 18. Calling Third Party APIs with `fetch`

`fetch(url, options)` returns a promise that resolves to a `Response`. Reading the body is a second async step.

### GET request

```javascript
async function loadPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

    if (!response.ok) {                      // fetch does NOT reject on 404 / 500
      throw new Error(`HTTP ${response.status}`);
    }

    const posts = await response.json();     // parse JSON body (also async)
    render(posts);
  } catch (error) {
    console.error("Request failed:", error);
    showErrorMessage("Could not load posts.");
  }
}
```

### POST request with JSON

```javascript
const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hello", body: "World", userId: 1 }),
});
const created = await response.json();
```

### Key points

| Topic | Notes |
|---|---|
| `response.ok` / `response.status` | `ok` is true for 200 to 299. **`fetch` only rejects on network failure**, not on HTTP error codes, so always check `ok`. |
| Reading the body | `await response.json()`, `.text()`, `.blob()`, `.formData()`. The body can be read **only once**. |
| Methods | `GET` (default), `POST`, `PUT` (replace), `PATCH` (partial update), `DELETE`. |
| Headers | `Content-Type` for the request body format, `Authorization: "Bearer <token>"` for authenticated APIs, `Accept` for desired response type. |
| Query strings | `new URLSearchParams({ q: "js", page: 2 }).toString()` builds a safely encoded query: `fetch(\`${url}?${params}\`)`. |
| Sending a form / file upload | `body: new FormData(form)` and **do not** set `Content-Type` manually, because the browser adds the multipart boundary. |
| Cancel or time out | `const c = new AbortController(); fetch(url, { signal: c.signal }); c.abort();` or `fetch(url, { signal: AbortSignal.timeout(5000) })`. Aborting throws an `AbortError`. |
| Parallel requests | `const [users, posts] = await Promise.all([fetch(u).then(r => r.json()), fetch(p).then(r => r.json())]);` |
| Loading and error UI | Show a spinner before the request, hide it in `finally`, and show a message in `catch`. Users need feedback on every network call. |
| Cookies / credentials | Cross-origin requests omit cookies by default. `credentials: "include"` opts in, and the server must allow it. |

### CORS (the error everyone hits)

Browsers block a page from reading responses from a different origin (domain, protocol, or port) unless the **server** sends the right `Access-Control-Allow-Origin` header. If you see a CORS error, the fix is on the API server side (or through your own backend proxy), not in your front-end code. Many public APIs enable CORS for browser use; others are meant for server-side calls only.

### API key safety

Anything in front-end JavaScript is visible to every user. Never put secret API keys in browser code. For APIs that require a secret, call them from your own backend and have the browser call your backend. Keys designed to be public (restricted by domain or quota) are fine in client code.

---

## 19. Practices to Avoid

| Avoid | Use instead |
|---|---|
| `var` | `const` by default, `let` when reassigning |
| `==` and `!=` | `===` and `!==` |
| `innerHTML` with user or API data | `textContent`, or build nodes with `createElement` |
| Inline `onclick="..."` attributes | `addEventListener` |
| Attaching a listener to every list item | Event delegation on the parent |
| Mutating arrays with `sort()` / `reverse()` on shared data | Copy first (`[...arr]`) or use `toSorted()` / `toReversed()` |
| Forgetting `event.preventDefault()` on form submit | Always handle it when you intend to submit with `fetch` |
| Assuming `fetch` rejects on 404 / 500 | Check `response.ok` |
| Ignoring failure paths | Wrap network and parsing code in `try/catch` and show the user something |
| Querying the DOM repeatedly inside loops | Select once, store in a variable, reuse |
| Global variables everywhere | Modules (`type="module"`), or functions and blocks for scope |
| Trusting client-side validation alone | Validate again on the server |
| Writing styles through `el.style` everywhere | Toggle CSS classes and keep styling in stylesheets |
| `document.write()` | DOM creation methods |

---

