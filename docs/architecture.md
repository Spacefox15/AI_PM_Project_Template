# Architecture Overview

**Project:** Desktop Weather App (PWA)
**Last Updated:** 2026-03-04

---

## System Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                         PWA SHELL                            │
│         (Installed to desktop via Web App Manifest)          │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  USER INTERFACE                       │   │
│  │           (HTML / CSS / Vanilla JavaScript)           │   │
│  │                                                       │   │
│  │  [Location Input] → [Current Conditions Display]     │   │
│  │  [Hourly Forecast] → [Multi-Day Forecast]            │   │
│  │  [Refresh Button] → [Alert Popup]                    │   │
│  └────────────────────────┬──────────────────────────────┘   │
└───────────────────────────┼──────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                     SERVICE WORKER                           │
│                                                              │
│  1. Intercepts API fetch calls                               │
│  2. Caches last weather response (offline fallback)          │
│  3. Manages background sync & push notifications             │
│  4. Serves app shell from cache on repeat visits             │
└──────────────────┬───────────────────────┬───────────────────┘
                   │                       │
          ┌────────┘                       └──────────┐
          ▼                                           ▼
┌──────────────────────┐              ┌───────────────────────┐
│   OPEN-METEO API     │              │   OS NOTIFICATION     │
│                      │              │   LAYER               │
│  /forecast endpoint  │              │                       │
│  - Current weather   │              │  Web Push API →       │
│  - Hourly data       │              │  Native desktop alert │
│  - Multi-day data    │              │  popup for weather    │
│  - WMO codes         │              │  alerts               │
│                      │              │                       │
│  /geocoding endpoint │              └───────────────────────┘
│  - City → lat/lon    │
└──────────────────────┘
```

---

## File Structure

```
/
├── index.html          # App shell and layout
├── style.css           # All styling (CSS custom properties for dark mode)
├── app.js              # Core logic: rendering, refresh timer, location handling
├── api.js              # All Open-Meteo fetch calls (isolated)
├── sw.js               # Service Worker: caching, push notifications
├── manifest.json       # PWA Web App Manifest (name, icons, theme, display)
├── .env.example        # Template for any future environment variables
├── README.md
├── CHANGELOG.md
├── assets/
│   ├── icons/          # PWA install icons (192x192, 512x512)
│   └── backgrounds/    # One image per weather condition (~7 total)
│       ├── clear.jpg
│       ├── partly-cloudy.jpg
│       ├── overcast.jpg
│       ├── rain.jpg
│       ├── thunderstorm.jpg
│       ├── snow.jpg
│       └── fog.jpg
└── docs/
    ├── PRD.md
    ├── decisions.md
    ├── architecture.md  ← this file
    └── prompts.md
```

---

## Data Flow

```
1. User opens app (from desktop install or browser)
      ↓
2. Service Worker serves app shell from cache (instant load)
      ↓
3. app.js reads saved city from localStorage
      ↓
4. api.js calls Open-Meteo Geocoding API → city name → lat/lon
      ↓
5. api.js calls Open-Meteo Forecast API → weather JSON
      ↓
6. Service Worker caches the API response
      ↓
7. app.js parses WMO condition code → selects background image + Meteocon icon
      ↓
8. UI renders: current conditions, hourly strip, multi-day cards
      ↓
9. If alert data present → alert popup shown with link to source
      ↓
10. setInterval fires every 30 min → repeats from step 4
      ↓
11. If offline → Service Worker returns cached response + shows "last updated" timestamp
```

---

## Component Breakdown

### Core Files

| File | Purpose |
|------|---------|
| `index.html` | App shell — single page, all views toggled via JS |
| `style.css` | Full styles using CSS custom properties for dark mode theming |
| `app.js` | Rendering logic, refresh timer (`setInterval`), event listeners, location save |
| `api.js` | All `fetch()` calls to Open-Meteo — weather and geocoding, isolated here only |
| `sw.js` | Service Worker — caches responses, enables offline mode, handles push notifications |
| `manifest.json` | PWA manifest — app name, icons, theme color, `display: standalone` |

### Assets

| Asset | Purpose |
|-------|---------|
| `assets/backgrounds/*.jpg` | One hand-selected image per WMO weather group (~7 conditions) |
| `assets/icons/` | PWA install icons (192px and 512px required for installability) |

### Docs

| File | Purpose |
|------|---------|
| `docs/PRD.md` | Full product requirements |
| `docs/decisions.md` | Decision log |
| `docs/architecture.md` | This file |
| `docs/prompts.md` | Prompt version log (for any future AI features) |

---

## Key Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| Open-Meteo API | Current (free) | Weather data — no key required |
| Open-Meteo Geocoding API | Current (free) | City name → lat/lon resolution |
| Meteocons | Latest | Animated SVG weather icons keyed to WMO codes |
| Google Fonts (Inter) | CDN | Typography |
| Web App Manifest | Browser native | PWA installability |
| Service Worker API | Browser native | Offline caching + push notifications |

---

## PWA Installability Requirements

For the app to be installable from Chrome/Edge:

| Requirement | Implementation |
|------------|---------------|
| Served over HTTPS | ✅ GitHub Pages provides HTTPS automatically |
| `manifest.json` present and linked | `<link rel="manifest" href="manifest.json">` in `index.html` |
| Service Worker registered | `sw.js` registered in `app.js` on load |
| Icons at 192px and 512px | Stored in `assets/icons/` |
| `display: standalone` in manifest | Hides browser chrome when launched from desktop |

---

## Environment Variables

No environment variables required for v1.

```env
# .env.example — No keys needed for Open-Meteo
# Placeholder for any future integrations
```

---

## Deployment

Hosted on **GitHub Pages** (static). Installable directly from the hosted URL.

```bash
# Deploy
git push origin main
# → GitHub Pages auto-deploys from repo root

# To install as a desktop app:
# Open the GitHub Pages URL in Chrome or Edge
# Click the install icon in the address bar (or browser menu → "Install app")
```
