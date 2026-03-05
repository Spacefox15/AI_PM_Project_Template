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

## [DEC-001] Weather Data API Selection

**Date:** 2026-03-04  
**Status:** Decided  
**Decided by:** Neons

### Context
The app needs live weather data including current conditions, feels-like temperature, daily high/low, hourly forecast, and multi-day forecast. We needed a source that is free, reliable, and requires no API key so the app can run as a static local file without any setup friction.

### Options Considered
| Option | Pros | Cons |
|--------|------|------|
| Open-Meteo | No API key, free forever, full hourly + daily data, geocoding API included | Slightly less brand recognition than OpenWeatherMap |
| wttr.in | No API key, simple JSON | Limited fields, no alerts, less control |
| NWS (weather.gov) | Official US data, free, no key | US only, complex API, no built-in geocoding |

### Decision
**Chosen: Open-Meteo**

### Reasoning
Open-Meteo provides all required data fields with no API key. The built-in Geocoding API converts user-entered city names to coordinates without a second provider. Free with no usage caps at personal scale. Also makes the project frictionless to share on GitHub — no `.env` setup required.

### Tradeoffs Accepted
- Less name recognition than OpenWeatherMap on portfolio
- Weather alert data availability varies by region — will validate before Phase 3

---

## [DEC-002] Features Deferred to v2

**Date:** 2026-03-04  
**Status:** Decided

The following features were scoped out of v1 to hit the March 15 ship date:

| Feature | Reason Deferred | When to Revisit |
|---------|----------------|-----------------|
| Auto-detect location (geolocation) | Adds permission complexity; manual entry sufficient for MVP | v2 if shipped to wider audience |
| Radar / satellite maps | Violates the simplicity goal | Not planned |
| Weather history / past data | No use case defined for v1 | v2 if users request it |
| Mobile-responsive layout | Desktop-only sufficient for portfolio use case | v2 if productized |

---

## [DEC-003] Frontend & Deployment Stack — PWA

**Date:** 2026-03-04  
**Status:** Decided  
**Decided by:** Neons

### Context
The app needs to live on the desktop with a native feel, show OS-level weather alert notifications, support offline mode, and be easy to share on GitHub as a portfolio piece. We evaluated four approaches.

### Options Considered
| Option | Pros | Cons |
|--------|------|------|
| **PWA (Vanilla JS)** | Installable to desktop, OS notifications, offline mode, no build step, GitHub Pages deployable | Requires HTTPS (covered by GitHub Pages), slightly less "native" than Electron |
| Electron + Vanilla/React | True native `.exe` window, system tray | ~200MB binary, complex packaging, hard to demo on GitHub Pages |
| Tauri + Svelte | Tiny binary (~10MB), modern | Requires Rust toolchain, steep learning curve, risky for March 15 deadline |
| Vite + React SPA | Modern DX, component reuse | No desktop install; still lives in browser tab |

### Decision
**Chosen: PWA with Vanilla HTML/CSS/JavaScript**

### Reasoning
PWA satisfies all requirements: installs to the desktop, launches without browser chrome, delivers weather alerts as real OS notifications via Web Push API, falls back gracefully offline via Service Worker cache, and deploys to GitHub Pages with zero infra. No build tooling required. The strongest option given the March 15 deadline and portfolio goals.

### Tradeoffs Accepted
- App is not a true native binary (no `.exe`) — users install from the browser, not a file download
- Web Push notifications require notification permissions from the user
- HTTPS required for Service Worker — satisfied by GitHub Pages

---

## [DEC-004] Pure Vanilla Frontend Over AI PM Template

**Date:** 2026-03-05  
**Status:** Decided  
**Decided by:** Neons

### Context
The base repository was generated using an AI PM Portfolio template which includes boilerplate for an LLM chat interface (`callClaude`, system prompts, etc.). We need a clean structure tailored specifically for a static weather widget.

### Decision
**Chosen: Strip AI boilerplate and implement pure vanilla dashboard.**

### Reasoning
The weather widget does not require an LLM API. Keeping the Anthropic fetch logic would only add confusion and unused code. To keep the app bundle weight near zero, we are overwriting `app.js`, `style.css`, and `index.html` completely to construct a minimal, clean, dark-mode weather widget. We introduced `api.js` specifically to isolate Open-Meteo calls, conforming to the portfolio standard.