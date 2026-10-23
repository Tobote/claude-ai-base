---
name: concept-check
description: Quiz the learner at the end of a study module (or on request) with 5-8 scenario-based questions about the module's concepts, one at a time, then grade with feedback and record weak spots. Use when the user says "quiz me", "concept check", "test my understanding", or finishes a module in docs/learning/roadmap.md.
---

# Concept check

## Prepare
- Identify the module from the user, or from the first unchecked module in `docs/learning/roadmap.md`. Read its concepts, plus the user's code and ADRs for that module.
- Write 5–8 questions. Mix the types:
  - **Scenario** (at least half): *"The relay published message 42, then crashed before marking it sent. What happens on restart? Is that a problem? Why or why not?"*
  - **Explain-why**: *"Why does the outbox insert have to be in the same transaction as the order insert?"*
  - **Compare**: *"Choreography vs orchestration for our saga: one advantage of each."*
  - **Your code**: *"In your `OrderPlacedConsumer`, what happens if Postgres is down?"*
- Avoid trivia (API names, flags). Test understanding.

## Run
- Ask **one question at a time** and wait for the answer. Don't give hints unless asked. If the user is stuck, offer one hint.
- After each answer, give brief feedback: correct, partially correct or incorrect. Name what was missing, with a one-or-two sentence explanation.

## Grade
- Score each question 0, 0.5 or 1, and show the total as a percentage. 80% or more means the module is done.
- List the **weak spots**, each with one targeted reading or experiment.
- Offer to append the result and the weak spots to `docs/learning/journal.md` (the `learning-journal` skill). If the score is 80% or more, offer to tick the module in the roadmap.
