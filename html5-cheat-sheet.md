# HTML5 Cheat Sheet - Syntax Reference

A practical reference for tags used in real-world web UI development. I have not included any "rare" or "niche" HTML elements that is not used that often in real-world applications. So remember, this is not a comprehensive list. If you are looking for something related to technologies like HTML (or CSS, JS) or related to web development in general, start with https://developer.mozilla.org/en-US/ (MDN Web Docs). Pay attention to the ones that states "semantic" in their descriptions. The goal of writing good HTML is to use semantic tags whenever possible.  

---

## 1. Document Structure & Metadata

| Tag | Description / When to Use |
|---|---|
| `<!DOCTYPE html>` | Declares HTML5. Must be the first line of every document. Without it, browsers fall into "quirks mode" and render inconsistently. |
| `<html lang="en">` | Root element. Always set `lang` as screen readers and translation tools depend on it. |
| `<head>` | Container for metadata, not visible content: title, charset, links to CSS, meta tags, favicon. |
| `<body>` | Everything visible to the user goes here. One per document. |
| `<meta charset="UTF-8">` | Character encoding. Put this first in `<head>` as it must appear within the first 1024 bytes. |
| `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | Required for responsive design. Without it, mobile browsers render at desktop width and zoom out. |
| `<meta name="description" content="...">` | SEO (Search Engine Optimization)snippet shown in search results. Not visible on the page itself. |
| `<title>` | Text in the browser tab / bookmark. One per page, should be unique per route in a multi-page site. |
| `<link rel="stylesheet" href="...">` | Attaches external CSS. Goes in `<head>`. |
| `<link rel="icon" href="...">` | Favicon. |
| `<script src="..."></script>` | Attaches JS. Use `defer` (loads in parallel, runs after DOM parse) unless you have a specific reason not to. `defer`avoids JS blocking render. |
| `<style>` | Inline CSS block, scoped to the whole document (not scoped to the element it is in). Fine for prototyping, **avoid in production** in favor of external stylesheets. |
| `<base href="...">` | Sets a base URL for all relative links/resources on the page. Rare, but shows up in SPAs served from subpaths. |

---

## 2. Text Content

| Tag | Description / When to Use |
|---|---|
| `<h1>`–`<h6>` | Headings, in order of importance. Use exactly one `<h1>` per page (usually the page title) for SEO/accessibility. Never skip levels for styling reasons (do not start `h1` and then go to `h3` and skip `h2`). Use CSS for size, headings for content hierarchy. |
| `<p>` | Paragraph. Block-level; browsers auto-add margin (refer: CSS Box Model)  above/below. |
| `<br>` | Line break within text (e.g., a mailing address). Not for spacing between elements. Spacing is styling and styling is a CSS job (CSS Box Model: margin/padding). |
| `<hr>` | Thematic break (topic change), rendered as a horizontal line. **Semantic**, not just decorative. |
| `<strong>` | Marks text as *important*. Renders bold, but semantically distinct from `<b>`. |
| `<em>` | Marks *emphasized* (stressed) text. Renders italic, semantically distinct from `<i>`. |
| `<b>` | Bold text with no extra semantic weight (e.g., keywords in a summary). Use `<strong>` when meaning matters. |
| `<i>` | Italic text with no extra semantic weight (e.g., a technical term, a ship name). Use `<em>` when meaning matters. |
| `<mark>` | Highlighted/relevant text, like a search-term match. |
| `<small>` | Fine print like legal text, disclaimers. |
| `<del>` / `<ins>` | Deleted / inserted text. Shows as strikethrough / underline. Used in edit-tracking UIs, changelogs (Similar to review tracking in Word documents). |
| `<sub>` / `<sup>` | Subscript / superscript (chemical formulas, footnote markers). |
| `<code>` | Inline code snippet. |
| `<pre>` | Preformatted text; preserves whitespace/line breaks exactly as written. Almost always wraps `<code>` for multi-line code blocks. |
| `<blockquote>` | Block-level quotation from another source. Use `cite` attribute for the source URL. |
| `<q>` | Inline short quotation. Browser adds quote marks automatically. |
| `<abbr title="...">` | Abbreviation/acronym with a tooltip on hover. Good for accessibility. |
| `<span>` | Generic inline *container* with no semantic meaning. Used purely to apply CSS/JS to a chunk of text. **Be mindful of this concept**. |

---

## 3. Lists

| Tag | Description / When to Use |
|---|---|
| `<ul>` | Unordered (bulleted) list. Order does not matter (**nav menus**, feature lists). |
| `<ol>` | Ordered (numbered) list. Order matters (steps, rankings). Supports `start` and `reversed` attributes. |
| `<li>` | List item. Child of `<ul>` or `<ol>` only. |
| `<dl>` | Description list. Pairs of terms and definitions (glossaries, key-value metadata, FAQs). |
| `<dt>` | Term inside a `<dl>`. |
| `<dd>` | Definition/description for the preceding `<dt>`. |

---

## 4. Links & Navigation

| Tag | Description / When to Use |
|---|---|
| `<a href="...">` | Hyperlink. `target="_blank"` opens a new tab. You pair it with `rel="noopener noreferrer"` to prevent the new page from accessing `window.opener` (a real security issue). |
| `<a href="#section-id">` | In-page anchor link. Jumps to any element with a matching `id`. |
| `<nav>` | Semantic wrapper for a block of navigation links (main menu, breadcrumbs, pagination). |

---

## 5. Images & Media

| Tag | Description / When to Use |
|---|---|
| `<img src="..." alt="...">` | Embeds an image. `alt` **is not optional**. It is required for accessibility and shown if the image fails to load. Empty `alt=""` is only valid for purely decorative images but still not suggested. |
| `<picture>` | Wraps multiple `<source>` elements plus a fallback `<img>`. Lets the browser choose the best image for screen size/format (responsive images, WebP with a JPEG fallback). Think of this as switch-case statements from traditional programming but in this case deciding which resolution of images to display. |
| `<source>` | Specifies an alternate media resource. Used inside `<picture>`, `<video>`, or `<audio>`. |
| `<figure>` | Wraps self-contained content (image, chart, code snippet) that could be moved without breaking the flow of the document. |
| `<figcaption>` | Caption for the content inside `<figure>`. |
| `<audio controls>` | Embeds an audio player. Use `<source>` children for multiple formats (browser picks the first it supports). |
| `<video controls>` | Embeds a video player. Common attributes: `autoplay`, `loop`, `muted`, `poster` (thumbnail before play). `autoplay` generally requires `muted` due to browser policy. |
| `<track>` | Subtitles/captions/chapters for `<video>`. required for accessibility compliance in most real applications. |
| `<canvas>` | Empty drawing surface, rendered via JS (charts, games, image manipulation). No content without a script. |
| `<svg>` | Inline vector graphics. this is scalable, stylable with CSS, and scriptable, unlike `<img>`. Preferred for icons and logos in modern UIs. |

---

## 6. Tables

| Tag | Description / When to Use |
|---|---|
| `<table>` | Wraps tabular data. **Not** for page layout (that is what CSS Grid/Flexbox are for). Tables are for actual data relationships and never to be used for styling. |
| `<thead>` | Groups the header row(s). |
| `<tbody>` | Groups the main data rows. |
| `<tfoot>` | Groups footer row(s) like for totals, summary rows. |
| `<tr>` | Table row. |
| `<th scope="col">` | Header cell. `scope` (`col` or `row`) tells assistive tech what the header applies to, important for accessibility. |
| `<td>` | Standard data cell. |
| `<caption>` | Table title/description, rendered above the table by default. |
| `colspan` / `rowspan` (attributes on `<td>`/`<th>`) | Merge cells across columns/rows. |

---

## 7. Forms & Inputs

| Tag / Type | Description / When to Use |
|---|---|
| `<form action="..." method="post">` | Wraps a group of inputs to be submitted together. `method="get"` for retrieval/search (data in URL), `post` for creating/mutating data (data in body). |
| `<label for="id">` | Associates text with an input via matching `id`. Critical for accessibility and click-target size (clicking the label focuses the input). |
| `<input type="text">` | Single-line free text. |
| `<input type="email">` | Text input with built-in email format validation and mobile keyboard optimization. |
| `<input type="password">` | Masks input characters. |
| `<input type="number">` | Numeric input with spinner controls; supports `min`, `max`, `step`. |
| `<input type="tel">` | Phone number. But no built-in validation, only triggers the numeric keypad if accessed on a mobile device. |
| `<input type="url">` | URL-format validation. |
| `<input type="search">` | Styled/behaves like text but semantically a search field (some browsers add a clear-x button). |
| `<input type="checkbox">` | Independent on/off toggle; multiple can be checked in a group. |
| `<input type="radio">` | Single choice among a group.  group via matching `name` attribute. |
| `<input type="date">` / `time` / `datetime-local` / `month` / `week` | Native date/time pickers. avoid rolling your own unless you need cross-browser style consistency. |
| `<input type="range">` | Slider control, use with `min`/`max`/`step` (volume, price filters). |
| `<input type="color">` | Native color picker. |
| `<input type="file">` | File upload. Use `accept` to restrict file types, `multiple` for more than one file. |
| `<input type="hidden">` | Value submitted with the form but not shown or editable by the user (CSRF tokens, IDs). |
| `<input type="submit">` | Submits the form. |
| `<input type="checkbox"/radio>` with `<button type="submit">` | Modern pattern: prefer `<button>` over `<input type="submit">` when you need custom content/icons inside the button. |
| `<button type="button">` | Does *not* submit the form.Use for JS-driven actions inside a form (e.g., "add another row" of user data entry dynamically decided by the user). Default type inside a `<form>` is `submit`, so always set `type` explicitly to avoid accidental submits. |
| `<textarea>` | Multi-line free text. Size via CSS, not `rows`/`cols`, for consistent layouts. |
| `<select>` | Dropdown. Wraps `<option>` elements; `multiple` attribute turns it into a multi-select list box. |
| `<option value="...">` | A choice inside `<select>` or `<datalist>`. |
| `<optgroup label="...">` | Groups related `<option>`s under a labeled heading inside `<select>`. |
| `<datalist>` | Provides autocomplete suggestions for a text `<input>` via its `list` attribute. user can still type a custom value (unlike `<select>`). |
| `<fieldset>` | Groups related form controls (e.g., "Billing Address" section) and also groups them for assistive tech. |
| `<legend>` | Caption for a `<fieldset>`. |
| `<progress value="..." max="...">` | Shows completion of a task (upload progress, multi-step form progress). |
| `<meter value="..." min="..." max="...">` | Shows a scalar value within a known range (disk usage, score). Semantically distinct from `<progress>`, which is about task completion. |
| `required`, `disabled`, `readonly`, `placeholder`, `pattern`, `min`/`max`, `autocomplete` (html attributes) | Common validation/UX attributes across input types. `pattern` takes a regex for custom client-side validation. Client-side validation is UX, not security. **always validate again server-side for cybersecurity** . |

---

## 8. Semantic HTML5 Structural Tags

These replaced generic `<div>` soup and exist to give the document meaning. Meaning helps with SEO, accessibility (screen readers use them to build a page outline), and maintainability.

| Tag | Description / When to Use |
|---|---|
| `<header>` | Introductory content for the page or a section. Usually logo, title, nav. Can be used more than once (e.g., inside an `<article>` for its own header). |
| `<nav>` | Major navigation blocks only (not every group of links needs to be `<nav>`). |
| `<main>` | The dominant, unique content of the page. One per page, not nested inside `<article>`/`<aside>`/`<header>`/`<footer>`. |
| `<article>` | Self-contained content that would make sense distributed/syndicated on its own like a blog post, a news story, a forum post, a product card. |
| `<section>` | A thematic grouping of content, typically with its own heading. Use when content forms a distinct part of the document outline; do not use as a `<div>` replacement for pure styling hooks. |
| `<aside>` | Content tangentially related to the main content like sidebars, pull quotes, advertisement units. |
| `<footer>` | Closing content for the page or a section like copyright, contact info, and any other related links. |
| `<div>` | Generic block-level container with **no semantic meaning**. use only when no semantic tag fits, or purely as a CSS/JS layout hook. |
| `<address>` | Contact information for the nearest `<article>` or the page's author and not for arbitrary postal addresses. |
| `<time datetime="2026-09-09">` | Machine-readable date/time, human-readable text as content. Search engines and calendars parse the `datetime` attribute. |

---

## 9. Interactive / Misc Elements Used in Real Apps

| Tag | Description / When to Use |
|---|---|
| `<details>` | Native disclosure widget (collapsible content). no JS required. |
| `<summary>` | Always-visible heading/toggle for a `<details>` element. |
| `<dialog>` | Native modal/non-modal dialog box, controllable via JS (`.showModal()`, `.close()`), replaces a lot of hand-rolled modal libraries. |
| `<template>` | Holds inert HTML not rendered on load, cloned via JS at runtime. This is common in component frameworks and dynamic list rendering. |
| `<iframe src="...">` | Embeds another HTML document (YouTube embeds, payment widgets, ads). Set `sandbox` and `loading="lazy"` for security and performance. |
| `<embed>` / `<object>` | Embed external resources like PDFs or plugins content. Largely legacy; use `<iframe>` or native browser PDF viewers today. |
| `<noscript>` | Fallback content shown only if JavaScript is disabled/fails to load. This is to make sure when users are using AdBlock or Js BLockers, it does not break your page functionality (if it is too Js dependent) |

---

## 10. Global Attributes (apply to almost any element)

Remember these are attributes not HTML elements. Attributes add supplemental support/information to HTML elements.

| Attribute | Description / When to Use |
|---|---|
| `id` | Unique identifier. used for CSS hooks, JS targeting, and in-page anchors. Must be unique per page. |
| `class` | One or more space-separated class names for CSS/JS targeting. Reusable across elements. |
| `data-*` | Custom data attributes (e.g., `data-user-id="42"`). store app-specific data on an element without hacking around with classes. Read via JS `element.dataset`. |
| `style` | Inline CSS on a single element. **Avoid in production code** hard to maintain and overrides stylesheets unpredictably. |
| `title` | Tooltip text on hover. |
| `tabindex` | Controls keyboard tab order. `0` adds an element to the natural tab order, `-1` makes it focusable via JS only, positive values are almost always an accessibility anti-pattern. |
| `aria-*` | Accessibility attributes (`aria-label`, `aria-hidden`, `aria-expanded`, etc.) for assistive tech when semantic HTML alone is not enough (custom widgets, dynamic UI states). |
| `contenteditable` | Makes an element's content directly editable by the user. used in rich text editors. |
| `draggable` | Enables native drag-and-drop for an element. |
| `hidden` | Hides the element (equivalent to `display: none` in CSS code), but semantically communicates "not currently relevant" rather than "styled away." |

---

## 11. Tags/Patterns to Avoid in Real Projects

| Old approach | Use instead |
|---|---|
| `<center>`, `<font>`, `<marquee>`, `<blink>` | CSS (`text-align`, `font-family`, animations) |
| Table-based page layout | CSS Grid / Flexbox |
| `<input type="submit">` for styled buttons | `<button type="submit">` as it allows icons, nested markup |
| Inline `onclick="..."` handlers | `addEventListener` in a separate JavaScript. keeps behavior out of markup |
| `<b>`/`<i>` when meaning is intended | `<strong>`/`<em>` |
| Divs for everything (`<div class="header">`, `<div class="nav">`) | Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) |

---
