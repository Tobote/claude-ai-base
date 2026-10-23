---
name: project-bootstrap
description: Bootstrap a new or empty project with the AI/SDD base - git init, GitHub Spec Kit (specify init), ai-base plugins enabled in .claude/settings.json, CLAUDE.md and a seeded constitution. Use when the user asks to bootstrap, set up, initialize or start a new project with the AI base / spec-driven development.
---

# Project bootstrap

Set up the current folder so it follows the spec-driven workflow from the `ai-base` marketplace. Templates are in `templates/` next to this file.

## 1. Gather inputs (ask only for what you can't infer)
- Project name and a one-line purpose.
- The stack plugins to enable: `stack-dotnet`, `stack-node`, `event-driven`. `sdd-core` is always enabled.
- Marketplace source: a GitHub repo (`owner/claude-ai-base`) or a local directory path.
- Script flavour for Spec Kit: `ps` on Windows, `sh` elsewhere.

## 2. Preconditions
- Check `git --version` and `specify --version`.
- If `specify` is missing, tell the user to install it once per machine and stop until it is installed:
  `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git`
  (uv: `winget install astral-sh.uv` on Windows, or see https://docs.astral.sh/uv/).
- Don't overwrite an existing `CLAUDE.md`, `.claude/settings.json` or `.specify/`. Merge them, or ask the user first.

## 3. Steps
1. Run `git init` if the folder isn't a repo yet. Then copy `templates/gitignore` to `.gitignore`, or merge it into the existing file.
2. `specify init --here --ai claude --script <ps|sh>`. This creates `.specify/` and `.claude/commands/speckit.*.md`.
3. Write `.claude/settings.json` from `templates/settings.json`:
   - set the `ai-base` marketplace source (`github` + `repo`, or `directory` + `path`);
   - in `enabledPlugins`, keep only the plugins the user chose.
4. Write `CLAUDE.md` from `templates/CLAUDE.md` and fill in the placeholders.
5. Seed the constitution: invoke the `constitution-baseline` skill. It merges the base principles into `.specify/memory/constitution.md`.
6. Create `docs/adr/` with the `0000-template.md` from the `adr` skill.
7. Commit with `chore: bootstrap AI/SDD base`.

## 4. Hand-off
Tell the user the next steps:
1. Restart Claude Code (or run `/plugin`) so the plugins and `/speckit.*` commands load.
2. Run `/speckit.constitution` to make the principles project-specific.
3. Start the first feature with `/speckit.specify <feature description>`.
