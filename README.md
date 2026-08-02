# HTML Complete Guide — Every Tag Explained, Basic to Advanced

## Part 1: Document Structure Tags

### `<!DOCTYPE html>`
This isn't actually a tag — it's a declaration. It tells the browser "this is an HTML5 document, render it accordingly." It should always be the very first line.

### `<html>`
The entire page lives inside this tag — it's the root element. You should add `lang="en"` so search engines and screen readers know what language the page is in.

### `<head>`
This is the "backstage" area — things the browser needs (for the tab, for SEO) but that don't show up directly on the page. It contains the title, meta tags, CSS links, favicon, etc.

### `<meta>`
Used to provide extra information:
```html
<meta charset="UTF-8">                                  <!-- character encoding -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">  <!-- mobile responsive -->
<meta name="description" content="Summary of the page">  <!-- for SEO -->
```

### `<title>`
The text that shows up in the browser tab.

### `<body>`
Everything the user actually sees — text, images, buttons — all goes here. A page has only one `<body>`.

---

## Part 2: Text Tags (Basic)

### Headings `<h1>` through `<h6>`
`<h1>` is the biggest/most important, `<h6>` is the smallest. Ideally, use only one `<h1>` per page (for SEO), and let the rest follow a hierarchy (h1 → h2 → h3).

### `<p>`
A paragraph. Every `<p>` automatically starts on a new line (it's a block-level element).

### `<br>`
Line break — breaks a line without starting a new paragraph. It's self-closing (no closing tag needed).

### `<hr>`
A horizontal line — used to visually separate content.

### `<strong>` vs `<b>`
Both look bold, but `<strong>` conveys real importance (screen readers emphasize it), while `<b>` is purely visual styling. Prefer `<strong>` in modern HTML.

### `<em>` vs `<i>`
Both look italic — `<em>` means emphasis (changes the meaning of the sentence), `<i>` is just styling (like a foreign word or technical term).

### `<mark>`
Highlighted text — like using a yellow highlighter.

### `<small>`
Smaller text — used for disclaimers, copyright notices, etc.

### `<sub>` and `<sup>`
Subscript (H<sub>2</sub>O) and superscript (x<sup>2</sup>).

### `<abbr>`
Used to indicate an abbreviation — hovering shows the full form:
```html
<abbr title="HyperText Markup Language">HTML</abbr>
```

### `<blockquote>` and `<q>`
`<blockquote>` — a long quotation (block-level). `<q>` — a short inline quotation.

### `<code>`, `<pre>`
`<code>` — an inline code snippet. `<pre>` — preformatted text, shown exactly as written (spaces, line breaks preserved). Often used together for code blocks.

---

## Part 3: Lists

### `<ul>` (Unordered List)
A list with bullet points. Each item goes inside `<li>`.

### `<ol>` (Ordered List)
A numbered list. Attributes: `start="5"` (where numbering begins), `type="A"` (style like A,B,C or I,II,III).

### `<li>`
A list item — only used inside `<ul>` or `<ol>`.

### `<dl>`, `<dt>`, `<dd>`
A description list — good for glossary-style content:
```html
<dl>
    <dt>HTML</dt>
    <dd>Markup language for web pages</dd>
</dl>
```

---

## Part 4: Links & Media

### `<a>` (Anchor)
Used to create a link. Important attributes:
- `href` — where the link goes
- `target="_blank"` — opens in a new tab
- `rel="noopener noreferrer"` — security best practice when using `target="_blank"`
- `#section-id` — used to scroll to a section within the same page

### `<img>`
Used to display an image. Key attributes:
- `src` — the image's path/URL
- `alt` — text shown if the image fails to load, or read by screen readers (critical for both SEO and accessibility)
- `width`, `height` — control the size

### `<audio>` and `<video>`
```html
<video controls width="400">
    <source src="movie.mp4" type="video/mp4">
    Your browser doesn't support video.
</video>

<audio controls>
    <source src="song.mp3" type="audio/mpeg">
</audio>
```
The `controls` attribute shows play/pause/volume buttons.

### `<iframe>`
Embeds one page inside another (like embedding a YouTube video):
```html
<iframe src="https://youtube.com/embed/xyz" width="560" height="315"></iframe>
```

---

## Part 5: Tables

### `<table>`, `<tr>`, `<th>`, `<td>`
- `<table>` — the entire table
- `<tr>` — a table row
- `<th>` — a header cell (bold, centered by default)
- `<td>` — a normal data cell

### `<thead>`, `<tbody>`, `<tfoot>`
These logically divide a table — header section, body section, footer section (like a totals row). Useful for organizing and styling large tables.

### `colspan` and `rowspan`
Used to merge cells across multiple columns/rows:
```html
<td colspan="2">This cell spans 2 columns</td>
```

---

## Part 6: Forms (Basic to Advanced)

### `<form>`
The container for the whole form. `action` (where the data goes) and `method` (GET or POST) are the key attributes.

### `<input>` — Types (This Is the Most Important Part)
```html
<input type="text">        <!-- plain text -->
<input type="email">       <!-- automatic email validation -->
<input type="password">    <!-- text is hidden -->
<input type="number">      <!-- numbers only -->
<input type="date">        <!-- date picker -->
<input type="checkbox">    <!-- allows multiple selections -->
<input type="radio">       <!-- pick one from a group -->
<input type="file">        <!-- file upload -->
<input type="range">       <!-- slider -->
<input type="color">       <!-- color picker -->
<input type="submit">      <!-- form submit button -->
```

### `<label>`
The name/description for an input field. The `for` attribute should match the input's `id` — this lets clicking the label focus the input too (important for accessibility).

### `<textarea>`
A multi-line text input — used for comments, messages, etc.

### `<select>` and `<option>`
A dropdown menu:
```html
<select name="city">
    <option value="delhi">Delhi</option>
    <option value="mumbai">Mumbai</option>
</select>
```

### `<button>`
A clickable button. `type="submit"` (submits the form), `type="button"` (does nothing by itself, controlled via JS), `type="reset"` (clears the form).

### `<fieldset>` and `<legend>`
Used to group related form fields together and give them a title — visually draws a box around them.

### Important Form Attributes (Advanced)
- `required` — the field can't be left empty
- `placeholder` — hint text that disappears once you start typing
- `disabled` — the field can't be used at all
- `readonly` — visible but can't be edited
- `pattern` — regex-based validation

---

## Part 7: Semantic Layout Tags (HTML5 — Modern Websites)

These tags don't look visually different (they behave like `<div>`), but they carry **meaning** — which matters a lot for SEO and accessibility.

- `<header>` — the top part of a page or section (logo, nav, title)
- `<nav>` — a group of navigation links
- `<main>` — the page's primary content (should appear only once per page)
- `<section>` — a logical grouping of content (like an "About Us" section)
- `<article>` — independent, self-contained content (a blog post, a news article) that makes sense on its own
- `<aside>` — sidebar content, related links, ads
- `<footer>` — the bottom part of a page or section (copyright, contact info)
- `<figure>` and `<figcaption>` — an image/diagram along with its caption:
```html
<figure>
    <img src="chart.png" alt="Sales chart">
    <figcaption>2025 sales data</figcaption>
</figure>
```

**Why semantic tags matter:** search engines like Google and screen readers can't tell what a `<div>` is for, but they immediately understand `<nav>` or `<article>`. This improves SEO and accessibility.

---

## Part 8: Generic Containers

### `<div>`
A block-level generic container — has no inherent meaning, used purely for layout/styling (with CSS).

### `<span>`
An inline generic container — used to style a small part of text within a paragraph:
```html
<p>This is normal text, but <span style="color:red;">this part is red</span>.</p>
```

---

## Part 9: Advanced / Interactive Tags

### `<details>` and `<summary>`
An expandable/collapsible section without needing JavaScript:
```html
<details>
    <summary>Click to expand</summary>
    <p>This content only shows when you click the summary.</p>
</details>
```

### `<dialog>`
A native popup/modal box (controlled via JavaScript's `.showModal()`).

### `<template>`
HTML content that doesn't render when the page loads — it's used later by JavaScript (for building dynamic content).

### `<canvas>`
An empty area for drawing graphics with JavaScript (used for games, charts, etc.).

### `<svg>`
Vector graphics written directly in HTML — used for icons, logos, diagrams that stay sharp no matter how much you resize them.

### `data-*` Attributes
Used to store custom data for JavaScript to use:
```html
<div data-user-id="123" data-role="admin">...</div>
```
Accessed in JS via `element.dataset.userId`.

### `<script>`
Used to embed or link JavaScript. The `defer` attribute makes the script run only after the HTML has loaded (best practice).

### `<link>`
Used in the head to connect external resources — most commonly CSS, but also favicons:
```html
<link rel="stylesheet" href="style.css">
<link rel="icon" href="favicon.ico">
```

---

## Part 10: Global Attributes (Can Be Used on Almost Any Tag)

- `id` — a unique identifier (only one element per page should have a given id)
- `class` — used for CSS/JS grouping (multiple elements can share the same class)
- `style` — inline CSS
- `title` — shows a tooltip on hover
- `hidden` — hides the element
- `contenteditable="true"` — lets the user edit content directly on the page
- `draggable="true"` — enables drag-and-drop
- `tabindex` — sets the order for keyboard tab navigation

---

## Study Progression Path (Basic → Advanced)

1. **Level 1 (Structure):** `html`, `head`, `body`, `meta`, `title`
2. **Level 2 (Content):** headings, `p`, `a`, `img`, lists
3. **Level 3 (Layout):** `div`, `span`, tables
4. **Level 4 (Interaction):** forms — practice this the most
5. **Level 5 (Modern/Semantic):** `header`, `nav`, `main`, `section`, `article`, `footer`
6. **Level 6 (Advanced):** `canvas`, `svg`, `dialog`, `template`, `data-*` attributes, accessibility (ARIA)

### Next Step Suggestion
After learning HTML tags, move on to CSS in parallel — right now, anything you build will look plain/unstyled. Then use JavaScript to make it interactive.
