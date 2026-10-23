---
name: learning-journal
description: Maintain the learner's study journal in docs/learning/journal.md - add a dated entry at the end of a session (what was done, what was learned in the user's own words, open questions, next step) and summarise past entries at the start of a session. Use when the user ends or starts a study session, says "journal", "log this session", "what did I do last time", or after a concept check.
---

# Learning journal

The file is `docs/learning/journal.md`. Newest entry goes at the **top**, under the `## Entries` heading.

## Adding an entry (end of session)
Ask the user these questions, briefly, all together:
1. What did you do today? (tasks, experiments)
2. What did you learn? **In your own words.** This matters more than anything else.
3. What surprised you, or what broke?
4. What's still unclear?
5. What's next?

Then write the entry. Keep the user's wording for item 2; fix only typos.
```markdown
### YYYY-MM-DD · Module N · <short title>
- **Did:** ...
- **Learned:** ...
- **Surprised / broke:** ...
- **Open questions:** ...
- **Next:** ...
- **Time:** ~Xh
```
If an open question is a misconception, point it out gently and add a pointer for clarifying it.

## Session start
Read the latest two or three entries and summarise them in three lines: where we are, the open questions, and the planned next step. Propose today's goal, picking up the open questions first.
