# Architecture Overview

**Project:** [Project Name]  
**Last Updated:** [Date]

---

## System Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      USER INTERFACE                      │
│              (HTML / CSS / JavaScript)                   │
│                                                         │
│   [Input Form]  →  [File Upload]  →  [Results View]    │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   PROCESSING LAYER                       │
│                                                         │
│   1. Input validation & cleaning                        │
│   2. Prompt construction                                │
│   3. API call management (rate limits, error handling)  │
└────────────────────────┬────────────────────────────────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
┌─────────────────────┐   ┌─────────────────────────────┐
│    AI LAYER         │   │       DATA LAYER             │
│                     │   │                             │
│  Anthropic API  OR  │   │  Oracle DB / SQL / CSV      │
│  Google Antigravity │   │  (sample dataset for demo)  │
│                     │   │                             │
│  Model: Claude      │   │  Tables: [list key tables]  │
│  Sonnet 4.6         │   │                             │
└─────────────────────┘   └─────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────┐
│                    OUTPUT LAYER                          │
│                                                         │
│   Structured JSON → Rendered UI / Exported PDF/CSV     │
└─────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### Frontend (`/src/`)
| File | Purpose |
|------|---------|
| `index.html` | Main app shell and layout |
| `style.css` | All styling |
| `app.js` | Core app logic and event handling |
| `api.js` | All API call functions (isolated for easy swapping) |

### Docs (`/docs/`)
| File | Purpose |
|------|---------|
| `PRD.md` | Product requirements |
| `decisions.md` | Decision log |
| `architecture.md` | This file |

---

## Data Flow

1. **User provides input** → text paste, file upload, or database connection
2. **Input is preprocessed** → cleaned, truncated if needed, formatted for the prompt
3. **Prompt is constructed** → system prompt + user input combined
4. **API call made** → to Anthropic or Antigravity endpoint
5. **Response parsed** → JSON extracted and validated
6. **UI updated** → results rendered to the page
7. **Export triggered** (optional) → PDF or CSV generated client-side

---

## Key Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| [Library 1] | [x.x.x] | [Why] |
| [Library 2] | [x.x.x] | [Why] |
| Anthropic API | claude-sonnet-4-6 | Core AI analysis |

---

## Environment Variables

```env
# Required
ANTHROPIC_API_KEY=your_key_here

# Optional
MAX_TOKENS=1000
DEBUG_MODE=false
```

---

## Deployment

This project is deployed via **GitHub Pages** (static) / **Vercel** / **[other]**.

Deploy steps:
```bash
# GitHub Pages
git push origin main
# → auto-deploys from /src or root
```
