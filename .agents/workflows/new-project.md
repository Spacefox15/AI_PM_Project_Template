---
description: 
---

New Project Setup

Goal: Set up a complete AI PM portfolio project from scratch.

Steps:
1. Create this folder structure:
   /docs (PRD.md, decisions.md, architecture.md, prompts.md)
   /src (index.html, style.css, app.js)
   README.md, CHANGELOG.md, .gitignore, .env.example
   .github/pull_request_template.md

2. Ask me: "What is the project name and one-line description?"

3. Pre-fill every file with the project name and description, 
   replacing all [placeholder] text where possible.

4. In docs/PRD.md, ask me these questions one at a time and 
   fill in my answers:
   - What problem does this solve?
   - Who is the primary user?
   - What are the top 3 features for MVP?
   - What is explicitly out of scope?
   - How will you measure success?

5. Generate a first draft of docs/architecture.md based on 
   the answers, including an ASCII system diagram.

6. Create an initial git commit with message: 
   "docs: initialize project scaffold and PRD"

Output: Confirm all files created and show the folder tree.