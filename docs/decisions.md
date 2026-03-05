# Decision Log

*This file captures key decisions made during the project — including what was considered, what was chosen, and why. This is one of the most important PM portfolio artifacts: it shows that you think critically, not just that you can ship.*

---

## How to Use This File

Each entry follows this format:

```
## [DEC-###] Title of Decision
Date | Status: Decided / Revisiting / Superseded
```

---

## [DEC-001] AI Model Selection

**Date:** [Date]  
**Status:** Decided  
**Decided by:** [Your Name]

### Context
We needed to choose an AI model for the core analysis feature. The options considered were Claude (Anthropic), Gemini (Google via Antigravity), and GPT-4o (OpenAI).

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| Claude Sonnet (Anthropic) | Best structured output, strong reasoning | Separate API key needed |
| Gemini via Antigravity | Native integration with our dev environment | Less predictable JSON output in testing |
| GPT-4o | Most widely documented | Higher cost per token at our usage level |

### Decision
**Chosen: Claude Sonnet via Anthropic API**

### Reasoning
Claude produced the most consistent structured JSON output across 20 test prompts, which was the single most important factor given that our app parses the AI output programmatically. Inconsistent formatting would break the UI.

### Tradeoffs Accepted
- Requires users to supply their own Anthropic API key
- Adds a dependency outside of Google's ecosystem

---

## [DEC-002] Frontend Framework

**Date:** [Date]  
**Status:** Decided  
**Decided by:** [Your Name]

### Context
Needed to choose between vanilla JavaScript, React, or Vue for the frontend.

### Decision
**Chosen: Vanilla HTML/CSS/JavaScript**

### Reasoning
- Shippable in a weekend without a build pipeline
- No learning curve for v1
- Deployable to GitHub Pages with zero configuration
- If the concept validates, migrating to React for v2 is straightforward

### Tradeoffs Accepted
- Component reuse is harder as the app grows
- State management will become messy if features expand significantly

---

## [DEC-003] [Title of Your Next Decision]

**Date:** [Date]  
**Status:** Decided  
**Decided by:** [Your Name]

### Context
[What situation prompted this decision?]

### Options Considered
| Option | Pros | Cons |
|--------|------|------|
| [Option A] | | |
| [Option B] | | |

### Decision
**Chosen: [Option]**

### Reasoning
[Why this option over the others?]

### Tradeoffs Accepted
- [Tradeoff 1]
- [Tradeoff 2]

---

## [DEC-004] What We Deferred to v2

**Date:** [Date]  
**Status:** Decided

The following features were scoped out of v1 explicitly to hit the ship date:

| Feature | Reason Deferred | When to Revisit |
|---------|----------------|-----------------|
| User authentication | Not needed for solo/demo use case | If sharing with teams |
| Database persistence | Local state sufficient for MVP | If users want history |
| Export to Slack | Out of scope for v1 | After core loop validates |
