# Product Requirements Document (PRD)

**Project:** [Project Name]  
**Author:** [Your Name]  
**Status:** 🟡 In Progress / 🟢 Shipped / 🔴 On Hold  
**Last Updated:** [Date]  
**Version:** 1.0

---

## 1. Problem Statement

### Background
*What context does someone need to understand why this matters?*

### Problem
*In 1–2 sentences: what specific problem are we solving?*

### Evidence
*What data, user quotes, or observations validate that this problem is real?*
- Observation 1
- Observation 2
- User quote: *"..."*

---

## 2. Goals

### Primary Goal
*What is the single most important outcome this project needs to achieve?*

### Secondary Goals
- Goal 2
- Goal 3

### Non-Goals (Out of Scope)
*What are we explicitly NOT doing? This is as important as what we are doing.*
- Not building X
- Not supporting Y use case in v1

---

## 3. Success Metrics

| Metric | Baseline | Target | How to Measure |
|--------|----------|--------|----------------|
| [Metric 1] | [Current state] | [Goal] | [Method] |
| [Metric 2] | [Current state] | [Goal] | [Method] |

---

## 4. Users & Use Cases

### Primary User
**Who:** [Description]  
**Context:** When do they use this? What triggers the need?  
**Job to be done:** *"When I [situation], I want to [action], so I can [outcome]."*

### Use Cases
1. **[Use Case Name]:** [Brief description]
2. **[Use Case Name]:** [Brief description]

---

## 5. Solution Overview

### Approach
*High-level: how does this solve the problem?*

### User Flow
```
Step 1: User [does X]
Step 2: System [does Y]
Step 3: User receives [Z output]
```

### Key Features (MVP)
- **Feature 1:** [Description + acceptance criteria]
- **Feature 2:** [Description + acceptance criteria]
- **Feature 3:** [Description + acceptance criteria]

---

## 6. Technical Approach

### Stack
- **Frontend:** [Technology + reason]
- **Backend/Logic:** [Technology + reason]
- **AI Layer:** [Model/API + reason]
- **Data:** [Storage/DB + reason]

### Constraints
- Must work without a backend server (static hosting only) — OR — requires [X]
- API calls must stay under $[X] per session
- Must process files up to [X] rows/MB

---

## 7. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| AI output is inconsistent | Medium | High | Add output validation + fallback formatting |
| API costs exceed budget | Low | Medium | Add usage caps and caching |
| [Risk 3] | [L/M/H] | [L/M/H] | [Plan] |

---

## 8. Timeline

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| PRD complete | [Date] | ✅ Done |
| MVP scoped & started | [Date] | 🟡 In Progress |
| First working prototype | [Date] | ⬜ Not started |
| Testing & refinement | [Date] | ⬜ Not started |
| Shipped & documented | [Date] | ⬜ Not started |

---

## 9. Open Questions

- [ ] Should we support [X format] in v1 or defer to v2?
- [ ] Do we need user auth, or is a shareable link sufficient?
- [ ] [Other open question]

---

## 10. Appendix

- [Link to architecture diagram](architecture.md)
- [Link to decision log](decisions.md)
- [Link to any research or references]
