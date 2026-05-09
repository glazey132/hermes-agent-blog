# Post Writing Instructions — Hermes Agent Blog

This file is for the agent writing blog posts. Read it fully before doing anything else.

---

## What this blog is

The Hermes Agent Blog documents the real, ongoing process of building Hermes — an autonomous AI agent that runs locally, has access to this repository, handles git operations, and takes actions on behalf of its operator. Posts are written in first-person plural ("we") as a development journal, not as tutorials or explainers written after the fact.

The audience is technical: engineers and founders who are building or evaluating AI agent systems. They can tell when something is made up. Generic AI content is worse than no content.

---

## The grounding rule

**You may only write about things that are documented in today's session notes or verifiable in the git log. Do not add technical detail, architectural decisions, code patterns, or conclusions that are not explicitly present in those sources.**

If the session notes say "we implemented a retry mechanism," you can write about the retry mechanism. If they don't describe how it works, you cannot invent how it works. Write around the gap or flag it as something to explore next time.

This rule exists because the value of this blog is its specificity and honesty. A post that says "we discovered the retry backoff needed to be exponential because linear backoff caused thundering herd issues under load" is worth reading. A post that says "we implemented retry logic using best practices" is not.

---

## Publishing cadence rule

**Do not create a new "Day N" post just because the agent loop is running. A new post may only be published once per calendar day, after there are session notes for that date and git history showing real work.**

If this agent is running in a `/goal` loop, the loop should maintain notes and TODOs, not publish new posts. Publishing belongs in a daily cron-style workflow that runs after the day's work is done.

Before creating a post:
- Check today's date.
- Check whether today's post already exists.
- Check whether `session-notes/YYYY-MM-DD.md` exists and has enough substance.
- Check the git log for changes since midnight.

If today's post already exists, update that post only if the session notes show a meaningful correction or addition. Do not increment the day number. If no day has passed since the last post, stop and report that no new post should be created.

The day number is a publication sequence, not an agent-run counter. Multiple agent runs on the same day must never produce Day N, Day N+1, Day N+2.

---

## Required steps — do not skip any

### Step 1: Read today's session notes

Session notes live at:
```
session-notes/YYYY-MM-DD.md
```

Use today's date. If the file does not exist, stop and report: "No session notes found for [date]. Cannot write a grounded post."

Do not proceed to writing without reading the session notes.

### Step 2: Read the git log for today

Run:
```bash
git log --since="midnight" --oneline --stat
```

This gives you the factual record of what changed. If the session notes are sparse, the git log fills gaps with objective evidence of what was actually worked on.

### Step 3: Extract the specifics

Before drafting, write out — for your own working memory — the answers to these questions based only on what you just read:

1. What specific problem or goal drove today's work?
2. What was actually built or changed? (name files, functions, data structures)
3. What decision was made, and what was the concrete reason?
4. What went wrong or surprised us?
5. What is one thing a reader could learn from this session that they couldn't get from a generic AI blog post?

If you cannot answer at least three of these five from the source material, the session notes are too sparse to write a good post. In that case, write a shorter, more honest post about the work-in-progress nature of the day rather than inflating thin material.

Do not fill gaps with general AI knowledge, plausible architecture, invented benchmark numbers, imagined user workflows, or generic examples. If the source material is thin, the post must be thin.

### Step 4: Draft the post

**Voice and format:**
- First-person plural ("we built", "we discovered", "we ran into")
- Past tense — this happened, it's documented
- Lead with the real situation, not a setup paragraph
- Technical terms are fine; jargon for its own sake is not
- Paragraphs over bullet lists for narrative sections; bullets are fine for lists of actual items
- No filler phrases: "In today's post we will explore...", "As we continue our journey...", "It's worth noting that..."
- End with what's next — the specific next step, not a vague "stay tuned"

**Structure** (adapt as needed, don't force it):
```
## [Specific title that says what actually happened]

[Opening: the situation or problem we walked into today — 2-3 sentences]

## [What we did / what the challenge was]

[The real account, with specifics from session notes]

## [Key decision or finding]

[The most interesting or non-obvious thing from the session]

## What's next

[The concrete next step]
```

**Post metadata to fill in:**
```ts
{
  slug: "day-N-[short-slug]",
  title: "Day N: [Specific title]",
  excerpt: "[1-2 sentences. Specific enough that a reader knows if it's relevant to them.]",
  date: "[Today's date in format: Month DD, YYYY]",
  content: "[Full post content as a markdown string]"
}
```

**Critical TSX string safety rule:**

Post pages store Markdown inside TypeScript/TSX string literals. Raw Markdown backticks inside those strings will break the production build because TypeScript treats them as the end of the string.

Preferred approach: generate the `content` value with `JSON.stringify(markdown)` or otherwise use a normal quoted string with escaped newlines. Do not hand-paste a large Markdown post into `content: \`...\`` unless you escape every Markdown backtick.

If you do use a template literal for `content`, every Markdown backtick in the post body must be escaped:
```ts
// Correct inside content: `...`
\`\`\`typescript
const example = true;
\`\`\`

Use \`inline code\` too.
```

Never leave raw code fences like this inside a TSX `content: \`...\`` string:
````md
```typescript
const example = true;
```
````

**Outer `content` template literal must actually close**

The production build error `Expected ',', got '#'` (or `got '...'`) on the *next* post’s `content:` line almost always means the **previous** post’s `content` string never ended: the parser is still inside the first template literal.

Common mistake: ending a paragraph, then a **new line** with only `` \`, `` (backslash + backtick + comma). That inserts a literal backtick **inside** the markdown string and **does not** terminate the template literal. You need an **unescaped** closing backtick to end `content: \`...\``.

Do this instead (match existing working posts, e.g. `day-21-agent-observability/page.tsx`):

- Put the terminator on the **same line** as the end of the markdown, e.g. `` ...last line of markdown.\n`, ``  
- Or end the markdown line, then on the next line put **only** the closing backtick that ends the template literal, then a comma — **no** backslash before that backtick.

After editing any large `content: \`...\`` block, skim the **boundary** before the next key in the `posts` object (`},` and the next slug). If in doubt, run `npm run build` immediately.

**Standalone pages: one post per file when possible**

Some files incorrectly hold a `posts` map for **multiple** days (copy-paste from another route). That duplicates huge template literals and makes closure mistakes more likely. Prefer **one slug’s** `PostContent` per standalone `page.tsx` unless the repo already uses a deliberate multi-entry pattern for that route. Navigation order comes from `src/lib/posts.ts` + `getAdjacentPostSlugs`, not from duplicating other days’ bodies in the same file.

Also escape template interpolation sequences in post content:
```ts
// Correct inside content: `...`
\${value}
```

If this rule is missed, Vercel usually fails with an error like `Expected ',', got 'Processing'` or `Expected ',', got 'typescript'` on the line after a Markdown code fence, or `Expected ',', got '#'` on the next post’s title when the prior `content` literal was left unclosed.

**Post page typing rule:**

If a standalone post page uses a `PostSlug` union that includes more than one slug (for example neighboring days in a shared file), do not type the local `posts` object as `Record<PostSlug, PostContent>` unless it contains every slug in that union.

Use one of these safe patterns:
```ts
// Best: local page only knows the posts it actually defines.
type PostSlug = 'day-N-current-post';
type Posts = Record<PostSlug, PostContent>;
```

```ts
// Acceptable when PostSlug includes navigation neighbors.
type PostSlug = 'day-N-current-post' | 'day-N-next-post';
type Posts = Partial<Record<PostSlug, PostContent>>;
```

If this rule is missed, the build can pass parsing but fail type checking with `Type ... is missing the following properties from type 'Posts'`.

### Step 5: Self-check before delivering

Go through this list:
- [ ] The post is registered in `src/lib/posts.ts` with `published: true` and correct chronological placement
- [ ] A full calendar day has passed since the previous post, or this is an update to today's existing post
- [ ] The day number matches the next real publication day, not the number of agent runs
- [ ] Today's session notes exist and were read before drafting
- [ ] Every technical claim is traceable to the session notes or git log
- [ ] No architectural details were invented to make the post sound more complete
- [ ] No generic examples, metrics, diagrams, tools, or code snippets were added unless they came from the session notes or git log
- [ ] The title reflects what actually happened, not what sounds impressive
- [ ] The excerpt is specific — a reader can tell from it whether the post is relevant to them
- [ ] "What's next" describes a real next step, not a vague direction
- [ ] The post body contains no raw Markdown backticks inside a TSX template literal; code fences are escaped as `\`\`\`` and inline code as `\`code\``
- [ ] Every `content: \`...\`` block ends with a **real** closing backtick (not a solo `\`,` line that keeps the literal open)
- [ ] If the page defines a `PostSlug` union, the `posts` type matches the actual keys or uses `Partial<Record<PostSlug, PostContent>>`
- [ ] `npm run build` was run after the change and completed with no errors — **do not treat the post as done until the app builds**
- [ ] Changes are committed and pushed to **`main`** so the hosting provider can deploy (automation should include this step after the build passes)

If any item fails, revise before delivering.

---

## What to do with the output

Register the **published** post in the central metadata list:

```
src/lib/posts.ts
```

Append a `PostMeta` entry in chronological order alongside the other posts, with `published: true`, matching the existing fields (`slug`, `day`, `title`, `excerpt`, `date`). The homepage pagination, post prev/next navigation, and sitemap are generated from this file. Do **not** add manual post lists or `order` arrays inside `page.tsx` files.

Implement the actual body wherever it belongs for this project:

```
src/app/posts/[slug]/page.tsx    (legacy dynamic posts)
```

and/or a standalone route folder:

```
src/app/posts/day-N-short-slug/page.tsx
```

Follow the existing patterns exactly. The post slug should follow the `day-N-short-description` convention only when this is a real new publication day.

If a standalone route file exists without grounded post content, do not set `published: true` in `src/lib/posts.ts` and do not add it to the registry until it is real. Fix the source of truth first.

After adding or editing any post route or `content` string, run:

```bash
npm run build
```

**Treat a failing build as a blocker:** do not commit, do not register `published: true`, and do not declare the task finished until this passes locally.

If the build fails:

- Near a Markdown code fence → escape backticks in the post body or use `JSON.stringify(markdown)` for `content`.
- With `Expected ',', got '#'` (or similar) on a **later** post’s `content` line → the **earlier** post’s `content` template literal is probably still open; fix the closing backtick before that line (see **Outer `content` template literal must actually close** above).

Commit message format:
```
content: add Day N post — [short description of what the post covers]
```

**Push to `main` so the site goes live**

Production deploys from this repo when **`main`** is updated (for example Vercel with auto-deploy on push). A cron or other automated workflow using these instructions should not stop at a local commit: after `npm run build` succeeds, **commit and push to `origin main`** (with credentials the job already has).

Until the push lands on `main`, readers still see the previous deployment. Treat “published” as **build green + merged/pushed to `main`**, not only “files edited in the workspace.”

---

## What this blog is not

- Not a tutorial series teaching AI concepts from scratch
- Not a marketing document for Hermes
- Not a place to speculate about future capabilities
- Not generic "AI is transforming everything" content

If a sentence could appear in any AI blog written by anyone who has never touched this codebase, cut it.
