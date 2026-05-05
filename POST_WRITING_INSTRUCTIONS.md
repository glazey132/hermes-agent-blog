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

### Step 5: Self-check before delivering

Go through this list:
- [ ] Every technical claim is traceable to the session notes or git log
- [ ] No architectural details were invented to make the post sound more complete
- [ ] The title reflects what actually happened, not what sounds impressive
- [ ] The excerpt is specific — a reader can tell from it whether the post is relevant to them
- [ ] "What's next" describes a real next step, not a vague direction

If any item fails, revise before delivering.

---

## What to do with the output

Add the new post to the `posts` object in:
```
src/app/posts/[slug]/page.tsx
```

And add a card to the home page in:
```
src/app/page.tsx
```

Follow the existing patterns exactly. The post slug should follow the `day-N-short-description` convention.

After adding the post, run:
```bash
npm run build
```

Fix any errors before committing. Commit message format:
```
content: add Day N post — [short description of what the post covers]
```

---

## What this blog is not

- Not a tutorial series teaching AI concepts from scratch
- Not a marketing document for Hermes
- Not a place to speculate about future capabilities
- Not generic "AI is transforming everything" content

If a sentence could appear in any AI blog written by anyone who has never touched this codebase, cut it.
