# Product Requirements Document (PRD)

**Project:** Desktop Weather App  
**Author:** Neons  
**Status:** 🟡 In Progress  
**Last Updated:** 2026-03-04  
**Version:** 1.0

---

## 1. Problem Statement

### Background
I want a lightweight app that lives on my desktop so I don't have to open a browser to check the weather. Existing desktop weather apps are either slow to load or overwhelm users with too much information at once. There is no simple, visually personalized option that shows only what matters.

### Problem
Current desktop weather apps are either too slow or display far too much information. Users who just want a quick glance at conditions, temperature, and the day's forecast are forced to scroll through cluttered dashboards or wait for heavy apps to load.

### Evidence
- Personal observation: opening a browser tab or launching a native app just to check the weather adds unnecessary friction to daily routine
- Existing solutions (Weather apps, browser widgets) trade simplicity for feature bloat
- No current free desktop tool allows manual selection of background images per weather condition for a personalized feel

---

## 2. Goals

### Primary Goal
Display the current weather conditions (feels-like temperature, sky conditions, and daily high/low) for a user-specified location in a clean, glanceable interface that loads fast and stays current automatically.

### Secondary Goals
- Show hourly forecast for the current day
- Show a multi-day (3–5 day) forecast
- Allow manual location entry (city name)
- Support dark mode UI
- Display weather alerts as a dismissible popup with a link to the source for more details
- Show a manually curated background image per weather condition (sunny, cloudy, rainy, snowy, etc.)

### Non-Goals (Out of Scope for v1)
- No radar maps or satellite imagery
- No mobile version
- No weather history or historical data
- No data beyond: feels-like temp, sky conditions, high/low
- No auto-detection of location (deferred to v2)

---

## 3. Success Metrics

| Metric | Baseline | Target | How to Measure |
|--------|----------|--------|----------------|
| App load time | N/A (new app) | Weather visible in < 3 seconds | Manual timing on first launch |
| Auto-refresh reliability | N/A | Refreshes every 30 min without user action | Manual observation over 2 hours |
| Data accuracy | N/A | Conditions match Open-Meteo API response | Compare UI display against raw API response |
| Portfolio quality signal | N/A | PRD, decisions.md, architecture.md all complete | Docs review checklist |
| Manual refresh | N/A | Single click triggers immediate update | Manual test |

---

## 4. Users & Use Cases

### Primary User
**Who:** Individual developer/PM (personal use and portfolio demonstration)  
**Context:** Sitting at their desktop and wants to check weather without opening a browser or switching apps  
**Job to be done:** *"When I'm at my computer and want to know the weather, I want to glance at a clean widget, so I can plan my day without distraction."*

### Secondary User
**Who:** Hiring managers, recruiters, or technical reviewers evaluating the portfolio  
**Job to be done:** *"When reviewing the candidate's portfolio, I want to see a complete, well-documented build, so I can assess their PM and dev skills."*

### Use Cases
1. **Quick Glance:** User opens the app and immediately sees current conditions, feels-like temp, and daily high/low for their saved location
2. **Day Planning:** User scrolls or clicks to view the hourly forecast for today
3. **Week Planning:** User views the multi-day forecast to plan the week ahead
4. **Location Change:** User types in a new city and the app fetches and displays weather for that location
5. **Weather Alert:** User sees a popup notification for an active weather alert and clicks it to read the full alert from the source
6. **Manual Refresh:** User clicks the refresh button to force an immediate data update

---

## 5. Solution Overview

### Approach
A single-page HTML/CSS/JavaScript app that fetches weather data from the Open-Meteo API (free, no API key required) and renders it in a minimal, dark-mode-first UI. Background images are hand-curated by the developer and mapped to weather condition codes. The app runs directly from a local file in the browser — no server required.

### User Flow
```
Step 1: User opens index.html in browser (or launches it from desktop shortcut)
Step 2: App loads saved location (default city) and calls Open-Meteo API
Step 3: Current conditions, feels-like temp, high/low render on screen
Step 4: Background image updates to match the current weather condition
Step 5: If a weather alert exists, a popup banner appears; user can click for source link
Step 6: Every 30 minutes, app silently re-fetches and updates the display
Step 7: User can manually refresh with the refresh button at any time
Step 8: User can type a new city name to change the location
```

### Key Features (MVP — Phase 1)
- **Current Conditions Display:** Renders feels-like temp, sky condition label, and daily high/low prominently — acceptance criteria: data from API is correctly parsed and displayed within 3 seconds of load
- **Manual Location Input:** Text field + submit button to change city — acceptance criteria: entering a valid city name updates all weather data on screen
- **Auto-Refresh:** Background timer calls API every 30 minutes — acceptance criteria: data updates without user interaction
- **Manual Refresh Button:** Single click triggers immediate API call — acceptance criteria: data visibly updates within 3 seconds of button press

### Key Features (Phase 2)
- **Hourly Forecast:** Horizontal scroll or expandable panel showing temperature + conditions per hour for today
- **Multi-Day Forecast:** 3–5 day outlook showing high/low and condition icon per day
- **Dark Mode UI:** Full dark palette applied by default across all components

### Key Features (Phase 3)
- **Weather Alerts Popup:** If alert data is returned by the API, a dismissible modal appears with a summary and link to full alert source
- **Condition-Based Backgrounds:** One hand-selected background image per major condition (clear, partly cloudy, overcast, rain, thunderstorm, snow, fog)

---

## 6. Technical Approach

### Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| **Structure** | Vanilla HTML5 | Zero build step; PWA shell loads instantly |
| **Styling** | Vanilla CSS + CSS Custom Properties | Dark mode via CSS variables, smooth transitions, no framework needed |
| **Logic** | Vanilla JavaScript (ES6+) | `fetch()` for API, `setInterval` for auto-refresh, `localStorage` for saved location |
| **PWA Shell** | Web App Manifest + Service Worker | Makes the app installable to desktop; enables offline mode and OS-level notifications |
| **Offline Cache** | Service Worker (Cache API) | Caches last weather response so app is usable when internet drops |
| **Weather Alerts** | Web Push API | Delivers weather alerts as native OS notifications — no browser chrome required |
| **Weather Data** | [Open-Meteo API](https://open-meteo.com/) | Free forever, no API key, full hourly + daily data, feels-like temp, WMO condition codes |
| **Geocoding** | [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) | Same provider — converts city name to lat/lon, no extra key |
| **Weather Icons** | [Meteocons](https://bas.dev/work/meteocons) | Free animated SVG icons mapped to WMO weather codes |
| **Typography** | [Google Fonts — Inter](https://fonts.google.com/specimen/Inter) | Modern, legible, free CDN |
| **Storage** | `localStorage` + Service Worker Cache | City name persisted in `localStorage`; last API response cached by Service Worker |
| **Deploy** | GitHub Pages | Static host; app is installable directly from the GitHub Pages URL |

### Constraints
- No backend server — app is entirely static (HTML, CSS, JS, and PWA files)
- No API key required — Open-Meteo is free with no auth
- All weather data from a single provider (Open-Meteo) to reduce complexity
- Background images are static assets bundled with the project — no external image API
- Must pass PWA installability criteria (HTTPS, manifest, Service Worker) — GitHub Pages satisfies HTTPS automatically
- No build step or package manager — project runs directly in the browser


---

## 7. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Open-Meteo API is down or rate-limited | Low | High | Show last cached data with a "last updated" timestamp; display friendly error message |
| Open-Meteo does not provide weather alerts for all regions | Medium | Medium | Scope alerts as a v1 nice-to-have; if unavailable, omit the feature and note it in decisions.md |
| City name geocoding returns wrong location | Medium | Medium | Show the resolved city name in the UI so user can confirm; allow re-entry |
| Background images increase load time | Low | Low | Compress all images; lazy-load background after core data renders |
| App looks broken without internet connection | Medium | Medium | Detect fetch failure and show a clear offline state message |

---

## 8. Timeline

| Phase | Milestone | Target Date | Status |
|-------|-----------|-------------|--------|
| 1 | PRD complete | 2026-03-04 | ✅ Done |
| 1 | Core weather display + manual location + auto/manual refresh | 2026-03-08 | ⬜ Not started |
| 2 | Hourly + multi-day forecast + dark mode UI | 2026-03-11 | ⬜ Not started |
| 3 | Weather alerts popup + condition-based backgrounds | 2026-03-13 | ⬜ Not started |
| 4 | Polish, full docs review, GitHub publish (MVP shipped) | 2026-03-15 | ⬜ Not started |

---

## 9. Open Questions

- [ ] Does Open-Meteo provide weather alert data for my target region? (US/East Coast) — needs API test before Phase 3
- [ ] Should the default location on first load be hardcoded or prompt the user to enter a city? — leaning toward prompt
- [ ] How many background images total? One per Open-Meteo WMO condition group (~7 images: clear, partly cloudy, overcast, rain, thunderstorm, snow, fog) — to be confirmed before Phase 3
- [ ] Should auto-detect location (browser geolocation) be added in v2 or remain permanently out of scope?
- [ ] How should the app behave on a very small browser window — fixed size or responsive?

---

## 10. Appendix

- [Architecture Diagram](architecture.md)
- [Decision Log](decisions.md)
- [Open-Meteo API Docs](https://open-meteo.com/en/docs)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
