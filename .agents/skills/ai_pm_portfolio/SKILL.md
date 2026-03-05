---
name: AI PM Portfolio
description: Load this skill whenever the user is working on an AI PM portfolio project, mentions shipping a project, asks about documentation, or is setting up a new repo.
---

# AI PM Portfolio Skill

## When to Load This Skill
- User is working on an AI PM portfolio project
- User mentions shipping a project
- User asks about documentation standards
- User is setting up a new repo

---

## PM Documentation Standards
- **PRD comes before code, always** — no implementation until `docs/PRD.md` exists
- **`decisions.md` is updated before implementing any choice** — log the decision, then write the code
- **`prompts.md` is versioned every time a prompt changes** — bump the version number, log the reasoning
- **README is written last** — after the project ships, not before
- **CHANGELOG uses semantic versioning**: `major.minor.patch`

---

## Prompt Engineering Standards
- All prompts request **JSON output** with an explicit schema defined in the prompt
- Every prompt has a **version number in a comment** above it (e.g., `// v1.2`)
- **Test cases live in `prompts.md`**, not in the code
- Prompts are **isolated in their own constant**, never written inline in logic

---

## Git Commit Standards
| Prefix | Use |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `refactor:` | No behavior change |
| `test:` | Adding tests |
| `chore:` | Config, deps, tooling |

---

## Stack Defaults
| Layer | Technology |
|---|---|
| Frontend | HTML / CSS / JavaScript (vanilla) |
| AI | Anthropic Claude API (`claude-sonnet-4-5`) |
| Data | SQL / Oracle / R |
| Visualization | Tableau or D3.js |
| Deploy | GitHub Pages (static) or Vercel |

---

## Automated Workflow Commands

The following slash commands define the full shipping workflow. Use these in order for every new project:

### `/new-project`
Scaffold a new repo. Ask the user 5 questions:
1. Project name?
2. One-sentence description?
3. Primary AI feature?
4. Target user?
5. Success metric?

Then generate the full repo structure:
```
/
├── index.html
├── style.css
├── app.js
├── api.js
├── .env.example
├── README.md
├── CHANGELOG.md
└── docs/
    ├── PRD.md
    ├── decisions.md
    ├── prompts.md
    └── architecture.md
```

### `/log-decision`
Before any technical choice, add an entry to `docs/decisions.md`:
```
## [YYYY-MM-DD] — [Decision Title]
**Decision:** [What was decided]
**Reasoning:** [Why]
**Alternatives considered:** [What else was on the table]
**Trade-offs:** [What we gave up]
```

### `/update-prompt`
When any AI prompt changes, add a versioned entry to `docs/prompts.md`:
```
## Prompt: [Name] — v[X.Y]
**Changed:** [YYYY-MM-DD]
**Reasoning:** [Why it changed]
**Prompt:**
\`\`\`
[Full prompt text]
\`\`\`
**Test cases:**
- Input: [...] → Expected output: [...]
```

### `/ship-checklist`
Before every push, verify:
- [ ] `README.md` has a live demo link placeholder
- [ ] `.env.example` is up to date
- [ ] `decisions.md` has an entry for recent work
- [ ] `CHANGELOG.md` has been updated
- [ ] No API keys are hardcoded anywhere
- [ ] `docs/prompts.md` reflects the latest prompt version

### `/draft-pr`
Generate a pull request description with:
- **What changed** (feature summary)
- **Why** (links to `decisions.md` entry)
- **How to test** (manual steps)
- **Checklist** (from `/ship-checklist`)

---

## Full Project Flow
```
1. Open Antigravity → new workspace
2. /new-project → answer 5 questions → entire repo scaffolded
3. /log-decision → before every technical choice
4. Build (vibe-code with the agent)
5. /update-prompt → every time your AI prompt changes
6. /ship-checklist → before every push
7. /draft-pr → paste into GitHub
8. Repeat steps 4–7 until shipped
```
