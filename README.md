# daily_github_game

A reusable **template** for "one puzzle a day" web games — Wordle-style daily
cadence, a result-sharing loop, an archive, personal stats with streaks, and an
optional global-stats backend (% started, % finished, average time). Built to be
**forked per game**: the daily/stats/deploy plumbing stays put, you write only
the puzzle.

> This repo is a [GitHub *template repository*](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).
> Click **“Use this template”** to start a new game with a clean history.

## What you get for free (the platform)

`app/src/lib/platform/` — never edited per fork:

- **days.js** — calendar ↔ day-index mapping from an anchor date; `today`,
  archive, future-day resolution.
- **timer.js** — active-play timer that pauses when the tab is hidden (honest
  "average time").
- **storage.js** — per-day localStorage record (`started/finished/elapsedMs/
  state/result/...`).
- **stats.js** — personal stats: completion rate, current/max streak, average &
  best time, optional score.
- **api.js** + `backend/` — Cloudflare Worker recording `start`/`finish` events
  and serving cross-player aggregates. Optional: with no backend everything runs
  local-only.
- **unlock.js** — shareable `?unlock=` link to play unreleased days early
  (author mode).
- Routes: the game shell (`/`), the archive (`/archive`), and the stats page
  (`/stats`).

## What you write (the game)

`app/src/lib/game/` — the only place a fork really changes:

- **index.js** — the `GAME` config: `id`, `title`, `anchorDate`, the pluggable
  `component`, `loadDay(idx)`, `scoreOf(result)`, `shareLine(result, day, url)`.
- **GameComponent.svelte** — your puzzle UI. It talks to the platform through
  three callbacks: `onstart()`, `onprogress(state)`, `onfinish(result)`.
- **data/** — your day data in whatever shape your game wants.

The repo ships with a working **Lights Out 3×3** example so it builds and plays
out of the box. Replace those three pieces and you have a new game.

See **[docs/GAME_CONTRACT.md](docs/GAME_CONTRACT.md)** for the full contract.

## Quick start

```bash
cd app
npm install
npm run dev        # http://localhost:5173
```

Deploy: push to `main` — `.github/workflows/deploy.yml` builds and publishes to
GitHub Pages (enable Pages → Source: **GitHub Actions** once, in repo Settings).

Global stats (optional): see [backend/README.md](backend/README.md), then paste
the Worker URL into `app/src/lib/config.js`.

## Make a new game from this template

1. **Use this template** on GitHub → new repo (or run `scripts/new_game.sh`
   locally to copy + rename).
2. Edit `app/src/lib/config.js` (`STATS_API`, `UNLOCK_PASSWORD`).
3. Set `GAME.id`, `title`, `anchorDate` in `app/src/lib/game/index.js`.
4. Replace `GameComponent.svelte` + `data/` with your puzzle.
5. (Optional) deploy the backend and set `STATS_API`.
