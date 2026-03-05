---
description: 
---

Pre-Ship Checklist

Goal: Verify the project is ready to be pushed to GitHub 
and shared publicly.

Steps:
1. Check README.md — does it have: problem statement, 
   demo link, tech stack, results section, roadmap?
   Flag any missing sections.

2. Check CHANGELOG.md — does it have an entry for 
   today's work? If not, draft one based on recent git diff.

3. Check .env.example — does it list all variables 
   referenced in the codebase? Compare against .env if present.

4. Check .gitignore — does it include .env, node_modules, 
   and OS files?

5. Check docs/decisions.md — are there any recent code 
   changes that aren't documented as decisions?

6. Check docs/prompts.md — does it reflect the current 
   prompt in app.js?

7. Run a final git diff and suggest a commit message 
   following the format: "feat: [what shipped]"

Output: A pass/fail report for each check with specific 
fixes for anything that failed.