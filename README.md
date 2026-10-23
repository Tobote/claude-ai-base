# claude-ai-base

A reusable AI base for **spec-driven development** with [Claude Code](https://docs.claude.com/en/docs/claude-code) and [GitHub Spec Kit](https://github.com/github/spec-kit), packaged as a Claude Code plugin marketplace named **`ai-base`**.

- **Spec Kit** supplies the workflow: `/speckit.constitution → specify → clarify → plan → tasks → analyze → implement`.
- **This repo** supplies the knowledge and guardrails reused across projects: skills, agents and hooks.

## Plugins
| Plugin | Contents |
|---|---|
| `sdd-core` (always enable) | Skills: `project-bootstrap`, `constitution-baseline`, `spec-quality`, `adr`, `git-workflow`. Agents: `spec-reviewer`, `architect`, `code-reviewer`, `test-engineer`. Hook: blocks reading/editing `.env` and key files |
| `stack-dotnet` | `dotnet-conventions`, `efcore-postgres`, `xunit-testing` |
| `stack-node` | `node-ts-conventions`, `node-testing` |
| `event-driven` | `messaging-patterns`, `rabbitmq`, `kafka`, `redis-usage`, `docker-compose-local-env` |

## One-time machine setup
1. Claude Code (CLI, or the VS Code extension).
2. Node.js. The guardrail hook runs on Node.
3. [uv](https://docs.astral.sh/uv/): `winget install astral-sh.uv`
4. Spec Kit CLI: `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git`
5. Add this marketplace in Claude Code:
   ```
   /plugin marketplace add <github-user>/claude-ai-base
   # or, while it is only local:
   /plugin marketplace add C:\Users\celio.pimentel\Desktop\Estudos\Pessoal\claude-ai-base
   ```
6. `/plugin install sdd-core@ai-base`

## New project (about 5 minutes)
1. Create the folder and open it in Claude Code.
2. Install the stack plugins you need: `/plugin install stack-dotnet@ai-base` (and so on).
3. Ask Claude: **"bootstrap this project with the AI base"**. The `project-bootstrap` skill then:
   - runs `git init` and `specify init --here --ai claude --script ps`;
   - writes `.claude/settings.json` (marketplace + `enabledPlugins`, so teammates get the same plugins), `CLAUDE.md` and `.gitignore`;
   - seeds `.specify/memory/constitution.md` with the baseline principles.
4. Restart Claude Code, then run `/speckit.constitution` to add the project-specific principles.
5. Per feature: `/speckit.specify` → `/speckit.clarify` → `/speckit.plan` (then ask the `architect` agent for a review) → `/speckit.tasks` → `/speckit.analyze` → `/speckit.implement` → `code-reviewer` agent → PR.

## Improving the base (the feedback loop)
After each feature or project, turn repeated corrections into base improvements:
- Claude keeps making the same mistake → update the relevant skill.
- A new recurring practice → a new skill (use the `skill-creator` skill to write and test it).
- A principle you want everywhere → `constitution-baseline/base-principles.md`.

Then bump `version` in that plugin's `.claude-plugin/plugin.json`, commit, push, and run `/plugin marketplace update ai-base` in your projects.

## Layout
```
.claude-plugin/marketplace.json
plugins/<plugin>/.claude-plugin/plugin.json
plugins/<plugin>/skills/<skill>/SKILL.md
plugins/sdd-core/agents/*.md
plugins/sdd-core/hooks/hooks.json
```
