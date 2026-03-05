# Changelog

*All notable changes to this project are documented here. Format follows [Keep a Changelog](https://keepachangelog.com).*

---

## [Unreleased]
### Planned
- [ ] Feature: Weather alerts popup (Phase 3)
- [ ] Feature: Condition-based dynamic backgrounds (Phase 3)

---

## [0.3.0] - 2026-03-05 — Phase 2: Forecast & Polish

### Added
- Horizontal 24-hour forecast
- Vertical 5-day multi-day forecast
- `utils.js` for formatting and WMO icon mapping

### Fixed
- Fixed API request to explicitly return Fahrenheit.

---

## [0.2.0] - 2026-03-05 — Phase 1: Core Weather Widget

### Added
- Core current conditions display (temperature, feels-like, condition, max/min)
- Geocoding API integration (City name to Lat/Lon)
- Open-Meteo API integration (Fixed: defaulted to Fahrenheit)
- LocalStorage persistence for last searched city
- 30-minute auto-refresh background timer
- Glassmorphism dark-mode UI
- `docs/prompts.md` for AI tracking

### Decisions Made This Sprint
- Replaced AI PM HTML/JS template with pure Vanilla web app architecture for optimal performance (see [DEC-004](docs/decisions.md))

---

## [0.1.0] - 2026-03-04 — Project Kickoff

### Added
- Repo initialized
- PRD written (`docs/PRD.md`)
- Architecture diagrammed (`docs/architecture.md`)
- Tech stack decided (`docs/decisions.md`)
