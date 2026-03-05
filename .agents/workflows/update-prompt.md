---
description: 
---

Prompt Version Logger

Goal: Document a new or updated AI prompt in docs/prompts.md

Steps:
1. Ask me to paste the current prompt
2. Ask me: "What changed from the last version and why?"
3. Ask me: "What test cases did you run?"
4. Check docs/prompts.md for the current version number 
   and increment it
5. Append the full versioned entry with timestamp
6. Remind me to update the version comment in app.js to match

Output: Confirm the entry was saved with the new version number.