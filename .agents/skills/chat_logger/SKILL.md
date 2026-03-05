---
name: Chat Logger
description: Load this skill whenever the user asks to log, save, or export their current chat conversation to a markdown file in the docs/Chats directory.
---

# Chat Logger Skill

## When to Load This Skill
- The user asks to log the current chat.
- The user uses the command `/log-chat`.
- The user wants to save a record of the conversation for documentation.

## Overview
This skill allows the AI to neatly summarize and log the ongoing conversation, preserving important decisions, technical discussions, and product development steps in a Markdown file. 

## Command: `/log-chat`

When the user asks to log the chat or uses the `/log-chat` command, you should perform the following steps:

1. **Analyze the Conversation:** Review the current session to extract the main topic, the key decisions that were made, and the work that was completed.
2. **Determine the Filename:** 
   - Format the current date as `M_D_YYYY` (e.g., `3_5_2026`).
   - Create a short, descriptive title for the session (e.g., `Drafting Desktop Weather App PRD`).
   - Combine them for the filename: `docs/Chats/[Date]_[Title].md`.
3. **Write the Log:** Create a new markdown file in the `docs/Chats/` directory (or append/update if one for the same topic already exists that day) using the template below.

## File Format Template

Whenever generating a chat log, use this structure:

```markdown
# Chat Log: [Descriptive Title]

**Date:** [YYYY-MM-DD]
**Goal:** [What was the user trying to achieve in this session?]

## Summary
[A 2-3 sentence summary of the conversation and what was accomplished]

## Key Decisions
- [Decision 1]
- [Decision 2]
- [Decision 3]

## Action Items / Next Steps
- [x] [Completed item]
- [ ] [Pending item]

## Important Notes / Links
- [Link to any updated files, e.g., docs/PRD.md]
- [Any specific constraints or ideas discussed]
```
