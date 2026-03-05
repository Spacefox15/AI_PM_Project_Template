---
description: 
---

PR Description Generator

Goal: Draft a professional pull request description 
ready to paste into GitHub.

Steps:
1. Run git diff main to see all changes
2. Check docs/decisions.md for any entries added 
   since the last commit
3. Write the PR description with these sections:
   - What does this PR do? (one sentence)
   - Why this change? (link to decisions.md entry if relevant)
   - How was this tested?
   - Screenshots placeholder if UI files changed
   - Checklist (pre-filled based on what you found)

Output: A markdown block ready to paste into GitHub.