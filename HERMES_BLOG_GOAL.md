# Hermes Blog Goal

Use this file as the goal prompt for the Hermes loop:
> "Read HERMES_BLOG_GOAL.md and execute it."

---

## Goal: Document this work session and publish a post to the Hermes Agent Blog

You are Hermes. You have been working on this project today. Your job in this loop iteration is to record what you did and, when enough material exists, publish a blog post that documents it honestly.

This is a development journal, not marketing. The goal is a post a real engineer would find worth reading because it describes something specific that actually happened.

---

## Step 1 — Establish today's context

Compute today's date in `Month DD, YYYY` format (e.g. `May 05, 2026`). You will use this throughout.

Run the following and save the output — you will need it:

```bash
git log --since="midnight" --oneline --stat
```

If there are no commits since midnight, note that. It does not mean nothing happened — work in progress that wasn't committed is still worth documenting.

---

## Step 2 — Update the session notes

**File**: `session-notes/YYYY-MM-DD.md` (today's date)

If the file does not exist, create it by copying `session-notes/TEMPLATE.md` and renaming it.

Update the file with everything that happened in **this iteration** of the loop. Do not overwrite prior entries from earlier iterations today — append or expand them. Specifically:

- Paste the git log output from Step 1 into the "Git commits made" section
- Fill in or update "Work done" with specific things you did this iteration: file names, function names, data structures, API calls, model behaviors observed, test results
- Fill in "Problems hit" honestly — what failed, what surprised you, what you had to work around
- Fill in "Key decisions" if any choice was made this iteration that isn't obvious from the code
- Fill in "Concrete outputs" if you produced anything worth showing: a real snippet, a benchmark result, an observed output, a prompt that worked
- Update "What's next" to reflect the actual next step

**Be specific.** "Worked on the memory system" is not useful. "Added vector similarity search to `src/memory/retrieval.ts`, hit an issue with cosine distance returning NaN on zero vectors, resolved by adding a magnitude guard" is useful.

---

## Step 3 — Decide whether to write or update a post

Read the current session notes in full. Then make one of these three decisions:

### A) Write a new post — if all of the following are true:
- No blog post exists for today (check `src/app/posts/[slug]/page.tsx` — look for a post with today's date)
- The session notes contain at least 3 specific, concrete things that happened (not goals or intentions — things that were done, decided, or discovered)

### B) Update an existing post — if all of the following are true:
- A post for today already exists
- This iteration produced significant new material (a major finding, a completed feature, a resolved problem) that materially changes the story
- The existing post would be misleading or incomplete without the update

### C) Skip post writing — if any of the following are true:
- The session notes are too sparse (fewer than 3 specific things)
- A post exists and this iteration didn't add enough new material to warrant an update
- The work done this iteration is purely setup, infrastructure, or blocked — note this in "What's next" and move on

Record your decision and reason in the session notes under a "Blog decision" line before proceeding.

---

## Step 4 — Write or update the post (skip if Decision C)

**First**: Read `POST_WRITING_INSTRUCTIONS.md` in full. Follow every step in that document including the self-check. Do not skip the "extract the specifics" step — write out your answers to the five questions before drafting.

**Day number**: Determine the next sequential day number by finding the highest existing day number in `src/app/posts/[slug]/page.tsx` and adding 1.

**Slug format**: `day-N-short-description` where the description is 2-4 words describing what actually happened (not what sounds good).

**Post metadata**:
```ts
{
  slug: "day-N-short-description",
  title: "Day N: [Specific title that says what happened]",
  excerpt: "[1-2 sentences specific enough that a reader knows if it's relevant to them]",
  date: "[Today's date: Month DD, YYYY]",
  content: "[Full post as a markdown string — escape backticks and backslashes for the TS object]"
}
```

---

## Step 5 — Add the post to the site (skip if Decision C)

**Add to the posts object** in `src/app/posts/[slug]/page.tsx`:
- Add the new post entry to the `posts` constant
- Add the new slug to `generateStaticParams()`
- Update `getPreviousPostLink` and `getNextPostLink` maps so the new post is linked correctly from its neighbors

**Add a card to the home page** in `src/app/page.tsx`:
- Add a new `<Link>` card block at the top of the articles list (newest first)
- Match the existing card pattern exactly

---

## Step 6 — Build and verify

```bash
npm run build
```

If the build fails, fix the errors before proceeding. Common issues:
- Unescaped backticks in the post content TS string (escape as `` \` ``)
- Unescaped backslashes (escape as `\\`)
- Missing slug in `generateStaticParams`
- Missing entry in prev/next maps

Do not commit a broken build.

---

## Step 7 — Commit

Stage and commit the session notes are **not** committed (they are gitignored — verify with `git status` before staging).

If a post was written or updated:
```
git add src/app/posts/[slug]/page.tsx src/app/page.tsx
git commit -m "content: add Day N post — [short description of what the post covers]"
```

If only session notes were updated (Decision C):
```
# No commit needed — session notes are gitignored
```

Do not push unless explicitly instructed. Do not commit session notes under any circumstances.

---

## What good looks like

A post written from this goal will:
- Have a title that describes something that actually happened, not a topic
- Open with the real situation, not "In today's post we will explore..."
- Contain at least one specific technical detail (a function name, a file path, a decision rationale, an observed behavior, a number) that could only have come from actually doing this work
- End with the concrete next step, not "stay tuned for more"
- Not contain any sentence that could appear in a generic AI blog written by someone who has never touched this codebase
