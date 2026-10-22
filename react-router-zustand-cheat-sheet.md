# React, React Router & Zustand Cheat Sheet

A practical reference for building single page apps with React (JSX), routing with React Router, and global state with Zustand. Referred documentation for **React 19**, **React Router v7/v8** (the `react-router` package), and **Zustand v5**. Check your tech stack when referring to this doc. 

**Prerequisites:** the JavaScript & DOM cheat sheet (arrow functions, destructuring, spread, `map`/`filter`, promises, `async`/`await`, ES modules).

---

# PART 1: REACT & JSX

## 1. What React Is and the Mental Model

React is a library for building UIs from **components**: functions that take inputs (**props**) and return a description of the UI (**JSX**). You never edit the DOM directly. Instead, you hold **state**, and React re-renders components when state changes, then updates only the parts of the real DOM that differ.

| Concept | Meaning |
|---|---|
| Component | A function that returns JSX. Name must start with a capital letter (`UserCard`, not `userCard`). |
| Props | Read-only inputs passed from parent to child. Never mutate them. |
| State | Data a component remembers between renders. Changing it triggers a re-render. |
| Render | Calling your component function to compute the UI. It must be **pure**: same props and state in, same JSX out, no side effects in the body. |
| Virtual DOM / reconciliation | React diffs the new JSX output against the previous one and applies minimal DOM updates. |
| Unidirectional data flow | Data flows down via props. Children talk to parents by calling functions passed as props. |
| Declarative | You describe what the UI should look like for a given state, not the step-by-step DOM operations. |

---

## 2. Project Setup (Vite)

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

| File | Purpose |
|---|---|
| `index.html` | Single HTML page with `<div id="root"></div>` and a `<script type="module" src="/src/main.jsx">`. |
| `src/main.jsx` | Entry point that mounts React. |
| `src/App.jsx` | Your root component. |
| `package.json` | Dependencies and scripts (`dev`, `build`, `preview`). |

```jsx
// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

`StrictMode` is a dev-only helper. It renders components twice and re-runs effects once on mount to expose impure code and missing cleanups. Seeing logs twice in development is expected.

Install the libraries covered here:

```bash
npm install react-router zustand
```

---

## 3. JSX Syntax Rules

JSX is syntax sugar that a compiler (Vite/Babel/SWC) turns into JavaScript function calls. It looks like HTML but is **JavaScript**, so the rules differ.

| Rule | Example / Note |
|---|---|
| Return **one root element** [MOST COMMON ERROR FOR BEGINNERS] | Wrap siblings in a parent or a Fragment: `<>...</>` (short) or `<Fragment key={id}>...</Fragment>` (when a key is needed). |
| **Close every tag** | `<img />`, `<input />`, `<br />`. Void tags must self-close. |
| Embed JavaScript **expressions** with `{ }` | `<h1>{user.name}</h1>`, `<p>{a + b}</p>`, `<li>{items.length} items</li>`. Only **expressions** are allowed, not statements (`if`, `for`, `const`). |
| Attributes use `{}` for non-strings | `<Cart count={3} active={true} style={{ color: "red" }} />`. Strings use quotes: `<a href="/home">`. |
| Components are capitalized | `<Button />` is a component. `<button />` is a DOM tag. Lowercase names are treated as HTML. |
| Comments inside JSX | `{/* comment */}` |
| Multi-line JSX in `return` | Wrap in parentheses to avoid automatic semicolon insertion: `return ( <div>...</div> );` |
| Boolean shorthand | `<input disabled />` equals `disabled={true}`. |
| Spread props | `<Button {...props} />` passes every key of `props` as an attribute. |
| `null`, `undefined`, `true`, `false` render nothing | Useful for conditional rendering. **`0` and `NaN` do render**, which causes the classic bug `{count && <List />}` printing `0`. Use `{count > 0 && <List />}`. |
| Objects are not valid children | `{ {a:1} }` throws. Render fields (`{obj.a}`) or map arrays. |
| Strings from variables are escaped | JSX auto-escapes values, which protects against XSS. |
| Whitespace | JSX trims whitespace at line starts and ends. Use `{" "}` for an explicit space between inline elements on separate lines. |
| Namespaced / custom attributes | `data-*` and `aria-*` stay hyphenated in JSX. |

```jsx
function Greeting({ name, isMember }) {
  const year = new Date().getFullYear();     // JS goes ABOVE the return
  return (
    <>
      <h1 className="title">Hello, {name}!</h1>
      <p>{isMember ? "Welcome back" : "Please sign up"}</p>
      <small>&copy; {year}</small>
    </>
  );
}
```

---

## 4. Reserved Words and Attribute Differences in JSX

This section answers "why can't I write `class`?" and lists every other place JSX differs from HTML.

### 4.1 The `class` and `for` rule, and the real reason

| HTML | JSX | Why |
|---|---|---|
| `class="card"` | `className="card"` | React props map to **DOM property names** (`element.className`), not HTML attribute names. |
| `<label for="email">` | `<label htmlFor="email">` | The DOM property is `label.htmlFor`. |

**A correction to the common explanation.** The usual story is "`class` is reserved in JavaScript, so JSX can't use it." That was the historical motivation (in ES3, reserved words could not be used as property names, and `class`/`for` are reserved), but it is no longer the technical reason, since modern JavaScript allows reserved words as object keys (`{ class: "x" }` is legal). The real reason today is that React deliberately mirrors the **DOM API's property names**, which are `className` and `htmlFor`. In practice: React will warn in the console if you write `class` and you should always use `className`.

The reserved-word problem still bites in **JavaScript code** you write around JSX:

| Situation | Problem | Fix |
|---|---|---|
| Destructuring a prop named like a keyword | `function Box({ class }) {}` is a syntax error because `class` cannot be a variable name | Use `className`, or rename: `function Box({ class: cls }) {}` |
| Naming a variable or component | `const new = 1`, `function default() {}`, `const for = []`, `const function = ...` are all errors | Choose another identifier (`isNew`, `defaultValue`, `forms`) |
| Component named like a keyword | `function Switch() {}` is fine, but `function new() {}` is not | Capitalized names (`New`) are legal and are required for components anyway |
| Passing a CSS class helper | `<div class={cls}>` | `<div className={cls}>` |

### 4.2 Renamed attributes (HTML to JSX)

| HTML attribute | JSX prop | Notes |
|---|---|---|
| `class` | `className` | Accepts a string. Build dynamic ones with template literals or a helper like `clsx`. |
| `for` | `htmlFor` | On `<label>` (and `<output>`). |
| `tabindex` | `tabIndex` | camelCase |
| `readonly` | `readOnly` | |
| `maxlength` / `minlength` | `maxLength` / `minLength` | |
| `colspan` / `rowspan` | `colSpan` / `rowSpan` | |
| `contenteditable` | `contentEditable` | |
| `autofocus` | `autoFocus` | React calls `focus()` on mount. |
| `autocomplete` | `autoComplete` | |
| `crossorigin` | `crossOrigin` | |
| `srcset` | `srcSet` | |
| `charset` | `charSet` | |
| `http-equiv` | `httpEquiv` | |
| `accept-charset` | `acceptCharset` | |
| `enctype` | `encType` | |
| `novalidate` | `noValidate` | |
| `datetime` | `dateTime` | |
| `usemap` | `useMap` | |
| `value` (uncontrolled default) | `defaultValue` | Use `value` + `onChange` for controlled inputs. |
| `checked` (uncontrolled default) | `defaultChecked` | Use `checked` + `onChange` for controlled. |
| `selected` on `<option>` | `value` on `<select>` | Set `<select value={x}>` instead of `selected`. |
| `innerHTML` | `dangerouslySetInnerHTML={{ __html: html }}` | The name is a deliberate warning (XSS risk). Never use with untrusted strings. |

### 4.3 Event handler props

| HTML | JSX | Notes |
|---|---|---|
| `onclick="fn()"` | `onClick={fn}` | camelCase, and the value is a **function reference**, not a string. |
| `onchange`, `oninput`, `onsubmit` | `onChange`, `onInput`, `onSubmit` | |
| `onkeydown`, `onmouseenter` | `onKeyDown`, `onMouseEnter` | |

```jsx
<button onClick={handleSave}>Save</button>          // correct: pass the function
<button onClick={handleSave()}>Save</button>        // BUG: calls it during render
<button onClick={() => remove(id)}>Delete</button>  // correct: wrapper to pass args
```

### 4.4 The `style` prop

`style` takes a **JavaScript object**, not a CSS string. Property names are camelCase, values are strings (or numbers, which become `px` for most properties).

```jsx
<div style={{ backgroundColor: "tomato", fontSize: 16, marginTop: "1rem" }} />
```

The double braces are just an object literal (`{ ... }`) inside the JSX expression slot (`{ }`). CSS custom properties need quotes: `style={{ "--accent": "#09f" }}`.

### 4.5 SVG attributes

| SVG attribute | JSX prop |
|---|---|
| `stroke-width` | `strokeWidth` |
| `stroke-linecap` / `stroke-linejoin` | `strokeLinecap` / `strokeLinejoin` |
| `fill-rule` / `clip-rule` | `fillRule` / `clipRule` |
| `xlink:href` | `href` |
| `viewBox` | `viewBox` (already camelCase) |
| `class` | `className` |

### 4.6 Special props reserved by React

These names have special meaning, so a component will not receive them as ordinary props (except `ref` in React 19):

| Prop | Behavior |
|---|---|
| `key` | Identifies list items for reconciliation. **Not passed to the child** (`props.key` is undefined). Must be stable and unique among siblings. |
| `ref` | In React 19, `ref` is an **ordinary prop for function components** (no `forwardRef` needed). On DOM elements it gives you the node. |
| `children` | Whatever is nested between the tags: `<Card>hello</Card>` gives `props.children === "hello"`. |
| `dangerouslySetInnerHTML` | Raw HTML injection, described above. |
| `suppressHydrationWarning` | Silences hydration mismatch warnings for one element (SSR). |

### 4.7 Keywords and statements that cannot go inside `{ }`

Because `{ }` holds an **expression**, these are not allowed directly in JSX, with the replacement:

| Not allowed in JSX braces | Use instead |
|---|---|
| `if (...) { }` / `else` | Ternary `cond ? <A/> : <B/>`, or `cond && <A/>`, or compute a variable above `return` |
| `for (...) { }` / `while` | `array.map(item => <li key={item.id}>...</li>)` |
| `switch` | Object lookup, helper function, or if/else above the `return` |
| `const x = ...` | Declare above `return`, or use an IIFE (rarely worth it) |
| `return` inside markup | Early `return` at the **top** of the component body |

### 4.8 Other JSX gotchas

| Gotcha | Detail |
|---|---|
| `<input>` with `value` but no `onChange` | Becomes read-only and React warns. Use `defaultValue` or add `onChange`. |
| Component names must be capitalized | `<card />` renders an HTML tag named "card". `<Card />` renders your component. |
| Dot-notation components | `<Menu.Item />` is valid. |
| Dynamic tag name | `const Tag = isHeading ? "h1" : "p"; return <Tag>Hi</Tag>;` (variable must be capitalized). |
| `aria-*` and `data-*` | Keep the hyphen: `aria-label`, `data-id`. |
| Custom elements (web components) | May use `class` (React 19 passes custom element props as attributes when appropriate). |
| `async` components | Client components cannot be `async`. Fetch in effects, loaders, or with `use()`. |

---

## 5. Components and Props

```jsx
// Define
function UserCard({ name, email, role = "guest", children }) {
  return (
    <article className="card">
      <h2>{name}</h2>
      <p>{email}</p>
      <span>{role}</span>
      {children}
    </article>
  );
}

// Use
<UserCard name="Ada" email="ada@example.com">
  <button>Message</button>
</UserCard>

// Spread an object of props
const user = { name: "Ada", email: "ada@example.com" };
<UserCard {...user} role="admin" />
```

| Pattern | Notes |
|---|---|
| Destructure props in the parameter list | `function Card({ title, onSelect })` is the standard style. |
| Default values | `role = "guest"` in the destructure. (`defaultProps` on function components was removed in React 19.) |
| `children` prop | Enables composition and wrapper/layout components. |
| Passing functions | `<Child onSave={handleSave} />` is how children notify parents. |
| Prop drilling | Passing props through many levels. Solve with composition, context, or a store like Zustand. |
| Props are read-only | Never write `props.x = ...`. Copy into state if you need a local editable version. |
| PropTypes / TypeScript | PropTypes checking was removed in React 19. Use TypeScript for type safety. |
| File organization | One component per file, filename matches the component, `export default` or named exports. |

---

## 6. Conditional Rendering

```jsx
function Status({ loading, error, data }) {
  if (loading) return <Spinner />;            // early return
  if (error)   return <p role="alert">{error.message}</p>;

  return (
    <section>
      {data.length > 0 ? <List items={data} /> : <p>No results.</p>}
      {data.length > 10 && <Pagination />}
      {user?.isAdmin && <AdminPanel />}
    </section>
  );
}
```

| Technique | When to use |
|---|---|
| Early `return` | Loading, error, empty, and not-authorized states. Keeps the happy path unindented. |
| Ternary `a ? <X/> : <Y/>` | Choose between two outputs. |
| `&&` short circuit | Show or hide one thing. Beware of `0` (see 3). |
| `?? null` / `|| null` | Render nothing explicitly. |
| Variable above `return` | Complex logic: `let content; if (...) content = <A/>; else content = <B/>;` |
| CSS class toggle | When you want the element mounted but hidden (preserve state): `className={open ? "open" : ""}`. |

---

## 7. Lists and Keys

```jsx
function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className={todo.done ? "done" : ""}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggle(todo.id)}
          />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

| Rule | Detail |
|---|---|
| Every item in a rendered array needs a `key` | The `key` goes on the **outermost element returned from `map`**. |
| Keys must be stable and unique among siblings | Use database ids. |
| **Do not use array index as key** | If the list can reorder, insert, or delete, state attached to items (input text, focus) gets mixed up. Index is acceptable only for static lists that never change. |
| Never generate keys during render | `key={Math.random()}` remounts every item every render. |
| Filter then map | `todos.filter(t => !t.done).map(...)` |
| Use a key to reset state | Changing a component's `key` unmounts and remounts it with fresh state: `<Profile key={userId} />`. |

---

## 8. Events

```jsx
function SearchBox() {
  function handleSubmit(event) {
    event.preventDefault();                 // stop the full page reload
    const data = new FormData(event.currentTarget);
    console.log(data.get("q"));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="q" onKeyDown={(e) => e.key === "Escape" && e.target.blur()} />
      <button type="submit">Search</button>
    </form>
  );
}
```

| Concept | Notes |
|---|---|
| Handler receives a SyntheticEvent | A cross browser wrapper with `target`, `currentTarget`, `preventDefault()`, `stopPropagation()`, `key`, etc. |
| `e.target` vs `e.currentTarget` | `target` is the element that triggered the event, `currentTarget` is the element the handler is attached to. |
| Naming convention | Props: `onSomething`. Handler functions: `handleSomething`. |
| Passing arguments | `onClick={() => deleteItem(id)}` (inline arrow) |
| Capture phase | Append `Capture`: `onClickCapture`. |
| Event delegation | React already delegates at the root for you. Do not attach listeners to every row manually. |
| Common events | `onClick`, `onChange`, `onInput`, `onSubmit`, `onFocus`, `onBlur`, `onKeyDown`, `onKeyUp`, `onMouseEnter`, `onMouseLeave`, `onScroll`, `onDrop`, `onPointerDown`. |

---

## 9. State with `useState`

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);        // [value, setter]

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Clicked {count} times
    </button>
  );
}
```

| Rule | Detail |
|---|---|
| Hooks only at the **top level** | Never inside conditions, loops, or nested functions. |
| Hooks only in components or custom hooks | Not in regular functions or class components. |
| Setting state is **asynchronous and batched** | `setCount(count + 1); console.log(count)` logs the **old** value. The new value appears on the next render. |
| Use the **functional update** form when the new value depends on the old | `setCount(c => c + 1)`. Calling `setCount(count + 1)` three times in a row only increments once, but three functional updates increment by three. |
| State is a **snapshot per render** | Event handlers see the values from the render they were created in. |
| **Never mutate state** | Create new objects and arrays so React sees a changed reference. |
| Lazy initial state | `useState(() => expensiveCompute())` runs the initializer only on first render. |
| Setting the same value (by `Object.is`) skips re-render | |

### Updating objects and arrays immutably

| Task | Code |
|---|---|
| Update an object field | `setUser(u => ({ ...u, name: "Ada" }))` |
| Update a nested field | `setForm(f => ({ ...f, address: { ...f.address, city: "Detroit" } }))` |
| Add to an array | `setItems(list => [...list, newItem])` |
| Remove from an array | `setItems(list => list.filter(i => i.id !== id))` |
| Update one item | `setItems(list => list.map(i => i.id === id ? { ...i, done: true } : i))` |
| Insert at index | `setItems(l => [...l.slice(0, i), item, ...l.slice(i)])` |
| Sort or reverse | Copy first: `setItems(l => [...l].sort(...))` or `l.toSorted(...)` |
| Deep copy | `structuredClone(obj)` |

### Where should state live?

| Situation | Solution |
|---|---|
| Used by one component | `useState` in that component |
| Shared by two siblings | **Lift state up** to their nearest common parent and pass down via props |
| Shared by a distant subtree, changes rarely (theme, locale, current user) | Context (section 11) |
| Shared app wide, changes often, many consumers | A store such as Zustand (Part 3) |
| Derived from other state | **Do not store it.** Compute it during render. |
| Comes from the URL | Router (Part 2), not state |
| Server data (cache, refetch) | A data library (TanStack Query) or router loaders |

---

## 10. Effects with `useEffect`

Effects synchronize your component with something **outside React** (network, timers, subscriptions, browser APIs). They run **after** the render is painted.

```jsx
import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`/api/users/${userId}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setUser(await res.json());
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        setLoading(false);
      }
    }
    load();

    return () => controller.abort();      // cleanup: runs before re-run and on unmount
  }, [userId]);                           // dependency array

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <h1>{user.name}</h1>;
}
```

| Dependency array | Behavior |
|---|---|
| `useEffect(fn)` (no array) | Runs after **every** render. Rarely wanted. |
| `useEffect(fn, [])` | Runs once after the first render (and cleanup on unmount). |
| `useEffect(fn, [a, b])` | Runs after first render and whenever `a` or `b` changes. |

| Rule | Detail |
|---|---|
| List **every** reactive value used inside the effect | Props, state, and variables derived from them. The ESLint rule `react-hooks/exhaustive-deps` enforces this. |
| Always return a **cleanup** for subscriptions, timers, listeners, and in-flight requests | Prevents leaks and race conditions. |
| The effect callback cannot be `async` | Define an inner async function and call it (as above). |
| Objects, arrays, and functions created in render are new every render | They make effects re-fire if used as dependencies. Move them inside the effect, or memoize them. |
| **You might not need an effect** | Do not use effects to compute derived values (do it in render), to respond to user events (use handlers), or to reset state on prop change (use a `key`). |
| Strict Mode runs mount, cleanup, mount in development | If your effect breaks, the cleanup is missing. |
| Fetching in effects is the basic approach | For real apps prefer router loaders, TanStack Query, or `use()` + Suspense to avoid race conditions and waterfalls. |

---

## 11. The Other Built-in Hooks

| Hook | Purpose | Example |
|---|---|---|
| `useRef` | A mutable box that **does not trigger re-render** when changed. Holds DOM nodes, timer ids, previous values. | `const inputRef = useRef(null); <input ref={inputRef} />; inputRef.current.focus();` |
| `useContext` | Read a value from the nearest Provider, skipping prop drilling. | See below. |
| `useReducer` | `useState` alternative for complex state with many transitions. | `const [state, dispatch] = useReducer(reducer, initial);` |
| `useMemo` | Cache an **expensive computed value** between renders. | `const sorted = useMemo(() => sort(items), [items]);` |
| `useCallback` | Cache a **function reference** (useful when passing to memoized children or effect deps). | `const onSave = useCallback(() => save(id), [id]);` |
| `useId` | Generate a stable unique id for accessibility (`htmlFor` / `id` pairs). | `const id = useId(); <label htmlFor={id}>` |
| `useLayoutEffect` | Like `useEffect` but runs **before paint**. Use for measuring layout. | Rare. |
| `useImperativeHandle` | Customize what a parent sees via `ref`. | Rare. |
| `useTransition` | Mark a state update as low priority so the UI stays responsive. | `const [isPending, startTransition] = useTransition();` |
| `useDeferredValue` | Defer re-rendering with a lagging copy of a value (search-as-you-type lists). | `const deferredQuery = useDeferredValue(query);` |
| `useSyncExternalStore` | Subscribe to an external store safely. (Libraries like Zustand use it internally.) | Rare in app code. |
| `useDebugValue` | Label a custom hook in React DevTools. | Rare. |

Do not reach for `useMemo` and `useCallback` by default. They add complexity and only help when a measured render is slow or when reference stability matters (memoized children, effect dependencies).

### Context

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light");           // default value

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext value={{ theme, setTheme }}>        {/* React 19: no .Provider needed */}
      {children}
    </ThemeContext>
  );
}

export const useTheme = () => useContext(ThemeContext);

function ThemeButton() {
  const { theme, setTheme } = useTheme();
  return <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme}</button>;
}
```

Every component that reads a context re-renders whenever the context `value` changes. That makes context a poor fit for large, frequently updated state. Use Zustand for that.

### Reducer

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "add":    return { ...state, items: [...state.items, action.item] };
    case "remove": return { ...state, items: state.items.filter(i => i.id !== action.id) };
    default:       throw new Error(`Unknown action ${action.type}`);
  }
}
const [state, dispatch] = useReducer(reducer, { items: [] });
dispatch({ type: "add", item });
```

---

## 12. React 19 and 19.2 Additions

| Feature | What it does |
|---|---|
| `ref` as a prop | Function components receive `ref` like any prop. `forwardRef` is no longer needed. |
| `<Context value={...}>` | Render the context object directly as the provider. |
| Ref callback cleanup | A ref callback can return a cleanup function. |
| `use(promiseOrContext)` | Read a promise (suspends until it resolves) or a context, and **can be called conditionally**, unlike other hooks. Pair with `<Suspense>`. The promise should come from a parent, a cache, or a library, not be created fresh in render. |
| `useActionState(action, initialState)` | Manages form action state (result, error, pending): `const [state, formAction, isPending] = useActionState(fn, null);` |
| `<form action={fn}>` | Pass a function as `action`. React calls it with `FormData` and resets uncontrolled fields on success. |
| `useFormStatus()` | A child of a `<form>` reads `{ pending }` for the parent form submit state (from `react-dom`). |
| `useOptimistic(state)` | Show an optimistic value while an async action is pending. |
| Document metadata | `<title>`, `<meta>`, and `<link>` rendered anywhere in a component are hoisted to `<head>`. |
| `useEffectEvent` (19.2) | Extract non-reactive logic from an effect so it always reads the latest props/state without being a dependency. Call it only from inside effects. |
| `<Activity mode="visible" \| "hidden">` (19.2) | Hide part of the UI while preserving its state and deprioritizing its updates. |
| Removed in 19 | `propTypes` checking, `defaultProps` on function components, string refs, legacy context, `ReactDOM.render` (use `createRoot`). |

```jsx
import { useActionState } from "react";

function SignupForm() {
  const [error, submitAction, isPending] = useActionState(async (prev, formData) => {
    const email = formData.get("email");
    const res = await fetch("/api/signup", { method: "POST", body: JSON.stringify({ email }) });
    return res.ok ? null : "Signup failed";
  }, null);

  return (
    <form action={submitAction}>
      <input name="email" type="email" required />
      <button disabled={isPending}>{isPending ? "Saving..." : "Sign up"}</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
```

---

## 13. Forms

### Controlled inputs (React owns the value)

```jsx
function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />

      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />

      <label>
        <input name="remember" type="checkbox" checked={form.remember} onChange={handleChange} />
        Remember me
      </label>

      <button type="submit">Log in</button>
    </form>
  );
}
```

| Element | Controlled props |
|---|---|
| `<input type="text/email/...">`, `<textarea>` | `value` + `onChange` |
| `<input type="checkbox/radio">` | `checked` + `onChange` |
| `<select>` | `value` on `<select>` + `onChange` (React puts `value`, not `selected`, on the select) |
| `<input type="file">` | Always uncontrolled; read `e.target.files` |
| Multiple select | `<select multiple value={arr}>` |

### Uncontrolled inputs (the DOM owns the value)

Use `defaultValue`, read with `FormData` on submit or with a `ref`. Less code, great for simple forms: `new FormData(e.currentTarget)`.

| Choose | When |
|---|---|
| Controlled | Live validation, formatting as you type, disabling the button based on values, dependent fields. |
| Uncontrolled / `FormData` | Simple submit-only forms, file inputs. |
| Form libraries | `react-hook-form` (performance, validation) with `zod` schemas for large forms. |

Validation advice carries over from HTML: use native attributes (`required`, `pattern`, `type="email"`) first, show errors with `aria-describedby`, and **always validate again on the server**.

---

## 14. Custom Hooks

A custom hook is a function whose name starts with `use` and that calls other hooks. It shares **logic**, not state (each caller gets its own state).

```jsx
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function useFetch(url) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  useEffect(() => {
    const ctrl = new AbortController();
    setState({ data: null, error: null, loading: true });
    fetch(url, { signal: ctrl.signal })
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((error) => { if (error.name !== "AbortError") setState({ data: null, error, loading: false }); });
    return () => ctrl.abort();
  }, [url]);
  return state;
}
```

---

## 15. Composition, Suspense, Errors, and Performance

| Tool | Purpose / Example |
|---|---|
| Composition via `children` | `function Modal({ children }) { return <div className="modal">{children}</div>; }` |
| Slots via props | `<Layout header={<Header/>} sidebar={<Nav/>}>...</Layout>` |
| `React.lazy` + `<Suspense>` | Code split: `const Chart = lazy(() => import("./Chart")); <Suspense fallback={<Spinner/>}><Chart/></Suspense>` |
| Error boundary | A class component (or library `react-error-boundary`) that catches render errors in its subtree and shows a fallback. Function components cannot be error boundaries on their own. |
| `React.memo(Component)` | Skip re-render when props are shallow equal. Use with stable (memoized) prop references. |
| Portals | `createPortal(<Modal/>, document.body)` renders children into a different DOM node (modals, tooltips). |
| Fragment | `<></>` avoids extra wrapper `div`s. |
| React DevTools (browser extension) | Inspect the component tree, props, state, and profile renders. |

### Styling options

| Option | Notes |
|---|---|
| Plain CSS file + `className` | `import "./App.css";` (global, simplest) |
| CSS Modules | `import styles from "./Card.module.css"; <div className={styles.card}>` (locally scoped class names) |
| Inline `style={{...}}` | Dynamic one-offs only. No pseudo-classes or media queries. |
| Tailwind CSS | Utility classes in `className`. |
| CSS-in-JS (styled-components, Emotion) | Component scoped styles; increasingly replaced by CSS Modules and Tailwind. |
| `clsx` | `className={clsx("btn", active && "btn-active")}` for conditional classes. |

---

# PART 2: REACT ROUTER

React Router maps URLs to components in a single page app. It runs in three modes. This section covers **data mode** (`createBrowserRouter`) and **declarative mode** (`<BrowserRouter>`), which are the library modes. A third, **framework mode**, is a full build setup (file based routes, SSR, `react-router.config.ts`) and is mentioned at the end.

**Version note.** React Router v7 merged the old `react-router-dom` package into `react-router`. Version 8 removes `react-router-dom` entirely, is ESM-only, and requires React 19.2+ and Node 22+. For all new code, import from `react-router` and import `RouterProvider` from `react-router/dom`. In older v6 tutorials you will see `import ... from "react-router-dom"`, which you should translate.

```bash
npm install react-router
```

## 16. Choosing a Mode

| Mode | Setup | Use for |
|---|---|---|
| Declarative | `<BrowserRouter><Routes><Route/></Routes></BrowserRouter>` | Simple apps, learning, no data APIs. |
| Data | `createBrowserRouter([...])` + `<RouterProvider>` | SPAs that want loaders, actions, pending UI, and error boundaries. **Recommended default for teaching.** |
| Framework | `@react-router/dev` + Vite plugin, `app/routes.ts` | Full stack apps with SSR, type safe route modules (the successor to Remix). |

## 17. Declarative Mode

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 18. Data Mode: Route Objects, Layouts, and Nesting

```jsx
// src/main.jsx
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { createRoot } from "react-dom/client";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,                      // layout with <Outlet />
    ErrorBoundary: RootError,                   // shown on any error below
    children: [
      { index: true, Component: Home },         // matches "/"
      { path: "about", Component: About },      // matches "/about"
      {
        path: "users",
        children: [
          { index: true, Component: UserList, loader: usersLoader },
          { path: ":userId", Component: UserDetail, loader: userLoader, action: userAction },
        ],
      },
      { path: "dashboard", lazy: () => import("./routes/dashboard") },  // code split route
      { path: "*", Component: NotFound },
    ],
  },
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
```

| Route object field | Purpose |
|---|---|
| `path` | URL segment. Relative to the parent. `:id` is a dynamic param, `*` is a splat (catch-all). Optional segment: `"users/:id?"`. |
| `index: true` | Default child rendered at the parent's URL. Has no `path`. |
| `Component` / `element` | What to render. `Component: Home` or `element: <Home />` (both work). |
| `children` | Nested routes, rendered where the parent places `<Outlet />`. |
| `loader` | Async function that fetches data **before** the route renders. |
| `action` | Async function that handles form submissions (POST/PUT/PATCH/DELETE) for the route. |
| `ErrorBoundary` / `errorElement` | UI shown when this route (or children) throws in render, loader, or action. |
| `HydrateFallback` | UI shown while initial loaders run. |
| `lazy` | Dynamically import route module pieces to code split. |
| `shouldRevalidate` | Fine tune when loaders re-run. |
| `handle` | Arbitrary metadata (breadcrumbs, titles) readable via `useMatches()`. |
| `id` | Custom route id, used by `useRouteLoaderData`. |

### Layout route with `<Outlet />`

```jsx
import { Outlet, NavLink, useNavigation } from "react-router";

function RootLayout() {
  const navigation = useNavigation();
  return (
    <>
      <header>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>Users</NavLink>
        </nav>
      </header>
      <main style={{ opacity: navigation.state === "loading" ? 0.6 : 1 }}>
        <Outlet />                      {/* the matched child route renders here */}
      </main>
    </>
  );
}
```

Pathless layout routes (a route with `Component` + `children` but no `path`) let you share a layout or guard across several URLs without adding a URL segment.

## 19. Navigation Components and Hooks

| API | Purpose |
|---|---|
| `<Link to="/path">` | Client side navigation with no page reload. Renders an `<a>`. Props: `to`, `replace`, `state`, `viewTransition`, `reloadDocument`. |
| `<NavLink to="/path">` | A `Link` that knows if it is active. `className`/`style`/children can be functions of `{ isActive, isPending }`. Add `end` to avoid matching child URLs (important for `/`). |
| `<Navigate to="/login" replace />` | Declarative redirect when rendered. |
| `useNavigate()` | `const navigate = useNavigate(); navigate("/dashboard"); navigate(-1); navigate("/x", { replace: true, state: {...} });` |
| `redirect("/login")` | Returned or thrown from a **loader or action** to redirect. |
| `useParams()` | `const { userId } = useParams();` Values are always strings. |
| `useSearchParams()` | `const [params, setParams] = useSearchParams(); params.get("q"); setParams({ q: "react", page: "2" });` Great for filters and pagination. |
| `useLocation()` | `{ pathname, search, hash, state, key }` for the current location. |
| `useMatch("/users/:id")` | Test whether a pattern matches the current URL. |
| `useMatches()` | All matched routes with their `handle` and data (breadcrumbs). |
| `useOutletContext()` | Read the value a parent passed with `<Outlet context={...} />`. |
| `useNavigationType()` | `"PUSH"`, `"POP"`, or `"REPLACE"`. |
| `<ScrollRestoration />` | Restores or resets scroll position on navigation. Render once in the root layout. |

Prefer `<Link>` over `<a href>` for internal navigation (an `<a>` triggers a full page reload). Use `<a>` for external URLs.

## 20. Loaders: Fetching Data Before Render

```jsx
// loader runs before the component renders; no loading state needed in the component
export async function userLoader({ params, request }) {
  const url = new URL(request.url);
  const tab = url.searchParams.get("tab") ?? "profile";

  const res = await fetch(`/api/users/${params.userId}`, { signal: request.signal });
  if (res.status === 404) throw new Response("Not Found", { status: 404 });
  if (!res.ok) throw new Error("Failed to load user");

  return { user: await res.json(), tab };       // return plain objects (json() helper is removed in v7+)
}

import { useLoaderData } from "react-router";

function UserDetail() {
  const { user, tab } = useLoaderData();
  return <h1>{user.name}</h1>;
}
```

| Concept | Detail |
|---|---|
| Loader args | `{ params, request, context }`. `request` is a standard Fetch `Request` (use it for the URL, search params, cookies, and the abort `signal`). |
| Return value | Plain data (objects, arrays, primitives). You may also return a `Response` or call `data(body, { status, headers })` to set status/headers. |
| Throwing | `throw new Response(..., { status: 404 })` or `throw new Error()` is caught by the nearest `ErrorBoundary`. |
| `redirect()` | `return redirect("/login")` for protected routes. |
| Parallel loading | Loaders for all matched nested routes run **in parallel**, avoiding waterfalls. |
| Streaming | Return an object containing **unawaited promises** and render them with `<Await>` + `<Suspense>`, so the page shows immediately and slow data streams in: `return { critical: await a(), slow: b() }`. |
| Revalidation | After an action completes, loaders on the page automatically re-run, which keeps the UI in sync. |
| Read a parent's data | `useRouteLoaderData("routeId")`. |
| Caching | Loaders do not cache. Pair with TanStack Query for caching, or use HTTP caching. |
| Client loader limits | In a pure SPA the loader runs in the browser, so API keys in loaders are still exposed. |

## 21. Actions and Forms

```jsx
import { Form, redirect, useActionData, useNavigation } from "react-router";

export async function createUserAction({ request }) {
  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();

  if (name.length < 2) return { error: "Name is too short" };   // returned to the component

  await fetch("/api/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
  return redirect("/users");
}

function NewUser() {
  const actionData = useActionData();            // whatever the action returned
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  return (
    <Form method="post">                          {/* no onSubmit, no fetch, no preventDefault */}
      <input name="name" required />
      {actionData?.error && <p role="alert">{actionData.error}</p>}
      <button disabled={submitting}>{submitting ? "Saving..." : "Create"}</button>
    </Form>
  );
}
```

| API | Purpose |
|---|---|
| `<Form method="post">` | Submits via the route `action` without a full reload. `method` can be `post`, `put`, `patch`, `delete` (also `get`, which navigates with query params). `action="/other"` targets another route. |
| `useActionData()` | The value returned by the last action (validation errors). |
| `useNavigation()` | `{ state: "idle" \| "loading" \| "submitting", formData, location }` for global pending UI. |
| `useFetcher()` | Run loaders and actions **without navigating** (like buttons, inline edits, likes). `const fetcher = useFetcher(); <fetcher.Form method="post">`; read `fetcher.state` and `fetcher.data`; or `fetcher.submit(data, { method })`. |
| `useSubmit()` | Programmatic submit: `submit(formData, { method: "post" })`. |
| `useRevalidator()` | Manually re-run loaders: `revalidator.revalidate()`. |
| Multiple actions on one page | Use a hidden `intent` input and branch on `form.get("intent")` in the action. |

## 22. Error Handling and 404s

```jsx
import { useRouteError, isRouteErrorResponse, Link } from "react-router";

function RootError() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <h1>{error.status} {error.statusText}</h1>;     // thrown Response
  }
  return <p>Something went wrong: {error instanceof Error ? error.message : "Unknown error"}</p>;
}
```

| Tip | Detail |
|---|---|
| Put an `ErrorBoundary` on the root route | Catches everything, including unmatched URLs and loader failures. |
| Add one on nested routes too | Isolates failures so the layout stays visible. |
| Catch-all route | `{ path: "*", Component: NotFound }` |

## 23. Protected Routes

```jsx
import { redirect, Outlet, Navigate, useLocation } from "react-router";
import { useAuthStore } from "./stores/auth";       // Zustand, see Part 3

// A) Loader guard (runs before render, no flicker)
export function requireAuth({ request }) {
  const { user } = useAuthStore.getState();          // read the store outside React
  if (!user) {
    const from = new URL(request.url).pathname;
    throw redirect(`/login?from=${encodeURIComponent(from)}`);
  }
  return null;
}
// route: { path: "account", loader: requireAuth, Component: Account }

// B) Layout wrapper component
function ProtectedRoute() {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();
  return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}
// route: { Component: ProtectedRoute, children: [ { path: "account", Component: Account } ] }
```

Front end route guards only control what the UI shows. The **server must enforce authorization** on every API endpoint.

## 24. Router Cheat Table: Common Tasks

| Task | How |
|---|---|
| Link to a dynamic route | ``<Link to={`/users/${user.id}`}>`` |
| Go back | `navigate(-1)` |
| Redirect after login | `redirect(searchParams.get("from") ?? "/")` |
| Read `?page=2` | `Number(searchParams.get("page") ?? 1)` |
| Update one query param, keep the others | `setParams(prev => { prev.set("page", "3"); return prev; })` |
| Active link styling | `<NavLink>` with `className={({isActive}) => ...}` |
| Pass state through navigation | `navigate("/x", { state: { fromCart: true } })` then `useLocation().state` |
| Document title per route | `<title>` in the component (React 19), or `handle` + `useMatches()` |
| Hash links | `<Link to="#section">`; use `<ScrollRestoration />` |
| Prompt before leaving a dirty form | `useBlocker(shouldBlock)` |
| Relative links | `<Link to="edit">` resolves relative to the route; `to=".."` goes up one route level |
| Base path (deployed to `/app`) | `createBrowserRouter(routes, { basename: "/app" })` |
| SPA hosting | The host must serve `index.html` for unknown paths, or deep links 404 on refresh |

**Framework mode** (not covered in detail): routes are declared in `app/routes.ts` using `route()`, `index()`, `layout()`, and `prefix()`. Each route file exports `loader`, `action`, `default` (component), `ErrorBoundary`, `meta`, and `links`, and you get generated types via `+types`. Choose it for SSR, pre-rendering, and full stack features.

---

# PART 3: ZUSTAND

Zustand is a small, hook-based global state library. You create a **store** (a hook) holding state and actions. Components subscribe to **slices** of it with selectors and re-render only when their slice changes. No providers, no boilerplate, no reducers required.

```bash
npm install zustand
```

## 25. Creating and Using a Store

```jsx
// src/stores/counterStore.js
import { create } from "zustand";

export const useCounterStore = create((set, get) => ({
  // state
  count: 0,
  user: null,

  // actions (functions that call set)
  increment: () => set((state) => ({ count: state.count + 1 })),
  add: (n) => set((state) => ({ count: state.count + n })),
  reset: () => set({ count: 0 }),
  isEven: () => get().count % 2 === 0,            // get() reads current state
}));
```

```jsx
// any component
import { useCounterStore } from "./stores/counterStore";

function Counter() {
  const count = useCounterStore((state) => state.count);          // selector
  const increment = useCounterStore((state) => state.increment);
  return <button onClick={increment}>Count: {count}</button>;
}
```

| API | Meaning |
|---|---|
| `create((set, get, api) => ({...}))` | Returns a **hook**. In v5, import the named `create` from `"zustand"` (no default export). |
| `set(partial)` | **Shallow merges** into the state (top level only). Accepts an object or a function `(state) => partial`. |
| `set(partial, true)` | **Replaces** the whole state instead of merging (be careful, actions are part of state). |
| `get()` | Reads the current state inside actions (useful after `await`). |
| Selector `(state) => state.count` | Subscribes the component to that value. The component re-renders only if the selected value changes (compared with `Object.is`). |
| No Provider needed | The store lives outside React. Import the hook anywhere. |

### Updating state

| Task | Code |
|---|---|
| Replace a field | `set({ theme: "dark" })` |
| Based on previous state | `set((s) => ({ count: s.count + 1 }))` |
| Update a nested object (immutably) | `set((s) => ({ user: { ...s.user, name: "Ada" } }))` |
| Add to an array | `set((s) => ({ todos: [...s.todos, todo] }))` |
| Remove from an array | `set((s) => ({ todos: s.todos.filter((t) => t.id !== id) }))` |
| Update one array item | `set((s) => ({ todos: s.todos.map((t) => t.id === id ? { ...t, done: !t.done } : t) }))` |
| Reset to initial | Keep `const initialState = {...}` and `reset: () => set(initialState)` |

The shallow merge applies to the **top level only**. Nested objects must be spread manually (or use the `immer` middleware).

## 26. Selectors, Re-renders, and the v5 Gotcha

| Pattern | Result |
|---|---|
| `useStore((s) => s.count)` | Good: re-renders only when `count` changes. |
| `const { count, user } = useStore()` | Works, but subscribes to the **entire** store, so any change re-renders the component. Fine for tiny stores, wasteful for larger ones. |
| `useStore((s) => ({ a: s.a, b: s.b }))` | **Breaks in v5.** The selector returns a new object every call, so React sees constant change and throws "Maximum update depth exceeded". |
| `useStore(useShallow((s) => ({ a: s.a, b: s.b })))` | Correct: `useShallow` (from `"zustand/react/shallow"`) compares the object's fields shallowly. |
| `useStore(useShallow((s) => [s.a, s.b]))` | Same fix for array returns. |
| `useStore((s) => s.items.filter(...))` | Also returns a new array each time. Select `items` and filter in the component with `useMemo`, or wrap with `useShallow`. |
| Select actions separately | Action functions are stable references, so selecting them never causes extra renders. |

```jsx
import { useShallow } from "zustand/react/shallow";

const { count, increment } = useCounterStore(
  useShallow((s) => ({ count: s.count, increment: s.increment }))
);
```

Rule of thumb: **a selector must return a stable reference when the underlying data has not changed.**

## 27. Async Actions

Actions are plain functions, so async works with no extra setup:

```jsx
export const useUserStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    if (get().loading) return;                       // simple guard
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      set({ users: await res.json(), loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

// component
const fetchUsers = useUserStore((s) => s.fetchUsers);
useEffect(() => { fetchUsers(); }, [fetchUsers]);
```

Zustand is for **client state** (UI state, auth session, cart, preferences). For **server state** (cached API data with refetching, staleness, invalidation), TanStack Query or router loaders are a better fit than hand rolled `loading`/`error` flags.

## 28. Using the Store Outside React

The store hook doubles as a vanilla store object, which is handy in router loaders, API helpers, and tests:

| API | Purpose |
|---|---|
| `useStore.getState()` | Read the current state (not reactive): `useAuthStore.getState().token` |
| `useStore.setState(partial)` | Update from anywhere: `useAuthStore.setState({ token: null })` |
| `const unsub = useStore.subscribe((state, prev) => {...})` | Listen to every change. Call `unsub()` to stop. |
| `useStore.getInitialState()` | The state the store was created with (useful for resets in tests). |
| `createStore` (from `"zustand/vanilla"`) | Create a framework-agnostic store; use `useStore(store, selector)` from `"zustand"` to bind it to React. |

```js
// attach auth header from anywhere
const token = useAuthStore.getState().token;
fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
```

## 29. Middleware

Middleware wraps the store creator. Import from `"zustand/middleware"` (immer from `"zustand/middleware/immer"`).

| Middleware | Purpose |
|---|---|
| `persist` | Save and restore state in `localStorage` (or another storage). |
| `devtools` | Connect to the Redux DevTools browser extension for time travel and action names. |
| `immer` | Write "mutating" updates that produce immutable results (requires `npm i immer`). Great for deeply nested state. |
| `subscribeWithSelector` | Lets `subscribe` listen to a single slice with a selector. |
| `combine` | Infers types from an initial state plus actions (TypeScript friendly). |
| `redux` | Reducer plus `dispatch` style API if you prefer Redux semantics. |

### `persist`

```js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSettingsStore = create(
  persist(
    (set) => ({
      theme: "light",
      token: null,
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "settings",                                // storage key (required)
      storage: createJSONStorage(() => localStorage),  // default; use sessionStorage if preferred
      partialize: (state) => ({ theme: state.theme }), // persist only these fields (never persist secrets)
      version: 1,                                      // bump + migrate() when shape changes
    }
  )
);
```

In v5, `persist` no longer writes the initial state to storage at creation time; storage is written on the first state change. Hydration can be asynchronous with some storages, so use `useStore.persist.hasHydrated()` or `onRehydrateStorage` to avoid flashing default values. For SSR frameworks, hydrate after mount to avoid hydration mismatches.

### `devtools` and `immer`, stacked

```js
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useTodoStore = create(
  devtools(
    persist(
      immer((set) => ({
        todos: [],
        addTodo: (text) =>
          set((state) => { state.todos.push({ id: crypto.randomUUID(), text, done: false }); }, undefined, "todos/add"),
        toggle: (id) =>
          set((state) => { const t = state.todos.find((t) => t.id === id); if (t) t.done = !t.done; }),
      })),
      { name: "todos" }
    ),
    { name: "TodoStore" }
  )
);
```

Order matters: the outermost wrapper sees everything inside it. A common order is `devtools(persist(immer(...)))`.

## 30. Organizing Larger Stores

| Pattern | Detail |
|---|---|
| Several small stores | One store per domain (`useAuthStore`, `useCartStore`, `useUiStore`). Simple and idiomatic. |
| Slices pattern | Split one store into functions that each return part of the state, then merge: `create((...a) => ({ ...createAuthSlice(...a), ...createCartSlice(...a) }))`. |
| Actions colocated with state | Keep actions inside the store (not in components). |
| Derived values | Compute in selectors or components (`const total = useCart(s => s.items.reduce(...))`). Do not store derived data. |
| TypeScript | Use the curried form `create<State>()((set) => ({...}))`. The extra `()` is required for correct inference. |
| Per-request or per-component stores (SSR, tests) | Use `createStore` plus a React Context provider so stores are not shared across requests. |
| Testing | Reset between tests with `useStore.setState(useStore.getInitialState(), true)`. |

```js
// slices example
const createAuthSlice = (set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
});
const createCartSlice = (set) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
});

export const useAppStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createCartSlice(...a),
}));
```

## 31. Zustand vs. Context vs. `useState`

| Need | Pick |
|---|---|
| Local UI state (open/closed, input text) | `useState` |
| Complex local state machine | `useReducer` |
| Static or rarely changing value for a subtree (theme, locale) | Context |
| Frequently changing state shared widely (cart, filters, auth, editor state) | Zustand: only subscribers of the changed slice re-render |
| State that belongs in the URL (page, filters, selected tab) | Router `useSearchParams` / params |
| Cached server data | TanStack Query or router loaders |

---

# PART 4: PUTTING IT TOGETHER

## 32. Minimal App Structure

```
src/
  main.jsx                # createRoot + RouterProvider
  router.jsx              # createBrowserRouter([...])
  routes/
    RootLayout.jsx        # <Outlet />, nav
    Home.jsx
    Users.jsx             # loader + component
    UserDetail.jsx
  components/             # reusable UI pieces (Button, Card, Modal)
  hooks/                  # custom hooks (useFetch, useLocalStorage)
  stores/
    authStore.js          # Zustand
    cartStore.js
  api/                    # fetch helpers
  index.css
```

Typical division of responsibility: the **URL** (router) decides what screen is shown, **loaders and actions** (or a query library) own server data, **Zustand** owns shared client state, and **`useState`** owns local component state.

## 33. Common Mistakes

| Mistake | Fix |
|---|---|
| `class="..."` or `for="..."` in JSX | `className`, `htmlFor` |
| `onClick={handler()}` | `onClick={handler}` or `onClick={() => handler(arg)}` |
| Mutating state (`arr.push(x); setArr(arr)`) | `setArr([...arr, x])` |
| Using index as `key` in a dynamic list | Use a stable id |
| `{count && <X />}` when `count` can be `0` | `{count > 0 && <X />}` |
| Missing or wrong effect dependencies | Follow `react-hooks/exhaustive-deps` |
| No cleanup in an effect (timers, listeners, fetch) | Return a cleanup function |
| Using an effect for derived data | Compute in render |
| Storing derived values in state | Derive from the source of truth |
| Calling hooks conditionally or in loops | Hooks at the top level only |
| Lowercase component name | Capitalize (`<Card />`) |
| `<a href>` for internal links | `<Link to>` |
| Importing from `react-router-dom` in new code | Import from `react-router` (v7+; required in v8) |
| `useStore(s => ({...}))` without `useShallow` | Wrap with `useShallow` or select primitives separately |
| Destructuring the whole Zustand store everywhere | Select only the slice you need |
| Persisting secrets with Zustand `persist` | Never persist tokens in `localStorage` for sensitive apps; use `partialize` or httpOnly cookies |
| Trusting client route guards for security | Authorize on the server |
| `dangerouslySetInnerHTML` with API or user data | Render as text, or sanitize with a trusted library (DOMPurify) |
| Hosting a SPA without an index.html fallback | Configure rewrites so deep links work on refresh |

---

*Reference note: React Router and Zustand evolve quickly (v8 and recent React 19.x minors especially). Check the official docs for the exact version in your project: [react.dev](https://react.dev), [reactrouter.com](https://reactrouter.com), and [zustand.docs.pmnd.rs](https://zustand.docs.pmnd.rs).*
