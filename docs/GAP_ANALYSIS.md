# Gap Analysis: Duke → Pocket Fishing Guide

**Status:** draft — 2026-05-08
**Branch:** `claude/gap-analysis-duke-repo-KkDA0`
**Audience:** PFG / Duke contributors planning the Duke → production migration

---

## Context

`sirgaladad/duke` is the **test environment for the new front-end UI** of the Pocket Fishing Guide app (`sirgaladad/pocket-fishing-guide`, "PFG"). Duke is hi-fi on the visual / interaction layer (3 design vibes, hero verdict, species binder, dock matchmaker, density + urgency systems) but is fed almost entirely by hardcoded mocks.

PFG is the production app: a single-file React SPA fed by a real-time data pipeline (USGS / NWS / USACE / Open-Meteo, refreshed every 6 hours via GitHub Actions), covering 39 Arkansas waters with a 21-lure scoring engine and phase-based species intelligence.

For Duke to graduate from prototype to production replacement, it needs to absorb PFG's data, integrations, and feature breadth without losing its design wins. **This document is the actionable backlog of what Duke must add to reach parity.**

> Direction: Duke catching up to PFG. The reverse direction (PFG adopting Duke's design wins) is noted briefly at the bottom for awareness but is out of scope here.

---

## Summary matrix

| Capability | Duke (today) | PFG (today) | Gap status |
|---|---|---|---|
| Arkansas water bodies | None (just `homeWater` string on profile) | 39 waters w/ metadata, gauges, regs, access | **P0 missing** |
| Real-time conditions (temp/flow/clarity) | Mock signal feeding hero verdict | USGS + 5-tier fallback, color-coded source badges | **P0 missing** |
| Lure scoring engine | "Top 4 by hardcoded `match` score" personal tackle | 21-lure canonical lib, condition-weighted scoring | **P0 missing** |
| Species depth | 30 species, single `spawn` field each | 2 species deep (6 phases, temps, lure rankings) | **P0 partial** (Duke broader, PFG deeper) |
| 7-day forecast | Placeholder screen | NWS-fed, working | **P0 missing** |
| Access points / ramps | Placeholder screen | Full directory w/ GPS, status, AGFC links | **P0 missing** |
| Pro intel / local tips | Placeholder screen ("Technique") | Per-water expert tips accordion | **P0 missing** |
| Live bait toggle | Not present | Working | **P1 missing** |
| Snapshot sharing | Not present | Mobile share + clipboard fallback | **P1 missing** |
| Spawn tracker UI | Not present | Countdown to spawn-trigger temps | **P1 missing** |
| Favorites persistence | Profile UI only | `localStorage[pfg_favorites]` working | **P1 missing** |
| Regulations | Not present | Per-water regs + AGFC map links | **P1 missing** |
| Heat maps + sparklines | Not present | Visual dashboard across 39 waters | **P1 missing** |
| Auth backend | UI present, no backend | Profile-prep CTAs, no backend | **P1 joint blocker** |
| Data pipeline (CI) | None | GitHub Actions 6hr refresh + validators | **P0 missing** |
| Linting / commitlint | None | ESLint, Prettier, commitlint | **P2 missing** |
| Hero verdict UI (GO/SCOUT/HOLD) | Working w/ mock | Not present | Duke-only ✓ |
| 3 design vibes | Working | Not present | Duke-only ✓ |
| Density + urgency modifiers | Working | Not present | Duke-only ✓ |
| Dock matchmaker | Working | Not present | Duke-only ✓ |
| Species binder (30 species) | Working | Not present | Duke-only ✓ |

---

## Backlog

### P0 — Core data and production-readiness

Duke is non-shippable as a PFG replacement without these.

#### P0-1. Water bodies dataset (39 Arkansas waters)

- **Gap:** Duke has no water bodies. The whole concept of "where am I fishing today" is absent.
- **Source-of-truth in PFG:**
  - `data/water_bodies.json` — 39 waters metadata
  - `data/waters.json` — waters + species + regulations
  - `data/usgs_gauges.json` — gauge station IDs and coordinates
  - `data/stations.json` — real-time data snapshots
  - `data/dams.json` — USACE dam levels
  - `data/regulations.json`
  - `data/fishing_locations.json` — access ramps
- **Target landing in Duke:**
  - Copy data files into `duke/data/`
  - New component `components-v2/PfgWaters.jsx` — bottom-sheet selector w/ search + favorites
  - Wire selected water into existing `PfgHero` / `PfgHome` state
- **Effort:** L
- **Dependencies:** none — start here

#### P0-2. Real-time conditions strip

- **Gap:** Duke's hero verdict (GO / SCOUT / HOLD) is computed from hardcoded values. No actual conditions feed.
- **Source-of-truth in PFG:** `stations.json` snapshots, plus the 5-tier temp fallback (USGS primary → USGS alt → Open-Meteo soil → NWS air+offset → 48hr cache). Color-coded reliability badges per tier.
- **Target landing in Duke:**
  - New component `components-v2/PfgConditions.jsx`
  - Replace mock signal feeding `PfgHero.jsx` verdict
  - Reuse PFG's `clarity_derived` logic (clear / stained / muddy)
- **Effort:** M
- **Dependencies:** P0-1 (needs water bodies + gauge IDs to query)

#### P0-3. Lure scoring engine + canonical 21-lure library

- **Gap:** Duke's `PfgTackle.jsx` shows the user's top 4 personal setups sorted by a hardcoded `match` score on each setup (`PfgTackle.jsx:123` does `[...SETUPS].sort((a,b) => b.match - a.match).slice(0,4)`). The values are placeholders, not computed from live conditions. PFG ranks the canonical 21-lure library against current conditions.
- **Source-of-truth in PFG:** `data/lure-master.json` (id, name, type, species[], bait_type, clarity_ranking, phase_ranking, cpc_link, howto_video). Scoring algorithm in `index.html` tackle-box modal.
- **Target landing in Duke:**
  - Copy `lure-master.json` into `duke/data/`
  - Replace the placeholder `match`-score sort in `components-v2/PfgTackle.jsx` with condition-weighted scoring (clarity × flow × temp × phase) computed from live signal inputs
  - Add Live Bait Toggle (artificial ↔ live) — controls a `bait_type` filter
- **Effort:** L
- **Dependencies:** P0-2 (scoring inputs come from conditions strip)

#### P0-4. Phase-based species intelligence

- **Gap:** Duke has 30 species (broad) but each entry has a single `spawn` field. PFG models 6 phases per species (pre-spawn, spawn, post-spawn, summer, fall, winter) with `temp_ranges`, `spawn_trigger_temp`, `moon_phase_affinity`, ranked lures per phase — but only for White Bass + Crappie.
- **Target landing in Duke:**
  - Augment `data/species.js` schema with PFG's phase model (port from `species.json`)
  - Keep all 30 species; only White Bass + Crappie have full phase data initially. Track the other 28 as a follow-up issue, not a blocker.
- **Effort:** M
- **Dependencies:** P0-1

#### P0-5. Build out the four placeholder screens

`index.html`'s `App` component currently renders `<window.PfgPlaceholderScreen>` inline for routes `signals`, `forecast`, `technique`, and `access` (the conditional render block under `<main>`). `PfgShell.jsx` only owns the navigation chrome (TopBar / SideRail / SideDrawer); it does not handle route-content rendering.

- **Signals** → real conditions feed; composes `PfgConditions` + history sparkline.
- **Forecast** → 7-day NWS view. PFG already has the data fetcher; reuse the snapshot files.
- **Access** → access points directory using `fishing_locations.json` (ramp type, GPS, status, restrictions, AGFC links).
- **Technique** → Pro Intel Accordion: per-water/species expert tips from PFG's `pro_tips` fields.
- **Effort:** L (4 screens)
- **Dependencies:** P0-1 (waters), P0-2 (conditions for Signals)

#### P0-6. Data pipeline (GitHub Actions 6-hour refresh)

- **Gap:** Even after porting PFG's data files, they go stale immediately without the refresh CI.
- **Source-of-truth in PFG:**
  - `.github/workflows/` — data validation + automated 6hr refresh
  - `scripts/fetch_river_stations.js` — USGS / Open-Meteo
  - `scripts/fetch_lake_temps.js` — reservoir temps
  - `scripts/fetch_usace_levels.js` — dam lake levels
  - `scripts/generate_status.js` — status aggregation
  - `scripts/validate_stations.js` — schema validation
- **Target landing in Duke:**
  - Copy workflows into `duke/.github/workflows/`
  - Copy scripts into `duke/scripts/`
- **Effort:** M
- **Dependencies:** P0-1 (data files have to exist first)

---

### P1 — Feature-parity polish

Each item is independently scoped and can be picked up after P0 lands.

#### P1-1. Spawn Tracker UI

Countdown widget to spawn-trigger temperatures. PFG has the logic; Duke can build a polished UI using its existing design tokens. Effort: S. Files: new `components-v2/PfgSpawnTracker.jsx`.

#### P1-2. Snapshot sharing

Mobile share sheet + clipboard fallback (text + image). PFG has implementation to reuse. Effort: S.

#### P1-3. Favorites persistence

Saved waters in `localStorage`. **Match PFG's storage key `pfg_favorites`** so users moving between the two apps don't lose state. Effort: S. Files: `components-v2/PfgWaters.jsx` (built in P0-1).

#### P1-4. Regulations surfacing

Per-water regs from `regulations.json`, link to AGFC fishing maps. Render inside the Access screen built in P0-5. Effort: S.

#### P1-5. Heat maps + 7-day trend sparklines

PFG's visual dashboard view across all 39 waters. Effort: M. Files: new `components-v2/PfgDashboard.jsx`.

#### P1-6. Auth backend (joint with PFG)

Both repos have stubbed auth UI and no backend. **Decide auth provider (Supabase / Firebase / custom) once across both repos before either side invests further.** Track as a joint epic, not a Duke-only item. Effort: L.

---

### P2 — Tooling and quality

#### P2-1. ESLint + Prettier + commitlint

Port PFG configs (`.eslintrc.json`, `.prettierrc`, `commitlint.config.js`) into Duke. Duke has zero linting today. Effort: S.

#### P2-2. Validation scripts

Port `scripts/validate-species-lure.js`, `scripts/validate-tackle-box.js`, `scripts/test-moon-phase.js`, `scripts/test-water-temperature.js`. Catch bad data before it ships. Effort: S. Depends on P0-6.

#### P2-3. Component-extraction discipline

Duke's `index.html` (~23KB) embeds JSX inline alongside the `components-v2/` files. Document the convention (everything in `components-v2/`, register on `window`) so contributors don't regress. Effort: S — docs only.

#### P2-4. Docs parity

Add `ROADMAP.md`, `PLAN.md`, `CHANGELOG.md` mirroring PFG's structure. Duke's `README.md` is one line today. Effort: S.

---

## Critical files to copy or adapt

| PFG path | Duke target | Purpose |
|---|---|---|
| `data/water_bodies.json` | `duke/data/water_bodies.json` | 39 waters metadata |
| `data/waters.json` | `duke/data/waters.json` | Waters + species + regs |
| `data/usgs_gauges.json` | `duke/data/usgs_gauges.json` | Gauge station IDs |
| `data/stations.json` | `duke/data/stations.json` | Real-time snapshots |
| `data/lure-master.json` | `duke/data/lure-master.json` | 21-lure library |
| `data/species.json` | merge into `duke/data/species.js` | Phase model |
| `data/regulations.json` | `duke/data/regulations.json` | Regulations |
| `data/fishing_locations.json` | `duke/data/fishing_locations.json` | Access points |
| `scripts/fetch_river_stations.js` | `duke/scripts/...` | USGS fetch |
| `scripts/fetch_lake_temps.js` | `duke/scripts/...` | Lake temp fetch |
| `scripts/validate_stations.js` | `duke/scripts/...` | Schema validation |
| `.github/workflows/*.yml` | `duke/.github/workflows/` | 6hr refresh CI |
| `.eslintrc.json`, `.prettierrc`, `commitlint.config.js` | duke root | Tooling |

## Files to modify in Duke

- `index.html` — register new data files on `window`; mount new components; **replace the four `<window.PfgPlaceholderScreen>` instances inside the `App` component (Signals / Forecast / Access / Technique routes) with the real screens built in P0-5**.
- `components-v2/PfgHero.jsx` — replace mock `verdict` with computed value from conditions strip.
- `components-v2/PfgTackle.jsx` — swap the placeholder `match`-score sort for condition-weighted lure scoring; add Live Bait Toggle.
- `components-v2/PfgHome.jsx` — register Water Selector + Conditions Strip on home dashboard.
- `data/species.js` — augment with phase data.
- `README.md` — expand from one line to full project overview.

> Note: `components-v2/PfgShell.jsx` is **not** in this list. It owns the TopBar / SideRail / SideDrawer chrome only — route-content rendering lives in `index.html`'s `App` component.

---

## What Duke already has that PFG lacks

Not in this backlog — flagged for awareness. These are Duke's UI contributions that PFG should plan to absorb later (separate effort):

- 3 design vibes (Field Guide / Tackle Shop / Sonar) via `data-vibe` attribute switching
- Density (Spacious / Standard / Packed) and urgency (Calm / Alert / Combat) modifiers
- Hero variants (Verdict / Card-of-day / Live Dashboard)
- Dock matchmaker (swipe deck for recommendations)
- Species Binder UI for 30 species with art
- SideRail + collapsible SideDrawer navigation patterns
- TopBar sticky-height publisher
- "Pocket Fishing the Game" route scaffolding
- Cleaner component file organization (`components-v2/` directory)

---

## Open questions

1. **Replacement vs. parallel ship.** Will Duke replace PFG entirely, or ship as a parallel "v2" route inside the existing PFG repo? Affects whether we port data + scripts into Duke or merge Duke's components into PFG.
2. **Auth provider decision.** Shared between repos — decide before either side builds auth UI further.
3. **USGS station ID conflicts.** PFG `PLAN.md` flags conflicts at `07049000` (War Eagle vs Kings) and `07056000` (Buffalo vs Crooked). Duke must inherit the resolved data, not the conflicting source.
4. **Build system.** Keep the single-file React + Babel CDN architecture, or graduate to a real build (Vite / Next) when porting? Affects how scripts and CI are structured, and whether `components-v2/*.jsx` can be `import`-ed natively or needs to keep the `window` registration trick.
5. **Species depth strategy.** Duke ships 30 species, PFG has phase data for 2. Do we backfill phase data for the remaining 28 as a blocker for parity, or ship 2-deep + 28-shallow and iterate?

---

## Verification checklist for this doc

After this lands on `claude/gap-analysis-duke-repo-KkDA0`:

- [ ] PFG paths cited above (`data/lure-master.json`, `scripts/fetch_river_stations.js`, `.github/workflows/`) verified to exist in `sirgaladad/pocket-fishing-guide@main`
- [ ] Duke target paths (`components-v2/PfgHero.jsx`, `components-v2/PfgTackle.jsx`, `data/species.js`) verified to exist in `sirgaladad/duke@main`
- [ ] Priority tiers (P0 / P1 / P2) reviewed and adjusted to match the team's roadmap intuition
- [ ] Open questions answered before spinning up implementation issues
