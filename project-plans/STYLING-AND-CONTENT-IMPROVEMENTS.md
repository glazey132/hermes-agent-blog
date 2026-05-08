# Hermes Agent Blog — Styling & Content Rendering Improvements

This document is an agent execution plan. Work through phases in order. Each phase is self-contained and can be verified before proceeding. All file paths are relative to `hermes-agent-blog/` (the Next.js project root).

---

## Executive Summary

| Area | Severity | Issue |
|------|----------|-------|
| Content architecture | Critical | All 6 posts hardcoded as escaped strings in `page.tsx`. No single source of truth for post list. |
| Code blocks | Critical | `formatPostContent` language detection is broken; `<br>` joins destroy code semantics; no HTML escaping. |
| Markdown parser | Critical | `formatPostContent` is a line scanner: bold, links, italic, ordered lists, `<ul>` wrappers, `####`, `---` all broken or missing. |
| Tailwind config | High | `tailwind.config.js` `content` paths reference `./app/**` not `./src/app/**` — Tailwind misses all source files in production purge. |
| Invalid HTML | High | `<li>` elements emitted without `<ul>` parent. |
| Duplicate H1 | Medium | Post content strings start with `# Post Title`, same title rendered as `<h1>` in the header — two H1s per page. |
| Dead routes | Medium | Footer links to `/about` and `/posts` — neither route exists. |
| Inline styles | Medium | Article typography rules live in a JSX `<style>` string, not in the stylesheet. |
| Unused dependency | Low | `date-fns` in `package.json` is never imported. |

---

## Phase 1 — Fix Tailwind Content Paths

**File**: `tailwind.config.js`

**Problem**: `content` array paths (`./pages/**`, `./components/**`, `./app/**`) do not match the actual project structure which uses a `src/` directory. In production builds, Tailwind scans the wrong directories and purges classes that are actually in use.

**Fix**: Replace the entire `content` array:

```js
content: [
  './src/**/*.{js,ts,jsx,tsx,mdx}',
],
```

Verify by running `npm run build` after this change — no missing-class regressions.

---

## Phase 2 — Install Required Packages & Remove Unused

**Install**:
```bash
npm install react-markdown remark-gfm rehype-highlight
```

**Remove unused**:
```bash
npm uninstall date-fns
```

`date-fns` appears in `package.json` but is not imported anywhere in the codebase.

---

## Phase 3 — DEFERRED: Extract Post Content into a Data Module

> **Deferred** — content architecture (markdown files, separate module, CMS) needs more thought before committing to an approach. Posts remain hardcoded in `src/app/posts/[slug]/page.tsx` for now.
>
> When adding new posts in the interim, add them to the `posts` object in that file and use today's date as the `date` string (e.g. `"May 05, 2026"`). Also manually add a card to `src/app/page.tsx`.

---

## Phase 4 — Replace `formatPostContent` with `react-markdown`

**File**: `src/app/posts/[slug]/page.tsx`

**Problems with `formatPostContent`** (lines 154–204):

1. **Language tag is silently dropped**: When the opening fence `` ```typescript `` is matched by `line.startsWith("```")`, `inCodeBlock = true` and `codeContent = []`. The language identifier is on that same line and is never captured. At closing time, the code incorrectly checks `codeContent[0]` (the first line of actual code) to guess the language — which produces wrong class names if the first code line has no spaces, and falls back to no class if it does.

2. **`<br>` joins destroy code semantics**: Code lines are joined with `<br>` (`codeContent.join("<br>")`). This breaks copy-paste, makes `white-space: pre` ineffective, and garbles multi-line code.

3. **4-space indent code detection is broken** (lines 190–193): A 4-space-indented line sets `inCodeBlock = true` with no natural close condition — only a `` ``` `` line will close it. All content following an indented line gets consumed as code.

4. **`**bold**`, `[link](url)`, `*italic*`**: Passed through as-is inside `<p>` tags — raw asterisks and brackets render in the UI.

5. **`<li>` without `<ul>`**: Line 195 emits `<li>` directly. No `<ul>` wrapper is ever opened or closed — invalid HTML.

6. **Ordered lists `1. ...`**: Fall through to `<p>`.

7. **`#### h4` and deeper**: Not handled, rendered as `<p>`.

8. **`---` horizontal rules**: Rendered as `<p>---</p>`.

9. **No HTML escaping**: `<`, `>`, `&` inside code blocks are injected raw into HTML. Any `<` in a code sample renders as a tag.

10. **Heading extraction bug**: `line.replace("# ", "")` replaces only the first occurrence; `line.slice(2)` (for H2) etc. would be correct.

**Replacement**: Delete `formatPostContent` entirely and render content with `react-markdown`.

Create `src/components/PostBody.tsx` as a `"use client"` component:

```tsx
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface PostBodyProps {
  content: string;
}

export default function PostBody({ content }: PostBodyProps) {
  // Strip leading H1 if it duplicates the page header (see Phase 6)
  const stripped = content.replace(/^#\s+.+\n/, '');

  return (
    <ReactMarkdown
      className="prose prose-lg max-w-none"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    >
      {stripped}
    </ReactMarkdown>
  );
}
```

In `src/app/posts/[slug]/page.tsx`, replace:
```tsx
<div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: formatPostContent(postContent.content) }} />
```
with:
```tsx
<PostBody content={postContent.content} />
```

Remove the `<style>` block (lines 98–107) entirely — styles move to `globals.css` in Phase 7.

**Update prev/next navigation** using the existing `getPreviousPostLink`/`getNextPostLink` maps already in `page.tsx`. Replace the manual `if/else` JSX chain (lines 112–141) with:

```tsx
const prev = slug !== 'day-1-start' ? getPreviousPostLink(slug) : null;
const next = slug !== 'day-6-how-ai-agents-work' ? getNextPostLink(slug) : null;

// In JSX:
<div className="mt-12 flex justify-center gap-4">
  {prev && (
    <Link href={`/posts/${prev}`} className="...">← Previous Post</Link>
  )}
  {next && (
    <Link href={`/posts/${next}`} className="...">Next Post →</Link>
  )}
</div>
```

This replaces the verbose manual `if/else` chain while keeping the existing helper functions. When Phase 3 is revisited, these helpers move into the data module.

---

## Phase 5 — Fix the Home Page Post List

**File**: `src/app/page.tsx`

**Problem**: The home page has 6 hardcoded `<Link><article>` blocks (lines 31–155). Adding a post requires editing this file manually. The sidebar stat "Days Active: 1" is also hardcoded and incorrect.

**Fix**: Since Phase 3 is deferred, keep the posts object in `posts/[slug]/page.tsx` as-is. Instead, fix the sidebar stats and note that new posts still require a manual card addition here until the content architecture is resolved.

- Update "Days Active" to reflect the actual number of days, or remove the stat entirely
- Update "Posts Published" to the correct count (`6`)
- When adding a new post, add its card here manually, matching the existing pattern

---

## Phase 6 — Fix Duplicate H1

**Problem**: Every post content string begins with `# Day N: Title`, which `react-markdown` renders as an `<h1>`. The page header at `src/app/posts/[slug]/page.tsx` line 89 already renders `postContent.title` as a `<h1>`. Every post page has two H1 elements — bad for SEO and accessibility.

**Fix**: In `PostBody.tsx`, strip the leading H1 from content before rendering (already shown in Phase 4 implementation):
```ts
const stripped = content.replace(/^#\s+.+\n/, '');
```

This removes the first line only if it is a Markdown H1. Posts start at `##` in the rendered body. The page `<h1>` in the header remains the sole H1.

---

## Phase 7 — Fix Prose and Code Styles

**File**: `src/app/globals.css`

**Problems**:
- `.prose code` styles (inline) bleed into `pre > code` (fenced blocks) causing low-contrast or "censored bar" appearance
- Prose rules live in a JSX `<style>` string in `page.tsx` — should be in the stylesheet
- `@tailwindcss/typography` is not installed; `prose` / `prose-lg` Tailwind classes do nothing

**Decision**: Install `@tailwindcss/typography` and use it properly, or write explicit prose CSS. Recommendation: install the plugin — it handles all prose typography correctly and is the intended pairing with `react-markdown`.

**Install**:
```bash
npm install -D @tailwindcss/typography
```

**Update `tailwind.config.js`**:
```js
plugins: [require('@tailwindcss/typography')],
```

With the plugin installed, `className="prose prose-lg max-w-none"` on the PostBody wrapper works correctly. **No additional inline `<style>` needed — delete the JSX `<style>` block entirely.**

Add the following to `globals.css` to fix the `pre > code` contrast bug:

```css
/* Reset inline code styles inside fenced blocks */
.prose pre code {
  background: transparent;
  padding: 0;
  border-radius: 0;
  color: inherit;
  font-size: inherit;
}

/* Ensure pre blocks scroll horizontally on overflow */
.prose pre {
  overflow-x: auto;
  tab-size: 2;
}
```

Add a highlight.js theme for syntax highlighting. Import it in `src/app/layout.tsx`:
```tsx
import 'highlight.js/styles/github-dark.css';
```

Choose `github-dark` for dark code blocks on a light page background (good contrast). Other options: `atom-one-dark`, `night-owl`. Pick one and be consistent.

---

## Phase 8 — Fix the Global Theme Conflict

**File**: `src/app/globals.css`

**Problem**: Lines 17–23 apply a dark body background and white foreground when the OS is in dark mode. Component backgrounds are hardcoded light (`bg-white`, `bg-gray-50`, `bg-gray-800`). In dark mode, the body is near-black but cards are white — unscoped text outside cards (e.g., headings, sidebar text, space between sections) appears as white on near-black, breaking contrast in unpredictable places.

**Decision**: The site currently has no dark mode design intent — all components use explicit light palette classes. The simplest correct fix is to remove the dark mode override so the body always renders in the light palette.

**Fix**: Delete lines 17–23 from `globals.css`:
```css
/* DELETE THIS BLOCK */
@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 15, 23, 42;
  }
}
```

And simplify the body rule to remove the CSS variable indirection since it's now unused:
```css
body {
  background-color: #f9fafb; /* gray-50, matches page shells */
  min-height: 100vh;
}
```

If a full dark mode is desired in the future, that is a separate scoped effort using Tailwind's `dark:` variant and `class="dark"` on `<html>`.

---

## Phase 9 — Fix Dead Footer Routes

**Problem**: The footer in `src/app/page.tsx` (lines 233–244) links to `/about` and `/posts`. Neither route exists. Clicking them returns a 404.

**Fix options** (choose one):
- **A) Remove the links** — simplest, no dead ends
- **B) Create stub pages** — create `src/app/about/page.tsx` and `src/app/posts/page.tsx` with minimal content

Recommendation: Remove the links for now. When the `/about` and `/posts` pages are built intentionally, add them back.

Remove or replace the footer links section:
```tsx
{/* Remove these: */}
<Link href="/about" ...>About</Link>
<Link href="/posts" ...>All Posts</Link>
```

Also update the footer copyright year: `© 2024` → `© {new Date().getFullYear()}`.

---

## Phase 10 — Verify and Build

Run in order:
```bash
npm run lint         # fix any errors
npx tsc --noEmit    # fix any type errors
npm run build        # must complete without errors
```

Manual checks after build:
- [ ] Visit each post (`/posts/day-1-start` through `/posts/day-6-how-ai-agents-work`) — no raw Markdown syntax visible in body
- [ ] Code blocks are readable: correct monospace font, dark background, syntax highlighted, no "censored bar" appearance
- [ ] Inline `code` is styled differently from body text but does NOT bleed into fenced code
- [ ] Bold, links, italic, ordered lists, unordered lists all render correctly
- [ ] Prev/Next navigation: day-1 shows only "Next", day-6 shows only "Previous", all others show both
- [ ] No duplicate H1 (use browser dev tools to inspect — only one `<h1>` per page)
- [ ] Home page post list matches what's in `src/lib/posts.ts`
- [ ] Footer links are removed or point to real routes
- [ ] No Tailwind class purge warnings in build output

---

## Files Changed Summary

| File | Change |
|------|--------|
| `tailwind.config.js` | Fix `content` paths to `./src/**`; add typography plugin |
| `package.json` | Add `react-markdown`, `remark-gfm`, `rehype-highlight`, `@tailwindcss/typography`; remove `date-fns` |
| `src/lib/posts.ts` | **Deferred** — not created yet |
| `src/app/posts/[slug]/page.tsx` | Remove `formatPostContent` and inline `<style>`; use `PostBody`; simplify prev/next nav using existing helper maps |
| `src/components/PostBody.tsx` | **New** — `react-markdown` renderer with GFM and syntax highlighting |
| `src/app/page.tsx` | Drive post list from `getAllPosts()`; fix sidebar stats; fix dead footer links; fix copyright year |
| `src/app/globals.css` | Remove dark mode body override; add `pre code` reset; import highlight.js theme in `layout.tsx` |
| `src/app/layout.tsx` | Import highlight.js CSS theme |
