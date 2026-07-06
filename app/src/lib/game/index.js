// ===========================================================================
// GAME CONFIG — the main file you edit when forking daily_github_game.
//
// The platform (routing, timer, storage, stats, backend, archive, share) talks
// to your game ONLY through this object and the component's callback contract.
// See ../../../../docs/GAME_CONTRACT.md for the full contract.
// ===========================================================================
import GameComponent from './GameComponent.svelte';
import { dayIndexes as dataDayIndexes, loadDay as dataLoadDay } from './data/days.js';
import { fmtTime } from '../platform/timer.js';

export const GAME = {
  // Storage namespace + backend game key. MUST be unique & stable per fork
  // (changing it orphans every player's saved progress). Lowercase, no spaces.
  id: 'lights-out',

  // Shown in the header / share text / page title.
  title: 'Daily Lights Out',
  tagline: 'Turn every light off. One puzzle a day.',

  // Day 0's calendar date as [year, monthIndex(0-11), day]. Day N = this + N.
  anchorDate: [2026, 5, 8], // 8 June 2026

  // The Svelte component that renders the puzzle (see GAME_CONTRACT.md).
  component: GameComponent,

  // Which day indexes have data, and how to load one. Delegate to your data
  // module. loadDay(idx) returns the puzzle blob handed to the component as
  // `puzzle`, or null if that day has no data.
  dayIndexes: dataDayIndexes,
  loadDay: dataLoadDay,

  // Optional numeric score for a finished result (lower-is-better games can
  // return e.g. moves, higher-is-better can return points). Return null for
  // unscored games — stats then track only time + completion. Here: fewer
  // moves is better, so we expose negative moves so "higher = better" holds.
  scoreOf(result) {
    return result && typeof result.moves === 'number' ? -result.moves : null;
  },

  // Spoiler-free share text. CONVENTION (2 lines): the URL + "#<day> -- <result
  // summary>" on line 1, then a compact emoji tally on line 2. Receive the result
  // blob, the day index, and the bare share URL.
  //   <url> #<day> -- <summary>
  //   <emojis>
  shareLine(result, dayIdx, url) {
    const moves = result?.moves ?? '?';
    const t = result?.ms != null ? fmtTime(result.ms) : '';
    const star = result?.won ? '💡' : '🌑';
    const summary = `${moves} moves${t ? ' · ' + t : ''}`;
    return `${url} #${dayIdx} -- ${summary}\n${star}`;
  }
};
